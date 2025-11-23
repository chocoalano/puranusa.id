<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X } from 'lucide-vue-next';

interface Emits {
    (e: 'clear-filters'): void;
    (e: 'reset-search'): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
    <Card class="border-dashed">
        <CardContent class="flex flex-col items-center justify-center py-16 text-center">
            <div class="rounded-full bg-muted p-6 mb-4">
                <Search class="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 class="text-2xl font-semibold mb-2">Produk tidak ditemukan</h3>
            <p class="text-muted-foreground mb-6 max-w-md">
                Maaf, kami tidak menemukan produk yang sesuai dengan kriteria pencarian Anda.
                Coba ubah filter atau kata kunci pencarian.
            </p>
            <div class="flex gap-3">
                <Button @click="emit('clear-filters')" variant="default">
                    <X class="h-4 w-4 mr-2" />
                    Hapus Semua Filter
                </Button>
                <Button @click="emit('reset-search')" variant="outline">
                    Reset Pencarian
                </Button>
            </div>
        </CardContent>
    </Card>
</template>
