<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import ProductImageGallery from '@/components/ecommerce/product/ProductImageGallery.vue';
import ProductInfo from '@/components/ecommerce/product/ProductInfo.vue';
import ProductActions from '@/components/ecommerce/product/ProductActions.vue';
import ProductDescription from '@/components/ecommerce/product/ProductDescription.vue';
import ProductReviews from '@/components/ecommerce/product/ProductReviews.vue';
import RelatedProducts from '@/components/ecommerce/product/RelatedProducts.vue';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Dimensions {
    length: number;
    width: number;
    height: number;
}

interface Review {
    id: number;
    customer_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
    short_description?: string;
    long_description?: string;
    brand?: string;
    price: number;
    original_price: number | null;
    discount_percentage: number;
    stock: number;
    warranty_months?: number;
    weight_gram?: number;
    dimensions?: Dimensions;
    images: string[];
    main_image: string;
    categories: Category[];
    rating: number;
    review_count: number;
    reviews: Review[];
    is_new: boolean;
    promotion?: {
        name: string;
        end_date: string;
    } | null;
}

interface RelatedProduct {
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
    relatedProducts: RelatedProduct[];
}

const props = defineProps<Props>();

// SEO Meta Tags
const metaTitle = `${props.product.name} - ${props.product.brand || 'Puranusa'}`;
const metaDescription = props.product.short_description || `Beli ${props.product.name} dengan harga terbaik. ${props.product.stock > 0 ? 'Stok tersedia' : 'Segera hadir kembali'}.`;
const metaImage = props.product.main_image;
const canonicalUrl = `/produk/${props.product.slug}`;

// Structured Data for SEO
const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.product.name,
    description: props.product.short_description,
    image: props.product.images,
    brand: {
        '@type': 'Brand',
        name: props.product.brand || 'Puranusa',
    },
    sku: props.product.sku,
    offers: {
        '@type': 'Offer',
        price: props.product.price,
        priceCurrency: 'IDR',
        availability: props.product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: canonicalUrl,
    },
    aggregateRating: props.product.review_count > 0 ? {
        '@type': 'AggregateRating',
        ratingValue: props.product.rating,
        reviewCount: props.product.review_count,
    } : undefined,
};

// Breadcrumb structured data
const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: '/beranda',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Toko',
            item: '/toko',
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: props.product.name,
            item: canonicalUrl,
        },
    ],
};

// Inject structured data into head on mount
onMounted(() => {
    // Add Product JSON-LD
    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.textContent = JSON.stringify(productJsonLd);
    document.head.appendChild(productScript);

    // Add Breadcrumb JSON-LD
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(breadcrumbScript);
});
</script>

<template>
    <EcommerceLayout>
        <Head>
            <title>{{ metaTitle }}</title>
            <meta name="description" :content="metaDescription" />

            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="product" />
            <meta property="og:title" :content="metaTitle" />
            <meta property="og:description" :content="metaDescription" />
            <meta property="og:image" :content="metaImage" />
            <meta property="og:url" :content="canonicalUrl" />

            <!-- Twitter -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" :content="metaTitle" />
            <meta name="twitter:description" :content="metaDescription" />
            <meta name="twitter:image" :content="metaImage" />

            <!-- Product specific meta -->
            <meta property="product:price:amount" :content="product.price.toString()" />
            <meta property="product:price:currency" content="IDR" />
            <meta property="product:availability" :content="product.stock > 0 ? 'in stock' : 'out of stock'" />

            <!-- Canonical URL -->
            <link rel="canonical" :href="canonicalUrl" />
        </Head>

        <div class="container mx-auto px-4 py-6">
            <!-- Breadcrumb -->
            <Breadcrumb class="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/beranda">Beranda</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/toko">Toko</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem v-if="product.categories.length > 0">
                        <BreadcrumbLink :href="`/toko?category=${product.categories[0].slug}`">
                            {{ product.categories[0].name }}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator v-if="product.categories.length > 0" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{{ product.name }}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <!-- Product Main Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <!-- Image Gallery -->
                <ProductImageGallery
                    :images="product.images"
                    :product-name="product.name"
                />

                <!-- Product Info & Actions -->
                <div class="space-y-6">
                    <ProductInfo
                        :name="product.name"
                        :brand="product.brand"
                        :sku="product.sku"
                        :rating="product.rating"
                        :review-count="product.review_count"
                        :price="product.price"
                        :original-price="product.original_price"
                        :discount-percentage="product.discount_percentage"
                        :stock="product.stock"
                        :categories="product.categories"
                        :warranty-months="product.warranty_months"
                        :is-new="product.is_new"
                    />

                    <Separator />

                    <ProductActions
                        :product-id="product.id"
                        :product-name="product.name"
                        :product-price="product.price"
                        :product-image="product.main_image"
                        :product-weight="product.weight_gram || 1000"
                        :stock="product.stock"
                    />
                </div>
            </div>

            <!-- Product Details Tabs -->
            <div class="mb-12">
                <Tabs default-value="description" class="w-full">
                    <TabsList class="grid w-full grid-cols-2">
                        <TabsTrigger value="description">Deskripsi & Spesifikasi</TabsTrigger>
                        <TabsTrigger value="reviews">
                            Ulasan ({{ product.review_count }})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" class="mt-6">
                        <ProductDescription
                            :short-description="product.short_description"
                            :long-description="product.long_description"
                            :weight-gram="product.weight_gram"
                            :dimensions="product.dimensions"
                        />
                    </TabsContent>

                    <TabsContent value="reviews" class="mt-6">
                        <ProductReviews
                            :reviews="product.reviews"
                            :average-rating="product.rating"
                            :total-reviews="product.review_count"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>

        <!-- Related Products -->
        <RelatedProducts
            v-if="relatedProducts.length > 0"
            :products="relatedProducts"
        />
    </EcommerceLayout>
</template>
