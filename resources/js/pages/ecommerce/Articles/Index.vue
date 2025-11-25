<script setup lang="ts">
import { ref, computed } from 'vue';
import { router, Head } from '@inertiajs/vue3';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Search, Clock, Tag, ChevronRight } from 'lucide-vue-next';

interface Article {
    id: number;
    title: string;
    slug: string;
    seo_description: string;
    published_at: string;
    featured_image: string | null;
    tags: string[];
    reading_time: number;
}

interface Props {
    articles: {
        data: Article[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    filters: {
        search: string | null;
        tag: string | null;
        per_page: number;
    };
    allTags: string[];
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');
const selectedTag = ref(props.filters.tag || null);

const performSearch = () => {
    router.get('/artikel', {
        search: searchQuery.value || undefined,
        tag: selectedTag.value || undefined,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const selectTag = (tag: string | null) => {
    selectedTag.value = tag;
    router.get('/artikel', {
        search: searchQuery.value || undefined,
        tag: tag || undefined,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const clearFilters = () => {
    searchQuery.value = '';
    selectedTag.value = null;
    router.get('/artikel');
};

const hasActiveFilters = computed(() => {
    return !!searchQuery.value || !!selectedTag.value;
});

const getImageUrl = (url: string | null) => {
    if (!url) return 'https://placehold.co/800x450/e2e8f0/64748b?text=No+Image';
    return url.startsWith('/') ? url : `/${url}`;
};

// SEO metadata
const pageTitle = computed(() => {
    if (selectedTag.value) return `Artikel ${selectedTag.value} - Blog`;
    if (searchQuery.value) return `Pencarian: ${searchQuery.value} - Blog`;
    return 'Artikel & Blog - Tips, Panduan, dan Informasi Terkini';
});

const pageDescription = computed(() => {
    if (selectedTag.value) return `Baca artikel terkait ${selectedTag.value}. Temukan tips, panduan, dan informasi bermanfaat seputar ${selectedTag.value}.`;
    if (searchQuery.value) return `Hasil pencarian untuk "${searchQuery.value}". Temukan artikel yang Anda cari.`;
    return 'Temukan informasi menarik, tips, dan panduan seputar produk dan layanan kami. Baca artikel terbaru dan terlengkap.';
});

const canonicalUrl = computed(() => {
    if (typeof window === 'undefined') {
        return '/artikel';
    }
    const base = window.location.origin + '/artikel';
    const params = new URLSearchParams();
    if (searchQuery.value) params.set('search', searchQuery.value);
    if (selectedTag.value) params.set('tag', selectedTag.value);
    return params.toString() ? `${base}?${params.toString()}` : base;
});

const getPaginationLabel = (label: string, isActive: boolean) => {
    // Clean HTML entities
    const cleanLabel = label.replace(/&laquo;|&raquo;/g, '').trim();

    if (cleanLabel === 'Previous' || label.includes('&laquo;')) {
        return 'Halaman sebelumnya';
    }
    if (cleanLabel === 'Next' || label.includes('&raquo;')) {
        return 'Halaman selanjutnya';
    }
    if (isActive) {
        return `Halaman ${cleanLabel} (halaman saat ini)`;
    }
    return `Pergi ke halaman ${cleanLabel}`;
};
</script>

<template>
    <Head>
        <title>{{ pageTitle }}</title>
        <meta name="description" :content="pageDescription" />
        <link rel="canonical" :href="canonicalUrl" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:title" :content="pageTitle" />
        <meta property="og:description" :content="pageDescription" />
        <meta property="og:url" :content="canonicalUrl" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="pageTitle" />
        <meta name="twitter:description" :content="pageDescription" />

        <!-- Additional SEO -->
        <meta name="robots" content="index, follow" />
        <meta name="keywords" :content="selectedTag ? `${selectedTag}, artikel, blog` : 'artikel, blog, tips, panduan, informasi'" />
    </Head>

    <EcommerceLayout>
        <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
            <!-- Hero Section -->
            <div class="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
                <div class="container mx-auto px-4 py-16 md:py-24">
                    <div class="max-w-3xl mx-auto text-center">
                        <h1 class="text-4xl md:text-5xl font-bold mb-4">
                            Artikel & Blog
                        </h1>
                        <p class="text-lg md:text-xl text-white/90 mb-8">
                            Temukan informasi menarik, tips, dan panduan seputar produk dan layanan kami
                        </p>

                        <!-- Search Bar -->
                        <div class="max-w-2xl mx-auto">
                            <form @submit.prevent="performSearch" role="search">
                                <label for="article-search" class="sr-only">Cari artikel</label>
                                <div class="relative">
                                    <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <Input
                                        id="article-search"
                                        v-model="searchQuery"
                                        type="search"
                                        placeholder="Cari artikel..."
                                        class="pl-12 pr-32 h-14 text-base bg-white dark:bg-gray-900 border-0 shadow-lg"
                                        aria-label="Cari artikel"
                                    />
                                    <Button
                                        type="submit"
                                        class="absolute right-2 top-1/2 -translate-y-1/2 h-10"
                                        aria-label="Tombol cari"
                                    >
                                        Cari
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mx-auto px-4 py-8 md:py-12">
                <div class="flex flex-col lg:flex-row gap-8">
                    <!-- Sidebar -->
                    <aside class="lg:w-64 flex-shrink-0" role="complementary" aria-label="Filter artikel">
                        <div class="sticky top-4 space-y-6">
                            <!-- Filter Tags -->
                            <Card>
                                <CardContent class="p-4">
                                    <div class="flex items-center gap-2 mb-4">
                                        <Tag class="h-4 w-4" aria-hidden="true" />
                                        <h2 class="font-semibold text-base">Tag Populer</h2>
                                    </div>
                                    <nav aria-label="Filter berdasarkan tag">
                                        <div class="flex flex-wrap gap-2">
                                            <Badge
                                                v-if="hasActiveFilters"
                                                variant="outline"
                                                class="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                                                @click="clearFilters"
                                                role="button"
                                                tabindex="0"
                                                @keypress.enter="clearFilters"
                                            >
                                                Clear Filters
                                            </Badge>
                                            <Badge
                                                v-for="tag in allTags"
                                                :key="tag"
                                                :variant="selectedTag === tag ? 'default' : 'secondary'"
                                                class="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                                @click="selectTag(tag === selectedTag ? null : tag)"
                                                role="button"
                                                tabindex="0"
                                                :aria-pressed="selectedTag === tag"
                                                @keypress.enter="selectTag(tag === selectedTag ? null : tag)"
                                            >
                                                {{ tag }}
                                            </Badge>
                                        </div>
                                    </nav>
                                </CardContent>
                            </Card>

                            <!-- Stats -->
                            <Card>
                                <CardContent class="p-4">
                                    <p class="text-sm text-muted-foreground">
                                        Menampilkan <span class="font-semibold text-foreground">{{ articles.data.length }}</span> dari <span class="font-semibold text-foreground">{{ articles.total }}</span> artikel
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <main class="flex-1" role="main">
                        <!-- Active Filters -->
                        <div v-if="hasActiveFilters" class="mb-6 flex flex-wrap items-center gap-2" role="status" aria-live="polite">
                            <span class="text-sm text-muted-foreground">Filter aktif:</span>
                            <Badge v-if="searchQuery" variant="outline" class="gap-1">
                                Search: {{ searchQuery }}
                            </Badge>
                            <Badge v-if="selectedTag" variant="outline" class="gap-1">
                                Tag: {{ selectedTag }}
                            </Badge>
                        </div>

                        <!-- Articles Grid -->
                        <div v-if="articles.data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <article
                                v-for="article in articles.data"
                                :key="article.id"
                            >
                                <Card
                                    class="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
                                    @click="router.visit(`/artikel/${article.slug}`)"
                                    tabindex="0"
                                    role="link"
                                    :aria-label="`Baca artikel: ${article.title}`"
                                    @keypress.enter="router.visit(`/artikel/${article.slug}`)"
                                >
                                    <!-- Featured Image -->
                                    <div class="relative h-48 overflow-hidden bg-muted">
                                        <img
                                            :src="getImageUrl(article.featured_image)"
                                            :alt="article.title"
                                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                            width="800"
                                            height="450"
                                        />
                                        <div class="absolute top-3 right-3">
                                            <Badge class="bg-white/90 dark:bg-gray-900/90 text-foreground border-0 shadow-sm">
                                                <Clock class="h-3 w-3 mr-1" aria-hidden="true" />
                                                <span class="sr-only">Waktu baca:</span>
                                                {{ article.reading_time }} min
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent class="p-5 flex-1 flex flex-col">
                                        <time class="flex items-center gap-2 mb-3 text-xs text-muted-foreground" :datetime="article.published_at">
                                            {{ article.published_at }}
                                        </time>

                                        <h3 class="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {{ article.title }}
                                        </h3>

                                        <p class="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                                            {{ article.seo_description }}
                                        </p>

                                        <!-- Tags -->
                                        <nav v-if="article.tags.length > 0" class="flex flex-wrap gap-1" aria-label="Tag artikel">
                                            <Badge
                                                v-for="tag in article.tags.slice(0, 3)"
                                                :key="tag"
                                                variant="secondary"
                                                class="text-xs"
                                            >
                                                {{ tag }}
                                            </Badge>
                                        </nav>
                                    </CardContent>

                                    <CardFooter class="px-5 pb-5 pt-0">
                                        <Button variant="ghost" size="sm" class="w-full group-hover:bg-primary group-hover:text-primary-foreground" aria-label="Baca artikel selengkapnya">
                                            Baca Selengkapnya
                                            <ChevronRight class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </article>
                        </div>

                        <!-- Empty State -->
                        <div v-else class="text-center py-16" role="status">
                            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <Search class="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Tidak ada artikel ditemukan</h3>
                            <p class="text-muted-foreground mb-4">
                                Coba ubah filter atau kata kunci pencarian Anda
                            </p>
                            <Button @click="clearFilters" variant="outline" aria-label="Hapus semua filter">
                                Clear Filters
                            </Button>
                        </div>

                        <!-- Pagination -->
                        <nav v-if="articles.last_page > 1" class="mt-8 flex justify-center" aria-label="Navigasi halaman artikel">
                            <div class="flex items-center gap-2" role="navigation">
                                <template v-for="(link, index) in articles.links" :key="index">
                                    <Button
                                        :variant="link.active ? 'default' : 'outline'"
                                        :disabled="!link.url"
                                        size="sm"
                                        @click="link.url && router.visit(link.url)"
                                        :aria-label="getPaginationLabel(link.label, link.active)"
                                        :aria-current="link.active ? 'page' : undefined"
                                    >
                                        <span v-html="link.label"></span>
                                    </Button>
                                </template>
                            </div>
                        </nav>
                    </main>
                </div>
            </div>
        </div>
    </EcommerceLayout>
</template>
