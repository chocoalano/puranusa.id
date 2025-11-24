<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';
import { Link, usePage } from '@inertiajs/vue3';
import { Shield, Truck, Award } from 'lucide-vue-next';
import { computed } from 'vue';

const page = usePage();
const quote = page.props.quote;
const settings = computed(() => page.props.settings as Record<string, any>);
const siteName = computed(() => settings.value?.site_name || 'PURANUSA');

defineProps<{
    title?: string;
    description?: string;
}>();

const features = [
    {
        icon: Shield,
        title: 'Aman & Terpercaya',
        description: 'Transaksi terlindungi dengan sistem keamanan terbaik'
    },
    {
        icon: Truck,
        title: 'Pengiriman Cepat',
        description: 'Gratis ongkir untuk pembelian pertama'
    },
    {
        icon: Award,
        title: 'Kualitas Terjamin',
        description: 'Produk original dengan garansi resmi'
    }
];
</script>

<template>
    <div class="min-h-screen grid lg:grid-cols-2">
        <!-- Left Side - Hero Section with Gradient Background -->
        <div
            class="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden"
        >
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            <!-- Logo & Back Button -->
            <div class="relative z-10 text-center">
                <Link
                    :href="home()"
                    class="inline-flex items-center gap-3 group transition-all hover:gap-4"
                >
                    <div class="p-2 bg-white backdrop-blur-sm rounded-xl group-hover:bg-white/90 transition-all">
                        <AppLogoIcon class="size-8" />
                    </div>
                </Link>
            </div>

            <!-- Main Content -->
            <div class="relative z-10 mt-10 space-y-15">
                <!-- Hero Text -->
                <div class="space-y-4">
                    <h2 class="text-2xl font-bold leading-tight">
                        Belanja Mudah,<br />
                        Harga Terjangkau
                    </h2>
                    <p class="text-lg text-white/90">
                        Bergabunglah dengan ribuan pelanggan yang mempercayai kami untuk kebutuhan belanja online mereka
                    </p>
                </div>

                <!-- Features Grid -->
                <div class="grid grid-cols-3 gap-4">
                    <div
                        v-for="(feature, index) in features"
                        :key="index"
                        class="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/15 transition-all"
                    >
                        <div class="p-2 bg-white/20 rounded-lg">
                            <component :is="feature.icon" class="size-5" />
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">{{ feature.title }}</h3>
                            <p class="text-sm text-white/80">{{ feature.description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quote Section -->
            <div v-if="quote" class="relative z-10 mt-5">
                <blockquote class="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                    <p class="text-lg italic mb-3">&ldquo;{{ quote.message }}&rdquo;</p>
                    <footer class="text-sm text-white/80">
                        — {{ quote.author }}
                    </footer>
                </blockquote>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div class="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <!-- Right Side - Form Section -->
        <div class="flex items-center justify-center p-8 bg-background">
            <div class="w-full max-w-md space-y-8">
                <!-- Mobile Logo -->
                <div class="lg:hidden text-center mb-8">
                    <Link
                        :href="home()"
                        class="inline-flex items-center gap-2"
                    >
                        <AppLogoIcon class="size-10" />
                        <span class="text-2xl font-bold">{{ siteName }}</span>
                    </Link>
                </div>

                <!-- Form Header -->
                <div class="space-y-2 text-center">
                    <h1 v-if="title" class="text-3xl font-bold tracking-tight">
                        {{ title }}
                    </h1>
                    <p v-if="description" class="text-muted-foreground">
                        {{ description }}
                    </p>
                </div>

                <!-- Form Content Slot -->
                <div class="space-y-6">
                    <slot />
                </div>

                <!-- Back to Home Link (Mobile) -->
                <div class="lg:hidden text-center pt-4">
                    <Link
                        :href="home()"
                        class="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
