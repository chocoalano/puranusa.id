<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Switch from '@/components/ui/switch/Switch.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import PageBuilder from '@/components/admin/PageBuilder.vue';
import { ArrowLeft, Save } from 'lucide-vue-next';
import { ref, watch, computed } from 'vue';

interface Page {
    id: number;
    title: string;
    slug: string;
    blocks: any[] | null;
    seo_title: string | null;
    seo_description: string | null;
    is_published: boolean;
    template: string;
    order: number;
}

interface Props {
    page: Page;
}

const props = defineProps<Props>();

const form = ref({
    title: props.page.title,
    slug: props.page.slug,
    blocks: props.page.blocks || [],
    seo_title: props.page.seo_title || '',
    seo_description: props.page.seo_description || '',
    is_published: props.page.is_published,
    template: props.page.template,
    order: props.page.order,
});

const submitForm = useForm({});
const processing = computed(() => submitForm.processing);
const errors = computed(() => submitForm.errors);

// Watch for changes in props.page.blocks and reload
watch(() => props.page.blocks, (newBlocks) => {
    if (newBlocks) {
        form.value.blocks = JSON.parse(JSON.stringify(newBlocks));
    }
}, { immediate: true });

const handleSubmit = () => {
    const data = {
        ...form.value,
        blocks: JSON.stringify(form.value.blocks),
        _method: 'PUT',
    };

    submitForm
        .transform(() => data)
        .post(`/admin/pages/${props.page.id}`, {
            preserveScroll: true,
        });
};
</script>

<template>
    <Head :title="`Edit: ${page.title}`" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Link href="/admin/pages">
                        <Button variant="outline" size="icon">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Edit Halaman</h1>
                        <p class="text-muted-foreground mt-1">
                            {{ page.title }}
                        </p>
                    </div>
                </div>
                <Button @click="handleSubmit" :disabled="processing">
                    <Save class="h-4 w-4 mr-2" />
                    Simpan Perubahan
                </Button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Basic Information -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Dasar</CardTitle>
                        <CardDescription>Informasi utama halaman</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label for="title">Judul Halaman *</Label>
                            <Input
                                id="title"
                                v-model="form.title"
                                placeholder="Contoh: Tentang Kami, Kebijakan Privasi"
                                :class="{ 'border-destructive': errors.title }"
                            />
                            <p v-if="errors.title" class="text-sm text-destructive">
                                {{ errors.title }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="slug">Slug *</Label>
                            <Input
                                id="slug"
                                v-model="form.slug"
                                placeholder="tentang-kami"
                                :class="{ 'border-destructive': errors.slug }"
                            />
                            <p class="text-xs text-muted-foreground">
                                URL: /page/<span class="font-medium">{{ form.slug }}</span>
                            </p>
                            <p v-if="errors.slug" class="text-sm text-destructive">
                                {{ errors.slug }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label>Konten Halaman</Label>
                            <PageBuilder v-model="form.blocks" />
                            <p class="text-xs text-muted-foreground">
                                Gunakan PageBuilder untuk membuat konten dengan berbagai jenis block
                            </p>
                            <p v-if="errors.blocks" class="text-sm text-destructive">
                                {{ errors.blocks }}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Settings -->
                <Card>
                    <CardHeader>
                        <CardTitle>Pengaturan</CardTitle>
                        <CardDescription>Konfigurasi tampilan dan urutan</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label for="template">Template</Label>
                            <Select v-model="form.template">
                                <SelectTrigger id="template">
                                    <SelectValue placeholder="Pilih template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="full-width">Full Width</SelectItem>
                                    <SelectItem value="narrow">Narrow</SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="errors.template" class="text-sm text-destructive">
                                {{ errors.template }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="order">Urutan</Label>
                            <Input
                                id="order"
                                v-model.number="form.order"
                                type="number"
                                min="0"
                                :class="{ 'border-destructive': errors.order }"
                            />
                            <p class="text-xs text-muted-foreground">
                                Semakin kecil angka, semakin tinggi prioritasnya
                            </p>
                            <p v-if="errors.order" class="text-sm text-destructive">
                                {{ errors.order }}
                            </p>
                        </div>

                        <div class="flex items-center justify-between space-x-2">
                            <div class="space-y-0.5">
                                <Label for="is_published">Status Publikasi</Label>
                                <p class="text-xs text-muted-foreground">
                                    Publikasikan halaman ini ke website
                                </p>
                            </div>
                            <Switch
                                id="is_published"
                                v-model:checked="form.is_published"
                            />
                        </div>
                    </CardContent>
                </Card>

                <!-- SEO -->
                <Card>
                    <CardHeader>
                        <CardTitle>SEO</CardTitle>
                        <CardDescription>Optimasi untuk mesin pencari</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label for="seo_title">SEO Title</Label>
                            <Input
                                id="seo_title"
                                v-model="form.seo_title"
                                placeholder="Judul untuk Google (kosongkan untuk menggunakan judul halaman)"
                                :class="{ 'border-destructive': errors.seo_title }"
                            />
                            <p v-if="errors.seo_title" class="text-sm text-destructive">
                                {{ errors.seo_title }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="seo_description">SEO Description</Label>
                            <Input
                                id="seo_description"
                                v-model="form.seo_description"
                                placeholder="Deskripsi singkat untuk hasil pencarian (150-160 karakter)"
                                :class="{ 'border-destructive': errors.seo_description }"
                            />
                            <p class="text-xs text-muted-foreground">
                                {{ form.seo_description?.length || 0 }}/160 karakter
                            </p>
                            <p v-if="errors.seo_description" class="text-sm text-destructive">
                                {{ errors.seo_description }}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Submit Button -->
                <div class="flex justify-end gap-4">
                    <Link href="/admin/pages">
                        <Button type="button" variant="outline">
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" :disabled="processing">
                        <Save class="h-4 w-4 mr-2" />
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
