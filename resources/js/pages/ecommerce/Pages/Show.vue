<script setup lang="ts">
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import { Head } from '@inertiajs/vue3';
import { Card, CardContent } from '@/components/ui/card';
import ArticleContent from '@/components/ArticleContent.vue';

interface Page {
    id: number;
    title: string;
    slug: string;
    blocks: any[] | null;
    seo_title: string | null;
    seo_description: string | null;
    template: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    page: Page;
}

const props = defineProps<Props>();

const seoTitle = props.page.seo_title || props.page.title;
const seoDescription = props.page.seo_description || '';
</script>

<template>
    <Head>
        <title>{{ seoTitle }}</title>
        <meta name="description" :content="seoDescription" />
        <link rel="canonical" :href="`/page/${page.slug}`" />
        <meta property="og:title" :content="seoTitle" />
        <meta property="og:description" :content="seoDescription" />
        <meta property="og:url" :content="`/page/${page.slug}`" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" :content="seoTitle" />
        <meta name="twitter:description" :content="seoDescription" />
    </Head>

    <EcommerceLayout>
        <div class="bg-gradient-to-b from-muted/50 to-background py-12">
            <div class="container mx-auto px-6">
                <div :class="{
                    'max-w-4xl mx-auto': page.template === 'default',
                    'max-w-full': page.template === 'full-width',
                    'max-w-2xl mx-auto': page.template === 'narrow',
                }">
                    <Card>
                        <CardContent class="p-8 md:p-12">
                            <article>
                                <header class="mb-8">
                                    <h1 class="text-3xl md:text-4xl font-bold mb-4">
                                        {{ page.title }}
                                    </h1>
                                    <time class="text-sm text-muted-foreground" :datetime="page.updated_at">
                                        Terakhir diperbarui: {{ new Date(page.updated_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) }}
                                    </time>
                                </header>

                                <ArticleContent v-if="page.blocks && page.blocks.length > 0" :blocks="page.blocks" />
                                <div v-else class="text-center py-12 text-muted-foreground">
                                    <p>Konten belum tersedia.</p>
                                </div>
                            </article>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </EcommerceLayout>
</template>
