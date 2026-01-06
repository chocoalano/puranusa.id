<script setup lang="ts">
import { ref } from 'vue';
import type { Customer, WalletTransaction } from '@/types/profile';
import WalletBalance from './wallet/WalletBalance.vue';
import WalletTopupForm from './wallet/WalletTopupForm.vue';
import WalletWithdrawalForm from './wallet/WalletWithdrawalForm.vue';
import WalletTransactionList from './wallet/WalletTransactionList.vue';
import WalletStatusBanner from './wallet/WalletStatusBanner.vue';

defineProps<{
    customer: Customer;
    transactions: WalletTransaction[];
    hasPendingWithdrawal?: boolean;
}>();

const walletView = ref<string>('wallet');
</script>

<template>
    <div class="space-y-6">
        <WalletBalance
            :balance="Number(customer.ewallet_saldo) || 0"
            @topup="walletView = 'wallet-topup'"
            @withdrawal="walletView = 'wallet-withdrawal'"
        />

        <WalletStatusBanner
            v-if="walletView === 'wallet'"
            :initial-transactions="transactions"
        />

        <WalletTopupForm
            v-if="walletView === 'wallet-topup'"
            @cancel="walletView = 'wallet'"
        />

        <WalletWithdrawalForm
            v-if="walletView === 'wallet-withdrawal'"
            :customer="customer"
            :max-amount="Number(customer.ewallet_saldo) || 0"
            :has-pending-withdrawal="hasPendingWithdrawal"
            @cancel="walletView = 'wallet'"
        />

        <WalletTransactionList
            v-if="walletView === 'wallet'"
            :transactions="transactions"
        />
    </div>
</template>
