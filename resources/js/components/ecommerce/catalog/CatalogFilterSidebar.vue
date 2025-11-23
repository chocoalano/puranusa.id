<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ListFilter } from 'lucide-vue-next';

interface Category {
    id: number;
    name: string;
    slug: string;
    children?: Category[];
}

interface Props {
    categories: Category[];
    brands: string[];
    priceRange: { min: number; max: number };
    selectedCategory: string;
    selectedBrands: string[];
    priceMin: number;
    priceMax: number;
    inStockOnly: boolean;
    activeFiltersCount: number;
    showMobile: boolean;
}

interface Emits {
    (e: 'update:selectedCategory', value: string): void;
    (e: 'update:selectedBrands', value: string[]): void;
    (e: 'update:priceMin', value: number): void;
    (e: 'update:priceMax', value: number): void;
    (e: 'update:inStockOnly', value: boolean): void;
    (e: 'apply-filters'): void;
    (e: 'clear-filters'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};
</script>

<template>
    <aside
        :class="[
            'lg:w-72 space-y-4',
            showMobile ? 'block' : 'hidden lg:block'
        ]"
    >
        <Card class="sticky top-4">
            <CardContent class="p-6 space-y-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <ListFilter class="h-5 w-5 text-primary" />
                        <h3 class="font-semibold text-lg">Filter Produk</h3>
                    </div>
                    <Button
                        v-if="activeFiltersCount > 0"
                        variant="ghost"
                        size="sm"
                        @click="emit('clear-filters')"
                    >
                        Reset
                    </Button>
                </div>

                <Separator />

                <!-- Categories Section -->
                <div class="space-y-3">
                    <Label class="text-sm font-semibold">Kategori</Label>
                    <div class="space-y-1 max-h-64 overflow-y-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            class="w-full justify-start font-normal"
                            :class="{ 'bg-primary/10 text-primary font-medium': !selectedCategory }"
                            @click="emit('update:selectedCategory', ''); emit('apply-filters')"
                        >
                            Semua Kategori
                        </Button>
                        <template v-for="category in categories" :key="category.id">
                            <Button
                                variant="ghost"
                                size="sm"
                                class="w-full justify-start font-normal"
                                :class="{ 'bg-primary/10 text-primary font-medium': selectedCategory === category.slug }"
                                @click="emit('update:selectedCategory', category.slug); emit('apply-filters')"
                            >
                                {{ category.name }}
                            </Button>
                            <template v-if="category.children && category.children.length > 0">
                                <Button
                                    v-for="child in category.children"
                                    :key="child.id"
                                    variant="ghost"
                                    size="sm"
                                    class="w-full justify-start pl-6 text-sm font-normal"
                                    :class="{ 'bg-primary/10 text-primary font-medium': selectedCategory === child.slug }"
                                    @click="emit('update:selectedCategory', child.slug); emit('apply-filters')"
                                >
                                    ↳ {{ child.name }}
                                </Button>
                            </template>
                        </template>
                    </div>
                </div>

                <Separator />

                <!-- Price Range Section -->
                <div class="space-y-4">
                    <Label class="text-sm font-semibold">Rentang Harga</Label>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Min</span>
                            <span class="font-medium">{{ formatCurrency(priceMin) }}</span>
                        </div>
                        <input
                            :value="priceMin"
                            @input="emit('update:priceMin', Number(($event.target as HTMLInputElement).value))"
                            type="range"
                            :min="priceRange.min"
                            :max="priceMax"
                            :step="10000"
                            class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Max</span>
                            <span class="font-medium">{{ formatCurrency(priceMax) }}</span>
                        </div>
                        <input
                            :value="priceMax"
                            @input="emit('update:priceMax', Number(($event.target as HTMLInputElement).value))"
                            type="range"
                            :min="priceMin"
                            :max="priceRange.max"
                            :step="10000"
                            class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div class="grid grid-cols-2 gap-2 pt-2">
                            <div>
                                <Label class="text-xs">Minimum</Label>
                                <Input
                                    :model-value="priceMin"
                                    @update:model-value="emit('update:priceMin', Number($event))"
                                    type="number"
                                    :min="priceRange.min"
                                    :max="priceMax"
                                    class="h-9"
                                />
                            </div>
                            <div>
                                <Label class="text-xs">Maximum</Label>
                                <Input
                                    :model-value="priceMax"
                                    @update:model-value="emit('update:priceMax', Number($event))"
                                    type="number"
                                    :min="priceMin"
                                    :max="priceRange.max"
                                    class="h-9"
                                />
                            </div>
                        </div>
                        <Button size="sm" class="w-full" @click="emit('apply-filters')">
                            Terapkan Filter Harga
                        </Button>
                    </div>
                </div>

                <Separator />

                <!-- Brands Section -->
                <div v-if="brands.length > 0" class="space-y-3">
                    <Label class="text-sm font-semibold">Brand</Label>
                    <div class="space-y-2 max-h-48 overflow-y-auto">
                        <div
                            v-for="brand in brands"
                            :key="brand"
                            class="flex items-center space-x-2"
                        >
                            <Checkbox
                                :id="`brand-${brand}`"
                                :checked="selectedBrands.includes(brand)"
                                @update:checked="(checked: boolean) => {
                                    if (checked) {
                                        emit('update:selectedBrands', [brand]);
                                    } else {
                                        emit('update:selectedBrands', []);
                                    }
                                    emit('apply-filters');
                                }"
                            />
                            <label
                                :for="`brand-${brand}`"
                                class="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {{ brand }}
                            </label>
                        </div>
                    </div>
                </div>

                <Separator />

                <!-- Stock Availability -->
                <div class="space-y-3">
                    <Label class="text-sm font-semibold">Ketersediaan</Label>
                    <div class="flex items-center space-x-2">
                        <Checkbox
                            id="in-stock"
                            :checked="inStockOnly"
                            @update:checked="emit('update:inStockOnly', $event); emit('apply-filters')"
                        />
                        <label for="in-stock" class="text-sm cursor-pointer leading-none">
                            Hanya produk yang tersedia
                        </label>
                    </div>
                </div>
            </CardContent>
        </Card>
    </aside>
</template>
