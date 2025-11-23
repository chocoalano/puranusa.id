<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import type { Component } from 'vue';

interface Props {
    icon: Component;
    label: string;
    value: string | number;
    iconColor?: string;
}

withDefaults(defineProps<Props>(), {
    iconColor: 'primary',
});
</script>

<template>
    <Card class="hover:shadow-md transition-shadow">
        <CardContent class="p-4 flex items-center gap-3">
            <div :class="[`p-2 rounded-lg bg-${iconColor}/10`]">
                <component :is="icon" :class="[`h-5 w-5 text-${iconColor}`]" />
            </div>
            <div>
                <p class="text-sm text-muted-foreground">{{ label }}</p>
                <p class="text-xl font-bold">{{ value }}</p>
            </div>
        </CardContent>
    </Card>
</template>
