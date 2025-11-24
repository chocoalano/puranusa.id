<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, type HTMLAttributes } from 'vue';
import { Package } from 'lucide-vue-next';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

const page = usePage();
const appSettings = computed(() => page.props.settings as Record<string, any>);

const siteName = computed(() => appSettings.value?.site_name || 'PURANUSA');
const siteLogo = computed(() => appSettings.value?.site_logo);

defineProps<Props>();
</script>

<template>
    <img v-if="siteLogo" :src="siteLogo" :alt="siteName" :class="className" class="object-contain rounded-md" />
    <Package v-else :class="className" class="text-primary" />
</template>
