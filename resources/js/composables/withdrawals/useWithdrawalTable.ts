// resources/js/composables/withdrawals/useWithdrawalTable.ts
import { h, ref } from 'vue'
import { valueUpdater } from '@/lib/utils'
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
} from '@tanstack/vue-table'
import { ArrowUpDown, Check, X } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { PaginatedWithdrawals, Withdrawal } from '@/types/withdrawal'
import { formatCurrencyIDR, formatDateID, getStatusVariant } from '@/utils/formatters'
import { parseBankInfo } from '@/utils/withdrawalNotes'
import { usePermissions } from '../usePermissions'

export function useWithdrawalTable(opts: {
    withdrawals: PaginatedWithdrawals<Withdrawal>
    onApprove: (w: Withdrawal) => void
    onReject: (w: Withdrawal) => void
}) {
    const sorting = ref<SortingState>([
        { id: 'created_at', desc: true },
    ])
    const columnFilters = ref<ColumnFiltersState>([])
    const columnVisibility = ref<VisibilityState>({})

    const sortableHeader = (label: string) => ({ column }: any) =>
        h(
            Button,
            {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                class: '-ml-4',
            },
            () => [label, h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
        )
    const { isSuperAdmin, isAdmin } = usePermissions()
    const columns: ColumnDef<Withdrawal>[] = [
        {
            id: 'index',
            header: () => h('div', { class: 'w-12' }, 'No'),
            cell: ({ row }) => {
                const index = row.index + 1 + (opts.withdrawals.current_page - 1) * opts.withdrawals.per_page
                return h('div', { class: 'font-medium' }, index)
            },
        },
        {
            accessorKey: 'customer.name',
            header: sortableHeader('Pelanggan'),
            cell: ({ row }) => {
                const c = row.original.customer
                return h('div', [
                    h('div', { class: 'font-medium' }, c.name),
                    h('div', { class: 'text-xs text-muted-foreground' }, c.email),
                ])
            },
        },
        {
            accessorKey: 'customer.username',
            header: sortableHeader('Username'),
            cell: ({ row }) => {
                const c = row.original.customer
                return h('div', [
                    h('div', { class: 'font-medium' }, c.username),
                    h('div', { class: 'text-xs text-muted-foreground' }, c.email),
                ])
            },
        },
        {
            accessorKey: 'customer.ewallet_saldo',
            header: () => 'Saldo Sekarang',
            cell: ({ row }) => h('div', formatCurrencyIDR(row.original.customer.ewallet_saldo)),
        },
        {
            accessorKey: 'balance_before',
            header: () => 'Saldo Sebelum',
            cell: ({ row }) => h('div', formatCurrencyIDR(row.getValue('balance_before'))),
        },
        {
            accessorKey: 'amount',
            header: () => 'Penarikan',
            cell: ({ row }) => h('div', { class: 'font-bold text-red-600' }, formatCurrencyIDR(row.getValue('amount'))),
        },
        // ✅ hapus duplikasi "Biaya Admin" (di code awal ada 2)
        {
            id: 'admin_fee',
            header: () => 'Biaya Admin',
            cell: ({ row }) => {
                const info = parseBankInfo(row.original.notes)
                if (!info) return h('div', { class: 'text-xs text-muted-foreground' }, '-')
                return h('div', { class: 'text-xs font-medium' }, formatCurrencyIDR(info.admin_fee ?? 0))
            },
        },
        {
            id: 'net_amount',
            header: () => 'Penarikan Net',
            cell: ({ row }) => {
                const info = parseBankInfo(row.original.notes)
                if (!info) return h('div', { class: 'text-xs text-muted-foreground' }, '-')
                return h('div', { class: 'text-xs font-medium' }, formatCurrencyIDR(info.net_amount ?? 0))
            },
        },
        {
            id: 'bank_destination',
            header: () => 'Rekening Tujuan',
            cell: ({ row }) => {
                const info = parseBankInfo(row.original.notes)
                if (!info) return h('div', { class: 'text-xs text-muted-foreground' }, '-')
                return h('div', [
                    h('div', { class: 'text-xs font-medium' }, `${info.bank_name} - ${info.bank_account}`),
                    h('div', { class: 'text-xs text-muted-foreground' }, info.bank_holder),
                ])
            },
        },
        {
            accessorKey: 'transaction_ref',
            header: () => 'Referensi',
            cell: ({ row }) => h('div', { class: 'font-mono text-xs' }, row.getValue('transaction_ref')),
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                return h(Badge, { variant: getStatusVariant(status) }, () => status)
            },
        },
        {
            accessorKey: 'created_at',
            header: () => 'Tanggal',
            cell: ({ row }) => h('div', { class: 'text-sm' }, formatDateID(row.getValue('created_at'))),
        },
        {
            id: 'actions',
            header: () => h('div', { class: 'text-right' }, 'Aksi'),
            cell: ({ row }) => {
                const w = row.original
                if (w.status !== 'pending' && (isSuperAdmin || isAdmin)) return null

                const isDisabled = w.balance_before < w.amount

                return h('div', { class: 'flex justify-end gap-2' }, [
                    h(
                        Button,
                        { size: 'sm', onClick: () => opts.onApprove(w), disabled: isDisabled },
                        () => [h(Check, { class: 'mr-1 h-4 w-4' }), 'Setujui']
                    ),
                    h(
                        Button,
                        { size: 'sm', variant: 'destructive', onClick: () => opts.onReject(w) },
                        () => [h(X, { class: 'mr-1 h-4 w-4' }), 'Tolak']
                    ),
                ])
            },
        },
    ]

    const table = useVueTable({
        get data() {
            return opts.withdrawals.data
        },
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: (u) => valueUpdater(u, sorting),
        onColumnFiltersChange: (u) => valueUpdater(u, columnFilters),
        onColumnVisibilityChange: (u) => valueUpdater(u, columnVisibility),
        state: {
            get sorting() { return sorting.value },
            get columnFilters() { return columnFilters.value },
            get columnVisibility() { return columnVisibility.value },
        },
        manualSorting: true,
    })

    return { table, columns, sorting, FlexRender }
}
