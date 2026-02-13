<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, FileText, MoreVertical, Pencil, Plus, Search, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { usePermissions } from '@/composables/usePermissions';
import { toast } from 'vue-sonner';

interface Page {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    template: string;
    order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    pages: {
        data: Page[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    filters: {
        search?: string;
        status?: string;
        sort?: string;
        direction?: string;
    };
}
const { isSuperAdmin, isAdmin } = usePermissions()
const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');
const selectedStatus = ref(props.filters.status || 'all');

const performSearch = () => {
    router.get('/admin/pages', {
        search: searchQuery.value || undefined,
        status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const clearFilters = () => {
    searchQuery.value = '';
    selectedStatus.value = 'all';
    router.get('/admin/pages');
};

const extractErrorMessage = (errors: Record<string, string | string[]>) => {
    const firstError = Object.values(errors)[0];
    if (typeof firstError === 'string') {
        return firstError;
    }
    if (Array.isArray(firstError) && typeof firstError[0] === 'string') {
        return firstError[0];
    }
    return 'Gagal menghapus halaman. Silakan coba lagi.';
};

const deletePage = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus halaman ini?')) {
        router.delete(`/admin/pages/${id}`, {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = (page.props as any).flash;
                if (flash?.error) {
                    toast.error(flash.error);
                    return;
                }

                toast.success(flash?.success || 'Halaman berhasil dihapus.');
            },
            onError: (submitErrors) => {
                toast.error(extractErrorMessage(submitErrors as Record<string, string | string[]>));
            },
        });
    }
};

const hasActiveFilters = computed(() => {
    return !!searchQuery.value || selectedStatus.value !== 'all';
});

const getTemplateLabel = (template: string) => {
    const templates: Record<string, string> = {
        'default': 'Default',
        'full-width': 'Full Width',
        'narrow': 'Narrow',
    };
    return templates[template] || template;
};
</script>

<template>

    <Head title="Kelola Halaman" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Kelola Halaman</h1>
                    <p class="text-muted-foreground mt-1">
                        Kelola semua halaman statis di website Anda
                    </p>
                </div>
                <Link href="/admin/pages/create" v-if="isSuperAdmin || isAdmin">
                    <Button v-if="isSuperAdmin || isAdmin">
                        <Plus class="h-4 w-4 mr-2" />
                        Tambah Halaman
                    </Button>
                </Link>
            </div>

            <!-- Filters -->
            <Card>
                <CardHeader>
                    <CardTitle>Filter & Pencarian</CardTitle>
                    <CardDescription>Cari dan filter halaman</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex-1 relative">
                            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input v-model="searchQuery" placeholder="Cari berdasarkan judul atau slug..." class="pl-10"
                                @keydown.enter="performSearch" />
                        </div>
                        <Select v-model="selectedStatus" @update:model-value="performSearch">
                            <SelectTrigger class="w-full md:w-[200px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button @click="performSearch">Cari</Button>
                        <Button v-if="hasActiveFilters" @click="clearFilters" variant="outline">
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Pages Table -->
            <Card>
                <CardContent class="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Template</TableHead>
                                <TableHead>Urutan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tanggal Dibuat</TableHead>
                                <TableHead class="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-if="pages.data.length === 0">
                                <TableCell colspan="7" class="text-center py-8 text-muted-foreground">
                                    <FileText class="h-12 w-12 mx-auto mb-2 opacity-20" />
                                    <p>Belum ada halaman</p>
                                </TableCell>
                            </TableRow>
                            <TableRow v-for="page in pages.data" :key="page.id">
                                <TableCell class="font-medium">
                                    {{ page.title }}
                                </TableCell>
                                <TableCell>
                                    <code class="text-xs bg-muted px-2 py-1 rounded">{{ page.slug }}</code>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{{ getTemplateLabel(page.template) }}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{{ page.order }}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge v-if="page.is_published" variant="default">
                                        Published
                                    </Badge>
                                    <Badge v-else variant="secondary">
                                        Draft
                                    </Badge>
                                </TableCell>
                                <TableCell class="text-sm text-muted-foreground">
                                    {{ new Date(page.created_at).toLocaleDateString('id-ID') }}
                                </TableCell>
                                <TableCell class="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger as-child>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical class="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Link :href="`/page/${page.slug}`" target="_blank"
                                                v-if="isSuperAdmin || isAdmin">
                                                <DropdownMenuItem>
                                                    <Eye class="h-4 w-4 mr-2" />
                                                    Lihat
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link :href="`/admin/pages/${page.id}/edit`">
                                                <DropdownMenuItem>
                                                    <Pencil class="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem @click="deletePage(page.id)"
                                                class="text-destructive focus:text-destructive"
                                                v-if="isSuperAdmin || isAdmin">
                                                <Trash2 class="h-4 w-4 mr-2" />
                                                Hapus
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <!-- Pagination -->
            <div v-if="pages.last_page > 1" class="flex justify-center">
                <nav class="flex items-center gap-2">
                    <template v-for="(link, index) in pages.links" :key="index">
                        <Button :variant="link.active ? 'default' : 'outline'" :disabled="!link.url" size="sm"
                            @click="link.url && router.visit(link.url)">
                            <span v-html="link.label"></span>
                        </Button>
                    </template>
                </nav>
            </div>
        </div>
    </AppLayout>
</template>
