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

interface ParentCategory {
    id: number;
    name: string;
}

interface FormData {
    parent_id: number | null;
    slug: string;
    name: string;
    description: string;
    sort_order: number;
    is_active: boolean;
    image: string;
}

interface Props {
    parentCategories: ParentCategory[];
    errors?: Record<string, string>;
    processing?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    submit: [];
}>();

const formData = defineModel<FormData>('formData', { required: true });

const generateSlug = () => {
    formData.value.slug = formData.value.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};
</script>

<template>
    <form @submit.prevent="emit('submit')" class="space-y-6">
        <!-- Informasi Dasar -->
        <Card>
            <CardHeader>
                <CardTitle>Informasi Dasar</CardTitle>
                <CardDescription>Informasi utama kategori produk</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="space-y-2">
                    <Label for="name">Nama Kategori *</Label>
                    <Input
                        id="name"
                        v-model="formData.name"
                        placeholder="Masukkan nama kategori"
                        @input="generateSlug"
                        required
                    />
                    <p v-if="errors?.name" class="text-sm text-destructive">
                        {{ errors.name }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="slug">Slug *</Label>
                    <Input
                        id="slug"
                        v-model="formData.slug"
                        placeholder="nama-kategori"
                        required
                    />
                    <p class="text-sm text-muted-foreground">
                        URL-friendly identifier (contoh: fashion-pria)
                    </p>
                    <p v-if="errors?.slug" class="text-sm text-destructive">
                        {{ errors.slug }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="description">Deskripsi</Label>
                    <Textarea
                        id="description"
                        v-model="formData.description"
                        placeholder="Deskripsi kategori (opsional)"
                        rows="3"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="image">URL Gambar</Label>
                    <Input
                        id="image"
                        v-model="formData.image"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Pengaturan -->
        <Card>
            <CardHeader>
                <CardTitle>Pengaturan</CardTitle>
                <CardDescription>Atur hierarki dan status kategori</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="space-y-2">
                    <Label for="parent_id">Kategori Parent</Label>
                    <Select v-model="formData.parent_id">
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori parent (opsional)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem :value="null">Tidak ada parent</SelectItem>
                            <SelectItem
                                v-for="parent in parentCategories"
                                :key="parent.id"
                                :value="parent.id"
                            >
                                {{ parent.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p class="text-sm text-muted-foreground">
                        Kosongkan jika ini adalah kategori utama
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="sort_order">Urutan Tampilan</Label>
                    <Input
                        id="sort_order"
                        v-model.number="formData.sort_order"
                        type="number"
                        min="0"
                    />
                    <p class="text-sm text-muted-foreground">
                        Angka lebih kecil akan ditampilkan lebih dulu
                    </p>
                </div>

                <div class="flex items-center gap-2">
                    <input
                        id="is_active"
                        v-model="formData.is_active"
                        type="checkbox"
                        class="rounded"
                    />
                    <Label for="is_active">Kategori Aktif</Label>
                </div>
            </CardContent>
        </Card>

        <div class="flex justify-end gap-4">
            <slot name="actions" :processing="processing" />
        </div>
    </form>
</template>
