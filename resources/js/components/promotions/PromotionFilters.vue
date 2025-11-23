<script setup lang="ts">
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-vue-next';

const search = defineModel<string>('search', { required: true });
const type = defineModel<string>('type', { required: true });
</script>

<template>
    <div class="flex items-center gap-4">
        <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                v-model="search"
                placeholder="Cari promosi..."
                class="pl-9"
            />
        </div>
        <Select v-model="type">
            <SelectTrigger class="w-40">
                <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="discount">Diskon</SelectItem>
                <SelectItem value="bundle">Bundle</SelectItem>
                <SelectItem value="flash_sale">Flash Sale</SelectItem>
                <SelectItem value="promo">Promo</SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
