<script setup lang="ts">
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import {
    FlexRender,
    getCoreRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnDef,
    type SortingState,
} from '@tanstack/vue-table';
import {
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUpDown,
    ChevronUp,
    Edit,
    Infinity,
    Plus,
    Search,
    Trash2,
    XCircle,
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

interface Reward {
    id: number;
    code: string | null;
    name: string;
    reward: string | null;
    value: number;
    bv: number;
    status: number;
    created_at: string;
}

interface PaginatedRewards {
    data: Reward[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Statistics {
    total: number;
    total_active: number;
    total_inactive: number;
}

interface Props {
    rewards: PaginatedRewards;
    statistics: Statistics;
    filters: {
        search?: string;
        status?: string;
        sort_by: string;
        sort_order: 'asc' | 'desc';
    };
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Pengaturan', href: '#' },
    { title: 'Lifetime Cash Rewards', href: '/admin/settings/lifetime-cash-rewards' },
];

const search = ref(props.filters.search || '');
const statusFilter = ref(props.filters.status || 'all');
const sorting = ref<SortingState>([
    {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === 'desc',
    },
]);

const deleteDialog = ref({
    open: false,
    reward: null as Reward | null,
});

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

const openDeleteDialog = (reward: Reward) => {
    deleteDialog.value = { open: true, reward };
};

const handleDelete = () => {
    if (!deleteDialog.value.reward) return;

    router.delete(`/admin/settings/lifetime-cash-rewards/${deleteDialog.value.reward.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            deleteDialog.value = { open: false, reward: null };
            toast.success('Lifetime Cash Reward berhasil dihapus');
        },
    });
};

const applyFilters = () => {
    router.get(
        '/admin/settings/lifetime-cash-rewards',
        {
            search: search.value || undefined,
            status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
            sort_by: sorting.value[0]?.id || 'created_at',
            sort_order: sorting.value[0]?.desc ? 'desc' : 'asc',
        },
        { preserveState: true, replace: true },
    );
};

watch([statusFilter, sorting], applyFilters, { deep: true });

let searchTimeout: ReturnType<typeof setTimeout>;
watch(search, () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, 300);
});

const columns: ColumnDef<Reward>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.rewards.current_page - 1) * props.rewards.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => [
                    'Nama Reward',
                    h(
                        column.getIsSorted() === 'asc'
                            ? ChevronUp
                            : column.getIsSorted() === 'desc'
                              ? ChevronDown
                              : ChevronsUpDown,
                        { class: 'ml-2 h-4 w-4' }
                    ),
                ]
            );
        },
        cell: ({ row }) => {
            return h('div', [
                h('div', { class: 'font-medium' }, row.original.name),
                row.original.code && h('div', { class: 'text-xs text-muted-foreground font-mono' }, row.original.code),
            ]);
        },
    },
    {
        accessorKey: 'reward',
        header: () => 'Reward',
        cell: ({ row }) => h('div', { class: 'text-sm' }, row.original.reward || '-'),
    },
    {
        accessorKey: 'value',
        header: () => 'Value',
        cell: ({ row }) => h('div', { class: 'font-medium' }, formatCurrency(row.original.value)),
    },
    {
        accessorKey: 'bv',
        header: () => 'BV',
        cell: ({ row }) => h('div', Number(row.original.bv).toFixed(2)),
    },
    {
        id: 'status',
        header: () => 'Status',
        cell: ({ row }) => {
            return h(
                Badge,
                { variant: row.original.status === 1 ? 'default' : 'secondary' },
                () => row.original.status === 1 ? 'Aktif' : 'Tidak Aktif'
            );
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-right' }, 'Aksi'),
        cell: ({ row }) => {
            const reward = row.original;
            return h('div', { class: 'flex justify-end gap-2' }, [
                h(
                    Button,
                    {
                        variant: 'outline',
                        size: 'sm',
                        onClick: () => router.visit(`/admin/settings/lifetime-cash-rewards/${reward.id}/edit`),
                    },
                    () => [h(Edit, { class: 'h-4 w-4' })]
                ),
                h(
                    Button,
                    {
                        variant: 'outline',
                        size: 'sm',
                        class: 'text-destructive hover:bg-destructive hover:text-destructive-foreground',
                        onClick: () => openDeleteDialog(reward),
                    },
                    () => [h(Trash2, { class: 'h-4 w-4' })]
                ),
            ]);
        },
    },
];

const table = useVueTable({
    data: props.rewards.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    state: {
        get sorting() {
            return sorting.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;
    },
});

const goToPage = (page: number) => {
    router.get(
        '/admin/settings/lifetime-cash-rewards',
        {
            page,
            search: search.value || undefined,
            status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
            sort_by: sorting.value[0]?.id || 'created_at',
            sort_order: sorting.value[0]?.desc ? 'desc' : 'asc',
        },
        { preserveState: true, replace: true }
    );
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Lifetime Cash Rewards" />

        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Infinity class="h-8 w-8" />
                        Lifetime Cash Rewards
                    </h1>
                    <p class="text-muted-foreground mt-1">
                        Kelola reward permanen (tanpa periode waktu)
                    </p>
                </div>
                <Link href="/admin/settings/lifetime-cash-rewards/create">
                    <Button>
                        <Plus class="h-4 w-4 mr-2" />
                        Tambah Reward
                    </Button>
                </Link>
            </div>

            <!-- Statistics -->
            <div class="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Rewards</CardTitle>
                        <Infinity class="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-blue-600">{{ statistics.total }}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Aktif</CardTitle>
                        <CheckCircle class="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-green-600">{{ statistics.total_active }}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Tidak Aktif</CardTitle>
                        <XCircle class="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-gray-600">{{ statistics.total_inactive }}</div>
                    </CardContent>
                </Card>
            </div>

            <!-- Filters -->
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div class="flex flex-1 items-center gap-4">
                    <div class="relative flex-1 md:max-w-sm">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            v-model="search"
                            placeholder="Cari nama atau kode..."
                            class="pl-9"
                        />
                    </div>
                    <Select v-model="statusFilter">
                        <SelectTrigger class="w-40">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="1">Aktif</SelectItem>
                            <SelectItem value="0">Tidak Aktif</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <!-- Table -->
            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <TableHead v-for="header in headerGroup.headers" :key="header.id">
                                <FlexRender
                                    v-if="!header.isPlaceholder"
                                    :render="header.column.columnDef.header"
                                    :props="header.getContext()"
                                />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <template v-if="table.getRowModel().rows?.length">
                            <TableRow
                                v-for="row in table.getRowModel().rows"
                                :key="row.id"
                            >
                                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                    <FlexRender
                                        :render="cell.column.columnDef.cell"
                                        :props="cell.getContext()"
                                    />
                                </TableCell>
                            </TableRow>
                        </template>
                        <template v-else>
                            <TableRow>
                                <TableCell :colspan="columns.length" class="h-24 text-center">
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-between">
                <div class="text-sm text-muted-foreground">
                    Menampilkan {{ (rewards.current_page - 1) * rewards.per_page + 1 }} -
                    {{ Math.min(rewards.current_page * rewards.per_page, rewards.total) }}
                    dari {{ rewards.total }} data
                </div>
                <div class="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="rewards.current_page === 1"
                        @click="goToPage(1)"
                    >
                        <ChevronsLeft class="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="rewards.current_page === 1"
                        @click="goToPage(rewards.current_page - 1)"
                    >
                        <ChevronLeft class="h-4 w-4" />
                    </Button>
                    <span class="text-sm">
                        Halaman {{ rewards.current_page }} dari {{ rewards.last_page }}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="rewards.current_page === rewards.last_page"
                        @click="goToPage(rewards.current_page + 1)"
                    >
                        <ChevronRight class="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="rewards.current_page === rewards.last_page"
                        @click="goToPage(rewards.last_page)"
                    >
                        <ChevronsRight class="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>

        <!-- Delete Dialog -->
        <ConfirmDialog
            :open="deleteDialog.open"
            title="Hapus Reward"
            :description="`Apakah Anda yakin ingin menghapus reward '${deleteDialog.reward?.name}'? Tindakan ini tidak dapat dibatalkan.`"
            confirm-text="Hapus"
            @update:open="deleteDialog.open = $event"
            @confirm="handleDelete"
        />
    </AppLayout>
</template>
