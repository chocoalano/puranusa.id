<script setup lang="ts">
import { computed, ref } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import CatalogHero from '@/components/ecommerce/catalog/CatalogHero.vue';
import CatalogStatsCard from '@/components/ecommerce/catalog/CatalogStatsCard.vue';
import CatalogToolbar from '@/components/ecommerce/catalog/CatalogToolbar.vue';
import CatalogFilterSidebar from '@/components/ecommerce/catalog/CatalogFilterSidebar.vue';
import CatalogResultsInfo from '@/components/ecommerce/catalog/CatalogResultsInfo.vue';
import CatalogProductGrid from '@/components/ecommerce/catalog/CatalogProductGrid.vue';
import CatalogEmptyState from '@/components/ecommerce/catalog/CatalogEmptyState.vue';
import CatalogPagination from '@/components/ecommerce/catalog/CatalogPagination.vue';
import { Package, Star, TrendingUp, Zap } from 'lucide-vue-next';

interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
    children?: Category[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    original_price: number | null;
    discount_percentage: number;
    image: string;
    rating?: number;
    review_count?: number;
    stock: number;
    is_new?: boolean;
    badge?: string | null;
    brand?: string;
    categories: { id: number; name: string; slug: string }[];
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Filters {
    search?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    in_stock?: boolean;
    brand?: string;
    sort_by?: string;
    sort_order?: string;
    per_page?: number;
}

interface Props {
    products: PaginatedProducts;
    categories: Category[];
    brands: string[];
    priceRange: { min: number; max: number };
    filters: Filters;
}

const props = defineProps<Props>();

// Local filter state
const searchQuery = ref(props.filters.search || '');
const selectedCategory = ref(props.filters.category || '');
const selectedBrands = ref<string[]>(props.filters.brand ? [props.filters.brand] : []);
const inStockOnly = ref(props.filters.in_stock || false);
const priceMin = ref(props.filters.min_price || props.priceRange.min);
const priceMax = ref(props.filters.max_price || props.priceRange.max);
const sortBy = ref(props.filters.sort_by || 'newest');
const perPage = ref(String(props.filters.per_page || 12));
const showMobileFilters = ref(false);
const gridCols = ref<3 | 4>(4);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const applyFilters = () => {
    router.get('/toko', {
        search: searchQuery.value || undefined,
        category: selectedCategory.value || undefined,
        brand: selectedBrands.value.length > 0 ? selectedBrands.value[0] : undefined,
        in_stock: inStockOnly.value || undefined,
        min_price: priceMin.value !== props.priceRange.min ? priceMin.value : undefined,
        max_price: priceMax.value !== props.priceRange.max ? priceMax.value : undefined,
        sort_by: sortBy.value,
        per_page: Number(perPage.value),
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const clearFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = '';
    selectedBrands.value = [];
    inStockOnly.value = false;
    priceMin.value = props.priceRange.min;
    priceMax.value = props.priceRange.max;
    sortBy.value = 'newest';
    perPage.value = '12';

    router.get('/toko', {}, {
        preserveState: true,
        preserveScroll: true,
    });
};

const activeFiltersCount = computed(() => {
    let count = 0;
    if (searchQuery.value) count++;
    if (selectedCategory.value) count++;
    if (selectedBrands.value.length > 0) count++;
    if (inStockOnly.value) count++;
    if (priceMin.value !== props.priceRange.min || priceMax.value !== props.priceRange.max) count++;
    return count;
});

const goToPage = (page: number) => {
    router.get('/toko', {
        ...props.filters,
        page,
    }, {
        preserveState: true,
        preserveScroll: false,
    });
};

</script>

<template>
    <EcommerceLayout>
        <Head title="Toko - Belanja Produk" />

        <!-- Hero Section -->
        <CatalogHero
            title="Katalog Produk"
            :description="`Temukan ${products.total} produk berkualitas dengan harga terbaik`"
        />

        <div class="container mx-auto px-4 py-8">
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <CatalogStatsCard
                    :icon="Package"
                    label="Total Produk"
                    :value="products.total"
                    icon-color="primary"
                />
                <CatalogStatsCard
                    :icon="Zap"
                    label="Kategori"
                    :value="categories.length"
                    icon-color="green-600 dark:text-green-400"
                />
                <CatalogStatsCard
                    :icon="TrendingUp"
                    label="Brand"
                    :value="brands.length"
                    icon-color="orange-600 dark:text-orange-400"
                />
                <CatalogStatsCard
                    :icon="Star"
                    label="Harga Mulai"
                    :value="formatCurrency(priceRange.min)"
                    icon-color="blue-600 dark:text-blue-400"
                />
            </div>

            <!-- Toolbar with Search -->
            <CatalogToolbar
                :search-query="searchQuery"
                :active-filters-count="activeFiltersCount"
                :sort-by="sortBy"
                :per-page="perPage"
                :grid-cols="gridCols"
                @update:search-query="searchQuery = $event"
                @search="applyFilters"
                @toggle-filters="showMobileFilters = !showMobileFilters"
                @clear-filters="clearFilters"
                @update:sort-by="sortBy = $event; applyFilters()"
                @update:per-page="perPage = $event; applyFilters()"
                @update:grid-cols="gridCols = $event"
            />

            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Filter Sidebar -->
                <CatalogFilterSidebar
                    :categories="categories"
                    :brands="brands"
                    :price-range="priceRange"
                    v-model:selected-category="selectedCategory"
                    v-model:selected-brands="selectedBrands"
                    v-model:price-min="priceMin"
                    v-model:price-max="priceMax"
                    v-model:in-stock-only="inStockOnly"
                    :active-filters-count="activeFiltersCount"
                    :show-mobile="showMobileFilters"
                    @apply-filters="applyFilters"
                    @clear-filters="clearFilters"
                />

                <!-- Main Content -->
                <main class="flex-1">
                    <!-- Results Info -->
                    <CatalogResultsInfo
                        :from="products.from"
                        :to="products.to"
                        :total="products.total"
                        :search-query="searchQuery"
                        :selected-category="selectedCategory"
                        :in-stock-only="inStockOnly"
                        :categories="categories"
                        @clear-search="searchQuery = ''; applyFilters()"
                        @clear-category="selectedCategory = ''; applyFilters()"
                        @clear-stock="inStockOnly = false; applyFilters()"
                    />

                    <!-- Products Grid -->
                    <CatalogProductGrid
                        v-if="products.data.length > 0"
                        :products="products.data"
                        :grid-cols="gridCols"
                        class="mb-8"
                    />

                    <!-- Empty State -->
                    <CatalogEmptyState
                        v-else
                        @clear-filters="clearFilters"
                        @reset-search="searchQuery = ''; applyFilters()"
                    />

                    <!-- Pagination -->
                    <CatalogPagination
                        :current-page="products.current_page"
                        :last-page="products.last_page"
                        @go-to-page="goToPage"
                    />
                </main>
            </div>
        </div>
    </EcommerceLayout>
</template>
