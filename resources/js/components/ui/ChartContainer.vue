<script setup lang="ts">
import { computed, provide, ref, toRefs } from 'vue';
import type { ChartConfig } from './chart';

const CHART_CONTEXT_KEY = Symbol('chart-context');

const props = defineProps<{
    config: ChartConfig;
    class?: string;
}>();

const configRef = ref(props.config);

provide(CHART_CONTEXT_KEY, {
    config: configRef,
});
</script>

<template>
    <div :class="cn('flex justify-center', props.class)">
        <slot />
    </div>
</template>
