<script setup lang="ts">
import { index as sponsorIndex, create as sponsorCreate, show as sponsorShow, destroy as sponsorDestroy, release as sponsorRelease, massRelease as sponsorMassRelease } from '@/actions/App/Http/Controllers/BonusComission/BonusSponsorController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
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
import AppLayout from '@/layouts/AppLayout.vue';
import { valueUpdater } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
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
    ChevronDown,
    DollarSign,
    Eye,
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
    from_member_id: number;
    from_member_name: string;
    from_member_ewallet_id: string;
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
}

interface Props {
    bonuses: PaginatedBonuses;
    statistics: Statistics;
    filters: {
        search?: string;
        status?: number;
        member_id?: number;
        from_member_id?: number;
        sort_by: string;
        sort_order: 'asc' | 'desc';
        per_page: number;
    };
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Bonus Sponsor',
        href: sponsorIndex.url(),
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

// Reusable template for actions dropdown
const [DefineActionsTemplate, ReuseActionsTemplate] = createReusableTemplate<{
    bonus: Bonus;
    onRelease: () => void;
    onDelete: () => void;
}>();

const deleteDialog = ref({
    open: false,
    bonus: null as Bonus | null,
});
const releaseDialog = ref({
    open: false,
    bonus: null as Bonus | null,
});
const massReleaseDialog = ref({ open: false });

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

    router.delete(sponsorDestroy.url(deleteDialog.value.bonus.id), {
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

    router.post(
        sponsorRelease.url(releaseDialog.value.bonus.id),
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                releaseDialog.value = { open: false, bonus: null };
                rowSelection.value = {};
            },
        }
    );
};

const openMassReleaseDialog = () => {
    if (!selectedPendingBonuses.value.length) return;
    massReleaseDialog.value.open = true;
};

const handleMassRelease = () => {
    const bonusIds = selectedPendingBonuses.value.map((b) => b.id);

    router.post(
        sponsorMassRelease.url(),
        { bonus_ids: bonusIds },
        {
            preserveScroll: true,
            onSuccess: () => {
                rowSelection.value = {};
                massReleaseDialog.value.open = false;
            },
        }
    );
};

const columns: ColumnDef<Bonus>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(Checkbox, {
                modelValue:
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate'),
                'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
                ariaLabel: 'Select all',
            }),
        cell: ({ row }) =>
            h(Checkbox, {
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
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.bonuses.current_page - 1) * props.bonuses.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'member_name',
        header: () => 'Sponsor (Penerima)',
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
        accessorKey: 'from_member_name',
        header: () => 'Downline',
        cell: ({ row }) => {
            return h('div', [
                h('div', { class: 'font-medium' }, row.original.from_member_name),
                h(
                    'div',
                    { class: 'text-xs text-muted-foreground' },
                    row.original.from_member_ewallet_id
                ),
            ]);
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
        enableHiding: false,
        cell: ({ row }) => {
            const bonus = row.original;
            return h(ReuseActionsTemplate, {
                bonus,
                onRelease: () => openReleaseDialog(bonus),
                onDelete: () => openDeleteDialog(bonus),
            });
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
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
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
    manualSorting: true,
    enableRowSelection: true,
});

// Watch sorting changes and update URL
watch(
    sorting,
    (newSorting) => {
        if (newSorting.length > 0) {
            router.get(
                sponsorIndex.url(),
                {
                    search: search.value || undefined,
                    status: statusFilter.value !== 'all' ? parseInt(statusFilter.value) : undefined,
                    sort_by: newSorting[0].id,
                    sort_order: newSorting[0].desc ? 'desc' : 'asc',
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    },
    { deep: true },
);

// Debounce search
let searchTimeout: ReturnType<typeof setTimeout>;
watch([search, statusFilter], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            sponsorIndex.url(),
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
                <DropdownMenuItem @click="router.visit(sponsorShow.url(bonus.id))">
                    <Eye class="mr-2 h-4 w-4" />
                    Lihat Detail
                </DropdownMenuItem>
                <template v-if="bonus.status === 0">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="onRelease">
                        <Wallet class="mr-2 h-4 w-4" />
                        Release Bonus
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="onDelete" class="text-destructive">
                        <Trash2 class="mr-2 h-4 w-4" />
                        Hapus Bonus
                    </DropdownMenuItem>
                </template>
            </DropdownMenuContent>
        </DropdownMenu>
    </DefineActionsTemplate>

    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Bonus Sponsor" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Bonus Sponsor</h1>
                    <p class="text-muted-foreground">Kelola bonus sponsor dari downline</p>
                </div>
                <Button @click="router.visit(sponsorCreate.url())">
                    <Plus class="h-4 w-4" />
                    Tambah Bonus
                </Button>
            </div>

            <!-- Statistics -->
            <div class="grid gap-4 md:grid-cols-2">
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
                    <Input v-model="search" placeholder="Cari sponsor atau downline..." class="pl-9" />
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
                            Kolom <ChevronDown class="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            v-for="column in table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())"
                            :key="column.id"
                            class="capitalize"
                            :model-value="column.getIsVisible()"
                            @update:model-value="
                                (value) => {
                                    column.toggleVisibility(!!value);
                                }
                            "
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
                v-if="bonuses.last_page > 1"
                :data="{
                    current_page: bonuses.current_page,
                    last_page: bonuses.last_page,
                    per_page: bonuses.per_page,
                    from: bonuses.from,
                    to: bonuses.to,
                    total: bonuses.total,
                }"
                :url="sponsorIndex.url()"
                :filters="{
                    search: search || undefined,
                    status: statusFilter !== 'all' ? parseInt(statusFilter) : undefined,
                    sort_by: sorting[0]?.id || 'created_at',
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
            :description="`Bonus sebesar ${releaseDialog.bonus ? formatCurrency(releaseDialog.bonus.amount) : ''} akan ditransfer ke ewallet member. Lanjutkan?`"
            confirm-text="Release"
            cancel-text="Batal"
            @confirm="handleRelease"
        />

        <!-- Mass Release Dialog -->
        <ConfirmDialog
            v-model:open="massReleaseDialog.open"
            :title="`Release ${selectedPendingBonuses.length} Bonus?`"
            :description="`Total ${formatCurrency(selectedPendingBonuses.reduce((sum, b) => sum + b.amount, 0))} akan ditransfer ke ewallet member. Lanjutkan?`"
            confirm-text="Release Semua"
            cancel-text="Batal"
            @confirm="handleMassRelease"
        />
    </AppLayout>
</template>
