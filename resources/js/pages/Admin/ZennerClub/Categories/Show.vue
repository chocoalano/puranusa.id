<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Pencil } from 'lucide-vue-next';
import { usePermissions } from '@/composables/usePermissions';

interface ContentItem {
    id: number;
    title: string;
    slug: string;
}

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    parent?: { id: number; name: string } | null;
    children?: CategoryItem[];
    contents?: ContentItem[];
    created_at?: string;
}

interface Props {
    item: CategoryItem;
}

const props = defineProps<Props>();
const { isSuperAdmin, isAdmin } = usePermissions();

const childrenCount = computed(() => props.item.children?.length || 0);
const contentsCount = computed(() => props.item.contents?.length || 0);
</script>

<template>
    <Head :title="item.name" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Link href="/admin/zenner-club/categories">
                        <Button variant="outline" size="icon">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold">Detail Kategori</h1>
                        <p class="text-muted-foreground">Informasi kategori Zenner Club</p>
                    </div>
                </div>
                <Link v-if="isSuperAdmin || isAdmin" :href="`/admin/zenner-club/categories/${item.id}/edit`">
                    <Button>
                        <Pencil class="mr-2 h-4 w-4" />
                        Edit Kategori
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{{ item.name }}</CardTitle>
                    <CardDescription>{{ item.slug }}</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="flex flex-wrap gap-3">
                        <Badge variant="outline">Parent: {{ item.parent?.name || 'Tidak ada' }}</Badge>
                        <Badge variant="outline">Sub-kategori: {{ childrenCount }}</Badge>
                        <Badge variant="outline">Konten: {{ contentsCount }}</Badge>
                    </div>

                    <div class="space-y-2">
                        <p class="text-sm text-muted-foreground">Sub-kategori</p>
                        <div v-if="childrenCount" class="flex flex-wrap gap-2">
                            <Badge v-for="child in item.children" :key="child.id" variant="secondary">
                                {{ child.name }}
                            </Badge>
                        </div>
                        <p v-else class="text-sm text-muted-foreground">-</p>
                    </div>

                    <div class="space-y-2">
                        <p class="text-sm text-muted-foreground">Konten</p>
                        <div v-if="contentsCount" class="flex flex-col gap-2">
                            <div
                                v-for="content in item.contents"
                                :key="content.id"
                                class="rounded-md border border-border px-3 py-2 text-sm"
                            >
                                <p class="font-medium">{{ content.title }}</p>
                                <p class="text-xs text-muted-foreground">{{ content.slug }}</p>
                            </div>
                        </div>
                        <p v-else class="text-sm text-muted-foreground">-</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
