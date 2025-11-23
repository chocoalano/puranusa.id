<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-vue-next';

interface Props {
    modelValue: string;
}

defineProps<Props>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
    search: [];
}>();
</script>

<template>
    <div class="flex items-center gap-4">
        <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                :model-value="modelValue"
                @update:model-value="emit('update:modelValue', $event)"
                placeholder="Cari kategori..."
                class="pl-10"
                @keydown.enter="emit('search')"
            />
        </div>
    </div>
</template>
