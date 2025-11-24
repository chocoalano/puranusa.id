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
    Eye,
    Pencil,
    Plus,
    Search,
    Trash2,
    LogIn,
} from 'lucide-vue-next';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import { index, show, edit, create, destroy } from '@/actions/App/Http/Controllers/Admin/CustomerController';
import { toast } from 'vue-sonner';

// Login as customer action
const loginAsCustomer = (id: number, name: string) => {
    router.post(`/admin/manage/customers/${id}/login-as`, {}, {
        onSuccess: () => {
            toast.success(`Login sebagai ${name}`);
        },
        onError: () => {
            toast.error('Gagal login sebagai customer');
        },
    });
};

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    ewallet_id: string;
    ewallet_saldo: number;
    email_verified_at: string | null;
    created_at: string;
    sponsor_id: number | null;
    upline_id: number | null;
    position: string | null;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    customers: {
        data: Customer[];
    } & Pagination;
    filters: {
        search?: string;
        sort_by?: string;
        sort_order?: string;
        per_page?: number;
    };
}

const props = defineProps<Props>();

const search = ref(props.filters.search || '');
const sortBy = ref(props.filters.sort_by || 'created_at');
const sortOrder = ref(props.filters.sort_order || 'desc');
const perPage = ref(props.filters.per_page || 10);

// Delete customer action
const deleteCustomer = (id: number) => {
    router.delete(destroy.url(id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Pelanggan berhasil dihapus');
        },
        onError: () => {
            toast.error('Gagal menghapus pelanggan');
        },
    });
};

// Dialog state
const deleteDialog = ref({
    open: false,
    data: null as Customer | null,
});

const openDeleteDialog = (customer: Customer) => {
    deleteDialog.value = {
        open: true,
        data: customer,
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
        deleteCustomer(deleteDialog.value.data.id);
    }
};

const columns: ColumnDef<Customer>[] = [
    {
        id: 'index',
        header: () => h('div', { class: 'text-left' }, 'No'),
        cell: ({ row }) => {
            const indexNum = row.index + 1 + (props.customers.current_page - 1) * props.customers.per_page;
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
                () => ['Nama', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            ),
        cell: ({ row }) => h('div', {}, row.getValue('name')),
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
        accessorKey: 'ewallet_saldo',
        header: () => h('div', { class: 'text-right' }, 'Saldo'),
        cell: ({ row }) => {
            const saldo = row.getValue('ewallet_saldo') as number;
            return h(
                'div',
                { class: 'text-right font-medium' },
                'Rp ' + new Intl.NumberFormat('id-ID').format(saldo)
            );
        },
    },
    {
        accessorKey: 'position',
        header: 'Posisi',
        cell: ({ row }) => {
            const position = row.getValue('position') as string | null;
            if (!position) return h('div', { class: 'text-center' }, '-');
            return h(
                Badge,
                {
                    variant: position === 'left' ? 'default' : 'secondary',
                    class: 'capitalize',
                },
                () => position
            );
        },
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Status',
        cell: ({ row }) => {
            const verified = row.getValue('email_verified_at');
            return h(
                Badge,
                {
                    variant: verified ? 'default' : 'outline',
                },
                () => (verified ? 'Verified' : 'Unverified')
            );
        },
    },
    {
        id: 'actions',
        header: () => h('div', { class: 'text-center' }, 'Aksi'),
        cell: ({ row }) => {
            const customer = row.original;
            return h('div', { class: 'flex items-center justify-center gap-2' }, [
                h(
                    Button,
                    {
                        variant: 'ghost',
                        size: 'icon',
                        onClick: () => loginAsCustomer(customer.id, customer.name),
                        title: 'Login sebagai customer',
                    },
                    () => h(LogIn, { class: 'h-4 w-4 text-primary' })
                ),
                h(
                    Link,
                    {
                        href: show.url(customer.id),
                    },
                    () =>
                        h(
                            Button,
                            { variant: 'ghost', size: 'icon' },
                            () => h(Eye, { class: 'h-4 w-4' })
                        )
                ),
                h(
                    Link,
                    {
                        href: edit.url(customer.id),
                    },
                    () =>
                        h(
                            Button,
                            { variant: 'ghost', size: 'icon' },
                            () => h(Pencil, { class: 'h-4 w-4' })
                        )
                ),
                h(
                    Button,
                    {
                        variant: 'ghost',
                        size: 'icon',
                        onClick: () => openDeleteDialog(customer),
                    },
                    () => h(Trash2, { class: 'h-4 w-4 text-destructive' })
                ),
            ]);
        },
    },
];

const tableData = computed(() => props.customers.data);

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
        <Head title="Kelola Pelanggan" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Kelola Pelanggan</h1>
                    <p class="text-muted-foreground">
                        Kelola data pelanggan dan jaringan MLM
                    </p>
                </div>
                <Link :href="create.url()">
                    <Button>
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Pelanggan
                    </Button>
                </Link>
            </div>

            <div class="mb-4 flex items-center gap-4">
                <div class="relative flex-1">
                    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        v-model="search"
                        placeholder="Cari nama, email, telepon, atau ewallet ID..."
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
                                    Tidak ada data pelanggan.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <Pagination
                :data="customers"
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
            title="Hapus Pelanggan?"
            :description="`Apakah Anda yakin ingin menghapus pelanggan ${deleteDialog.data?.name}? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait termasuk jaringan dan bonus.`"
            confirm-text="Hapus"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleDelete"
        />
    </AppLayout>
</template>
