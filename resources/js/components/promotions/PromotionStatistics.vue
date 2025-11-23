<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgePercent, Calendar, Tag } from 'lucide-vue-next';

interface Statistics {
    total_active: number;
    total_scheduled: number;
    total_expired: number;
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
                <CardTitle class="text-sm font-medium">Promosi Aktif</CardTitle>
                <BadgePercent class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.total_active }}</div>
                <p class="text-xs text-muted-foreground">Sedang berjalan</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Terjadwal</CardTitle>
                <Calendar class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.total_scheduled }}</div>
                <p class="text-xs text-muted-foreground">Akan datang</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Kadaluarsa</CardTitle>
                <Tag class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ statistics.total_expired }}</div>
                <p class="text-xs text-muted-foreground">Sudah berakhir</p>
            </CardContent>
        </Card>
    </div>
</template>
