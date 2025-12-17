<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { approve, reject } from '@/actions/App/Http/Controllers/Admin/WithdrawalManagementController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import WithdrawalStatistics from '@/components/withdrawals/WithdrawalStatistics.vue';
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

interface Withdrawal {
    id: number;
    customer: { name: string; email: string; ewallet_saldo: number };
    amount: number;
    status: string;
    transaction_ref: string;
    notes: string | null;
    created_at: string;
}

interface PaginatedWithdrawals {
    data: Withdrawal[];
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
    withdrawals: PaginatedWithdrawals;
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
    withdrawal: null as Withdrawal | null,
});

const rejectDialog = ref({
    open: false,
    withdrawal: null as Withdrawal | null,
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

const getBankInfo = (notes: string | null) => {
    if (!notes) return null;
    try {
        return JSON.parse(notes);
    } catch {
        return null;
    }
};

const openApproveDialog = (withdrawal: Withdrawal) => {
    approveDialog.value = { open: true, withdrawal };
};

const handleApprove = () => {
    if (!approveDialog.value.withdrawal) return;

    const approveForm = useForm({});
    approveForm.post(
        approve.url(approveDialog.value.withdrawal.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                approveDialog.value = { open: false, withdrawal: null };
            },
        }
    );
};

const openRejectDialog = (withdrawal: Withdrawal) => {
    rejectDialog.value = { open: true, withdrawal };
};

const handleReject = () => {
    if (!rejectDialog.value.withdrawal) return;

    const rejectForm = useForm({});
    rejectForm.post(
        reject.url(rejectDialog.value.withdrawal.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                rejectDialog.value = { open: false, withdrawal: null };
            },
        }
    );
};

const columns: ColumnDef<Withdrawal>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index = row.index + 1 + (props.withdrawals.current_page - 1) * props.withdrawals.per_page;
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
        accessorKey: 'customer.ewallet_saldo',
        header: () => 'Saldo',
        cell: ({ row }) => {
            return h('div', formatCurrency(row.original.customer.ewallet_saldo));
        },
    },
    {
        accessorKey: 'amount',
        header: () => 'Penarikan',
        cell: ({ row }) => {
            return h('div', { class: 'font-bold text-red-600' }, formatCurrency(row.getValue('amount')));
        },
    },
    {
        accessorKey: 'notes',
        header: () => 'Rekening Tujuan',
        cell: ({ row }) => {
            const bankInfo = getBankInfo(row.getValue('notes'));
            if (!bankInfo) return h('div', { class: 'text-xs text-muted-foreground' }, '-');
            return h('div', [
                h('div', { class: 'text-xs font-medium' }, `${bankInfo.bank_name} - ${bankInfo.bank_account}`),
                h('div', { class: 'text-xs text-muted-foreground' }, bankInfo.bank_holder),
            ]);
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
            const withdrawal = row.original;
            if (withdrawal.status !== 'pending') return null;

            const isDisabled = withdrawal.customer.ewallet_saldo < withdrawal.amount;

            return h('div', { class: 'flex justify-end gap-2' }, [
                h(
                    Button,
                    {
                        size: 'sm',
                        onClick: () => openApproveDialog(withdrawal),
                        disabled: isDisabled,
                    },
                    () => [h(Check, { class: 'mr-1 h-4 w-4' }), 'Setujui']
                ),
                h(
                    Button,
                    {
                        size: 'sm',
                        variant: 'destructive',
                        onClick: () => openRejectDialog(withdrawal),
                    },
                    () => [h(X, { class: 'mr-1 h-4 w-4' }), 'Tolak']
                ),
            ]);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.withdrawals.data;
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
                '/admin/withdrawals',
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
            '/admin/withdrawals',
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
    <Head title="Permintaan Withdrawal" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div>
                <h2 class="text-3xl font-bold tracking-tight">Permintaan Withdrawal</h2>
                <p class="text-muted-foreground">Kelola permintaan penarikan saldo dari pelanggan</p>
            </div>

            <!-- Statistics -->
            <WithdrawalStatistics :statistics="statistics" />

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
                                    Tidak ada permintaan withdrawal.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination
                v-if="withdrawals.last_page > 1"
                :data="{
                    current_page: withdrawals.current_page,
                    last_page: withdrawals.last_page,
                    per_page: withdrawals.per_page,
                    from: (withdrawals.current_page - 1) * withdrawals.per_page + 1,
                    to: Math.min(withdrawals.current_page * withdrawals.per_page, withdrawals.total),
                    total: withdrawals.total,
                }"
                url="/admin/withdrawals"
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
            title="Setujui Withdrawal?"
            :description="`Apakah Anda yakin ingin menyetujui permintaan withdrawal sebesar ${approveDialog.withdrawal ? formatCurrency(approveDialog.withdrawal.amount) : ''} untuk ${approveDialog.withdrawal?.customer.name}? Dana akan ditransfer via Midtrans ke rekening tujuan.`"
            confirm-text="Setujui & Transfer"
            cancel-text="Batal"
            @confirm="handleApprove"
        />

        <ConfirmDialog
            v-model:open="rejectDialog.open"
            title="Tolak Withdrawal?"
            :description="`Apakah Anda yakin ingin menolak permintaan withdrawal sebesar ${rejectDialog.withdrawal ? formatCurrency(rejectDialog.withdrawal.amount) : ''} dari ${rejectDialog.withdrawal?.customer.name}?`"
            confirm-text="Tolak"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleReject"
        />
    </AppLayout>
</template>
