<script setup lang="ts">
import { index as rewardIndex, destroy as rewardDestroy, release as rewardRelease, massRelease as rewardMassRelease } from '@/actions/App/Http/Controllers/BonusComission/BonusRewardController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { usePermissions } from '@/composables/usePermissions';
import AppLayout from '@/layouts/AppLayout.vue';
import { valueUpdater } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnDef,
    type ColumnFiltersState,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/vue-table';
import { createReusableTemplate } from '@vueuse/core';
import {
    ArrowUpDown,
    CheckCircle,
    DollarSign,
    Gift,
    MoreHorizontal,
    Plus,
    Receipt,
    Search,
    Trash2,
    Wallet,
    XCircle,
} from 'lucide-vue-next';
import { computed, h, ref, watch } from 'vue';

interface Bonus {
    id: number;
    member_id: number;
    member_name: string;
    member_ewallet_id: string;
    reward_type: string | null;
    amount: number;
    index_value: number;
    status: number;
    status_text: string;
    description: string;
    created_at: string;
}

interface PaginatedBonuses {
    data: Bonus[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Statistics {
    total_pending: number;
    total_released: number;
    count_pending: number;
    count_released: number;
}

interface Props {
    bonuses: PaginatedBonuses;
    statistics: Statistics;
    filters: {
        search?: string;
        status?: number;
        member_id?: number;
        sort_by: string;
        sort_order: 'asc' | 'desc';
        per_page: number;
    };
}

const { isSuperAdmin, isAdmin } = usePermissions()
const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Bonus Reward', href: rewardIndex.url() },
];

const search = ref(props.filters.search || '');
const statusFilter = ref(props.filters.status?.toString() || 'all');
const sorting = ref<SortingState>([
    { id: props.filters.sort_by, desc: props.filters.sort_order === 'desc' },
]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref<RowSelectionState>({});

const [DefineActionsTemplate, ReuseActionsTemplate] = createReusableTemplate<{
    bonus: Bonus;
    onRelease: () => void;
    onDelete: () => void;
}>();

const deleteDialog = ref({ open: false, bonus: null as Bonus | null });
const releaseDialog = ref({ open: false, bonus: null as Bonus | null });
const massReleaseDialog = ref({ open: false });

const selectedBonuses = computed(() =>
    Object.keys(rowSelection.value).map((key) => props.bonuses.data[parseInt(key)]).filter(Boolean)
);
const selectedPendingBonuses = computed(() => selectedBonuses.value.filter((b) => b.status === 0));

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const openDeleteDialog = (bonus: Bonus) => { deleteDialog.value = { open: true, bonus }; };
const handleDelete = () => {
    if (!deleteDialog.value.bonus) return;
    router.delete(rewardDestroy.url(deleteDialog.value.bonus.id), {
        preserveScroll: true,
        onSuccess: () => { deleteDialog.value = { open: false, bonus: null }; },
    });
};

const openReleaseDialog = (bonus: Bonus) => { releaseDialog.value = { open: true, bonus }; };
const handleRelease = () => {
    if (!releaseDialog.value.bonus) return;
    const releaseForm = useForm({});
    releaseForm.post(rewardRelease.url(releaseDialog.value.bonus.id), {
        preserveScroll: true,
        onSuccess: () => { releaseDialog.value = { open: false, bonus: null }; rowSelection.value = {}; },
    });
};

const openMassReleaseDialog = () => {
    if (!selectedPendingBonuses.value.length) return;
    massReleaseDialog.value.open = true;
};
const handleMassRelease = () => {
    const bonusIds = selectedPendingBonuses.value.map((b) => b.id);
    const massReleaseForm = useForm({ ids: bonusIds });
    massReleaseForm.post(rewardMassRelease.url(), {
        preserveScroll: true,
        onSuccess: () => { rowSelection.value = {}; massReleaseDialog.value.open = false; },
    });
};

const columns: ColumnDef<Bonus>[] = [
    {
        id: 'select',
        header: ({ table }) => h(Checkbox, {
            modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
            'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
            ariaLabel: 'Select all',
        }),
        cell: ({ row }) => h(Checkbox, {
            modelValue: row.getIsSelected(),
            'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
            ariaLabel: 'Select row',
        }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => h('div', { class: 'font-medium' }, row.index + 1 + (props.bonuses.current_page - 1) * props.bonuses.per_page),
    },
    {
        accessorKey: 'member_name',
        header: () => 'Member',
        cell: ({ row }) => h('div', [
            h('div', { class: 'font-medium' }, row.original.member_name),
            h('div', { class: 'text-xs text-muted-foreground' }, row.original.member_ewallet_id),
        ]),
    },
    {
        accessorKey: 'reward_type',
        header: () => 'Tipe Reward',
        cell: ({ row }) => h('div', { class: 'text-sm' }, row.original.reward_type || '-'),
    },
    {
        accessorKey: 'amount',
        header: () => h('div', { class: 'text-right' }, 'Jumlah'),
        cell: ({ row }) => h('div', { class: 'text-right font-medium' }, formatCurrency(row.original.amount)),
    },
    {
        accessorKey: 'status',
        header: () => 'Status',
        cell: ({ row }) => h(Badge, { variant: row.original.status === 1 ? 'default' : 'secondary', class: 'gap-1' }, () => [
            h(row.original.status === 1 ? CheckCircle : XCircle, { class: 'h-3 w-3' }),
            row.original.status_text,
        ]),
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => h(Button, { variant: 'ghost', onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), class: '-ml-4' }, () => ['Tanggal', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]),
        cell: ({ row }) => formatDate(row.getValue('created_at')),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => h(ReuseActionsTemplate, { bonus: row.original, onRelease: () => openReleaseDialog(row.original), onDelete: () => openDeleteDialog(row.original) }),
    },
];

const table = useVueTable({
    get data() { return props.bonuses.data; },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
    state: {
        get sorting() { return sorting.value; },
        get columnFilters() { return columnFilters.value; },
        get columnVisibility() { return columnVisibility.value; },
        get rowSelection() { return rowSelection.value; },
    },
    manualSorting: true,
    enableRowSelection: true,
});

watch(sorting, (newSorting) => {
    if (newSorting.length > 0) {
        router.get(rewardIndex.url(), {
            search: search.value || undefined,
            status: statusFilter.value !== 'all' ? parseInt(statusFilter.value) : undefined,
            sort_by: newSorting[0].id,
            sort_order: newSorting[0].desc ? 'desc' : 'asc',
        }, { preserveState: true, preserveScroll: true });
    }
}, { deep: true });

let searchTimeout: ReturnType<typeof setTimeout>;
watch([search, statusFilter], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(rewardIndex.url(), {
            search: search.value || undefined,
            status: statusFilter.value !== 'all' ? parseInt(statusFilter.value) : undefined,
            sort_by: sorting.value[0]?.id || 'created_at',
            sort_order: sorting.value[0]?.desc ? 'desc' : 'asc',
        }, { preserveState: true, preserveScroll: true });
    }, 300);
});
</script>

<template>
    <DefineActionsTemplate v-slot="{ bonus, onRelease, onDelete }">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="h-8 w-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <template v-if="bonus.status === 0 && (isSuperAdmin || isAdmin)">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="onRelease">
                        <Wallet class="mr-2 h-4 w-4" />
                        Release Bonus
                    </DropdownMenuItem>
                </template>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-destructive" @click="onDelete" v-if="isSuperAdmin && isAdmin">
                    <Trash2 class="mr-2 h-4 w-4" />
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </DefineActionsTemplate>

    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Bonus Reward" />

        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gift class="h-8 w-8" />
                        Bonus Reward
                    </h1>
                    <p class="text-muted-foreground">Kelola bonus reward member</p>
                </div>
                <Button @click="router.visit('/bonus/reward/create')" v-if="isSuperAdmin || isAdmin">
                    <Plus class="mr-2 h-4 w-4" />
                    Tambah Bonus
                </Button>
            </div>

            <!-- Statistics -->
            <div class="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Pending</CardTitle>
                        <DollarSign class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(statistics.total_pending) }}</div>
                        <p class="text-xs text-muted-foreground">{{ statistics.count_pending }} transaksi</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Released</CardTitle>
                        <Receipt class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-green-600">{{ formatCurrency(statistics.total_released) }}</div>
                        <p class="text-xs text-muted-foreground">{{ statistics.count_released }} transaksi</p>
                    </CardContent>
                </Card>
            </div>

            <!-- Filters & Actions -->
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div class="flex flex-1 items-center gap-4">
                    <div class="relative flex-1 md:max-w-sm">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Cari member atau tipe reward..." class="pl-9" />
                    </div>
                    <Select v-model="statusFilter">
                        <SelectTrigger class="w-40">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="0">Pending</SelectItem>
                            <SelectItem value="1">Released</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button v-if="selectedPendingBonuses.length" variant="outline" @click="openMassReleaseDialog">
                    <Wallet class="mr-2 h-4 w-4" />
                    Release {{ selectedPendingBonuses.length }} Bonus
                </Button>
            </div>

            <!-- Table -->
            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <TableHead v-for="header in headerGroup.headers" :key="header.id">
                                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <template v-if="table.getRowModel().rows?.length">
                            <TableRow v-for="row in table.getRowModel().rows" :key="row.id" :data-state="row.getIsSelected() && 'selected'">
                                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                </TableCell>
                            </TableRow>
                        </template>
                        <template v-else>
                            <TableRow>
                                <TableCell :colspan="columns.length" class="h-24 text-center">Tidak ada data.</TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination :data="bonuses" :url="rewardIndex.url()" />
        </div>

        <!-- Dialogs -->
        <ConfirmDialog :open="deleteDialog.open" title="Hapus Bonus" description="Apakah Anda yakin ingin menghapus bonus ini?" confirm-text="Hapus" @update:open="deleteDialog.open = $event" @confirm="handleDelete" />
        <ConfirmDialog :open="releaseDialog.open" title="Release Bonus" :description="`Apakah Anda yakin ingin merilis bonus sebesar ${releaseDialog.bonus ? formatCurrency(releaseDialog.bonus.amount) : ''} ke member?`" confirm-text="Release" @update:open="releaseDialog.open = $event" @confirm="handleRelease" />
        <ConfirmDialog :open="massReleaseDialog.open" title="Mass Release Bonus" :description="`Apakah Anda yakin ingin merilis ${selectedPendingBonuses.length} bonus yang dipilih?`" confirm-text="Release All" @update:open="massReleaseDialog.open = $event" @confirm="handleMassRelease" />
    </AppLayout>
</template>
