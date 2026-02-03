<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-vue-next';
import type { Customer } from '@/types/profile';
import { useFormatter } from '@/composables/useFormatter';

defineProps<{
    customer: Customer;
}>();

const { formatCurrency } = useFormatter();
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2">
                <Trophy class="w-5 h-5" />
                Statistik Bonus
            </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
            <div class="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p class="text-xs text-emerald-700 dark:text-emerald-400 mb-1">Total Diproses</p>
                <p class="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    {{ formatCurrency(customer.bonus_stats.total_proses) }}
                </p>
            </div>
            <!-- <div class="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p class="text-xs text-emerald-700 dark:text-emerald-400 mb-1">Total Dirilis</p>
                <p class="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    {{ formatCurrency(customer.bonus_stats.total_released) }}
                </p>
            </div> -->
            <div class="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p class="text-xs text-amber-700 dark:text-amber-400 mb-1">Total Pending</p>
                <p class="text-xl font-bold text-amber-700 dark:text-amber-400">
                    {{ formatCurrency(customer.bonus_stats.total_pending) }}
                </p>
            </div>
        </CardContent>
    </Card>
</template>
