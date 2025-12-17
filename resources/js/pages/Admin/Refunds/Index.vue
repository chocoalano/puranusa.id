<script setup lang="ts">
import { indexRefunds, processRefund } from '@/actions/App/Http/Controllers/Admin/ReturnRefundController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import RefundStatistics from '@/components/refunds/RefundStatistics.vue';
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
import { Head, router, useForm } from '@inertiajs/vue3';
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
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';

interface Refund {
    id: number;
    order: {
        order_no: string;
        customer: {
            name: string;
            email: string;
        };
    };
    amount: number;
    status: string;
    reason: string;
    created_at: string;
}

interface PaginatedRefunds {
    data: Refund[];
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
    total_processing: number;
    total_completed: number;
}

interface Props {
    refunds: PaginatedRefunds;
    statistics: Statistics;
    filters: {
        search?: string;
        status?: string;
        sort_by?: string;
        sort_order?: 'asc' | 'desc';
    };
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Refund',
        href: indexRefunds.url(),
    },
];

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

const processDialog = ref({
    open: false,
    refund: null as Refund | null,
});

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const getStatusVariant = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
        pending: 'secondary',
        processing: 'outline',
        completed: 'default',
    };
    return variants[status] || 'secondary';
};

const openProcessDialog = (refund: Refund) => {
    processDialog.value = { open: true, refund };
};

const handleProcess = () => {
    if (!processDialog.value.refund) return;

    const processForm = useForm({});
    processForm.post(
        processRefund.url(processDialog.value.refund.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                processDialog.value = { open: false, refund: null };
            },
        }
    );
};

const columns: ColumnDef<Refund>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.refunds.current_page - 1) * props.refunds.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'order.order_no',
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
            return h('div', [
                h('div', { class: 'font-medium' }, order.order_no),
                h('div', { class: 'text-xs text-muted-foreground' }, order.customer?.name || 'Unknown'),
            ]);
        },
    },
    {
        accessorKey: 'amount',
        header: () => 'Jumlah',
        cell: ({ row }) => {
            return h('div', { class: 'font-medium' }, formatCurrency(row.getValue('amount')));
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
            return h(Badge, { variant: getStatusVariant(status) }, () => status);
        },
    },
    {
        accessorKey: 'created_at',
        header: () => 'Tanggal',
        cell: ({ row }) => {
            return formatDate(row.getValue('created_at'));
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-right' }, 'Actions'),
        cell: ({ row }) => {
            const refund = row.original;
            if (refund.status === 'completed') return null;

            return h('div', { class: 'flex justify-end gap-2' }, [
                h(
                    Button,
                    {
                        variant: 'default',
                        size: 'sm',
                        onClick: () => openProcessDialog(refund),
                    },
                    () => [h(CheckCircle, { class: 'mr-2 h-4 w-4' }), 'Proses']
                ),
            ]);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.refunds.data;
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
                indexRefunds.url(),
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
            indexRefunds.url(),
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
        <Head title="Refund" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Refund</h1>
                    <p class="text-muted-foreground">Kelola permintaan pengembalian dana</p>
                </div>
            </div>

            <!-- Statistics -->
            <RefundStatistics :statistics="statistics" />

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
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
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
                                    Tidak ada data refund.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination
                v-if="refunds.last_page > 1"
                :data="{
                    current_page: refunds.current_page,
                    last_page: refunds.last_page,
                    per_page: refunds.per_page,
                    from: (refunds.current_page - 1) * refunds.per_page + 1,
                    to: Math.min(refunds.current_page * refunds.per_page, refunds.total),
                    total: refunds.total,
                }"
                :url="indexRefunds.url()"
                :filters="{
                    search: search || undefined,
                    status: statusFilter !== 'all' ? statusFilter : undefined,
                    sort_by: sorting[0]?.id || 'created_at',
                    sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                }"
            />
        </div>

        <!-- Process Dialog -->
        <ConfirmDialog
            v-model:open="processDialog.open"
            title="Proses Refund?"
            :description="`Apakah Anda yakin ingin memproses refund untuk order ${processDialog.refund?.order.order_no} sebesar ${processDialog.refund ? formatCurrency(processDialog.refund.amount) : ''}?`"
            confirm-text="Proses"
            cancel-text="Batal"
            @confirm="handleProcess"
        />
    </AppLayout>
</template>
