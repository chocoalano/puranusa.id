<script setup lang="ts">
import { ref, watch } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'
import Pagination from '@/components/Pagination.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { ArrowUpDown, ChevronDown, Search, TrendingUp, Wallet } from 'lucide-vue-next'
import { h } from 'vue'

interface Customer {
  id: number
  name: string
  email: string
}

interface Transaction {
  id: number
  customer: Customer
  type: string
  amount: number
  balance_before: number
  balance_after: number
  status: string
  transaction_ref: string
  payment_method: string | null
  notes: string | null
  completed_at: string | null
  created_at: string
}

interface Props {
  transactions: {
    data: Transaction[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  statistics: {
    total_transactions: number
    total_amount: number
    total_pending: number
    total_completed: number
  }
  filters?: {
    search?: string
    type?: string
    status?: string
  }
}

const props = defineProps<Props>()

const search = ref(props.filters?.search || '')
const typeFilter = ref(props.filters?.type || 'all')
const statusFilter = ref(props.filters?.status || 'all')
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
let searchTimeout: ReturnType<typeof setTimeout>

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    completed: 'default',
    failed: 'destructive',
    cancelled: 'outline',
  }
  return variants[status] || 'outline'
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    topup: 'Top Up',
    withdrawal: 'Penarikan',
    order_payment: 'Pembayaran Order',
    refund: 'Refund',
    commission: 'Komisi',
    bonus: 'Bonus',
  }
  return labels[type] || type
}

const columns: ColumnDef<Transaction>[] = [
  {
    id: 'index',
    header: () => h('div', { class: 'w-12' }, 'No'),
    cell: ({ row }) => {
      const index = row.index + 1 + (props.transactions.current_page - 1) * props.transactions.per_page
      return h('div', { class: 'font-medium' }, index)
    },
  },
  {
    accessorKey: 'transaction_ref',
    header: 'Ref. Transaksi',
    cell: ({ row }) => {
      return h('div', { class: 'font-mono text-xs' }, row.getValue('transaction_ref'))
    },
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ row }) => {
      const customer = row.original.customer
      return h('div', [
        h('div', { class: 'font-medium' }, customer.name),
        h('div', { class: 'text-xs text-muted-foreground' }, customer.email),
      ])
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipe',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return h('div', { class: 'capitalize' }, getTypeLabel(type))
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: '-ml-4',
        },
        () => ['Jumlah', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const type = row.original.type
      const color = type === 'topup' || type === 'refund' || type === 'commission' || type === 'bonus' ? 'text-green-600' : 'text-red-600'
      return h('div', { class: `font-bold ${color}` }, formatCurrency(amount))
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h(Badge, { variant: getStatusVariant(status) }, () => status.toUpperCase())
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
      )
    },
    cell: ({ row }) => {
      return h('div', { class: 'text-sm' }, formatDate(row.getValue('created_at')))
    },
  },
]

const table = useVueTable({
  get data() {
    return props.transactions.data
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
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
  },
  manualSorting: true,
})

watch(
  sorting,
  (newSorting) => {
    if (newSorting.length > 0) {
      router.get(
        '/admin/wallet-transactions',
        {
          search: search.value || undefined,
          type: typeFilter.value !== 'all' ? typeFilter.value : undefined,
          status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
          sort_by: newSorting[0].id,
          sort_order: newSorting[0].desc ? 'desc' : 'asc',
        },
        {
          preserveState: true,
          preserveScroll: true,
        }
      )
    }
  },
  { deep: true }
)

watch([search, typeFilter, statusFilter], () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    router.get(
      '/admin/wallet-transactions',
      {
        search: search.value || undefined,
        type: typeFilter.value !== 'all' ? typeFilter.value : undefined,
        status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
        sort_by: sorting.value[0]?.id || 'created_at',
        sort_order: sorting.value[0]?.desc ? 'desc' : 'asc',
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    )
  }, 300)
})
</script>

<template>
  <Head title="Transaksi E-Wallet" />

  <AppLayout>
    <div class="rounded-xl p-4 space-y-6 py-6">
      <!-- Header -->
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Transaksi E-Wallet</h2>
        <p class="text-muted-foreground">Monitoring semua transaksi e-wallet customer</p>
      </div>

      <!-- Statistics -->
      <div class="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Transaksi</CardTitle>
            <TrendingUp class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ statistics.total_transactions }}</div>
            <p class="text-xs text-muted-foreground">Semua transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Amount</CardTitle>
            <Wallet class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ formatCurrency(statistics.total_amount) }}</div>
            <p class="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Pending</CardTitle>
            <TrendingUp class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ statistics.total_pending }}</div>
            <p class="text-xs text-muted-foreground">Menunggu proses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Completed</CardTitle>
            <TrendingUp class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ statistics.total_completed }}</div>
            <p class="text-xs text-muted-foreground">Selesai</p>
          </CardContent>
        </Card>
      </div>

      <!-- Filters and Actions -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div class="relative flex-1 max-w-sm">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input v-model="search" placeholder="Cari customer atau ref..." class="pl-9" />
          </div>
          <Select v-model="typeFilter">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="topup">Top Up</SelectItem>
              <SelectItem value="withdrawal">Penarikan</SelectItem>
              <SelectItem value="order_payment">Pembayaran Order</SelectItem>
              <SelectItem value="refund">Refund</SelectItem>
              <SelectItem value="commission">Komisi</SelectItem>
              <SelectItem value="bonus">Bonus</SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="statusFilter">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
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
                @update:model-value="(value) => { column.toggleVisibility(!!value) }"
              >
                {{ column.id }}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <!-- Table -->
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
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
              <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
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
                  Tidak ada data transaksi.
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="transactions.last_page > 1"
        :data="{
          current_page: transactions.current_page,
          last_page: transactions.last_page,
          per_page: transactions.per_page,
          from: transactions.from,
          to: transactions.to,
          total: transactions.total,
        }"
        url="/admin/wallet-transactions"
        :filters="{
          search: search || undefined,
          type: typeFilter !== 'all' ? typeFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          sort_by: sorting[0]?.id || 'created_at',
          sort_order: sorting[0]?.desc ? 'desc' : 'asc',
        }"
      />
    </div>
  </AppLayout>
</template>
