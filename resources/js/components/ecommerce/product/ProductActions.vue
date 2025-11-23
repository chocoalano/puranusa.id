<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import CheckoutSheet from '@/components/ecommerce/checkout/CheckoutSheet.vue';
import { ShoppingCart, Heart, Minus, Plus, Share2 } from 'lucide-vue-next';

interface Props {
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    productWeight: number;
    stock: number;
}

const props = defineProps<Props>();

const quantity = ref(1);
const addingToCart = ref(false);
const addingToWishlist = ref(false);
const isInWishlist = ref(false);
const checkoutSheetOpen = ref(false);

const incrementQuantity = () => {
    if (quantity.value < props.stock) {
        quantity.value++;
    }
};

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const addToCart = () => {
    if (addingToCart.value) return;

    addingToCart.value = true;

    router.post('/cart/add', {
        product_id: props.productId,
        quantity: quantity.value,
    }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            console.log('Product added to cart');
        },
        onError: (errors) => {
            console.error('Failed to add to cart:', errors);
            
            // Check if it's a 419 error, the interceptor will handle retry
            if (typeof errors === 'object' && errors !== null) {
                const errorObj = errors as Record<string, any>;
                if (errorObj.status !== 419) {
                    alert('Gagal menambahkan ke keranjang. Silakan coba lagi.');
                }
            } else {
                alert('Gagal menambahkan ke keranjang. Silakan coba lagi.');
            }
        },
        onFinish: () => {
            addingToCart.value = false;
        },
    });
};

const buyNow = () => {
    // Open checkout sheet
    checkoutSheetOpen.value = true;
};

const toggleWishlist = () => {
    if (addingToWishlist.value) return;

    addingToWishlist.value = true;

    const endpoint = isInWishlist.value ? '/wishlist/remove' : '/wishlist/add';

    router.post(endpoint, {
        product_id: props.productId,
    }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            isInWishlist.value = !isInWishlist.value;
        },
        onError: (errors) => {
            console.error('Failed to update wishlist:', errors);
            
            // Check if it's a 419 error, the interceptor will handle retry
            if (typeof errors === 'object' && errors !== null) {
                const errorObj = errors as Record<string, any>;
                if (errorObj.status !== 419) {
                    alert('Gagal mengubah wishlist. Silakan coba lagi.');
                }
            } else {
                alert('Gagal mengubah wishlist. Silakan coba lagi.');
            }
        },
        onFinish: () => {
            addingToWishlist.value = false;
        },
    });
};

const shareProduct = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: props.productName,
                url: window.location.href,
            });
        } catch {
            console.log('Share cancelled');
        }
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link produk telah disalin!');
    }
};
</script>

<template>
    <div class="space-y-4">
        <!-- Quantity Selector -->
        <div class="space-y-2">
            <label class="text-sm font-medium">Jumlah</label>
            <div class="flex items-center gap-3">
                <div class="flex items-center border rounded-lg">
                    <Button
                        variant="ghost"
                        size="icon"
                        @click="decrementQuantity"
                        :disabled="quantity <= 1"
                    >
                        <Minus class="h-4 w-4" />
                    </Button>
                    <Input
                        v-model.number="quantity"
                        type="number"
                        min="1"
                        :max="stock"
                        class="w-20 text-center border-0 focus-visible:ring-0"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        @click="incrementQuantity"
                        :disabled="quantity >= stock"
                    >
                        <Plus class="h-4 w-4" />
                    </Button>
                </div>
                <span class="text-sm text-muted-foreground">
                    Maksimal {{ stock }} unit
                </span>
            </div>
        </div>

        <Separator />

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
            <Button
                variant="outline"
                size="lg"
                class="sm:flex-1 min-h-11"
                @click="addToCart"
                :disabled="addingToCart || stock === 0"
            >
                <ShoppingCart class="h-5 w-5 mr-2" />
                Tambah ke Keranjang
            </Button>
            <Button
                size="lg"
                class="sm:flex-1 min-h-11"
                @click="buyNow"
                :disabled="stock === 0"
            >
                Beli Sekarang
            </Button>
        </div>

        <!-- Secondary Actions -->
        <div class="flex gap-2">
            <Button
                variant="outline"
                size="lg"
                class="flex-1"
                @click="toggleWishlist"
                :disabled="addingToWishlist"
            >
                <Heart
                    :class="[
                        'h-5 w-5 mr-2',
                        isInWishlist ? 'fill-red-500 text-red-500' : ''
                    ]"
                />
                {{ isInWishlist ? 'Di Wishlist' : 'Tambah Wishlist' }}
            </Button>
            <Button
                variant="outline"
                size="lg"
                @click="shareProduct"
            >
                <Share2 class="h-5 w-5" />
            </Button>
        </div>

        <!-- Checkout Sheet -->
        <CheckoutSheet
            v-model:open="checkoutSheetOpen"
            :item="{
                id: productId,
                product_id: productId,
                name: productName,
                price: productPrice,
                quantity: quantity,
                weight: productWeight,
                image: productImage,
            }"
        />
    </div>
</template>
