<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Props {
    currentPage: number;
    lastPage: number;
}

interface Emits {
    (e: 'go-to-page', page: number): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
    <div v-if="lastPage > 1" class="mt-8">
        <Card>
            <CardContent class="p-4">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p class="text-sm text-muted-foreground">
                        Halaman {{ currentPage }} dari {{ lastPage }}
                    </p>

                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            :disabled="currentPage === 1"
                            @click="emit('go-to-page', currentPage - 1)"
                        >
                            <ChevronLeft class="h-4 w-4 mr-1" />
                            Previous
                        </Button>

                        <div class="flex items-center gap-1">
                            <template v-for="page in lastPage" :key="page">
                                <Button
                                    v-if="page === 1 || page === lastPage || Math.abs(page - currentPage) <= 1"
                                    :variant="page === currentPage ? 'default' : 'outline'"
                                    size="sm"
                                    class="w-9"
                                    @click="emit('go-to-page', page)"
                                >
                                    {{ page }}
                                </Button>
                                <span
                                    v-else-if="page === currentPage - 2 || page === currentPage + 2"
                                    class="px-2 text-muted-foreground"
                                >
                                    ...
                                </span>
                            </template>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            :disabled="currentPage === lastPage"
                            @click="emit('go-to-page', currentPage + 1)"
                        >
                            Next
                            <ChevronRight class="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
