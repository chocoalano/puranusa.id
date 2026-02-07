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

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    created_at: string;
    parent?: { id: number; name: string } | null;
    contents_count?: number;
}

interface PaginatedCategories {
    data: CategoryItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    items: PaginatedCategories;
    filters: {
        search?: string | null;
        parent_id?: number | null;
        sort_by?: string | null;
        sort_order?: string | null;
        per_page?: number | null;
    };
}

const props = defineProps<Props>();
const { isSuperAdmin, isAdmin } = usePermissions();

const search = ref(props.filters.search || '');
const parentId = ref(props.filters.parent_id ? String(props.filters.parent_id) : '');
const sortBy = ref(props.filters.sort_by || 'name');
const sortOrder = ref(props.filters.sort_order || 'asc');

const applyFilters = () => {
    router.get('/admin/zenner-club/categories', {
        search: search.value || undefined,
        parent_id: parentId.value ? Number(parentId.value) : undefined,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
    }, {
        preserveScroll: true,
        preserveState: true,
    });
};

const clearFilters = () => {
    search.value = '';
    parentId.value = '';
    sortBy.value = 'name';
    sortOrder.value = 'asc';
    applyFilters();
};

const categoryToDelete = ref<number | null>(null);
const isDeleting = ref(false);

const deleteCategory = (id: number) => {
    categoryToDelete.value = id;
};

const confirmDelete = () => {
    if (!categoryToDelete.value) return;

    isDeleting.value = true;
    router.delete(`/admin/zenner-club/categories/${categoryToDelete.value}`, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Kategori berhasil dihapus');
            categoryToDelete.value = null;
        },
        onError: () => {
            toast.error('Gagal menghapus kategori');
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
    parent_id: parentId.value ? Number(parentId.value) : undefined,
    sort_by: sortBy.value,
    sort_order: sortOrder.value,
}));
</script>

<template>
    <Head title="Kategori Zenner Club" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Kategori Zenner Club</h1>
                    <p class="text-muted-foreground">Kelola kategori konten Zenner Club</p>
                </div>
                <Link v-if="isSuperAdmin || isAdmin" href="/admin/zenner-club/categories/create">
                    <Button>
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Kategori
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filter & Pencarian</CardTitle>
                    <CardDescription>Cari dan filter kategori</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col gap-4 lg:flex-row">
                        <div class="flex-1 relative">
                            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                v-model="search"
                                placeholder="Cari nama atau slug..."
                                class="pl-10"
                                @keyup.enter="applyFilters"
                            />
                        </div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3">
                            <Input
                                v-model="parentId"
                                type="number"
                                placeholder="Parent ID"
                            />
                            <Select v-model="sortBy" @update:model-value="applyFilters">
                                <SelectTrigger>
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Nama</SelectItem>
                                    <SelectItem value="created_at">Tanggal</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select v-model="sortOrder" @update:model-value="applyFilters">
                                <SelectTrigger>
                                    <SelectValue placeholder="Arah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">A-Z</SelectItem>
                                    <SelectItem value="desc">Z-A</SelectItem>
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
                                <TableHead>Nama</TableHead>
                                <TableHead>Parent</TableHead>
                                <TableHead>Konten</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead class="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-if="items.data.length === 0">
                                <TableCell colspan="5" class="text-center text-muted-foreground py-8">
                                    Belum ada kategori.
                                </TableCell>
                            </TableRow>
                            <TableRow v-for="item in items.data" :key="item.id">
                                <TableCell>
                                    <div>
                                        <p class="font-medium">{{ item.name }}</p>
                                        <p class="text-sm text-muted-foreground">{{ item.slug }}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {{ item.parent?.name || '-' }}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{{ item.contents_count || 0 }} konten</Badge>
                                </TableCell>
                                <TableCell class="text-sm text-muted-foreground">
                                    {{ formatDate(item.created_at) }}
                                </TableCell>
                                <TableCell class="text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link :href="`/admin/zenner-club/categories/${item.id}`">
                                            <Button variant="ghost" size="icon">
                                                <Eye class="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link v-if="isSuperAdmin || isAdmin" :href="`/admin/zenner-club/categories/${item.id}/edit`">
                                            <Button variant="ghost" size="icon">
                                                <Pencil class="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            v-if="isSuperAdmin || isAdmin"
                                            variant="ghost"
                                            size="icon"
                                            @click="deleteCategory(item.id)"
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
                url="/admin/zenner-club/categories"
                :filters="paginationFilters"
            />
        </div>

        <AlertDialog :open="categoryToDelete !== null" @update:open="categoryToDelete = null">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Kategori akan dihapus permanen. Pastikan tidak ada sub-kategori atau konten terkait.
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
