<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package, Ruler } from 'lucide-vue-next';

interface Dimensions {
    length: number;
    width: number;
    height: number;
}

interface Props {
    shortDescription?: string;
    longDescription?: string;
    weightGram?: number;
    dimensions?: Dimensions;
}

defineProps<Props>();
</script>

<template>
    <div class="space-y-6">
        <!-- Short Description -->
        <div v-if="shortDescription">
            <h3 class="text-lg font-semibold mb-3">Deskripsi Singkat</h3>
            <p class="text-muted-foreground leading-relaxed">{{ shortDescription }}</p>
        </div>

        <Separator />

        <!-- Detailed Description -->
        <div v-if="longDescription">
            <h3 class="text-lg font-semibold mb-3">Deskripsi Lengkap</h3>
            <div class="prose prose-sm max-w-none" v-html="longDescription"></div>
        </div>

        <Separator />

        <!-- Specifications -->
        <div>
            <h3 class="text-lg font-semibold mb-4">Spesifikasi Produk</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card v-if="weightGram">
                    <CardHeader class="pb-3">
                        <CardTitle class="text-sm flex items-center gap-2">
                            <Package class="h-4 w-4" />
                            Berat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-2xl font-bold">{{ weightGram }} gr</p>
                    </CardContent>
                </Card>

                <Card v-if="dimensions">
                    <CardHeader class="pb-3">
                        <CardTitle class="text-sm flex items-center gap-2">
                            <Ruler class="h-4 w-4" />
                            Dimensi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-2xl font-bold">
                            {{ dimensions.length }} x {{ dimensions.width }} x {{ dimensions.height }} mm
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>
