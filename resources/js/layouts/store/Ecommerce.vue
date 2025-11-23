<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import CheckoutSheet from '@/components/ecommerce/checkout/CheckoutSheet.vue';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useAppearance } from '@/composables/useAppearance';
import { Link, usePage } from '@inertiajs/vue3';
import {
    Menu,
    Search,
    ShoppingCart,
    User,
    Package,
    Tv,
    Laptop,
    Home,
    Smartphone,
    LogOut,
    UserCircle,
    Moon,
    Sun,
    Heart,
    Shield,
    Info,
    Trash2,
    Plus,
    Minus,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import axios from 'axios';

interface Props {
    title?: string;
    description?: string;
}

interface CartItem {
    id: number;
    product_id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    quantity: number;
    weight: number;
}

interface WishlistItem {
    id: number;
    product_id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
}

interface CategoryItem {
    name: string;
    slug: string;
    href: string;
}

interface NavigationCategory {
    id: number;
    name: string;
    slug: string;
    items: CategoryItem[];
}

interface FooterLink {
    name: string;
    href: string;
}

interface FooterMenu {
    title: string;
    links: FooterLink[];
}

interface SocialLink {
    name: string;
    href: string;
    icon: string;
}

interface EcommerceData {
    cart?: {
        items: CartItem[];
        subtotal: number;
        total: number;
    };
    wishlist?: {
        items: WishlistItem[];
    };
    categories: NavigationCategory[];
    footerMenus: FooterMenu[];
    socialLinks: SocialLink[];
}

defineProps<Props>();

const page = usePage();
const searchQuery = ref('');
const mobileMenuOpen = ref(false);
const searchOpen = ref(false);
const newsletterEmail = ref('');
const newsletterSubmitting = ref(false);
const newsletterSuccess = ref(false);
const { appearance, updateAppearance } = useAppearance();
const checkoutSheetOpen = ref(false);
const selectedCartItems = ref<number[]>([]);
const checkoutItems = ref<CartItem[]>([]);

// Get data from shared Inertia props
const ecommerceData = computed(() => (page.props.ecommerce as EcommerceData) || { categories: [] });
const cartData = computed(() => ecommerceData.value.cart);
const wishlistData = computed(() => ecommerceData.value.wishlist);
const navigationCategories = computed(() => ecommerceData.value.categories || []);
const settings = computed(() => (page.props.settings as Record<string, any>) || {});
const siteName = computed(() => settings.value.site_name || 'PURANUSA');
const siteDescription = computed(() => settings.value.site_description || 'Puranusa adalah destinasi belanja online terpercaya');
const paymentMethods = computed(() => settings.value.payment_methods || ['VISA', 'Mastercard', 'GoPay', 'OVO']);
const siteLogo = computed(() => settings.value.site_logo);

const cartItemCount = computed(() => {
    return cartData.value?.items?.length || 0;
});

const wishlistItemCount = computed(() => {
    return wishlistData.value?.items?.length || 0;
});

// Cart items from database
const cartItems = computed(() => {
    return cartData.value?.items || [];
});

// Wishlist items from database
const wishlistItems = computed(() => {
    return wishlistData.value?.items || [];
});

const cartTotal = computed(() => {
    return cartData.value?.total || 0;
});

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const isAuthenticated = computed(() => {
    return !!page.props.auth?.user;
});

const isDark = computed(() => {
    if (appearance.value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return appearance.value === 'dark';
});

const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    updateAppearance(newTheme);
};

const subscribeNewsletter = async () => {
    if (!newsletterEmail.value || newsletterSubmitting.value) return;

    newsletterSubmitting.value = true;

    try {
        const response = await fetch('/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
                email: newsletterEmail.value,
            }),
        });

        const data = await response.json();

        if (data.success) {
            newsletterSuccess.value = true;
            newsletterEmail.value = '';

            setTimeout(() => {
                newsletterSuccess.value = false;
            }, 3000);
        } else {
            alert(data.message || 'Terjadi kesalahan saat berlangganan');
        }
    } catch (error) {
        console.error('Newsletter subscription failed:', error);
        alert('Terjadi kesalahan saat berlangganan. Silakan coba lagi.');
    } finally {
        newsletterSubmitting.value = false;
    }
};

// Wishlist management
const addToCartFromWishlist = async (item: WishlistItem) => {
    try {
        const response = await axios.post('/cart/add', {
            product_id: item.product_id,
            quantity: 1,
        });

        if (response.data.success) {
            // Refresh page to update cart count
            window.location.reload();
        }
    } catch (error: any) {
        console.error('Failed to add to cart:', error);
        const message = error.response?.data?.message || 'Gagal menambahkan ke keranjang';
        alert(message);
    }
};

const removeFromWishlist = async (itemId: number, productId: number) => {
    try {
        const response = await axios.post('/wishlist/remove', {
            product_id: productId,
        });

        if (response.data.success) {
            // Remove item from local wishlist without reload
            if (wishlistData.value?.items) {
                const index = wishlistData.value.items.findIndex(i => i.id === itemId);
                if (index > -1) {
                    wishlistData.value.items.splice(index, 1);
                }
            }
        }
    } catch (error: any) {
        console.error('Failed to remove from wishlist:', error);
        const message = error.response?.data?.message || 'Gagal menghapus dari wishlist';
        alert(message);
    }
};

// Cart management
const updateCartQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
        const response = await axios.post('/cart/update', {
            cart_id: itemId,
            quantity: newQuantity,
        });

        if (response.data.success) {
            // Update local cart data without reload
            const item = cartItems.value.find(i => i.id === itemId);
            if (item) {
                item.quantity = newQuantity;
            }

            // Update cart totals
            if (cartData.value && response.data.cart) {
                cartData.value.subtotal = response.data.cart.subtotal;
                cartData.value.total = response.data.cart.total;
            }
        }
    } catch (error) {
        console.error('Failed to update cart quantity:', error);
        alert('Gagal memperbarui jumlah produk');
    }
};

const removeFromCart = async (itemId: number) => {
    try {
        const response = await axios.post('/cart/remove', {
            cart_id: itemId,
        });

        if (response.data.success) {
            // Remove item from local cart without reload
            if (cartData.value?.items) {
                const index = cartData.value.items.findIndex(i => i.id === itemId);
                if (index > -1) {
                    cartData.value.items.splice(index, 1);
                }
            }

            // Update cart totals
            if (cartData.value && response.data.cart) {
                cartData.value.subtotal = response.data.cart.subtotal;
                cartData.value.total = response.data.cart.total;
            }

            // Remove from selected items if exists
            const index = selectedCartItems.value.indexOf(itemId);
            if (index > -1) {
                selectedCartItems.value.splice(index, 1);
            }
        }
    } catch (error) {
        console.error('Failed to remove from cart:', error);
        alert('Gagal menghapus dari keranjang');
    }
};

// Cart selection for checkout
const toggleCartItemSelection = (itemId: number, checked: boolean) => {
    const index = selectedCartItems.value.indexOf(itemId);

    if (checked) {
        if (index === -1) {
            selectedCartItems.value.push(itemId);
        }
    } else if (index > -1) {
        selectedCartItems.value.splice(index, 1);
    }
};

const toggleSelectAll = (checked: boolean) => {
    if (checked) {
        selectedCartItems.value = cartItems.value.map(item => item.id);
    } else {
        selectedCartItems.value = [];
    }
};

const isAllSelected = computed(() => {
    return cartItems.value.length > 0 && selectedCartItems.value.length === cartItems.value.length;
});

const selectedItemsTotal = computed(() => {
    return cartItems.value
        .filter(item => selectedCartItems.value.includes(item.id))
        .reduce((total, item) => total + (item.price * item.quantity), 0);
});

const selectedItemsCount = computed(() => {
    return selectedCartItems.value.length;
});

// Handle checkout with selected items
const handleCheckout = () => {
    const selectedItems = cartItems.value.filter(item => selectedCartItems.value.includes(item.id));

    if (selectedItems.length === 0) {
        alert('Pilih minimal satu produk untuk checkout');
        return;
    }

    // For single item checkout, use the existing CheckoutSheet
    // For multiple items, we'll need to handle differently
    if (selectedItems.length === 1) {
        checkoutItems.value = selectedItems;
        checkoutSheetOpen.value = true;
    } else {
        // For multiple items, redirect to checkout page
        const itemIds = selectedCartItems.value.join(',');
        window.location.href = `/checkout?items=${itemIds}`;
    }
};

// Footer data from shared props
const footerMenus = computed(() => ecommerceData.value.footerMenus || []);
const socialLinks = computed(() => ecommerceData.value.socialLinks || []);

// Social icon SVG paths
const socialIconPaths: Record<string, string> = {
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    instagram: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
    youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

// Build product categories for mega menu from database categories
const productCategories = computed(() => {
    return navigationCategories.value.map((category) => {
        // Map category names to icons
        const iconMap: Record<string, any> = {
            Mobile: Smartphone,
            'TV & AV': Tv,
            Appliances: Home,
            Computing: Laptop,
            Smartphone,
            Tablet: Smartphone,
            Electronics: Package,
            Fashion: Package,
            Home: Home,
            Beauty: Package,
        };

        return {
            name: category.name,
            slug: category.slug,
            icon: iconMap[category.name] || Package,
            items: category.items.map(item => ({
                ...item,
                href: `/toko?category=${category.slug}&subcategory=${item.slug}`,
            })),
        };
    });
});

// Handle global search
const handleSearch = () => {
    if (searchQuery.value.trim()) {
        window.location.href = `/toko?search=${encodeURIComponent(searchQuery.value.trim())}`;
    }
};

// Get search suggestions based on user input and available products
const searchSuggestions = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();

    if (!query) {
        // Default popular searches from available categories and subcategories
        const popularSearches: Array<{ label: string; query: string }> = [];

        // Get top-level categories
        navigationCategories.value.slice(0, 3).forEach(category => {
            popularSearches.push({
                label: category.name,
                query: category.name.toLowerCase(),
            });
        });

        // Get some popular subcategories from first categories
        navigationCategories.value.slice(0, 2).forEach(category => {
            category.items.slice(0, 1).forEach(item => {
                popularSearches.push({
                    label: item.name,
                    query: item.name.toLowerCase(),
                });
            });
        });

        return popularSearches.slice(0, 5);
    }

    const suggestions: Array<{ label: string; query: string }> = [];

    // Add matching categories
    navigationCategories.value.forEach(category => {
        if (category.name.toLowerCase().includes(query)) {
            suggestions.push({
                label: category.name,
                query: category.name.toLowerCase(),
            });
        }

        // Add matching subcategories
        category.items.forEach(item => {
            if (item.name.toLowerCase().includes(query)) {
                suggestions.push({
                    label: item.name,
                    query: item.name.toLowerCase(),
                });
            }
        });
    });

    // Add search query variations
    if (query.length >= 2) {
        const variations = [
            { label: `${query}`, query: query },
            { label: `${query} terbaru`, query: `${query} terbaru` },
            { label: `${query} murah`, query: `${query} murah` },
        ];

        variations.forEach(variation => {
            if (!suggestions.find(s => s.query === variation.query)) {
                suggestions.push(variation);
            }
        });
    }

    // Return unique suggestions, limited to 5
    const uniqueSuggestions = suggestions.filter((item, index, self) =>
        index === self.findIndex((t) => t.query === item.query)
    );

    return uniqueSuggestions.slice(0, 5);
});
</script>

<template>
    <div class="min-h-screen">

        <!-- Samsung-style Main Header -->
        <header class="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow-sm border-b dark:border-gray-800">
            <div class="container mx-auto px-4 lg:px-6">
                <div class="h-16 flex items-center justify-between gap-4">
                    <!-- Logo -->
                    <Link href="/" class="flex items-center gap-2 flex-shrink-0">
                        <img v-if="siteLogo" :src="siteLogo" :alt="siteName" class="h-15 w-15 object-contain" />
                        <Package v-else class="h-7 w-7 text-primary" />
                        <span class="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{{ siteName }}</span>
                    </Link>

                    <!-- Center: Search Bar (Desktop) -->
                    <div class="hidden lg:flex flex-1 max-w-2xl mx-4">
                        <div class="relative w-full">
                            <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                v-model="searchQuery"
                                placeholder="Cari produk, kategori, atau brand..."
                                class="w-full h-11 pl-11 pr-24"
                                @keydown.enter="handleSearch"
                            />
                            <Button
                                @click="handleSearch"
                                size="sm"
                                class="absolute right-1 top-1/2 -translate-y-1/2 h-9"
                            >
                                Cari
                            </Button>
                        </div>
                    </div>

                    <!-- Right Actions -->
                    <div class="flex items-center gap-1 flex-shrink-0">
                        <!-- Search Button (Mobile) -->
                        <Button
                            variant="ghost"
                            size="icon"
                            @click="searchOpen = !searchOpen"
                            class="lg:hidden rounded-full"
                            aria-label="Search"
                        >
                            <Search class="h-5 w-5" />
                        </Button>

                        <!-- Theme Toggle -->
                        <Button
                            variant="ghost"
                            size="icon"
                            @click="toggleTheme"
                            class="hidden sm:flex items-center justify-center rounded-full"
                            aria-label="Toggle theme"
                        >
                            <Sun v-if="isDark" class="h-5 w-5" />
                            <Moon v-else class="h-5 w-5" />
                        </Button>
                        <!-- Wishlist Dropdown -->
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" size="icon" class="relative rounded-full" aria-label="Wishlist">
                                    <Heart class="h-5 w-5" />
                                    <Badge
                                        v-if="wishlistItemCount > 0"
                                        class="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                                    >
                                        {{ wishlistItemCount }}
                                    </Badge>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-150">
                                <DropdownMenuLabel class="flex items-center justify-between">
                                    <span>Wishlist Saya</span>
                                    <Badge variant="secondary">{{ wishlistItemCount }} item</Badge>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div class="max-h-96 overflow-y-auto">
                                    <div v-if="wishlistItems.length > 0" class="space-y-1">
                                        <div
                                            v-for="item in wishlistItems"
                                            :key="item.id"
                                            class="group p-3 hover:bg-accent rounded-md transition-colors"
                                        >
                                            <div class="flex items-center gap-3">
                                                <Link :href="`/produk/${item.slug}`" class="flex-shrink-0">
                                                    <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded" />
                                                </Link>
                                                <div class="flex-1 min-w-0">
                                                    <Link :href="`/produk/${item.slug}`" class="text-sm font-medium line-clamp-2 hover:underline block">
                                                        {{ item.name }}
                                                    </Link>
                                                    <p class="text-sm font-bold text-primary mt-1">{{ formatCurrency(item.price) }}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    @click.stop="removeFromWishlist(item.id, item.product_id)"
                                                    aria-label="Remove from wishlist"
                                                >
                                                    <Trash2 class="h-4 w-4 text-destructive" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    @click.stop="addToCartFromWishlist(item)"
                                                >
                                                    +<ShoppingCart class="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="p-8 text-center text-sm text-muted-foreground">
                                        <Heart class="h-12 w-12 mx-auto mb-2 opacity-20" />
                                        <p>Wishlist masih kosong</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator v-if="wishlistItems.length > 0" />
                                <div v-if="wishlistItems.length > 0" class="p-2">
                                    <Link href="/wishlist">
                                        <Button class="w-full" variant="outline">
                                            Lihat Semua Wishlist
                                        </Button>
                                    </Link>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <!-- Cart Dropdown -->
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" size="icon" class="relative rounded-full" aria-label="Cart">
                                    <ShoppingCart class="h-5 w-5" />
                                    <Badge
                                        v-if="cartItemCount > 0"
                                        class="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                                    >
                                        {{ cartItemCount }}
                                    </Badge>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-96">
                                <DropdownMenuLabel class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <Checkbox
                                            v-if="cartItems.length > 0"
                                            :model-value="isAllSelected"
                                            @update:model-value="(checked) => toggleSelectAll(checked === true)"
                                        />
                                        <span>Keranjang Belanja</span>
                                    </div>
                                    <Badge variant="secondary">{{ cartItemCount }} item</Badge>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div class="max-h-96 overflow-y-auto">
                                    <div v-if="cartItems.length > 0" class="space-y-1">
                                        <div
                                            v-for="item in cartItems"
                                            :key="item.id"
                                            class="group p-3 hover:bg-accent rounded-md transition-colors"
                                        >
                                            <div class="flex items-center gap-3">
                                                <Checkbox
                                                    :model-value="selectedCartItems.includes(item.id)"
                                                    @update:model-value="(checked) => toggleCartItemSelection(item.id, checked === true)"
                                                    @click.stop
                                                />
                                                <Link :href="`/produk/${item.slug}`" class="flex-shrink-0">
                                                    <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded" />
                                                </Link>
                                                <div class="flex-1 min-w-0">
                                                    <Link :href="`/produk/${item.slug}`" class="text-sm font-medium line-clamp-2 hover:underline block">
                                                        {{ item.name }}
                                                    </Link>
                                                    <p class="text-sm font-bold text-primary mt-1">{{ formatCurrency(item.price) }}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    @click.stop="removeFromCart(item.id)"
                                                    aria-label="Remove from cart"
                                                >
                                                    <Trash2 class="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                            <div class="flex items-center justify-between mt-2">
                                                <span class="text-xs text-muted-foreground">Jumlah:</span>
                                                <div class="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        class="h-7 w-7"
                                                        @click.stop="updateCartQuantity(item.id, item.quantity - 1)"
                                                        :disabled="item.quantity <= 1"
                                                    >
                                                        <Minus class="h-3 w-3" />
                                                    </Button>
                                                    <span class="text-sm font-medium w-8 text-center">{{ item.quantity }}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        class="h-7 w-7"
                                                        @click.stop="updateCartQuantity(item.id, item.quantity + 1)"
                                                    >
                                                        <Plus class="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="p-8 text-center text-sm text-muted-foreground">
                                        <ShoppingCart class="h-12 w-12 mx-auto mb-2 opacity-20" />
                                        <p>Keranjang masih kosong</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator v-if="cartItems.length > 0" />
                                <div v-if="cartItems.length > 0" class="p-3 space-y-3">
                                    <div class="space-y-2">
                                        <div class="flex items-center justify-between text-sm">
                                            <span class="text-muted-foreground">Total ({{ cartItemCount }} item):</span>
                                            <span class="text-sm">{{ formatCurrency(cartTotal) }}</span>
                                        </div>
                                        <div v-if="selectedItemsCount > 0" class="flex items-center justify-between text-sm">
                                            <span class="font-medium">Dipilih ({{ selectedItemsCount }} item):</span>
                                            <span class="font-bold text-lg">{{ formatCurrency(selectedItemsTotal) }}</span>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 gap-2">
                                        <Link href="/cart">
                                            <Button class="w-full" variant="outline" size="sm">
                                                Lihat Keranjang
                                            </Button>
                                        </Link>
                                        <Button
                                            class="w-full"
                                            size="sm"
                                            :disabled="selectedItemsCount === 0"
                                            @click.stop="handleCheckout"
                                        >
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <!-- User Account Dropdown -->
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" size="icon" class="rounded-full" aria-label="Account">
                                    <User class="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56">
                                <DropdownMenuLabel v-if="isAuthenticated">
                                    <div class="flex flex-col space-y-1">
                                        <p class="text-sm font-medium">{{ page.props.auth?.user?.name || 'User' }}</p>
                                        <p class="text-xs text-muted-foreground">{{ page.props.auth?.user?.email }}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuLabel v-else>Akun Saya</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <template v-if="isAuthenticated">
                                    <Link href="/client/profile">
                                        <DropdownMenuItem>
                                            <UserCircle class="mr-2 h-4 w-4" />
                                            <span>Profil</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/client/profile?tab=orders">
                                        <DropdownMenuItem>
                                            <Package class="mr-2 h-4 w-4" />
                                            <span>Pesanan Saya</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/client/profile?tab=wallet">
                                        <DropdownMenuItem>
                                            <Package class="mr-2 h-4 w-4" />
                                            <span>Dompet Saya</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/client/profile?tab=security">
                                        <DropdownMenuItem>
                                            <Shield class="mr-2 h-4 w-4" />
                                            <span>Keamanan</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/client/profile?tab=danger">
                                        <DropdownMenuItem>
                                            <Info class="mr-2 h-4 w-4" />
                                            <span>Hapus Akun</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <Link href="/client/logout" method="post" as="button">
                                        <DropdownMenuItem>
                                            <LogOut class="mr-2 h-4 w-4" />
                                            <span>Keluar</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </template>
                                <template v-else>
                                    <Link href="/client/login">
                                        <DropdownMenuItem>
                                            <User class="mr-2 h-4 w-4" />
                                            <span>Masuk</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href="/client/register">
                                        <DropdownMenuItem>
                                            <UserCircle class="mr-2 h-4 w-4" />
                                            <span>Daftar</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </template>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <!-- Mobile Menu Button -->
                        <Sheet v-model:open="mobileMenuOpen">
                            <SheetTrigger as-child>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    class="lg:hidden rounded-full"
                                    aria-label="Menu"
                                >
                                    <Menu class="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" class="w-full sm:w-96 p-0">
                                <SheetHeader class="px-6 py-4 border-b">
                                    <SheetTitle class="text-xl font-bold flex items-center gap-2">
                                        <img v-if="siteLogo" :src="siteLogo" :alt="siteName" class="h-6 w-6 object-contain" />
                                        <Package v-else class="h-6 w-6" />
                                        {{ siteName }}
                                    </SheetTitle>
                                </SheetHeader>
                                <div class="p-6 overflow-y-auto">
                                    <nav class="space-y-6">
                                        <div v-for="category in productCategories" :key="category.name">
                                            <div class="flex items-center gap-2 mb-3">
                                                <component :is="category.icon" class="h-5 w-5" />
                                                <h3 class="font-bold text-base">{{ category.name }}</h3>
                                            </div>
                                            <Separator class="my-3" />
                                            <ul v-if="category.items.length > 0" class="space-y-2 ml-7">
                                                <li v-for="item in category.items" :key="item.name">
                                                    <Link
                                                        :href="item.href"
                                                        class="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors block py-1"
                                                        @click="mobileMenuOpen = false"
                                                    >
                                                        {{ item.name }}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            <!-- Secondary Navigation Bar (Desktop) -->
            <div class="hidden lg:block border-t dark:border-gray-800">
                <div class="container mx-auto px-6">
                    <div class="flex items-center h-12 gap-6">
                        <!-- Beranda -->
                        <Link href="/" class="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent">
                            Beranda
                        </Link>

                        <!-- Mega Menu Kategori -->
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" class="text-sm font-medium h-auto px-3 py-2">
                                    Semua Kategori
                                    <svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" class="w-[800px] p-6">
                                <div class="grid grid-cols-4 gap-6">
                                    <div v-for="category in productCategories" :key="category.name" class="space-y-3">
                                        <Link :href="`/toko?category=${category.slug}`" class="group">
                                            <div class="flex items-center gap-2 mb-3 font-semibold text-sm hover:text-primary transition-colors">
                                                <component :is="category.icon" class="h-4 w-4 text-primary" />
                                                <span>{{ category.name }}</span>
                                            </div>
                                        </Link>
                                        <div class="space-y-1.5">
                                            <Link
                                                v-for="item in category.items.slice(0, 5)"
                                                :key="item.name"
                                                :href="item.href"
                                                class="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 hover:underline"
                                            >
                                                {{ item.name }}
                                            </Link>
                                            <Link
                                                v-if="category.items.length > 5"
                                                :href="`/toko?category=${category.slug}`"
                                                class="block text-xs text-primary font-medium py-1 hover:underline"
                                            >
                                                Lihat Semua →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <!-- Individual Categories -->
                        <Link
                            v-for="category in productCategories.slice(0, 5)"
                            :key="category.name"
                            :href="`/toko?category=${category.slug}`"
                            class="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent flex items-center gap-1.5"
                        >
                            <component :is="category.icon" class="h-4 w-4" />
                            {{ category.name }}
                        </Link>

                        <!-- Spacer -->
                        <div class="flex-1"></div>

                        <!-- Artikel Badge -->
                        <Link href="/artikel" class="flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary hover:underline">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            Artikel & Blog
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Search Overlay - Samsung Style -->
            <transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
            >
                <div v-if="searchOpen" class="border-t dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg">
                    <div class="container mx-auto px-6 py-6">
                        <div class="w-full mx-auto">
                            <div class="relative">
                                <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    v-model="searchQuery"
                                    placeholder="Cari produk, model, atau kata kunci..."
                                    class="w-full h-12 pl-12 pr-12 text-base"
                                    @keydown.escape="searchOpen = false"
                                    @keydown.enter="handleSearch"
                                    autofocus
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    @click="searchOpen = false"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                                >
                                    ✕
                                </Button>
                            </div>
                            <div class="mt-4">
                                <Separator class="my-4" />
                                <p class="text-sm font-medium mb-3">
                                    {{ searchQuery.trim() ? 'Saran Pencarian:' : 'Pencarian Populer:' }}
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    <Link
                                        v-for="suggestion in searchSuggestions"
                                        :key="suggestion.query"
                                        :href="`/toko?search=${encodeURIComponent(suggestion.query)}`"
                                    >
                                        <Badge variant="secondary" class="cursor-pointer hover:bg-accent">
                                            {{ suggestion.label }}
                                        </Badge>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </header>

        <!-- Main Content -->
        <main>
            <slot />
        </main>

        <!-- Modern Ecommerce Footer -->
        <footer class="bg-gradient-to-b from-background to-muted/20 border-t">
            <div class="container mx-auto px-6">
                <!-- Newsletter Section -->
                <div class="py-12 border-b">
                    <div class="max-w-3xl mx-auto text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                            <svg class="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 class="text-2xl md:text-3xl font-bold mb-3">Dapatkan Penawaran Eksklusif</h3>
                        <p class="text-muted-foreground mb-6 text-sm md:text-base">
                            Berlangganan newsletter kami dan dapatkan diskon hingga 20% untuk pembelian pertama Anda
                        </p>

                        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <div class="flex-1 relative">
                                <Input
                                    v-model="newsletterEmail"
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    class="h-12 pr-4"
                                    :disabled="newsletterSubmitting"
                                    @keydown.enter="subscribeNewsletter"
                                />
                            </div>
                            <Button
                                @click="subscribeNewsletter"
                                class="h-12 px-8 font-semibold"
                                :disabled="newsletterSubmitting || !newsletterEmail"
                            >
                                <span v-if="!newsletterSubmitting && !newsletterSuccess">Berlangganan</span>
                                <span v-else-if="newsletterSubmitting" class="flex items-center gap-2">
                                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </span>
                                <span v-else class="flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Berhasil!
                                </span>
                            </Button>
                        </div>

                        <p class="text-xs text-muted-foreground mt-4">
                            Dengan berlangganan, Anda menyetujui <Link href="/page/privacy" class="underline hover:text-foreground">Kebijakan Privasi</Link> kami
                        </p>
                    </div>
                </div>

                <!-- Main Footer Content -->
                <div class="py-12">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <!-- Brand Section -->
                        <div class="lg:col-span-4">
                            <Link href="/" class="flex items-center gap-2 mb-4">
                                <img v-if="siteLogo" :src="siteLogo" :alt="siteName" class="h-15 w-15 object-contain" />
                                <Package v-else class="h-8 w-8 text-primary" />
                                <span class="text-2xl font-bold">{{ siteName }}</span>
                            </Link>
                            <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
                                {{ siteDescription }}
                            </p>

                            <!-- Social Links -->
                            <div class="flex items-center gap-3">
                                <span class="text-sm font-semibold">Ikuti Kami:</span>
                                <div class="flex gap-2">
                                    <Button
                                        v-for="social in socialLinks"
                                        :key="social.icon"
                                        variant="outline"
                                        size="icon"
                                        as-child
                                        class="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                                    >
                                        <a :href="social.href" :aria-label="social.name" target="_blank" rel="noopener noreferrer">
                                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path :d="socialIconPaths[social.icon]" />
                                            </svg>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <!-- Footer Links Grid -->
                        <div class="lg:col-span-8">
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                <div v-for="menu in footerMenus.slice(0, 4)" :key="menu.title">
                                    <h4 class="font-bold text-sm mb-4 text-foreground">{{ menu.title }}</h4>
                                    <ul class="space-y-3 text-sm">
                                        <li v-for="link in menu.links" :key="link.href">
                                            <Link :href="link.href" class="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                                                <span>{{ link.name }}</span>
                                                <svg class="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Footer Bar -->
                <div class="border-t py-6">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div class="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
                            <p>© {{ new Date().getFullYear() }} Puranusa. All rights reserved.</p>
                            <div class="flex items-center gap-4">
                                <Link href="/page/privacy" class="hover:text-foreground transition-colors">Privasi</Link>
                                <span class="text-muted-foreground/50">•</span>
                                <Link href="/page/terms" class="hover:text-foreground transition-colors">Syarat & Ketentuan</Link>
                                <span class="text-muted-foreground/50">•</span>
                                <Link href="/page/about" class="hover:text-foreground transition-colors">Tentang Kami</Link>
                            </div>
                        </div>

                        <!-- Payment Methods -->
                        <div class="flex items-center gap-3">
                            <span class="text-xs text-muted-foreground">Metode Pembayaran:</span>
                            <div class="flex items-center gap-2">
                                <div
                                    v-for="method in paymentMethods"
                                    :key="method"
                                    class="px-3 py-1.5 bg-background border rounded text-xs font-medium"
                                >
                                    {{ method }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Checkout Sheet -->
        <CheckoutSheet
            v-if="checkoutItems.length > 0"
            v-model:open="checkoutSheetOpen"
            :item="checkoutItems[0]"
        />
    </div>
</template>
