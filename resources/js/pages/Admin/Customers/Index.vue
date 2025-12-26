<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
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
    Wallet,
} from 'lucide-vue-next';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { index, show, edit, create, destroy, topUp, loginAsCustomer as loginAsCustomerAction } from '@/actions/App/Http/Controllers/Admin/CustomerController';
import { toast } from 'vue-sonner';

// Inject ewallet dialog state
const injectDialog = ref({
    open: false,
    data: null as Customer | null,
});

const injectForm = useForm({
    amount: '' as string | number,
    description: '',
});

const openInjectDialog = (customer: Customer) => {
    injectDialog.value = {
        open: true,
        data: customer,
    };
    injectForm.reset();
    injectForm.clearErrors();
    injectForm.amount = '';
    injectForm.description = '';
};

const closeInjectDialog = () => {
    injectDialog.value.open = false;
    injectForm.reset();
    injectForm.clearErrors();
};

const handleInject = () => {
    if (!injectDialog.value.data) return;

    const amount = Number(injectForm.amount);

    // Validate amount before submitting
    if (!amount || amount < 10000) {
        toast.error('Jumlah minimal Rp 10.000');
        return;
    }

    injectForm.post(topUp.url(injectDialog.value.data.id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Saldo berhasil ditambahkan');
            closeInjectDialog();
        },
        onError: (errors) => {
            if (errors.amount) {
                toast.error(errors.amount);
            } else {
                toast.error('Gagal menambahkan saldo');
            }
        },
    });
};

// Login as customer action
const loginAsCustomer = (id: number, name: string) => {
    router.post(loginAsCustomerAction.url(id), {}, {
        onSuccess: () => {
            toast.success(`Login sebagai ${name}`);
        },
        onError: (errors) => {
            // Handle 419 CSRF token mismatch - reload the page to get fresh token
            if (errors.message?.includes('419') || errors.message?.includes('expired')) {
                toast.error('Sesi expired, mencoba ulang...');
                window.location.reload();
                return;
            }
            toast.error('Gagal login sebagai customer');
        },
        onFinish: () => {
            // If the request fails with 419, Inertia may not trigger onError
            // The page will be reloaded by Inertia automatically
        },
    });
};

interface Customer {
    id: number;
    username: string | null;
    name: string;
    email: string;
    phone: string | null;
    ewallet_id: string;
    ewallet_saldo: number;
    email_verified_at: string | null;
    created_at: string;
    sponsor_id: number | null;
    sponsor_name: string | null;
    upline_id: number | null;
    upline_name: string | null;
    position: string | null;
    status: number; // 1 = Aktif, 2 = Pasif, 3 = Prospek
    package_id: number | null;
    package_name: string;
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
        package_id?: string;
        position?: string;
        email_verified?: string;
        status?: string;
    };
}

const props = defineProps<Props>();

const search = ref(props.filters.search || '');
const sortBy = ref(props.filters.sort_by || 'created_at');
const sortOrder = ref(props.filters.sort_order || 'desc');
const perPage = ref(props.filters.per_page || 10);
const packageFilter = ref(props.filters.package_id || 'all');
const positionFilter = ref(props.filters.position || 'all');
const emailVerifiedFilter = ref(props.filters.email_verified || 'all');
const statusFilter = ref(props.filters.status || 'all');

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
            search: search.value || undefined,
            sort_by: sortBy.value,
            sort_order: sortOrder.value,
            per_page: perPage.value,
            package_id: packageFilter.value && packageFilter.value !== 'all' ? packageFilter.value : undefined,
            position: positionFilter.value && positionFilter.value !== 'all' ? positionFilter.value : undefined,
            email_verified: emailVerifiedFilter.value && emailVerifiedFilter.value !== 'all' ? emailVerifiedFilter.value : undefined,
            status: statusFilter.value && statusFilter.value !== 'all' ? statusFilter.value : undefined,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
}, 300);

const handleFilterChange = () => {
    performSearch();
};

const clearFilters = () => {
    search.value = '';
    packageFilter.value = 'all';
    positionFilter.value = 'all';
    emailVerifiedFilter.value = 'all';
    statusFilter.value = 'all';
    performSearch();
};

const hasActiveFilters = computed(() => {
    return search.value ||
        (packageFilter.value && packageFilter.value !== 'all') ||
        (positionFilter.value && positionFilter.value !== 'all') ||
        (emailVerifiedFilter.value && emailVerifiedFilter.value !== 'all') ||
        (statusFilter.value && statusFilter.value !== 'all');
});

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
        accessorKey: 'username',
        header: () =>
            h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => handleSort('username'),
                },
                () => ['Username', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
            ),
        cell: ({ row }) => {
            const username = row.getValue('username') as string | null;
            return h('div', { class: 'font-mono text-sm' }, username || '-');
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
        accessorKey: 'package_name',
        header: 'Peringkat',
        cell: ({ row }) => {
            const packageId = row.original.package_id;
            const packageName = row.getValue('package_name') as string;
            const variant = packageId === 3 ? 'default' : packageId === 2 ? 'secondary' : packageId === 1 ? 'outline' : 'outline';
            return h(
                Badge,
                { variant },
                () => packageName
            );
        },
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
        accessorKey: 'sponsor_name',
        header: 'Sponsor',
        cell: ({ row }) => {
            const sponsorName = row.getValue('sponsor_name') as string | null;
            return h('div', { class: 'text-sm' }, sponsorName || '-');
        },
    },
    {
        accessorKey: 'upline_name',
        header: 'Upline',
        cell: ({ row }) => {
            const uplineName = row.getValue('upline_name') as string | null;
            return h('div', { class: 'text-sm' }, uplineName || '-');
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
            const actions = [
                h(
                    Button,
                    {
                        variant: 'ghost',
                        size: 'icon',
                        onClick: () => openInjectDialog(customer),
                        title: 'Inject Ewallet',
                    },
                    () => h(Wallet, { class: 'h-4 w-4 text-green-600' })
                ),
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
            ];

            // Only show delete button if status is not Pasif (2) or Aktif (3)
            if (customer.status !== 2 && customer.status !== 3) {
                actions.push(
                    h(
                        Button,
                        {
                            variant: 'ghost',
                            size: 'icon',
                            onClick: () => openDeleteDialog(customer),
                        },
                        () => h(Trash2, { class: 'h-4 w-4 text-destructive' })
                    )
                );
            }

            return h('div', { class: 'flex items-center justify-center gap-2' }, actions);
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

            <div class="mb-4 space-y-4">
                <div class="flex items-center gap-4">
                    <div class="relative flex-1">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            v-model="search"
                            placeholder="Cari nama, email, telepon, atau ewallet ID..."
                            class="pl-10"
                            @input="performSearch"
                        />
                    </div>
                    <Button
                        v-if="hasActiveFilters"
                        variant="outline"
                        size="sm"
                        @click="clearFilters"
                    >
                        Reset Filter
                    </Button>
                </div>
                <div class="flex flex-wrap items-center gap-4">
                    <Select v-model="packageFilter" @update:model-value="handleFilterChange">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Semua Peringkat" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Peringkat</SelectItem>
                            <SelectItem value="null">Tidak ada paket</SelectItem>
                            <SelectItem value="1">ZENNER Plus</SelectItem>
                            <SelectItem value="2">ZENNER Prime</SelectItem>
                            <SelectItem value="3">ZENNER Ultra</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select v-model="positionFilter" @update:model-value="handleFilterChange">
                        <SelectTrigger class="w-[150px]">
                            <SelectValue placeholder="Semua Posisi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Posisi</SelectItem>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select v-model="emailVerifiedFilter" @update:model-value="handleFilterChange">
                        <SelectTrigger class="w-[160px]">
                            <SelectValue placeholder="Semua Verifikasi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Verifikasi</SelectItem>
                            <SelectItem value="1">Verified</SelectItem>
                            <SelectItem value="0">Unverified</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select v-model="statusFilter" @update:model-value="handleFilterChange">
                        <SelectTrigger class="w-[150px]">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="1">Prospek</SelectItem>
                            <SelectItem value="2">Pasif</SelectItem>
                            <SelectItem value="3">Aktif</SelectItem>
                        </SelectContent>
                    </Select>
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
                    search: search || undefined,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                    per_page: perPage,
                    package_id: packageFilter && packageFilter !== 'all' ? packageFilter : undefined,
                    position: positionFilter && positionFilter !== 'all' ? positionFilter : undefined,
                    email_verified: emailVerifiedFilter && emailVerifiedFilter !== 'all' ? emailVerifiedFilter : undefined,
                    status: statusFilter && statusFilter !== 'all' ? statusFilter : undefined,
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

        <!-- Inject Ewallet Dialog -->
        <Dialog :open="injectDialog.open" @update:open="(val) => !val && closeInjectDialog()">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Inject Ewallet</DialogTitle>
                    <DialogDescription>
                        Tambahkan saldo ke ewallet {{ injectDialog.data?.name }} ({{ injectDialog.data?.ewallet_id }})
                    </DialogDescription>
                </DialogHeader>
                <form @submit.prevent="handleInject" class="space-y-4">
                    <div class="space-y-2">
                        <Label for="amount">Jumlah (Rp)</Label>
                        <Input
                            id="amount"
                            v-model.number="injectForm.amount"
                            type="number"
                            min="10000"
                            step="1000"
                            placeholder="Minimal Rp 10.000"
                            required
                        />
                        <p v-if="injectForm.errors.amount" class="text-sm text-destructive">
                            {{ injectForm.errors.amount }}
                        </p>
                    </div>
                    <div class="space-y-2">
                        <Label for="description">Keterangan (Opsional)</Label>
                        <Input
                            id="description"
                            v-model="injectForm.description"
                            type="text"
                            placeholder="Contoh: Top up manual oleh admin"
                        />
                    </div>
                    <DialogFooter class="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            :disabled="injectForm.processing"
                            @click="closeInjectDialog"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            :disabled="injectForm.processing || !injectForm.amount || Number(injectForm.amount) < 10000"
                        >
                            <Wallet class="mr-2 h-4 w-4" />
                            {{ injectForm.processing ? 'Memproses...' : 'Tambahkan Saldo' }}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
