<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import {
    ShoppingCart,
    Users,
    Package,
    DollarSign,
    TrendingUp,
    Activity,
    Award,
    Wallet,
} from 'lucide-vue-next';
import { VisXYContainer, VisLine, VisGroupedBar, VisAxis, VisArea, VisTooltip } from '@unovis/vue';
import { computed } from 'vue';

interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    totalBV: number;
    totalBonuses: number;
    pendingOrders: number;
    widthrawal: number;
    activeCustomers: number;
    totalNetworkMembers: number;
    recentOrders: Array<{
        order_no: string;
        customer_name: string;
        grand_total: number;
        status: string;
        created_at: string;
    }>;
    topProducts: Array<{
        name: string;
        total_sold: number;
        total_revenue: number;
    }>;
    monthlyRevenue: Array<{
        month: string;
        revenue: number;
        orders: number;
    }>;
    orderStatusDistribution: Array<{
        status: string;
        count: number;
    }>;
    dailySales: Array<{
        date: string;
        orders: number;
        revenue: number;
    }>;
}

const props = defineProps<{
    stats: DashboardStats;
}>();

const monthlyRevenueData = computed(() => props.stats.monthlyRevenue || []);
const dailySalesData = computed(() => props.stats.dailySales || []);

const revenueChartConfig = {
    revenue: {
        label: 'Revenue',
        color: 'hsl(var(--primary))',
    },
};

const dailySalesChartConfig = {
    orders: {
        label: 'Orders',
        color: 'hsl(var(--chart-1))',
    },
    revenue: {
        label: 'Revenue',
        color: 'hsl(var(--chart-2))',
    },
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const getStatusVariant = (status: string) => {
    const statusMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        PENDING: 'secondary',
        PAID: 'default',
        PROCESSING: 'default',
        SHIPPED: 'default',
        COMPLETED: 'default',
        CANCELLED: 'destructive',
    };
    return statusMap[status.toUpperCase()] || 'outline';
};
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 py-6">
            <!-- Stats Overview -->
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <!-- Total Revenue -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(stats.totalRevenue) }}</div>
                        <p class="text-xs text-muted-foreground">
                            Dari {{ stats.totalOrders }} pesanan
                        </p>
                    </CardContent>
                </Card>

                <!-- Total Orders -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats.totalOrders }}</div>
                        <p class="text-xs text-muted-foreground">
                            {{ stats.pendingOrders }} pending
                        </p>
                    </CardContent>
                </Card>

                <!-- Total Customers -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Customers</CardTitle>
                        <Users class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats.totalCustomers }}</div>
                        <p class="text-xs text-muted-foreground">
                            {{ stats.activeCustomers }} active
                        </p>
                    </CardContent>
                </Card>

                <!-- Total Products -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Products</CardTitle>
                        <Package class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats.totalProducts }}</div>
                        <p class="text-xs text-muted-foreground">Active products</p>
                    </CardContent>
                </Card>
            </div>

            <!-- MLM Stats -->
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <!-- Total BV -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Business Value</CardTitle>
                        <Activity class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(stats.totalBV) }}</div>
                        <p class="text-xs text-muted-foreground">Total BV accumulated</p>
                    </CardContent>
                </Card>

                <!-- Total Bonuses -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Bonuses</CardTitle>
                        <Wallet class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(stats.totalBonuses) }}</div>
                        <p class="text-xs text-muted-foreground">All bonus types</p>
                    </CardContent>
                </Card>

                <!-- Network Members -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Network Members</CardTitle>
                        <Award class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats.totalNetworkMembers }}</div>
                        <p class="text-xs text-muted-foreground">Total MLM members</p>
                    </CardContent>
                </Card>

                <!-- Completed Orders -->
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">New Withdrawals</CardTitle>
                        <TrendingUp class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ stats.widthrawal }}</div>
                        <p class="text-xs text-muted-foreground">
                            Permintaan penarikan baru
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
                <!-- Recent Orders -->
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest 5 orders from customers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-4">
                            <div
                                v-for="order in stats.recentOrders"
                                :key="order.order_no"
                                class="flex items-center justify-between border-b pb-3 last:border-0"
                            >
                                <div class="space-y-1">
                                    <p class="text-sm font-medium">{{ order.order_no }}</p>
                                    <p class="text-xs text-muted-foreground">
                                        {{ order.customer_name }}
                                    </p>
                                    <p class="text-xs text-muted-foreground">
                                        {{ formatDate(order.created_at) }}
                                    </p>
                                </div>
                                <div class="flex flex-col items-end gap-2">
                                    <Badge :variant="getStatusVariant(order.status)">
                                        {{ order.status }}
                                    </Badge>
                                    <p class="text-sm font-bold">
                                        {{ formatCurrency(order.grand_total) }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-if="!stats.recentOrders || stats.recentOrders.length === 0"
                                class="py-8 text-center text-sm text-muted-foreground"
                            >
                                No recent orders
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Top Products -->
                <Card>
                    <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                        <CardDescription>Best selling products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-4">
                            <div
                                v-for="(product, index) in stats.topProducts"
                                :key="product.name"
                                class="flex items-center justify-between border-b pb-3 last:border-0"
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                                    >
                                        {{ index + 1 }}
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium leading-tight">
                                            {{ product.name }}
                                        </p>
                                        <p class="text-xs text-muted-foreground">
                                            {{ product.total_sold }} sold
                                        </p>
                                    </div>
                                </div>
                                <p class="text-sm font-bold">
                                    {{ formatCurrency(product.total_revenue) }}
                                </p>
                            </div>
                            <div
                                v-if="!stats.topProducts || stats.topProducts.length === 0"
                                class="py-8 text-center text-sm text-muted-foreground"
                            >
                                No product sales yet
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Data Tables Section -->
            <div class="grid gap-4 md:grid-cols-2">
                <!-- Monthly Revenue Chart -->
                <Card v-if="stats.monthlyRevenue && stats.monthlyRevenue.length > 0">
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                        <CardDescription>Revenue over the past 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="h-[300px]">
                            <VisXYContainer :data="monthlyRevenueData" :height="300">
                                <VisArea
                                    :x="(d: any, i: number) => i"
                                    :y="(d: any) => d.revenue"
                                    :color="revenueChartConfig.revenue.color"
                                    :opacity="0.3"
                                />
                                <VisLine
                                    :x="(d: any, i: number) => i"
                                    :y="(d: any) => d.revenue"
                                    :color="revenueChartConfig.revenue.color"
                                />
                                <VisAxis
                                    type="x"
                                    :tick-format="(d: number) => monthlyRevenueData[d]?.month || ''"
                                    :tick-values="monthlyRevenueData.map((_: any, i: number) => i)"
                                    :tick-line="false"
                                    :domain-line="false"
                                    :grid-line="false"
                                />
                                <VisAxis
                                    type="y"
                                    :tick-format="(d: number) => 'Rp ' + (d / 1000000).toFixed(0) + 'M'"
                                    :tick-line="false"
                                    :domain-line="false"
                                    :grid-line="true"
                                />
                                <VisTooltip :triggers="{
                                    'circle': (d: any, i: number) => `
                                        <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                            <div class='font-semibold mb-1'>${monthlyRevenueData[i]?.month || ''}</div>
                                            <div class='text-sm text-muted-foreground'>Revenue: ${formatCurrency(monthlyRevenueData[i]?.revenue || 0)}</div>
                                            <div class='text-sm text-muted-foreground'>${monthlyRevenueData[i]?.orders || 0} orders</div>
                                        </div>
                                    `
                                }" />
                            </VisXYContainer>
                        </div>
                    </CardContent>
                </Card>

                <!-- Order Status Distribution Table -->
                <Card v-if="stats.orderStatusDistribution && stats.orderStatusDistribution.length > 0">
                    <CardHeader>
                        <CardTitle>Order Status Distribution</CardTitle>
                        <CardDescription>Breakdown of orders by status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-2">
                            <div
                                v-for="entry in stats.orderStatusDistribution"
                                :key="entry.status"
                                class="flex items-center justify-between rounded-lg border p-3"
                            >
                                <div class="flex items-center gap-3">
                                    <Badge :variant="getStatusVariant(entry.status)">
                                        {{ entry.status }}
                                    </Badge>
                                </div>
                                <p class="text-sm font-bold">{{ entry.count }} orders</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Daily Sales Chart -->
            <Card v-if="stats.dailySales && stats.dailySales.length > 0">
                <CardHeader>
                    <CardTitle>Daily Sales (Last 7 Days)</CardTitle>
                    <CardDescription>Orders and revenue per day</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="h-[300px]">
                        <VisXYContainer :data="dailySalesData" :height="300">
                            <VisGroupedBar
                                :x="(d: any, i: number) => i"
                                :y="[(d: any) => d.orders, (d: any) => d.revenue / 10000]"
                                :color="[dailySalesChartConfig.orders.color, dailySalesChartConfig.revenue.color]"
                                :rounded-corners="4"
                                bar-padding="0.1"
                                group-padding="0.2"
                            />
                            <VisAxis
                                type="x"
                                :tick-format="(d: number) => dailySalesData[d]?.date || ''"
                                :tick-values="dailySalesData.map((_: any, i: number) => i)"
                                :tick-line="false"
                                :domain-line="false"
                                :grid-line="false"
                            />
                            <VisAxis
                                type="y"
                                :tick-line="false"
                                :domain-line="false"
                                :grid-line="true"
                            />
                            <VisTooltip :triggers="{
                                'rect': (d: any, i: number) => `
                                    <div class='rounded-lg border bg-background p-3 shadow-lg'>
                                        <div class='font-semibold mb-2'>${dailySalesData[i]?.date || ''}</div>
                                        <div class='flex items-center gap-2 text-sm mb-1'>
                                            <span style='color: ${dailySalesChartConfig.orders.color}'>●</span>
                                            <span>Orders: <strong>${dailySalesData[i]?.orders || 0}</strong></span>
                                        </div>
                                        <div class='flex items-center gap-2 text-sm'>
                                            <span style='color: ${dailySalesChartConfig.revenue.color}'>●</span>
                                            <span>Revenue: <strong>${formatCurrency(dailySalesData[i]?.revenue || 0)}</strong></span>
                                        </div>
                                    </div>
                                `
                            }" />
                        </VisXYContainer>
                        <div class="mt-4 flex items-center justify-center gap-4 text-sm">
                            <div class="flex items-center gap-2">
                                <div class="h-3 w-3 rounded" :style="{ backgroundColor: dailySalesChartConfig.orders.color }" />
                                <span>Orders</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="h-3 w-3 rounded" :style="{ backgroundColor: dailySalesChartConfig.revenue.color }" />
                                <span>Revenue (÷10K)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
