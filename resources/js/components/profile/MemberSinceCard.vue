<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-vue-next';
import { useFormatter } from '@/composables/useFormatter';

defineProps<{
    createdAt: string;
}>();

const { formatDate } = useFormatter();
</script>

<template>
    <Card>
        <CardContent class="pt-6">
            <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Calendar class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Member Sejak</p>
                    <p class="font-semibold">{{ formatDate(createdAt) }}</p>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
