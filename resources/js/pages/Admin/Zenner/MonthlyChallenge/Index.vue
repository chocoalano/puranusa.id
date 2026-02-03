<script setup lang="ts">
import { ref } from 'vue';
import { router, useForm, Link, Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search, Pencil, Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import Pagination from '@/components/Pagination.vue';

interface MonthlyChallenge {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    start_date: string;
    end_date: string;
    reward: string | null;
    is_active: boolean;
    created_at: string;
}

interface Props {
    challenges: {
        data: MonthlyChallenge[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
    filters: {
        search?: string;
    };
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');
const deleteId = ref<number | null>(null);
const showDeleteDialog = ref(false);

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const handleSearch = () => {
    router.get('/admin/zenner/monthly-challenges', {
        search: searchQuery.value,
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
        useForm({}).delete(`/admin/zenner/monthly-challenges/${deleteId.value}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Monthly Challenge berhasil dihapus');
                showDeleteDialog.value = false;
            },
            onError: () => {
                toast.error('Gagal menghapus Monthly Challenge');
            },
        });
    }
};
</script>

<template>
    <Head title="Monthly Challenges" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Monthly Challenges</h1>
                    <p class="text-muted-foreground">Kelola tantangan bulanan Zenner Club</p>
                </div>
                <Link href="/admin/zenner/monthly-challenges/create">
                    <Button>
                        <Plus class="h-4 w-4 mr-2" />
                        Tambah Challenge
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
                                placeholder="Cari challenge..."
                                class="pl-9"
                                @keyup.enter="handleSearch"
                            />
                        </div>
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
                                <TableHead>Tanggal Mulai</TableHead>
                                <TableHead>Tanggal Selesai</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead class="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="challenge in challenges.data" :key="challenge.id">
                                <TableCell class="font-medium">{{ challenge.title }}</TableCell>
                                <TableCell>{{ formatDate(challenge.start_date) }}</TableCell>
                                <TableCell>{{ formatDate(challenge.end_date) }}</TableCell>
                                <TableCell>
                                    <Badge :variant="challenge.is_active ? 'default' : 'secondary'">
                                        {{ challenge.is_active ? 'Aktif' : 'Nonaktif' }}
                                    </Badge>
                                </TableCell>
                                <TableCell>{{ formatDate(challenge.created_at) }}</TableCell>
                                <TableCell class="text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link :href="`/admin/zenner/monthly-challenges/${challenge.id}/edit`">
                                            <Button variant="outline" size="icon">
                                                <Pencil class="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="icon" @click="confirmDelete(challenge.id)">
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="challenges.data.length === 0">
                                <TableCell colspan="6" class="text-center text-muted-foreground py-8">
                                    Tidak ada data ditemukan
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div class="mt-4">
                        <Pagination
                            v-if="challenges.last_page > 1"
                            :data="challenges"
                            url="/admin/zenner/monthly-challenges"
                            :filters="filters"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

        <AlertDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Monthly Challenge</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus challenge ini? Tindakan ini tidak dapat dibatalkan.
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
