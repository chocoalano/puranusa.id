<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import TiptapEditor from '@/components/admin/TiptapEditor.vue';
import { ArrowLeft, Save } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface Category {
    id: number;
    name: string;
    parent_id: number | null;
}

interface ContentForm {
    category_id: number | null;
    title: string;
    slug: string;
    content: string;
    file: File | null;
    vlink: string;
    status: string;
}

interface Props {
    categories: Category[];
}

const props = defineProps<Props>();

const form = ref({
    category_id: null as number | null,
    title: '',
    slug: '',
    content: '',
    file: null as File | null,
    vlink: '',
    status: 'draft',
});

const allowedFileExtensions = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif',
    'svg',
    'mp4',
    'mov',
    'avi',
    'webm',
    'mkv',
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'txt',
];

const allowedFileMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
];

const isAllowedFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (extension && allowedFileExtensions.includes(extension)) return true;
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) return true;
    return allowedFileMimes.includes(file.type);
};

const submitForm = useForm<ContentForm>({} as ContentForm);
const errors = computed(() => submitForm.errors);
const processing = computed(() => submitForm.processing);

const slugTouched = ref(false);

const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

watch(() => form.value.title, (value) => {
    if (!slugTouched.value) {
        form.value.slug = slugify(value);
    }
});

const selectedCategory = computed({
    get() {
        return form.value.category_id ? String(form.value.category_id) : 'none';
    },
    set(value: string) {
        form.value.category_id = value === 'none' ? null : Number(value);
    },
});

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (!file) {
        form.value.file = null;
        return;
    }

    if (!isAllowedFile(file)) {
        toast.error('Format file tidak didukung. Gunakan gambar, video, PDF, atau dokumen kantor.');
        form.value.file = null;
        target.value = '';
        return;
    }

    form.value.file = file;
};

const submit = () => {
    const formData = new FormData();
    formData.append('title', form.value.title);

    if (form.value.slug) {
        formData.append('slug', form.value.slug);
    }

    if (form.value.category_id) {
        formData.append('category_id', String(form.value.category_id));
    }

    if (form.value.content) {
        formData.append('content', form.value.content);
    }

    if (form.value.file instanceof File) {
        formData.append('file', form.value.file);
    }

    if (form.value.vlink) {
        formData.append('vlink', form.value.vlink);
    }

    if (form.value.status) {
        formData.append('status', form.value.status);
    }

    submitForm
        .transform(() => formData)
        .post('/admin/zenner-club/contents', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success('Konten berhasil ditambahkan');
            },
            onError: () => {
                toast.error('Gagal menambahkan konten');
            },
        });
};
</script>

<template>
    <Head title="Tambah Konten" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/zenner-club/contents">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Tambah Konten</h1>
                    <p class="text-muted-foreground">Buat konten Zenner Club baru</p>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Utama</CardTitle>
                        <CardDescription>Lengkapi data konten</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label for="title">Judul</Label>
                            <Input
                                id="title"
                                v-model="form.title"
                                placeholder="Judul konten"
                                :class="{ 'border-destructive': errors.title }"
                            />
                            <p v-if="errors.title" class="text-sm text-destructive">{{ errors.title }}</p>
                        </div>

                        <div class="space-y-2">
                            <Label for="slug">Slug</Label>
                            <Input
                                id="slug"
                                v-model="form.slug"
                                placeholder="slug-konten"
                                :class="{ 'border-destructive': errors.slug }"
                                @input="slugTouched = true"
                            />
                            <p class="text-xs text-muted-foreground">
                                URL: /zenner-club/{{ form.slug || 'slug-konten' }}
                            </p>
                            <p v-if="errors.slug" class="text-sm text-destructive">{{ errors.slug }}</p>
                        </div>

                        <div class="grid gap-4 lg:grid-cols-2">
                            <div class="space-y-2">
                                <Label>Kategori</Label>
                                <Select v-model="selectedCategory">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Tanpa Kategori</SelectItem>
                                        <SelectItem
                                            v-for="item in categories"
                                            :key="item.id"
                                            :value="String(item.id)"
                                        >
                                            {{ item.name }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <p v-if="errors.category_id" class="text-sm text-destructive">{{ errors.category_id }}</p>
                            </div>

                            <div class="space-y-2">
                                <Label>Status</Label>
                                <Select v-model="form.status">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p v-if="errors.status" class="text-sm text-destructive">{{ errors.status }}</p>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <Label>Deskripsi Konten</Label>
                            <TiptapEditor v-model="form.content" />
                            <p v-if="errors.content" class="text-sm text-destructive">{{ errors.content }}</p>
                        </div>

                        <div class="grid gap-4 lg:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="file">File Lampiran</Label>
                                <input
                                    id="file"
                                    type="file"
                                    :class="[
                                        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                                        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                                        errors.file ? 'border-destructive' : '',
                                    ]"
                                    accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                                    @change="handleFileChange"
                                />
                                <p class="text-xs text-muted-foreground">
                                    Format: gambar (JPG/PNG/WebP/GIF/SVG), video (MP4/MOV/AVI/WebM/MKV),
                                    PDF, atau dokumen (DOC/DOCX/XLS/XLSX/PPT/PPTX/TXT). Maks 10MB.
                                </p>
                                <p v-if="errors.file" class="text-sm text-destructive">{{ errors.file }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="vlink">Video Link</Label>
                                <Input
                                    id="vlink"
                                    v-model="form.vlink"
                                    placeholder="https://..."
                                    :class="{ 'border-destructive': errors.vlink }"
                                />
                                <p v-if="errors.vlink" class="text-sm text-destructive">{{ errors.vlink }}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div class="flex justify-end gap-2">
                    <Link href="/admin/zenner-club/contents">
                        <Button type="button" variant="outline">Batal</Button>
                    </Link>
                    <Button type="submit" :disabled="processing">
                        <Save class="mr-2 h-4 w-4" />
                        {{ processing ? 'Menyimpan...' : 'Simpan Konten' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
