<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/vue3';
import { AlertCircle, CheckCircle2, Loader2, Star } from 'lucide-vue-next';
import { computed, ref } from 'vue';

interface OrderItem {
    id: number;
    product_id: number;
    product_name: string;
    product_image?: string;
}

interface Props {
    open: boolean;
    orderId: number;
    orderItems: OrderItem[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:open': [value: boolean];
    'review-submitted': [];
}>();

const currentItemIndex = ref(0);
const alertMessage = ref<{ type: 'success' | 'error'; message: string } | null>(
    null,
);

const currentItem = computed(() => props.orderItems[currentItemIndex.value]);
const hasMoreItems = computed(
    () => currentItemIndex.value < props.orderItems.length - 1,
);
const isLastItem = computed(
    () => currentItemIndex.value === props.orderItems.length - 1,
);

const form = useForm({
    order_item_id: 0,
    product_id: 0,
    rating: 5,
    title: '',
    comment: '',
});

const hoverRating = ref(0);

const setRating = (rating: number) => {
    form.rating = rating;
};

const submitReview = async () => {
    if (!currentItem.value) return;

    form.order_item_id = currentItem.value.id;
    form.product_id = currentItem.value.product_id;

    alertMessage.value = null;

    form.post(`/api/client/orders/${props.orderId}/reviews`, {
        preserveScroll: true,
        onSuccess: (response) => {
            // Extract message from response
            const successMessage =
                (response as any)?.props?.flash?.success ||
                'Review berhasil dikirim dan menunggu persetujuan!';

            alertMessage.value = {
                type: 'success',
                message: successMessage,
            };

            // If there are more items, move to next item after a short delay
            if (hasMoreItems.value) {
                setTimeout(() => {
                    currentItemIndex.value++;
                    form.reset();
                    form.rating = 5; // Reset to default rating
                    alertMessage.value = null;
                }, 1500);
            } else {
                // All items reviewed, close dialog after delay
                setTimeout(() => {
                    emit('update:open', false);
                    emit('review-submitted');
                    resetDialog();
                }, 2000);
            }
        },
        onError: (errors) => {
            // Handle various error types
            let errorMessage = 'Gagal mengirim review. Silakan coba lagi.';

            if (errors.message) {
                errorMessage = errors.message;
            } else if (errors.rating) {
                errorMessage = `Rating: ${errors.rating}`;
            } else if (errors.title) {
                errorMessage = `Judul: ${errors.title}`;
            } else if (errors.comment) {
                errorMessage = `Komentar: ${errors.comment}`;
            } else if (errors.order_item_id) {
                errorMessage = 'Item pesanan tidak valid';
            }

            alertMessage.value = {
                type: 'error',
                message: errorMessage,
            };

            // Don't auto-clear error, let user read it
        },
    });
};

const skipReview = () => {
    if (hasMoreItems.value) {
        currentItemIndex.value++;
        form.reset();
        alertMessage.value = null;
    } else {
        emit('update:open', false);
        emit('review-submitted');
        resetDialog();
    }
};

const resetDialog = () => {
    currentItemIndex.value = 0;
    form.reset();
    form.rating = 5; // Reset to default rating
    alertMessage.value = null;
};

const handleOpenChange = (value: boolean) => {
    emit('update:open', value);
    if (!value) {
        resetDialog();
    }
};
</script>

<template>
    <Dialog :open="open" @update:open="handleOpenChange">
        <DialogContent class="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Beri Rating & Review</DialogTitle>
                <DialogDescription>
                    Bagikan pengalaman Anda dengan produk ini ({{
                        currentItemIndex + 1
                    }}
                    dari {{ orderItems.length }})
                </DialogDescription>
            </DialogHeader>

            <div class="space-y-6 py-4">
                <!-- No Items Alert -->
                <Alert
                    v-if="!currentItem || orderItems.length === 0"
                    variant="default"
                >
                    <AlertCircle class="h-4 w-4" />
                    <AlertTitle>Tidak Ada Item</AlertTitle>
                    <AlertDescription>
                        Tidak ada produk yang dapat direview dari pesanan ini.
                    </AlertDescription>
                </Alert>

                <template v-else>
                    <!-- Success Alert -->
                    <Alert
                        v-if="alertMessage?.type === 'success'"
                        variant="default"
                    >
                        <CheckCircle2 class="h-4 w-4" />
                        <AlertTitle>Berhasil!</AlertTitle>
                        <AlertDescription>
                            {{ alertMessage.message }}
                        </AlertDescription>
                    </Alert>

                    <!-- Error Alert -->
                    <Alert
                        v-if="alertMessage?.type === 'error'"
                        variant="destructive"
                    >
                        <AlertCircle class="h-4 w-4" />
                        <AlertTitle>Terjadi Kesalahan</AlertTitle>
                        <AlertDescription>
                            {{ alertMessage.message }}
                        </AlertDescription>
                    </Alert>

                    <!-- Product Info -->
                    <div
                        v-if="currentItem"
                        class="flex gap-4 rounded-lg bg-muted p-4"
                    >
                        <img
                            v-if="currentItem.product_image"
                            :src="currentItem.product_image"
                            :alt="currentItem.product_name"
                            class="h-20 w-20 rounded-md object-cover"
                        />
                        <div class="flex-1">
                            <h4 class="font-medium">
                                {{ currentItem.product_name }}
                            </h4>
                        </div>
                    </div>

                    <!-- Rating -->
                    <div class="space-y-2">
                        <Label>Rating Produk</Label>
                        <div class="flex items-center gap-2">
                            <button
                                v-for="star in 5"
                                :key="star"
                                type="button"
                                @click="setRating(star)"
                                @mouseenter="hoverRating = star"
                                @mouseleave="hoverRating = 0"
                                class="transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star
                                    :class="[
                                        'h-8 w-8 transition-colors',
                                        (hoverRating || form.rating) >= star
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300',
                                    ]"
                                />
                            </button>
                            <span class="ml-2 text-sm text-muted-foreground">
                                {{ form.rating }} / 5
                            </span>
                        </div>
                    </div>

                    <!-- Title -->
                    <div class="space-y-2">
                        <Label for="title">Judul Review (Opsional)</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            placeholder="Ringkasan singkat pengalaman Anda"
                            maxlength="100"
                        />
                        <p
                            v-if="form.errors.title"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.title }}
                        </p>
                    </div>

                    <!-- Comment -->
                    <div class="space-y-2">
                        <Label for="comment">Komentar (Opsional)</Label>
                        <Textarea
                            id="comment"
                            v-model="form.comment"
                            placeholder="Ceritakan pengalaman Anda dengan produk ini..."
                            rows="4"
                            maxlength="500"
                        />
                        <p class="text-right text-xs text-muted-foreground">
                            {{ form.comment?.length || 0 }} / 500 karakter
                        </p>
                        <p
                            v-if="form.errors.comment"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.comment }}
                        </p>
                    </div>
                </template>
            </div>

            <DialogFooter class="flex-col gap-2 sm:flex-row">
                <template v-if="currentItem && orderItems.length > 0">
                    <Button
                        v-if="hasMoreItems || isLastItem"
                        type="button"
                        variant="outline"
                        @click="skipReview"
                        :disabled="form.processing"
                    >
                        {{ hasMoreItems ? 'Lewati' : 'Tutup' }}
                    </Button>
                    <Button
                        type="button"
                        @click="submitReview"
                        :disabled="form.processing || form.rating === 0"
                        class="w-full sm:w-auto"
                    >
                        <Loader2
                            v-if="form.processing"
                            class="mr-2 h-4 w-4 animate-spin"
                        />
                        {{ hasMoreItems ? 'Kirim & Lanjut' : 'Kirim Review' }}
                    </Button>
                </template>
                <Button
                    v-else
                    type="button"
                    variant="outline"
                    @click="handleOpenChange(false)"
                >
                    Tutup
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
