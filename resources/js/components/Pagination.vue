<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/vue3';
import {
    ChevronsLeft,
    ChevronsRight,
    ChevronLeft,
    ChevronRight,
} from 'lucide-vue-next';

interface PaginationData {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
}

interface Props {
    data: PaginationData;
    url: string;
    filters?: Record<string, any>;
    preserveScroll?: boolean;
    preserveState?: boolean;
    perPageOptions?: number[];
}

const props = withDefaults(defineProps<Props>(), {
    filters: () => ({}),
    preserveScroll: true,
    preserveState: true,
    perPageOptions: () => [10, 25, 50, 100],
});

const goToPage = (page: number) => {
    router.visit(props.url, {
        data: {
            ...props.filters,
            page,
        },
        preserveScroll: props.preserveScroll,
        preserveState: props.preserveState,
    });
};

const changePerPage = (perPage: any) => {
    if (!perPage) return;

    router.visit(props.url, {
        data: {
            ...props.filters,
            per_page: String(perPage),
            page: 1, // Reset to first page when changing per_page
        },
        preserveScroll: props.preserveScroll,
        preserveState: props.preserveState,
    });
};</script>

<template>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
            <div class="text-sm text-muted-foreground">
                Menampilkan {{ data.from }} - {{ data.to }} dari {{ data.total }} data
            </div>
            <div class="flex items-center gap-2">
                <Select
                    :model-value="String(data.per_page)"
                    @update:model-value="changePerPage"
                >
                    <SelectTrigger class="h-8 w-[70px]">
                        <SelectValue :placeholder="String(data.per_page)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="option in perPageOptions"
                            :key="option"
                            :value="String(option)"
                        >
                            {{ option }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                :disabled="data.current_page === 1"
                @click="goToPage(1)"
            >
                <ChevronsLeft class="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                :disabled="data.current_page === 1"
                @click="goToPage(data.current_page - 1)"
            >
                <ChevronLeft class="h-4 w-4" />
            </Button>
            <div class="flex items-center gap-1 px-2 text-sm">
                <span class="font-medium">{{ data.current_page }}</span>
                <span class="text-muted-foreground">of</span>
                <span class="font-medium">{{ data.last_page }}</span>
            </div>
            <Button
                variant="outline"
                size="icon"
                :disabled="data.current_page === data.last_page"
                @click="goToPage(data.current_page + 1)"
            >
                <ChevronRight class="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                :disabled="data.current_page === data.last_page"
                @click="goToPage(data.last_page)"
            >
                <ChevronsRight class="h-4 w-4" />
            </Button>
        </div>
    </div>
</template>
