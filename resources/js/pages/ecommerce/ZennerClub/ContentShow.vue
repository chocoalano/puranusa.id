<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Link2 } from 'lucide-vue-next';

interface CategoryInfo {
    id: number;
    name: string;
}

interface ContentItem {
    id: number;
    title: string;
    slug: string;
    content: string | null;
    file: string | null;
    vlink: string | null;
    created_at: string;
    category?: CategoryInfo | null;
}

const props = defineProps<{
    item: ContentItem;
    backUrl: string;
}>();

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

const formattedDate = computed(() => {
    return new Date(props.item.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
});
</script>

<template>
    <EcommerceLayout>
        <Head :title="item.title" />

        <div class="container mx-auto px-3 py-6 sm:px-4 sm:py-8 max-w-6xl space-y-6">
            <div class="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-4 sm:p-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div class="flex items-start gap-3">
                        <Link :href="backUrl">
                            <Button variant="outline" size="icon">
                                <ArrowLeft class="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 class="text-2xl font-semibold leading-tight sm:text-3xl">{{ item.title }}</h1>
                            <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="secondary">{{ item.category?.name || 'Zenner Club' }}</Badge>
                                <span class="text-muted-foreground/60">•</span>
                                <span>{{ formattedDate }}</span>
                                <span class="text-muted-foreground/60">•</span>
                                <span class="font-mono text-xs">{{ item.slug }}</span>
                            </div>
                        </div>
                    </div>
                    <Badge variant="outline">Materi</Badge>
                </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <Card>
                    <CardHeader>
                        <CardTitle class="text-base">Deskripsi</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div
                            class="prose prose-neutral max-w-none text-foreground [&_a]:text-primary [&_a]:underline [&_table]:w-full [&_img]:rounded-lg [&_img]:border"
                            v-html="item.content || '<p>-</p>'"
                        />
                    </CardContent>
                </Card>

                <div class="space-y-4 lg:sticky lg:top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-base">Lampiran</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="space-y-2">
                                <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Video Link</p>
                                <div v-if="item.vlink" class="flex items-center gap-2 text-sm">
                                    <Link2 class="h-4 w-4 text-muted-foreground" />
                                    <a :href="item.vlink" target="_blank" rel="noopener" class="text-primary hover:underline">
                                        {{ item.vlink }}
                                    </a>
                                </div>
                                <p v-else class="text-sm text-muted-foreground">-</p>
                            </div>

                            <div class="space-y-3">
                                <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">File Lampiran</p>
                                <div v-if="item.file" class="space-y-3">
                                    <div v-if="isPdfFile(item.file)" class="space-y-3">
                                        <iframe
                                            :src="getFileUrl(item.file) || ''"
                                            class="h-[320px] w-full rounded-md border"
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
                                            class="max-h-[320px] w-full rounded-md border object-contain"
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
                                <p v-else class="text-sm text-muted-foreground">-</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </EcommerceLayout>
</template>
