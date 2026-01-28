<script setup lang="ts">
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'
import StatisticsCards from '@/components/admin/StatisticsCards.vue'
import TableFilters, { type FilterConfig } from '@/components/admin/TableFilters.vue'
import TablePagination from '@/components/admin/TablePagination.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

interface Member {
  id: number
  name: string
  email: string
  username: string
}

interface Network {
  id: number
  member: Member
  upline: Member
  position: string
  status: number
  level: number
  created_at: string
}

interface Props {
  networks: {
    data: Network[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  statistics: {
    total_members: number
    left_members: number
    right_members: number
    active_members: number
  }
  filters?: {
    search?: string
    position?: string
  }
}

const props = defineProps<Props>()

const searchQuery = ref(props.filters?.search || '')
const selectedPosition = ref(props.filters?.position || 'all')
const sorting = ref<SortingState>([])
let searchTimeout: ReturnType<typeof setTimeout>

// Statistics configuration
const statistics = computed(() => [
  {
    label: 'Total Member',
    value: props.statistics.total_members,
  },
  {
    label: 'Member Kiri',
    value: props.statistics.left_members,
  },
  {
    label: 'Member Kanan',
    value: props.statistics.right_members,
  },
  {
    label: 'Member Aktif',
    value: props.statistics.active_members,
  },
])

// Filter configuration
const filterConfigs = computed<FilterConfig[]>(() => [
  {
    type: 'search',
    placeholder: 'Cari member...',
    modelValue: searchQuery.value,
  },
  {
    type: 'select',
    placeholder: 'Semua Posisi',
    modelValue: selectedPosition.value,
    options: [
      { value: 'all', label: 'Semua Posisi' },
      { value: 'left', label: 'Kiri' },
      { value: 'right', label: 'Kanan' },
    ],
  },
])

const getPositionVariant = (position: string) => {
  return position === 'left' ? 'default' : 'secondary'
}

const columns: ColumnDef<Network>[] = [
  {
    accessorKey: 'member',
    header: 'Member',
    cell: ({ row }) => {
      const member = row.original.member
      return h('div', { class: 'space-y-1' }, [
        h('div', { class: 'font-medium' }, member.name),
        h('div', { class: 'text-xs text-muted-foreground' }, member.username),
      ])
    },
  },
  {
    accessorKey: 'upline',
    header: 'Upline',
    cell: ({ row }) => {
      const upline = row.original.upline
      return h('div', { class: 'space-y-1' }, [
        h('div', { class: 'font-medium' }, upline.name),
        h('div', { class: 'text-xs text-muted-foreground' }, upline.username),
      ])
    },
  },
  {
    accessorKey: 'position',
    header: 'Posisi',
    cell: ({ row }) => {
      const position = row.getValue('position') as string
      return h(Badge, { variant: getPositionVariant(position) }, () =>
        position === 'left' ? 'KIRI' : 'KANAN',
      )
    },
  },
  {
    accessorKey: 'level',
    header: 'Level',
  },
  {
    accessorKey: 'status',
    header: 'Status Jaringan Aktif/Nonaktif',
    cell: ({ row }) => {
      const status = row.getValue('status') as boolean
      return h(Badge, { variant: status ? 'default' : 'secondary' }, () =>
        status ? 'Jaringan Aktif' : 'Jaringan Nonaktif',
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Bergabung',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date)
    },
  },
]

const table = useVueTable({
  data: computed(() => props.networks.data),
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

const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    router.get(
      '/admin/networks/binary',
      { search: searchQuery.value, position: selectedPosition.value },
      { preserveState: true, preserveScroll: true },
    )
  }, 300)
}

const handleFilterUpdate = (index: number, value: any) => {
  const val = value?.toString() || 'all'

  if (index === 0) {
    searchQuery.value = val
    handleSearch()
  } else if (index === 1) {
    selectedPosition.value = val
    router.get(
      '/admin/networks/binary',
      { search: searchQuery.value, position: val === 'all' ? undefined : val },
      { preserveState: true, preserveScroll: true },
    )
  }
}

const goToPage = (page: number) => {
  router.get(
    '/admin/networks/binary',
    { page, search: searchQuery.value, position: selectedPosition.value === 'all' ? undefined : selectedPosition.value },
    { preserveState: true, preserveScroll: true },
  )
}
</script>

<template>
  <AppLayout title="Jaringan Binary">
    <div class="space-y-6">
      <!-- Statistics Cards -->
      <StatisticsCards :stats="statistics" :columns="4" />

      <!-- Main Content -->
      <Card>
        <CardHeader>
          <CardTitle>Jaringan Binary</CardTitle>
          <CardDescription>
            Monitoring member dalam struktur jaringan binary (kiri - kanan)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <!-- Filters -->
          <TableFilters :filters="filterConfigs" :on-update="handleFilterUpdate" />

          <!-- Table -->
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                  <TableHead v-for="header in headerGroup.headers" :key="header.id">
                    <div
                      v-if="!header.isPlaceholder"
                      :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
                      @click="header.column.getToggleSortingHandler()?.($event)"
                    >
                      <FlexRender
                        :render="header.column.columnDef.header"
                        :props="header.getContext()"
                      />
                      <span v-if="header.column.getIsSorted() === 'asc'"> ↑</span>
                      <span v-else-if="header.column.getIsSorted() === 'desc'"> ↓</span>
                    </div>
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
                      Tidak ada data.
                    </TableCell>
                  </TableRow>
                </template>
              </TableBody>
            </Table>
          </div>

          <!-- Pagination -->
          <TablePagination
            :data="networks"
            item-label="member"
            :on-page-change="goToPage"
          />
        </CardContent>
      </Card>
    </div>
  </AppLayout>
</template>
