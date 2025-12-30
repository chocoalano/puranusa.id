<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Network } from 'lucide-vue-next';
import type { Customer } from '@/types/profile';

defineProps<{
    customer: Customer;
}>();

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2">
                <Network class="w-5 h-5" />
                Statistik Jaringan
            </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Jaringan Kiri</span>
                <span class="font-semibold">{{ customer.network_stats.left_count }}</span>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Jaringan Kanan</span>
                <span class="font-semibold">{{ customer.network_stats.right_count }}</span>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Total Downline</span>
                <Badge variant="secondary">{{ customer.network_stats.total_downlines }}</Badge>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Omset Network Builder Kiri</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">{{ formatCurrency(customer.network_stats.omzet_group_left_plana) }}</span>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Omset Network Builder Kanan</span>
                <span class="font-semibold text-green-600 dark:text-green-400">{{ formatCurrency(customer.network_stats.omzet_group_right_plana) }}</span>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Omset Retail Kiri</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">{{ formatCurrency(customer.network_stats.omzet_group_left_planb) }}</span>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Omset Retail Kanan</span>
                <span class="font-semibold text-green-600 dark:text-green-400">{{ formatCurrency(customer.network_stats.omzet_group_right_planb) }}</span>
            </div>
        </CardContent>
    </Card>
</template>
