<script setup lang="ts">
import { ref } from 'vue';
import { router, useForm, Link, Head } from '@inertiajs/vue3';
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
import Pagination from '@/components/Pagination.vue';

interface Certificate {
    id: number;
    title: string;
    description: string | null;
    template_image: string | null;
    type: string;
    is_active: boolean;
    created_at: string;
}

interface Props {
    certificates: {
        data: Certificate[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
    filters: {
        search?: string;
        type?: string;
    };
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');
const typeFilter = ref(props.filters.type || '');
const deleteId = ref<number | null>(null);
const showDeleteDialog = ref(false);

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const handleSearch = () => {
    router.get('/admin/zenner/certificates', {
        search: searchQuery.value,
        type: typeFilter.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const confirmDelete = (id: number) => {
    deleteId.value = id;
    showDeleteDialog.value = true;
};

const handleDelete = () => {
    if (deleteId.value) {
        useForm({}).delete(`/admin/zenner/certificates/${deleteId.value}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sertifikat berhasil dihapus');
                showDeleteDialog.value = false;
            },
            onError: () => {
                toast.error('Gagal menghapus sertifikat');
            },
        });
    }
};
</script>

<template>
    <Head title="Sertifikat" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Sertifikat</h1>
                    <p class="text-muted-foreground">Kelola sertifikat Zenner Club</p>
                </div>
                <Link href="/admin/zenner/certificates/create">
                    <Button>
                        <Plus class="h-4 w-4 mr-2" />
                        Tambah Sertifikat
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="relative flex-1">
                            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                v-model="searchQuery"
                                placeholder="Cari sertifikat..."
                                class="pl-9"
                                @keyup.enter="handleSearch"
                            />
                        </div>
                        <Select v-model="typeFilter" @update:model-value="handleSearch">
                            <SelectTrigger class="w-48">
                                <SelectValue placeholder="Semua Tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Semua Tipe</SelectItem>
                                <SelectItem value="completion">Completion</SelectItem>
                                <SelectItem value="achievement">Achievement</SelectItem>
                                <SelectItem value="participation">Participation</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button @click="handleSearch">
                            <Search class="h-4 w-4 mr-2" />
                            Cari
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead class="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="cert in certificates.data" :key="cert.id">
                                <TableCell class="font-medium">{{ cert.title }}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{{ cert.type }}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge :variant="cert.is_active ? 'default' : 'secondary'">
                                        {{ cert.is_active ? 'Aktif' : 'Nonaktif' }}
                                    </Badge>
                                </TableCell>
                                <TableCell>{{ formatDate(cert.created_at) }}</TableCell>
                                <TableCell class="text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link :href="`/admin/zenner/certificates/${cert.id}/edit`">
                                            <Button variant="outline" size="icon">
                                                <Pencil class="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="icon" @click="confirmDelete(cert.id)">
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="certificates.data.length === 0">
                                <TableCell colspan="5" class="text-center text-muted-foreground py-8">
                                    Tidak ada data ditemukan
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div class="mt-4">
                        <Pagination
                            v-if="certificates.last_page > 1"
                            :data="certificates"
                            url="/admin/zenner/certificates"
                            :filters="filters"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

        <AlertDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Sertifikat</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus sertifikat ini? Tindakan ini tidak dapat dibatalkan.
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
