<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
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
import { ArrowLeft } from 'lucide-vue-next';
import ImageUploadZone from '@/components/admin/ImageUploadZone.vue';
import type { BreadcrumbItem } from '@/types';
import { ref } from 'vue';

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

const generateSlug = () => {
    form.value.slug = form.value.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
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
        } else if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
        }
    });

    router.post('/admin/products', formData, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            loading.value = false;
        },
        onError: (err) => {
            errors.value = err;
            loading.value = false;
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
                                    <Button type="button" variant="outline" @click="generateSlug">
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
                                @input="generateSlug"
                                required
                            />
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
