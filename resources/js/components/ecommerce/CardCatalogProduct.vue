<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, router } from '@inertiajs/vue3';
import { Heart, Info, ShoppingCart, Star } from 'lucide-vue-next';
import { computed, ref } from 'vue';

interface Product {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    original_price: number | null;
    discount_percentage: number;
    image: string;
    rating?: number;
    review_count?: number;
    stock: number;
    is_new?: boolean;
    badge?: string | null;
}

interface Props {
    product: Product;
}

const props = defineProps<Props>();

const addingToCart = ref(false);
const addingToWishlist = ref(false);
const isInWishlist = ref(false);
const isInStock = computed(() => props.product.stock > 0);
const stockLabel = computed(() => (isInStock.value ? 'Ready Stock' : 'Stok Habis'));
const stockBadgeClass = computed(() => (isInStock.value
    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
    : 'bg-destructive/10 text-destructive hover:bg-destructive/10'));

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};


const addToCart = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (addingToCart.value) return;

    addingToCart.value = true;

    try {
        router.post('/cart/add', {
            product_id: props.product.id,
            quantity: 1,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Show success notification
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
    } catch (error) {
        console.error('Add to cart error:', error);
        addingToCart.value = false;
    }
};

const toggleWishlist = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    if (addingToWishlist.value) return;

    addingToWishlist.value = true;

    try {
        const endpoint = isInWishlist.value ? '/wishlist/remove' : '/wishlist/add';

        router.post(endpoint, {
            product_id: props.product.id,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                isInWishlist.value = !isInWishlist.value;
                console.log(isInWishlist.value ? 'Added to wishlist' : 'Removed from wishlist');
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
    } catch (error) {
        console.error('Wishlist error:', error);
        addingToWishlist.value = false;
    }
};

const goToProduct = () => {
    router.visit(`/produk/${props.product.slug}`);
};
</script>

<template>
    <article itemscope itemtype="https://schema.org/Product" class="h-full">
        <Link :href="`/produk/${product.slug}`" class="group block h-full"
            :aria-label="`Lihat detail produk ${product.name}`">
        <Card
            class="group flex h-full flex-col gap-0 rounded-2xl border border-border/90 bg-background/95 p-3 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
            <div class="relative overflow-hidden rounded-xl bg-muted/20">
                <div class="relative h-44 w-full sm:h-56 lg:h-64">
                    <img :src="product.image" :alt="`${product.name} - ${product.description || 'Produk berkualitas'}`"
                        class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy" width="500" height="500" itemprop="image" />
                </div>

                <div class="absolute top-3 left-3 flex flex-col gap-1">
                    <Badge v-if="product.discount_percentage > 0" variant="destructive" class="text-xs px-2 py-0.5">
                        -{{ product.discount_percentage }}%
                    </Badge>
                    <Badge v-else-if="product.badge"
                        class="text-xs px-2 py-0.5 border-0 bg-primary text-primary-foreground">
                        {{ product.badge }}
                    </Badge>
                </div>

                <div
                    class="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2">
                    <Badge v-if="product.is_new" variant="secondary"
                        class="text-xs px-2 py-0.5 bg-green-500 text-white">
                        BARU
                    </Badge>

                    <div class="flex flex-wrap justify-end gap-1.5 sm:flex-col sm:items-end sm:gap-2">
                        <!-- Wishlist -->
                        <Button size="icon" :variant="isInWishlist ? 'default' : 'secondary'" class="
            rounded-lg bg-white/95 p-0 text-foreground shadow-sm backdrop-blur hover:bg-white
            h-8 w-8          /* HP kecil */
            sm:h-9 sm:w-9    /* HP lebar */
            md:h-10 md:w-10  /* Tablet */
            lg:h-11 lg:w-11  /* Desktop */
        " @click.prevent.stop="toggleWishlist" :disabled="addingToWishlist"
                            :aria-label="isInWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'">
                            <Heart :class="[
                                'transition-colors',
                                'h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5',
                                isInWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                            ]" />
                        </Button>

                        <!-- Add to Cart -->
                        <Button size="icon" variant="default" class="rounded-lg bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11" @click.prevent.stop="addToCart" :disabled="addingToCart || !isInStock"
                            :aria-label="isInStock ? 'Tambah ke keranjang' : 'Stok habis'">
                            <ShoppingCart :class="[
                                'transition-transform',
                                'h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5',
                                addingToCart ? 'animate-bounce' : ''
                            ]" />
                        </Button>

                        <!-- Detail produk -->
                        <Button size="icon" variant="secondary" class="rounded-lg bg-white/95 p-0 text-foreground shadow-sm backdrop-blur hover:bg-white h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 " @click.prevent.stop="goToProduct" aria-label="Lihat detail produk">
                            <Info class="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <CardContent class="flex flex-1 flex-col gap-3 px-0 pt-4 sm:gap-4 sm:pt-5">
                <div class="flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground sm:text-xs">
                    <div class="flex items-center gap-1.5" itemprop="aggregateRating" itemscope
                        itemtype="https://schema.org/AggregateRating">
                        <Star class="h-4 w-4 text-yellow-400" />
                        <template v-if="product.rating">
                            <meta itemprop="ratingValue" :content="product.rating.toString()" />
                            <meta itemprop="reviewCount" :content="product.review_count?.toString() || '0'" />
                            <span class="text-foreground">{{ product.rating }}</span>
                            <span>({{ product.review_count || 0 }})</span>
                        </template>
                        <template v-else>
                            <span class="text-muted-foreground">Belum ada ulasan</span>
                        </template>
                    </div>

                    <span class="hidden h-1 w-1 rounded-full bg-border sm:inline-flex" aria-hidden="true" />

                    <Badge variant="secondary" class="border-0 text-[10px] font-semibold uppercase tracking-wide"
                        :class="stockBadgeClass">
                        {{ stockLabel }}
                    </Badge>
                </div>

                <div class="space-y-2">
                    <span class="font-semibold leading-tight text-foreground line-clamp-2
               text-sm sm:text-base md:text-lg lg:text-xl break-words" itemprop="name">
                        {{ product.name }}
                    </span>
                </div>

                <div class="mt-auto space-y-1.5" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <meta itemprop="priceCurrency" content="IDR" />
                    <meta itemprop="price" :content="product.price.toString()" />
                    <meta itemprop="availability"
                        :content="product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'" />
                    <link itemprop="url" :href="`/produk/${product.slug}`" />

                    <div
                        class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 text-gray-900 dark:text-gray-100">
                        <!-- Harga sekarang (utamanya) -->
                        <span class="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                            {{ formatCurrency(product.price) }}
                        </span>

                        <!-- Harga coret (sebelumnya) -->
                        <span v-if="product.original_price && product.discount_percentage > 0"
                            class="line-through text-muted-foreground text-[10px] sm:text-xs md:text-sm">
                            {{ formatCurrency(product.original_price) }}
                        </span>
                    </div>

                    <p class="text-[11px] font-medium" :class="isInStock ? 'text-emerald-600' : 'text-destructive'">
                        {{ isInStock ? 'Siap dikirim 24 jam' : 'Sedang tidak tersedia' }}
                    </p>
                </div>
            </CardContent>
        </Card>
        </Link>
    </article>
</template>
