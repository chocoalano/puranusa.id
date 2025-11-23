<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Award, Package, Truck } from 'lucide-vue-next';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    name: string;
    brand?: string;
    sku: string;
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice: number | null;
    discountPercentage: number;
    stock: number;
    categories: Category[];
    warrantyMonths?: number;
    isNew: boolean;
}

defineProps<Props>();

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};
</script>

<template>
    <div class="space-y-6">
        <!-- Categories & Badge -->
        <div class="flex flex-wrap items-center gap-2">
            <Badge
                v-for="category in categories"
                :key="category.id"
                variant="secondary"
                class="text-xs"
            >
                {{ category.name }}
            </Badge>
            <Badge v-if="isNew" variant="default" class="text-xs bg-green-500">
                BARU
            </Badge>
        </div>

        <!-- Product Name -->
        <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ name }}</h1>
            <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <span v-if="brand" class="flex items-center gap-1">
                    <Award class="h-4 w-4" />
                    Brand: <span class="font-medium text-foreground">{{ brand }}</span>
                </span>
                <span class="flex items-center gap-1">
                    <Package class="h-4 w-4" />
                    SKU: <span class="font-medium">{{ sku }}</span>
                </span>
            </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-3">
            <div class="flex items-center gap-1">
                <Star class="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span class="text-xl font-bold">{{ rating }}</span>
            </div>
            <Separator orientation="vertical" class="h-6" />
            <span class="text-sm text-muted-foreground">{{ reviewCount }} ulasan</span>
            <Separator orientation="vertical" class="h-6" />
            <span class="text-sm" :class="stock > 0 ? 'text-green-600' : 'text-red-600'">
                {{ stock > 0 ? `${stock} stok tersedia` : 'Stok habis' }}
            </span>
        </div>

        <Separator />

        <!-- Price -->
        <div class="space-y-2">
            <div v-if="originalPrice && discountPercentage > 0" class="flex items-center gap-3">
                <span class="text-2xl text-muted-foreground line-through">
                    {{ formatCurrency(originalPrice) }}
                </span>
                <Badge variant="destructive" class="text-base px-3 py-1">
                    -{{ discountPercentage }}%
                </Badge>
            </div>
            <div class="text-4xl font-bold text-primary">
                {{ formatCurrency(price) }}
            </div>
        </div>

        <!-- Additional Info -->
        <div class="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div v-if="warrantyMonths" class="flex items-start gap-2">
                <Award class="h-5 w-5 text-primary mt-0.5" />
                <div>
                    <p class="text-sm font-medium">Garansi</p>
                    <p class="text-xs text-muted-foreground">{{ warrantyMonths }} bulan</p>
                </div>
            </div>
            <div class="flex items-start gap-2">
                <Truck class="h-5 w-5 text-primary mt-0.5" />
                <div>
                    <p class="text-sm font-medium">Pengiriman</p>
                    <p class="text-xs text-muted-foreground">Gratis ongkir min. 100k</p>
                </div>
            </div>
        </div>
    </div>
</template>
