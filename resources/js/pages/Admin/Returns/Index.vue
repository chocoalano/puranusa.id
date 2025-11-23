<script setup lang="ts">
import { indexReturns, approveReturn, rejectReturn } from '@/actions/App/Http/Controllers/Admin/ReturnRefundController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import ReturnStatistics from '@/components/returns/ReturnStatistics.vue';
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
import { Head, router } from '@inertiajs/vue3';
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
    CheckCircle,
    ChevronDown,
    Search,
    XCircle,
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';

interface Return {
    id: number;
    order: {
        order_number: string;
        customer: {
            name: string;
            email: string;
        };
    };
    reason: string;
    status: string;
    requested_at: string;
    processed_at: string | null;
    created_at: string;
}

interface PaginatedReturns {
    data: Return[];
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
    total_approved: number;
    total_rejected: number;
}

interface Props {
    returns: PaginatedReturns;
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
    {
        title: 'Retur & Refund',
        href: indexReturns.url(),
    },
];

const search = ref(props.filters.search || '');
const statusFilter = ref(props.filters.status || 'all');
const sorting = ref<SortingState>([
    {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === 'desc',
    },
]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});

const approveDialog = ref({
    open: false,
    return: null as Return | null,
});

const rejectDialog = ref({
    open: false,
    return: null as Return | null,
});

const formatDate = (date: string | null) => {
    if (!date) return '-';
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
        approved: 'default',
        rejected: 'destructive',
    };
    return variants[status] || 'secondary';
};

const openApproveDialog = (returnItem: Return) => {
    approveDialog.value = { open: true, return: returnItem };
};

const handleApprove = () => {
    if (!approveDialog.value.return) return;

    router.post(
        approveReturn.url(approveDialog.value.return.id),
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                approveDialog.value = { open: false, return: null };
            },
        }
    );
};

const openRejectDialog = (returnItem: Return) => {
    rejectDialog.value = { open: true, return: returnItem };
};

const handleReject = () => {
    if (!rejectDialog.value.return) return;

    router.post(
        rejectReturn.url(rejectDialog.value.return.id),
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                rejectDialog.value = { open: false, return: null };
            },
        }
    );
};

const columns: ColumnDef<Return>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.returns.current_page - 1) * props.returns.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'order.order_number',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => ['Order', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            );
        },
        cell: ({ row }) => {
            const order = row.original.order;
            if (!order) {
                return h('div', { class: 'text-muted-foreground' }, 'N/A');
            }
            return h('div', [
                h('div', { class: 'font-medium' }, order.order_number),
                h(
                    'div',
                    { class: 'text-xs text-muted-foreground' },
                    order.customer?.name || 'Unknown'
                ),
            ]);
        },
    },
    {
        accessorKey: 'reason',
        header: () => 'Alasan',
        cell: ({ row }) => {
            return h('div', { class: 'max-w-xs truncate' }, row.getValue('reason'));
        },
    },
    {
        accessorKey: 'status',
        header: () => 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return h(
                Badge,
                { variant: getStatusVariant(status) },
                () => status
            );
        },
    },
    {
        accessorKey: 'requested_at',
        header: () => 'Tanggal Permintaan',
        cell: ({ row }) => {
            return formatDate(row.getValue('requested_at'));
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-right' }, 'Actions'),
        cell: ({ row }) => {
            const returnItem = row.original;
            if (returnItem.status !== 'pending') return null;

            return h('div', { class: 'flex justify-end gap-2' }, [
                h(
                    Button,
                    {
                        variant: 'default',
                        size: 'sm',
                        onClick: () => openApproveDialog(returnItem),
                    },
                    () => h(CheckCircle, { class: 'h-4 w-4' })
                ),
                h(
                    Button,
                    {
                        variant: 'destructive',
                        size: 'sm',
                        onClick: () => openRejectDialog(returnItem),
                    },
                    () => h(XCircle, { class: 'h-4 w-4' })
                ),
            ]);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.returns.data;
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
                indexReturns.url(),
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
            indexReturns.url(),
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
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Retur & Refund" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Retur & Refund</h1>
                    <p class="text-muted-foreground">Kelola permintaan retur produk</p>
                </div>
            </div>

            <!-- Statistics -->
            <ReturnStatistics :statistics="statistics" />

            <!-- Filters and Actions -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex flex-1 gap-4">
                    <div class="relative flex-1 max-w-sm">
                        <Search
                            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input v-model="search" placeholder="Cari order atau customer..." class="pl-9" />
                    </div>
                    <Select v-model="statusFilter">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
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
                                    Tidak ada data retur.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination
                v-if="returns.last_page > 1"
                :data="{
                    current_page: returns.current_page,
                    last_page: returns.last_page,
                    per_page: returns.per_page,
                    from: (returns.current_page - 1) * returns.per_page + 1,
                    to: Math.min(returns.current_page * returns.per_page, returns.total),
                    total: returns.total,
                }"
                :url="indexReturns.url()"
                :filters="{
                    search: search || undefined,
                    status: statusFilter !== 'all' ? statusFilter : undefined,
                    sort_by: sorting[0]?.id || 'created_at',
                    sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                }"
            />
        </div>

        <!-- Approve Dialog -->
        <ConfirmDialog
            v-model:open="approveDialog.open"
            title="Setujui Retur?"
            :description="`Apakah Anda yakin ingin menyetujui permintaan retur untuk order ${approveDialog.return?.order.order_number}?`"
            confirm-text="Setujui"
            cancel-text="Batal"
            @confirm="handleApprove"
        />

        <!-- Reject Dialog -->
        <ConfirmDialog
            v-model:open="rejectDialog.open"
            title="Tolak Retur?"
            :description="`Apakah Anda yakin ingin menolak permintaan retur untuk order ${rejectDialog.return?.order.order_number}?`"
            confirm-text="Tolak"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleReject"
        />
    </AppLayout>
</template>
