<script setup lang="ts">
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
import Pagination from '@/components/Pagination.vue';
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
    CreditCard,
    DollarSign,
    Eye,
    Package,
    Search,
    ShoppingCart,
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';
import { usePermissions } from '@/composables/usePermissions';

interface Order {
    id: number;
    order_number: string;
    customer: {
        name: string;
        email: string;
    };
    total_amount: number;
    status: string;
    payment_status: string;
    created_at: string;
}

interface PaginatedOrders {
    data: Order[];
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
    total_orders: number;
    total_revenue: number;
    total_pending: number;
    total_completed: number;
}

interface Props {
    orders: PaginatedOrders;
    statistics: Statistics;
    filters: {
        search?: string;
        status?: string;
        sort_by: string;
        sort_order: 'asc' | 'desc';
    };
}
const { isSuperAdmin, isAdmin } = usePermissions()
const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Pesanan Dibayar',
        href: '/admin/orders/paid',
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
        processing: 'outline',
        shipped: 'default',
        delivered: 'default',
        cancelled: 'destructive',
        completed: 'default',
    };
    return variants[status] || 'secondary';
};

const columns: ColumnDef<Order>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.orders.current_page - 1) * props.orders.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'order_number',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => ['Order Number', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            );
        },
        cell: ({ row }) => {
            return h('div', [
                h('div', { class: 'font-medium font-mono' }, row.original.order_number),
                h(
                    'div',
                    { class: 'text-xs text-muted-foreground' },
                    row.original.customer.name
                ),
            ]);
        },
    },
    {
        accessorKey: 'total_amount',
        header: () => h('div', { class: 'text-right' }, 'Total'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-right font-medium' },
                () => formatCurrency(row.getValue('total_amount'))
            );
        },
    },
    {
        accessorKey: 'payment_status',
        header: () => 'Payment',
        cell: ({ row }) => {
            const status = row.getValue('payment_status') as string;
            return h(
                Badge,
                { variant: status === 'paid' ? 'default' : 'secondary' },
                () => status
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
        accessorKey: 'created_at',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => ['Tanggal', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
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
            const order = row.original;
            const actions = []
            if (isSuperAdmin || isAdmin) {

                actions.push(h(
                    Link,
                    { href: `/admin/orders/${order.id}` },
                    () =>
                        h(
                            Button,
                            { variant: 'outline', size: 'sm' },
                            () => h(Eye, { class: 'h-4 w-4' })
                        )
                ),)
            }
            return h('div', { class: 'flex justify-end gap-2' }, actions);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.orders.data;
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
                '/admin/orders',
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
            '/admin/orders',
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
        <Head title="Pesanan Dibayar" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Pesanan Dibayar</h1>
                    <p class="text-muted-foreground">Kelola pesanan yang sudah dibayar</p>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Pesanan</CardTitle>
                        <ShoppingCart class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ statistics.total_orders }}</div>
                        <p class="text-xs text-muted-foreground">Semua pesanan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Pendapatan</CardTitle>
                        <DollarSign class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(statistics.total_revenue) }}</div>
                        <p class="text-xs text-muted-foreground">Revenue keseluruhan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Pending</CardTitle>
                        <Package class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ statistics.total_pending }}</div>
                        <p class="text-xs text-muted-foreground">Menunggu pembayaran</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Selesai</CardTitle>
                        <CreditCard class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ statistics.total_completed }}</div>
                        <p class="text-xs text-muted-foreground">Order selesai</p>
                    </CardContent>
                </Card>
            </div>

            <!-- Filters -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex flex-1 gap-4">
                    <div class="relative flex-1 max-w-sm">
                        <Search
                            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input v-model="search" placeholder="Cari nomor order atau nama pelanggan..." class="pl-9" />
                    </div>
                    <Select v-model="statusFilter">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
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
                                    Tidak ada data pesanan.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <Pagination
                v-if="orders.last_page > 1"
                :data="{
                    current_page: orders.current_page,
                    last_page: orders.last_page,
                    per_page: orders.per_page,
                    from: (orders.current_page - 1) * orders.per_page + 1,
                    to: Math.min(orders.current_page * orders.per_page, orders.total),
                    total: orders.total,
                }"
                url="/admin/orders/paid"
                :filters="{
                    search: search || undefined,
                    status: statusFilter !== 'all' ? statusFilter : undefined,
                    sort_by: sorting[0]?.id || 'created_at',
                    sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                }"
            />
        </div>
    </AppLayout>
</template>
