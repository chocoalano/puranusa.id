<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUpDown,
    ChevronUp,
    Search,
    ShoppingCart,
    Package,
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';

interface Cart {
    id: number;
    customer: {
        name: string;
        email: string;
    };
    product: {
        name: string;
        price: number;
    };
    quantity: number;
    created_at: string;
}

interface PaginatedCarts {
    data: Cart[];
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
    total_carts: number;
    total_items: number;
    total_value: number;
}

interface Props {
    carts: PaginatedCarts;
    statistics: Statistics;
    filters: {
        search?: string;
        sort_by: string;
        sort_order: 'asc' | 'desc';
    };
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Keranjang Pelanggan',
        href: '/admin/carts',
    },
];

const search = ref(props.filters.search || '');
const sorting = ref<SortingState>([
    {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === 'desc',
    },
]);

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

const columns: ColumnDef<Cart>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index =
                row.index + 1 + (props.carts.current_page - 1) * props.carts.per_page;
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
                () => [
                    'Pelanggan',
                    h(
                        column.getIsSorted() === 'asc'
                            ? ChevronUp
                            : column.getIsSorted() === 'desc'
                              ? ChevronDown
                              : ChevronsUpDown,
                        {
                            class: 'ml-2 h-4 w-4',
                        }
                    ),
                ]
            );
        },
        cell: ({ row }) => {
            return h('div', [
                h('div', { class: 'font-medium' }, row.original.customer.name),
                h(
                    'div',
                    { class: 'text-xs text-muted-foreground' },
                    row.original.customer.email
                ),
            ]);
        },
    },
    {
        accessorKey: 'product.name',
        header: () => 'Produk',
        cell: ({ row }) => {
            return h('div', { class: 'max-w-xs truncate' }, row.original.product.name);
        },
    },
    {
        accessorKey: 'quantity',
        header: () => h('div', { class: 'text-center' }, 'Qty'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-center font-medium' },
                () => row.getValue('quantity')
            );
        },
    },
    {
        id: 'subtotal',
        header: () => h('div', { class: 'text-right' }, 'Subtotal'),
        cell: ({ row }) => {
            const subtotal = row.original.product.price * row.original.quantity;
            return h(
                'div',
                { class: 'text-right font-medium' },
                () => formatCurrency(subtotal)
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
                    'Ditambahkan',
                    h(
                        column.getIsSorted() === 'asc'
                            ? ChevronUp
                            : column.getIsSorted() === 'desc'
                              ? ChevronDown
                              : ChevronsUpDown,
                        {
                            class: 'ml-2 h-4 w-4',
                        }
                    ),
                ]
            );
        },
        cell: ({ row }) => {
            return formatDate(row.getValue('created_at'));
        },
    },
];

const table = useVueTable({
    get data() {
        return props.carts.data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
        get sorting() {
            return sorting.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting.value)
                : updaterOrValue;
    },
    manualSorting: true,
});

watch(
    sorting,
    (newSorting) => {
        if (newSorting.length > 0) {
            router.get(
                '/admin/carts',
                {
                    search: search.value || undefined,
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
watch(search, () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            '/admin/carts',
            {
                search: search.value || undefined,
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
        <Head title="Keranjang Pelanggan" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Keranjang Pelanggan</h1>
                    <p class="text-muted-foreground">Monitor keranjang belanja pelanggan</p>
                </div>
            </div>

            <!-- Statistics -->
            <div class="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Keranjang</CardTitle>
                        <ShoppingCart class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ statistics.total_carts }}</div>
                        <p class="text-xs text-muted-foreground">Aktif</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Item</CardTitle>
                        <Package class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ statistics.total_items }}</div>
                        <p class="text-xs text-muted-foreground">Produk di keranjang</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Nilai Total</CardTitle>
                        <ShoppingCart class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(statistics.total_value) }}</div>
                        <p class="text-xs text-muted-foreground">Potential revenue</p>
                    </CardContent>
                </Card>
            </div>

            <!-- Search -->
            <div class="flex items-center gap-4">
                <div class="relative flex-1">
                    <Search
                        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input v-model="search" placeholder="Cari pelanggan atau produk..." class="pl-9" />
                </div>
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
                                    Tidak ada data keranjang.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <div v-if="carts.last_page > 1" class="flex items-center justify-between">
                <p class="text-sm text-muted-foreground">
                    Menampilkan {{ (carts.current_page - 1) * carts.per_page + 1 }} hingga
                    {{ Math.min(carts.current_page * carts.per_page, carts.total) }} dari
                    {{ carts.total }} hasil
                </p>
                <div class="flex gap-2">
                    <Button variant="outline" size="sm" :disabled="carts.current_page === 1" as-child>
                        <Link
                            href="/admin/carts"
                            :data="{
                                page: 1,
                                search: search || undefined,
                                sort_by: sorting[0]?.id,
                                sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                            }"
                            :class="{
                                'pointer-events-none opacity-50': carts.current_page === 1,
                            }"
                            preserve-scroll
                            preserve-state
                        >
                            <ChevronsLeft class="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" :disabled="!carts.links[0]?.url" as-child>
                        <Link
                            :href="carts.links[0]?.url || '#'"
                            :class="{
                                'pointer-events-none opacity-50': !carts.links[0]?.url,
                            }"
                            preserve-scroll
                            preserve-state
                        >
                            <ChevronLeft class="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="!carts.links[carts.links.length - 1]?.url"
                        as-child
                    >
                        <Link
                            :href="carts.links[carts.links.length - 1]?.url || '#'"
                            :class="{
                                'pointer-events-none opacity-50':
                                    !carts.links[carts.links.length - 1]?.url,
                            }"
                            preserve-scroll
                            preserve-state
                        >
                            <ChevronRight class="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        :disabled="carts.current_page === carts.last_page"
                        as-child
                    >
                        <Link
                            href="/admin/carts"
                            :data="{
                                page: carts.last_page,
                                search: search || undefined,
                                sort_by: sorting[0]?.id,
                                sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                            }"
                            :class="{
                                'pointer-events-none opacity-50':
                                    carts.current_page === carts.last_page,
                            }"
                            preserve-scroll
                            preserve-state
                        >
                            <ChevronsRight class="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
