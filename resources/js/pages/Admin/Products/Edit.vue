<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
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
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import ImageUploadZone from '@/components/admin/ImageUploadZone.vue';
import { ref } from 'vue';

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
    is_active: props.product.is_active,
    categories: props.product.categories.map((c) => c.id),
    images: [] as File[],
});

const loading = ref(false);

const submit = () => {
    loading.value = true;
    errors.value = {};

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('_method', 'PUT');

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

    router.post(`/admin/products/${props.product.id}`, formData, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            toast.success('Produk berhasil diperbarui')
            loading.value = false;
        },
        onError: (errorBag) => {
            errors.value = errorBag;
            toast.error('Gagal memperbarui produk');
            loading.value = false;
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
                                    <Label for="sku">SKU</Label>
                                    <Input id="sku" v-model="form.sku" required />
                                </div>
                                <div class="space-y-2">
                                    <Label for="slug">Slug</Label>
                                    <Input id="slug" v-model="form.slug" required />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <Label for="name">Nama Produk</Label>
                                <Input id="name" v-model="form.name" required />
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
                                <Textarea id="long_desc" v-model="form.long_desc" rows="4" />
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
                                        <Label for="base_price">Harga (IDR)</Label>
                                        <Input id="base_price" v-model.number="form.base_price" type="number"
                                            required />
                                    </div>
                                    <div class="space-y-2">
                                        <Label for="stock">Stok</Label>
                                        <Input id="stock" v-model.number="form.stock" type="number" required />
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
                                        <Label for="weight_gram">Berat (gram)</Label>
                                        <Input id="weight_gram" v-model.number="form.weight_gram" type="number"
                                            required />
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
                                                :checked="form.categories.includes(category.id)" @update:checked="
                                                    (checked: boolean) => {
                                                        if (checked) {
                                                            form.categories.push(category.id);
                                                        } else {
                                                            const index = form.categories.indexOf(category.id);
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
                                    <Checkbox id="is_active" :checked="form.is_active"
                                        @update:checked="(checked: boolean) => (form.is_active = checked)" />
                                    <Label for="is_active">Produk Aktif</Label>
                                </div>
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
