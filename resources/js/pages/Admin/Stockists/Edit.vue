<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
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
import { index, update, getCities } from '@/actions/App/Http/Controllers/Admin/StockistController';
import { toast } from 'vue-sonner';

interface Stockist {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    ewallet_id: string;
    stockist_kabupaten_id: number | null;
    stockist_kabupaten_name: string | null;
    stockist_province_id: number | null;
    stockist_province_name: string | null;
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
    stockist: Stockist;
    provinces: Province[];
    assignedKabupaten: number[];
}

const props = defineProps<Props>();

const form = useForm({
    stockist_kabupaten_id: props.stockist.stockist_kabupaten_id,
    stockist_kabupaten_name: props.stockist.stockist_kabupaten_name || '',
    stockist_province_id: props.stockist.stockist_province_id,
    stockist_province_name: props.stockist.stockist_province_name || '',
});

// Province and city state - initialize with current province
const selectedProvinceId = ref<number | null>(props.stockist.stockist_province_id);
const citiesList = ref<City[]>([]);
const loadingCities = ref(false);
const cityOpen = ref(false);
const initialLoading = ref(true);

// Fetch cities when province changes
watch(selectedProvinceId, async (provinceId) => {
    if (!provinceId) {
        citiesList.value = [];
        if (!initialLoading.value) {
            form.stockist_kabupaten_id = null;
            form.stockist_kabupaten_name = '';
            form.stockist_province_id = null;
            form.stockist_province_name = '';
        }
        return;
    }

    // Set province info
    const province = props.provinces.find(p => p.id === provinceId);
    if (province) {
        form.stockist_province_id = province.id;
        form.stockist_province_name = province.name;
    }

    // Reset city when province changes (except on initial load)
    if (!initialLoading.value) {
        form.stockist_kabupaten_id = null;
        form.stockist_kabupaten_name = '';
    }

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
    } catch (error) {
        console.error(error);
        toast.error('Gagal memuat daftar kota');
        citiesList.value = [];
    } finally {
        loadingCities.value = false;
        initialLoading.value = false;
    }
}, { immediate: true });

// Handle city selection
const handleCitySelect = (city: City) => {
    form.stockist_kabupaten_id = city.id;
    form.stockist_kabupaten_name = city.name;
    cityOpen.value = false;
};

// Check if kabupaten is already assigned (excluding current stockist)
const isKabupatenAssigned = (cityId: number) => {
    return props.assignedKabupaten.includes(cityId);
};

// Submit form
const submit = () => {
    form.put(update.url(props.stockist.id), {
        onSuccess: () => {
            toast.success('Kota stokist berhasil diperbarui');
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
        <Head title="Edit Stokist" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="mb-6 flex items-center gap-4">
                <Link :href="index.url()">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Edit Stokist</h1>
                    <p class="text-muted-foreground">
                        Ubah kota wilayah stokist
                    </p>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6 max-w-2xl">
                <!-- Stockist Info (Read-only) -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <User class="h-5 w-5" />
                            Informasi Stokist
                        </CardTitle>
                        <CardDescription>
                            Data pelanggan yang menjadi stokist (tidak dapat diubah)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="rounded-lg bg-muted p-4 space-y-3">
                            <div class="flex items-center gap-2">
                                <Badge variant="secondary" class="font-mono">{{ stockist.ewallet_id }}</Badge>
                                <Store class="h-4 w-4 text-primary" />
                            </div>
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="font-medium text-muted-foreground">Nama:</span>
                                    <p class="font-medium">{{ stockist.name }}</p>
                                </div>
                                <div>
                                    <span class="font-medium text-muted-foreground">Email:</span>
                                    <p>{{ stockist.email }}</p>
                                </div>
                                <div>
                                    <span class="font-medium text-muted-foreground">Telepon:</span>
                                    <p>{{ stockist.phone || '-' }}</p>
                                </div>
                                <div>
                                    <span class="font-medium text-muted-foreground">Kota Saat Ini:</span>
                                    <p class="flex items-center gap-1">
                                        <MapPin class="h-4 w-4 text-muted-foreground" />
                                        {{ stockist.stockist_kabupaten_name || '-' }}
                                        <span v-if="stockist.stockist_province_name" class="text-muted-foreground">
                                            ({{ stockist.stockist_province_name }})
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Location Selection -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <MapPin class="h-5 w-5" />
                            Ubah Wilayah Stokist
                        </CardTitle>
                        <CardDescription>
                            Pilih kota baru untuk wilayah stokist. Setiap kota hanya dapat memiliki 1 stokist.
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
                                Pilih provinsi untuk menampilkan daftar kota.
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
                                Kota yang sudah memiliki stokist lain akan ditandai dan tidak dapat dipilih.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Alert Info -->
                <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
                    <div class="flex items-start gap-3">
                        <AlertCircle class="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div class="text-sm text-amber-700 dark:text-amber-300">
                            <p class="font-medium">Perhatian</p>
                            <p class="mt-1">
                                Mengubah wilayah stokist akan memindahkan tanggung jawab distribusi ke kota baru. Pastikan perubahan ini sudah dikonfirmasi dengan stokist bersangkutan.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex items-center gap-4">
                    <Button type="submit" :disabled="form.processing">
                        <Store class="mr-2 h-4 w-4" />
                        {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </Button>
                    <Link :href="index.url()">
                        <Button variant="outline" type="button">Batal</Button>
                    </Link>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
