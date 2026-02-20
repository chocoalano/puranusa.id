<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Printer, Download } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import axios from 'axios';

interface OrderItem {
    id: number;
    product: {
        name: string;
        sku: string;
    };
    qty: number;
    unit_price?: number | string | null;
    row_total?: number | string | null;
    price?: number | string | null;
    total?: number | string | null;
}

interface OrderAddress {
    recipient_name?: string | null;
    recipient_phone?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city_label?: string | null;
    province_label?: string | null;
    postal_code?: string | null;
    country?: string | null;
    full_name?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    province?: string | null;
}

interface Order {
    id: number;
    order_no: string;
    customer: {
        name: string;
        email: string;
        phone?: string;
    };
    shippingAddress?: OrderAddress | null;
    billingAddress?: OrderAddress | null;
    shipping_address?: OrderAddress | null;
    billing_address?: OrderAddress | null;
    items: OrderItem[];
    subtotal_amount: number;
    discount_amount: number;
    shipping_amount: number;
    tax_amount: number;
    grand_total: number;
    payment_status: string;
    status: string;
    created_at: string;
    paid_at?: string;
    payments?: Array<{
        method?: {
            name: string;
            code: string;
        };
        amount: number;
        status: string;
        created_at: string;
    }>;
}

interface Props {
    open: boolean;
    orderId: number | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:open', value: boolean): void;
}>();

const companyLogoUrl = '/storage/logos/jKNIuJViG3uBVnl5x7kWFPahJGXBhx8yLeri4qb0.png';

const order = ref<Order | null>(null);
const loading = ref(false);

const PICKUP_OFFICE_ADDRESS_LINES = [
    '18 Office Park Building, 21TH Floor Unit C',
    'Jl. TB Simatupang No.18, Jakarta Selatan',
    'DKI Jakarta',
];

const isMeaningfulAddressValue = (value?: string | null) => {
    if (!value) return false;
    const trimmedValue = value.trim();

    return trimmedValue !== '' && trimmedValue !== '-';
};

const buildAddressLines = (address?: OrderAddress | null) => {
    if (!address) return [];

    const line1 = (address.address_line1 ?? address.address ?? '').trim();
    const line2 = address.address_line2?.trim() ?? '';
    const isPickupAddress =
        line1.toUpperCase().includes('PICKUP') || line2.toUpperCase().includes('PICKUP');

    if (isPickupAddress) {
        return PICKUP_OFFICE_ADDRESS_LINES;
    }

    const lines: string[] = [];

    if (isMeaningfulAddressValue(line1)) {
        lines.push(line1);
    }

    if (isMeaningfulAddressValue(line2)) {
        lines.push(line2);
    }

    const cityProvince = [address.city_label ?? address.city, address.province_label ?? address.province]
        .filter((value) => isMeaningfulAddressValue(value))
        .join(', ');
    const rawPostalCode = address.postal_code?.trim() ?? '';
    const postalCode = isMeaningfulAddressValue(rawPostalCode)
        ? rawPostalCode
        : '';

    const cityProvincePostal = [cityProvince, postalCode]
        .filter((value) => value.length > 0)
        .join(' ');

    if (cityProvincePostal) {
        lines.push(cityProvincePostal);
    }

    const country = address.country?.trim() ?? '';
    if (isMeaningfulAddressValue(country)) {
        lines.push(country);
    }

    return lines;
};

const billTo = computed(() => {
    if (!order.value) return null;

    const selectedAddress =
        order.value.billing_address ??
        order.value.billingAddress ??
        order.value.shipping_address ??
        order.value.shippingAddress;
    const phone =
        selectedAddress?.recipient_phone?.trim() ||
        selectedAddress?.phone?.trim() ||
        order.value.customer.phone?.trim() ||
        null;

    return {
        name:
            selectedAddress?.recipient_name?.trim() ||
            selectedAddress?.full_name?.trim() ||
            order.value.customer.name,
        email: order.value.customer.email,
        phone,
        addressLines: buildAddressLines(selectedAddress),
    };
});

type CurrencyValue = number | string | null | undefined;

const toSafeNumber = (value: CurrencyValue) => {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : 0;
    }

    if (typeof value === 'string') {
        const normalized = value.replace(/[^0-9.-]/g, '');
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    return 0;
};

const formatCurrency = (amount: CurrencyValue) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(toSafeNumber(amount));
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const formatDateTime = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const fetchOrderData = async () => {
    if (!props.orderId) return;

    loading.value = true;
    try {
        const response = await axios.get(`/admin/orders/${props.orderId}/invoice`);
        order.value = response.data.data;
    } catch (error) {
        console.error('Failed to fetch order data:', error);
    } finally {
        loading.value = false;
    }
};

const handlePrint = () => {
    window.print();
};

const handleDownloadPDF = () => {
    // Trigger browser print dialog with PDF option
    window.print();
};

watch(() => props.open, (newVal) => {
    if (newVal && props.orderId) {
        fetchOrderData();
    }
});
</script>

<template>
    <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
        <DialogContent class="max-w-7xl max-h-[90vh] overflow-y-auto print:max-w-full print:max-h-full print:overflow-visible">
            <!-- Accessibility - Hidden Title and Description -->
            <VisuallyHidden>
                <DialogTitle>Invoice {{ order?.order_no || '' }}</DialogTitle>
                <DialogDescription>
                    Detail invoice untuk order {{ order?.order_no || '' }}. Anda dapat mencetak atau mengunduh invoice ini.
                </DialogDescription>
            </VisuallyHidden>

            <!-- Close Button - Hide on print -->
            <!-- <Button
                variant="ghost"
                size="icon"
                class="absolute right-4 top-4 print:hidden"
                @click="emit('update:open', false)"
            >
                <X class="h-4 w-4" />
            </Button> -->

            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p class="mt-4 text-muted-foreground">Memuat invoice...</p>
                </div>
            </div>

            <!-- Invoice Content -->
            <div v-else-if="order" class="invoice-content">
                <!-- Action Buttons - Hide on print -->
                <div class="flex justify-end gap-2 mb-6 print:hidden">
                    <Button variant="outline" size="sm" @click="handlePrint">
                        <Printer class="h-4 w-4 mr-2" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm" @click="handleDownloadPDF">
                        <Download class="h-4 w-4 mr-2" />
                        Download PDF
                    </Button>
                </div>

                <!-- Invoice Header -->
                <div class="mb-8">
                    <div class="flex items-start justify-between">
                        <!-- Company Info -->
                        <div>
                            <div class="flex items-center gap-3 mb-2">
                                <!-- Logo Placeholder -->
                                <img :src="companyLogoUrl" alt="Puranusa Logo" class="w-16 h-16 object-contain" />
                                <div>
                                    <h1 class="text-2xl font-bold">PURANUSA</h1>
                                    <p class="text-sm text-muted-foreground">Natural Health & Wellness</p>
                                </div>
                            </div>
                            <div class="text-sm text-muted-foreground mt-3">
                                <p>18 Office Park Building, 21TH Floor Unit C</p>
                                <p>Jl. TB Simatupang No.18, Jakarta Selatan, DKI Jakarta</p>
                                <!-- <p>Email: info@puranusa.id</p>
                                <p>Telp: (021) 1234-5678</p> -->
                            </div>
                        </div>

                        <!-- Invoice Info -->
                        <div class="text-right">
                            <h2 class="text-3xl font-bold mb-2">INVOICE</h2>
                            <div class="space-y-1">
                                <p class="text-sm">
                                    <span class="font-semibold">Invoice No:</span>
                                    <span class="ml-2 font-mono">{{ order.order_no }}</span>
                                </p>
                                <p class="text-sm">
                                    <span class="font-semibold">Tanggal:</span>
                                    <span class="ml-2">{{ formatDate(order.created_at) }}</span>
                                </p>
                                <p class="text-sm">
                                    <span class="font-semibold">Status:</span>
                                    <span
                                        class="ml-2 px-2 py-1 rounded text-xs font-medium"
                                        :class="{
                                            'bg-green-100 text-green-800': order.payment_status === 'PAID',
                                            'bg-yellow-100 text-yellow-800': order.payment_status === 'PENDING'
                                        }"
                                    >
                                        {{ order.payment_status }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator class="my-6" />

                <!-- Bill To -->
                <div class="mb-8">
                    <div>
                        <h3 class="font-semibold text-sm mb-3 text-muted-foreground">BILL TO:</h3>
                        <div class="space-y-1">
                            <p class="font-semibold">{{ billTo?.name }}</p>
                            <p class="text-sm text-muted-foreground">{{ billTo?.email }}</p>
                            <p class="text-sm text-muted-foreground" v-if="billTo?.phone">
                                {{ billTo.phone }}
                            </p>
                            <div v-if="billTo?.addressLines.length" class="text-sm text-muted-foreground mt-2">
                                <p v-for="(line, index) in billTo.addressLines" :key="`${line}-${index}`">
                                    {{ line }}
                                </p>
                            </div>
                            <p v-else class="text-sm text-muted-foreground mt-2">Alamat tidak tersedia</p>
                        </div>
                    </div>
                </div>

                <!-- Items Table -->
                <div class="mb-8">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b-2 border-border">
                                <th class="text-left py-3 px-2 text-sm font-semibold">No</th>
                                <th class="text-left py-3 px-2 text-sm font-semibold">Produk</th>
                                <th class="text-center py-3 px-2 text-sm font-semibold">Qty</th>
                                <th class="text-right py-3 px-2 text-sm font-semibold">Harga</th>
                                <th class="text-right py-3 px-2 text-sm font-semibold">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in order.items"
                                :key="item.id"
                                class="border-b border-border"
                            >
                                <td class="py-3 px-2 text-sm">{{ index + 1 }}</td>
                                <td class="py-3 px-2">
                                    <div>
                                        <p class="font-medium">{{ item.product.name }}</p>
                                        <p class="text-xs text-muted-foreground">SKU: {{ item.product.sku }}</p>
                                    </div>
                                </td>
                                <td class="py-3 px-2 text-center">{{ item.qty }}</td>
                                <td class="py-3 px-2 text-right">{{ formatCurrency(item.unit_price ?? item.price) }}</td>
                                <td class="py-3 px-2 text-right font-medium">{{ formatCurrency(item.row_total ?? item.total) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Totals -->
                <div class="flex justify-end mb-8">
                    <div class="w-80 space-y-3">
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Subtotal:</span>
                            <span class="font-medium">{{ formatCurrency(order.subtotal_amount) }}</span>
                        </div>
                        <div v-if="order.discount_amount > 0" class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Diskon:</span>
                            <span class="font-medium text-red-600">-{{ formatCurrency(order.discount_amount) }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Ongkir:</span>
                            <span class="font-medium">{{ formatCurrency(order.shipping_amount) }}</span>
                        </div>
                        <div v-if="order.tax_amount > 0" class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Pajak:</span>
                            <span class="font-medium">{{ formatCurrency(order.tax_amount) }}</span>
                        </div>
                        <Separator />
                        <div class="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span class="text-primary">{{ formatCurrency(order.grand_total) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Payment Information -->
                <div v-if="order.payments && order.payments.length > 0" class="mb-8">
                    <h3 class="font-semibold text-sm mb-3">INFORMASI PEMBAYARAN:</h3>
                    <div class="bg-muted/50 rounded-lg p-4">
                        <div v-for="(payment, index) in order.payments" :key="index" class="text-sm" :class="{ 'mt-4 pt-4 border-t': index > 0 }">
                            <div class="flex justify-between mb-1">
                                <span>Metode Pembayaran:</span>
                                <span class="font-medium">{{ payment.method?.name || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between mb-1">
                                <span>Kode:</span>
                                <span class="font-medium uppercase text-xs">{{ payment.method?.code || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between mb-1">
                                <span>Jumlah:</span>
                                <span class="font-medium">{{ formatCurrency(payment.amount) }}</span>
                            </div>
                            <div class="flex justify-between mb-1">
                                <span>Tanggal:</span>
                                <span class="font-medium">{{ formatDateTime(payment.created_at) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Status:</span>
                                <span
                                    class="font-medium uppercase text-xs px-2 py-0.5 rounded"
                                    :class="{
                                        'bg-green-100 text-green-700': payment.status === 'success',
                                        'bg-yellow-100 text-yellow-700': payment.status === 'pending',
                                        'bg-red-100 text-red-700': payment.status === 'failed'
                                    }"
                                >
                                    {{ payment.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Notes -->
                <div class="border-t pt-6 mt-8">
                    <p class="text-xs text-muted-foreground mb-2">Catatan:</p>
                    <ul class="text-xs text-muted-foreground space-y-1">
                        <li>• Invoice ini sah dan diproses oleh komputer</li>
                        <li>• Harap simpan invoice ini sebagai bukti pembelian yang sah</li>
                        <li>• Untuk pertanyaan lebih lanjut, hubungi customer service kami</li>
                    </ul>
                </div>

                <!-- Footer -->
                <div class="text-center mt-8 pt-6 border-t">
                    <p class="text-xs text-muted-foreground">
                        Terima kasih atas kepercayaan Anda berbelanja di Puranusa
                    </p>
                    <p class="text-xs text-muted-foreground mt-1">
                        www.puranusa.id | CS: cs@puranusa.id | WA: +62 812-3456-7890
                    </p>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
/* Print Styles */
@media print {
    @page {
        size: A4;
        margin: 1cm;
    }

    .invoice-content {
        padding: 0;
        margin: 0;
    }

    /* Hide dialog overlay when printing */
    :deep(.DialogOverlay) {
        display: none;
    }

    /* Make dialog content full width for printing */
    :deep(.DialogContent) {
        position: static !important;
        max-width: 100% !important;
        max-height: 100% !important;
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
    }

    /* Ensure good print quality */
    * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    /* Page breaks */
    table {
        page-break-inside: avoid;
    }

    tr {
        page-break-inside: avoid;
        page-break-after: auto;
    }

    thead {
        display: table-header-group;
    }
}
</style>
