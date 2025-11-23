<script setup lang="ts">
import { ref, watch } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'
import Pagination from '@/components/Pagination.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
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
import { ArrowUpDown, ChevronDown, Search, Wallet } from 'lucide-vue-next'
import { h } from 'vue'

interface Customer {
  id: number
  name: string
  email: string
  ewallet_saldo: number
}

interface Props {
  customers: {
    data: Customer[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  statistics: {
    total_customers: number
    total_balance: number
    avg_balance: number
  }
  search?: string
}

const props = defineProps<Props>()

const search = ref(props.search || '')
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

const columns: ColumnDef<Customer>[] = [
  {
    id: 'index',
    header: () => h('div', { class: 'w-12' }, 'No'),
    cell: ({ row }) => {
      const index = row.index + 1 + (props.customers.current_page - 1) * props.customers.per_page
      return h('div', { class: 'font-medium' }, index)
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
        () => ['Nama Customer', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return h('div', { class: 'text-sm text-muted-foreground' }, row.getValue('email'))
    },
  },
  {
    accessorKey: 'ewallet_saldo',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: '-ml-4',
        },
        () => ['Saldo E-Wallet', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('ewallet_saldo'))
      return h('div', { class: 'font-bold text-green-600' }, formatCurrency(amount))
    },
  },
]

const table = useVueTable({
  get data() {
    return props.customers.data
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
        '/admin/wallets',
        {
          search: search.value || undefined,
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

watch(search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    router.get(
      '/admin/wallets',
      {
        search: search.value || undefined,
        sort_by: sorting.value[0]?.id || 'name',
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
  <Head title="Kelola E-Wallet" />

  <AppLayout>
    <div class="rounded-xl p-4 space-y-6 py-6">
      <!-- Header -->
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Kelola E-Wallet</h2>
        <p class="text-muted-foreground">Monitoring saldo e-wallet seluruh customer</p>
      </div>

      <!-- Statistics -->
      <div class="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Customer</CardTitle>
            <Wallet class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ statistics.total_customers }}</div>
            <p class="text-xs text-muted-foreground">Customer terdaftar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Saldo</CardTitle>
            <Wallet class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ formatCurrency(statistics.total_balance) }}</div>
            <p class="text-xs text-muted-foreground">Saldo keseluruhan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Rata-rata Saldo</CardTitle>
            <Wallet class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ formatCurrency(statistics.avg_balance) }}</div>
            <p class="text-xs text-muted-foreground">Per customer</p>
          </CardContent>
        </Card>
      </div>

      <!-- Filters and Actions -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-sm">
          <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input v-model="search" placeholder="Cari customer..." class="pl-9" />
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
              @update:model-value="(value) => { column.toggleVisibility(!!value) }"
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
                  Tidak ada data customer.
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="customers.last_page > 1"
        :data="{
          current_page: customers.current_page,
          last_page: customers.last_page,
          per_page: customers.per_page,
          from: customers.from,
          to: customers.to,
          total: customers.total,
        }"
        url="/admin/wallets"
        :filters="{
          search: search || undefined,
          sort_by: sorting[0]?.id || 'name',
          sort_order: sorting[0]?.desc ? 'desc' : 'asc',
        }"
      />
    </div>
  </AppLayout>
</template>
