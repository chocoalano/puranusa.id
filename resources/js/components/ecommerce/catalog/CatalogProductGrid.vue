<script setup lang="ts">
import CardCatalogProduct from '@/components/ecommerce/CardCatalogProduct.vue';

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

interface Props {
    products: Product[];
    gridCols: 3 | 4;
}

defineProps<Props>();
</script>

<template>
    <div
        :class="[
            'grid gap-6',
            gridCols === 3
                ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        ]"
    >
        <CardCatalogProduct
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>
