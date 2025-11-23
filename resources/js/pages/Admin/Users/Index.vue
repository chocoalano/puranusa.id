<script setup lang="ts">
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import Pagination from '@/components/Pagination.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useUserActions } from '@/composables/useUserActions';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { valueUpdater } from '@/lib/utils';
import { Head, Link, router } from '@inertiajs/vue3';
import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnDef,
    type ColumnFiltersState,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/vue-table';
import { createReusableTemplate } from '@vueuse/core';
import {
    ArrowUpDown,
    CheckCircle,
    ChevronDown,
    Copy,
    Edit,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
    XCircle,
} from 'lucide-vue-next';
import { computed, h, ref, watch } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
}

interface PaginatedUsers {
    data: User[];
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

interface Props {
    users: PaginatedUsers;
    filters: {
        search?: string;
        sort_by: string;
        sort_order: 'asc' | 'desc';
    };
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: UserController.index.url(),
    },
];

const search = ref(props.filters.search || '');
const sorting = ref<SortingState>([
    {
        id: props.filters.sort_by,
        desc: props.filters.sort_order === 'desc',
    },
]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref<RowSelectionState>({});

// Reusable template for actions dropdown
const [DefineActionsTemplate, ReuseActionsTemplate] = createReusableTemplate<{
    user: User;
    onDelete: () => void;
}>();

// Use composable for user actions
const { deleteUser, bulkDelete, copyToClipboard } = useUserActions();

// Dialog states
const deleteDialog = ref({
    open: false,
    user: null as User | null,
});
const bulkDeleteDialog = ref({ open: false });
const bulkCopyDialog = ref({ open: false });

const selectedUsers = computed(() => {
    return Object.keys(rowSelection.value)
        .map((key) => props.users.data[parseInt(key)])
        .filter(Boolean);
});

const selectedCount = computed(() => Object.keys(rowSelection.value).length);

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Delete actions
const openDeleteDialog = (user: User) => {
    deleteDialog.value = { open: true, user };
};

const handleDelete = async () => {
    if (!deleteDialog.value.user) return;

    await deleteUser(deleteDialog.value.user.id);
    rowSelection.value = {};
    deleteDialog.value = { open: false, user: null };
};

// Bulk delete actions
const openBulkDeleteDialog = () => {
    if (!selectedUsers.value.length) return;
    bulkDeleteDialog.value.open = true;
};

const handleBulkDelete = async () => {
    const userIds = selectedUsers.value.map((user) => user.id);
    await bulkDelete(userIds);
    rowSelection.value = {};
    bulkDeleteDialog.value.open = false;
};

// Bulk copy actions
const openBulkCopyDialog = () => {
    if (!selectedUsers.value.length) return;
    bulkCopyDialog.value.open = true;
};

const handleCopyData = async () => {
    await copyToClipboard(selectedUsers.value);
    bulkCopyDialog.value.open = false;
};

const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(Checkbox, {
                modelValue:
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate'),
                'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
                ariaLabel: 'Select all',
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                modelValue: row.getIsSelected(),
                'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
                ariaLabel: 'Select row',
            }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'index',
        header: () => h('div', { class: 'w-12' }, 'No'),
        cell: ({ row }) => {
            const index = row.index + 1 + (props.users.current_page - 1) * props.users.per_page;
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
                () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
            );
        },
        cell: ({ row }) => {
            return h('div', { class: 'font-medium' }, row.getValue('name'));
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    class: '-ml-4',
                },
                () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
            );
        },
        cell: ({ row }) => {
            return h('div', { class: 'lowercase' }, row.getValue('email'));
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
                    variant: verified ? 'default' : 'secondary',
                    class: 'gap-1 capitalize',
                },
                () => [
                    h(verified ? CheckCircle : XCircle, { class: 'h-3 w-3' }),
                    verified ? 'Verified' : 'Unverified',
                ],
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
                () => ['Created At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
            );
        },
        cell: ({ row }) => {
            return formatDate(row.getValue('created_at'));
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            return h(ReuseActionsTemplate, {
                user,
                onDelete: () => openDeleteDialog(user),
            });
        },
    },
];

const table = useVueTable({
    get data() {
        return props.users.data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
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
        get rowSelection() {
            return rowSelection.value;
        },
    },
    manualSorting: true,
    enableRowSelection: true,
});

// Watch sorting changes and update URL
watch(
    sorting,
    (newSorting) => {
        if (newSorting.length > 0) {
            router.get(
                UserController.index.url(),
                {
                    search: search.value || undefined,
                    sort_by: newSorting[0].id,
                    sort_order: newSorting[0].desc ? 'desc' : 'asc',
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    },
    { deep: true },
);

// Debounce search
let searchTimeout: ReturnType<typeof setTimeout>;
watch(search, () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            UserController.index.url(),
            {
                search: search.value || undefined,
                sort_by: sorting.value[0]?.id || 'created_at',
                sort_order: sorting.value[0]?.desc ? 'desc' : 'asc',
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }, 300);
});
</script>

<template>
    <DefineActionsTemplate v-slot="{ user, onDelete }">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="h-8 w-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem @click="copyToClipboard([user])">
                    <Copy class="mr-2 h-4 w-4" />
                    Copy user data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem as-child>
                    <Link :href="UserController.edit.url(user.id)">
                        <Edit class="mr-2 h-4 w-4" />
                        Edit user
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem @click="onDelete" class="text-destructive">
                    <Trash2 class="mr-2 h-4 w-4" />
                    Delete user
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </DefineActionsTemplate>

    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="User Management" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Users</h1>
                    <p class="text-muted-foreground">
                        Manage user accounts and permissions
                    </p>
                </div>
                <div class="flex gap-2">
                    <Link :href="UserController.create.url()">
                        <Button>
                            <Plus class="h-4 w-4" />
                            Add User
                        </Button>
                    </Link>
                </div>
            </div>

            <!-- Bulk Actions -->
            <div
                v-if="selectedCount > 0"
                class="flex items-center justify-between rounded-lg border bg-muted/50 p-4"
            >
                <p class="text-sm font-medium">
                    {{ selectedCount }} user(s) selected
                </p>
                <div class="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        @click="openBulkCopyDialog"
                    >
                        <Copy class="h-4 w-4" />
                        Copy Data
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        @click="openBulkDeleteDialog"
                    >
                        <Trash2 class="h-4 w-4" />
                        Delete Selected
                    </Button>
                </div>
            </div>

            <!-- Filters and Actions -->
            <div class="flex items-center justify-between gap-4">
                <div class="relative flex-1 max-w-sm">
                    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        v-model="search"
                        placeholder="Filter emails..."
                        class="pl-9"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" class="ml-auto">
                            Columns <ChevronDown class="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            v-for="column in table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())"
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
                                :data-state="row.getIsSelected() ? 'selected' : undefined"
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
                                    No users found.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>

            <!-- Pagination Info and Controls -->
            <div class="flex items-center justify-end space-x-2 py-4">
                <div class="flex-1 text-sm text-muted-foreground">
                    <span v-if="selectedCount > 0">
                        {{ table.getFilteredSelectedRowModel().rows.length }} dari
                        {{ table.getFilteredRowModel().rows.length }} baris dipilih.
                    </span>
                </div>
                <div class="space-x-2">
                    <Pagination
                        v-if="users.last_page > 1"
                        :data="{
                            current_page: users.current_page,
                            last_page: users.last_page,
                            per_page: users.per_page,
                            from: (users.current_page - 1) * users.per_page + 1,
                            to: Math.min(users.current_page * users.per_page, users.total),
                            total: users.total,
                        }"
                        :url="UserController.index.url()"
                        :filters="{
                            search: search || undefined,
                            sort_by: sorting[0]?.id || 'created_at',
                            sort_order: sorting[0]?.desc ? 'desc' : 'asc',
                        }"
                    />
                </div>
            </div>
        </div>

        <!-- Delete Dialog -->
        <ConfirmDialog
            v-model:open="deleteDialog.open"
            title="Hapus Pengguna?"
            :description="`Apakah Anda yakin ingin menghapus pengguna ${deleteDialog.user?.name}? Tindakan ini tidak dapat dibatalkan.`"
            confirm-text="Hapus"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleDelete"
        />

        <!-- Bulk Delete Dialog -->
        <ConfirmDialog
            v-model:open="bulkDeleteDialog.open"
            :title="`Hapus ${selectedCount} Pengguna?`"
            :description="`Apakah Anda yakin ingin menghapus ${selectedCount} pengguna yang dipilih? Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data pengguna tersebut.`"
            confirm-text="Hapus Semua"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleBulkDelete"
        />

        <!-- Bulk Copy Dialog -->
        <ConfirmDialog
            v-model:open="bulkCopyDialog.open"
            title="Salin Data Pengguna?"
            :description="`Data dari ${selectedCount} pengguna yang dipilih akan disalin ke clipboard dalam format tab-separated. Anda dapat mem-paste data ini ke spreadsheet seperti Excel atau Google Sheets.`"
            confirm-text="Salin ke Clipboard"
            cancel-text="Batal"
            @confirm="handleCopyData"
        />
    </AppLayout>
</template>
