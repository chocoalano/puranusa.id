<script setup lang="ts">
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Network } from 'lucide-vue-next';
import type { Customer } from '@/types/profile';

defineProps<{
    customer: Customer;
}>();
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

            <template v-if="customer.upline || customer.sponsor">
                <Separator class="my-4" />

                <div v-if="customer.upline" class="space-y-2">
                    <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Upline</p>
                    <div class="flex items-center gap-2">
                        <Avatar class="h-8 w-8">
                            <AvatarImage :src="`https://api.dicebear.com/7.x/initials/svg?seed=${customer.upline.name}`" />
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium">{{ customer.upline.name }}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ customer.upline.email }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="customer.sponsor" class="space-y-2">
                    <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sponsor</p>
                    <div class="flex items-center gap-2">
                        <Avatar class="h-8 w-8">
                            <AvatarImage :src="`https://api.dicebear.com/7.x/initials/svg?seed=${customer.sponsor.name}`" />
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium">{{ customer.sponsor.name }}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ customer.sponsor.email }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </CardContent>
    </Card>
</template>
