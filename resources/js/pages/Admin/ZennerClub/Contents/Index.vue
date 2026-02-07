<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Pagination from '@/components/Pagination.vue';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-vue-next';
import { usePermissions } from '@/composables/usePermissions';
import { toast } from 'vue-sonner';

interface Category {
    id: number;
    name: string;
    parent_id: number | null;
}

interface UserInfo {
    id: number;
    name: string;
}

interface ContentItem {
    id: number;
    title: string;
    slug: string;
    status: string | null;
    created_at: string;
    category_id: number | null;
    category?: Category | null;
    creator?: UserInfo | null;
}

interface PaginatedContents {
    data: ContentItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    items: PaginatedContents;
    categories: Category[];
    filters: {
        search?: string | null;
        status?: string | null;
        category_id?: number | null;
        sort_by?: string | null;
        sort_order?: string | null;
        per_page?: number | null;
    };
}

const props = defineProps<Props>();
const { isSuperAdmin, isAdmin } = usePermissions();

const search = ref(props.filters.search || '');
const status = ref(props.filters.status || 'all');
const category = ref(props.filters.category_id ? String(props.filters.category_id) : 'all');
const sortBy = ref(props.filters.sort_by || 'created_at');
const sortOrder = ref(props.filters.sort_order || 'desc');

const categoryMap = computed(() => {
    return new Map(props.categories.map((item) => [item.id, item]));
});

const formatCategoryName = (item?: Category | null) => {
    if (!item) return '-';
    const parent = item.parent_id ? categoryMap.value.get(item.parent_id) : null;
    return parent ? `${parent.name} / ${item.name}` : item.name;
};

const applyFilters = () => {
    router.get('/admin/zenner-club/contents', {
        search: search.value || undefined,
        status: status.value !== 'all' ? status.value : undefined,
        category_id: category.value !== 'all' ? Number(category.value) : undefined,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
    }, {
        preserveScroll: true,
        preserveState: true,
    });
};

const clearFilters = () => {
    search.value = '';
    status.value = 'all';
    category.value = 'all';
    sortBy.value = 'created_at';
    sortOrder.value = 'desc';
    applyFilters();
};

const contentToDelete = ref<number | null>(null);
const isDeleting = ref(false);

const deleteContent = (id: number) => {
    contentToDelete.value = id;
};

const confirmDelete = () => {
    if (!contentToDelete.value) return;

    isDeleting.value = true;
    router.delete(`/admin/zenner-club/contents/${contentToDelete.value}`, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Konten berhasil dihapus');
            contentToDelete.value = null;
        },
        onError: () => {
            toast.error('Gagal menghapus konten');
        },
        onFinish: () => {
            isDeleting.value = false;
        },
    });
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const paginationFilters = computed(() => ({
    search: search.value || undefined,
    status: status.value !== 'all' ? status.value : undefined,
    category_id: category.value !== 'all' ? Number(category.value) : undefined,
    sort_by: sortBy.value,
    sort_order: sortOrder.value,
}));
</script>

<template>
    <Head title="Konten Zenner Club" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Konten Zenner Club</h1>
                    <p class="text-muted-foreground">
                        Kelola konten untuk halaman Zenner Club
                    </p>
                </div>
                <Link v-if="isSuperAdmin || isAdmin" href="/admin/zenner-club/contents/create">
                    <Button>
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Konten
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filter & Pencarian</CardTitle>
                    <CardDescription>Cari dan filter konten</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col gap-4 lg:flex-row">
                        <div class="flex-1 relative">
                            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                v-model="search"
                                placeholder="Cari judul atau slug..."
                                class="pl-10"
                                @keyup.enter="applyFilters"
                            />
                        </div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <Select v-model="category" @update:model-value="applyFilters">
                                <SelectTrigger>
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Kategori</SelectItem>
                                    <SelectItem
                                        v-for="item in categories"
                                        :key="item.id"
                                        :value="String(item.id)"
                                    >
                                        {{ formatCategoryName(item) }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select v-model="status" @update:model-value="applyFilters">
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select v-model="sortBy" @update:model-value="applyFilters">
                                <SelectTrigger>
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="created_at">Tanggal</SelectItem>
                                    <SelectItem value="title">Judul</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select v-model="sortOrder" @update:model-value="applyFilters">
                                <SelectTrigger>
                                    <SelectValue placeholder="Arah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="desc">Terbaru</SelectItem>
                                    <SelectItem value="asc">Terlama</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="flex gap-2">
                            <Button @click="applyFilters">Cari</Button>
                            <Button variant="outline" @click="clearFilters">Reset</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent class="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead class="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-if="items.data.length === 0">
                                <TableCell colspan="5" class="text-center text-muted-foreground py-8">
                                    Belum ada konten.
                                </TableCell>
                            </TableRow>
                            <TableRow v-for="item in items.data" :key="item.id">
                                <TableCell>
                                    <div>
                                        <p class="font-medium">{{ item.title }}</p>
                                        <p class="text-sm text-muted-foreground">{{ item.slug }}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {{ formatCategoryName(item.category) }}
                                </TableCell>
                                <TableCell>
                                    <Badge v-if="item.status === 'published'" variant="default">Published</Badge>
                                    <Badge v-else-if="item.status === 'draft'" variant="secondary">Draft</Badge>
                                    <Badge v-else variant="outline">{{ item.status || 'Draft' }}</Badge>
                                </TableCell>
                                <TableCell class="text-sm text-muted-foreground">
                                    {{ formatDate(item.created_at) }}
                                </TableCell>
                                <TableCell class="text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link :href="`/admin/zenner-club/contents/${item.id}`">
                                            <Button variant="ghost" size="icon">
                                                <Eye class="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link v-if="isSuperAdmin || isAdmin" :href="`/admin/zenner-club/contents/${item.id}/edit`">
                                            <Button variant="ghost" size="icon">
                                                <Pencil class="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            v-if="isSuperAdmin || isAdmin"
                                            variant="ghost"
                                            size="icon"
                                            @click="deleteContent(item.id)"
                                        >
                                            <Trash2 class="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Pagination
                v-if="items.last_page > 1"
                :data="items"
                url="/admin/zenner-club/contents"
                :filters="paginationFilters"
            />
        </div>

        <AlertDialog :open="contentToDelete !== null" @update:open="contentToDelete = null">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Konten?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Konten akan dihapus permanen. Apakah Anda yakin ingin melanjutkan?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction :disabled="isDeleting" @click="confirmDelete">
                        {{ isDeleting ? 'Menghapus...' : 'Hapus' }}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </AppLayout>
</template>
