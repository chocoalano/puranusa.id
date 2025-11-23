<script setup lang="ts">
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FormData {
    code: string;
    name: string;
    type: string;
    landing_slug: string;
    description: string;
    image: string;
    start_at: string;
    end_at: string;
    is_active: boolean;
    priority: number;
    max_redemption: number | null;
    per_user_limit: number | null;
    conditions_json: string;
    show_on: string;
    page: string;
}

interface Props {
    errors?: Record<string, string>;
    processing?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    submit: [];
}>();

const formData = defineModel<FormData>('formData', { required: true });
</script>

<template>
    <form @submit.prevent="emit('submit')" class="space-y-6">
        <!-- Informasi Dasar -->
        <Card>
            <CardHeader>
                <CardTitle>Informasi Dasar</CardTitle>
                <CardDescription>Detail utama promosi atau diskon</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="code">Kode Promosi *</Label>
                        <Input
                            id="code"
                            v-model="formData.code"
                            placeholder="PROMO2024"
                            class="uppercase"
                            required
                        />
                        <p v-if="errors?.code" class="text-sm text-destructive">
                            {{ errors.code }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="name">Nama Promosi *</Label>
                        <Input
                            id="name"
                            v-model="formData.name"
                            placeholder="Flash Sale Akhir Tahun"
                            required
                        />
                        <p v-if="errors?.name" class="text-sm text-destructive">
                            {{ errors.name }}
                        </p>
                    </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="type">Tipe Promosi *</Label>
                        <Select v-model="formData.type" required>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="discount">Diskon</SelectItem>
                                <SelectItem value="bundle">Bundle</SelectItem>
                                <SelectItem value="flash_sale">Flash Sale</SelectItem>
                                <SelectItem value="promo">Promo</SelectItem>
                            </SelectContent>
                        </Select>
                        <p v-if="errors?.type" class="text-sm text-destructive">
                            {{ errors.type }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="landing_slug">Landing Page Slug</Label>
                        <Input
                            id="landing_slug"
                            v-model="formData.landing_slug"
                            placeholder="flash-sale-2024"
                        />
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="description">Deskripsi</Label>
                    <Textarea
                        id="description"
                        v-model="formData.description"
                        placeholder="Deskripsi promosi (opsional)"
                        rows="3"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="image">URL Gambar</Label>
                    <Input
                        id="image"
                        v-model="formData.image"
                        placeholder="https://example.com/promo-banner.jpg"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Periode & Pengaturan -->
        <Card>
            <CardHeader>
                <CardTitle>Periode & Pengaturan</CardTitle>
                <CardDescription>Atur waktu dan batasan promosi</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="start_at">Tanggal Mulai *</Label>
                        <Input
                            id="start_at"
                            v-model="formData.start_at"
                            type="datetime-local"
                            required
                        />
                        <p v-if="errors?.start_at" class="text-sm text-destructive">
                            {{ errors.start_at }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="end_at">Tanggal Berakhir *</Label>
                        <Input
                            id="end_at"
                            v-model="formData.end_at"
                            type="datetime-local"
                            required
                        />
                        <p v-if="errors?.end_at" class="text-sm text-destructive">
                            {{ errors.end_at }}
                        </p>
                    </div>
                </div>

                <div class="grid gap-4 md:grid-cols-3">
                    <div class="space-y-2">
                        <Label for="priority">Prioritas</Label>
                        <Input
                            id="priority"
                            v-model.number="formData.priority"
                            type="number"
                            min="0"
                            placeholder="0"
                        />
                        <p class="text-sm text-muted-foreground">
                            Angka lebih tinggi = prioritas lebih tinggi
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="max_redemption">Maks. Penebusan</Label>
                        <Input
                            id="max_redemption"
                            :value="formData.max_redemption ?? ''"
                            @input="formData.max_redemption = $event.target.value ? Number($event.target.value) : null"
                            type="number"
                            min="0"
                            placeholder="Tidak terbatas"
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="per_user_limit">Limit Per User</Label>
                        <Input
                            id="per_user_limit"
                            :value="formData.per_user_limit ?? ''"
                            @input="formData.per_user_limit = $event.target.value ? Number($event.target.value) : null"
                            type="number"
                            min="0"
                            placeholder="Tidak terbatas"
                        />
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <input
                        id="is_active"
                        v-model="formData.is_active"
                        type="checkbox"
                        class="rounded"
                    />
                    <Label for="is_active">Promosi Aktif</Label>
                </div>
            </CardContent>
        </Card>

        <!-- Penempatan -->
        <Card>
            <CardHeader>
                <CardTitle>Penempatan</CardTitle>
                <CardDescription>Tentukan dimana promosi ditampilkan</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="space-y-2">
                        <Label for="show_on">Tampilkan Di</Label>
                        <Select v-model="formData.show_on">
                            <SelectTrigger id="show_on">
                                <SelectValue placeholder="Pilih lokasi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="homepage">Homepage</SelectItem>
                                <SelectItem value="product_page">Product Page</SelectItem>
                                <SelectItem value="checkout">Checkout</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div class="space-y-2">
                        <Label for="page">Halaman</Label>
                        <Select v-model="formData.page">
                            <SelectTrigger id="page">
                                <SelectValue placeholder="Pilih halaman" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="home">Home</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="category">Category</SelectItem>
                                <SelectItem value="cart">Cart</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="conditions_json">Kondisi (JSON)</Label>
                    <Textarea
                        id="conditions_json"
                        v-model="formData.conditions_json"
                        placeholder='{"min_purchase": 100000, "categories": [1, 2]}'
                        rows="3"
                        class="font-mono text-sm"
                    />
                    <p class="text-sm text-muted-foreground">
                        Format JSON untuk kondisi spesifik promosi
                    </p>
                </div>
            </CardContent>
        </Card>

        <div class="flex justify-end gap-4">
            <slot name="actions" :processing="processing" />
        </div>
    </form>
</template>
