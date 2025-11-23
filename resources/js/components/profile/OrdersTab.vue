<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/vue3';
import { Package } from 'lucide-vue-next';
import type { Order } from '@/types/profile';
import OrderCard from './OrderCard.vue';

defineProps<{
    orders: Order[];
}>();
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Pesanan Saya</CardTitle>
            <CardDescription>
                Riwayat pesanan dan status pengiriman
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div v-if="orders.length > 0" class="space-y-4">
                <OrderCard
                    v-for="order in orders"
                    :key="order.id"
                    :order="order"
                />
            </div>
            <div v-else class="py-12 text-center">
                <Package class="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p class="text-muted-foreground mb-4">Belum ada pesanan</p>
                <Link href="/beranda">
                    <Button>
                        Mulai Belanja
                    </Button>
                </Link>
            </div>
        </CardContent>
    </Card>
</template>
