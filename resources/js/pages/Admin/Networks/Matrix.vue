<script setup lang="ts">
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'
import StatisticsCards from '@/components/admin/StatisticsCards.vue'
import TableFilters, { type FilterConfig } from '@/components/admin/TableFilters.vue'
import TablePagination from '@/components/admin/TablePagination.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
}

interface Network {
  id: number
  member: Member
  sponsor: Member
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
    level_1: number
    level_2: number
    level_3_plus: number
  }
  filters?: {
    search?: string
    level?: string
  }
}

const props = defineProps<Props>()

const searchQuery = ref(props.filters?.search || '')
const selectedLevel = ref(props.filters?.level || 'all')
const sorting = ref<SortingState>([])
let searchTimeout: ReturnType<typeof setTimeout>

// Statistics configuration
const statistics = computed(() => [
  {
    label: 'Total Member',
    value: props.statistics.total_members,
  },
  {
    label: 'Level 1',
    value: props.statistics.level_1,
  },
  {
    label: 'Level 2',
    value: props.statistics.level_2,
  },
  {
    label: 'Level 3+',
    value: props.statistics.level_3_plus,
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
    placeholder: 'Semua Level',
    modelValue: selectedLevel.value,
    options: [
      { value: 'all', label: 'Semua Level' },
      { value: '1', label: 'Level 1' },
      { value: '2', label: 'Level 2' },
      { value: '3', label: 'Level 3' },
      { value: '4', label: 'Level 4' },
      { value: '5', label: 'Level 5+' },
    ],
  },
])

const columns: ColumnDef<Network>[] = [
  {
    accessorKey: 'member',
    header: 'Member',
    cell: ({ row }) => {
      const member = row.original.member
      return h('div', { class: 'space-y-1' }, [
        h('div', { class: 'font-medium' }, member.name),
        h('div', { class: 'text-xs text-muted-foreground' }, member.email),
      ])
    },
  },
  {
    accessorKey: 'sponsor',
    header: 'Sponsor',
    cell: ({ row }) => {
      const sponsor = row.original.sponsor
      return h('div', { class: 'space-y-1' }, [
        h('div', { class: 'font-medium' }, sponsor.name),
        h('div', { class: 'text-xs text-muted-foreground' }, sponsor.email),
      ])
    },
  },
  {
    accessorKey: 'level',
    header: 'Level',
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
      '/admin/networks/matrix',
      { search: searchQuery.value, level: selectedLevel.value },
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
    selectedLevel.value = val
    router.get(
      '/admin/networks/matrix',
      { search: searchQuery.value, level: val === 'all' ? undefined : val },
      { preserveState: true, preserveScroll: true },
    )
  }
}

const goToPage = (page: number) => {
  router.get(
    '/admin/networks/matrix',
    { page, search: searchQuery.value, level: selectedLevel.value === 'all' ? undefined : selectedLevel.value },
    { preserveState: true, preserveScroll: true },
  )
}
</script>

<template>
  <AppLayout title="Jaringan Matrix">
    <div class="space-y-6">
      <!-- Statistics Cards -->
      <StatisticsCards :stats="statistics" :columns="4" />

      <!-- Main Content -->
      <Card>
        <CardHeader>
          <CardTitle>Jaringan Matrix</CardTitle>
          <CardDescription>
            Monitoring member dalam struktur jaringan matrix (sponsor - downline)
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
