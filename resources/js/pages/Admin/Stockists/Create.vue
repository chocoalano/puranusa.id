<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, ChevronsUpDown, MapPin, Store, User, AlertCircle, Loader2 } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { index, store, getCities } from '@/actions/App/Http/Controllers/Admin/StockistController';
import { toast } from 'vue-sonner';

interface Customer {
    id: number;
    name: string;
    ewallet_id: string;
    email: string;
    phone: string | null;
}

interface Province {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
}

interface Props {
    customers: Customer[];
    provinces: Province[];
    assignedKabupaten: number[];
}

const props = defineProps<Props>();

const form = useForm({
    customer_id: null as number | null,
    stockist_kabupaten_id: null as number | null,
    stockist_kabupaten_name: '',
    stockist_province_id: null as number | null,
    stockist_province_name: '',
});

// Customer combobox state
const customerOpen = ref(false);
const customerSearch = ref('');

// Province and city state
const selectedProvinceId = ref<number | null>(null);
const citiesList = ref<City[]>([]);
const loadingCities = ref(false);
const cityOpen = ref(false);

// Get selected customer data
const selectedCustomer = computed(() => {
    return props.customers.find(c => c.id === form.customer_id) || null;
});

// Filter customers based on search
const filteredCustomers = computed(() => {
    if (!customerSearch.value) return props.customers;
    const search = customerSearch.value.toLowerCase();
    return props.customers.filter(
        c =>
            c.name.toLowerCase().includes(search) ||
            c.ewallet_id.toLowerCase().includes(search) ||
            c.email.toLowerCase().includes(search)
    );
});

// Fetch cities when province changes
watch(selectedProvinceId, async (provinceId) => {
    if (!provinceId) {
        citiesList.value = [];
        form.stockist_kabupaten_id = null;
        form.stockist_kabupaten_name = '';
        form.stockist_province_id = null;
        form.stockist_province_name = '';
        return;
    }

    // Set province info
    const province = props.provinces.find(p => p.id === provinceId);
    if (province) {
        form.stockist_province_id = province.id;
        form.stockist_province_name = province.name;
    }

    // Reset city when province changes
    form.stockist_kabupaten_id = null;
    form.stockist_kabupaten_name = '';

    loadingCities.value = true;
    try {
        const url = `${getCities.url()}?province_id=${provinceId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }

        citiesList.value = await response.json();
    } catch {
        toast.error('Gagal memuat daftar kota');
        citiesList.value = [];
    } finally {
        loadingCities.value = false;
    }
});

// Handle city selection
const handleCitySelect = (city: City) => {
    form.stockist_kabupaten_id = city.id;
    form.stockist_kabupaten_name = city.name;
    cityOpen.value = false;
};

// Check if kabupaten is already assigned
const isKabupatenAssigned = (cityId: number) => {
    return props.assignedKabupaten.includes(cityId);
};

// Submit form
const submit = () => {
    form.post(store.url(), {
        onSuccess: () => {
            toast.success('Stokist berhasil ditambahkan');
        },
        onError: (errors) => {
            const firstError = Object.values(errors)[0];
            if (firstError) {
                toast.error(firstError as string);
            }
        },
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Tambah Stokist" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="mb-6 flex items-center gap-4">
                <Link :href="index.url()">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Tambah Stokist</h1>
                    <p class="text-muted-foreground">
                        Pilih pelanggan dan tentukan kabupaten/kota untuk dijadikan stokist
                    </p>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6 max-w-2xl">
                <!-- Customer Selection -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <User class="h-5 w-5" />
                            Pilih Pelanggan
                        </CardTitle>
                        <CardDescription>
                            Pilih pelanggan aktif yang akan dijadikan stokist. Hanya pelanggan yang belum menjadi stokist yang ditampilkan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label>Pelanggan <span class="text-destructive">*</span></Label>
                            <Popover v-model:open="customerOpen">
                                <PopoverTrigger as-child>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        :aria-expanded="customerOpen"
                                        class="w-full justify-between"
                                        :class="{ 'border-destructive': form.errors.customer_id }"
                                    >
                                        <span v-if="selectedCustomer" class="flex items-center gap-2">
                                            <Badge variant="secondary" class="font-mono">{{ selectedCustomer.ewallet_id }}</Badge>
                                            {{ selectedCustomer.name }}
                                        </span>
                                        <span v-else class="text-muted-foreground">Pilih pelanggan...</span>
                                        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-[400px] p-0">
                                    <Command>
                                        <CommandInput
                                            v-model="customerSearch"
                                            placeholder="Cari nama, ewallet ID, atau email..."
                                        />
                                        <CommandList>
                                            <CommandEmpty>Tidak ada pelanggan ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem
                                                    v-for="customer in filteredCustomers"
                                                    :key="customer.id"
                                                    :value="customer.name"
                                                    @select="() => {
                                                        form.customer_id = customer.id;
                                                        customerOpen = false;
                                                    }"
                                                    class="flex items-center gap-2"
                                                >
                                                    <Check
                                                        :class="cn(
                                                            'mr-2 h-4 w-4',
                                                            form.customer_id === customer.id ? 'opacity-100' : 'opacity-0'
                                                        )"
                                                    />
                                                    <div class="flex flex-col">
                                                        <div class="flex items-center gap-2">
                                                            <Badge variant="outline" class="font-mono text-xs">{{ customer.ewallet_id }}</Badge>
                                                            <span class="font-medium">{{ customer.name }}</span>
                                                        </div>
                                                        <span class="text-xs text-muted-foreground">{{ customer.email }}</span>
                                                    </div>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <p v-if="form.errors.customer_id" class="text-sm text-destructive">{{ form.errors.customer_id }}</p>
                            <p class="text-sm text-muted-foreground">
                                Pilih pelanggan yang akan bertanggung jawab sebagai stokist di wilayah tertentu.
                            </p>
                        </div>

                        <!-- Selected Customer Info -->
                        <div v-if="selectedCustomer" class="rounded-lg bg-muted p-4 space-y-2">
                            <div class="flex items-center gap-2 text-sm">
                                <span class="font-medium">Nama:</span>
                                <span>{{ selectedCustomer.name }}</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <span class="font-medium">Email:</span>
                                <span>{{ selectedCustomer.email }}</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm">
                                <span class="font-medium">Telepon:</span>
                                <span>{{ selectedCustomer.phone || '-' }}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Location Selection -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <MapPin class="h-5 w-5" />
                            Wilayah Stokist
                        </CardTitle>
                        <CardDescription>
                            Tentukan kota yang akan dijadikan wilayah stokist. Setiap kota hanya dapat memiliki 1 stokist.
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label>Provinsi <span class="text-destructive">*</span></Label>
                            <Select v-model="selectedProvinceId">
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih provinsi..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="province in provinces"
                                        :key="province.id"
                                        :value="province.id"
                                    >
                                        {{ province.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p class="text-sm text-muted-foreground">
                                Pilih provinsi terlebih dahulu untuk menampilkan daftar kabupaten/kota.
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label>Kota <span class="text-destructive">*</span></Label>
                            <Popover v-model:open="cityOpen">
                                <PopoverTrigger as-child>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        :aria-expanded="cityOpen"
                                        class="w-full justify-between"
                                        :class="{ 'border-destructive': form.errors.stockist_kabupaten_id }"
                                        :disabled="!selectedProvinceId || loadingCities"
                                    >
                                        <span v-if="loadingCities" class="flex items-center gap-2">
                                            <Loader2 class="h-4 w-4 animate-spin" />
                                            Memuat...
                                        </span>
                                        <span v-else-if="form.stockist_kabupaten_name">
                                            {{ form.stockist_kabupaten_name }}
                                        </span>
                                        <span v-else class="text-muted-foreground">
                                            {{ selectedProvinceId ? 'Pilih kota...' : 'Pilih provinsi terlebih dahulu' }}
                                        </span>
                                        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-[400px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari kota..." />
                                        <CommandList>
                                            <CommandEmpty>Tidak ada kota ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem
                                                    v-for="city in citiesList"
                                                    :key="city.id"
                                                    :value="city.name"
                                                    :disabled="isKabupatenAssigned(city.id)"
                                                    @select="() => handleCitySelect(city)"
                                                    class="flex items-center justify-between"
                                                >
                                                    <div class="flex items-center gap-2">
                                                        <Check
                                                            :class="cn(
                                                                'mr-2 h-4 w-4',
                                                                form.stockist_kabupaten_id === city.id ? 'opacity-100' : 'opacity-0'
                                                            )"
                                                        />
                                                        <span>{{ city.name }}</span>
                                                    </div>
                                                    <Badge v-if="isKabupatenAssigned(city.id)" variant="secondary" class="text-xs">
                                                        Sudah ada stokist
                                                    </Badge>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <p v-if="form.errors.stockist_kabupaten_id" class="text-sm text-destructive">{{ form.errors.stockist_kabupaten_id }}</p>
                            <p class="text-sm text-muted-foreground">
                                Kota yang sudah memiliki stokist akan ditandai dan tidak dapat dipilih.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Alert Info -->
                <div class="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
                    <div class="flex items-start gap-3">
                        <AlertCircle class="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div class="text-sm text-blue-700 dark:text-blue-300">
                            <p class="font-medium">Informasi</p>
                            <p class="mt-1">
                                Setelah pelanggan dijadikan stokist, mereka akan bertanggung jawab atas distribusi produk di wilayah kota yang ditentukan. Setiap kota hanya dapat memiliki 1 stokist aktif.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex items-center gap-4">
                    <Button type="submit" :disabled="form.processing">
                        <Store class="mr-2 h-4 w-4" />
                        {{ form.processing ? 'Menyimpan...' : 'Simpan Stokist' }}
                    </Button>
                    <Link :href="index.url()">
                        <Button variant="outline" type="button">Batal</Button>
                    </Link>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
