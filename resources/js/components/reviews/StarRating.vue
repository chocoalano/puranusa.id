<script setup lang="ts">
import { Star } from 'lucide-vue-next';

interface Props {
    rating: number;
    size?: 'sm' | 'md' | 'lg';
    showNumber?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    showNumber: false,
});

const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
};
</script>

<template>
    <div class="flex items-center gap-1">
        <Star
            v-for="i in 5"
            :key="i"
            :class="[
                sizeClasses[size],
                i <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300',
            ]"
        />
        <span v-if="showNumber" class="ml-1 text-sm text-muted-foreground">
            {{ rating }}/5
        </span>
    </div>
</template>
