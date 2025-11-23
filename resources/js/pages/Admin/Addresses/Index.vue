<script setup lang="ts">
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'
import StatisticsCards from '@/components/admin/StatisticsCards.vue'
import TableFilters, { type FilterConfig } from '@/components/admin/TableFilters.vue'
import TablePagination from '@/components/admin/TablePagination.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import { h } from 'vue'
import { Trash2, MapPin } from 'lucide-vue-next'

interface Customer {
  id: number
  name: string
  email: string
}

interface Address {
  id: number
  customer: Customer
  label: string
  is_default: boolean
  recipient_name: string
  recipient_phone: string
  address_line1: string
  city_label: string
  province_label: string
  postal_code: string
  created_at: string
}

interface Props {
  addresses: {
    data: Address[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  statistics: {
    total_addresses: number
    total_default: number
    total_customers: number
  }
  filters?: {
    search?: string
  }
}

const props = defineProps<Props>()

const searchQuery = ref(props.filters?.search || '')
const sorting = ref<SortingState>([])
let searchTimeout: ReturnType<typeof setTimeout>

// Statistics configuration
const statistics = computed(() => [
  {
    label: 'Total Alamat',
    value: props.statistics.total_addresses,
  },
  {
    label: 'Alamat Default',
    value: props.statistics.total_default,
  },
  {
    label: 'Total Pelanggan',
    value: props.statistics.total_customers,
  },
])

// Filter configuration
const filterConfigs = computed<FilterConfig[]>(() => [
  {
    type: 'search',
    placeholder: 'Cari pelanggan atau kota...',
    modelValue: searchQuery.value,
  },
])

const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    router.get(
      '/admin/settings/addresses',
      { search: searchQuery.value },
      { preserveState: true, preserveScroll: true },
    )
  }, 300)
}

const handleFilterUpdate = (index: number, value: any) => {
  const val = value?.toString() || ''

  if (index === 0) {
    searchQuery.value = val
    handleSearch()
  }
}

const handleDelete = (addressId: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
    router.delete(`/admin/settings/addresses/${addressId}`, {
      preserveScroll: true,
    })
  }
}

const columns: ColumnDef<Address>[] = [
  {
    id: 'index',
    header: () => h('div', { class: 'w-12' }, 'No'),
    cell: ({ row }) => {
      const index = row.index + 1 + (props.addresses.current_page - 1) * props.addresses.per_page
      return h('div', { class: 'font-medium' }, index)
    },
  },
  {
    accessorKey: 'customer',
    header: 'Pelanggan',
    cell: ({ row }) => {
      const customer = row.original.customer
      if (!customer) {
        return h('div', { class: 'text-muted-foreground' }, 'N/A')
      }
      return h('div', { class: 'space-y-1' }, [
        h('div', { class: 'font-medium' }, customer.name),
        h('div', { class: 'text-xs text-muted-foreground' }, customer.email),
      ])
    },
  },
  {
    accessorKey: 'label',
    header: 'Label',
    cell: ({ row }) => {
      const isDefault = row.original.is_default
      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', row.getValue('label')),
        isDefault
          ? h(Badge, { variant: 'default', class: 'text-xs' }, () => 'Default')
          : null,
      ])
    },
  },
  {
    accessorKey: 'recipient_name',
    header: 'Penerima',
    cell: ({ row }) => {
      return h('div', { class: 'space-y-1' }, [
        h('div', { class: 'font-medium' }, row.getValue('recipient_name')),
        h('div', { class: 'text-xs text-muted-foreground' }, row.original.recipient_phone),
      ])
    },
  },
  {
    accessorKey: 'address_line1',
    header: 'Alamat',
    cell: ({ row }) => {
      const address = row.original
      return h('div', { class: 'max-w-xs' }, [
        h('div', { class: 'text-sm' }, address.address_line1),
        h(
          'div',
          { class: 'text-xs text-muted-foreground' },
          `${address.city_label}, ${address.province_label} ${address.postal_code}`,
        ),
      ])
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Aksi'),
    cell: ({ row }) => {
      const address = row.original
      return h('div', { class: 'flex justify-end gap-2' }, [
        h(
          Button,
          {
            variant: 'ghost',
            size: 'sm',
            onClick: () => handleDelete(address.id),
          },
          () => h(Trash2, { class: 'h-4 w-4 text-destructive' }),
        ),
      ])
    },
  },
]

const table = useVueTable({
  data: computed(() => props.addresses.data),
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  },
})

const goToPage = (page: number) => {
  router.get(
    '/admin/settings/addresses',
    { page, search: searchQuery.value },
    { preserveState: true, preserveScroll: true },
  )
}
</script>

<template>
  <AppLayout title="Alamat Pelanggan">
    <div class="space-y-6">
      <!-- Statistics Cards -->
      <StatisticsCards :stats="statistics" :columns="3" />

      <!-- Main Card -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <MapPin class="h-5 w-5" />
            Alamat Pelanggan
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Filters -->
          <TableFilters :filters="filterConfigs" :on-update="handleFilterUpdate" />

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
                      Tidak ada data alamat.
                    </TableCell>
                  </TableRow>
                </template>
              </TableBody>
            </Table>
          </div>

          <!-- Pagination -->
          <TablePagination
            v-if="addresses.last_page > 1"
            :data="addresses"
            :on-page-change="goToPage"
            item-label="alamat"
          />
        </CardContent>
      </Card>
    </div>
  </AppLayout>
</template>
