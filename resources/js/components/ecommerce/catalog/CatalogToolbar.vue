<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Select from '@/components/ui/select/Select.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import { SlidersHorizontal, X, Grid3x3, LayoutGrid, Search } from 'lucide-vue-next';

interface Props {
    searchQuery: string;
    activeFiltersCount: number;
    sortBy: string;
    perPage: string;
    gridCols: 3 | 4;
}

interface Emits {
    (e: 'update:searchQuery', value: string): void;
    (e: 'search'): void;
    (e: 'toggle-filters'): void;
    (e: 'clear-filters'): void;
    (e: 'update:sortBy', value: string): void;
    (e: 'update:perPage', value: string): void;
    (e: 'update:gridCols', value: 3 | 4): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
    <div class="mb-6 flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <!-- Search Bar -->
        <div class="relative flex-1 w-full lg:max-w-md">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                :model-value="searchQuery"
                @update:model-value="(value) => emit('update:searchQuery', value as string)"
                placeholder="Cari produk..."
                class="pl-10 pr-4"
                @keyup.enter="emit('search')"
            />
        </div>

        <!-- Mobile Filter Toggle -->
        <Button
            variant="outline"
            size="default"
            @click="emit('toggle-filters')"
            class="lg:hidden w-full lg:w-auto"
        >
            <SlidersHorizontal class="h-4 w-4 mr-2" />
            Filter
            <Badge v-if="activeFiltersCount > 0" variant="secondary" class="ml-2">
                {{ activeFiltersCount }}
            </Badge>
        </Button>

        <!-- Clear Filters Button -->
        <Button
            v-if="activeFiltersCount > 0"
            variant="ghost"
            size="default"
            @click="emit('clear-filters')"
            class="text-destructive w-full lg:w-auto"
        >
            <X class="h-4 w-4 mr-2" />
            Hapus Filter ({{ activeFiltersCount }})
        </Button>

        <div class="flex items-center gap-2 w-full lg:w-auto lg:ml-auto">
            <!-- Grid Toggle -->
            <div class="hidden md:flex items-center gap-1 border rounded-lg p-1">
                <Button
                    variant="ghost"
                    size="sm"
                    :class="{ 'bg-secondary': gridCols === 3 }"
                    @click="emit('update:gridCols', 3)"
                >
                    <Grid3x3 class="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    :class="{ 'bg-secondary': gridCols === 4 }"
                    @click="emit('update:gridCols', 4)"
                >
                    <LayoutGrid class="h-4 w-4" />
                </Button>
            </div>

            <!-- Sort Dropdown -->
            <Select :model-value="sortBy" @update:model-value="(value) => emit('update:sortBy', value as string)">
                <SelectTrigger class="w-full sm:w-[180px]">
                    <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="price_asc">Harga Terendah</SelectItem>
                    <SelectItem value="price_desc">Harga Tertinggi</SelectItem>
                    <SelectItem value="name">Nama (A-Z)</SelectItem>
                    <SelectItem value="popular">Terpopuler</SelectItem>
                </SelectContent>
            </Select>

            <!-- Per Page -->
            <Select :model-value="perPage" @update:model-value="(value) => emit('update:perPage', value as string)">
                <SelectTrigger class="w-[100px]">
                    <SelectValue placeholder="Tampil" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="36">36</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>
