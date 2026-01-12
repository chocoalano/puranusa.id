<script setup lang="ts">
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import type { Withdrawal } from '@/types/withdrawal'
import { formatCurrencyIDR } from '@/utils/formatters'

const approveDialog = defineModel<{ open: boolean; withdrawal: Withdrawal | null }>('approveDialog', {
  required: true,
})
const rejectDialog = defineModel<{ open: boolean; withdrawal: Withdrawal | null }>('rejectDialog', {
  required: true,
})

defineEmits<{
  (e: 'approve'): void
  (e: 'reject'): void
}>()
</script>

<template>
  <ConfirmDialog
    v-model:open="approveDialog.open"
    title="Setujui Withdrawal?"
    :description="`Apakah Anda yakin ingin menyetujui permintaan withdrawal sebesar ${approveDialog.withdrawal ? formatCurrencyIDR(approveDialog.withdrawal.amount) : ''} untuk ${approveDialog.withdrawal?.customer.name}? Dana akan ditransfer via Midtrans ke rekening tujuan.`"
    confirm-text="Setujui & Transfer"
    cancel-text="Batal"
    @confirm="$emit('approve')"
  />

  <ConfirmDialog
    v-model:open="rejectDialog.open"
    title="Tolak Withdrawal?"
    :description="`Apakah Anda yakin ingin menolak permintaan withdrawal sebesar ${rejectDialog.withdrawal ? formatCurrencyIDR(rejectDialog.withdrawal.amount) : ''} dari ${rejectDialog.withdrawal?.customer.name}?`"
    confirm-text="Tolak"
    cancel-text="Batal"
    variant="destructive"
    @confirm="$emit('reject')"
  />
</template>
