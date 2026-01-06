<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Gift, Handshake, Percent, Trophy, Users, ShoppingCart, Star } from 'lucide-vue-next';
import { computed } from 'vue';
import { formatCurrency, safeNumber } from '@/utils/currency';

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

interface BonusCashback {
    id: number;
    order_id: number | null;
    amount: number;
    status: number;
    description: string | null;
    created_at: string;
}

interface BonusReward {
    id: number;
    reward_type: string | null;
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

interface Props {
    bonusSponsors: BonusSponsor[];
    bonusMatchings: BonusMatching[];
    bonusPairings: BonusPairing[];
    bonusCashbacks: BonusCashback[];
    bonusRewards: BonusReward[];
    bonusRetails: BonusRetail[];
    bonusLifetimeCashRewards: BonusLifetimeCashReward[];
}

const props = defineProps<Props>();

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

// Calculate totals
const totalSponsor = computed(() =>
    props.bonusSponsors.reduce((sum, bonus) => sum + safeNumber(bonus.amount), 0)
);

const totalMatching = computed(() =>
    props.bonusMatchings.reduce((sum, bonus) => sum + safeNumber(bonus.amount), 0)
);

const totalPairing = computed(() =>
    props.bonusPairings.reduce((sum, bonus) => sum + safeNumber(bonus.amount), 0)
);

const totalCashback = computed(() =>
    props.bonusCashbacks.reduce((sum, bonus) => sum + safeNumber(bonus.amount), 0)
);

const totalReward = computed(() =>
    props.bonusRewards.reduce((sum, bonus) => sum + safeNumber(bonus.amount), 0)
);

// Pending and released totals
const pendingSponsor = computed(() =>
    props.bonusSponsors.filter(b => b.status === 0).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const releasedSponsor = computed(() =>
    props.bonusSponsors.filter(b => b.status === 1).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const pendingMatching = computed(() =>
    props.bonusMatchings.filter(b => b.status === 0).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const releasedMatching = computed(() =>
    props.bonusMatchings.filter(b => b.status === 1).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const pendingPairing = computed(() =>
    props.bonusPairings.filter(b => b.status === 0).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const releasedPairing = computed(() =>
    props.bonusPairings.filter(b => b.status === 1).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const pendingCashback = computed(() =>
    props.bonusCashbacks.filter(b => b.status === 0).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const releasedCashback = computed(() =>
    props.bonusCashbacks.filter(b => b.status === 1).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const pendingReward = computed(() =>
    props.bonusRewards.filter(b => b.status === 0).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const releasedReward = computed(() =>
    props.bonusRewards.filter(b => b.status === 1).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

// Retail Commission totals
const totalRetail = computed(() =>
    props.bonusRetails.reduce((sum, bonus) => sum + safeNumber(bonus.amount), 0)
);

const pendingRetail = computed(() =>
    props.bonusRetails.filter(b => b.status === 0).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const releasedRetail = computed(() =>
    props.bonusRetails.filter(b => b.status === 1).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

// Lifetime Cash Rewards totals
const totalLifetimeCashReward = computed(() =>
    props.bonusLifetimeCashRewards.reduce((sum, bonus) => sum + safeNumber(bonus.amount), 0)
);

const pendingLifetimeCashReward = computed(() =>
    props.bonusLifetimeCashRewards.filter(b => b.status === 0).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const releasedLifetimeCashReward = computed(() =>
    props.bonusLifetimeCashRewards.filter(b => b.status === 1).reduce((sum, b) => sum + safeNumber(b.amount), 0)
);

const grandTotal = computed(() =>
    totalSponsor.value + totalMatching.value + totalPairing.value + totalCashback.value + totalReward.value + totalRetail.value + totalLifetimeCashReward.value
);
</script>

<template>
    <div class="space-y-4 sm:space-y-6">
        <!-- Summary Cards -->
        <div class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <Users class="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                        <span class="truncate">Referral Incentive</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold truncate">{{ formatCurrency(totalSponsor) }}</div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        {{ bonusSponsors.length }} transaksi
                    </p>
                    <div class="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:gap-2 mt-2">
                        <Badge variant="outline" class="text-[10px] sm:text-xs justify-center truncate">
                            P: {{ formatCurrency(pendingSponsor) }}
                        </Badge>
                        <Badge variant="secondary" class="text-[10px] sm:text-xs justify-center truncate">
                            R: {{ formatCurrency(releasedSponsor) }}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <Handshake class="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        <span class="truncate">Team Affiliate Commission</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold truncate">{{ formatCurrency(totalMatching) }}</div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        {{ bonusMatchings.length }} transaksi
                    </p>
                    <div class="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:gap-2 mt-2">
                        <Badge variant="outline" class="text-[10px] sm:text-xs justify-center truncate">
                            P: {{ formatCurrency(pendingMatching) }}
                        </Badge>
                        <Badge variant="secondary" class="text-[10px] sm:text-xs justify-center truncate">
                            R: {{ formatCurrency(releasedMatching) }}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <DollarSign class="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" />
                        <span class="truncate">Partner Team Commission</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold truncate">{{ formatCurrency(totalPairing) }}</div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        {{ bonusPairings.length }} transaksi
                    </p>
                    <div class="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:gap-2 mt-2">
                        <Badge variant="outline" class="text-[10px] sm:text-xs justify-center truncate">
                            P: {{ formatCurrency(pendingPairing) }}
                        </Badge>
                        <Badge variant="secondary" class="text-[10px] sm:text-xs justify-center truncate">
                            R: {{ formatCurrency(releasedPairing) }}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <Percent class="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" />
                        <span class="truncate">Cashback Commission</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold truncate">{{ formatCurrency(totalCashback) }}</div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        {{ bonusCashbacks.length }} transaksi
                    </p>
                    <div class="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:gap-2 mt-2">
                        <Badge variant="outline" class="text-[10px] sm:text-xs justify-center truncate">
                            P: {{ formatCurrency(pendingCashback) }}
                        </Badge>
                        <Badge variant="secondary" class="text-[10px] sm:text-xs justify-center truncate">
                            R: {{ formatCurrency(releasedCashback) }}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <Trophy class="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                        <span class="truncate">Promotions Rewards</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold truncate">{{ formatCurrency(totalReward) }}</div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        {{ bonusRewards.length }} transaksi
                    </p>
                    <div class="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:gap-2 mt-2">
                        <Badge variant="outline" class="text-[10px] sm:text-xs justify-center truncate">
                            P: {{ formatCurrency(pendingReward) }}
                        </Badge>
                        <Badge variant="secondary" class="text-[10px] sm:text-xs justify-center truncate">
                            R: {{ formatCurrency(releasedReward) }}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <ShoppingCart class="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 flex-shrink-0" />
                        <span class="truncate">Retail Commission</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold truncate">{{ formatCurrency(totalRetail) }}</div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        {{ bonusRetails.length }} transaksi
                    </p>
                    <div class="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:gap-2 mt-2">
                        <Badge variant="outline" class="text-[10px] sm:text-xs justify-center truncate">
                            P: {{ formatCurrency(pendingRetail) }}
                        </Badge>
                        <Badge variant="secondary" class="text-[10px] sm:text-xs justify-center truncate">
                            R: {{ formatCurrency(releasedRetail) }}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <Star class="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                        <span class="truncate">Lifetime Cash Rewards</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold truncate">{{ formatCurrency(totalLifetimeCashReward) }}</div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        {{ bonusLifetimeCashRewards.length }} transaksi
                    </p>
                    <div class="grid grid-cols-2 gap-1 sm:flex sm:flex-row sm:gap-2 mt-2">
                        <Badge variant="outline" class="text-[10px] sm:text-xs justify-center truncate">
                            P: {{ formatCurrency(pendingLifetimeCashReward) }}
                        </Badge>
                        <Badge variant="secondary" class="text-[10px] sm:text-xs justify-center truncate">
                            R: {{ formatCurrency(releasedLifetimeCashReward) }}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="pb-2 sm:pb-3">
                    <CardTitle class="text-xs sm:text-sm font-medium flex items-center gap-2">
                        <Gift class="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                        <span class="truncate">Total Bonus</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="text-xl sm:text-2xl font-bold text-primary truncate">
                        {{ formatCurrency(grandTotal) }}
                    </div>
                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                        Semua jenis bonus
                    </p>
                </CardContent>
            </Card>
        </div>

        <!-- Detailed Bonus Tabs -->
        <Card>
            <CardHeader class="p-2 sm:p-4 md:p-6 pb-2">
                <CardTitle class="text-xs sm:text-base md:text-lg">Riwayat Bonus</CardTitle>
                <CardDescription class="text-[9px] sm:text-xs md:text-sm">
                    Detail transaksi bonus
                </CardDescription>
            </CardHeader>
            <CardContent class="p-2 sm:p-4 md:p-6 pt-0">
                <Tabs default-value="sponsor" class="w-full">
                    <!-- HEADER TABS: scroll-x di mobile, grid 5 kolom di sm+ -->
                    <div
                        class="w-full text-center
                         overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-2 px-2 sm:mx-0 sm:px-0"
                        style="-webkit-overflow-scrolling: touch;"
                    >
                        <TabsList
                            class="flex w-max sm:grid sm:w-full sm:grid-cols-7 gap-0.5 sm:gap-1 h-7 sm:h-auto bg-muted/30"
                        >
                            <TabsTrigger
                                value="sponsor"
                                class="text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            >
                                Referral
                            </TabsTrigger>
                            <TabsTrigger
                                value="matching"
                                class="text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            >
                                Team Aff.
                            </TabsTrigger>
                            <TabsTrigger
                                value="pairing"
                                class="text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            >
                                Partner
                            </TabsTrigger>
                            <TabsTrigger
                                value="cashback"
                                class="text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            >
                                Cashback
                            </TabsTrigger>
                            <TabsTrigger
                                value="reward"
                                class="text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            >
                                Rewards
                            </TabsTrigger>
                            <TabsTrigger
                                value="retail"
                                class="text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            >
                                Retail
                            </TabsTrigger>
                            <TabsTrigger
                                value="lifetime"
                                class="text-[12px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 h-6 sm:h-auto"
                            >
                                Lifetime
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <!-- Referral Incentive Tab -->
                    <TabsContent value="sponsor" class="mt-2 sm:mt-4">
                        <div v-if="bonusSponsors.length === 0" class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm">
                            Belum ada bonus referral incentive
                        </div>
                        <div v-else class="space-y-1.5 sm:space-y-3">
                            <div
                                v-for="bonus in bonusSponsors"
                                :key="bonus.id"
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-wrap items-center gap-1 sm:gap-2">
                                        <Badge :variant="bonus.status === 1 ? 'secondary' : 'outline'" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.status === 1 ? 'R' : 'P' }}
                                        </Badge>
                                        <span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1">
                                            {{ bonus.description || 'Bonus Sponsor' }}
                                        </span>
                                    </div>
                                    <p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5">
                                        <template v-if="bonus.from_member">
                                            <span class="block sm:inline">
                                                Dari: {{ bonus.from_member.name }}
                                            </span>
                                        </template>
                                        <span class="block sm:inline sm:ml-1">
                                            {{ formatDate(bonus.created_at) }}
                                        </span>
                                    </p>
                                </div>
                                <div class="text-left sm:text-right flex-shrink-0">
                                    <div class="text-xs sm:text-base md:text-lg font-bold text-green-600">
                                        {{ formatCurrency(bonus.amount) }}
                                    </div>
                                    <div :class="['text-[8px] sm:text-xs', bonus.status === 1 ? 'text-green-600' : 'text-yellow-600']">
                                        {{ bonus.status === 1 ? 'Processed' : 'Pending' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <!-- Team Affiliate Commission Tab -->
                    <TabsContent value="matching" class="mt-2 sm:mt-4">
                        <div v-if="bonusMatchings.length === 0" class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm">
                            Belum ada bonus team affiliate commission
                        </div>
                        <div v-else class="space-y-1.5 sm:space-y-3">
                            <div
                                v-for="bonus in bonusMatchings"
                                :key="bonus.id"
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-wrap items-center gap-1 sm:gap-2">
                                        <Badge :variant="bonus.status === 1 ? 'secondary' : 'outline'" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.status === 1 ? 'R' : 'P' }}
                                        </Badge>
                                        <Badge variant="outline" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            L{{ bonus.level }}
                                        </Badge>
                                        <span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1">
                                            {{ bonus.description || 'Bonus Matching' }}
                                        </span>
                                    </div>
                                    <p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5">
                                        <template v-if="bonus.from_member">
                                            <span class="block sm:inline">
                                                Dari: {{ bonus.from_member.name }}
                                            </span>
                                        </template>
                                        <span class="block sm:inline sm:ml-2">
                                            {{ formatDate(bonus.created_at) }}
                                        </span>
                                    </p>
                                </div>
                                <div class="text-left sm:text-right flex-shrink-0">
                                    <div class="text-xs sm:text-base md:text-lg font-bold text-green-600">
                                        {{ formatCurrency(bonus.amount) }}
                                    </div>
                                    <div :class="['text-[8px] sm:text-xs', bonus.status === 1 ? 'text-green-600' : 'text-yellow-600']">
                                        {{ bonus.status === 1 ? 'Processed' : 'Pending' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <!-- Partner Team Commission Tab -->
                    <TabsContent value="pairing" class="mt-2 sm:mt-4">
                        <div v-if="bonusPairings.length === 0" class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm">
                            Belum ada bonus partner team commission
                        </div>
                        <div v-else class="space-y-3">
                            <div
                                v-for="bonus in bonusPairings"
                                :key="bonus.id"
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <Badge :variant="bonus.status === 1 ? 'secondary' : 'outline'" class="text-xs">
                                            {{ bonus.status === 1 ? 'Released' : 'Pending' }}
                                        </Badge>
                                        <Badge variant="outline" class="text-xs">
                                            {{ bonus.pair }} Pairs
                                        </Badge>
                                        <span class="text-xs sm:text-sm font-medium break-words">
                                            {{ bonus.description || 'Bonus Pairing' }}
                                        </span>
                                    </div>
                                    <p class="text-[10px] sm:text-xs text-muted-foreground mt-1">
                                        {{ formatDate(bonus.created_at) }}
                                    </p>
                                </div>
                                <div class="text-left sm:text-right flex-shrink-0">
                                    <div class="text-base sm:text-lg font-bold text-green-600">
                                        {{ formatCurrency(bonus.amount) }}
                                    </div>
                                    <div :class="['text-[8px] sm:text-xs', bonus.status === 1 ? 'text-green-600' : 'text-yellow-600']">
                                        {{ bonus.status === 1 ? 'Processed' : 'Pending' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <!-- Cashback Commission Tab -->
                    <TabsContent value="cashback" class="mt-2 sm:mt-4">
                        <div v-if="bonusCashbacks.length === 0" class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm">
                            Belum ada bonus cashback commission
                        </div>
                        <div v-else class="space-y-1.5 sm:space-y-3">
                            <div
                                v-for="bonus in bonusCashbacks"
                                :key="bonus.id"
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-wrap items-center gap-1 sm:gap-2">
                                        <Badge :variant="bonus.status === 1 ? 'secondary' : 'outline'" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.status === 1 ? 'R' : 'P' }}
                                        </Badge>
                                        <span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1">
                                            {{ bonus.description || 'Bonus Cashback' }}
                                        </span>
                                    </div>
                                    <p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5">eground mt-0.5">
                                        <span v-if="bonus.order_id" class="block sm:inline">
                                            #{{ bonus.order_id }}
                                        </span>
                                        <span class="block sm:inline sm:ml-1">
                                            {{ formatDate(bonus.created_at) }}
                                        </span>
                                    </p>
                                </div>
                                <div class="text-left sm:text-right flex-shrink-0">
                                    <div class="text-xs sm:text-base md:text-lg font-bold text-green-600">
                                        {{ formatCurrency(bonus.amount) }}
                                    </div>
                                    <div :class="['text-[8px] sm:text-xs', bonus.status === 1 ? 'text-green-600' : 'text-yellow-600']">
                                        {{ bonus.status === 1 ? 'Processed' : 'Pending' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <!-- Promotions Rewards Tab -->
                    <TabsContent value="reward" class="mt-2 sm:mt-4">
                        <div v-if="bonusRewards.length === 0" class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm">
                            Belum ada promotions rewards
                        </div>
                        <div v-else class="space-y-1.5 sm:space-y-3">
                            <div
                                v-for="bonus in bonusRewards"
                                :key="bonus.id"
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-wrap items-center gap-1 sm:gap-2">
                                        <Badge :variant="bonus.status === 1 ? 'secondary' : 'outline'" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.status === 1 ? 'R' : 'P' }}
                                        </Badge>
                                        <Badge v-if="bonus.reward_type" variant="outline" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.reward_type }}
                                        </Badge>
                                        <span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1">
                                            {{ bonus.description || 'Promotions Reward' }}
                                        </span>
                                    </div>
                                    <p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5">
                                        {{ formatDate(bonus.created_at) }}
                                    </p>
                                </div>
                                <div class="text-left sm:text-right flex-shrink-0">
                                    <div class="text-xs sm:text-base md:text-lg font-bold text-green-600">
                                        {{ formatCurrency(bonus.amount) }}
                                    </div>
                                    <div :class="['text-[8px] sm:text-xs', bonus.status === 1 ? 'text-green-600' : 'text-yellow-600']">
                                        {{ bonus.status === 1 ? 'Processed' : 'Pending' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <!-- Retail Commission Tab -->
                    <TabsContent value="retail" class="mt-2 sm:mt-4">
                        <div v-if="bonusRetails.length === 0" class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm">
                            Belum ada bonus retail commission
                        </div>
                        <div v-else class="space-y-1.5 sm:space-y-3">
                            <div
                                v-for="bonus in bonusRetails"
                                :key="bonus.id"
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-wrap items-center gap-1 sm:gap-2">
                                        <Badge :variant="bonus.status === 1 ? 'secondary' : 'outline'" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.status === 1 ? 'R' : 'P' }}
                                        </Badge>
                                        <Badge v-if="bonus.index_value" variant="outline" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            IDX: {{ bonus.index_value }}
                                        </Badge>
                                        <span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1">
                                            {{ bonus.description || 'Retail Commission' }}
                                        </span>
                                    </div>
                                    <p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5">
                                        <template v-if="bonus.from_member">
                                            <span class="block sm:inline">
                                                Dari: {{ bonus.from_member.name }}
                                            </span>
                                        </template>
                                        <span class="block sm:inline sm:ml-1">
                                            {{ formatDate(bonus.created_at) }}
                                        </span>
                                    </p>
                                </div>
                                <div class="text-left sm:text-right flex-shrink-0">
                                    <div class="text-xs sm:text-base md:text-lg font-bold text-green-600">
                                        {{ formatCurrency(bonus.amount) }}
                                    </div>
                                    <div :class="['text-[8px] sm:text-xs', bonus.status === 1 ? 'text-green-600' : 'text-yellow-600']">
                                        {{ bonus.status === 1 ? 'Processed' : 'Pending' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <!-- Lifetime Cash Rewards Tab -->
                    <TabsContent value="lifetime" class="mt-2 sm:mt-4">
                        <div v-if="bonusLifetimeCashRewards.length === 0" class="text-center py-4 sm:py-8 text-muted-foreground text-[10px] sm:text-sm">
                            Belum ada lifetime cash rewards
                        </div>
                        <div v-else class="space-y-1.5 sm:space-y-3">
                            <div
                                v-for="bonus in bonusLifetimeCashRewards"
                                :key="bonus.id"
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2 sm:p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-wrap items-center gap-1 sm:gap-2">
                                        <Badge :variant="bonus.status === 1 ? 'secondary' : 'outline'" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.status === 1 ? 'R' : 'P' }}
                                        </Badge>
                                        <Badge variant="outline" class="text-[8px] sm:text-xs px-1 sm:px-2 py-0">
                                            {{ bonus.reward_name }}
                                        </Badge>
                                        <span class="text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-1">
                                            {{ bonus.description || 'Lifetime Cash Reward' }}
                                        </span>
                                    </div>
                                    <p class="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5">
                                        <span class="block sm:inline">
                                            Reward: {{ formatCurrency(bonus.reward) }} | BV: {{ bonus.bv }}
                                        </span>
                                        <span class="block sm:inline sm:ml-1">
                                            {{ formatDate(bonus.created_at) }}
                                        </span>
                                    </p>
                                </div>
                                <div class="text-left sm:text-right flex-shrink-0">
                                    <div class="text-xs sm:text-base md:text-lg font-bold text-green-600">
                                        {{ formatCurrency(bonus.amount) }}
                                    </div>
                                    <div :class="['text-[8px] sm:text-xs', bonus.status === 1 ? 'text-green-600' : 'text-yellow-600']">
                                        {{ bonus.status === 1 ? 'Processed' : 'Pending' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
</template>
