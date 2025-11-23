<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, RefreshCw, PackageCheck } from 'lucide-vue-next';
import type { Order } from '@/types/profile';
import { useFormatter } from '@/composables/useFormatter';
import { ref } from 'vue';
import OrderDetailSheet from './OrderDetailSheet.vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

const props = defineProps<{
    order: Order;
}>();

const { formatCurrency, formatDate, getStatusLabel } = useFormatter();

const sheetOpen = ref(false);
const checkingStatus = ref(false);
const completingOrder = ref(false);
const localStatus = ref(props.order.status);
const localPaidAt = ref(props.order.paid_at);

const checkPaymentStatus = async () => {
    if (checkingStatus.value) return;

    checkingStatus.value = true;

    try {
        const response = await axios.post(`/api/client/orders/${props.order.id}/check-payment-status`);

        if (response.data.success) {
            // Update local status immediately
            localStatus.value = response.data.status;
            if (response.data.paid_at) {
                localPaidAt.value = response.data.paid_at;
            }

            toast.success(response.data.message);

            // Reload to ensure everything is in sync
            setTimeout(() => {
                router.reload({ only: ['orders'] });
            }, 500);
        } else {
            toast.error(response.data.message);
        }
    } catch (error: any) {
        console.error('Check payment status error:', error);
        toast.error(error.response?.data?.message || 'Gagal memeriksa status pembayaran');
    } finally {
        checkingStatus.value = false;
    }
};

const completeOrder = async () => {
    if (completingOrder.value) return;

    completingOrder.value = true;

    try {
        const response = await axios.post(`/api/client/orders/${props.order.id}/complete`);

        if (response.data.message) {
            // Update local status immediately
            localStatus.value = 'COMPLETED';

            toast.success(response.data.message);

            // Reload to ensure everything is in sync
            setTimeout(() => {
                router.reload({ only: ['orders'] });
            }, 500);
        }
    } catch (error: any) {
        console.error('Complete order error:', error);
        toast.error(error.response?.data?.message || 'Gagal menandai pesanan sebagai diterima');
    } finally {
        completingOrder.value = false;
    }
};
</script>

<template>
    <div class="p-4 border rounded-lg hover:border-primary transition-colors">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <Package class="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p class="font-semibold text-sm">{{ order.order_no }}</p>
                        <p class="text-xs text-muted-foreground">
                            {{ order.placed_at ? formatDate(order.placed_at) : 'Belum ditempatkan' }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <Badge
                        :class="{
                            'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100': localStatus.toUpperCase() === 'PENDING',
                            'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100': localStatus.toUpperCase() === 'PROCESSING' || localStatus.toUpperCase() === 'PAID',
                            'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100': localStatus.toUpperCase() === 'SHIPPED',
                            'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100': localStatus.toUpperCase() === 'DELIVERED' || localStatus.toUpperCase() === 'COMPLETED',
                            'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100': localStatus.toUpperCase() === 'CANCELLED',
                        }"
                    >
                        {{ getStatusLabel(localStatus) }}
                    </Badge>
                    <Badge v-if="localPaidAt" variant="secondary">
                        <CheckCircle class="w-3 h-3 mr-1" />
                        Dibayar
                    </Badge>
                </div>
            </div>
            <div class="flex flex-col md:items-end gap-2">
                <p class="text-lg font-bold text-primary">
                    {{ formatCurrency(order.grand_total) }}
                </p>
                <div class="flex flex-wrap gap-2">
                    <Button
                        v-if="localStatus.toUpperCase() === 'PENDING' && !localPaidAt"
                        variant="outline"
                        size="sm"
                        :disabled="checkingStatus"
                        @click="checkPaymentStatus"
                    >
                        <RefreshCw class="w-3 h-3 mr-1" :class="{ 'animate-spin': checkingStatus }" />
                        Cek Status
                    </Button>
                    <Button
                        v-if="localStatus.toUpperCase() === 'SHIPPED'"
                        variant="default"
                        size="sm"
                        :disabled="completingOrder"
                        @click="completeOrder"
                    >
                        <PackageCheck class="w-3 h-3 mr-1" />
                        Pesanan Diterima
                    </Button>
                    <Button variant="outline" size="sm" @click="sheetOpen = true">
                        Lihat Detail
                    </Button>
                </div>
            </div>
        </div>

        <OrderDetailSheet
            v-model:open="sheetOpen"
            :order-id="order.id"
        />
    </div>
</template>
