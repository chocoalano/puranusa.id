<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import ImageUploadZone from '@/components/admin/ImageUploadZone.vue';
import TiptapEditor from '@/components/admin/TiptapEditor.vue';
import { ref, computed, watch } from 'vue';

interface ProductMedia {
    id: number;
    url: string;
    alt_text: string;
    sort_order: number;
    is_primary: boolean;
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    sku: string;
    slug: string;
    name: string;
    short_desc: string | null;
    long_desc: string | null;
    brand: string | null;
    warranty_months: number | null;
    base_price: number;
    currency: string;
    stock: number;
    weight_gram: number;
    length_mm: number | null;
    width_mm: number | null;
    height_mm: number | null;
    bv: number | null;
    b_sponsor: number | null;
    b_matching: number | null;
    b_pairing: number | null;
    b_cashback: number | null;
    b_retail: number | null;
    is_active: boolean;
    categories: Category[];
    media: ProductMedia[];
}

interface Props {
    product: Product;
    categories: Category[];
    errors?: Record<string, string>;
}

const props = defineProps<Props>();

const errors = ref(props.errors || {});
const alertMessage = ref<{ type: 'success' | 'error' | 'warning'; title: string; message: string } | null>(null);

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
        b_retail: 'Bonus Retail',
        is_active: 'Status Aktif',
        categories: 'Kategori',
        images: 'Gambar Produk',
    };
    return fieldNames[field] || field;
};

// Auto dismiss alert after 8 seconds
watch(alertMessage, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            alertMessage.value = null;
        }, 8000);
    }
});

const dismissAlert = () => {
    alertMessage.value = null;
};

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

    alertMessage.value = {
        type: 'success',
        title: 'Slug Berhasil Dibuat',
        message: `Slug "${form.value.slug}" telah dibuat dari nama produk.`,
    };
};

const form = ref({
    sku: props.product.sku,
    slug: props.product.slug,
    name: props.product.name,
    short_desc: props.product.short_desc || '',
    long_desc: props.product.long_desc || '',
    brand: props.product.brand || '',
    warranty_months: props.product.warranty_months || 0,
    base_price: props.product.base_price,
    currency: props.product.currency,
    stock: props.product.stock,
    weight_gram: props.product.weight_gram,
    length_mm: props.product.length_mm || 0,
    width_mm: props.product.width_mm || 0,
    height_mm: props.product.height_mm || 0,
    bv: props.product.bv || 0,
    b_sponsor: props.product.b_sponsor || 0,
    b_matching: props.product.b_matching || 0,
    b_pairing: props.product.b_pairing || 0,
    b_cashback: props.product.b_cashback || 0,
    b_retail: props.product.b_retail || 0,
    is_active: props.product.is_active,
    categories: props.product.categories.map((c) => Number(c.id)),
    images: [] as File[],
});

const loading = ref(false);

const submit = () => {
    loading.value = true;
    errors.value = {};
    alertMessage.value = null;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('_method', 'PUT');

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
        .post(`/admin/products/${props.product.id}`, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success('Produk berhasil diperbarui');
                alertMessage.value = {
                    type: 'success',
                    title: 'Produk Berhasil Diperbarui',
                    message: 'Perubahan produk telah berhasil disimpan.',
                };
                loading.value = false;
            },
            onError: (errorBag) => {
                errors.value = errorBag;
                loading.value = false;

                // Count errors
                const errorCount = Object.keys(errorBag).length;

                // Create detailed error message
                let errorDetails = '';
                if (errorCount === 1) {
                    const [field, message] = Object.entries(errorBag)[0];
                    errorDetails = `${formatFieldName(field)}: ${message}`;
                } else {
                    errorDetails = `Terdapat ${errorCount} kesalahan yang perlu diperbaiki. Silakan periksa field yang ditandai merah di bawah ini.`;
                }

                alertMessage.value = {
                    type: 'error',
                    title: 'Gagal Memperbarui Produk',
                    message: errorDetails,
                };

                toast.error('Gagal memperbarui produk');

                // Scroll to top to show alert
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        });
};
</script>

<template>

    <Head :title="`Edit ${product.name}`" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/products">
                <Button variant="outline" size="icon">
                    <ArrowLeft class="h-4 w-4" />
                </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Edit Produk</h1>
                    <p class="text-muted-foreground">Perbarui informasi produk</p>
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
                    }"
                >
                    <CheckCircle2 v-if="alertMessage.type === 'success'" class="h-4 w-4 text-green-600 dark:text-green-400" />
                    <XCircle v-else-if="alertMessage.type === 'error'" class="h-4 w-4" />
                    <AlertCircle v-else class="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
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

            <form @submit.prevent="submit" class="space-y-6 w-full">
                <div class="grid grid-cols-2 gap-4">
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
                                    :class="{ 'border-destructive': errors.name }"
                                    required
                                />
                                <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="brand">Brand</Label>
                                <Input id="brand" v-model="form.brand" />
                            </div>
                            <div class="space-y-2">
                                <Label for="short_desc">Deskripsi Singkat</Label>
                                <Textarea id="short_desc" v-model="form.short_desc" rows="2" />
                            </div>
                            <div class="space-y-2">
                                <Label for="long_desc">Deskripsi Lengkap</Label>
                                <TiptapEditor v-model="form.long_desc" />
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Pricing & Stock -->
                    <div class="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Harga & Stok</CardTitle>
                                <CardDescription>Informasi harga dan ketersediaan</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="space-y-2">
                                        <Label for="base_price">Harga (IDR) <span class="text-destructive">*</span></Label>
                                        <Input id="base_price" v-model.number="form.base_price" type="number"
                                            :class="{ 'border-destructive': errors.base_price }"
                                            required />
                                        <p v-if="errors.base_price" class="text-sm text-destructive">{{ errors.base_price }}</p>
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="stock">Stok <span class="text-destructive">*</span></Label>
                                        <Input id="stock" v-model.number="form.stock" type="number"
                                            :class="{ 'border-destructive': errors.stock }"
                                            required />
                                        <p v-if="errors.stock" class="text-sm text-destructive">{{ errors.stock }}</p>
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="warranty_months">Garansi (Bulan)</Label>
                                        <Input id="warranty_months" v-model.number="form.warranty_months"
                                            type="number" />
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
                                        <Input id="weight_gram" v-model.number="form.weight_gram" type="number"
                                            :class="{ 'border-destructive': errors.weight_gram }"
                                            required />
                                        <p v-if="errors.weight_gram" class="text-sm text-destructive">{{ errors.weight_gram }}</p>
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="length_mm">Panjang (mm)</Label>
                                        <Input id="length_mm" v-model.number="form.length_mm" type="number" />
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="width_mm">Lebar (mm)</Label>
                                        <Input id="width_mm" v-model.number="form.width_mm" type="number" />
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="height_mm">Tinggi (mm)</Label>
                                        <Input id="height_mm" v-model.number="form.height_mm" type="number" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <!-- Categories & Status -->
                        <Card>
                            <CardHeader>
                                <CardTitle>Kategori & Status</CardTitle>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="space-y-2">
                                    <Label>Kategori</Label>
                                    <div class="grid grid-cols-3 gap-2">
                                        <label v-for="category in categories" :key="category.id"
                                            class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-accent">
                                            <Checkbox :id="`category-${category.id}`"
                                                :model-value="form.categories.includes(Number(category.id))"
                                                @update:model-value="
                                                    (checked: boolean | 'indeterminate') => {
                                                        if (checked === 'indeterminate') {
                                                            return;
                                                        }
                                                        const categoryId = Number(category.id);
                                                        if (checked) {
                                                            form.categories.push(categoryId);
                                                        } else {
                                                            const index = form.categories.indexOf(categoryId);
                                                            if (index > -1) {
                                                                form.categories.splice(index, 1);
                                                            }
                                                        }
                                                    }
                                                " />
                                            <span class="text-sm">{{ category.name }}</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Checkbox id="is_active" :model-value="form.is_active"
                                        @update:model-value="(checked: boolean | 'indeterminate') => {
                                            if (checked !== 'indeterminate') {
                                                form.is_active = checked;
                                            }
                                        }" />
                                    <Label for="is_active">Produk Aktif</Label>
                                </div>
                                <p v-if="errors.is_active" class="text-sm text-destructive">{{ errors.is_active }}</p>
                                <p v-if="errors.categories" class="text-sm text-destructive">{{ errors.categories }}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <!-- Bonus & Commission -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Bonus & Komisi</CardTitle>
                            <CardDescription>Konfigurasi struktur bonus MLM untuk produk ini</CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <Label for="bv">Business Value (BV)</Label>
                                    <Input id="bv" v-model.number="form.bv" type="number" step="0.01" min="0"
                                        placeholder="0.00" />
                                    <p v-if="errors.bv" class="text-sm font-medium text-destructive">
                                        {{ errors.bv }}
                                    </p>
                                </div>

                                <div class="space-y-2">
                                    <Label for="b_sponsor">Bonus Sponsor</Label>
                                    <Input id="b_sponsor" v-model.number="form.b_sponsor" type="number" step="0.01"
                                        min="0" placeholder="0.00" />
                                    <p v-if="errors.b_sponsor" class="text-sm font-medium text-destructive">
                                        {{ errors.b_sponsor }}
                                    </p>
                                </div>

                                <div class="space-y-2">
                                    <Label for="b_matching">Bonus Matching</Label>
                                    <Input id="b_matching" v-model.number="form.b_matching" type="number" step="0.01"
                                        min="0" placeholder="0.00" />
                                    <p v-if="errors.b_matching" class="text-sm font-medium text-destructive">
                                        {{ errors.b_matching }}
                                    </p>
                                </div>

                                <div class="space-y-2">
                                    <Label for="b_pairing">Bonus Pairing</Label>
                                    <Input id="b_pairing" v-model.number="form.b_pairing" type="number" step="0.01"
                                        min="0" placeholder="0.00" />
                                    <p v-if="errors.b_pairing" class="text-sm font-medium text-destructive">
                                        {{ errors.b_pairing }}
                                    </p>
                                </div>

                                <div class="space-y-2">
                                    <Label for="b_cashback">Bonus Cashback</Label>
                                    <Input id="b_cashback" v-model.number="form.b_cashback" type="number" step="0.01"
                                        min="0" placeholder="0.00" />
                                    <p v-if="errors.b_cashback" class="text-sm font-medium text-destructive">
                                        {{ errors.b_cashback }}
                                    </p>
                                </div>

                                <div class="space-y-2">
                                    <Label for="b_retail">Bonus Retail</Label>
                                    <Input id="b_retail" v-model.number="form.b_retail" type="number" step="0.01"
                                        min="0" placeholder="0.00" />
                                    <p v-if="errors.b_retail" class="text-sm font-medium text-destructive">
                                        {{ errors.b_retail }}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Product Images -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Gambar Produk</CardTitle>
                            <CardDescription>
                                Kelola gambar produk (maksimal 10 gambar)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ImageUploadZone v-model="form.images" :product-id="product.id"
                                :existing-images="product.media" :max-images="10" />
                            <p v-if="errors.images" class="mt-2 text-sm text-destructive">{{ errors.images }}</p>
                        </CardContent>
                    </Card>
                </div>

                <div class="flex justify-end gap-4">
                    <Link href="/admin/products">
                    <Button type="button" variant="outline">Batal</Button>
                    </Link>
                    <Button type="submit" :disabled="loading">
                        {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
