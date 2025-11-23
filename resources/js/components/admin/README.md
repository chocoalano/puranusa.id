# Admin Components

Komponen-komponen reusable untuk halaman admin yang konsisten dan mudah di-maintain.

## StatisticsCards

Komponen untuk menampilkan cards statistik di bagian atas halaman.

### Props

- `stats` (Array): Array of stat objects dengan struktur:
  ```ts
  {
    label: string          // Label statistik
    value: string | number // Nilai statistik
    formatter?: (value: number) => string // Optional custom formatter
  }
  ```
- `columns` (Number, default: 4): Jumlah kolom grid (2-6)

### Usage

```vue
<script setup lang="ts">
import StatisticsCards from '@/components/admin/StatisticsCards.vue'

const stats = [
  { label: 'Total Users', value: 1234 },
  { 
    label: 'Total Revenue', 
    value: 50000000,
    formatter: (val) => new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(val)
  },
]
</script>

<template>
  <StatisticsCards :stats="stats" :columns="3" />
</template>
```

## TableFilters

Komponen untuk filter pencarian dan dropdown select.

### Props

- `filters` (Array): Array of filter configs:
  ```ts
  {
    type: 'search' | 'select'
    placeholder?: string
    modelValue: string
    options?: Array<{ value: string, label: string }> // For select type
  }
  ```
- `onUpdate` (Function): Callback `(index: number, value: any) => void`

### Usage

```vue
<script setup lang="ts">
import TableFilters, { type FilterConfig } from '@/components/admin/TableFilters.vue'

const searchQuery = ref('')
const selectedStatus = ref('')

const filterConfigs = computed<FilterConfig[]>(() => [
  {
    type: 'search',
    placeholder: 'Cari...',
    modelValue: searchQuery.value,
  },
  {
    type: 'select',
    placeholder: 'Semua Status',
    modelValue: selectedStatus.value,
    options: [
      { value: '', label: 'Semua' },
      { value: 'active', label: 'Aktif' },
      { value: 'inactive', label: 'Tidak Aktif' },
    ],
  },
])

const handleFilterUpdate = (index: number, value: any) => {
  if (index === 0) {
    searchQuery.value = value
    // Handle search...
  } else if (index === 1) {
    selectedStatus.value = value?.toString() || ''
    // Handle status change...
  }
}
</script>

<template>
  <TableFilters :filters="filterConfigs" :on-update="handleFilterUpdate" />
</template>
```

## TablePagination

Komponen untuk pagination dengan navigasi lengkap (First, Previous, Next, Last).

### Props

- `data` (Object): Pagination data dari Laravel:
  ```ts
  {
    current_page: number
    last_page: number
    from: number
    to: number
    total: number
  }
  ```
- `itemLabel` (String, default: 'item'): Label untuk item (e.g., 'transaksi', 'user', 'produk')
- `onPageChange` (Function): Callback `(page: number) => void`

### Usage

```vue
<script setup lang="ts">
import TablePagination from '@/components/admin/TablePagination.vue'

const goToPage = (page: number) => {
  router.get('/admin/users', { page }, { 
    preserveState: true, 
    preserveScroll: true 
  })
}
</script>

<template>
  <TablePagination
    :data="users"
    item-label="user"
    :on-page-change="goToPage"
  />
</template>
```

## Complete Example

Lihat `/resources/js/pages/Admin/Wallets/Transactions.vue` untuk contoh lengkap penggunaan semua komponen bersama dengan TanStack Table.

## Benefits

✅ **Konsistensi** - Semua halaman admin menggunakan komponen yang sama  
✅ **Maintainability** - Update di satu tempat, berlaku untuk semua halaman  
✅ **Reusability** - Mudah digunakan ulang di halaman baru  
✅ **Type Safety** - Full TypeScript support dengan proper interfaces  
✅ **Clean Code** - Pisahkan concerns, lebih mudah dibaca dan di-test
