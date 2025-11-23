# Catalog Components

Koleksi komponen Vue reusable untuk halaman katalog produk e-commerce. Komponen-komponen ini dirancang untuk modular, maintainable, dan mudah digunakan kembali.

## Komponen Tersedia

### 1. CatalogHero.vue
Banner hero dengan gradient untuk header halaman katalog.

**Props:**
- `title` (string) - Judul utama
- `description` (string) - Deskripsi/subtitle

**Contoh:**
```vue
<CatalogHero
    title="Katalog Produk"
    description="Temukan 500 produk berkualitas"
/>
```

---

### 2. CatalogStatsCard.vue
Card statistik dengan icon dan value.

**Props:**
- `icon` (Component) - Lucide icon component
- `label` (string) - Label statistik
- `value` (string | number) - Nilai statistik
- `iconColor` (string, optional) - Warna icon (default: 'primary')

**Contoh:**
```vue
<CatalogStatsCard
    :icon="Package"
    label="Total Produk"
    :value="1500"
    icon-color="blue-600"
/>
```

---

### 3. CatalogToolbar.vue
Toolbar lengkap dengan search bar, filter toggle, sort, pagination, dan grid view toggle dalam satu row.

**Props:**
- `searchQuery` (string) - Query pencarian
- `activeFiltersCount` (number) - Jumlah filter aktif
- `sortBy` (string) - Nilai sort saat ini
- `perPage` (string) - Jumlah item per halaman
- `gridCols` (3 | 4) - Jumlah kolom grid

**Events:**
- `update:searchQuery` - Update search query
- `search` - Trigger pencarian
- `toggle-filters` - Toggle mobile filters
- `clear-filters` - Hapus semua filter
- `update:sortBy` - Update sort value
- `update:perPage` - Update per page value
- `update:gridCols` - Update grid columns

**Contoh:**
```vue
<CatalogToolbar
    :search-query="searchQuery"
    :active-filters-count="3"
    :sort-by="sortBy"
    :per-page="perPage"
    :grid-cols="gridCols"
    @update:search-query="searchQuery = $event"
    @search="performSearch"
    @update:sort-by="sortBy = $event"
    @clear-filters="clearAllFilters"
/>
```

---

### 4. CatalogFilterSidebar.vue
Sidebar filter dengan kategori, harga, brand, dan stock availability.

**Props:**
- `categories` (Category[]) - Daftar kategori dengan hierarki
- `brands` (string[]) - Daftar brand
- `priceRange` (object) - Range harga min/max
- `selectedCategory` (string) - Kategori terpilih
- `selectedBrands` (string[]) - Brand terpilih
- `priceMin` (number) - Harga minimum
- `priceMax` (number) - Harga maximum
- `inStockOnly` (boolean) - Filter hanya stok tersedia
- `activeFiltersCount` (number) - Jumlah filter aktif
- `showMobile` (boolean) - Tampilkan di mobile

**Events:**
- `update:selectedCategory` - Update kategori
- `update:selectedBrands` - Update brands
- `update:priceMin` - Update harga minimum
- `update:priceMax` - Update harga maximum
- `update:inStockOnly` - Update filter stok
- `apply-filters` - Terapkan filter
- `clear-filters` - Hapus semua filter

**Contoh:**
```vue
<CatalogFilterSidebar
    :categories="categories"
    :brands="brands"
    :price-range="{ min: 0, max: 1000000 }"
    v-model:selected-category="selectedCategory"
    v-model:price-min="priceMin"
    @apply-filters="applyFilters"
/>
```

---

### 5. CatalogResultsInfo.vue
Informasi hasil pencarian dengan badge filter aktif.

**Props:**
- `from` (number) - Index awal item
- `to` (number) - Index akhir item
- `total` (number) - Total item
- `searchQuery` (string) - Query pencarian
- `selectedCategory` (string) - Kategori terpilih
- `inStockOnly` (boolean) - Filter stok aktif
- `categories` (Category[]) - Daftar kategori

**Events:**
- `clear-search` - Hapus search query
- `clear-category` - Hapus filter kategori
- `clear-stock` - Hapus filter stok

**Contoh:**
```vue
<CatalogResultsInfo
    :from="1"
    :to="12"
    :total="150"
    :search-query="searchQuery"
    @clear-search="searchQuery = ''"
/>
```

---

### 6. CatalogProductGrid.vue
Grid responsif untuk menampilkan produk.

**Props:**
- `products` (Product[]) - Array produk
- `gridCols` (3 | 4) - Jumlah kolom (3 atau 4)

**Contoh:**
```vue
<CatalogProductGrid
    :products="productList"
    :grid-cols="4"
/>
```

---

### 7. CatalogEmptyState.vue
Empty state ketika tidak ada produk ditemukan.

**Events:**
- `clear-filters` - Hapus semua filter
- `reset-search` - Reset pencarian

**Contoh:**
```vue
<CatalogEmptyState
    @clear-filters="clearFilters"
    @reset-search="resetSearch"
/>
```

---

### 8. CatalogPagination.vue
Komponen pagination dengan navigasi halaman.

**Props:**
- `currentPage` (number) - Halaman saat ini
- `lastPage` (number) - Halaman terakhir

**Events:**
- `go-to-page` - Navigasi ke halaman tertentu

**Contoh:**
```vue
<CatalogPagination
    :current-page="1"
    :last-page="10"
    @go-to-page="goToPage"
/>
```

---

## Penggunaan Lengkap

Lihat `resources/js/pages/ecommerce/Toko.vue` untuk contoh implementasi lengkap dari semua komponen ini.

## TypeScript Interfaces

```typescript
interface Category {
    id: number;
    name: string;
    slug: string;
    children?: Category[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string;
    stock: number;
    // ... other fields
}
```

## Styling

Semua komponen menggunakan:
- **shadcn-vue** components (Button, Input, Card, dll)
- **Tailwind CSS** untuk styling
- **lucide-vue-next** untuk icons
- Dark mode support built-in
