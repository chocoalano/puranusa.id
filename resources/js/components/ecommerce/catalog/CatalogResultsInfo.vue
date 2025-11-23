<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-vue-next';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    from: number;
    to: number;
    total: number;
    searchQuery: string;
    selectedCategory: string;
    inStockOnly: boolean;
    categories: Category[];
}

interface Emits {
    (e: 'clear-search'): void;
    (e: 'clear-category'): void;
    (e: 'clear-stock'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
    <div class="mb-6">
        <p class="text-sm text-muted-foreground">
            Menampilkan <span class="font-semibold text-foreground">{{ from }}</span> -
            <span class="font-semibold text-foreground">{{ to }}</span> dari
            <span class="font-semibold text-foreground">{{ total }}</span> produk
        </p>
        <div v-if="searchQuery || selectedCategory || inStockOnly" class="flex flex-wrap gap-2 mt-2">
            <Badge v-if="searchQuery" variant="secondary" class="gap-1">
                <Search class="h-3 w-3" />
                "{{ searchQuery }}"
                <button @click="emit('clear-search')" class="ml-1 hover:text-destructive">
                    <X class="h-3 w-3" />
                </button>
            </Badge>
            <Badge v-if="selectedCategory" variant="secondary" class="gap-1">
                Kategori: {{ categories.find(c => c.slug === selectedCategory)?.name }}
                <button @click="emit('clear-category')" class="ml-1 hover:text-destructive">
                    <X class="h-3 w-3" />
                </button>
            </Badge>
            <Badge v-if="inStockOnly" variant="secondary" class="gap-1">
                Tersedia
                <button @click="emit('clear-stock')" class="ml-1 hover:text-destructive">
                    <X class="h-3 w-3" />
                </button>
            </Badge>
        </div>
    </div>
</template>
