<script setup lang="ts">
import { index as bonusSponsorIndex } from '@/actions/App/Http/Controllers/BonusComission/BonusSponsorController';
import { index as bonusMatchingIndex } from '@/actions/App/Http/Controllers/BonusComission/BonusMatchingController';
import { index as bonusPairingIndex } from '@/actions/App/Http/Controllers/BonusComission/BonusPairingController';
import { index as bonusCashbackIndex } from '@/actions/App/Http/Controllers/BonusComission/BonusCashbackController';
import { index as bonusRewardIndex } from '@/actions/App/Http/Controllers/BonusComission/BonusRewardController';
import { index as bonusRetailIndex } from '@/actions/App/Http/Controllers/BonusComission/BonusRetailController';
import { index as bonusLifetimeCashRewardIndex } from '@/actions/App/Http/Controllers/BonusComission/BonusLifetimeCashRewardController';
import { index as userIndex } from '@/actions/App/Http/Controllers/Admin/UserController';
import { index as customerIndex } from '@/actions/App/Http/Controllers/Admin/CustomerController';
import { index as stockistIndex } from '@/actions/App/Http/Controllers/Admin/StockistController';

// Admin E-Commerce Controllers
import { index as productIndex } from '@/actions/App/Http/Controllers/Admin/ProductManagementController';
import { index as categoryIndex } from '@/actions/App/Http/Controllers/Admin/CategoryManagementController';
import { index as articleIndex } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { index as pageIndex } from '@/actions/App/Http/Controllers/Admin/PageController';
import { index as reviewIndex } from '@/actions/App/Http/Controllers/Admin/ReviewManagementController';
import { index as promotionIndex } from '@/actions/App/Http/Controllers/Admin/PromotionManagementController';
import { index as shipmentIndex } from '@/actions/App/Http/Controllers/Admin/ShipmentManagementController';
import { indexReturns } from '@/actions/App/Http/Controllers/Admin/ReturnRefundController';
import { index as topupIndex } from '@/actions/App/Http/Controllers/Admin/TopupManagementController';
import { index as withdrawalIndex } from '@/actions/App/Http/Controllers/Admin/WithdrawalManagementController';
import { index as networkBinaryIndex } from '@/actions/App/Http/Controllers/Admin/NetworkBinaryController';
import { index as networkMatrixIndex } from '@/actions/App/Http/Controllers/Admin/NetworkMatrixController';
import { index as addressIndex } from '@/actions/App/Http/Controllers/Admin/AddressManagementController';
import { index as paymentMethodIndex } from '@/actions/App/Http/Controllers/Admin/PaymentMethodManagementController';
import { index as courierIndex } from '@/actions/App/Http/Controllers/Admin/CourierManagementController';
import { index as settingIndex } from '@/actions/App/Http/Controllers/Admin/SettingController';
import { index as memberPackageIndex } from '@/actions/App/Http/Controllers/Admin/MemberPackageController';
import { promotions as promotionsRewardIndex, lifetime as lifetimeRewardIndex, promotionsProgress as promotionsProgressIndex } from '@/actions/App/Http/Controllers/Admin/RewardController';

import { index as documentationIndex } from '@/actions/App/Http/Controllers/DocumentationController';

import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import {
    BookOpen,
    LayoutGrid,
    Settings,
    Users,
    Users2Icon,
    Store,
    Wallet,
    Wallet2,
    Wallet2Icon,
    WalletCards,
    WalletIcon,
    ShoppingCart,
    Package,
    Truck,
    Heart,
    Star,
    Grid3x3,
    FolderTree,
    BadgePercent,
    TrendingUp,
    MapPin,
    CreditCard,
    FileText,
    ArrowLeftRight,
    FileEdit,
    Gift,
    Infinity,
    ChartBar,
    BookCheck,
    BookDashed,
} from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Kelola',
        href: '#',
        icon: Settings,
        items: [
            {
                title: 'User',
                href: userIndex(),
                icon: Users,
            },
            {
                title: 'Pelanggan',
                href: customerIndex(),
                icon: Users2Icon,
            },
            {
                title: 'Stokist',
                href: stockistIndex(),
                icon: Store,
            },
        ],
    },
    {
        title: 'E-Commerce',
        href: '#',
        icon: ShoppingCart,
        items: [
            {
                title: 'Produk',
                href: productIndex(),
                icon: Package,
            },
            {
                title: 'Kategori Produk',
                href: categoryIndex(),
                icon: FolderTree,
            },
            {
                title: 'Artikel & Blog',
                href: articleIndex(),
                icon: FileEdit,
            },
            {
                title: 'Halaman Statis',
                href: pageIndex(),
                icon: FileText,
            },
            {
                title: 'Keranjang Pelanggan',
                href: '/admin/carts',
                icon: ShoppingCart,
            },
            {
                title: 'Wishlist Pelanggan',
                href: '/admin/wishlists',
                icon: Heart,
            },
            {
                title: 'Review Produk',
                href: reviewIndex(),
                icon: Star,
            },
            {
                title: 'Promosi & Diskon',
                href: promotionIndex(),
                icon: BadgePercent,
            },
        ],
    },
    {
        title: 'Pembelian',
        href: '#',
        icon: Package,
        items: [
            {
                title: 'Semua Pesanan',
                href: '/admin/orders',
                icon: FileText,
            },
            {
                title: 'Pesanan Pending',
                href: '/admin/orders/pending',
                icon: Package,
            },
            {
                title: 'Pesanan Dibayar',
                href: '/admin/orders/paid',
                icon: CreditCard,
            },
            {
                title: 'Pengiriman',
                href: shipmentIndex(),
                icon: Truck,
            },
            {
                title: 'Pesanan Selesai',
                href: '/admin/orders/completed',
                icon: BadgePercent,
            },
            {
                title: 'Retur & Refund',
                href: indexReturns(),
                icon: ArrowLeftRight,
            },
        ],
    },
    {
        title: 'Bonus & Komisi MLM',
        href: '#',
        icon: TrendingUp,
        items: [
            {
                title: 'Bonus Sponsor',
                href: bonusSponsorIndex(),
                icon: Wallet,
            },
            {
                title: 'Bonus Matching',
                href: bonusMatchingIndex(),
                icon: WalletCards,
            },
            {
                title: 'Bonus Pairing',
                href: bonusPairingIndex(),
                icon: Wallet2Icon,
            },
            {
                title: 'Bonus Cashback',
                href: bonusCashbackIndex(),
                icon: WalletIcon,
            },
            {
                title: 'Bonus Reward',
                href: bonusRewardIndex(),
                icon: Gift,
            },
            {
                title: 'Bonus Retail',
                href: bonusRetailIndex(),
                icon: ShoppingCart,
            },
            {
                title: 'Promotions Progress',
                href: promotionsProgressIndex.url(),
                icon: TrendingUp,
            },
            {
                title: ' bonus Lifetime Cash Reward',
                href: bonusLifetimeCashRewardIndex(),
                icon: Infinity,
            },
        ],
    },
    {
        title: 'E-Wallet',
        href: '#',
        icon: Wallet2,
        items: [
            {
                title: 'Saldo Pelanggan',
                href: '/admin/wallets',
                icon: Wallet,
            },
            {
                title: 'Transaksi Wallet',
                href: '/admin/wallet-transactions',
                icon: WalletCards,
            },
            {
                title: 'Permintaan Top Up',
                href: topupIndex(),
                icon: CreditCard,
            },
            {
                title: 'Permintaan Withdrawal',
                href: withdrawalIndex(),
                icon: ArrowLeftRight,
            },
        ],
    },
    {
        title: 'Jaringan MLM',
        href: '#',
        icon: Grid3x3,
        items: [
            {
                title: 'Jaringan Binary',
                href: networkBinaryIndex(),
                icon: Grid3x3,
            },
            {
                title: 'Jaringan Sponsor',
                href: networkMatrixIndex(),
                icon: FolderTree,
            },
        ],
    },
    {
        title: 'Laporan',
        href: '#',
        icon: BookOpen,
        items: [
            {
                title: 'Analytic',
                href: networkBinaryIndex(),
                icon: ChartBar,
            },
            {
                title: 'Tax Daily Report',
                href: networkMatrixIndex(),
                icon: BookCheck,
            },
            {
                title: 'Tax Summary Report',
                href: networkMatrixIndex(),
                icon: BookDashed,
            },
        ],
    },
    {
        title: 'Pengaturan',
        href: '#',
        icon: Settings,
        items: [
            {
                title: 'Pengaturan Ecommerce',
                href: settingIndex(),
                icon: Settings,
            },
            {
                title: 'Alamat Pelanggan',
                href: addressIndex(),
                icon: MapPin,
            },
            {
                title: 'Metode Pembayaran',
                href: paymentMethodIndex(),
                icon: CreditCard,
            },
            {
                title: 'Kurir Pengiriman',
                href: courierIndex(),
                icon: Truck,
            },
            {
                title: 'Newsletter',
                href: '/admin/settings/newsletters',
                icon: FileText,
            },
            {
                title: 'Promotions Rewards',
                href: promotionsRewardIndex.url(),
                icon: Gift,
            },
            {
                title: 'Lifetime Cash Rewards',
                href: lifetimeRewardIndex.url(),
                icon: Infinity,
            },
            {
                title: 'Paket Member',
                href: memberPackageIndex(),
                icon: Package,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Documentation',
        href: documentationIndex(),
        icon: BookOpen,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
