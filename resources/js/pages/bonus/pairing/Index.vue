<script setup lang="ts">
import { index, create, show, destroy, release, flush } from '@/actions/App/Http/Controllers/BonusComission/BonusPairingController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
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
import {
    ArrowUpDown,
    CheckCircle,
    ChevronDown,
    DollarSign,
    Eye,
    GitMerge,
    Plus,
    Receipt,
    Search,
    Settings2,
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
    pair_count: number;
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
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Statistics {
    total_pending: number;
    total_released: number;
    count_pending: number;
    count_released: number;
    total_pairs: number;
}

interface Props {
    bonuses: PaginatedBonuses;
    statistics: Statistics;
    filters: {
        search?: string;
        status?: number;
        sort_by: string;
        sort_order: 'asc' | 'desc';
        per_page: number;
    };
}

const { isSuperAdmin, isAdmin } = usePermissions()
const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Bonus Pairing',
        href: index.url(),
    },
];

const search = ref(props.filters.search || '');
const statusFilter = ref(props.filters.status?.toString() || 'all');
const sorting = ref<SortingState>([
    {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === 'desc',
    },
]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref<RowSelectionState>({});

const deleteDialog = ref({
    open: false,
    bonus: null as Bonus | null,
});
const releaseDialog = ref({
    open: false,
    bonus: null as Bonus | null,
});
const massReleaseDialog = ref({ open: false });
const flushDialog = ref({ open: false });

const selectedBonuses = computed(() => {
    return Object.keys(rowSelection.value)
        .map((key) => props.bonuses.data[parseInt(key)])
        .filter(Boolean);
});

const selectedPendingBonuses = computed(() =>
    selectedBonuses.value.filter((b) => b.status === 0)
);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const openDeleteDialog = (bonus: Bonus) => {
    deleteDialog.value = { open: true, bonus };
};

const handleDelete = () => {
    if (!deleteDialog.value.bonus) return;

    router.delete(destroy.url(deleteDialog.value.bonus.id), {
        preserveScroll: true,
        onSuccess: () => {
            deleteDialog.value = { open: false, bonus: null };
        },
    });
};

const openReleaseDialog = (bonus: Bonus) => {
    releaseDialog.value = { open: true, bonus };
};

const handleRelease = () => {
    if (!releaseDialog.value.bonus) return;

    const releaseForm = useForm({});
    releaseForm.post(release.url(releaseDialog.value.bonus.id), {
        preserveScroll: true,
        onSuccess: () => {
            releaseDialog.value = { open: false, bonus: null };
            rowSelection.value = {};
        },
    });
};

const openMassReleaseDialog = () => {
    if (!selectedPendingBonuses.value.length) return;
    massReleaseDialog.value.open = true;
};

const handleMassRelease = () => {
    const bonusIds = selectedPendingBonuses.value.map((b) => b.id);

    // Release selected bonuses sequentially
    let completed = 0;
    bonusIds.forEach((id) => {
        const releaseForm = useForm({});
        releaseForm.post(release.url(id), {
            preserveScroll: true,
            onSuccess: () => {
                completed++;
                if (completed === bonusIds.length) {
                    rowSelection.value = {};
                    massReleaseDialog.value.open = false;
                    router.reload({ only: ['bonuses', 'statistics'] });
                }
            },
        });
    });
};

const handleFlush = () => {
    const flushForm = useForm({});
    flushForm.post(flush.url(), {
        preserveScroll: true,
        onSuccess: () => {
            flushDialog.value.open = false;
        },
    });
};

const columns: ColumnDef<Bonus>[] = [
    {
        id: 'select',
        header: ({ table }) => {
            return h('input', {
                type: 'checkbox',
                checked: table.getIsAllPageRowsSelected(),
                indeterminate: table.getIsSomePageRowsSelected(),
                onChange: table.getToggleAllPageRowsSelectedHandler(),
                class: 'h-4 w-4 rounded border-gray-300',
            });
        },
        cell: ({ row }) => {
            return h('input', {
                type: 'checkbox',
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
                class: 'h-4 w-4 rounded border-gray-300',
            });
        },
        enableSorting: false,
    },
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.bonuses.current_page - 1) * props.bonuses.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'member_name',
        header: () => 'Member',
        cell: ({ row }) => {
            return h('div', [
                h('div', { class: 'font-medium' }, row.original.member_name),
                h(
                    'div',
                    { class: 'text-xs text-muted-foreground' },
                    row.original.member_ewallet_id
                ),
            ]);
        },
    },
    {
        accessorKey: 'pair_count',
        header: () => 'Pasangan',
        cell: ({ row }) => {
            return h(
                Badge,
                {
                    variant: 'outline',
                    class: 'gap-1',
                },
                () => [h(GitMerge, { class: 'h-3 w-3' }), `${row.original.pair_count} pasang`]
            );
        },
    },
    {
        accessorKey: 'amount',
        header: () => h('div', { class: 'text-right' }, 'Jumlah'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-right font-medium' },
                formatCurrency(row.original.amount)
            );
        },
    },
    {
        accessorKey: 'status',
        header: () => 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            return h(
                Badge,
                {
                    variant: status === 1 ? 'default' : 'secondary',
                    class: 'gap-1',
                },
                () => [
                    h(status === 1 ? CheckCircle : XCircle, { class: 'h-3 w-3' }),
                    row.original.status_text,
                ]
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => [
                    'Tanggal',
                    h(ArrowUpDown, { class: 'ml-2 h-4 w-4' }),
                ]
            );
        },
        cell: ({ row }) => {
            return formatDate(row.getValue('created_at'));
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-right' }, 'Actions'),
        cell: ({ row }) => {
            const bonus = row.original;
            const actions=[]
            if (isSuperAdmin || isAdmin) {
                actions.push(h(
                    Button,
                    {
                        variant: 'outline',
                        size: 'sm',
                        onClick: () => router.visit(show.url(bonus.id)),
                    },
                    () => h(Eye, { class: 'h-4 w-4' })
                ),
                bonus.status === 0
                    ? h(
                          Button,
                          {
                              variant: 'default',
                              size: 'sm',
                              onClick: () => openReleaseDialog(bonus),
                          },
                          () => h(Wallet, { class: 'h-4 w-4' })
                      )
                    : null,
                bonus.status === 0
                    ? h(
                          Button,
                          {
                              variant: 'outline',
                              size: 'sm',
                              onClick: () => openDeleteDialog(bonus),
                          },
                          () => h(Trash2, { class: 'h-4 w-4 text-destructive' })
                      )
                    : null,)
            }
            return h('div', { class: 'flex justify-end gap-2' }, actions);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.bonuses.data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        get sorting() {
            return sorting.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
        get columnVisibility() {
            return columnVisibility.value;
        },
        get rowSelection() {
            return rowSelection.value;
        },
    },
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
    manualSorting: true,
    enableRowSelection: true,
});

watch(
    sorting,
    (newSorting) => {
        if (newSorting.length > 0) {
            router.get(
                index.url(),
                {
                    search: search.value || undefined,
                    status: statusFilter.value !== 'all' ? parseInt(statusFilter.value) : undefined,
                    sort_by: newSorting[0].id,
                    sort_order: newSorting[0].desc ? 'desc' : 'asc',
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }
    },
    { deep: true }
);

let searchTimeout: ReturnType<typeof setTimeout>;
watch([search, statusFilter], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            index.url(),
            {
                search: search.value || undefined,
                status: statusFilter.value !== 'all' ? parseInt(statusFilter.value) : undefined,
                sort_by: sorting.value[0]?.id || 'created_at',
                sort_order: sorting.value[0]?.desc ? 'desc' : 'asc',
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, 300);
});
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Bonus Pairing" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Bonus Pairing</h1>
                    <p class="text-muted-foreground">Kelola bonus pairing binary tree</p>
                </div>
                <div class="flex gap-2">
                    <Button variant="outline" @click="flushDialog.open = true" v-if="isSuperAdmin || isAdmin">
                        <GitMerge class="h-4 w-4" />
                        Proses Semua Pairing
                    </Button>
                    <Button @click="router.visit(create.url())" v-if="isSuperAdmin || isAdmin">
                        <Plus class="h-4 w-4" />
                        Proses Member
                    </Button>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Pending</CardTitle>
                        <Receipt class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ formatCurrency(statistics.total_pending) }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            {{ statistics.count_pending }} bonus
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Released</CardTitle>
                        <DollarSign class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ formatCurrency(statistics.total_released) }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            {{ statistics.count_released }} bonus
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Pairs Pending</CardTitle>
                        <GitMerge class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">
                            {{ statistics.total_pairs }}
                        </div>
                        <p class="text-xs text-muted-foreground">
                            pairs belum di-release
                        </p>
                    </CardContent>
                </Card>
            </div>

            <!-- Bulk Actions -->
            <div
                v-if="selectedPendingBonuses.length > 0"
                class="flex items-center justify-between rounded-lg border bg-muted/50 p-4"
            >
                <p class="text-sm font-medium">
                    {{ selectedPendingBonuses.length }} bonus pending dipilih
                </p>
                <Button size="sm" @click="openMassReleaseDialog">
                    <Wallet class="h-4 w-4" />
                    Release Semua
                </Button>
            </div>

            <!-- Filters -->
            <div class="flex items-center gap-4">
                <div class="relative flex-1">
                    <Search
                        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input v-model="search" placeholder="Cari member atau deskripsi..." class="pl-9" />
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
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" class="ml-auto">
                            <Settings2 class="h-4 w-4" />
                            Kolom
                            <ChevronDown class="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            v-for="column in table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())"
                            :key="column.id"
                            class="capitalize"
                            :checked="column.getIsVisible()"
                            @update:checked="(value: boolean) => column.toggleVisibility(!!value)"
                        >
                            {{ column.id }}
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <!-- Table -->
            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow
                            v-for="headerGroup in table.getHeaderGroups()"
                            :key="headerGroup.id"
                        >
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
                                :data-state="row.getIsSelected() ? 'selected' : undefined"
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
                                    Tidak ada data bonus.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination
                :data="bonuses"
                :url="index.url()"
                :filters="{
                    search: search || undefined,
                    status: statusFilter !== 'all' ? parseInt(statusFilter) : undefined,
                    sort_by: sorting[0]?.id,
                    sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                }"
            />
        </div>

        <!-- Delete Dialog -->
        <ConfirmDialog
            v-model:open="deleteDialog.open"
            title="Hapus Bonus?"
            :description="`Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan.`"
            confirm-text="Hapus"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleDelete"
        />

        <!-- Release Dialog -->
        <ConfirmDialog
            v-model:open="releaseDialog.open"
            title="Release Bonus?"
            :description="`Bonus sebesar ${releaseDialog.bonus ? formatCurrency(releaseDialog.bonus.amount) : ''} (${releaseDialog.bonus?.pair_count} pasang) akan ditransfer ke ewallet member. Lanjutkan?`"
            confirm-text="Release"
            cancel-text="Batal"
            @confirm="handleRelease"
        />

        <!-- Mass Release Dialog -->
        <ConfirmDialog
            v-model:open="massReleaseDialog.open"
            :title="`Release ${selectedPendingBonuses.length} Bonus?`"
            :description="`Total ${formatCurrency(selectedPendingBonuses.reduce((sum, b) => sum + b.amount, 0))} (${selectedPendingBonuses.reduce((sum, b) => sum + b.pair_count, 0)} pasang) akan ditransfer ke ewallet member. Lanjutkan?`"
            confirm-text="Release Semua"
            cancel-text="Batal"
            @confirm="handleMassRelease"
        />

        <!-- Flush Dialog -->
        <ConfirmDialog
            v-model:open="flushDialog.open"
            title="Proses Semua Pairing?"
            description="Sistem akan memproses bonus pairing untuk SEMUA member yang memiliki pasangan pending. Operasi ini biasanya dilakukan bulanan. Lanjutkan?"
            confirm-text="Proses Semua"
            cancel-text="Batal"
            @confirm="handleFlush"
        />
    </AppLayout>
</template>
