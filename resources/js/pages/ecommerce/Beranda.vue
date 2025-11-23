<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import CardCatalogProduct from '@/components/ecommerce/CardCatalogProduct.vue';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import { Head, Link } from '@inertiajs/vue3';
import {
    ChevronRight,
    Package,
    Star,
    Truck,
    Users,
} from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';
import Separator from '@/components/ui/separator/Separator.vue';

interface Banner {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    cta_text: string;
    cta_link: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    image: string;
    product_count: number;
}

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
    sold?: number;
    ends_at?: string;
}

interface Testimonial {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    product: string;
    date: string;
}

interface Statistic {
    label: string;
    value: string;
    icon: string;
}

interface Seo {
    title: string;
    description: string;
    keywords: string;
    image: string;
    canonical: string;
    og: {
        type: string;
        title: string;
        description: string;
        image: string;
        url: string;
        site_name: string;
        locale: string;
    };
    twitter: {
        card: string;
        title: string;
        description: string;
        image: string;
        site: string;
    };
    structuredData: Record<string, any>;
}

interface Props {
    banners: Banner[];
    categories: Category[];
    featuredProducts: Product[];
    flashSaleProducts: Product[];
    testimonials: Testimonial[];
    statistics: Statistic[];
    seo: Seo;
}

const props = defineProps<Props>();

const currentBannerIndex = ref(0);
const flashSaleTimeLeft = ref({ hours: 5, minutes: 0, seconds: 0 });

// Auto-rotate banner
let bannerInterval: ReturnType<typeof setInterval>;

onMounted(() => {
    // Add structured data script tag to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(props.seo.structuredData);
    document.head.appendChild(script);

    // Banner rotation
    bannerInterval = setInterval(() => {
        currentBannerIndex.value = (currentBannerIndex.value + 1) % props.banners.length;
    }, 5000);

    // Countdown timer for flash sale
    const countdownInterval = setInterval(() => {
        if (flashSaleTimeLeft.value.seconds > 0) {
            flashSaleTimeLeft.value.seconds--;
        } else if (flashSaleTimeLeft.value.minutes > 0) {
            flashSaleTimeLeft.value.minutes--;
            flashSaleTimeLeft.value.seconds = 59;
        } else if (flashSaleTimeLeft.value.hours > 0) {
            flashSaleTimeLeft.value.hours--;
            flashSaleTimeLeft.value.minutes = 59;
            flashSaleTimeLeft.value.seconds = 59;
        }
    }, 1000);

    onUnmounted(() => {
        clearInterval(countdownInterval);
    });
});

onUnmounted(() => {
    if (bannerInterval) clearInterval(bannerInterval);
});

</script>

<template>
    <EcommerceLayout>
        <!-- SEO Meta Tags for SSR -->

        <Head>
            <title>{{ props.seo.title }}</title>
            <meta name="description" :content="props.seo.description" />
            <meta name="keywords" :content="props.seo.keywords" />
            <link rel="canonical" :href="props.seo.canonical" />

            <!-- Open Graph Meta Tags -->
            <meta property="og:type" :content="props.seo.og.type" />
            <meta property="og:title" :content="props.seo.og.title" />
            <meta property="og:description" :content="props.seo.og.description" />
            <meta property="og:image" :content="props.seo.og.image" />
            <meta property="og:url" :content="props.seo.og.url" />
            <meta property="og:site_name" :content="props.seo.og.site_name" />
            <meta property="og:locale" :content="props.seo.og.locale" />

            <!-- Twitter Card Meta Tags -->
            <meta name="twitter:card" :content="props.seo.twitter.card" />
            <meta name="twitter:title" :content="props.seo.twitter.title" />
            <meta name="twitter:description" :content="props.seo.twitter.description" />
            <meta name="twitter:image" :content="props.seo.twitter.image" />
            <meta name="twitter:site" :content="props.seo.twitter.site" />

            <!-- Additional SEO Tags -->
            <meta name="robots"
                content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="language" content="Indonesian" />
            <meta name="author" content="Puranusa" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <!-- Note: Structured Data JSON-LD ditambahkan via JavaScript di onMounted -->
        </Head>

        <!-- Main Content -->
        <main>
            <!-- Hidden H1 for SEO -->
            <h1 class="sr-only">Puranusa - Toko Online Terpercaya dengan 10,000+ Produk Berkualitas</h1>

            <!-- Hero Banner - Samsung Style -->
            <section class="relative h-screen overflow-hidden bg-black" aria-label="Banner Promosi">
                <div v-for="(banner, index) in banners" :key="banner.id" :class="[
                    'absolute inset-0 transition-opacity duration-700',
                    index === currentBannerIndex ? 'opacity-300' : 'opacity-0'
                ]">
                    <img :src="banner.image" :alt="`${banner.title} - ${banner.subtitle}`"
                        class="h-full w-full object-cover opacity-80" loading="eager" fetchpriority="high" />
                    <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent">
                        <div class="container mx-auto h-full flex items-center px-6">
                            <div class="max-w-xl text-white space-y-4">
                                <h1 class="text-6xl font-bold leading-tight tracking-tight">{{ banner.title }}</h1>
                                <p class="text-lg text-gray-100">{{ banner.subtitle }}</p>
                                <div class="pt-2">
                                    <Link :href="banner.cta_link">
                                    <Button size="lg"
                                        class="rounded-full px-8 text-base font-semibold bg-white text-black hover:bg-gray-300">
                                        {{ banner.cta_text }}
                                    </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Banner indicators - Samsung style -->
                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    <button v-for="(banner, index) in banners" :key="banner.id" @click="currentBannerIndex = index"
                        :class="[
                            'h-1.5 rounded-full transition-all',
                            index === currentBannerIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
                        ]" :aria-label="`Go to slide ${index + 1}`" />
                </div>
            </section>

            <!-- Statistics - Samsung Style -->
            <section class="border-b py-12">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div v-for="stat in statistics" :key="stat.label" class="text-center">
                            <div class="flex justify-center mb-3">
                                <div class="p-6 rounded-full shadow-sm">
                                    <Package v-if="stat.icon === 'package'" class="h-10 w-10" />
                                    <Users v-else-if="stat.icon === 'users'" class="h-10 w-10" />
                                    <Star v-else-if="stat.icon === 'star'" class="h-10 w-10" />
                                    <Truck v-else-if="stat.icon === 'truck'" class="h-10 w-10" />
                                </div>
                            </div>
                            <div class="text-3xl font-bold mb-1">{{ stat.value }}</div>
                            <div class="text-sm text-gray-600">{{ stat.label }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Categories - Samsung Style -->
            <section class="py-16 container mx-auto px-6" aria-labelledby="categories-heading">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 id="categories-heading" class="text-4xl font-bold tracking-tight">Kategori Populer</h2>
                        <p class="text-gray-600 mt-2">Temukan produk berdasarkan kategori favorit Anda</p>
                    </div>
                    <Link href="/toko" aria-label="Lihat semua kategori">
                    <Button variant="outline" class="rounded-full gap-2">
                        Lihat Semua {{ categories.length }}
                        <ChevronRight class="h-4 w-4" />
                    </Button>
                    </Link>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Link v-for="category in categories" :key="category.id" :href="`/produk?kategori=${category.slug}`"
                        class="group" :aria-label="`Lihat produk ${category.name}`">
                    <Card class="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 p-0">
                        <div class="aspect-square relative overflow-hidden bg-gray-100">
                            <img :src="category.image"
                                :alt="`Kategori ${category.name} dengan ${category.product_count} produk tersedia`"
                                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy" width="400" height="400" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <div class="text-3xl mb-2">{{ category.icon }}</div>
                                <div class="font-bold text-lg">{{ category.name }}</div>
                                <div class="text-xs text-gray-200 mt-1">{{ category.product_count }} produk</div>
                            </div>
                        </div>
                    </Card>
                    </Link>
                </div>
            </section>

            <!-- Featured Products -->
            <section class="py-16 container mx-auto px-6" aria-labelledby="products-heading">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 id="products-heading" class="text-4xl font-bold tracking-tight">Produk Pilihan</h2>
                        <p class="text-gray-600 mt-2">Produk terbaik dengan rating tertinggi</p>
                    </div>
                    <Link href="/toko" aria-label="Lihat semua produk">
                    <Button variant="outline" class="rounded-full gap-2">
                        Lihat Semua
                        <ChevronRight class="h-4 w-4" />
                    </Button>
                    </Link>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <CardCatalogProduct v-for="product in featuredProducts" :key="product.id" :product="product" />
                </div>
            </section>

            <!-- Testimonials - Samsung Style -->
            <section class="py-16" aria-labelledby="testimonials-heading">
                <div class="container mx-auto px-6">
                    <div class="text-center mb-12">
                        <h2 id="testimonials-heading" class="text-4xl font-bold tracking-tight">Apa Kata Pelanggan</h2>
                        <p class="mt-3">Testimoni dari pelanggan yang puas dengan produk kami</p>
                    </div>

                    <Carousel class="w-full" :opts="{
                        align: 'start',
                        loop: true,
                    }">
                        <CarouselContent class="-ml-4">
                            <CarouselItem v-for="testimonial in testimonials" :key="testimonial.id"
                                class="pl-4 md:basis-1/2 lg:basis-1/3">
                                <article itemscope itemtype="https://schema.org/Review" class="h-full">
                                    <Card class="border-1 h-full">
                                        <CardHeader class="pb-3">
                                            <div class="flex items-center gap-4">
                                                <Avatar class="h-14 w-14">
                                                    <AvatarImage :src="testimonial.avatar"
                                                        :alt="`Foto profil ${testimonial.name}`" />
                                                    <AvatarFallback>{{ testimonial.name.charAt(0) }}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle class="text-base font-bold" itemprop="author">{{
                                                        testimonial.name }}</CardTitle>
                                                    <CardDescription class="text-xs text-gray-500">
                                                        <time itemprop="datePublished">{{ testimonial.date }}</time>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent class="space-y-4 pt-0">
                                            <div class="flex gap-1" itemprop="reviewRating" itemscope
                                                itemtype="https://schema.org/Rating">
                                                <meta itemprop="ratingValue" :content="testimonial.rating.toString()" />
                                                <meta itemprop="bestRating" content="5" />
                                                <meta itemprop="worstRating" content="1" />
                                                <Star v-for="i in 5" :key="i" :class="[
                                                    'h-5 w-5',
                                                    i <= testimonial.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-gray-200 text-gray-200'
                                                ]" />
                                            </div>
                                            <p class="text-sm text-gray-700 leading-relaxed" itemprop="reviewBody">{{
                                                testimonial.comment }}</p>
                                            <Separator />
                                            <div class="flex items-center gap-2" itemprop="itemReviewed" itemscope
                                                itemtype="https://schema.org/Product">
                                                <Package class="h-4 w-4 text-gray-400" />
                                                <p class="text-xs font-medium text-gray-600" itemprop="name">{{
                                                    testimonial.product }}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </article>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious class="hidden md:flex -left-12" />
                        <CarouselNext class="hidden md:flex -right-12" />
                    </Carousel>
                </div>
            </section>
        </main>
    </EcommerceLayout>
</template>
