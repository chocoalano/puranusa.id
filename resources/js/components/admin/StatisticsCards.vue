<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Stat {
  label: string
  value: string | number
  formatter?: (value: number) => string
}

interface Props {
  stats: Stat[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4,
})

const formatValue = (stat: Stat): string => {
  if (typeof stat.value === 'string') {
    return stat.value
  }

  if (stat.formatter) {
    return stat.formatter(stat.value)
  }

  return stat.value.toLocaleString('id-ID')
}

const gridClass = computed(() => {
  const cols: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  }
  return `grid gap-4 ${cols[props.columns] || 'md:grid-cols-4'}`
})
</script>

<script lang="ts">
import { computed } from 'vue'
</script>

<template>
  <div :class="gridClass">
    <Card v-for="(stat, index) in stats" :key="index">
      <CardHeader class="pb-2">
        <CardDescription>{{ stat.label }}</CardDescription>
        <CardTitle class="text-3xl">{{ formatValue(stat) }}</CardTitle>
      </CardHeader>
    </Card>
  </div>
</template>
