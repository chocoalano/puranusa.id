<script setup lang="ts">
import { index, create, edit, destroy } from '@/actions/App/Http/Controllers/Admin/PromotionManagementController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import PromotionStatistics from '@/components/promotions/PromotionStatistics.vue';
import PromotionFilters from '@/components/promotions/PromotionFilters.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    type RowSelectionState,
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
    Edit,
    Plus,
    Trash2,
} from 'lucide-vue-next';
import { h, ref, watch } from 'vue';

interface Promotion {
    id: number;
    name: string;
    code: string;
    type: string;
    start_at: string;
    end_at: string;
    is_active: boolean;
    priority: number;
    created_at: string;
}

interface PaginatedPromotions {
    data: Promotion[];
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
    total_active: number;
    total_scheduled: number;
    total_expired: number;
}

interface Props {
    promotions: PaginatedPromotions;
    statistics: Statistics;
    filters: {
        search?: string;
        type?: string;
        sort_by: string;
        sort_order: 'asc' | 'desc';
    };
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Promosi & Diskon',
        href: index.url(),
    },
];

const search = ref(props.filters.search || '');
const typeFilter = ref(props.filters.type || 'all');
const sorting = ref<SortingState>([
    {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === 'desc',
    },
]);
const rowSelection = ref<RowSelectionState>({});

const deleteDialog = ref({
    open: false,
    promotion: null as Promotion | null,
});

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getPromotionStatus = (promotion: Promotion) => {
    const now = new Date();
    const start = new Date(promotion.start_at);
    const end = new Date(promotion.end_at);

    if (!promotion.is_active) return { text: 'Inactive', variant: 'secondary' as const };
    if (now < start) return { text: 'Scheduled', variant: 'outline' as const };
    if (now > end) return { text: 'Expired', variant: 'destructive' as const };
    return { text: 'Active', variant: 'default' as const };
};

const openDeleteDialog = (promotion: Promotion) => {
    deleteDialog.value = { open: true, promotion };
};

const handleDelete = () => {
    if (!deleteDialog.value.promotion) return;

    router.delete(destroy.url(deleteDialog.value.promotion.id), {
        preserveScroll: true,
        onSuccess: () => {
            deleteDialog.value = { open: false, promotion: null };
        },
    });
};

const columns: ColumnDef<Promotion>[] = [
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
                row.index + 1 + (props.promotions.current_page - 1) * props.promotions.per_page;
            return h('div', { class: 'font-medium' }, index);
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => [
                    'Nama Promosi',
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
                h('div', { class: 'font-medium' }, row.original.name),
                h(
                    'div',
                    { class: 'text-xs text-muted-foreground' },
                    row.original.type
                ),
            ]);
        },
    },
    {
        accessorKey: 'code',
        header: () => h('div', 'Kode'),
        cell: ({ row }) => {
            return h('div', { class: 'font-mono text-sm' }, row.original.code);
        },
    },
    {
        accessorKey: 'start_at',
        header: () => 'Periode',
        cell: ({ row }) => {
            return h('div', { class: 'text-sm' }, [
                h('div', formatDate(row.original.start_at)),
                h('div', { class: 'text-muted-foreground' }, formatDate(row.original.end_at)),
            ]);
        },
    },
    {
        id: 'status',
        header: () => 'Status',
        cell: ({ row }) => {
            const status = getPromotionStatus(row.original);
            return h(
                Badge,
                { variant: status.variant },
                () => status.text
            );
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-right' }, 'Actions'),
        cell: ({ row }) => {
            const promotion = row.original;
            return h('div', { class: 'flex justify-end gap-2' }, [
                h(
                    Button,
                    {
                        variant: 'outline',
                        size: 'sm',
                        onClick: () => router.visit(edit.url(promotion.id)),
                    },
                    () => h(Edit, { class: 'h-4 w-4' })
                ),
                h(
                    Button,
                    {
                        variant: 'outline',
                        size: 'sm',
                        onClick: () => openDeleteDialog(promotion),
                    },
                    () => h(Trash2, { class: 'h-4 w-4 text-destructive' })
                ),
            ]);
        },
    },
];

const table = useVueTable({
    get data() {
        return props.promotions.data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
        get sorting() {
            return sorting.value;
        },
        get rowSelection() {
            return rowSelection.value;
        },
    },
    onSortingChange: (updaterOrValue) => {
        sorting.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting.value)
                : updaterOrValue;
    },
    onRowSelectionChange: (updaterOrValue) => {
        rowSelection.value =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(rowSelection.value)
                : updaterOrValue;
    },
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
                    type: typeFilter.value !== 'all' ? typeFilter.value : undefined,
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
watch([search, typeFilter], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            index.url(),
            {
                search: search.value || undefined,
                type: typeFilter.value !== 'all' ? typeFilter.value : undefined,
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
        <Head title="Promosi & Diskon" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Promosi & Diskon</h1>
                    <p class="text-muted-foreground">Kelola promosi dan diskon produk</p>
                </div>
                <Link :href="create.url()">
                    <Button>
                        <Plus class="h-4 w-4" />
                        Tambah Promosi
                    </Button>
                </Link>
            </div>

            <!-- Statistics -->
            <PromotionStatistics :statistics="statistics" />

            <!-- Filters -->
            <PromotionFilters
                v-model:search="search"
                v-model:type="typeFilter"
            />

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
                                    Tidak ada data promosi.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination -->
            <div v-if="promotions.last_page > 1" class="flex items-center justify-between">
                <p class="text-sm text-muted-foreground">
                    Menampilkan {{ (promotions.current_page - 1) * promotions.per_page + 1 }} hingga
                    {{ Math.min(promotions.current_page * promotions.per_page, promotions.total) }} dari
                    {{ promotions.total }} hasil
                </p>
                <div class="flex gap-2">
                    <Button variant="outline" size="sm" :disabled="promotions.current_page === 1" as-child>
                        <Link
                            :href="
                                index.url({
                                    query: {
                                        page: 1,
                                        search: search || undefined,
                                        type: typeFilter !== 'all' ? typeFilter : undefined,
                                        sort_by: sorting[0]?.id,
                                        sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                                    },
                                })
                            "
                            :class="{
                                'pointer-events-none opacity-50': promotions.current_page === 1,
                            }"
                            preserve-scroll
                            preserve-state
                        >
                            <ChevronsLeft class="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" :disabled="!promotions.links[0]?.url" as-child>
                        <Link
                            :href="promotions.links[0]?.url || '#'"
                            :class="{
                                'pointer-events-none opacity-50': !promotions.links[0]?.url,
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
                        :disabled="!promotions.links[promotions.links.length - 1]?.url"
                        as-child
                    >
                        <Link
                            :href="promotions.links[promotions.links.length - 1]?.url || '#'"
                            :class="{
                                'pointer-events-none opacity-50':
                                    !promotions.links[promotions.links.length - 1]?.url,
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
                        :disabled="promotions.current_page === promotions.last_page"
                        as-child
                    >
                        <Link
                            :href="
                                index.url({
                                    query: {
                                        page: promotions.last_page,
                                        search: search || undefined,
                                        type: typeFilter !== 'all' ? typeFilter : undefined,
                                        sort_by: sorting[0]?.id,
                                        sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                                    },
                                })
                            "
                            :class="{
                                'pointer-events-none opacity-50':
                                    promotions.current_page === promotions.last_page,
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

        <!-- Delete Dialog -->
        <ConfirmDialog
            v-model:open="deleteDialog.open"
            title="Hapus Promosi?"
            :description="`Apakah Anda yakin ingin menghapus promosi '${deleteDialog.promotion?.name}'? Tindakan ini tidak dapat dibatalkan.`"
            confirm-text="Hapus"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleDelete"
        />
    </AppLayout>
</template>
