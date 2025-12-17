<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-vue-next';
import ImageUploadZone from '@/components/admin/ImageUploadZone.vue';
import type { BreadcrumbItem } from '@/types';
import { ref, computed, watch } from 'vue';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Produk',
        href: '/admin/products',
    },
    {
        title: 'Tambah Produk',
        href: '/admin/products/create',
    },
];

const form = ref({
    sku: '',
    slug: '',
    name: '',
    short_desc: '',
    long_desc: '',
    brand: '',
    warranty_months: 0,
    base_price: 0,
    currency: 'IDR',
    stock: 0,
    weight_gram: 0,
    length_mm: 0,
    width_mm: 0,
    height_mm: 0,
    bv: 0,
    b_sponsor: 0,
    b_matching: 0,
    b_pairing: 0,
    b_cashback: 0,
    is_active: true,
    categories: [] as number[],
    images: [] as File[],
});

const loading = ref(false);
const errors = ref<Record<string, string>>({});
const alertMessage = ref<{ type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string } | null>(null);
const slugGenerated = ref(false);

// Check if there are any validation errors
const hasErrors = computed(() => Object.keys(errors.value).length > 0);

// Format error messages for display
const errorList = computed(() => {
    return Object.entries(errors.value).map(([field, message]) => ({
        field: formatFieldName(field),
        message,
    }));
});

// Format field name to human readable
const formatFieldName = (field: string): string => {
    const fieldNames: Record<string, string> = {
        sku: 'SKU',
        slug: 'Slug',
        name: 'Nama Produk',
        short_desc: 'Deskripsi Singkat',
        long_desc: 'Deskripsi Lengkap',
        brand: 'Brand',
        warranty_months: 'Garansi',
        base_price: 'Harga',
        stock: 'Stok',
        weight_gram: 'Berat',
        length_mm: 'Panjang',
        width_mm: 'Lebar',
        height_mm: 'Tinggi',
        bv: 'Business Value',
        b_sponsor: 'Bonus Sponsor',
        b_matching: 'Bonus Matching',
        b_pairing: 'Bonus Pairing',
        b_cashback: 'Bonus Cashback',
        is_active: 'Status Aktif',
        categories: 'Kategori',
        images: 'Gambar Produk',
    };
    return fieldNames[field] || field;
};

// Auto dismiss alert after 5 seconds
watch(alertMessage, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            alertMessage.value = null;
        }, 8000);
    }
});

const generateSlug = () => {
    if (!form.value.name.trim()) {
        alertMessage.value = {
            type: 'warning',
            title: 'Nama Produk Kosong',
            message: 'Silakan masukkan nama produk terlebih dahulu sebelum generate slug.',
        };
        return;
    }

    form.value.slug = form.value.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    slugGenerated.value = true;
    alertMessage.value = {
        type: 'success',
        title: 'Slug Berhasil Dibuat',
        message: `Slug "${form.value.slug}" telah dibuat dari nama produk.`,
    };
};

const dismissAlert = () => {
    alertMessage.value = null;
};

const submit = () => {
    loading.value = true;
    errors.value = {};

    // Create FormData for file upload
    const formData = new FormData();

    // Append all form fields
    Object.entries(form.value).forEach(([key, value]) => {
        if (key === 'categories' && Array.isArray(value)) {
            value.forEach((id) => formData.append('categories[]', id.toString()));
        } else if (key === 'images' && Array.isArray(value)) {
            (value as File[]).forEach((file) => formData.append('images[]', file));
        } else if (key === 'is_active') {
            // Convert boolean to "1" or "0" for Laravel validation
            formData.append(key, value ? '1' : '0');
        } else if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
        }
    });

    const submitFormHelper = useForm({});
    submitFormHelper
        .transform(() => formData)
        .post('/admin/products', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                loading.value = false;
                alertMessage.value = {
                    type: 'success',
                    title: 'Produk Berhasil Ditambahkan',
                    message: 'Produk baru telah berhasil disimpan ke dalam katalog.',
                };
            },
            onError: (err) => {
                errors.value = err;
                loading.value = false;

                // Count errors
                const errorCount = Object.keys(err).length;

                // Create detailed error message
                let errorDetails = '';
                if (errorCount === 1) {
                    const [field, message] = Object.entries(err)[0];
                    errorDetails = `${formatFieldName(field)}: ${message}`;
                } else {
                    errorDetails = `Terdapat ${errorCount} kesalahan yang perlu diperbaiki. Silakan periksa field yang ditandai merah di bawah ini.`;
                }

                alertMessage.value = {
                    type: 'error',
                    title: 'Gagal Menyimpan Produk',
                    message: errorDetails,
                };

                // Scroll to top to show alert
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        });
};
</script>

<template>
    <Head title="Tambah Produk" />

    <AppLayout :breadcrumbs="breadcrumbItems">
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Button variant="outline" size="icon" @click="router.visit('/admin/products')">
                    <ArrowLeft class="h-4 w-4" />
                </Button>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Tambah Produk</h1>
                    <p class="text-muted-foreground">Tambahkan produk baru ke katalog</p>
                </div>
            </div>

            <!-- Alert Messages -->
            <Transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0 transform -translate-y-2"
                enter-to-class="opacity-100 transform translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 transform translate-y-0"
                leave-to-class="opacity-0 transform -translate-y-2"
            >
                <Alert
                    v-if="alertMessage"
                    :variant="alertMessage.type === 'error' ? 'destructive' : 'default'"
                    :class="{
                        'border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200': alertMessage.type === 'success',
                        'border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200': alertMessage.type === 'warning',
                        'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200': alertMessage.type === 'info',
                    }"
                >
                    <CheckCircle2 v-if="alertMessage.type === 'success'" class="h-4 w-4 text-green-600 dark:text-green-400" />
                    <XCircle v-else-if="alertMessage.type === 'error'" class="h-4 w-4" />
                    <AlertCircle v-else-if="alertMessage.type === 'warning'" class="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <Info v-else class="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertTitle class="flex items-center justify-between">
                        {{ alertMessage.title }}
                        <Button
                            variant="ghost"
                            size="sm"
                            class="h-6 w-6 p-0 hover:bg-transparent"
                            @click="dismissAlert"
                        >
                            <span class="sr-only">Tutup</span>
                            ×
                        </Button>
                    </AlertTitle>
                    <AlertDescription>
                        {{ alertMessage.message }}
                    </AlertDescription>
                </Alert>
            </Transition>

            <!-- Error Summary (when multiple errors) -->
            <Transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <Alert v-if="hasErrors && errorList.length > 1" variant="destructive" class="mb-4">
                    <XCircle class="h-4 w-4" />
                    <AlertTitle>Terdapat {{ errorList.length }} Kesalahan</AlertTitle>
                    <AlertDescription>
                        <ul class="mt-2 list-disc list-inside space-y-1">
                            <li v-for="(error, index) in errorList" :key="index" class="text-sm">
                                <strong>{{ error.field }}:</strong> {{ error.message }}
                            </li>
                        </ul>
                    </AlertDescription>
                </Alert>
            </Transition>

            <form @submit.prevent="submit" class="space-y-6 w-full grid grid-cols-2 gap-4">
                <!-- Basic Information -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Dasar</CardTitle>
                        <CardDescription>Informasi utama produk</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="sku">SKU <span class="text-destructive">*</span></Label>
                                <Input
                                    id="sku"
                                    v-model="form.sku"
                                    placeholder="SKU-001"
                                    :class="{ 'border-destructive': errors.sku }"
                                    required
                                />
                                <p v-if="errors.sku" class="text-sm text-destructive">{{ errors.sku }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="slug">Slug <span class="text-destructive">*</span></Label>
                                <div class="flex gap-2">
                                    <Input
                                        id="slug"
                                        v-model="form.slug"
                                        placeholder="product-slug"
                                        :class="{ 'border-destructive': errors.slug }"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        @click="generateSlug"
                                        :disabled="!form.name.trim()"
                                        :title="!form.name.trim() ? 'Masukkan nama produk terlebih dahulu' : 'Generate slug dari nama produk'"
                                    >
                                        Generate
                                    </Button>
                                </div>
                                <p v-if="errors.slug" class="text-sm text-destructive">{{ errors.slug }}</p>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <Label for="name">Nama Produk <span class="text-destructive">*</span></Label>
                            <Input
                                id="name"
                                v-model="form.name"
                                placeholder="Nama produk"
                                :class="{ 'border-destructive': errors.name }"
                                required
                            />
                            <p class="text-xs text-muted-foreground">
                                Slug akan otomatis dibuat saat Anda klik tombol "Generate" pada field Slug
                            </p>
                            <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
                        </div>
                        <div class="space-y-2">
                            <Label for="brand">Brand</Label>
                            <Input
                                id="brand"
                                v-model="form.brand"
                                placeholder="Nama brand"
                            />
                        </div>
                        <div class="space-y-2">
                            <Label for="short_desc">Deskripsi Singkat</Label>
                            <Textarea
                                id="short_desc"
                                v-model="form.short_desc"
                                placeholder="Deskripsi singkat produk"
                                rows="2"
                            />
                        </div>
                        <div class="space-y-2">
                            <Label for="long_desc">Deskripsi Lengkap</Label>
                            <Textarea
                                id="long_desc"
                                v-model="form.long_desc"
                                placeholder="Deskripsi lengkap produk"
                                rows="4"
                            />
                        </div>
                    </CardContent>
                </Card>

                <!-- Pricing & Stock -->
                <Card>
                    <CardHeader>
                        <CardTitle>Harga & Stok</CardTitle>
                        <CardDescription>Informasi harga dan ketersediaan</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="space-y-2">
                                <Label for="base_price">Harga (IDR) <span class="text-destructive">*</span></Label>
                                <Input
                                    id="base_price"
                                    v-model.number="form.base_price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0"
                                    :class="{ 'border-destructive': errors.base_price }"
                                    required
                                />
                                <p v-if="errors.base_price" class="text-sm text-destructive">{{ errors.base_price }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="stock">Stok <span class="text-destructive">*</span></Label>
                                <Input
                                    id="stock"
                                    v-model.number="form.stock"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    :class="{ 'border-destructive': errors.stock }"
                                    required
                                />
                                <p v-if="errors.stock" class="text-sm text-destructive">{{ errors.stock }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="warranty_months">Garansi (Bulan)</Label>
                                <Input
                                    id="warranty_months"
                                    v-model.number="form.warranty_months"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Bonus/Commission -->
                <Card>
                    <CardHeader>
                        <CardTitle>Bonus & Komisi</CardTitle>
                        <CardDescription>Pengaturan bonus untuk sistem MLM</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="bv">Business Value (BV)</Label>
                                <Input
                                    id="bv"
                                    v-model.number="form.bv"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="b_sponsor">Bonus Sponsor</Label>
                                <Input
                                    id="b_sponsor"
                                    v-model.number="form.b_sponsor"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="b_matching">Bonus Matching</Label>
                                <Input
                                    id="b_matching"
                                    v-model.number="form.b_matching"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="b_pairing">Bonus Pairing</Label>
                                <Input
                                    id="b_pairing"
                                    v-model.number="form.b_pairing"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="b_cashback">Bonus Cashback</Label>
                                <Input
                                    id="b_cashback"
                                    v-model.number="form.b_cashback"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Shipping -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Pengiriman</CardTitle>
                        <CardDescription>Berat dan dimensi untuk pengiriman</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-4 gap-4">
                            <div class="space-y-2">
                                <Label for="weight_gram">Berat (gram) <span class="text-destructive">*</span></Label>
                                <Input
                                    id="weight_gram"
                                    v-model.number="form.weight_gram"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    :class="{ 'border-destructive': errors.weight_gram }"
                                    required
                                />
                                <p v-if="errors.weight_gram" class="text-sm text-destructive">{{ errors.weight_gram }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="length_mm">Panjang (mm)</Label>
                                <Input
                                    id="length_mm"
                                    v-model.number="form.length_mm"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="width_mm">Lebar (mm)</Label>
                                <Input
                                    id="width_mm"
                                    v-model.number="form.width_mm"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="height_mm">Tinggi (mm)</Label>
                                <Input
                                    id="height_mm"
                                    v-model.number="form.height_mm"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Product Images -->
                <Card>
                    <CardHeader>
                        <CardTitle>Gambar Produk</CardTitle>
                        <CardDescription>Upload gambar produk (maksimal 10 gambar)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ImageUploadZone v-model="form.images" :max-images="10" />
                        <p v-if="errors.images" class="mt-2 text-sm text-destructive">{{ errors.images }}</p>
                    </CardContent>
                </Card>

                <!-- Categories & Status -->
                <Card>
                    <CardHeader>
                        <CardTitle>Kategori & Status</CardTitle>
                        <CardDescription>Pilih kategori produk dan status aktif</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label>Kategori</Label>
                            <div class="grid grid-cols-3 gap-2">
                                <label
                                    v-for="category in categories"
                                    :key="category.id"
                                    class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                                    :class="{ 'bg-accent': form.categories.includes(category.id) }"
                                >
                                    <Checkbox
                                        :model-value="form.categories.includes(category.id)"
                                        @update:model-value="(checked) => {
                                            if (checked) {
                                                form.categories.push(category.id);
                                            } else {
                                                form.categories = form.categories.filter(id => id !== category.id);
                                            }
                                        }"
                                    />
                                    <span class="text-sm">{{ category.name }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <Checkbox
                                id="is_active"
                                :model-value="form.is_active"
                                @update:model-value="(value) => form.is_active = !!value"
                            />
                            <Label for="is_active" class="cursor-pointer">Produk Aktif</Label>
                        </div>
                    </CardContent>
                </Card>

                <div class="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        @click="router.visit('/admin/products')"
                        :disabled="loading"
                    >
                        Batal
                    </Button>
                    <Button type="submit" :disabled="loading">
                        {{ loading ? 'Menyimpan...' : 'Tambah Produk' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
