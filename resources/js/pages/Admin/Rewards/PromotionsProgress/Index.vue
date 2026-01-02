<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Gift,
    Search,
    Target,
    Trophy,
    Users,
    CheckCircle,
    Clock,
} from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { show as customerShow } from '@/actions/App/Http/Controllers/Admin/CustomerController';

interface ActiveReward {
    id: number;
    name: string;
    reward: string;
    bv_left: number;
    bv_right: number;
    start: string;
    end: string;
    progress_count: number;
    achieved_count: number;
}

interface ProgressItem {
    id: number;
    member_id: number;
    member_name: string;
    member_username: string;
    member_ewallet_id: string;
    reward_id: number;
    reward_name: string;
    reward_prize: string;
    bv_required: number;
    omzet_left: number;
    omzet_right: number;
    status: number;
    created_on: string;
}

interface ClaimedReward {
    id: number;
    member_id: number;
    member_name: string;
    member_username: string;
    member_ewallet_id: string;
    reward: string;
    bv: number;
    amount: number;
    claimed_at: string;
    status: number;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    activeRewards: ActiveReward[];
    progressData: PaginatedData<ProgressItem>;
    claimedRewards: PaginatedData<ClaimedReward>;
    filters: {
        search?: string;
        reward_id?: string;
        status?: string;
        claimed_search?: string;
    };
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Pengaturan', href: '#' },
    { title: 'Promotions Rewards Progress', href: '/admin/settings/promotions-rewards/progress' },
];

const search = ref(props.filters.search || '');
const selectedReward = ref(props.filters.reward_id || 'all');
const selectedStatus = ref(props.filters.status || 'all');
const claimedSearch = ref(props.filters.claimed_search || '');

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getStatusBadge = (status: number) => {
    if (status === 0) {
        return { text: 'Belum Tercapai', variant: 'secondary' as const };
    }
    return { text: 'Diproses', variant: 'default' as const };
};

const applyFilters = () => {
    router.get('/admin/settings/promotions-rewards/progress', {
        search: search.value || undefined,
        reward_id: selectedReward.value !== 'all' ? selectedReward.value : undefined,
        status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined,
        claimed_search: claimedSearch.value || undefined,
    }, {
        preserveState: true,
        replace: true,
    });
};

let searchTimeout: ReturnType<typeof setTimeout>;
watch([search, claimedSearch], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, 300);
});

watch([selectedReward, selectedStatus], applyFilters);

const goToProgressPage = (page: number) => {
    router.get('/admin/settings/promotions-rewards/progress', {
        page,
        search: search.value || undefined,
        reward_id: selectedReward.value !== 'all' ? selectedReward.value : undefined,
        status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined,
        claimed_search: claimedSearch.value || undefined,
    }, {
        preserveState: true,
        replace: true,
    });
};

const goToClaimedPage = (page: number) => {
    router.get('/admin/settings/promotions-rewards/progress', {
        claimed_page: page,
        search: search.value || undefined,
        reward_id: selectedReward.value !== 'all' ? selectedReward.value : undefined,
        status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined,
        claimed_search: claimedSearch.value || undefined,
    }, {
        preserveState: true,
        replace: true,
    });
};
</script>

<template>
    <Head title="Promotions Rewards Progress" />

    <AppLayout :breadcrumbs="breadcrumbItems">
        <div class="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
            <!-- Header -->
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gift class="h-8 w-8" />
                        Promotions Rewards Progress
                    </h1>
                    <p class="text-muted-foreground mt-1">
                        Lihat progress dan riwayat klaim reward promosi semua member
                    </p>
                </div>
                <Link href="/admin/settings/promotions-rewards">
                    <Button variant="outline">
                        Kelola Rewards
                    </Button>
                </Link>
            </div>

            <!-- Active Rewards Summary Cards -->
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card v-for="reward in activeRewards" :key="reward.id">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">{{ reward.name }}</CardTitle>
                        <Target class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-xs text-muted-foreground mb-1">{{ reward.reward }}</div>
                        <div class="text-sm">
                            <span class="font-semibold">{{ reward.progress_count }}</span> member dalam progress
                        </div>
                        <div class="text-sm text-green-600">
                            <span class="font-semibold">{{ reward.achieved_count }}</span> tercapai/diproses
                        </div>
                        <div class="text-xs text-muted-foreground mt-2">
                            {{ formatDate(reward.start) }} - {{ formatDate(reward.end) }}
                        </div>
                        <div class="text-xs text-muted-foreground">
                            Syarat: {{ formatNumber(reward.bv_left) }} BV Kiri & Kanan
                        </div>
                    </CardContent>
                </Card>

                <Card v-if="activeRewards.length === 0" class="md:col-span-2 lg:col-span-4">
                    <CardContent class="flex items-center justify-center py-8">
                        <div class="text-center text-muted-foreground">
                            <Gift class="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Tidak ada reward promosi aktif saat ini</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Progress Data Table -->
            <Card>
                <CardHeader>
                    <div class="flex items-center gap-2">
                        <Users class="h-5 w-5 text-primary" />
                        <CardTitle>Progress Reward Member</CardTitle>
                    </div>
                    <CardDescription>
                        Daftar member dengan progress pencapaian reward promosi aktif
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <!-- Filters -->
                    <div class="flex flex-col gap-4 md:flex-row md:items-center mb-4">
                        <div class="relative flex-1 md:max-w-sm">
                            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                v-model="search"
                                placeholder="Cari member..."
                                class="pl-9"
                            />
                        </div>
                        <Select v-model="selectedReward">
                            <SelectTrigger class="w-full md:w-48">
                                <SelectValue placeholder="Filter Reward" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Reward</SelectItem>
                                <SelectItem
                                    v-for="reward in activeRewards"
                                    :key="reward.id"
                                    :value="reward.id.toString()"
                                >
                                    {{ reward.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select v-model="selectedStatus">
                            <SelectTrigger class="w-full md:w-40">
                                <SelectValue placeholder="Filter Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="0">Belum Tercapai</SelectItem>
                                <SelectItem value="1">Diproses</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Table -->
                    <div class="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Reward</TableHead>
                                    <TableHead class="text-right">Syarat BV Kiri</TableHead>
                                    <TableHead class="text-right">Syarat BV Kanan</TableHead>
                                    <TableHead class="text-right">Omset Kiri</TableHead>
                                    <TableHead class="text-right">Omset Kanan</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-if="progressData.data.length === 0">
                                    <TableCell colspan="8" class="text-center py-8 text-muted-foreground">
                                        Tidak ada data progress
                                    </TableCell>
                                </TableRow>
                                <TableRow v-for="(item, index) in progressData.data" :key="item.id">
                                    <TableCell>{{ (progressData.current_page - 1) * progressData.per_page + index + 1 }}</TableCell>
                                    <TableCell>
                                        <Link :href="customerShow.url(item.member_id)" class="hover:underline">
                                            <div class="font-medium">{{ item.member_name }}</div>
                                            <div class="text-xs text-muted-foreground">{{ item.member_ewallet_id }}</div>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div class="font-medium">{{ item.reward_name }}</div>
                                        <div class="text-xs text-muted-foreground">{{ item.reward_prize }}</div>
                                    </TableCell>
                                    <TableCell class="text-right">{{ formatNumber(item.bv_required) }}</TableCell>
                                    <TableCell class="text-right">{{ formatNumber(item.bv_required) }}</TableCell>
                                    <TableCell class="text-right">
                                        <span :class="item.omzet_left >= item.bv_required ? 'text-green-600 font-semibold' : ''">
                                            {{ formatNumber(item.omzet_left) }}
                                        </span>
                                    </TableCell>
                                    <TableCell class="text-right">
                                        <span :class="item.omzet_right >= item.bv_required ? 'text-green-600 font-semibold' : ''">
                                            {{ formatNumber(item.omzet_right) }}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge :variant="getStatusBadge(item.status).variant">
                                            <component :is="item.status === 1 ? Clock : Target" class="h-3 w-3 mr-1" />
                                            {{ getStatusBadge(item.status).text }}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <!-- Pagination -->
                    <div class="flex items-center justify-between mt-4" v-if="progressData.total > 0">
                        <div class="text-sm text-muted-foreground">
                            Menampilkan {{ (progressData.current_page - 1) * progressData.per_page + 1 }} -
                            {{ Math.min(progressData.current_page * progressData.per_page, progressData.total) }}
                            dari {{ progressData.total }} data
                        </div>
                        <div class="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="progressData.current_page === 1"
                                @click="goToProgressPage(1)"
                            >
                                <ChevronsLeft class="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="progressData.current_page === 1"
                                @click="goToProgressPage(progressData.current_page - 1)"
                            >
                                <ChevronLeft class="h-4 w-4" />
                            </Button>
                            <span class="text-sm">
                                {{ progressData.current_page }} / {{ progressData.last_page }}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="progressData.current_page === progressData.last_page"
                                @click="goToProgressPage(progressData.current_page + 1)"
                            >
                                <ChevronRight class="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="progressData.current_page === progressData.last_page"
                                @click="goToProgressPage(progressData.last_page)"
                            >
                                <ChevronsRight class="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Claimed Rewards Table -->
            <Card>
                <CardHeader>
                    <div class="flex items-center gap-2">
                        <Trophy class="h-5 w-5 text-yellow-500" />
                        <CardTitle>Reward Yang Sudah Diklaim</CardTitle>
                    </div>
                    <CardDescription>
                        Riwayat reward promosi yang telah berhasil diklaim oleh member
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <!-- Search -->
                    <div class="flex flex-col gap-4 md:flex-row md:items-center mb-4">
                        <div class="relative flex-1 md:max-w-sm">
                            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                v-model="claimedSearch"
                                placeholder="Cari member..."
                                class="pl-9"
                            />
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Member</TableHead>
                                    <TableHead>Reward</TableHead>
                                    <TableHead class="text-right">Syarat Omset Group (BV)</TableHead>
                                    <TableHead class="text-right">Nilai</TableHead>
                                    <TableHead>Tanggal Klaim</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-if="claimedRewards.data.length === 0">
                                    <TableCell colspan="7" class="text-center py-8 text-muted-foreground">
                                        Belum ada reward yang diklaim
                                    </TableCell>
                                </TableRow>
                                <TableRow v-for="(item, index) in claimedRewards.data" :key="item.id">
                                    <TableCell>{{ (claimedRewards.current_page - 1) * claimedRewards.per_page + index + 1 }}</TableCell>
                                    <TableCell>
                                        <Link :href="customerShow.url(item.member_id)" class="hover:underline">
                                            <div class="font-medium">{{ item.member_name }}</div>
                                            <div class="text-xs text-muted-foreground">{{ item.member_ewallet_id }}</div>
                                        </Link>
                                    </TableCell>
                                    <TableCell class="font-medium">{{ item.reward }}</TableCell>
                                    <TableCell class="text-right">{{ formatNumber(item.bv) }}</TableCell>
                                    <TableCell class="text-right">{{ formatCurrency(item.amount) }}</TableCell>
                                    <TableCell>{{ formatDateTime(item.claimed_at) }}</TableCell>
                                    <TableCell>
                                        <Badge variant="default" class="bg-green-500">
                                            <CheckCircle class="h-3 w-3 mr-1" />
                                            Diklaim
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <!-- Pagination -->
                    <div class="flex items-center justify-between mt-4" v-if="claimedRewards.total > 0">
                        <div class="text-sm text-muted-foreground">
                            Menampilkan {{ (claimedRewards.current_page - 1) * claimedRewards.per_page + 1 }} -
                            {{ Math.min(claimedRewards.current_page * claimedRewards.per_page, claimedRewards.total) }}
                            dari {{ claimedRewards.total }} data
                        </div>
                        <div class="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="claimedRewards.current_page === 1"
                                @click="goToClaimedPage(1)"
                            >
                                <ChevronsLeft class="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="claimedRewards.current_page === 1"
                                @click="goToClaimedPage(claimedRewards.current_page - 1)"
                            >
                                <ChevronLeft class="h-4 w-4" />
                            </Button>
                            <span class="text-sm">
                                {{ claimedRewards.current_page }} / {{ claimedRewards.last_page }}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="claimedRewards.current_page === claimedRewards.last_page"
                                @click="goToClaimedPage(claimedRewards.current_page + 1)"
                            >
                                <ChevronRight class="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="claimedRewards.current_page === claimedRewards.last_page"
                                @click="goToClaimedPage(claimedRewards.last_page)"
                            >
                                <ChevronsRight class="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
