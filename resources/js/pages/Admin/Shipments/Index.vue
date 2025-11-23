<script setup lang="ts">
import { index, update } from '@/actions/App/Http/Controllers/Admin/ShipmentManagementController';
import ShipmentStatistics from '@/components/shipments/ShipmentStatistics.vue';
import UpdateShipmentDialog from '@/components/shipments/UpdateShipmentDialog.vue';
import Pagination from '@/components/Pagination.vue';
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
    ChevronDown,
    Edit,
    Search,
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';

interface Shipment {
    id: number;
    order: {
        id: number;
        order_number: string;
        customer: {
            name: string;
            email: string;
        };
    };
    tracking_number: string | null;
    courier: string;
    status: string;
    shipped_at: string | null;
    delivered_at: string | null;
    created_at: string;
}

interface PaginatedShipments {
    data: Shipment[];
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
    total_shipped: number;
    total_delivered: number;
}

interface Props {
    shipments: PaginatedShipments;
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
        title: 'Pengiriman',
        href: index.url(),
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

const updateDialog = ref({
    open: false,
    shipment: null as Shipment | null,
});

const trackingNumber = ref('');
const statusUpdate = ref('');
const processing = ref(false);

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
        shipped: 'default',
        delivered: 'outline',
        cancelled: 'destructive',
    };
    return variants[status] || 'secondary';
};

const openUpdateDialog = (shipment: Shipment) => {
    updateDialog.value = { open: true, shipment };
    trackingNumber.value = shipment.tracking_number || '';
    statusUpdate.value = shipment.status;
};

const handleUpdate = () => {
    if (!updateDialog.value.shipment) return;

    processing.value = true;
    router.put(
        update.url(updateDialog.value.shipment.id),
        {
            tracking_no: trackingNumber.value,
            status: statusUpdate.value,
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                updateDialog.value = { open: false, shipment: null };
                trackingNumber.value = '';
                statusUpdate.value = '';
            },
            onFinish: () => {
                processing.value = false;
            },
        }
    );
};

const columns: ColumnDef<Shipment>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.shipments.current_page - 1) * props.shipments.per_page;
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
        accessorKey: 'courier',
        header: () => 'Kurir',
        cell: ({ row }) => {
            return h('div', { class: 'font-medium uppercase' }, row.getValue('courier'));
        },
    },
    {
        accessorKey: 'tracking_number',
        header: () => 'Resi',
        cell: ({ row }) => {
            const tracking = row.getValue('tracking_number');
            return h(
                'div',
                { class: 'font-mono text-sm' },
                () => tracking || '-'
            );
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
        accessorKey: 'shipped_at',
        header: () => 'Tanggal Kirim',
        cell: ({ row }) => {
            return formatDate(row.getValue('shipped_at'));
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-right' }, 'Actions'),
        cell: ({ row }) => {
            const shipment = row.original;
            return h('div', { class: 'flex justify-end gap-2' }, [
                h(
                    Button,
                    {
                        variant: 'outline',
                        size: 'sm',
                        onClick: () => openUpdateDialog(shipment),
                    },
                    () => h(Edit, { class: 'h-4 w-4' })
                ),
            ]);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.shipments.data;
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
                index.url(),
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
            index.url(),
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
        <Head title="Pengiriman" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Pengiriman</h1>
                    <p class="text-muted-foreground">Kelola pengiriman pesanan</p>
                </div>
            </div>

            <!-- Statistics -->
            <ShipmentStatistics :statistics="statistics" />

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
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
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
                                    Tidak ada data pengiriman.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination
                v-if="shipments.last_page > 1"
                :data="{
                    current_page: shipments.current_page,
                    last_page: shipments.last_page,
                    per_page: shipments.per_page,
                    from: (shipments.current_page - 1) * shipments.per_page + 1,
                    to: Math.min(shipments.current_page * shipments.per_page, shipments.total),
                    total: shipments.total,
                }"
                :url="index.url()"
                :filters="{
                    search: search || undefined,
                    status: statusFilter !== 'all' ? statusFilter : undefined,
                    sort_by: sorting[0]?.id || 'created_at',
                    sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                }"
            />
        </div>

        <!-- Update Dialog -->
        <UpdateShipmentDialog
            v-model:open="updateDialog.open"
            v-model:tracking-number="trackingNumber"
            v-model:status="statusUpdate"
            :shipment="updateDialog.shipment"
            :processing="processing"
            @submit="handleUpdate"
        />
    </AppLayout>
</template>
