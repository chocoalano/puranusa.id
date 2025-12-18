<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { debounce } from 'lodash-es';
import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    type ColumnDef,
} from '@tanstack/vue-table';
import { h } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    ArrowUpDown,
    Pencil,
    Plus,
    Search,
    Trash2,
    MapPin,
    Store,
} from 'lucide-vue-next';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import { index, create, edit, destroy } from '@/actions/App/Http/Controllers/Admin/StockistController';
import { toast } from 'vue-sonner';

interface Stockist {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    ewallet_id: string;
    stockist_kabupaten_id: number | null;
    stockist_kabupaten_name: string | null;
    stockist_province_id: number | null;
    stockist_province_name: string | null;
    status: number;
    created_at: string;
}

interface Province {
    id: number;
    name: string;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    stockists: {
        data: Stockist[];
    } & PaginationData;
    filters: {
        search?: string;
        kabupaten_id?: string;
        province_id?: string;
        sort_by?: string;
        sort_order?: string;
        per_page?: number;
    };
    provinces: Province[];
}

const props = defineProps<Props>();

const search = ref(props.filters.search || '');
const sortBy = ref(props.filters.sort_by || 'created_at');
const sortOrder = ref(props.filters.sort_order || 'desc');
const perPage = ref(props.filters.per_page || 10);

// Delete stockist action
const deleteStockist = (id: number) => {
    router.delete(destroy.url(id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Status stokist berhasil dihapus');
        },
        onError: () => {
            toast.error('Gagal menghapus status stokist');
        },
    });
};

// Dialog state
const deleteDialog = ref({
    open: false,
    data: null as Stockist | null,
});

const openDeleteDialog = (stockist: Stockist) => {
    deleteDialog.value = {
        open: true,
        data: stockist,
    };
};

const performSearch = debounce(() => {
    router.get(
        index.url(),
        {
            search: search.value,
            sort_by: sortBy.value,
            sort_order: sortOrder.value,
            per_page: perPage.value,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
}, 300);

const handleSort = (column: string) => {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = column;
        sortOrder.value = 'asc';
    }
    performSearch();
};

const handleDelete = () => {
    if (deleteDialog.value.data) {
        deleteStockist(deleteDialog.value.data.id);
    }
};

const getStatusBadge = (status: number) => {
    switch (status) {
        case 1:
            return { label: 'Aktif', variant: 'default' as const };
        case 2:
            return { label: 'Pasif', variant: 'secondary' as const };
        case 3:
            return { label: 'Prospek', variant: 'outline' as const };
        default:
            return { label: 'Unknown', variant: 'outline' as const };
    }
};

const columns: ColumnDef<Stockist>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'text-left' }, 'No'),
        cell: ({ row }) => {
            const indexNum = row.index + 1 + (props.stockists.current_page - 1) * props.stockists.per_page;
            return h('div', { class: 'text-left' }, indexNum.toString());
        },
    },
    {
        accessorKey: 'ewallet_id',
        header: () =>
            h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => handleSort('ewallet_id'),
                },
                () => ['Ewallet ID', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            ),
        cell: ({ row }) =>
            h('div', { class: 'font-mono text-sm' }, row.getValue('ewallet_id')),
    },
    {
        accessorKey: 'name',
        header: () =>
            h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => handleSort('name'),
                },
                () => ['Nama Stokist', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            ),
        cell: ({ row }) =>
            h('div', { class: 'flex items-center gap-2' }, [
                h(Store, { class: 'h-4 w-4 text-primary' }),
                h('span', {}, row.getValue('name')),
            ]),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => h('div', { class: 'text-sm' }, row.getValue('email')),
    },
    {
        accessorKey: 'phone',
        header: 'Telepon',
        cell: ({ row }) => {
            const phone = row.getValue('phone') as string | null;
            return h('div', { class: 'text-sm' }, phone || '-');
        },
    },
    {
        accessorKey: 'stockist_kabupaten_name',
        header: () =>
            h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => handleSort('stockist_kabupaten_name'),
                },
                () => ['Kabupaten/Kota', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            ),
        cell: ({ row }) => {
            const kabupaten = row.getValue('stockist_kabupaten_name') as string | null;
            if (!kabupaten) return h('div', { class: 'text-muted-foreground' }, '-');
            return h('div', { class: 'flex items-center gap-2' }, [
                h(MapPin, { class: 'h-4 w-4 text-muted-foreground' }),
                h('span', {}, kabupaten),
            ]);
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as number;
            const { label, variant } = getStatusBadge(status);
            return h(Badge, { variant }, () => label);
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-center' }, 'Aksi'),
        cell: ({ row }) => {
            const stockist = row.original;
            return h('div', { class: 'flex items-center justify-center gap-2' }, [
                h(
                    Link,
                    {
                        href: edit.url(stockist.id),
                    },
                    () =>
                        h(
                            Button,
                            { variant: 'ghost', size: 'icon', title: 'Edit Kabupaten' },
                            () => h(Pencil, { class: 'h-4 w-4' })
                        )
                ),
                h(
                    Button,
                    {
                        variant: 'ghost',
                        size: 'icon',
                        onClick: () => openDeleteDialog(stockist),
                        title: 'Hapus Status Stokist',
                    },
                    () => h(Trash2, { class: 'h-4 w-4 text-destructive' })
                ),
            ]);
        },
    },
];

const tableData = computed(() => props.stockists.data);

const table = useVueTable({
    get data() {
        return tableData.value;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
});
</script>

<template>
    <AppLayout>
        <Head title="Kelola Stokist" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Kelola Stokist</h1>
                    <p class="text-muted-foreground">
                        Kelola data stokist berdasarkan kabupaten/kota. Setiap kabupaten/kota hanya dapat memiliki 1 stokist.
                    </p>
                </div>
                <Link :href="create.url()">
                    <Button>
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Stokist
                    </Button>
                </Link>
            </div>

            <div class="mb-4 flex items-center gap-4">
                <div class="relative flex-1">
                    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        v-model="search"
                        placeholder="Cari nama, email, telepon, ewallet ID, atau kabupaten..."
                        class="pl-10"
                        @input="performSearch"
                    />
                </div>
            </div>

            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow
                            v-for="headerGroup in table.getHeaderGroups()"
                            :key="headerGroup.id"
                        >
                            <TableHead
                                v-for="header in headerGroup.headers"
                                :key="header.id"
                            >
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
                                <TableCell
                                    v-for="cell in row.getVisibleCells()"
                                    :key="cell.id"
                                >
                                    <FlexRender
                                        :render="cell.column.columnDef.cell"
                                        :props="cell.getContext()"
                                    />
                                </TableCell>
                            </TableRow>
                        </template>
                        <template v-else>
                            <TableRow>
                                <TableCell
                                    :colspan="columns.length"
                                    class="h-24 text-center"
                                >
                                    <div class="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Store class="h-8 w-8" />
                                        <span>Belum ada stokist terdaftar.</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <Pagination
                :data="stockists"
                :url="index.url()"
                :filters="{
                    search: search,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                    per_page: perPage,
                }"
            />
        </div>

        <!-- Delete Dialog -->
        <ConfirmDialog
            v-model:open="deleteDialog.open"
            title="Hapus Status Stokist?"
            :description="`Apakah Anda yakin ingin menghapus status stokist dari ${deleteDialog.data?.name}? Pelanggan ini akan tetap ada namun tidak lagi menjadi stokist untuk ${deleteDialog.data?.stockist_kabupaten_name}.`"
            confirm-text="Hapus"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleDelete"
        />
    </AppLayout>
</template>
