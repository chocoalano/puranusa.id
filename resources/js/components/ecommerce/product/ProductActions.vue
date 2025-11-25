<script setup lang="ts">
import CheckoutSheet from '@/components/ecommerce/checkout/CheckoutSheet.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
import { Heart, Minus, Plus, Share2, ShoppingCart } from 'lucide-vue-next';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

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

const addToCart = async () => {
    if (addingToCart.value) return;

    addingToCart.value = true;

    try {
        const response = await axios.post('/cart/add', {
            product_id: props.productId,
            quantity: quantity.value,
        });

        if (response.data.success) {
            toast.success('Berhasil', {
                description:
                    response.data.message ||
                    'Produk berhasil ditambahkan ke keranjang.',
            });
            // Reload Inertia page data to update cart count without full page reload
            router.reload({ only: ['ecommerce'] });
        }
    } catch (error: any) {
        console.error('Failed to add to cart:', error);

        // Handle 401 Unauthenticated - redirect to client login
        if (error.response?.status === 401) {
            toast.error('Autentikasi Diperlukan', {
                description: error.response.data.message || 'Anda harus login terlebih dahulu.',
            });

            // Redirect to client login page
            if (error.response.data.redirect) {
                router.visit(error.response.data.redirect);
            } else {
                router.visit('/client/login');
            }
            return;
        }

        const message =
            error.response?.data?.message ||
            'Gagal menambahkan ke keranjang. Silakan coba lagi.';
        toast.error('Gagal', {
            description: message,
        });
    } finally {
        addingToCart.value = false;
    }
};

const buyNow = () => {
    // Open checkout sheet
    checkoutSheetOpen.value = true;
};

const toggleWishlist = async () => {
    if (addingToWishlist.value) return;

    addingToWishlist.value = true;

    const endpoint = isInWishlist.value ? '/wishlist/remove' : '/wishlist/add';

    try {
        const response = await axios.post(endpoint, {
            product_id: props.productId,
        });

        if (response.data.success) {
            isInWishlist.value = !isInWishlist.value;
            toast.success('Berhasil', {
                description:
                    response.data.message ||
                    (isInWishlist.value
                        ? 'Produk ditambahkan ke wishlist.'
                        : 'Produk dihapus dari wishlist.'),
            });
            // Reload Inertia page data to update wishlist count without full page reload
            router.reload({ only: ['ecommerce'] });
        }
    } catch (error: any) {
        console.error('Failed to update wishlist:', error);

        // Handle 401 Unauthenticated - redirect to client login
        if (error.response?.status === 401) {
            toast.error('Autentikasi Diperlukan', {
                description: error.response.data.message || 'Anda harus login terlebih dahulu.',
            });

            // Redirect to client login page
            if (error.response.data.redirect) {
                router.visit(error.response.data.redirect);
            } else {
                router.visit('/client/login');
            }
            return;
        }

        const message =
            error.response?.data?.message ||
            'Gagal mengubah wishlist. Silakan coba lagi.';
        toast.error('Gagal', {
            description: message,
        });
    } finally {
        addingToWishlist.value = false;
    }
};

const shareProduct = async () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

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
        toast.success('Berhasil', {
            description: 'Link produk telah disalin!',
        });
    }
};
</script>

<template>
    <div class="space-y-4">
        <!-- Quantity Selector -->
        <div class="space-y-2">
            <label class="text-sm font-medium">Jumlah</label>
            <div class="flex items-center gap-3">
                <div class="flex items-center rounded-lg border">
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
                        class="w-20 border-0 text-center focus-visible:ring-0"
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
        <div class="flex flex-col gap-3 sm:flex-row">
            <Button
                variant="outline"
                size="lg"
                class="min-h-11 sm:flex-1"
                @click="addToCart"
                :disabled="addingToCart || stock === 0"
            >
                <ShoppingCart class="mr-2 h-5 w-5" />
                Tambah ke Keranjang
            </Button>
            <Button
                size="lg"
                class="min-h-11 sm:flex-1"
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
                        'mr-2 h-5 w-5',
                        isInWishlist ? 'fill-red-500 text-red-500' : '',
                    ]"
                />
                {{ isInWishlist ? 'Di Wishlist' : 'Tambah Wishlist' }}
            </Button>
            <Button variant="outline" size="lg" @click="shareProduct">
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
