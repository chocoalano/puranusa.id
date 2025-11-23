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
const rating = defineModel<string>('rating', { required: true });
const approved = defineModel<string>('approved', { required: true });
</script>

<template>
    <div class="flex items-center gap-4">
        <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                v-model="search"
                placeholder="Cari produk atau pelanggan..."
                class="pl-9"
            />
        </div>
        <Select v-model="rating">
            <SelectTrigger class="w-32">
                <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Semua Rating</SelectItem>
                <SelectItem value="5">5 Bintang</SelectItem>
                <SelectItem value="4">4 Bintang</SelectItem>
                <SelectItem value="3">3 Bintang</SelectItem>
                <SelectItem value="2">2 Bintang</SelectItem>
                <SelectItem value="1">1 Bintang</SelectItem>
            </SelectContent>
        </Select>
        <Select v-model="approved">
            <SelectTrigger class="w-40">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="1">Disetujui</SelectItem>
                <SelectItem value="0">Pending</SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
