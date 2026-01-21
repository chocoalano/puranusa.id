<script setup lang="ts">
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'
import StatisticsCards from '@/components/admin/StatisticsCards.vue'
import TableFilters, { type FilterConfig } from '@/components/admin/TableFilters.vue'
import TablePagination from '@/components/admin/TablePagination.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Trash2, Mail } from 'lucide-vue-next'
import { usePermissions } from '@/composables/usePermissions'

interface Newsletter {
  id: number
  email: string
  subscribed_at: string
  ip_address: string
  created_at: string
}

interface Props {
  newsletters: {
    data: Newsletter[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  statistics: {
    total_subscribers: number
    total_today: number
    total_this_month: number
  }
  filters?: {
    search?: string
  }
}
const { isSuperAdmin, isAdmin } = usePermissions()
const props = defineProps<Props>()

const searchQuery = ref(props.filters?.search || '')
const sorting = ref<SortingState>([])
let searchTimeout: ReturnType<typeof setTimeout>

const statistics = computed(() => [
  { label: 'Total Subscriber', value: props.statistics.total_subscribers },
  { label: 'Hari Ini', value: props.statistics.total_today },
  { label: 'Bulan Ini', value: props.statistics.total_this_month },
])

const filterConfigs = computed<FilterConfig[]>(() => [
  {
    type: 'search',
    placeholder: 'Cari email...',
    modelValue: searchQuery.value,
  },
])

const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    router.get(
      '/admin/settings/newsletters',
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

const handleDelete = (subscriberId: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus subscriber ini?')) {
    router.delete(`/admin/settings/newsletters/${subscriberId}`, {
      preserveScroll: true,
    })
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const columns: ColumnDef<Newsletter>[] = [
  {
    id: 'index',
    header: () => h('div', { class: 'w-12' }, 'No'),
    cell: ({ row }) => {
      const index = row.index + 1 + (props.newsletters.current_page - 1) * props.newsletters.per_page
      return h('div', { class: 'font-medium' }, index)
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('email'))
    },
  },
  {
    accessorKey: 'ip_address',
    header: 'IP Address',
    cell: ({ row }) => {
      return h('code', { class: 'rounded bg-muted px-2 py-1 text-xs' }, row.getValue('ip_address'))
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Daftar',
    cell: ({ row }) => {
      return h('div', { class: 'text-sm' }, formatDate(row.getValue('created_at')))
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Aksi'),
    cell: ({ row }) => {
      const newsletter = row.original
      const actions = []
      if (isSuperAdmin || isAdmin) {
        actions.push(h(
          Button,
          {
            variant: 'ghost',
            size: 'sm',
            onClick: () => handleDelete(newsletter.id),
          },
          () => h(Trash2, { class: 'h-4 w-4 text-destructive' }),
        ),)
      }
      return h('div', { class: 'flex justify-end gap-2' }, actions)
    },
  },
]

const table = useVueTable({
  data: computed(() => props.newsletters.data),
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
    '/admin/settings/newsletters',
    { page, search: searchQuery.value },
    { preserveState: true, preserveScroll: true },
  )
}
</script>

<template>
  <AppLayout title="Newsletter Subscribers">
    <div class="space-y-6">
      <StatisticsCards :stats="statistics" :columns="3" />

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Mail class="h-5 w-5" />
            Newsletter Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <TableFilters :filters="filterConfigs" :on-update="handleFilterUpdate" />

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
                      Tidak ada data subscriber.
                    </TableCell>
                  </TableRow>
                </template>
              </TableBody>
            </Table>
          </div>

          <TablePagination
            v-if="newsletters.last_page > 1"
            :data="newsletters"
            :on-page-change="goToPage"
            item-label="subscriber"
          />
        </CardContent>
      </Card>
    </div>
  </AppLayout>
</template>
