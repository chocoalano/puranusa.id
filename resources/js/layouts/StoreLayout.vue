<script setup lang="ts">
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <EcommerceLayout :title="title" :description="description">
        <slot />
    </EcommerceLayout>
</template>
