<script setup lang="ts">
import { ref, computed } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
import { Upload, X, Image as ImageIcon } from 'lucide-vue-next';

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
    image: File | string | null;
}

interface Props {
    parentCategories: ParentCategory[];
    errors?: Record<string, string>;
    processing?: boolean;
    existingImage?: string | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    submit: [];
}>();

const formData = defineModel<FormData>('formData', { required: true });

const imagePreview = ref<string | null>(props.existingImage || null);
const fileInput = ref<HTMLInputElement | null>(null);

const generateSlug = () => {
    formData.value.slug = formData.value.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

const handleImageSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file maksimal 2MB');
            return;
        }

        formData.value.image = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const removeImage = () => {
    formData.value.image = null;
    imagePreview.value = null;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const triggerFileInput = () => {
    fileInput.value?.click();
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
                    <Label>Gambar Kategori</Label>
                    <div class="space-y-3">
                        <!-- Image Preview -->
                        <div v-if="imagePreview" class="relative inline-block">
                            <img
                                :src="imagePreview"
                                alt="Preview"
                                class="w-32 h-32 object-cover rounded-lg border"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                class="absolute -top-2 -right-2 h-6 w-6"
                                @click="removeImage"
                            >
                                <X class="h-3 w-3" />
                            </Button>
                        </div>

                        <!-- Upload Area -->
                        <div
                            v-if="!imagePreview"
                            class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                            @click="triggerFileInput"
                        >
                            <ImageIcon class="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                            <p class="text-sm text-muted-foreground">
                                Klik untuk upload gambar
                            </p>
                            <p class="text-xs text-muted-foreground mt-1">
                                PNG, JPG, WEBP (max. 2MB)
                            </p>
                        </div>

                        <!-- Hidden File Input -->
                        <input
                            ref="fileInput"
                            type="file"
                            accept="image/*"
                            class="hidden"
                            @change="handleImageSelect"
                        />

                        <!-- Change Button when image exists -->
                        <Button
                            v-if="imagePreview"
                            type="button"
                            variant="outline"
                            size="sm"
                            @click="triggerFileInput"
                        >
                            <Upload class="h-4 w-4 mr-2" />
                            Ganti Gambar
                        </Button>
                    </div>
                    <p v-if="errors?.image" class="text-sm text-destructive">
                        {{ errors.image }}
                    </p>
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
