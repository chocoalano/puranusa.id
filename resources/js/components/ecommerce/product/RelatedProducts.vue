<script setup lang="ts">
import CardCatalogProduct from '@/components/ecommerce/CardCatalogProduct.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

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
}

interface Props {
    products: Product[];
    title?: string;
}

withDefaults(defineProps<Props>(), {
    title: 'Produk Terkait',
});

const scrollContainer = ref<HTMLElement | null>(null);

const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.value) {
        const scrollAmount = 300;
        scrollContainer.value.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    }
};
</script>

<template>
    <section class="py-12 bg-muted/30">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl md:text-3xl font-bold">{{ title }}</h2>
                <div class="hidden md:flex gap-2">
                    <Button variant="outline" size="icon" @click="scroll('left')">
                        <ChevronLeft class="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" @click="scroll('right')">
                        <ChevronRight class="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div
                ref="scrollContainer"
                class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style="scroll-snap-type: x mandatory"
            >
                <div
                    v-for="product in products"
                    :key="product.id"
                    class="flex-shrink-0 w-64 snap-start"
                >
                    <CardCatalogProduct :product="product" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
