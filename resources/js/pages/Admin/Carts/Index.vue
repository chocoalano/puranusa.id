<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import AppLayout from '@/layouts/AppLayout.vue'
import type { BreadcrumbItem } from '@/types'
import { Head, Link, router } from '@inertiajs/vue3'
import {
    FlexRender,
    getCoreRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnDef,
    type SortingState,
} from '@tanstack/vue-table'
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
} from 'lucide-vue-next'
import { computed, h, ref, toRefs, watch } from 'vue'

type CartRow = {
    id: number

    // kemungkinan nested relation
    customer?: { name: string; email: string } | null
    product?: { name: string; price?: number; base_price?: number } | null

    // kemungkinan flattened dari backend
    customer_name?: string | null
    customer_email?: string | null
    product_name?: string | null
    product_price?: number | null

    // qty kadang qty / quantity
    quantity?: number | null
    qty?: number | null

    created_at?: string | null
}

interface PaginatedCarts {
    data: CartRow[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    links: Array<{ url: string | null; label: string; active: boolean }>
}

interface Statistics {
    total_carts: number
    total_items: number
    total_value: number
}

interface Props {
    carts: PaginatedCarts
    statistics: Statistics
    filters: {
        search?: string
        sort_by: string
        sort_order: 'asc' | 'desc'
    }
}

const props = defineProps<Props>()
const { carts, statistics, filters } = toRefs(props)

const baseUrl = '/admin/carts'

const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Keranjang Pelanggan', href: baseUrl },
]

const search = ref(filters.value.search || '')
const sorting = ref<SortingState>([
    {
        id: filters.value.sort_by || 'created_at',
        desc: filters.value.sort_order === 'desc',
    },
])

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount)

const formatDate = (date?: string | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

// helper aman untuk beda shape data
const getCustomerName = (c: CartRow) => c.customer?.name ?? c.customer_name ?? '-'
const getCustomerEmail = (c: CartRow) => c.customer?.email ?? c.customer_email ?? '-'
const getProductName = (c: CartRow) => c.product?.name ?? c.product_name ?? '-'
const getPrice = (c: CartRow) =>
    (c.product?.price ?? c.product?.base_price ?? c.product_price ?? 0) as number
const getQty = (c: CartRow) => (c.quantity ?? c.qty ?? 0) as number

// pagination prev/next yang lebih aman (Laravel label kadang html entity)
const prevUrl = computed(() => {
    const l = carts.value.links.find((x) => /prev|previous|&laquo;/i.test(x.label))
    return l?.url ?? null
})
const nextUrl = computed(() => {
    const l = carts.value.links.find((x) => /next|&raquo;/i.test(x.label))
    return l?.url ?? null
})

const columns: ColumnDef<CartRow>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index = row.index + 1 + (carts.value.current_page - 1) * carts.value.per_page
            return h('div', { class: 'font-medium' }, String(index))
        },
    },
    {
        id: 'customer_name', // penting: id dipakai untuk query sort_by
        header: ({ column }) =>
            h(
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
                        { class: 'ml-2 h-4 w-4' },
                    ),
                ],
            ),
        accessorFn: (row) => getCustomerName(row),
        cell: ({ row }) => {
            const name = getCustomerName(row.original)
            const email = getCustomerEmail(row.original)
            return h('div', [
                h('div', { class: 'font-medium' }, name),
                h('div', { class: 'text-xs text-muted-foreground' }, email),
            ])
        },
    },
    {
        id: 'product_name',
        header: () => 'Produk',
        accessorFn: (row) => getProductName(row),
        cell: ({ row }) => h('div', { class: 'max-w-xs truncate' }, getProductName(row.original)),
    },
    {
        id: 'quantity',
        header: () => h('div', { class: 'text-center' }, 'Qty'),
        accessorFn: (row) => getQty(row),
        cell: ({ row }) => h('div', { class: 'text-center font-medium' }, String(getQty(row.original))),
    },
    {
        id: 'subtotal',
        header: () => h('div', { class: 'text-right' }, 'Subtotal'),
        accessorFn: (row) => getPrice(row) * getQty(row),
        cell: ({ row }) => {
            const subtotal = getPrice(row.original) * getQty(row.original)
            return h('div', { class: 'text-right font-medium' }, formatCurrency(subtotal))
        },
    },
    {
        id: 'created_at',
        header: ({ column }) =>
            h(
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
                        { class: 'ml-2 h-4 w-4' },
                    ),
                ],
            ),
        accessorFn: (row) => row.created_at ?? null,
        cell: ({ row }) => formatDate(row.original.created_at),
    },
]

const table = useVueTable({
    get data() {
        return carts.value.data
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
        get sorting() {
            return sorting.value
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
    },
    manualSorting: true,
})

watch(
    sorting,
    (newSorting) => {
        if (!newSorting.length) return
        router.get(
            baseUrl,
            {
                page: 1,
                search: search.value || undefined,
                sort_by: newSorting[0].id,
                sort_order: newSorting[0].desc ? 'desc' : 'asc',
            },
            { preserveState: true, preserveScroll: true },
        )
    },
    { deep: true },
)

let searchTimeout: ReturnType<typeof setTimeout>
watch(search, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        router.get(
            baseUrl,
            {
                page: 1,
                search: search.value || undefined,
                sort_by: sorting.value[0]?.id || 'created_at',
                sort_order: sorting.value[0]?.desc ? 'desc' : 'asc',
            },
            { preserveState: true, preserveScroll: true },
        )
    }, 300)
})

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
                    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input v-model="search" placeholder="Cari pelanggan atau produk..." class="pl-9" />
                </div>
            </div>

            <!-- Table -->
            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                            <TableHead v-for="header in headerGroup.headers" :key="header.id">
                                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                    :props="header.getContext()" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <template v-if="table.getRowModel().rows?.length">
                            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
                                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
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
                        <Link :href="baseUrl" :data="{
                            page: 1,
                            search: search || undefined,
                            sort_by: sorting[0]?.id || 'created_at',
                            sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                        }" preserve-scroll preserve-state>
                            <ChevronsLeft class="h-4 w-4" />
                        </Link>
                    </Button>

                    <Button variant="outline" size="sm" :disabled="!prevUrl" as-child>
                        <Link :href="prevUrl || '#'" preserve-scroll preserve-state>
                            <ChevronLeft class="h-4 w-4" />
                        </Link>
                    </Button>

                    <Button variant="outline" size="sm" :disabled="!nextUrl" as-child>
                        <Link :href="nextUrl || '#'" preserve-scroll preserve-state>
                            <ChevronRight class="h-4 w-4" />
                        </Link>
                    </Button>

                    <Button variant="outline" size="sm" :disabled="carts.current_page === carts.last_page" as-child>
                        <Link :href="baseUrl" :data="{
                            page: carts.last_page,
                            search: search || undefined,
                            sort_by: sorting[0]?.id || 'created_at',
                            sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                        }" preserve-scroll preserve-state>
                            <ChevronsRight class="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
