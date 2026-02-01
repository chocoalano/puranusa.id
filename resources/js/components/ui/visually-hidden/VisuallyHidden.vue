<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('sr-only', props.class)">
    <slot />
  </span>
</template>
