<script setup lang="ts">
import { ref } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
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

interface Testimonial {
    id: number;
    customer_name: string;
    product_name: string;
    rating: number;
    is_active: boolean;
    created_at: string;
}

interface Props {
    items: {
        data: Testimonial[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
}

const props = defineProps<Props>();

const search = ref(props.filters.search || '');
const status = ref(props.filters.status || 'all');
const deleteDialogOpen = ref(false);
const deleteTarget = ref<Testimonial | null>(null);

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

const applyFilters = () => {
    router.get('/admin/zenner/testimonials', {
        search: search.value || undefined,
        status: status.value !== 'all' ? status.value : undefined,
    }, { preserveState: true, replace: true });
};

const confirmDelete = (item: Testimonial) => {
    deleteTarget.value = item;
    deleteDialogOpen.value = true;
};

const handleDelete = () => {
    if (!deleteTarget.value) return;
    useForm({}).delete(`/admin/zenner/testimonials/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Testimonial berhasil dihapus');
            deleteDialogOpen.value = false;
            deleteTarget.value = null;
        },
        onError: () => toast.error('Gagal menghapus testimonial'),
    });
};

const formatPaginationLabel = (label: string) => {
    if (!label) return '';
    const stripped = label.replace(/<[^>]*>/g, '');
    if (typeof window === 'undefined') {
        return stripped;
    }
    const decoder = document.createElement('textarea');
    decoder.innerHTML = stripped;
    return decoder.value;
};
</script>

<template>
    <AppLayout title="Testimonials">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Testimonials</h2>
                    <Button @click="router.get('/admin/zenner/testimonials/create')">
                        <Plus class="mr-2 h-4 w-4" /> Tambah
                    </Button>
                </div>
                <div class="mt-4 flex items-center gap-4">
                    <div class="relative flex-1">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Cari..." class="pl-10" @keyup.enter="applyFilters" />
                    </div>
                    <Select v-model="status" @update:model-value="applyFilters">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Nonaktif</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Customer</TableHead>
                            <TableHead>Produk</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Dibuat</TableHead>
                            <TableHead class="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="item in items.data" :key="item.id">
                            <TableCell>{{ item.customer_name }}</TableCell>
                            <TableCell>{{ item.product_name }}</TableCell>
                            <TableCell class="text-yellow-500">{{ renderStars(item.rating) }}</TableCell>
                            <TableCell>
                                <Badge v-if="item.is_active" variant="default">Aktif</Badge>
                                <Badge v-else variant="secondary">Nonaktif</Badge>
                            </TableCell>
                            <TableCell>{{ formatDate(item.created_at) }}</TableCell>
                            <TableCell class="text-right">
                                <div class="flex justify-end gap-2">
                                    <Button size="sm" variant="outline" @click="router.get(`/admin/zenner/testimonials/${item.id}/edit`)">
                                        <Pencil class="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" @click="confirmDelete(item)">
                                        <Trash2 class="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow v-if="items.data.length === 0">
                            <TableCell :colspan="6" class="text-center text-muted-foreground">Tidak ada data</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div v-if="items.last_page > 1" class="mt-4 flex justify-center gap-2">
                    <template v-for="link in items.links" :key="link.label">
                        <Button
                            size="sm"
                            :variant="link.active ? 'default' : 'outline'"
                            :disabled="!link.url"
                            @click="link.url && router.get(link.url)"
                        >
                            {{ formatPaginationLabel(link.label) }}
                        </Button>
                    </template>
                </div>
            </CardContent>
        </Card>

        <AlertDialog :open="deleteDialogOpen" @update:open="deleteDialogOpen = $event">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Testimonial</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus testimonial dari "{{ deleteTarget?.customer_name }}"? Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction @click="handleDelete">Hapus</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </AppLayout>
</template>
