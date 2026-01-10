<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { approve, reject } from '@/actions/App/Http/Controllers/Admin/TopupManagementController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import TopupStatistics from '@/components/topups/TopupStatistics.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { valueUpdater } from '@/lib/utils';
import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/vue-table';
import {
    ArrowUpDown,
    Check,
    ChevronDown,
    Search,
    X,
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';

interface Topup {
    id: number;
    customer: { name: string; email: string };
    amount: number;
    status: string;
    payment_method: string;
    transaction_ref: string;
    created_at: string;
}

interface PaginatedTopups {
    data: Topup[];
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
    total_pending: number;
    total_completed: number;
    total_failed: number;
    total_amount: number;
}

interface Props {
    topups: PaginatedTopups;
    statistics: Statistics;
    filters: { search?: string; status?: string; sort_by?: string; sort_order?: 'asc' | 'desc' };
}

const props = defineProps<Props>();

const search = ref(props.filters.search || '');
const statusFilter = ref(props.filters.status || 'all');
const sorting = ref<SortingState>([
    {
        id: props.filters.sort_by || 'created_at',
        desc: props.filters.sort_order === 'desc',
    },
]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});

const approveDialog = ref({
    open: false,
    topup: null as Topup | null,
});

const rejectDialog = ref({
    open: false,
    topup: null as Topup | null,
});

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

const getStatusVariant = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
        pending: 'secondary',
        completed: 'default',
        failed: 'destructive',
    };
    return variants[status] || 'secondary';
};

const openApproveDialog = (topup: Topup) => {
    approveDialog.value = { open: true, topup };
};

const handleApprove = () => {
    if (!approveDialog.value.topup) return;

    const approveForm = useForm({});
    approveForm.post(
        approve.url(approveDialog.value.topup.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                approveDialog.value = { open: false, topup: null };
            },
        }
    );
};

const openRejectDialog = (topup: Topup) => {
    rejectDialog.value = { open: true, topup };
};

const handleReject = () => {
    if (!rejectDialog.value.topup) return;

    const rejectForm = useForm({});
    rejectForm.post(
        reject.url(rejectDialog.value.topup.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                rejectDialog.value = { open: false, topup: null };
            },
        }
    );
};

const columns: ColumnDef<Topup>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index = row.index + 1 + (props.topups.current_page - 1) * props.topups.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'customer.name',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => ['Pelanggan', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            );
        },
        cell: ({ row }) => {
            const customer = row.original.customer;
            return h('div', [
                h('div', { class: 'font-medium' }, customer.name),
                h('div', { class: 'text-xs text-muted-foreground' }, customer.email),
            ]);
        },
    },
    {
        accessorKey: 'amount',
        header: () => 'Jumlah',
        cell: ({ row }) => {
            return h('div', { class: 'font-bold' }, formatCurrency(row.getValue('amount')));
        },
    },
    {
        accessorKey: 'payment_method',
        header: () => 'Metode',
        cell: ({ row }) => {
            return h('div', { class: 'uppercase' }, row.getValue('payment_method'));
        },
    },
    {
        accessorKey: 'transaction_ref',
        header: () => 'Referensi',
        cell: ({ row }) => {
            return h('div', { class: 'font-mono text-xs' }, row.getValue('transaction_ref'));
        },
    },
    {
        accessorKey: 'status',
        header: () => 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return h(Badge, { variant: getStatusVariant(status) }, () => status);
        },
    },
    {
        accessorKey: 'notes',
        header: () => 'Keterangan',
        cell: ({ row }) => {
            return h('p', row.getValue('notes'));
        },
    },
    {
        accessorKey: 'created_at',
        header: () => 'Tanggal',
        cell: ({ row }) => {
            return h('div', { class: 'text-sm' }, formatDate(row.getValue('created_at')));
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-right' }, 'Aksi'),
        cell: ({ row }) => {
            const topup = row.original;
            if (topup.status !== 'pending') return null;

            return h('div', { class: 'flex justify-end gap-2' }, [
                h(
                    Button,
                    {
                        size: 'sm',
                        onClick: () => openApproveDialog(topup),
                    },
                    () => [h(Check, { class: 'mr-1 h-4 w-4' }), 'Setujui']
                ),
                h(
                    Button,
                    {
                        size: 'sm',
                        variant: 'destructive',
                        onClick: () => openRejectDialog(topup),
                    },
                    () => [h(X, { class: 'mr-1 h-4 w-4' }), 'Tolak']
                ),
            ]);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.topups.data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
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
    },
    manualSorting: true,
});

watch(
    sorting,
    (newSorting) => {
        if (newSorting.length > 0) {
            router.get(
                '/admin/topups',
                {
                    search: search.value || undefined,
                    status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
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
            '/admin/topups',
            {
                search: search.value || undefined,
                status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
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
    <Head title="Permintaan Top Up" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div>
                <h2 class="text-3xl font-bold tracking-tight">Permintaan Top Up</h2>
                <p class="text-muted-foreground">Kelola permintaan top up saldo dari pelanggan</p>
            </div>

            <TopupStatistics :statistics="statistics" />

            <!-- Filters and Actions -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex flex-1 gap-4">
                    <div class="relative flex-1 max-w-sm">
                        <Search
                            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input v-model="search" placeholder="Cari pelanggan atau referensi..." class="pl-9" />
                    </div>
                    <Select v-model="statusFilter">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" class="ml-auto">
                            Kolom <ChevronDown class="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
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
                            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
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
                                    Tidak ada permintaan topup.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination
                v-if="topups.last_page > 1"
                :data="{
                    current_page: topups.current_page,
                    last_page: topups.last_page,
                    per_page: topups.per_page,
                    from: (topups.current_page - 1) * topups.per_page + 1,
                    to: Math.min(topups.current_page * topups.per_page, topups.total),
                    total: topups.total,
                }"
                url="/admin/topups"
                :filters="{
                    search: search || undefined,
                    status: statusFilter !== 'all' ? statusFilter : undefined,
                    sort_by: sorting[0]?.id || 'created_at',
                    sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                }"
            />
        </div>

        <ConfirmDialog
            v-model:open="approveDialog.open"
            title="Setujui Top Up?"
            :description="`Apakah Anda yakin ingin menyetujui permintaan top up sebesar ${approveDialog.topup ? formatCurrency(approveDialog.topup.amount) : ''} untuk ${approveDialog.topup?.customer.name}?`"
            confirm-text="Setujui"
            cancel-text="Batal"
            @confirm="handleApprove"
        />

        <ConfirmDialog
            v-model:open="rejectDialog.open"
            title="Tolak Top Up?"
            :description="`Apakah Anda yakin ingin menolak permintaan top up sebesar ${rejectDialog.topup ? formatCurrency(rejectDialog.topup.amount) : ''} dari ${rejectDialog.topup?.customer.name}?`"
            confirm-text="Tolak"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleReject"
        />
    </AppLayout>
</template>
