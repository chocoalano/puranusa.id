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

interface SellingGuide {
    id: number;
    title: string;
    category: string;
    is_active: boolean;
    created_at: string;
}

const props = defineProps<{
    items: { data: SellingGuide[]; links: any[]; current_page: number; last_page: number };
    filters: { search?: string; category?: string };
    categories: string[];
}>();

const search = ref(props.filters.search || '');
const category = ref(props.filters.category || '');
const deleteId = ref<number | null>(null);
const showDeleteDialog = ref(false);

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const applyFilters = () => {
    router.get('/admin/zenner/selling-guides', {
        search: search.value || undefined,
        category: category.value || undefined,
    }, { preserveState: true, replace: true });
};

const confirmDelete = (id: number) => {
    deleteId.value = id;
    showDeleteDialog.value = true;
};

const handleDelete = () => {
    if (deleteId.value) {
        useForm({}).delete(`/admin/zenner/selling-guides/${deleteId.value}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Selling Guide berhasil dihapus'),
        });
    }
    showDeleteDialog.value = false;
};
</script>

<template>
    <AppLayout>
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Selling Guide</h2>
                    <Button @click="router.visit('/admin/zenner/selling-guides/create')">
                        <Plus class="mr-2 h-4 w-4" /> Tambah
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div class="mb-4 flex items-center gap-4">
                    <div class="relative flex-1">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Cari..." class="pl-10" @keyup.enter="applyFilters" />
                    </div>
                    <Select v-model="category" @update:model-value="applyFilters">
                        <SelectTrigger class="w-48">
                            <SelectValue placeholder="Semua Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Semua Kategori</SelectItem>
                            <SelectItem v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" @click="applyFilters">Filter</Button>
                </div>

                <Table>
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
                            <TableCell>{{ item.title }}</TableCell>
                            <TableCell>{{ item.category }}</TableCell>
                            <TableCell>
                                <Badge :variant="item.is_active ? 'default' : 'secondary'">
                                    {{ item.is_active ? 'Aktif' : 'Nonaktif' }}
                                </Badge>
                            </TableCell>
                            <TableCell>{{ formatDate(item.created_at) }}</TableCell>
                            <TableCell class="text-right">
                                <Button variant="ghost" size="icon" @click="router.visit(`/admin/zenner/selling-guides/${item.id}/edit`)">
                                    <Pencil class="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" @click="confirmDelete(item.id)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div class="mt-4 flex justify-center gap-2">
                    <template v-for="link in items.links" :key="link.label">
                        <Button variant="outline" size="sm" :disabled="!link.url" @click="link.url && router.visit(link.url)" v-html="link.label" />
                    </template>
                </div>
            </CardContent>
        </Card>

        <AlertDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Selling Guide?</AlertDialogTitle>
                    <AlertDialogDescription>Data yang dihapus tidak dapat dikembalikan.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction @click="handleDelete">Hapus</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </AppLayout>
</template>
