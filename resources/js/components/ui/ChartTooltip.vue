<script setup lang="ts">
import { cn } from '@/lib/utils';

defineProps<{
    active?: boolean;
    payload?: any;
    label?: string;
    class?: string;
}>();
</script>

<template>
    <div
        v-if="active && payload"
        :class="
            cn(
                'rounded-lg border bg-background p-2 shadow-sm',
                $props.class
            )
        "
    >
        <div class="grid gap-2">
            <div class="font-medium">{{ label }}</div>
            <div class="grid gap-1">
                <div
                    v-for="(item, index) in payload"
                    :key="index"
                    class="flex items-center justify-between gap-2 text-xs"
                >
                    <div class="flex items-center gap-2">
                        <div
                            class="h-2 w-2 rounded-full"
                            :style="{ backgroundColor: item.color }"
                        />
                        <span>{{ item.name }}</span>
                    </div>
                    <span class="font-medium tabular-nums">{{ item.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
