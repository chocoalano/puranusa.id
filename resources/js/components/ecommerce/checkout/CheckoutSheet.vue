<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { usePage } from '@inertiajs/vue3';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Package, MapPin, Truck, CreditCard, Wallet } from 'lucide-vue-next';

interface Province {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    type: string;
    postal_code: string;
}

interface ShippingService {
    service: string;
    description: string;
    cost: Array<{
        value: number;
        etd: string;
        note: string;
    }>;
}

interface ShippingCourier {
    code: string;
    name: string;
    costs: ShippingService[];
}

interface CheckoutItem {
    id: number;
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    weight: number;
    image: string;
}

interface Props {
    open: boolean;
    item: CheckoutItem;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

const page = usePage();
const userWalletBalance = computed(() => {
    return (page.props.auth?.user as any)?.ewallet_saldo ?? 0;
});

// Form state
const provinces = ref<Province[]>([]);
const cities = ref<City[]>([]);
const shippingMethods = ref<ShippingCourier[]>([]);
const loadingProvinces = ref(false);
const loadingCities = ref(false);
const loadingShipping = ref(false);
const processingOrder = ref(false);

// Form data
const form = ref({
    recipient_name: '',
    recipient_phone: '',
    address_line1: '',
    province_id: '',
    city_id: '',
    postal_code: '',
    shipping_courier: '',
    shipping_service: '',
    shipping_cost: 0,
    shipping_etd: '',
    notes: '',
    payment_method: 'midtrans',
});

// Filter valid data (only items with ID)
const validProvinces = computed(() => provinces.value.filter(p => p.id));
const validCities = computed(() => cities.value.filter(c => c.id));

// Computed
const selectedProvince = computed(() => {
    return provinces.value.find(p => String(p.id) === form.value.province_id);
});

const selectedCity = computed(() => {
    return cities.value.find(c => String(c.id) === form.value.city_id);
});

const subtotal = computed(() => {
    return props.item.price * props.item.quantity;
});

const total = computed(() => {
    return subtotal.value + form.value.shipping_cost;
});

const isWalletSufficient = computed(() => {
    return userWalletBalance.value >= total.value;
});

const isFormValid = computed(() => {
    const basicValid = (
        form.value.recipient_name &&
        form.value.recipient_phone &&
        form.value.address_line1 &&
        form.value.province_id &&
        form.value.city_id &&
        form.value.postal_code &&
        form.value.shipping_courier &&
        form.value.shipping_service &&
        form.value.shipping_cost > 0 &&
        form.value.payment_method
    );

    // If wallet payment selected, ensure sufficient balance
    if (form.value.payment_method === 'wallet' && !isWalletSufficient.value) {
        return false;
    }

    return basicValid;
});

// Helper function
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

// Load provinces on mount
const loadProvinces = async () => {
    loadingProvinces.value = true;
    try {
        console.log('Fetching provinces from API...');
        const response = await fetch('/api/shipping/provinces');
        console.log('Provinces response status:', response.status);
        const data = await response.json();
        console.log('Provinces data:', data);
        if (data.success) {
            provinces.value = data.data;
            console.log('Provinces loaded successfully:', provinces.value.length);
        } else {
            console.error('Failed to load provinces: success=false');
        }
    } catch (error) {
        console.error('Failed to load provinces:', error);
    } finally {
        loadingProvinces.value = false;
    }
};

// Load cities when province changes
watch(() => form.value.province_id, async (newProvinceId) => {
    console.log('Province changed:', newProvinceId);
    if (!newProvinceId) return;

    // Reset city and shipping
    form.value.city_id = '';
    form.value.shipping_courier = '';
    form.value.shipping_service = '';
    form.value.shipping_cost = 0;
    cities.value = [];
    shippingMethods.value = [];

    loadingCities.value = true;
    try {
        console.log('Fetching cities for province:', newProvinceId);
        const response = await fetch(`/api/shipping/cities?province_id=${newProvinceId}`);
        const data = await response.json();
        console.log('Cities response:', data);
        if (data.success) {
            cities.value = data.data;
            console.log('Cities loaded:', cities.value.length);
        }
    } catch (error) {
        console.error('Failed to load cities:', error);
    } finally {
        loadingCities.value = false;
    }
});

// Calculate shipping when city changes
watch(() => form.value.city_id, async (newCityId) => {
    console.log('City changed:', newCityId);
    if (!newCityId) return;

    // Auto-fill postal code if available
    const city = cities.value.find(c => String(c.id) === newCityId);
    if (city && city.postal_code) {
        form.value.postal_code = city.postal_code;
    }

    // Reset shipping selection
    form.value.shipping_courier = '';
    form.value.shipping_service = '';
    form.value.shipping_cost = 0;
    shippingMethods.value = [];

    loadingShipping.value = true;
    try {
        console.log('Calculating shipping for city:', newCityId, 'weight:', props.item.weight * props.item.quantity);

        // Get CSRF token from cookie for axios
        const response = await axios.post('/api/shipping/calculate', {
            destination_city_id: parseInt(newCityId),
            weight: props.item.weight * props.item.quantity,
        });

        const data = response.data;
        console.log('Shipping response:', data);
        if (data.success) {
            shippingMethods.value = data.data;
            console.log('Shipping methods loaded:', shippingMethods.value.length);
        }
    } catch (error) {
        console.error('Failed to calculate shipping:', error);
    } finally {
        loadingShipping.value = false;
    }
});

// Handle shipping service selection
const selectShippingService = (courier: ShippingCourier, service: ShippingService) => {
    form.value.shipping_courier = courier.code;
    form.value.shipping_service = service.service;
    form.value.shipping_cost = service.cost[0].value;
    form.value.shipping_etd = service.cost[0].etd;
};

// Handle checkout
const handleCheckout = async () => {
    if (!isFormValid.value) {
        alert('Mohon lengkapi semua data pengiriman');
        return;
    }

    // Check if Midtrans Snap is loaded for midtrans payment
    if (form.value.payment_method === 'midtrans') {
        const snapInstance = (window as any).snap;
        if (!snapInstance) {
            alert('Sistem pembayaran belum siap. Mohon refresh halaman.');
            return;
        }
    }

    // Check wallet balance for wallet payment
    if (form.value.payment_method === 'wallet' && !isWalletSufficient.value) {
        alert('Saldo e-wallet Anda tidak mencukupi');
        return;
    }

    processingOrder.value = true;

    try {
        const response = await axios.post('/checkout/process', {
            product_id: props.item.product_id,
            product_name: props.item.name,
            product_price: props.item.price,
            quantity: props.item.quantity,
            weight: props.item.weight,
            product_image: props.item.image,
            shipping: {
                recipient_name: form.value.recipient_name,
                recipient_phone: form.value.recipient_phone,
                address_line1: form.value.address_line1,
                province_label: selectedProvince.value?.name,
                province_id: form.value.province_id,
                city_label: `${selectedCity.value?.type} ${selectedCity.value?.name}`,
                city_id: form.value.city_id,
                postal_code: form.value.postal_code,
                courier: form.value.shipping_courier,
                service: form.value.shipping_service,
                cost: form.value.shipping_cost,
                etd: form.value.shipping_etd,
            },
            notes: form.value.notes,
            subtotal: subtotal.value,
            shipping_cost: form.value.shipping_cost,
            total: total.value,
            payment_method: form.value.payment_method,
        });

        const data = response.data;
        console.log('Checkout response:', data);

        if (data.success) {
            // Close the checkout sheet
            emit('update:open', false);

            // Handle based on payment method
            if (form.value.payment_method === 'wallet') {
                // Wallet payment completed, redirect to success page
                window.location.href = `/checkout/finish?order_no=${data.order_no}`;
                return;
            }

            // Midtrans payment - open Snap modal
            if (data.snap_token) {
                const snapInstance = (window as any).snap;
                snapInstance.pay(data.snap_token, {
                onSuccess: function (result: any) {
                    console.log('Payment success:', result);
                    window.location.href = `/checkout/finish?order_no=${data.order_no}`;
                },
                onPending: function (result: any) {
                    console.log('Payment pending:', result);
                    window.location.href = `/checkout/finish?order_no=${data.order_no}`;
                },
                onError: function (result: any) {
                    console.error('Payment error:', result);
                    alert('Pembayaran gagal. Silakan coba lagi.');
                    processingOrder.value = false;
                },
                    onClose: function () {
                        console.log('Payment modal closed');
                        processingOrder.value = false;
                    },
                });

                // Reset form after opening payment modal
                form.value = {
                    recipient_name: '',
                    recipient_phone: '',
                    address_line1: '',
                    province_id: '',
                    city_id: '',
                    postal_code: '',
                    shipping_courier: '',
                    shipping_service: '',
                    shipping_cost: 0,
                    shipping_etd: '',
                    notes: '',
                    payment_method: 'midtrans',
                };
            }
        } else {
            alert('Gagal memproses checkout. Silakan coba lagi.');
        }
    } catch (error: any) {
        console.error('Checkout error:', error);

        // Handle 401 Unauthorized - redirect to login
        if (error.response?.status === 401) {
            const message = error.response?.data?.message || 'Anda harus login terlebih dahulu.';
            alert(message);

            // Close the checkout sheet
            emit('update:open', false);

            // Redirect to login page
            const redirectUrl = error.response?.data?.redirect || '/client/login';
            window.location.href = redirectUrl;
            return;
        }

        alert(error.response?.data?.message || 'Gagal memproses checkout. Silakan coba lagi.');
    } finally {
        processingOrder.value = false;
    }
};

// Load provinces when sheet opens
watch(() => props.open, (isOpen) => {
    if (isOpen) {
        console.log('Checkout sheet opened');
        if (provinces.value.length === 0) {
            console.log('Loading provinces...');
            loadProvinces();
        } else {
            console.log('Provinces already loaded:', provinces.value.length);
        }
    }
}, { immediate: true });
</script>

<template>
    <Sheet :open="open" @update:open="(val) => emit('update:open', val)">
        <SheetContent side="right" class="sm:max-w-2xl w-full overflow-y-auto" :trap-focus="false">
            <SheetHeader>
                <SheetTitle>Checkout</SheetTitle>
                <SheetDescription>
                    Lengkapi data pengiriman untuk melanjutkan pembelian
                </SheetDescription>
            </SheetHeader>

            <div class="space-y-6 py-6">
                <!-- Product Summary -->
                <div class="space-y-3">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <Package class="h-4 w-4" />
                        <span>Ringkasan Produk</span>
                    </div>
                    <div class="flex gap-4 p-4 bg-muted rounded-lg">
                        <img
                            :src="item.image"
                            :alt="item.name"
                            class="w-20 h-20 object-cover rounded-md"
                        />
                        <div class="flex-1">
                            <h4 class="font-medium">{{ item.name }}</h4>
                            <p class="text-sm text-muted-foreground">{{ item.quantity }}x {{ formatCurrency(item.price) }}</p>
                            <p class="text-sm text-muted-foreground">Berat: {{ item.weight * item.quantity }}g</p>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold">{{ formatCurrency(subtotal) }}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <!-- Shipping Address Form -->
                <div class="space-y-4">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <MapPin class="h-4 w-4" />
                        <span>Alamat Pengiriman</span>
                    </div>

                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="recipient_name">Nama Penerima</Label>
                                <Input
                                    id="recipient_name"
                                    v-model="form.recipient_name"
                                    placeholder="Nama lengkap"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="recipient_phone">No. Telepon</Label>
                                <Input
                                    id="recipient_phone"
                                    v-model="form.recipient_phone"
                                    placeholder="08xxxxxxxxxx"
                                />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <Label for="address_line1">Alamat Lengkap</Label>
                            <Input
                                id="address_line1"
                                v-model="form.address_line1"
                                placeholder="Jalan, nomor rumah, RT/RW"
                            />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="province">Provinsi</Label>
                                <Select v-model="form.province_id" :disabled="loadingProvinces">
                                    <SelectTrigger id="province">
                                        <SelectValue :placeholder="loadingProvinces ? 'Memuat provinsi...' : 'Pilih provinsi'" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            v-for="province in validProvinces"
                                            :key="province.id"
                                            :value="String(province.id)"
                                        >
                                            {{ province.name }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div class="space-y-2">
                                <Label for="city">Kota/Kabupaten</Label>
                                <Select v-model="form.city_id" :disabled="loadingCities || !form.province_id">
                                    <SelectTrigger id="city">
                                        <SelectValue
                                            :placeholder="loadingCities ? 'Memuat kota...' : !form.province_id ? 'Pilih provinsi terlebih dahulu' : 'Pilih kota'"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            v-for="city in validCities"
                                            :key="city.id"
                                            :value="String(city.id)"
                                        >
                                            {{ city.type }} {{ city.name }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <Label for="postal_code">Kode Pos</Label>
                            <Input
                                id="postal_code"
                                v-model="form.postal_code"
                                placeholder="12345"
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                <!-- Shipping Method -->
                <div class="space-y-4">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <Truck class="h-4 w-4" />
                        <span>Metode Pengiriman</span>
                    </div>

                    <div v-if="loadingShipping" class="flex items-center justify-center py-8">
                        <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>

                    <div v-else-if="shippingMethods.length > 0" class="space-y-3">
                        <div
                            v-for="courier in shippingMethods"
                            :key="courier.code"
                            class="space-y-2"
                        >
                            <div class="font-medium text-sm uppercase">{{ courier.name }}</div>
                            <div
                                v-for="service in courier.costs"
                                :key="`${courier.code}-${service.service}`"
                                class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors"
                                :class="{
                                    'bg-primary/10 border-primary': form.shipping_service === service.service && form.shipping_courier === courier.code,
                                    'hover:bg-muted': !(form.shipping_service === service.service && form.shipping_courier === courier.code)
                                }"
                                @click="selectShippingService(courier, service)"
                            >
                                <!-- Radio Indicator -->
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                                        :class="{
                                            'border-primary bg-primary': form.shipping_service === service.service && form.shipping_courier === courier.code,
                                            'border-muted-foreground': !(form.shipping_service === service.service && form.shipping_courier === courier.code)
                                        }"
                                    >
                                        <div
                                            v-if="form.shipping_service === service.service && form.shipping_courier === courier.code"
                                            class="w-2 h-2 rounded-full bg-primary-foreground"
                                        ></div>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <div class="font-medium">{{ service.service }}</div>
                                            <div class="text-sm text-muted-foreground">{{ service.description }}</div>
                                            <div class="text-sm text-muted-foreground">Estimasi: {{ service.cost[0].etd }} hari</div>
                                        </div>
                                        <div class="font-semibold">
                                            {{ formatCurrency(service.cost[0].value) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="form.city_id" class="text-center py-8 text-muted-foreground">
                        Tidak ada metode pengiriman tersedia
                    </div>

                    <div v-else class="text-center py-8 text-muted-foreground">
                        Pilih alamat pengiriman untuk melihat metode pengiriman
                    </div>
                </div>

                <Separator />

                <!-- Payment Method -->
                <div class="space-y-4">
                    <div class="flex items-center gap-2 text-sm font-medium">
                        <Wallet class="h-4 w-4" />
                        <span>Metode Pembayaran</span>
                    </div>

                    <RadioGroup v-model="form.payment_method" class="space-y-3">
                        <!-- E-Wallet Option -->
                        <div
                            class="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors"
                            :class="{
                                'bg-primary/10 border-primary': form.payment_method === 'wallet',
                                'hover:bg-muted': form.payment_method !== 'wallet',
                                'opacity-50 cursor-not-allowed': !isWalletSufficient
                            }"
                            @click="isWalletSufficient && (form.payment_method = 'wallet')"
                        >
                            <RadioGroupItem value="wallet" :id="'payment-wallet'" :disabled="!isWalletSufficient" />
                            <Label
                                :for="'payment-wallet'"
                                class="flex-1 cursor-pointer"
                                :class="{ 'cursor-not-allowed': !isWalletSufficient }"
                            >
                                <div class="flex justify-between items-start">
                                    <div>
                                        <div class="font-medium flex items-center gap-2">
                                            <Wallet class="h-4 w-4" />
                                            E-Wallet
                                        </div>
                                        <div class="text-sm text-muted-foreground">Saldo: {{ formatCurrency(userWalletBalance) }}</div>
                                        <div v-if="!isWalletSufficient" class="text-xs text-destructive mt-1">
                                            Saldo tidak mencukupi (kurang {{ formatCurrency(total - userWalletBalance) }})
                                        </div>
                                    </div>
                                </div>
                            </Label>
                        </div>

                        <!-- Midtrans Option -->
                        <div
                            class="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors"
                            :class="{
                                'bg-primary/10 border-primary': form.payment_method === 'midtrans',
                                'hover:bg-muted': form.payment_method !== 'midtrans'
                            }"
                            @click="form.payment_method = 'midtrans'"
                        >
                            <RadioGroupItem value="midtrans" :id="'payment-midtrans'" />
                            <Label :for="'payment-midtrans'" class="flex-1 cursor-pointer">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <div class="font-medium flex items-center gap-2">
                                            <CreditCard class="h-4 w-4" />
                                            Payment Gateway
                                        </div>
                                        <div class="text-sm text-muted-foreground">Transfer Bank, E-wallet, Kartu Kredit</div>
                                    </div>
                                </div>
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <Separator />

                <!-- Notes -->
                <div class="space-y-2">
                    <Label for="notes">Catatan (Opsional)</Label>
                    <Input
                        id="notes"
                        v-model="form.notes"
                        placeholder="Catatan untuk penjual"
                    />
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
                            <span>{{ formatCurrency(subtotal) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Ongkos Kirim</span>
                            <span>{{ formatCurrency(form.shipping_cost) }}</span>
                        </div>
                        <Separator />
                        <div class="flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span>{{ formatCurrency(total) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <SheetFooter>
                <Button
                    @click="handleCheckout"
                    :disabled="!isFormValid || processingOrder"
                    class="w-full"
                    size="lg"
                >
                    <Loader2 v-if="processingOrder" class="h-4 w-4 mr-2 animate-spin" />
                    <span v-if="form.payment_method === 'wallet'">
                        Bayar dengan E-Wallet {{ formatCurrency(total) }}
                    </span>
                    <span v-else>
                        Bayar {{ formatCurrency(total) }}
                    </span>
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>
