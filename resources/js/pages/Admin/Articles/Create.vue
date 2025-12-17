<script setup lang="ts">
import { ref, watch, defineAsyncComponent, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load PageBuilder to avoid SSR issues with Monaco/Tiptap editors
const PageBuilder = defineAsyncComponent({
    loader: () => import('@/components/admin/PageBuilder.vue'),
    loadingComponent: {
        template: '<div class="space-y-4"><Skeleton class="h-12 w-full" /><Skeleton class="h-64 w-full" /><Skeleton class="h-12 w-full" /></div>',
        components: { Skeleton },
    },
});
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Send, X } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface Block {
    id: string;
    type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code' | 'video' | 'divider';
    content: any;
}

const form = ref({
    title: '',
    slug: '',
    seo_title: '',
    seo_description: '',
    content: '',
    blocks: [] as Block[],
    tags: [] as string[],
    is_published: false,
    published_at: '',
});

const submitFormHelper = useForm({});
const errors = computed(() => submitFormHelper.errors);
const processing = computed(() => submitFormHelper.processing);
const tagInput = ref('');

const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

// Generate slug from title on input
const generateSlug = () => {
    form.value.slug = slugify(form.value.title);
};

// Watch blocks and convert to HTML/JSON for storage
watch(() => form.value.blocks, (newBlocks) => {
    form.value.content = JSON.stringify(newBlocks);
}, { deep: true });

const addTag = () => {
    const tag = tagInput.value.trim();
    if (tag && !form.value.tags.includes(tag)) {
        form.value.tags.push(tag);
        tagInput.value = '';
    }
};

const removeTag = (index: number) => {
    form.value.tags.splice(index, 1);
};

const submitForm = (publish: boolean = false) => {
    // Ensure content is up-to-date from blocks before submitting
    const contentToSave = JSON.stringify(form.value.blocks);

    const data = {
        title: form.value.title,
        slug: form.value.slug,
        seo_title: form.value.seo_title,
        seo_description: form.value.seo_description,
        content: contentToSave,
        tags: form.value.tags,
        is_published: publish,
        published_at: publish && !form.value.published_at ? new Date().toISOString() : form.value.published_at,
    };

    submitFormHelper
        .transform(() => data)
        .post('/admin/articles', {
            onSuccess: () => {
                toast.success(publish ? 'Artikel berhasil diterbitkan' : 'Artikel berhasil disimpan sebagai draft');
            },
            onError: () => {
                toast.error('Terjadi kesalahan, periksa form Anda');
            },
        });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Button variant="ghost" size="icon" as-child>
                        <a href="/admin/articles">
                            <ArrowLeft class="h-4 w-4" />
                        </a>
                    </Button>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Buat Artikel Baru</h1>
                        <p class="text-muted-foreground">
                            Tambahkan konten artikel baru ke blog
                        </p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Button
                        variant="outline"
                        :disabled="processing"
                        @click="submitForm(false)"
                    >
                        <Save class="mr-2 h-4 w-4" />
                        Simpan Draft
                    </Button>
                    <Button
                        :disabled="processing"
                        @click="submitForm(true)"
                    >
                        <Send class="mr-2 h-4 w-4" />
                        Terbitkan
                    </Button>
                </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-3">
                <div class="lg:col-span-2 space-y-6">
                    <!-- Basic Information -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                            <CardDescription>Detail utama artikel</CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="space-y-2">
                                <Label for="title">Judul Artikel</Label>
                                <Input
                                    id="title"
                                    v-model="form.title"
                                    placeholder="Masukkan judul artikel"
                                    :class="{ 'border-destructive': errors.title }"
                                    @input="generateSlug"
                                />
                                <p v-if="errors.title" class="text-sm text-destructive">
                                    {{ errors.title }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="slug">Slug (URL)</Label>
                                <Input
                                    id="slug"
                                    v-model="form.slug"
                                    placeholder="slug-artikel"
                                    :class="{ 'border-destructive': errors.slug }"
                                />
                                <p v-if="errors.slug" class="text-sm text-destructive">
                                    {{ errors.slug }}
                                </p>
                                <p class="text-sm text-muted-foreground">
                                    URL: /articles/{{ form.slug || 'slug-artikel' }}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Content -->
                    <PageBuilder v-model="form.blocks" />

                    <!-- SEO -->
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO</CardTitle>
                            <CardDescription>Optimasi mesin pencari</CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="space-y-2">
                                <Label for="seo_title">Judul SEO</Label>
                                <Input
                                    id="seo_title"
                                    v-model="form.seo_title"
                                    placeholder="Judul untuk mesin pencari"
                                    :class="{ 'border-destructive': errors.seo_title }"
                                />
                                <p v-if="errors.seo_title" class="text-sm text-destructive">
                                    {{ errors.seo_title }}
                                </p>
                                <p class="text-sm text-muted-foreground">
                                    {{ form.seo_title.length }}/255 karakter
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="seo_description">Deskripsi SEO</Label>
                                <Textarea
                                    id="seo_description"
                                    v-model="form.seo_description"
                                    placeholder="Deskripsi singkat untuk mesin pencari"
                                    rows="3"
                                    :class="{ 'border-destructive': errors.seo_description }"
                                />
                                <p v-if="errors.seo_description" class="text-sm text-destructive">
                                    {{ errors.seo_description }}
                                </p>
                                <p class="text-sm text-muted-foreground">
                                    {{ form.seo_description.length }}/500 karakter
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div class="space-y-6">
                    <!-- Publishing -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Publikasi</CardTitle>
                            <CardDescription>Atur tanggal publikasi</CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="flex items-center space-x-2">
                                <Checkbox
                                    id="is_published"
                                    :checked="form.is_published"
                                    @update:checked="(checked: boolean) => form.is_published = checked"
                                />
                                <Label for="is_published" class="cursor-pointer">
                                    Terbitkan artikel
                                </Label>
                            </div>

                            <div v-if="form.is_published" class="space-y-2">
                                <Label for="published_at">Tanggal Terbit</Label>
                                <Input
                                    id="published_at"
                                    v-model="form.published_at"
                                    type="datetime-local"
                                    :class="{ 'border-destructive': errors.published_at }"
                                />
                                <p v-if="errors.published_at" class="text-sm text-destructive">
                                    {{ errors.published_at }}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Tags -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Tag</CardTitle>
                            <CardDescription>Tambahkan tag untuk artikel</CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="flex gap-2">
                                <Input
                                    v-model="tagInput"
                                    placeholder="Tambah tag"
                                    @keyup.enter="addTag"
                                />
                                <Button type="button" size="sm" @click="addTag">
                                    Tambah
                                </Button>
                            </div>

                            <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2">
                                <Badge
                                    v-for="(tag, index) in form.tags"
                                    :key="index"
                                    variant="secondary"
                                    class="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                                    @click="removeTag(index)"
                                >
                                    {{ tag }}
                                    <X class="ml-1 h-3 w-3" />
                                </Badge>
                            </div>
                            <p v-else class="text-sm text-muted-foreground">
                                Belum ada tag
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
