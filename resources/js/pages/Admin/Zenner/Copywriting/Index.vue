<script setup lang="ts">
import { ref } from 'vue';
import { router, useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search, Pencil, Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import type { PaginatedData, ZennerFilters, Copywriting } from '@/types/zenner';

interface Props {
    items: PaginatedData<Copywriting>;
    filters: ZennerFilters;
}

const props = defineProps<Props>();

const search = ref(props.filters.search || '');
const status = ref(props.filters.status || 'all');
const category = ref((props.filters.category as string) || '');
const perPage = ref(props.filters.per_page);

const itemToDelete = ref<number | null>(null);
const isDeleting = ref(false);

const applyFilters = () => {
    router.get('/admin/zenner/copywritings', {
        search: search.value || undefined,
        status: status.value !== 'all' ? status.value : undefined,
        category: category.value || undefined,
        per_page: perPage.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const deleteItem = (id: number) => {
    itemToDelete.value = id;
};

const confirmDelete = () => {
    if (!itemToDelete.value) return;
    isDeleting.value = true;
    useForm({}).delete(`/admin/zenner/copywritings/${itemToDelete.value}`, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Copywriting berhasil dihapus');
            itemToDelete.value = null;
        },
        onError: () => {
            toast.error('Gagal menghapus data');
        },
        onFinish: () => {
            isDeleting.value = false;
        },
    });
};

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const goToPage = (page: number) => {
    router.get('/admin/zenner/copywritings', {
        page,
        search: search.value || undefined,
        status: status.value !== 'all' ? status.value : undefined,
        category: category.value || undefined,
        per_page: perPage.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Copywriting</h1>
                    <p class="text-muted-foreground">Kelola copywriting Zenner Club</p>
                </div>
                <Button as-child>
                    <Link href="/admin/zenner/copywritings/create">
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Copywriting
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex-1">
                            <div class="relative">
                                <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input v-model="search" placeholder="Cari copywriting..." class="pl-10" @keyup.enter="applyFilters" />
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <Input v-model="category" placeholder="Kategori" class="w-[140px]" @keyup.enter="applyFilters" />
                            <Select v-model="status" @update:model-value="applyFilters">
                                <SelectTrigger class="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua</SelectItem>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Nonaktif</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select v-model="perPage" @update:model-value="applyFilters">
                                <SelectTrigger class="w-[100px]">
                                    <SelectValue placeholder="Per halaman" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table v-if="items.data.length > 0">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead class="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="item in items.data" :key="item.id">
                                <TableCell>
                                    <p class="font-medium">{{ item.title }}</p>
                                </TableCell>
                                <TableCell>{{ item.category || '-' }}</TableCell>
                                <TableCell>
                                    <Badge v-if="item.is_active" variant="default">Aktif</Badge>
                                    <Badge v-else variant="secondary">Nonaktif</Badge>
                                </TableCell>
                                <TableCell>{{ formatDate(item.created_at) }}</TableCell>
                                <TableCell class="text-right">
                                    <div class="flex justify-end gap-2">
                                        <Button as-child variant="ghost" size="icon">
                                            <Link :href="`/admin/zenner/copywritings/${item.id}/edit`">
                                                <Pencil class="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" @click="deleteItem(item.id)">
                                            <Trash2 class="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div v-else class="py-12 text-center">
                        <p class="text-muted-foreground">Tidak ada data ditemukan</p>
                    </div>

                    <div v-if="items.last_page > 1" class="mt-6 flex items-center justify-between">
                        <p class="text-sm text-muted-foreground">
                            Menampilkan {{ items.from }} - {{ items.to }} dari {{ items.total }} data
                        </p>
                        <div class="flex gap-2">
                            <Button variant="outline" size="sm" :disabled="items.current_page === 1" @click="goToPage(items.current_page - 1)">
                                Sebelumnya
                            </Button>
                            <Button variant="outline" size="sm" :disabled="items.current_page === items.last_page" @click="goToPage(items.current_page + 1)">
                                Selanjutnya
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <AlertDialog :open="itemToDelete !== null" @update:open="itemToDelete = null">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Copywriting?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Data akan dihapus secara permanen. Apakah Anda yakin ingin melanjutkan?
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
