<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { WalletTransaction } from '@/types/profile';
import axios from 'axios';

const props = defineProps<{
  initialTransactions?: WalletTransaction[];
}>();

const loading = ref(false);
const error = ref<string | null>(null);
const latest = ref<WalletTransaction | null>(null);

const statusInfo = computed(() => {
  const s = latest.value?.status || '';
  if (s === 'completed' || s === 'success') {
    return { tone: 'success', title: 'Top up berhasil', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-900', text: 'text-green-800 dark:text-green-200' };
  }
  if (s === 'pending') {
    return { tone: 'pending', title: 'Menunggu pembayaran', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-900', text: 'text-yellow-800 dark:text-yellow-200' };
  }
  if (s === 'cancelled' || s === 'failed' || s === 'expire' || s === 'denied' || s === 'deny') {
    return { tone: 'failed', title: 'Pembayaran gagal / dibatalkan', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-900', text: 'text-red-800 dark:text-red-200' };
  }
  return { tone: 'info', title: 'Status transaksi', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-900', text: 'text-blue-800 dark:text-blue-200' };
});

function isRecent(iso: string, hours = 2): boolean {
  const created = new Date(iso).getTime();
  const now = Date.now();
  const diffH = (now - created) / 36e5;
  return diffH <= hours;
}

const shouldShow = computed(() => {
  if (!latest.value) return false;
  const s = latest.value.status;
  if (s === 'pending') return true;
  if (s === 'completed' || s === 'success') return isRecent(latest.value.created_at, 2);
  return isRecent(latest.value.created_at, 6);
});

async function fetchLatest() {
  try {
    loading.value = true;
    error.value = null;
    const { data } = await axios.get('/client/wallet/history', { params: { type: 'topup' } });
    // Expect Laravel pagination shape: { data: WalletTransaction[], ... }
    const items: WalletTransaction[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    if (items.length > 0) {
      latest.value = items[0];
    }
  } catch (e: any) {
    error.value = e?.response?.data?.message || e?.message || 'Gagal memuat status transaksi.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (props.initialTransactions && props.initialTransactions.length > 0) {
    latest.value = props.initialTransactions[0];
  }
  // Refresh from server to get the newest status
  fetchLatest();
});
</script>

<template>
  <div v-if="shouldShow" :class="['border rounded-lg p-4 flex items-start gap-3', statusInfo.border, statusInfo.bg]">
    <div class="flex-1">
      <p :class="['text-sm font-semibold', statusInfo.text]">{{ statusInfo.title }}</p>
      <p class="text-xs mt-1 text-gray-700 dark:text-gray-300" v-if="latest">
        Ref: <span class="font-mono">{{ latest.transaction_ref }}</span>
        • Jumlah: Rp {{ new Intl.NumberFormat('id-ID').format(latest.amount) }}
        • Status: <span class="uppercase">{{ latest.status }}</span>
      </p>
    </div>
    <button type="button" class="text-xs underline text-gray-700 dark:text-gray-300" @click="fetchLatest" :disabled="loading">
      {{ loading ? 'Menyegarkan...' : 'Segarkan' }}
    </button>
  </div>
  <div v-else-if="error" class="border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-xs text-amber-800 dark:text-amber-200">
    {{ error }}
  </div>
</template>
