<script setup lang="ts">
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  type: 'search' | 'select'
  placeholder?: string
  options?: FilterOption[]
  modelValue: string
}

interface Props {
  filters: FilterConfig[]
  onUpdate: (index: number, value: any) => void
}

defineProps<Props>()
</script>

<template>
  <div class="mb-4 flex gap-4">
    <template v-for="(filter, index) in filters" :key="index">
      <Input
        v-if="filter.type === 'search'"
        :model-value="filter.modelValue"
        :placeholder="filter.placeholder || 'Cari...'"
        class="max-w-sm"
        @input="(e: any) => onUpdate(index, e.target.value)"
      />
      <Select
        v-else-if="filter.type === 'select'"
        :model-value="filter.modelValue"
        @update:model-value="(value: any) => onUpdate(index, value)"
      >
        <SelectTrigger class="w-[180px]">
          <SelectValue :placeholder="filter.placeholder || 'Pilih...'" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="option in filter.options"
            :key="option.value || 'all'"
            :value="option.value || 'all'"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </template>
  </div>
</template>
