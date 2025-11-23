<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-vue-next';
import { computed } from 'vue';
import type { Customer } from '@/types/profile';
import { useFormatter } from '@/composables/useFormatter';

const props = defineProps<{
    customer: Customer;
}>();

const { formatCurrency } = useFormatter();

const initials = computed(() => {
    return props.customer.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
});
</script>

<template>
    <Card>
        <CardContent class="pt-6">
            <div class="flex flex-col items-center text-center">
                <Avatar class="h-24 w-24 mb-4">
                    <AvatarImage :src="`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}`" />
                    <AvatarFallback>{{ initials }}</AvatarFallback>
                </Avatar>

                <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {{ customer.name }}
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ customer.email }}
                </p>

                <Badge
                    v-if="customer.email_verified_at"
                    class="mt-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100"
                >
                    <CheckCircle class="w-3 h-3 mr-1" />
                    Email Terverifikasi
                </Badge>
                <Badge v-else variant="secondary" class="mt-3">
                    <AlertCircle class="w-3 h-3 mr-1" />
                    Email Belum Terverifikasi
                </Badge>

                <div class="mt-4 w-full space-y-2 text-sm">
                    <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">E-Wallet ID</span>
                        <span class="font-mono font-semibold">{{ customer.ewallet_id }}</span>
                    </div>
                    <div class="flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <span class="text-emerald-700 dark:text-emerald-400">Saldo</span>
                        <span class="font-semibold text-emerald-700 dark:text-emerald-400">
                            {{ formatCurrency(customer.ewallet_saldo) }}
                        </span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
