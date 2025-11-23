<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EcommerceLayout from '@/layouts/store/Ecommerce.vue';
import { Head } from '@inertiajs/vue3';
import { AlertCircle, Lock, Package, User, Wallet, Network } from 'lucide-vue-next';
import { ref } from 'vue';
import type { Customer, Order, WalletTransaction } from '@/types/profile';
import ProfileCard from '@/components/profile/ProfileCard.vue';
import NetworkStatsCard from '@/components/profile/NetworkStatsCard.vue';
import BonusStatsCard from '@/components/profile/BonusStatsCard.vue';
import MemberSinceCard from '@/components/profile/MemberSinceCard.vue';
import ProfileInformationTab from '@/components/profile/ProfileInformationTab.vue';
import OrdersTab from '@/components/profile/OrdersTab.vue';
import WalletTab from '@/components/profile/WalletTab.vue';
import SecurityTab from '@/components/profile/SecurityTab.vue';
import DangerZoneTab from '@/components/profile/DangerZoneTab.vue';
import NetworkMembersTab from '@/components/profile/NetworkMembersTab.vue';

interface NetworkMember {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    position: string | null;
    level: number | null;
    has_placement: boolean;
    has_purchase: boolean;
    joined_at: string;
}

defineProps<{
    customer: Customer;
    orders: Order[];
    walletTransactions: WalletTransaction[];
    activeMembers: NetworkMember[];
    passiveMembers: NetworkMember[];
    prospectMembers: NetworkMember[];
}>();

// Get active tab from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const activeTab = ref(urlParams.get('tab') || 'profile');
</script>

<template>
    <EcommerceLayout>
        <Head title="Profile Saya" />

        <!-- Hero Section -->
        <div class="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
            <div class="container mx-auto px-4 py-12 max-w-7xl">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-4xl font-bold text-foreground mb-2">Profile Saya</h1>
                        <p class="text-lg text-muted-foreground">
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

        <div class="container mx-auto px-4 py-8 max-w-7xl">
            <div class="grid gap-6 lg:grid-cols-3">
                <!-- Left Sidebar - Profile Summary -->
                <div class="lg:col-span-1 space-y-6">
                    <ProfileCard :customer="customer" />
                    <NetworkStatsCard :customer="customer" />
                    <BonusStatsCard :customer="customer" />
                    <MemberSinceCard :created-at="customer.created_at" />
                </div>

                <!-- Right Content - Tabs -->
                <div class="lg:col-span-2">
                    <div class="rounded-xl border bg-card overflow-hidden">
                        <Tabs :default-value="activeTab" class="w-full">
                            <!-- Stylish Tab Navigation -->
                            <div class="border-b bg-muted/30 p-2">
                                <TabsList class="inline-flex h-auto w-full bg-transparent gap-2 p-0">
                                    <TabsTrigger
                                        value="profile"
                                        class="flex-1 flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                                    >
                                        <User class="w-5 h-5" />
                                        <span class="text-xs font-medium">Informasi</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="orders"
                                        class="flex-1 flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                                    >
                                        <Package class="w-5 h-5" />
                                        <span class="text-xs font-medium">Pesanan</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="network"
                                        class="flex-1 flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                                    >
                                        <Network class="w-5 h-5" />
                                        <span class="text-xs font-medium">Jaringan</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="wallet"
                                        class="flex-1 flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                                    >
                                        <Wallet class="w-5 h-5" />
                                        <span class="text-xs font-medium">E-Wallet</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="security"
                                        class="flex-1 flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                                    >
                                        <Lock class="w-5 h-5" />
                                        <span class="text-xs font-medium">Keamanan</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="danger"
                                        class="flex-1 flex-col gap-1 py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                                    >
                                        <AlertCircle class="w-5 h-5" />
                                        <span class="text-xs font-medium">Bahaya</span>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <!-- Tab Content -->
                            <div class="p-6">
                                <TabsContent value="profile" class="mt-0">
                                    <ProfileInformationTab :customer="customer" />
                                </TabsContent>

                                <TabsContent value="orders" class="mt-0">
                                    <OrdersTab :orders="orders" />
                                </TabsContent>

                                <TabsContent value="network" class="mt-0">
                                    <NetworkMembersTab
                                        :active-members="activeMembers"
                                        :passive-members="passiveMembers"
                                        :prospect-members="prospectMembers"
                                    />
                                </TabsContent>

                                <TabsContent value="wallet" class="mt-0">
                                    <WalletTab :customer="customer" :transactions="walletTransactions" />
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

