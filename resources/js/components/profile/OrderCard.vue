<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFormatter } from '@/composables/useFormatter';
import type { Order } from '@/types/profile';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
import { CheckCircle, Package, PackageCheck, RefreshCw, Star } from 'lucide-vue-next';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import OrderDetailSheet from './OrderDetailSheet.vue';
import ProductReviewDialog from './ProductReviewDialog.vue';

const props = defineProps<{
    order: Order;
}>();

const { formatCurrency, formatDate, getStatusLabel } = useFormatter();

const sheetOpen = ref(false);
const reviewDialogOpen = ref(false);
const checkingStatus = ref(false);
const completingOrder = ref(false);
const localStatus = ref(props.order.status);
const localPaidAt = ref(props.order.paid_at);

const checkPaymentStatus = async () => {
    if (checkingStatus.value) return;

    checkingStatus.value = true;

    try {
        const response = await axios.post(
            `/api/client/orders/${props.order.id}/check-payment-status`,
        );

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
        toast.error(
            error.response?.data?.message ||
                'Gagal memeriksa status pembayaran',
        );
    } finally {
        checkingStatus.value = false;
    }
};

const completeOrder = async () => {
    if (completingOrder.value) return;

    completingOrder.value = true;

    try {
        const response = await axios.post(
            `/api/client/orders/${props.order.id}/complete`,
        );

        if (response.data.success) {
            // Update local status immediately
            localStatus.value = 'COMPLETED';

            toast.success(
                response.data.message || 'Pesanan berhasil diselesaikan',
            );

            // Update order items for review dialog
            if (response.data.items && response.data.items.length > 0) {
                // Open review dialog with items from response
                (props.order as any).items = response.data.items;
                reviewDialogOpen.value = true;
            } else {
                // No items to review, just reload
                setTimeout(() => {
                    router.reload({ only: ['orders'] });
                }, 500);
            }
        }
    } catch (error: any) {
        console.error('Complete order error:', error);
        toast.error(
            error.response?.data?.message ||
                'Gagal menandai pesanan sebagai diterima',
        );
    } finally {
        completingOrder.value = false;
    }
};

const handleReviewSubmitted = () => {
    // Reload orders after reviews are submitted
    router.reload({ only: ['orders'] });
};

const openReviewDialog = () => {
    // Filter items that haven't been reviewed
    const unreviewedItems = (props.order.items || []).filter(item => !item.has_review);

    if (unreviewedItems.length > 0) {
        // Update order items to only unreviewed items
        (props.order as any).items = unreviewedItems;
        reviewDialogOpen.value = true;
    } else {
        toast.info('Semua produk sudah direview');
    }
};
</script>

<template>
    <div class="rounded-lg border p-4 transition-colors hover:border-primary">
        <div
            class="flex flex-col justify-between gap-4 md:flex-row md:items-center"
        >
            <div class="flex-1">
                <div class="mb-2 flex items-center gap-3">
                    <Package class="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p class="text-sm font-semibold">
                            {{ order.order_no }}
                        </p>
                        <p class="text-xs text-muted-foreground">
                            {{
                                order.placed_at
                                    ? formatDate(order.placed_at)
                                    : 'Belum ditempatkan'
                            }}
                        </p>
                        <p v-if="order.type" class="text-xs font-medium" :class="{
                            'text-blue-600 dark:text-blue-400': order.type === 'planA',
                            'text-amber-600 dark:text-amber-400': order.type === 'planB',
                        }">
                            {{ order.type === 'planA' ? 'Network Builder' : 'Retail' }}
                        </p>
                    </div>
                </div>
                <div class="mt-2 flex items-center gap-2">
                    <Badge
                        :class="{
                            'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100':
                                localStatus.toUpperCase() === 'PENDING',
                            'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100':
                                localStatus.toUpperCase() === 'PROCESSING' ||
                                localStatus.toUpperCase() === 'PAID',
                            'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100':
                                localStatus.toUpperCase() === 'SHIPPED',
                            'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100':
                                localStatus.toUpperCase() === 'DELIVERED' ||
                                localStatus.toUpperCase() === 'COMPLETED',
                            'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100':
                                localStatus.toUpperCase() === 'CANCELLED',
                        }"
                    >
                        {{ getStatusLabel(localStatus) }}
                    </Badge>
                    <Badge v-if="localPaidAt" variant="secondary">
                        <CheckCircle class="mr-1 h-3 w-3" />
                        Dibayar
                    </Badge>
                </div>
            </div>
            <div class="flex flex-col gap-2 md:items-end">
                <p class="text-lg font-bold text-primary">
                    {{ formatCurrency(order.grand_total) }}
                </p>
                <div class="flex flex-wrap gap-2">
                    <Button
                        v-if="
                            localStatus.toUpperCase() === 'PENDING' &&
                            !localPaidAt
                        "
                        variant="outline"
                        size="sm"
                        :disabled="checkingStatus"
                        @click="checkPaymentStatus"
                    >
                        <RefreshCw
                            class="mr-1 h-3 w-3"
                            :class="{ 'animate-spin': checkingStatus }"
                        />
                        Cek Status
                    </Button>
                    <Button
                        v-if="localStatus.toUpperCase() === 'SHIPPED'"
                        variant="default"
                        size="sm"
                        :disabled="completingOrder"
                        @click="completeOrder"
                    >
                        <PackageCheck class="mr-1 h-3 w-3" />
                        Pesanan Diterima
                    </Button>
                    <Button
                        v-if="localStatus.toUpperCase() === 'COMPLETED' && order.has_unreviewed_items"
                        variant="outline"
                        size="sm"
                        @click="openReviewDialog"
                    >
                        <Star class="mr-1 h-3 w-3" />
                        Tambah Review
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        @click="sheetOpen = true"
                    >
                        Lihat Detail
                    </Button>
                </div>
            </div>
        </div>

        <OrderDetailSheet v-model:open="sheetOpen" :order-id="order.id" />

        <ProductReviewDialog
            v-model:open="reviewDialogOpen"
            :order-id="order.id"
            :order-items="order.items || []"
            @review-submitted="handleReviewSubmitted"
        />
    </div>
</template>
