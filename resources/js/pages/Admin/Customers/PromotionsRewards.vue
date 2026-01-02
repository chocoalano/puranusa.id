<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Gift, Trophy, CheckCircle, Clock, Target } from 'lucide-vue-next';
import { show } from '@/actions/App/Http/Controllers/Admin/CustomerController';

interface Customer {
    id: number;
    name: string;
    ewallet_id: string;
    username: string;
}

interface ActiveReward {
    id: number;
    name: string;
    reward: string;
    bv_required: number;
    start: string;
    end: string;
    omzet_left: number;
    omzet_right: number;
    status: number; // 0 = Belum tercapai, 1 = Diproses
    progress_left_percent: number;
    progress_right_percent: number;
}

interface ClaimedReward {
    id: number;
    reward: string;
    bv: number;
    amount: number;
    claimed_at: string;
    status: number;
}

interface Props {
    customer: Customer;
    activeRewards: ActiveReward[];
    claimedRewards: ClaimedReward[];
}

defineProps<Props>();

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
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
</script>

<template>
    <Head :title="`Promotions Rewards - ${customer.name}`" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold flex items-center gap-2">
                        <Gift class="h-8 w-8" />
                        Promotions Rewards
                    </h1>
                    <p class="mt-2 text-muted-foreground">
                        Progress reward promosi untuk <strong>{{ customer.name }}</strong> ({{ customer.ewallet_id }})
                    </p>
                </div>
                <Link :href="show.url(customer.id)">
                    <Button variant="outline">
                        <ArrowLeft class="mr-2 h-4 w-4" />
                        Kembali ke Detail
                    </Button>
                </Link>
            </div>

            <!-- Active Promotions Rewards -->
            <Card>
                <CardHeader>
                    <div class="flex items-center gap-2">
                        <Target class="h-5 w-5 text-primary" />
                        <CardTitle>Reward Promosi Aktif</CardTitle>
                    </div>
                    <CardDescription>
                        Daftar reward promosi yang sedang berlangsung dan progress pencapaiannya
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div v-if="activeRewards.length === 0" class="text-center py-8 text-muted-foreground">
                        <Gift class="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Tidak ada reward promosi aktif saat ini</p>
                    </div>
                    <div v-else class="space-y-4">
                        <div
                            v-for="reward in activeRewards"
                            :key="reward.id"
                            class="border rounded-lg p-4 space-y-4"
                        >
                            <div class="flex items-start justify-between">
                                <div>
                                    <h3 class="font-semibold text-lg">{{ reward.name }}</h3>
                                    <p class="text-sm text-muted-foreground">{{ reward.reward }}</p>
                                </div>
                                <Badge :variant="getStatusBadge(reward.status).variant">
                                    <component :is="reward.status === 1 ? Clock : Target" class="h-3 w-3 mr-1" />
                                    {{ getStatusBadge(reward.status).text }}
                                </Badge>
                            </div>

                            <div class="grid gap-4 md:grid-cols-2">
                                <!-- Left Group Progress -->
                                <div class="space-y-2">
                                    <div class="flex justify-between text-sm">
                                        <span class="font-medium">Omset Grup Kiri</span>
                                        <span>
                                            {{ formatNumber(reward.omzet_left) }} / {{ formatNumber(reward.bv_required) }} BV
                                        </span>
                                    </div>
                                    <div class="h-3 w-full overflow-hidden rounded-full bg-secondary">
                                        <div
                                            class="h-full bg-primary transition-all"
                                            :style="{ width: `${reward.progress_left_percent}%` }"
                                        />
                                    </div>
                                    <p class="text-xs text-muted-foreground text-right">
                                        {{ reward.progress_left_percent.toFixed(1) }}%
                                    </p>
                                </div>

                                <!-- Right Group Progress -->
                                <div class="space-y-2">
                                    <div class="flex justify-between text-sm">
                                        <span class="font-medium">Omset Grup Kanan</span>
                                        <span>
                                            {{ formatNumber(reward.omzet_right) }} / {{ formatNumber(reward.bv_required) }} BV
                                        </span>
                                    </div>
                                    <div class="h-3 w-full overflow-hidden rounded-full bg-secondary">
                                        <div
                                            class="h-full bg-primary transition-all"
                                            :style="{ width: `${reward.progress_right_percent}%` }"
                                        />
                                    </div>
                                    <p class="text-xs text-muted-foreground text-right">
                                        {{ reward.progress_right_percent.toFixed(1) }}%
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center justify-between pt-2 border-t text-sm text-muted-foreground">
                                <span>Syarat: {{ formatNumber(reward.bv_required) }} BV (Kiri & Kanan)</span>
                                <span>Periode: {{ formatDate(reward.start) }} - {{ formatDate(reward.end) }}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Claimed Rewards -->
            <Card>
                <CardHeader>
                    <div class="flex items-center gap-2">
                        <Trophy class="h-5 w-5 text-yellow-500" />
                        <CardTitle>Reward Yang Sudah Diklaim</CardTitle>
                    </div>
                    <CardDescription>
                        Riwayat reward promosi yang telah berhasil diklaim oleh member ini
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div v-if="claimedRewards.length === 0" class="text-center py-8 text-muted-foreground">
                        <Trophy class="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Belum ada reward yang diklaim</p>
                    </div>
                    <Table v-else>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reward</TableHead>
                                <TableHead class="text-right">Syarat Omset Group (BV)</TableHead>
                                <TableHead class="text-right">Nilai</TableHead>
                                <TableHead>Tanggal Klaim</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="claimed in claimedRewards" :key="claimed.id">
                                <TableCell class="font-medium">{{ claimed.reward }}</TableCell>
                                <TableCell class="text-right">{{ formatNumber(claimed.bv) }}</TableCell>
                                <TableCell class="text-right">{{ formatCurrency(claimed.amount) }}</TableCell>
                                <TableCell>{{ formatDateTime(claimed.claimed_at) }}</TableCell>
                                <TableCell>
                                    <Badge variant="default" class="bg-green-500">
                                        <CheckCircle class="h-3 w-3 mr-1" />
                                        Diklaim
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
