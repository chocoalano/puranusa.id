<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Pencil } from 'lucide-vue-next';
import { usePermissions } from '@/composables/usePermissions';

interface CategoryInfo {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    parent?: {
        id: number;
        name: string;
        slug: string | null;
    } | null;
}

interface ContentItem {
    id: number;
    title: string;
    slug: string;
    status: string | null;
    content: string | null;
    file: string | null;
    vlink: string | null;
    created_at: string;
    category?: {
        id: number;
        name: string;
    } | null;
    creator?: {
        id: number;
        name: string;
    } | null;
}

interface Props {
    category: CategoryInfo;
    contents: ContentItem[];
}

const props = defineProps<Props>();
const { isSuperAdmin, isAdmin } = usePermissions();

const totalContents = computed(() => props.contents.length);

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const getFileUrl = (file: string | null) => {
    if (!file) return null;
    if (file.startsWith('http')) return file;
    return `/storage/${file}`;
};

const getFileExtension = (file: string | null) => {
    if (!file) return '';
    const clean = file.split('?')[0].split('#')[0];
    return clean.split('.').pop()?.toLowerCase() ?? '';
};

const isImageFile = (file: string | null) => {
    const ext = getFileExtension(file);
    return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext);
};

const isVideoFile = (file: string | null) => {
    const ext = getFileExtension(file);
    return ['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(ext);
};

const isPdfFile = (file: string | null) => getFileExtension(file) === 'pdf';

const isDocumentFile = (file: string | null) => {
    const ext = getFileExtension(file);
    return ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'].includes(ext);
};
</script>

<template>
    <Head :title="`Zenner Club - ${category.name}`" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <Link href="/admin/zenner-club/categories">
                        <Button variant="outline" size="icon">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold">{{ category.name }}</h1>
                        <p class="text-muted-foreground">Detail kategori Zenner Club</p>
                    </div>
                </div>
                <Link v-if="isSuperAdmin || isAdmin" :href="`/admin/zenner-club/categories/${category.id}/edit`">
                    <Button>
                        <Pencil class="mr-2 h-4 w-4" />
                        Edit Kategori
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{{ category.name }}</CardTitle>
                    <CardDescription>{{ category.slug }}</CardDescription>
                </CardHeader>
                <CardContent class="flex flex-wrap gap-3">
                    <Badge variant="outline">
                        {{ category.parent?.name || 'Tanpa Parent' }}
                    </Badge>
                    <Badge variant="outline">
                        Total Konten: {{ totalContents }}
                    </Badge>
                </CardContent>
            </Card>

            <div class="space-y-4">
                <div>
                    <h2 class="text-xl font-semibold">Konten</h2>
                    <p class="text-muted-foreground">Menampilkan data lengkap berdasarkan kategori ini.</p>
                </div>

                <Card v-if="!contents.length">
                    <CardContent class="py-6 text-sm text-muted-foreground">
                        Belum ada konten untuk kategori ini.
                    </CardContent>
                </Card>

                <Card v-for="item in contents" :key="item.id">
                    <CardHeader class="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <CardTitle>{{ item.title }}</CardTitle>
                            <CardDescription>{{ item.slug }}</CardDescription>
                        </div>
                        <Link v-if="isSuperAdmin || isAdmin" :href="`/admin/zenner-club/contents/${item.id}/edit`">
                            <Button size="sm">
                                <Pencil class="mr-2 h-4 w-4" />
                                Edit Konten
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex flex-wrap gap-3">
                            <Badge v-if="item.status === 'published'" variant="default">Published</Badge>
                            <Badge v-else-if="item.status === 'draft'" variant="secondary">Draft</Badge>
                            <Badge v-else variant="outline">{{ item.status || 'Draft' }}</Badge>
                            <Badge variant="outline">Dibuat {{ formatDate(item.created_at) }}</Badge>
                            <Badge v-if="item.creator?.name" variant="outline">Oleh {{ item.creator.name }}</Badge>
                        </div>

                        <div class="space-y-2">
                            <p class="text-sm text-muted-foreground">Video Link</p>
                            <p v-if="item.vlink" class="text-sm">
                                <a :href="item.vlink" target="_blank" class="text-primary underline">
                                    {{ item.vlink }}
                                </a>
                            </p>
                            <p v-else class="text-sm text-muted-foreground">-</p>
                        </div>

                        <div class="space-y-2" v-if="item.file">
                            <p class="text-sm text-muted-foreground">File Lampiran</p>
                            <div v-if="isPdfFile(item.file)" class="space-y-3">
                                <iframe
                                    :src="getFileUrl(item.file) || ''"
                                    class="h-[420px] w-full rounded-md border"
                                    title="PDF Viewer"
                                />
                                <a :href="getFileUrl(item.file) || ''" class="text-sm text-primary underline" download>
                                    Download PDF
                                </a>
                            </div>
                            <div v-else-if="isVideoFile(item.file)" class="space-y-2">
                                <video
                                    :src="getFileUrl(item.file) || ''"
                                    class="w-full rounded-md border"
                                    autoplay
                                    muted
                                    playsinline
                                    controls
                                />
                                <a :href="getFileUrl(item.file) || ''" class="text-sm text-primary underline" download>
                                    Download Video
                                </a>
                            </div>
                            <div v-else-if="isImageFile(item.file)" class="space-y-2">
                                <img
                                    :src="getFileUrl(item.file) || ''"
                                    alt="Lampiran"
                                    class="max-h-[480px] w-full rounded-md border object-contain"
                                />
                                <a :href="getFileUrl(item.file) || ''" class="text-sm text-primary underline" download>
                                    Download Gambar
                                </a>
                            </div>
                            <div v-else-if="isDocumentFile(item.file)" class="space-y-2">
                                <a :href="getFileUrl(item.file) || ''" class="text-sm text-primary underline" download>
                                    Download Dokumen
                                </a>
                            </div>
                            <div v-else class="space-y-2">
                                <a :href="getFileUrl(item.file) || ''" class="text-sm text-primary underline" download>
                                    Download File
                                </a>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <p class="text-sm text-muted-foreground">Deskripsi</p>
                            <div class="prose max-w-none" v-html="item.content || '<p>-</p>'" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
