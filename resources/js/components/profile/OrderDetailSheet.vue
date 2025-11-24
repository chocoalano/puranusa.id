<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, MapPin, Truck, CreditCard, Loader2 } from 'lucide-vue-next';
import { useFormatter } from '@/composables/useFormatter';
import { toast } from 'vue-sonner';

interface OrderItem {
    id: number;
    name: string;
    sku: string;
    qty: number;
    unit_price: number;
    row_total: number;
    weight_gram: number;
    meta_json?: {
        image?: string;
    };
}

interface ShippingAddress {
    id: number;
    recipient_name: string;
    recipient_phone: string;
    address_line1: string;
    city_label: string;
    province_label: string;
    postal_code: string;
}

interface OrderDetail {
    id: number;
    order_no: string;
    status: string;
    currency: string;
    subtotal_amount: number;
    discount_amount: number;
    shipping_amount: number;
    tax_amount: number;
    grand_total: number;
    notes: string | null;
    placed_at: string | null;
    paid_at: string | null;
    applied_promos?: {
        shipping?: {
            courier: string;
            service: string;
            etd: string;
            cost: number;
        };
    };
    items: OrderItem[];
    shipping_address: ShippingAddress | null;
}

interface Props {
    open: boolean;
    orderId: number | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const { formatCurrency, formatDate, getStatusLabel } = useFormatter();

const loadingOrder = ref(false);
const updatingStatus = ref(false);
const orderDetail = ref<OrderDetail | null>(null);

const canMarkCompleted = computed(() => {
    return orderDetail.value?.status?.toUpperCase() === 'SHIPPED';
});

const statusBadgeClass = computed(() => {
    const status = orderDetail.value?.status?.toLowerCase();
    return {
        'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100': status === 'pending',
        'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100': status === 'processing' || status === 'paid',
        'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-100': status === 'shipped',
        'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100': status === 'delivered' || status === 'completed',
        'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100': status === 'cancelled',
    };
});

const loadOrderDetail = async () => {
    if (!props.orderId) return;

    loadingOrder.value = true;
    try {
        const response = await axios.get(`/api/client/orders/${props.orderId}`);
        orderDetail.value = response.data.data;
    } catch (error) {
        console.error('Failed to load order:', error);
        toast.error('Gagal memuat detail pesanan');
    } finally {
        loadingOrder.value = false;
    }
};

const markAsCompleted = async () => {
    if (!orderDetail.value || !canMarkCompleted.value || updatingStatus.value) return;

    updatingStatus.value = true;
    try {
        await axios.post(`/api/client/orders/${orderDetail.value.id}/complete`);

        // Refresh order detail
        await loadOrderDetail();

        // Refresh the orders list on the profile page
        router.reload({ only: ['orders'] });
        toast.success('Status pesanan berhasil diperbarui menjadi "Selesai".');
    } catch (error: any) {
        console.error('Failed to update order status:', error);
        toast.error(error.response?.data?.message || 'Gagal memperbarui status pesanan');
    } finally {
        updatingStatus.value = false;
    }
};

// Watch for open state and orderId changes to load order detail
watch(
    () => [props.open, props.orderId],
    ([isOpen, id]) => {
        if (isOpen && id) {
            loadOrderDetail();
        }
    }
);
</script>

<template>
    <Sheet :open="open" @update:open="(val) => emit('update:open', val)">
        <SheetContent side="right" class="sm:max-w-2xl w-full overflow-y-auto">
            <SheetHeader>
                <SheetTitle>Detail Pesanan</SheetTitle>
                <SheetDescription>
                    Informasi lengkap pesanan Anda
                </SheetDescription>
            </SheetHeader>

            <div v-if="loadingOrder" class="flex items-center justify-center py-12">
                <Loader2 class="h-8 w-8 animate-spin text-muted-foreground" />
            </div>

            <div v-else-if="orderDetail" class="space-y-6 py-6">
                <!-- Order Summary -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <Package class="h-4 w-4" />
                        <span>Ringkasan Pesanan</span>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm text-muted-foreground">Nomor Pesanan</span>
                            <span class="text-sm font-medium">{{ orderDetail.order_no }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-muted-foreground">Status</span>
                            <Badge :class="statusBadgeClass">
                                {{ getStatusLabel(orderDetail.status) }}
                            </Badge>
                        </div>
                        <div v-if="orderDetail.placed_at" class="flex justify-between">
                            <span class="text-sm text-muted-foreground">Tanggal Pesan</span>
                            <span class="text-sm font-medium">{{ formatDate(orderDetail.placed_at) }}</span>
                        </div>
                        <div v-if="orderDetail.paid_at" class="flex justify-between items-center">
                            <span class="text-sm text-muted-foreground">Status Pembayaran</span>
                            <Badge variant="secondary">
                                <CheckCircle class="w-3 h-3 mr-1" />
                                Dibayar {{ formatDate(orderDetail.paid_at) }}
                            </Badge>
                        </div>
                    </div>
                </div>

                <Separator />

                <!-- Order Items -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <Package class="h-4 w-4" />
                        <span>Produk Pesanan</span>
                    </div>
                    <div class="space-y-3">
                        <div
                            v-for="item in orderDetail.items"
                            :key="item.id"
                            class="flex gap-4 p-3 bg-muted/30 rounded-lg"
                        >
                            <img
                                v-if="item.meta_json?.image"
                                :src="item.meta_json.image"
                                :alt="item.name"
                                class="w-16 h-16 object-cover rounded-md"
                            />
                            <div class="flex-1">
                                <h4 class="font-medium text-sm">{{ item.name }}</h4>
                                <p class="text-xs text-muted-foreground">SKU: {{ item.sku }}</p>
                                <p class="text-xs text-muted-foreground">{{ item.qty }}x {{ formatCurrency(item.unit_price) }}</p>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold text-sm">{{ formatCurrency(item.row_total) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                <!-- Shipping Address -->
                <div v-if="orderDetail.shipping_address" class="space-y-3">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <MapPin class="h-4 w-4" />
                        <span>Alamat Pengiriman</span>
                    </div>
                    <div class="p-3 bg-muted/30 rounded-lg space-y-1">
                        <p class="font-medium text-sm">{{ orderDetail.shipping_address.recipient_name }}</p>
                        <p class="text-sm text-muted-foreground">{{ orderDetail.shipping_address.recipient_phone }}</p>
                        <p class="text-sm text-muted-foreground">
                            {{ orderDetail.shipping_address.address_line1 }}
                        </p>
                        <p class="text-sm text-muted-foreground">
                            {{ orderDetail.shipping_address.city_label }}, {{ orderDetail.shipping_address.province_label }} {{ orderDetail.shipping_address.postal_code }}
                        </p>
                    </div>
                </div>

                <Separator />

                <!-- Shipping Info -->
                <div v-if="orderDetail.applied_promos?.shipping" class="space-y-3">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <Truck class="h-4 w-4" />
                        <span>Informasi Pengiriman</span>
                    </div>
                    <div class="p-3 bg-muted/30 rounded-lg space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm text-muted-foreground">Kurir</span>
                            <span class="text-sm font-medium">{{ orderDetail.applied_promos.shipping.courier }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-muted-foreground">Layanan</span>
                            <span class="text-sm font-medium">{{ orderDetail.applied_promos.shipping.service }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-muted-foreground">Estimasi</span>
                            <span class="text-sm font-medium">{{ orderDetail.applied_promos.shipping.etd }} hari</span>
                        </div>
                    </div>
                </div>

                <Separator />

                <!-- Price Summary -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <CreditCard class="h-4 w-4" />
                        <span>Ringkasan Pembayaran</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Subtotal</span>
                            <span>{{ formatCurrency(orderDetail.subtotal_amount) }}</span>
                        </div>
                        <div v-if="orderDetail.discount_amount > 0" class="flex justify-between">
                            <span class="text-muted-foreground">Diskon</span>
                            <span class="text-red-600">-{{ formatCurrency(orderDetail.discount_amount) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Ongkos Kirim</span>
                            <span>{{ formatCurrency(orderDetail.shipping_amount) }}</span>
                        </div>
                        <div v-if="orderDetail.tax_amount > 0" class="flex justify-between">
                            <span class="text-muted-foreground">Pajak</span>
                            <span>{{ formatCurrency(orderDetail.tax_amount) }}</span>
                        </div>
                        <Separator />
                        <div class="flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span class="text-primary">{{ formatCurrency(orderDetail.grand_total) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Notes -->
                <div v-if="orderDetail.notes" class="space-y-2">
                    <Separator />
                    <div class="space-y-1">
                        <p class="text-sm font-medium">Catatan</p>
                        <p class="text-sm text-muted-foreground">{{ orderDetail.notes }}</p>
                    </div>
                </div>

                <!-- Mark as Completed Button -->
                <div v-if="canMarkCompleted" class="pt-4">
                    <Button
                        @click="markAsCompleted"
                        :disabled="updatingStatus"
                        class="w-full"
                        size="lg"
                    >
                        <Loader2 v-if="updatingStatus" class="h-4 w-4 mr-2 animate-spin" />
                        <CheckCircle v-else class="h-4 w-4 mr-2" />
                        Tandai Pesanan Selesai
                    </Button>
                </div>
            </div>

            <div v-else class="flex items-center justify-center py-12 text-muted-foreground">
                Tidak ada data pesanan
            </div>
        </SheetContent>
    </Sheet>
</template>
