<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-vue-next';
import type { WalletTransaction } from '@/types/profile';
import WalletTransactionCard from './WalletTransactionCard.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

defineProps<{
    transactions: WalletTransaction[];
}>();

const page = usePage();

const customer = computed(() => page.props.customer);

const continuePayment = (snapToken: string) => {
    if ((window as any).snap) {
        (window as any).snap.pay(snapToken, {
            onSuccess: function(result: any) {
                console.log('Payment success:', result);
                window.location.href = '/client/profile?tab=wallet';
            },
            onPending: function(result: any) {
                console.log('Payment pending:', result);
                window.location.href = '/client/profile?tab=wallet';
            },
            onError: function(result: any) {
                console.error('Payment error:', result);
            },
            onClose: function() {
                console.log('Payment modal closed');
            }
        });
    } else {
        alert('Midtrans Snap belum siap. Silakan refresh halaman.');
    }
};

const handleStatusUpdated = (data: { transactionRef: string; status: string; newBalance?: number }) => {
    // Update customer balance immediately if available
    if (data.newBalance !== undefined && customer.value) {
        (customer.value as any).ewallet_saldo = data.newBalance;
    }
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Riwayat Transaksi</CardTitle>
            <CardDescription>
                {{ transactions.length }} transaksi e-wallet terbaru
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div v-if="transactions.length > 0" class="space-y-3">
                <WalletTransactionCard
                    v-for="transaction in transactions"
                    :key="transaction.id"
                    :transaction="transaction"
                    @continue-payment="continuePayment"
                    @status-updated="handleStatusUpdated"
                />
            </div>
            <div v-else class="py-12 text-center">
                <Wallet class="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p class="text-muted-foreground">Belum ada transaksi</p>
            </div>
        </CardContent>
    </Card>
</template>
