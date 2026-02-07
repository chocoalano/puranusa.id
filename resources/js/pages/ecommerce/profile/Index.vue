<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { AlertCircle, Lock, Package, User, Wallet, Network, GitBranch, Gift, Sparkles, Trophy } from 'lucide-vue-next';
import { computed } from 'vue';
import type { Customer, Order, WalletTransaction } from '@/types/profile';
import ProfileCard from '@/components/profile/ProfileCard.vue';
import AddressManagement from '@/components/profile/AddressManagement.vue';
import BonusStatsCard from '@/components/profile/BonusStatsCard.vue';
import MemberSinceCard from '@/components/profile/MemberSinceCard.vue';
import ProfileInformationTab from '@/components/profile/ProfileInformationTab.vue';
import OrdersTab from '@/components/profile/OrdersTab.vue';
import WalletTab from '@/components/profile/WalletTab.vue';
import SecurityTab from '@/components/profile/SecurityTab.vue';
import DangerZoneTab from '@/components/profile/DangerZoneTab.vue';
import NetworkMembersTab from '@/components/profile/NetworkMembersTab.vue';
import BinaryTreeTab from '@/components/profile/BinaryTreeTab.vue';
import BonusTab from '@/components/profile/BonusTab.vue';
import NetworkStatsCard from '@/components/profile/NetworkStatsCard.vue';
import PromotionsRewardsTab from '@/components/profile/PromotionsRewardsTab.vue';
import LifetimeCashRewardsTab from '@/components/profile/LifetimeCashRewardsTab.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NetworkMember {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string | null;
    position: string | null;
    level: number | null;
    has_placement: boolean;
    has_purchase: boolean;
    omzet: number;
    status: number;
    status_label: string;
    joined_at: string;
}

interface TreeNode {
    id: number;
    member_id: number;
    name: string;
    username: string;
    position: string | null;
    level: number;
    status: boolean;
    left: TreeNode | null;
    right: TreeNode | null;
}

interface BonusSponsor {
    id: number;
    from_member_id: number;
    amount: number;
    status: number;
    description: string | null;
    created_at: string;
    from_member?: {
        name: string;
        email: string;
    };
}

interface BonusMatching {
    id: number;
    from_member_id: number;
    level: number;
    amount: number;
    status: number;
    description: string | null;
    created_at: string;
    from_member?: {
        name: string;
        email: string;
    };
}

interface BonusPairing {
    id: number;
    pair: number;
    amount: number;
    status: number;
    description: string | null;
    created_at: string;
}

interface BonusRetail {
    id: number;
    from_member_id: number;
    amount: number;
    index_value: number;
    status: number;
    description: string | null;
    created_at: string;
    from_member?: {
        name: string;
        email: string;
    };
}

interface BonusLifetimeCashReward {
    id: number;
    reward_name: string;
    reward: number;
    amount: number;
    bv: number;
    status: number;
    description: string | null;
    created_at: string;
}

interface Address {
    id: number;
    customer_id: number;
    label: string | null;
    is_default: boolean;
    recipient_name: string;
    recipient_phone: string;
    address_line1: string;
    address_line2: string | null;
    province_label: string;
    province_id: number;
    city_label: string;
    city_id: number;
    postal_code: string | null;
    country: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface PromotionReward {
    id: number;
    name: string;
    reward: string;
    bv: number;
    start: string;
    end: string;
    claim_status: number | null;
    accumulated_left: number;
    accumulated_right: number;
}

interface ClaimedReward {
    id: number;
    reward: string;
    bv: number;
    created_at: string;
}

interface LifetimeReward {
    id: number;
    name: string;
    reward: string;
    bv: number;
    can_claim: boolean;
    is_claimed: boolean;
    accumulated_left: number;
    accumulated_right: number;
}

interface ZennerClubChild {
    id: number;
    name: string;
    slug: string;
    contents: ZennerClubContent[];
}

interface ZennerClubCategory {
    id: number;
    name: string;
    slug: string;
    contents: ZennerClubContent[];
    children: ZennerClubChild[];
}

interface ZennerClubContent {
    id: number;
    title: string;
    slug: string;
    file: string | null;
    vlink: string | null;
}

const props = defineProps<{
    customer: Customer;
    orders: Order[];
    walletTransactions: WalletTransaction[];
    hasPendingWithdrawal?: boolean;
    isProfileIncomplete?: boolean;
    activeMembers: NetworkMember[];
    passiveMembers: NetworkMember[];
    prospectMembers: NetworkMember[];
    binaryTree: TreeNode | null;
    totalDownlines: number;
    totalLeft: number;
    totalRight: number;
    bonusSponsors: BonusSponsor[];
    bonusMatchings: BonusMatching[];
    bonusPairings: BonusPairing[];
    bonusCashbacks: any[];
    bonusRewards: any[];
    bonusRetails: BonusRetail[];
    bonusLifetimeCashRewards: BonusLifetimeCashReward[];
    addresses: Address[];
    promotionRewards: PromotionReward[];
    claimedPromotionRewards: ClaimedReward[];
    lifetimeRewards: LifetimeReward[];
    claimedLifetimeRewards: ClaimedReward[];
    zennerClubCategories: ZennerClubCategory[];
}>();

const page = usePage();

// Check if member is active in MLM network (status 3 = active member)
const isActiveMember = computed(() => {
    return Number(props.customer.status) === 3;
});

// Get active tab from URL query parameter (SSR-safe)
const activeTab = computed(() => {
    // Check if we're running in the browser
    if (typeof window === 'undefined') {
        return 'profile';
    }

    const url = page.url;
    try {
        const urlObj = new URL(url, window.location.origin);
        return urlObj.searchParams.get('tab') || 'profile';
    } catch {
        return 'profile';
    }
});

const highlightNames = new Set([
    'start here',
    'marketing kit',
    'zenner academy',
    'leaderboard',
    'rules & faq',
]);

const normalizeName = (name: string) => name.toLowerCase().replace(/\s+/g, ' ').trim();

const zennerClubHighlights = computed(() => {
    const categories = props.zennerClubCategories ?? [];
    if (!categories.length) return [];

    const filtered = categories.filter((category) => highlightNames.has(normalizeName(category.name)));
    const selected = filtered.length ? filtered : categories;

    return selected.map((category) => ({
        id: category.id,
        title: category.name,
        slug: category.slug,
        contents: category.contents ?? [],
        children: category.children ?? [],
        stats: {
            contents: category.contents?.length ?? 0,
            children: category.children?.length ?? 0,
            childContents: (category.children ?? []).reduce((sum, child) => sum + (child.contents?.length ?? 0), 0),
        },
    }));
});

const getZennerContentLink = (content: ZennerClubContent) => {
    return `/client/zenner-club/contents/${content.id}`;
};
</script>

<template>
    <EcommerceLayout>
        <Head title="Profile Saya" />

        <!-- Hero Section -->
        <div class="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
            <div class="container mx-auto px-3 py-6 sm:px-4 sm:py-12 max-w-7xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">Profile Saya</h1>
                        <p class="text-sm sm:text-base md:text-lg text-muted-foreground">
                            Kelola informasi profil dan keamanan akun Anda
                        </p>
                    </div>
                    <div class="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border shadow-sm">
                        <User class="w-5 h-5 text-primary" />
                        <span class="font-semibold">{{ customer.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-3 py-4 sm:px-4 sm:py-8 max-w-7xl">
            <!-- Profile Incomplete Warning Banner -->
            <div v-if="isProfileIncomplete && isActiveMember" class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                <div class="flex items-start gap-3">
                    <AlertCircle class="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div class="flex-1">
                        <p class="font-medium text-amber-700 dark:text-amber-300">Lengkapi Data Profil Anda</p>
                        <p class="text-sm text-amber-600 dark:text-amber-400 mt-1">
                            Untuk dapat melakukan penarikan bonus, Anda harus melengkapi NIK dan informasi rekening bank di tab Profil.
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid gap-4 sm:gap-6 lg:grid-cols-3">
                <!-- Left Sidebar - Profile Summary -->
                <div class="lg:col-span-1 space-y-4 sm:space-y-6">
                    <ProfileCard :customer="customer" />
                    <NetworkStatsCard v-if="isActiveMember" :customer="customer" />
                    <AddressManagement :addresses="addresses" />
                    <BonusStatsCard v-if="isActiveMember" :customer="customer" />
                    <MemberSinceCard :created-at="customer.created_at" />
                </div>
                <!-- Right Content - Tabs -->
                <div class="lg:col-span-2">
                    <div class="rounded-xl border bg-card overflow-hidden">
                        <Tabs :default-value="activeTab" class="w-full">
                            <div class="border-b bg-muted/30">
                                <div class="overflow-x-auto text-center overflow-y-hidden px-1.5 py-1.5 sm:px-2 sm:py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    <TabsList class="inline-flex h-auto w-max bg-transparent gap-1 sm:gap-1.5 p-0">
                                        <TabsTrigger
                                            value="profile"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <User class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Info</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="orders"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Package class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Order</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            v-if="isActiveMember"
                                            value="network"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Network class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Mitra</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            v-if="isActiveMember"
                                            value="binary"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <GitBranch class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Network</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            v-if="isActiveMember"
                                            value="bonus"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Gift class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Bonus</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            v-if="isActiveMember"
                                            value="promotions"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Sparkles class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Promo</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            v-if="isActiveMember"
                                            value="lifetime"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Trophy class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Lifetime</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            v-if="isActiveMember"
                                            value="zenner-club"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Trophy class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Zenner</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="wallet"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Wallet class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Wallet</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="security"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <Lock class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Lock</span>
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="danger"
                                            class="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 py-1 px-1.5 sm:py-1.5 sm:px-2 w-[38px] sm:w-[55px] md:w-[70px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
                                        >
                                            <AlertCircle class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                            <span class="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-center leading-tight">Del</span>
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </div>
                            <div class="p-3 sm:p-4 md:p-6">
                                <TabsContent value="profile" class="mt-0">
                                    <ProfileInformationTab :customer="customer" />
                                </TabsContent>

                                <TabsContent value="orders" class="mt-0">
                                    <OrdersTab :orders="orders" />
                                </TabsContent>

                                <TabsContent v-if="isActiveMember" value="network" class="mt-0">
                                    <NetworkMembersTab
                                        :active-members="activeMembers"
                                        :passive-members="passiveMembers"
                                        :prospect-members="prospectMembers"
                                        :has-left="!!binaryTree?.left"
                                        :has-right="!!binaryTree?.right"
                                    />
                                </TabsContent>

                                <TabsContent v-if="isActiveMember" value="binary" class="mt-0">
                                    <BinaryTreeTab
                                        v-if="binaryTree"
                                        :binary-tree="binaryTree"
                                        :total-downlines="totalDownlines"
                                        :total-left="totalLeft"
                                        :total-right="totalRight"
                                        :passive-members="passiveMembers"
                                    />
                                    <div v-else class="text-center py-12">
                                        <GitBranch class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 class="text-lg font-semibold mb-2">Belum Ada Jaringan Binary</h3>
                                        <p class="text-muted-foreground">
                                            Anda belum memiliki posisi dalam jaringan binary tree MLM.
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent v-if="isActiveMember" value="bonus" class="mt-0">
                                    <BonusTab
                                        :bonus-sponsors="bonusSponsors"
                                        :bonus-matchings="bonusMatchings"
                                        :bonus-pairings="bonusPairings"
                                        :bonus-cashbacks="bonusCashbacks"
                                        :bonus-rewards="bonusRewards"
                                        :bonus-retails="bonusRetails"
                                        :bonus-lifetime-cash-rewards="bonusLifetimeCashRewards"
                                    />
                                </TabsContent>

                                <TabsContent v-if="isActiveMember" value="promotions" class="mt-0">
                                    <PromotionsRewardsTab
                                        :promotion-rewards="promotionRewards"
                                        :claimed-promotion-rewards="claimedPromotionRewards"
                                    />
                                </TabsContent>

                                <TabsContent v-if="isActiveMember" value="lifetime" class="mt-0">
                                    <LifetimeCashRewardsTab
                                        :lifetime-rewards="lifetimeRewards"
                                        :claimed-lifetime-rewards="claimedLifetimeRewards"
                                    />
                                </TabsContent>

                                <TabsContent v-if="isActiveMember" value="zenner-club" class="mt-0">
                                    <div class="space-y-5">
                                        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                            <div>
                                                <h3 class="text-lg font-semibold">Zenner Club</h3>
                                                <p class="text-sm text-muted-foreground">
                                                    Ringkasan materi penting untuk mendukung perjalanan Anda di Zenner Club.
                                                </p>
                                            </div>
                                        </div>

                                        <div v-if="!zennerClubHighlights.length" class="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                                            Belum ada konten Zenner Club yang bisa ditampilkan.
                                        </div>

                                        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            <Card v-for="item in zennerClubHighlights" :key="item.id" class="flex h-full flex-col">
                                                <CardHeader class="space-y-2">
                                                    <div class="flex items-start justify-between gap-3">
                                                        <CardTitle class="text-base leading-tight">{{ item.title }}</CardTitle>
                                                        <span class="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                                            {{ item.stats.contents + item.stats.childContents }} konten
                                                        </span>
                                                    </div>
                                                    <div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                                        <span>{{ item.stats.contents }} konten utama</span>
                                                        <span class="text-muted-foreground/60">•</span>
                                                        <span>{{ item.stats.children }} subkategori</span>
                                                        <span class="text-muted-foreground/60">•</span>
                                                        <span>{{ item.stats.childContents }} konten sub</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent class="flex flex-1 flex-col gap-4">
                                                    <div v-if="item.contents.length" class="space-y-2">
                                                        <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Konten Utama</p>
                                                        <ul class="space-y-1 text-sm text-foreground">
                                                            <li v-for="content in item.contents" :key="content.id">
                                                                <a :href="getZennerContentLink(content)" class="text-primary hover:underline">
                                                                    {{ content.title }}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div v-if="item.children.length" class="space-y-2">
                                                        <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sub Kategori</p>
                                                        <div class="space-y-2">
                                                            <div v-for="child in item.children" :key="child.id" class="rounded-md border bg-muted/20 p-3">
                                                                <div class="flex items-center justify-between gap-2">
                                                                    <p class="text-sm font-semibold text-foreground">{{ child.name }}</p>
                                                                    <span class="text-[11px] text-muted-foreground">
                                                                        {{ child.contents.length }} konten
                                                                    </span>
                                                                </div>
                                                                <ul v-if="child.contents.length" class="mt-2 space-y-1 text-sm text-foreground">
                                                                    <li v-for="content in child.contents" :key="content.id">
                                                                        <a :href="getZennerContentLink(content)" class="text-primary hover:underline">
                                                                            {{ content.title }}
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                                <p v-else class="mt-2 text-xs text-muted-foreground">Belum ada konten.</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p v-if="!item.contents.length && !item.children.length" class="text-sm text-muted-foreground">
                                                        Konten lengkap tersedia di menu Zenner Club.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="wallet" class="mt-0">
                                    <WalletTab
                                        :customer="customer"
                                        :transactions="walletTransactions"
                                        :has-pending-withdrawal="hasPendingWithdrawal"
                                    />
                                </TabsContent>

                                <TabsContent value="security" class="mt-0">
                                    <SecurityTab />
                                </TabsContent>

                                <TabsContent value="danger" class="mt-0">
                                    <DangerZoneTab />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </EcommerceLayout>
</template>
