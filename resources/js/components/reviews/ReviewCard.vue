<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';
import StarRating from '@/components/reviews/StarRating.vue';
import { Check, X, Trash2, ShieldCheck } from 'lucide-vue-next';

interface Review {
    id: number;
    rating: number;
    title: string;
    comment: string;
    is_approved: boolean;
    is_verified_purchase: boolean;
    customer: { name: string; email: string } | null;
    product: { name: string } | null;
    created_at: string;
}

interface Props {
    reviews: Review[];
}

defineProps<Props>();

const emit = defineEmits<{
    approve: [id: number];
    reject: [id: number];
    delete: [id: number];
}>();

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
</script>

<template>
    <div class="space-y-4">
        <Card v-if="reviews.length === 0">
            <CardContent class="py-12 text-center text-muted-foreground">
                Tidak ada review ditemukan
            </CardContent>
        </Card>

        <Card v-for="review in reviews" :key="review.id">
            <CardHeader>
                <div class="flex items-start justify-between">
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <h3 class="font-semibold">{{ review.product?.name || 'N/A' }}</h3>
                            <Badge v-if="review.is_verified_purchase" variant="secondary" class="gap-1">
                                <ShieldCheck class="h-3 w-3" />
                                Verified
                            </Badge>
                        </div>
                        <CardDescription>
                            Oleh {{ review.customer?.name || 'N/A' }} · {{ formatDate(review.created_at) }}
                        </CardDescription>
                    </div>
                    <Badge :variant="review.is_approved ? 'default' : 'secondary'">
                        {{ review.is_approved ? 'Disetujui' : 'Pending' }}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-4">
                <div class="space-y-2">
                    <StarRating :rating="review.rating" :show-number="true" />
                    <h4 class="font-medium">{{ review.title }}</h4>
                    <p class="text-sm text-muted-foreground">{{ review.comment }}</p>
                </div>

                <div class="flex gap-2 pt-2 border-t">
                    <Button
                        v-if="!review.is_approved"
                        size="sm"
                        @click="emit('approve', review.id)"
                    >
                        <Check class="mr-2 h-4 w-4" />
                        Setujui
                    </Button>
                    <Button
                        v-if="review.is_approved"
                        size="sm"
                        variant="outline"
                        @click="emit('reject', review.id)"
                    >
                        <X class="mr-2 h-4 w-4" />
                        Tolak
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        @click="emit('delete', review.id)"
                    >
                        <Trash2 class="mr-2 h-4 w-4" />
                        Hapus
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
