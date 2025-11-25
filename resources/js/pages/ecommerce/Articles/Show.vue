<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import ArticleContent from '@/components/ArticleContent.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-vue-next';

interface Block {
    id: string;
    type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code' | 'video' | 'divider';
    content: any;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    seo_title: string;
    seo_description: string;
    published_at: string;
    blocks: Block[];
    tags: string[];
    reading_time: number;
}

interface RelatedArticle {
    id: number;
    title: string;
    slug: string;
    seo_description: string;
    published_at: string;
    featured_image: string | null;
    tags: string[];
}

interface Props {
    article: Article;
    relatedArticles: RelatedArticle[];
}

const props = defineProps<Props>();

const shareArticle = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    if (navigator.share) {
        navigator.share({
            title: props.article.title,
            text: props.article.seo_description,
            url: window.location.href,
        }).catch(() => {
            // User cancelled share or error occurred
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link artikel telah disalin!');
    }
};

const getImageUrl = (url: string | null) => {
    if (!url) return 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image';
    return url.startsWith('/') ? url : `/${url}`;
};

const getFeaturedImage = () => {
    if (!props.article.blocks || !Array.isArray(props.article.blocks)) {
        return null;
    }
    const imageBlock = props.article.blocks.find(block => block.type === 'image');
    if (imageBlock) {
        const content = imageBlock.content || imageBlock;
        return content.url || null;
    }
    return null;
};
</script>

<template>
    <Head>
        <title>{{ article.seo_title || article.title }}</title>
        <meta name="description" :content="article.seo_description" />
        <meta property="og:title" :content="article.seo_title || article.title" />
        <meta property="og:description" :content="article.seo_description" />
        <meta property="og:image" :content="getFeaturedImage()" />
        <meta property="og:type" content="article" />
    </Head>

    <EcommerceLayout>
        <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
            <!-- Breadcrumb -->
            <div class="border-b bg-white dark:bg-gray-900">
                <div class="container mx-auto px-4 py-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        @click="router.visit('/artikel')"
                        class="gap-2"
                    >
                        <ArrowLeft class="h-4 w-4" />
                        Kembali ke Artikel
                    </Button>
                </div>
            </div>

            <article class="container mx-auto px-4 py-8 md:py-12">
                <div class="max-w-4xl mx-auto">
                    <!-- Article Header -->
                    <header class="mb-8">
                        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                            {{ article.title }}
                        </h1>

                        <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div class="flex items-center gap-2">
                                <Calendar class="h-4 w-4" />
                                <time>{{ article.published_at }}</time>
                            </div>
                            <div class="flex items-center gap-2">
                                <Clock class="h-4 w-4" />
                                <span>{{ article.reading_time }} menit baca</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                @click="shareArticle"
                                class="ml-auto gap-2"
                            >
                                <Share2 class="h-4 w-4" />
                                Bagikan
                            </Button>
                        </div>

                        <!-- Tags -->
                        <div v-if="article.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
                            <Tag class="h-4 w-4 text-muted-foreground" />
                            <Badge
                                v-for="tag in article.tags"
                                :key="tag"
                                variant="secondary"
                                class="cursor-pointer"
                                @click="router.visit(`/artikel?tag=${tag}`)"
                            >
                                {{ tag }}
                            </Badge>
                        </div>

                        <Separator />
                    </header>

                    <!-- Article Content -->
                    <div class="prose prose-lg max-w-none dark:prose-invert mb-12">
                        <ArticleContent v-if="article.blocks && article.blocks.length > 0" :blocks="article.blocks" />
                        <p v-else class="text-muted-foreground">Konten artikel tidak tersedia.</p>
                    </div>

                    <Separator class="my-12" />

                    <!-- Article Footer -->
                    <footer class="mb-12">
                        <div class="flex items-center justify-between">
                            <div class="flex flex-wrap gap-2">
                                <span class="text-sm text-muted-foreground">Bagikan:</span>
                                <Button variant="outline" size="sm" @click="shareArticle">
                                    <Share2 class="h-4 w-4 mr-2" />
                                    Bagikan Artikel
                                </Button>
                            </div>
                        </div>
                    </footer>

                    <!-- Related Articles -->
                    <section v-if="relatedArticles.length > 0" class="mt-16">
                        <h2 class="text-2xl font-bold mb-6">Artikel Terkait</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card
                                v-for="related in relatedArticles"
                                :key="related.id"
                                class="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                                @click="router.visit(`/artikel/${related.slug}`)"
                            >
                                <div class="relative h-40 overflow-hidden bg-muted">
                                    <img
                                        :src="getImageUrl(related.featured_image)"
                                        :alt="related.title"
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <CardContent class="p-4">
                                    <div class="text-xs text-muted-foreground mb-2">
                                        {{ related.published_at }}
                                    </div>
                                    <h3 class="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {{ related.title }}
                                    </h3>
                                    <p class="text-sm text-muted-foreground line-clamp-2">
                                        {{ related.seo_description }}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </div>
            </article>
        </div>
    </EcommerceLayout>
</template>
