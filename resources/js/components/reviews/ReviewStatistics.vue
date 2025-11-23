<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, CheckCircle, Clock } from 'lucide-vue-next';

interface Statistics {
    total: number;
    approved: number;
    pending: number;
    average_rating: number;
}

interface Props {
    statistics: Statistics;
}

defineProps<Props>();
</script>

<template>
    <div class="grid gap-4 md:grid-cols-4">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Total Review</CardTitle>
                <MessageSquare class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.total }}</div>
                <p class="text-xs text-muted-foreground">Semua review</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Disetujui</CardTitle>
                <CheckCircle class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.approved }}</div>
                <p class="text-xs text-muted-foreground">Review disetujui</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Pending</CardTitle>
                <Clock class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.pending }}</div>
                <p class="text-xs text-muted-foreground">Menunggu moderasi</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Rating Rata-rata</CardTitle>
                <Star class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.average_rating.toFixed(1) }}</div>
                <p class="text-xs text-muted-foreground">Dari 5.0</p>
            </CardContent>
        </Card>
    </div>
</template>
