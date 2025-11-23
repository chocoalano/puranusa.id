<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, CheckCircle } from 'lucide-vue-next';

interface Statistics {
    total_pending: number;
    total_shipped: number;
    total_delivered: number;
}

interface Props {
    statistics: Statistics;
}

defineProps<Props>();
</script>

<template>
    <div class="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Pending</CardTitle>
                <Package class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.total_pending }}</div>
                <p class="text-xs text-muted-foreground">Menunggu pengiriman</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Dikirim</CardTitle>
                <Truck class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.total_shipped }}</div>
                <p class="text-xs text-muted-foreground">Dalam pengiriman</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Terkirim</CardTitle>
                <CheckCircle class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.total_delivered }}</div>
                <p class="text-xs text-muted-foreground">Sudah sampai</p>
            </CardContent>
        </Card>
    </div>
</template>
