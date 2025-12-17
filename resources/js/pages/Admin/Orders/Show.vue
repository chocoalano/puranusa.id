<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, router, usePage, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Package, Truck, User, MapPin, CreditCard, Gift } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { ref, onMounted } from 'vue';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

interface Product {
    id: number;
    name: string;
    sku: string;
    slug: string;
}

interface OrderItem {
    id: number;
    product_id: number;
    product: Product;
    name: string;
    sku: string;
    qty: number;
    unit_price: number;
    discount_amount: number;
    row_total: number;
    weight_gram: number;
}

interface Address {
    id: number;
    recipient_name: string;
    recipient_phone: string;
    address_line1: string;
    address_line2?: string;
    city_label: string;
    province_label: string;
    postal_code: string;
    country: string;
}

interface Shipment {
    id: number;
    order_id: number;
    courier_id?: number;
    tracking_no: string;
    status: string;
    shipped_at?: string;
    delivered_at?: string;
    shipping_fee: number;
    created_at: string;
    updated_at: string;
}

interface Order {
    id: number;
    order_no: string;
    customer_id: number;
    customer: Customer;
    currency: string;
    status: string;
    subtotal_amount: number;
    discount_amount: number;
    shipping_amount: number;
    tax_amount: number;
    grand_total: number;
    bv_amount: number;
    sponsor_amount: number;
    match_amount: number;
    pairing_amount: number;
    cashback_amount: number;
    total_bonuses?: number;
    shipping_address_id: number;
    billing_address_id: number;
    shippingAddress?: Address;
    billingAddress?: Address;
    applied_promos: any;
    notes?: string;
    placed_at?: string;
    paid_at?: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
    shipments?: Shipment[];
}

interface Props {
    order: Order;
}

const props = defineProps<Props>();

const page = usePage();

// Check for flash messages on mount
onMounted(() => {
    const flash = page.props.flash as any;
    if (flash?.success) {
        toast.success(flash.success);
    }
    if (flash?.error) {
        toast.error(flash.error);
    }
});

const showShipmentDialog = ref(false);
const showCancelDialog = ref(false);
const showShipDialog = ref(false);
const showDeliverDialog = ref(false);
const selectedShipmentId = ref<number | null>(null);

const shipmentForm = ref({
    tracking_no: '',
    courier_id: null as number | null,
    shipping_fee: props.order.shipping_amount,
    items: props.order.items.map((item) => ({
        order_item_id: item.id,
        qty: item.qty,
    })),
});
const isProcessing = ref(false);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getStatusVariant = (status: string) => {
    const statusMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        PENDING: 'secondary',
        PAID: 'default',
        PROCESSING: 'default',
        SHIPPED: 'default',
        COMPLETED: 'default',
        CANCELLED: 'destructive',
        CANCELED: 'destructive',
    };
    return statusMap[status.toUpperCase()] || 'outline';
};

const getShipmentStatusVariant = (status: string) => {
    const statusMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        READY_TO_SHIP: 'secondary',
        IN_TRANSIT: 'default',
        DELIVERED: 'default',
        FAILED: 'destructive',
        RETURNED: 'outline',
    };
    return statusMap[status.toUpperCase()] || 'outline';
};

const openCancelDialog = () => {
    showCancelDialog.value = true;
};

const cancelOrder = () => {
    showCancelDialog.value = false;

    const cancelForm = useForm({});
    cancelForm.post(
        `/admin/orders/${props.order.id}/cancel`,
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Order berhasil dibatalkan');
            },
            onError: () => {
                toast.error('Gagal membatalkan order');
            },
        }
    );
};

const setupShipment = () => {
    if (!shipmentForm.value.tracking_no) {
        toast.error('Nomor resi harus diisi');
        return;
    }

    isProcessing.value = true;

    const setupForm = useForm(shipmentForm.value);
    setupForm.post(
        `/admin/orders/${props.order.id}/setup-shipment`,
        {
            preserveScroll: true,
            onSuccess: (page) => {
                showShipmentDialog.value = false;
                shipmentForm.value.tracking_no = '';

                // Show flash message
                const flash = (page.props as any).flash;
                if (flash?.success) {
                    toast.success(flash.success);
                } else if (flash?.error) {
                    toast.error(flash.error);
                }
            },
            onError: () => {
                toast.error('Gagal setup pengiriman');
            },
            onFinish: () => {
                isProcessing.value = false;
            },
        }
    );
};

const openShipDialog = (shipmentId: number) => {
    selectedShipmentId.value = shipmentId;
    showShipDialog.value = true;
};

const shipOrder = () => {
    if (!selectedShipmentId.value) return;

    showShipDialog.value = false;

    const shipForm = useForm({ shipment_id: selectedShipmentId.value });
    shipForm.post(
        `/admin/orders/${props.order.id}/ship`,
        {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = (page.props as any).flash;
                if (flash?.success) {
                    toast.success(flash.success);
                } else if (flash?.error) {
                    toast.error(flash.error);
                }
            },
            onError: () => {
                toast.error('Gagal menandai order sebagai dikirim');
            },
        }
    );
};

const openDeliverDialog = (shipmentId: number) => {
    selectedShipmentId.value = shipmentId;
    showDeliverDialog.value = true;
};

const deliverOrder = () => {
    if (!selectedShipmentId.value) return;

    showDeliverDialog.value = false;

    const deliverForm = useForm({ shipment_id: selectedShipmentId.value });
    deliverForm.post(
        `/admin/orders/${props.order.id}/deliver`,
        {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = (page.props as any).flash;
                if (flash?.success) {
                    toast.success(flash.success);
                } else if (flash?.error) {
                    toast.error(flash.error);
                }
            },
            onError: () => {
                toast.error('Gagal menandai order sebagai diterima');
            },
        }
    );
};

const shippingInfo = props.order.applied_promos?.shipping || {};
</script>

<template>
    <Head :title="`Order ${order.order_no}`" />

    <AppLayout>
        <div class="space-y-6 rounded-xl p-4 py-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Link href="/admin/orders">
                        <Button variant="outline" size="icon">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold">Detail Order</h1>
                        <p class="text-muted-foreground">{{ order.order_no }}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Badge :variant="getStatusVariant(order.status)" class="text-sm">
                        {{ order.status }}
                    </Badge>
                    <Button
                        v-if="['PAID', 'PROCESSING'].includes(order.status.toUpperCase())"
                        variant="default"
                        size="sm"
                        @click="showShipmentDialog = true"
                    >
                        <Truck class="mr-2 h-4 w-4" />
                        Setup Pengiriman
                    </Button>
                    <Button
                        v-if="['PENDING', 'PAID'].includes(order.status.toUpperCase())"
                        variant="destructive"
                        size="sm"
                        @click="openCancelDialog"
                    >
                        Batalkan Order
                    </Button>
                </div>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
                <!-- Customer Information -->
                <Card>
                    <CardHeader>
                        <div class="flex items-center gap-2">
                            <User class="h-5 w-5" />
                            <CardTitle>Informasi Customer</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-2">
                        <div>
                            <p class="text-sm text-muted-foreground">Nama</p>
                            <p class="font-medium">{{ order.customer.name }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Email</p>
                            <p class="font-medium">{{ order.customer.email }}</p>
                        </div>
                        <div v-if="order.customer.phone">
                            <p class="text-sm text-muted-foreground">Telepon</p>
                            <p class="font-medium">{{ order.customer.phone }}</p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Order Information -->
                <Card>
                    <CardHeader>
                        <div class="flex items-center gap-2">
                            <Package class="h-5 w-5" />
                            <CardTitle>Informasi Order</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-2">
                        <div>
                            <p class="text-sm text-muted-foreground">Tanggal Order</p>
                            <p class="font-medium">{{ formatDate(order.created_at) }}</p>
                        </div>
                        <div v-if="order.paid_at">
                            <p class="text-sm text-muted-foreground">Tanggal Bayar</p>
                            <p class="font-medium">{{ formatDate(order.paid_at) }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Status</p>
                            <Badge :variant="getStatusVariant(order.status)">
                                {{ order.status }}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Shipping Address -->
            <Card v-if="order.shippingAddress">
                <CardHeader>
                    <div class="flex items-center gap-2">
                        <MapPin class="h-5 w-5" />
                        <CardTitle>Alamat Pengiriman</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-2">
                    <div>
                        <p class="font-medium">{{ order.shippingAddress.recipient_name }}</p>
                        <p class="text-sm text-muted-foreground">
                            {{ order.shippingAddress.recipient_phone }}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm">{{ order.shippingAddress.address_line1 }}</p>
                        <p v-if="order.shippingAddress.address_line2" class="text-sm">
                            {{ order.shippingAddress.address_line2 }}
                        </p>
                        <p class="text-sm">
                            {{ order.shippingAddress.city_label }},
                            {{ order.shippingAddress.province_label }}
                            {{ order.shippingAddress.postal_code }}
                        </p>
                        <p class="text-sm">{{ order.shippingAddress.country }}</p>
                    </div>
                    <div v-if="shippingInfo.courier" class="pt-2">
                        <div class="flex items-center gap-2">
                            <Truck class="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p class="text-sm font-medium">
                                    {{ shippingInfo.courier }} - {{ shippingInfo.service }}
                                </p>
                                <p class="text-xs text-muted-foreground">
                                    Estimasi: {{ shippingInfo.etd }}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Order Items -->
            <Card>
                <CardHeader>
                    <CardTitle>Produk yang Dipesan</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produk</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead class="text-right">Harga</TableHead>
                                <TableHead class="text-right">Qty</TableHead>
                                <TableHead class="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="item in order.items" :key="item.id">
                                <TableCell class="font-medium">{{ item.name }}</TableCell>
                                <TableCell>{{ item.sku }}</TableCell>
                                <TableCell class="text-right">
                                    {{ formatCurrency(item.unit_price) }}
                                </TableCell>
                                <TableCell class="text-right">{{ item.qty }}</TableCell>
                                <TableCell class="text-right">
                                    {{ formatCurrency(item.row_total) }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <!-- Shipments -->
            <Card v-if="order.shipments && order.shipments.length > 0">
                <CardHeader>
                    <div class="flex items-center gap-2">
                        <Truck class="h-5 w-5" />
                        <CardTitle>Informasi Pengiriman</CardTitle>
                    </div>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div
                        v-for="shipment in order.shipments"
                        :key="shipment.id"
                        class="rounded-lg border p-4 space-y-3"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="font-medium">Resi: {{ shipment.tracking_no }}</p>
                                <p class="text-sm text-muted-foreground">
                                    Biaya: {{ formatCurrency(shipment.shipping_fee) }}
                                </p>
                            </div>
                            <Badge :variant="getShipmentStatusVariant(shipment.status)">
                                {{ shipment.status }}
                            </Badge>
                        </div>

                        <div v-if="shipment.shipped_at" class="text-sm text-muted-foreground">
                            Dikirim: {{ formatDate(shipment.shipped_at) }}
                        </div>
                        <div v-if="shipment.delivered_at" class="text-sm text-muted-foreground">
                            Diterima: {{ formatDate(shipment.delivered_at) }}
                        </div>

                        <div class="flex gap-2">
                            <Button
                                v-if="shipment.status === 'READY_TO_SHIP'"
                                size="sm"
                                @click="openShipDialog(shipment.id)"
                            >
                                Tandai Sudah Dikirim
                            </Button>
                            <Button
                                v-if="shipment.status === 'IN_TRANSIT'"
                                size="sm"
                                variant="default"
                                @click="openDeliverDialog(shipment.id)"
                            >
                                Tandai Sudah Diterima
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div class="grid gap-6 md:grid-cols-2">
                <!-- Payment Summary -->
                <Card>
                    <CardHeader>
                        <div class="flex items-center gap-2">
                            <CreditCard class="h-5 w-5" />
                            <CardTitle>Ringkasan Pembayaran</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Subtotal</span>
                            <span class="font-medium">{{ formatCurrency(order.subtotal_amount) }}</span>
                        </div>
                        <div v-if="order.discount_amount > 0" class="flex justify-between">
                            <span class="text-muted-foreground">Diskon</span>
                            <span class="font-medium text-green-600">
                                -{{ formatCurrency(order.discount_amount) }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Ongkir</span>
                            <span class="font-medium">{{ formatCurrency(order.shipping_amount) }}</span>
                        </div>
                        <div v-if="order.tax_amount > 0" class="flex justify-between">
                            <span class="text-muted-foreground">Pajak</span>
                            <span class="font-medium">{{ formatCurrency(order.tax_amount) }}</span>
                        </div>
                        <Separator />
                        <div class="flex justify-between text-lg">
                            <span class="font-semibold">Total</span>
                            <span class="font-bold">{{ formatCurrency(order.grand_total) }}</span>
                        </div>
                    </CardContent>
                </Card>

                <!-- MLM Bonuses -->
                <Card>
                    <CardHeader>
                        <div class="flex items-center gap-2">
                            <Gift class="h-5 w-5" />
                            <CardTitle>MLM Bonuses</CardTitle>
                        </div>
                        <CardDescription>Bonus yang dihasilkan dari order ini</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Business Value (BV)</span>
                            <span class="font-medium">{{ order.bv_amount || 0 }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Bonus Sponsor</span>
                            <span class="font-medium">{{ formatCurrency(order.sponsor_amount || 0) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Bonus Matching</span>
                            <span class="font-medium">{{ formatCurrency(order.match_amount || 0) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Bonus Pairing</span>
                            <span class="font-medium">{{ formatCurrency(order.pairing_amount || 0) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Cashback</span>
                            <span class="font-medium">{{ formatCurrency(order.cashback_amount || 0) }}</span>
                        </div>
                        <Separator />
                        <div class="flex justify-between text-lg">
                            <span class="font-semibold">Total Bonus</span>
                            <span class="font-bold text-green-600">
                                {{ formatCurrency(order.total_bonuses || 0) }}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Notes -->
            <Card v-if="order.notes">
                <CardHeader>
                    <CardTitle>Catatan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm">{{ order.notes }}</p>
                </CardContent>
            </Card>
        </div>

        <!-- Shipment Dialog -->
        <Dialog v-model:open="showShipmentDialog">
            <DialogContent class="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Setup Pengiriman</DialogTitle>
                    <DialogDescription>
                        Masukkan informasi pengiriman untuk order {{ order.order_no }}
                    </DialogDescription>
                </DialogHeader>

                <div class="grid gap-4 py-4">
                    <div class="grid gap-2">
                        <Label for="tracking_no">Nomor Resi *</Label>
                        <Input
                            id="tracking_no"
                            v-model="shipmentForm.tracking_no"
                            placeholder="Contoh: JNE123456789"
                            required
                        />
                    </div>

                    <div class="grid gap-2">
                        <Label for="shipping_fee">Biaya Kirim</Label>
                        <Input
                            id="shipping_fee"
                            v-model.number="shipmentForm.shipping_fee"
                            type="number"
                            step="0.01"
                            min="0"
                        />
                        <p class="text-xs text-muted-foreground">
                            Default: {{ formatCurrency(order.shipping_amount) }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label>Item yang Dikirim</Label>
                        <div class="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Produk</TableHead>
                                        <TableHead class="text-right">Qty Order</TableHead>
                                        <TableHead class="text-right">Qty Kirim</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow
                                        v-for="(item, index) in shipmentForm.items"
                                        :key="item.order_item_id"
                                    >
                                        <TableCell class="font-medium">
                                            {{ order.items[index].name }}
                                        </TableCell>
                                        <TableCell class="text-right">
                                            {{ order.items[index].qty }}
                                        </TableCell>
                                        <TableCell class="text-right">
                                            <Input
                                                v-model.number="item.qty"
                                                type="number"
                                                :min="1"
                                                :max="order.items[index].qty"
                                                class="w-20 text-right"
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        @click="showShipmentDialog = false"
                        :disabled="isProcessing"
                    >
                        Batal
                    </Button>
                    <Button type="button" @click="setupShipment" :disabled="isProcessing">
                        {{ isProcessing ? 'Memproses...' : 'Setup Pengiriman' }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Cancel Order Confirmation Dialog -->
        <Dialog v-model:open="showCancelDialog">
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Batalkan Order</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin membatalkan order {{ order.order_no }}? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        @click="showCancelDialog = false"
                    >
                        Tidak
                    </Button>
                    <Button type="button" variant="destructive" @click="cancelOrder">
                        Ya, Batalkan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Ship Order Confirmation Dialog -->
        <Dialog v-model:open="showShipDialog">
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tandai Sudah Dikirim</DialogTitle>
                    <DialogDescription>
                        Tandai pengiriman ini sebagai sudah dikirim? Status order akan berubah menjadi SHIPPED.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        @click="showShipDialog = false"
                    >
                        Batal
                    </Button>
                    <Button type="button" @click="shipOrder">
                        Ya, Tandai Dikirim
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Deliver Order Confirmation Dialog -->
        <Dialog v-model:open="showDeliverDialog">
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tandai Sudah Diterima</DialogTitle>
                    <DialogDescription>
                        Tandai pengiriman ini sebagai sudah diterima? Status order akan berubah menjadi COMPLETED.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        @click="showDeliverDialog = false"
                    >
                        Batal
                    </Button>
                    <Button type="button" @click="deliverOrder">
                        Ya, Tandai Diterima
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
