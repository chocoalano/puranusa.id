<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDownLeft, ArrowUpRight, CreditCard, RefreshCw } from 'lucide-vue-next';
import type { WalletTransaction } from '@/types/profile';
import { useFormatter } from '@/composables/useFormatter';
import { ref, computed } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

const props = defineProps<{
    transaction: WalletTransaction;
}>();

const emit = defineEmits<{
    (e: 'continue-payment', snapToken: string): void;
    (e: 'status-updated', data: { transactionRef: string; status: string; newBalance?: number }): void;
}>();

const { formatCurrency, formatDate, getTransactionTypeLabel, getTransactionStatusLabel } = useFormatter();

const checkingStatus = ref(false);
const localStatus = ref(props.transaction.status);

// Kredit = uang masuk (topup, bonus, refund)
// Debit = uang keluar (withdrawal, purchase, deduct)
const creditTypes = ['topup', 'top_up', 'bonus', 'refund'];
const isCredit = computed(() => creditTypes.includes(props.transaction.type));

const checkPaymentStatus = async (transactionRef: string) => {
    if (checkingStatus.value) return;

    checkingStatus.value = true;

    try {
        const response = await axios.post('/client/wallet/check-status', {
            transaction_ref: transactionRef,
        });

        if (response.data.success) {
            // Update local status immediately
            localStatus.value = response.data.status;

            // Emit event to parent to update balance
            emit('status-updated', {
                transactionRef,
                status: response.data.status,
                newBalance: response.data.new_balance,
            });

            toast.success(response.data.message);

            // Reload to ensure everything is in sync
            setTimeout(() => {
                router.reload({ only: ['customer', 'transactions'] });
            }, 500);
        } else {
            toast.error(response.data.message);
        }
    } catch (error: any) {
        console.error('Check status error:', error);
        toast.error(error.response?.data?.message || 'Gagal memeriksa status pembayaran');
    } finally {
        checkingStatus.value = false;
    }
};
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
                    <ArrowDownLeft v-if="isCredit" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <ArrowUpRight v-else class="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                    <p class="font-semibold text-sm">{{ getTransactionTypeLabel(transaction.type) }}</p>
                    <p class="text-xs text-muted-foreground">{{ formatDate(transaction.created_at) }}</p>
                </div>
            </div>
            <Badge
                variant="secondary"
                class="shrink-0"
                :class="{
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100': localStatus === 'pending',
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100': localStatus === 'completed',
                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100': localStatus === 'failed' || localStatus === 'cancelled',
                }"
            >
                {{ getTransactionStatusLabel(localStatus) }}
            </Badge>
        </div>

        <!-- Description -->
        <div class="mb-2 text-xs text-muted-foreground">
            <p v-if="transaction.notes" class="line-clamp-2">{{ transaction.notes }}</p>
            <p>Ref: {{ transaction.transaction_ref }}</p>
        </div>

        <!-- Rekening Koran Style: Debit | Kredit | Saldo -->
        <div class="grid grid-cols-3 gap-2 text-xs border-t pt-2">
            <div class="text-center">
                <p class="text-muted-foreground mb-0.5">Debit</p>
                <p class="font-semibold text-red-600 dark:text-red-400">
                    {{ !isCredit && localStatus === 'completed' ? formatCurrency(transaction.amount) : '-' }}
                </p>
            </div>
            <div class="text-center border-x">
                <p class="text-muted-foreground mb-0.5">Kredit</p>
                <p class="font-semibold text-emerald-600 dark:text-emerald-400">
                    {{ isCredit && localStatus === 'completed' ? formatCurrency(transaction.amount) : '-' }}
                </p>
            </div>
            <div class="text-center">
                <p class="text-muted-foreground mb-0.5">Saldo</p>
                <p class="font-semibold">
                    {{ transaction.balance_after !== null && transaction.balance_after !== undefined ? formatCurrency(transaction.balance_after) : '-' }}
                </p>
            </div>
        </div>

        <!-- Action button for pending topup transactions -->
        <div v-if="transaction.type === 'topup' && localStatus === 'pending' && transaction.midtrans_transaction_id" class="mt-3 pt-3 border-t">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <p class="text-xs text-muted-foreground">
                    Pembayaran menunggu konfirmasi
                </p>
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
