<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowDownLeft, ArrowUpRight, CreditCard, RefreshCw } from 'lucide-vue-next'
import type { WalletTransaction } from '@/types/profile'
import { useFormatter } from '@/composables/useFormatter'
import { formatCurrency } from '@/utils/currency'
import { ref, computed } from 'vue'
import axios from 'axios'
import { router } from '@inertiajs/vue3'
import { toast } from 'vue-sonner'

type BankNotes = {
  bank_name: string
  bank_account: string
  bank_holder: string
  gross_amount?: number
  admin_fee?: number
  net_amount?: number
}

const props = defineProps<{
  transaction: WalletTransaction
}>()

const emit = defineEmits<{
  (e: 'continue-payment', snapToken: string): void
  (e: 'status-updated', data: { transactionRef: string; status: string; newBalance?: number }): void
}>()

const { formatDate, getTransactionTypeLabel, getTransactionStatusLabel } = useFormatter()

const checkingStatus = ref(false)
const localStatus = ref(props.transaction.status)

// Kredit = uang masuk (topup, bonus, refund)
// Debit = uang keluar (withdrawal, purchase, tax, deduct)
const creditTypes = ['topup', 'top_up', 'bonus', 'refund']
const isCredit = computed(() => creditTypes.includes(props.transaction.type))

// Helper untuk format currency dengan fallback '-' untuk wallet transactions
const safeFormatCurrency = (value: number | string | null | undefined): string => {
  return formatCurrency(value, '-')
}

// ===== Notes Normalizer (string | json string | object) =====
type NotesJson = Record<string, any>

const isPlainObject = (v: unknown): v is NotesJson =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const parseNotes = (notes: unknown): NotesJson | string | null => {
  if (notes == null) return null

  // Already object
  if (isPlainObject(notes)) return notes

  // String: maybe json
  if (typeof notes === 'string') {
    const trimmed = notes.trim()
    if (!trimmed) return null

    const looksJson =
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))

    if (!looksJson) return trimmed

    try {
      const parsed = JSON.parse(trimmed)
      // kalau hasil parse object -> return object
      if (isPlainObject(parsed)) return parsed
      // kalau array/primitive -> tampilkan string aslinya saja
      return trimmed
    } catch {
      return trimmed
    }
  }

  // Fallback lainnya
  return String(notes)
}

const notesParsed = computed(() => parseNotes(props.transaction.notes))

// Ambil bank notes jika struktur sesuai (contoh kamu)
const bankNotes = computed<BankNotes | null>(() => {
  const n = notesParsed.value
  if (!n || typeof n === 'string') return null

  // minimal keys untuk dianggap bankNotes
  const hasBank =
    typeof n.bank_name === 'string' &&
    typeof n.bank_account === 'string' &&
    typeof n.bank_holder === 'string'

  if (!hasBank) return null

  return {
    bank_name: n.bank_name,
    bank_account: n.bank_account,
    bank_holder: n.bank_holder,
    gross_amount: typeof n.gross_amount === 'number' ? n.gross_amount : undefined,
    admin_fee: typeof n.admin_fee === 'number' ? n.admin_fee : undefined,
    net_amount: typeof n.net_amount === 'number' ? n.net_amount : undefined,
  }
})

// Notes text untuk kasus string biasa atau object non-bank
const notesText = computed(() => {
  const n = notesParsed.value
  if (!n) return ''
  if (typeof n === 'string') return n

  // kalau bankNotes, kita tampilkan blok khusus (jadi notesText kosong)
  if (bankNotes.value) return ''

  // kalau object lain: cari field yang manusiawi
  if (typeof n.message === 'string') return n.message
  if (typeof n.description === 'string') return n.description
  if (typeof n.label === 'string') return n.label

  // fallback stringify singkat
  try {
    return JSON.stringify(n)
  } catch {
    return '[notes]'
  }
})

const checkPaymentStatus = async (transactionRef: string) => {
  if (checkingStatus.value) return
  checkingStatus.value = true

  try {
    const response = await axios.post('/client/wallet/check-status', {
      transaction_ref: transactionRef,
    })

    if (response.data.success) {
      localStatus.value = response.data.status

      emit('status-updated', {
        transactionRef,
        status: response.data.status,
        newBalance: response.data.new_balance,
      })

      toast.success(response.data.message)

      setTimeout(() => {
        router.reload({ only: ['customer', 'transactions'] })
      }, 500)
    } else {
      toast.error(response.data.message)
    }
  } catch (error: any) {
    console.error('Check status error:', error)
    toast.error(error.response?.data?.message || 'Gagal memeriksa status pembayaran')
  } finally {
    checkingStatus.value = false
  }
}
</script>

<template>
  <div class="p-3 border rounded-lg">
    <!-- Header: Date & Type -->
    <div class="flex items-start justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <div
          class="p-1.5 rounded-full shrink-0"
          :class="{
            'bg-emerald-100 dark:bg-emerald-900/20': isCredit,
            'bg-red-100 dark:bg-red-900/20': !isCredit,
          }"
        >
          <ArrowDownLeft
            v-if="isCredit"
            class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
          />
          <ArrowUpRight
            v-else
            class="w-3.5 h-3.5 text-red-600 dark:text-red-400"
          />
        </div>
        <div>
          <p class="font-semibold text-sm">
            {{ getTransactionTypeLabel(transaction.type) }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ formatDate(transaction.created_at) }}
          </p>
        </div>
      </div>

      <Badge
        variant="secondary"
        class="shrink-0"
        :class="{
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100': localStatus === 'pending',
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100': localStatus === 'completed',
          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100':
            localStatus === 'failed' || localStatus === 'cancelled',
        }"
      >
        {{ getTransactionStatusLabel(localStatus) }}
      </Badge>
    </div>

    <!-- Description / Notes -->
    <div class="mb-2 text-xs text-muted-foreground space-y-1">
      <!-- Case 1: notes string biasa -->
      <p v-if="notesText" class="line-clamp-2">
        {{ notesText }}
      </p>

      <!-- Case 2: notes JSON bank (withdrawal) -->
      <div v-else-if="bankNotes" class="space-y-1">
        <p class="text-foreground/80 font-medium">
          Rekening: {{ bankNotes.bank_name }} - {{ bankNotes.bank_account }}
        </p>
        <p>
          a.n {{ bankNotes.bank_holder }}
        </p>

        <div class="grid grid-cols-3 gap-2 pt-1">
          <div>
            <p class="text-[11px] text-muted-foreground">Gross</p>
            <p class="text-foreground/90 font-medium">
              {{ bankNotes.gross_amount != null ? safeFormatCurrency(bankNotes.gross_amount) : '-' }}
            </p>
          </div>
          <div class="border-x px-2">
            <p class="text-[11px] text-muted-foreground">Admin</p>
            <p class="text-foreground/90 font-medium">
              {{ bankNotes.admin_fee != null ? safeFormatCurrency(bankNotes.admin_fee) : '-' }}
            </p>
          </div>
          <div>
            <p class="text-[11px] text-muted-foreground">Net</p>
            <p class="text-foreground/90 font-medium">
              {{ bankNotes.net_amount != null ? safeFormatCurrency(bankNotes.net_amount) : '-' }}
            </p>
          </div>
        </div>
      </div>

      <!-- always show ref -->
      <p>Ref: {{ transaction.transaction_ref }}</p>
    </div>

    <!-- Rekening Koran Style: Debit | Kredit | Saldo -->
    <div class="grid grid-cols-3 gap-2 text-xs border-t pt-2">
      <div class="text-center">
        <p class="text-muted-foreground mb-0.5">Debit</p>
        <p class="font-semibold text-red-600 dark:text-red-400">
          {{ !isCredit ? safeFormatCurrency(transaction.amount) : '-' }}
        </p>
      </div>

      <div class="text-center border-x">
        <p class="text-muted-foreground mb-0.5">Kredit</p>
        <p class="font-semibold text-emerald-600 dark:text-emerald-400">
          {{ isCredit ? safeFormatCurrency(transaction.amount) : '-' }}
        </p>
      </div>

      <div class="text-center">
        <p class="text-muted-foreground mb-0.5">Saldo</p>
        <p class="font-semibold">
          {{ safeFormatCurrency(transaction.balance_after) }}
        </p>
      </div>
    </div>

    <!-- Action button for pending topup transactions -->
    <div
      v-if="transaction.type === 'topup' && localStatus === 'pending' && transaction.midtrans_transaction_id"
      class="mt-3 pt-3 border-t"
    >
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p class="text-xs text-muted-foreground">Pembayaran menunggu konfirmasi</p>

        <div class="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            :disabled="checkingStatus"
            @click="checkPaymentStatus(transaction.transaction_ref)"
            class="shrink-0"
          >
            <RefreshCw class="w-3 h-3 mr-1" :class="{ 'animate-spin': checkingStatus }" />
            Cek Status
          </Button>

          <Button
            size="sm"
            @click="emit('continue-payment', transaction.midtrans_transaction_id)"
            class="shrink-0"
          >
            <CreditCard class="w-3 h-3 mr-1" />
            Lanjutkan Pembayaran
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
