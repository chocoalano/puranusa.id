<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-vue-next';

interface Review {
    id: number;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

interface Props {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
}

defineProps<Props>();

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold">Ulasan Pelanggan</h3>
            <div class="flex items-center gap-2">
                <Star class="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span class="text-2xl font-bold">{{ averageRating }}</span>
                <span class="text-muted-foreground">/ 5.0</span>
            </div>
        </div>

        <p class="text-sm text-muted-foreground">
            Berdasarkan {{ totalReviews }} ulasan pelanggan
        </p>

        <!-- Reviews List -->
        <div v-if="reviews.length > 0" class="space-y-4">
            <Card v-for="review in reviews" :key="review.id">
                <CardContent class="p-6">
                    <div class="flex items-start gap-4">
                        <Avatar>
                            <AvatarFallback>{{ getInitials(review.customer_name) }}</AvatarFallback>
                        </Avatar>
                        <div class="flex-1 space-y-2">
                            <div class="flex items-center justify-between">
                                <h4 class="font-semibold">{{ review.customer_name }}</h4>
                                <span class="text-xs text-muted-foreground">{{ review.created_at }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <Star
                                    v-for="i in 5"
                                    :key="i"
                                    class="h-4 w-4"
                                    :class="i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'"
                                />
                            </div>
                            <p class="text-sm text-muted-foreground leading-relaxed">{{ review.comment }}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div v-else class="text-center py-12 text-muted-foreground">
            <p>Belum ada ulasan untuk produk ini</p>
        </div>
    </div>
</template>
