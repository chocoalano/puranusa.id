<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
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
import { ArrowLeft, Gift, Trophy, CheckCircle, Infinity, Loader2 } from 'lucide-vue-next';
import { show } from '@/actions/App/Http/Controllers/Admin/CustomerController';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

interface Customer {
    id: number;
    name: string;
    ewallet_id: string;
    username: string;
    omzet_left: number;
    omzet_right: number;
}

interface ActiveReward {
    id: number;
    name: string;
    reward: string;
    bv_required: number;
    value: number;
    omzet_left: number;
    omzet_right: number;
    can_claim: boolean;
    already_claimed: boolean;
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

const props = defineProps<Props>();

const claimingRewardId = ref<number | null>(null);

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
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

const handleClaimReward = (reward: ActiveReward) => {
    if (claimingRewardId.value !== null) return;

    claimingRewardId.value = reward.id;

    router.post(`/manage/customers/${props.customer.id}/lifetime-rewards/${reward.id}/claim`, {}, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Berhasil', {
                description: `Reward "${reward.name}" berhasil diklaim!`,
            });
        },
        onError: (errors) => {
            const errorMessage = Object.values(errors)[0] as string;
            toast.error('Gagal', {
                description: errorMessage || 'Terjadi kesalahan saat mengklaim reward.',
            });
        },
        onFinish: () => {
            claimingRewardId.value = null;
        },
    });
};
</script>

<template>
    <Head :title="`Lifetime Cash Rewards - ${customer.name}`" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold flex items-center gap-2">
                        <Infinity class="h-8 w-8" />
                        Lifetime Cash Rewards
                    </h1>
                    <p class="mt-2 text-muted-foreground">
                        Reward lifetime untuk <strong>{{ customer.name }}</strong> ({{ customer.ewallet_id }})
                    </p>
                </div>
                <Link :href="show.url(customer.id)">
                    <Button variant="outline">
                        <ArrowLeft class="mr-2 h-4 w-4" />
                        Kembali ke Detail
                    </Button>
                </Link>
            </div>

            <!-- Customer Omzet Info -->
            <Card>
                <CardHeader>
                    <CardTitle class="text-lg">Omset Retail Member</CardTitle>
                    <CardDescription>
                        Omset retail yang digunakan untuk syarat klaim lifetime reward
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="grid gap-4 md:grid-cols-2">
                        <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                            <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">Omset Grup Kiri (Plan B)</p>
                            <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                {{ formatNumber(customer.omzet_left) }} BV
                            </p>
                        </div>
                        <div class="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                            <p class="text-sm text-green-600 dark:text-green-400 font-medium">Omset Grup Kanan (Plan B)</p>
                            <p class="text-2xl font-bold text-green-700 dark:text-green-300">
                                {{ formatNumber(customer.omzet_right) }} BV
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Active Lifetime Rewards -->
            <Card>
                <CardHeader>
                    <div class="flex items-center gap-2">
                        <Gift class="h-5 w-5 text-primary" />
                        <CardTitle>Reward Lifetime Tersedia</CardTitle>
                    </div>
                    <CardDescription>
                        Daftar reward lifetime yang dapat diklaim jika omset memenuhi syarat
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div v-if="activeRewards.length === 0" class="text-center py-8 text-muted-foreground">
                        <Gift class="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Tidak ada reward lifetime aktif saat ini</p>
                    </div>
                    <Table v-else>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Reward</TableHead>
                                <TableHead class="text-right">Syarat Omset Grup Kiri (BV)</TableHead>
                                <TableHead class="text-right">Syarat Omset Grup Kanan (BV)</TableHead>
                                <TableHead class="text-center">Klaim</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="reward in activeRewards" :key="reward.id">
                                <TableCell class="font-medium">{{ reward.name }}</TableCell>
                                <TableCell>{{ reward.reward ? formatCurrency(reward.value) : '-' }}</TableCell>
                                <TableCell class="text-right">
                                    <span :class="customer.omzet_left >= reward.bv_required ? 'text-green-600 font-semibold' : ''">
                                        {{ formatNumber(reward.bv_required) }}
                                    </span>
                                </TableCell>
                                <TableCell class="text-right">
                                    <span :class="customer.omzet_right >= reward.bv_required ? 'text-green-600 font-semibold' : ''">
                                        {{ formatNumber(reward.bv_required) }}
                                    </span>
                                </TableCell>
                                <TableCell class="text-center">
                                    <Badge v-if="reward.already_claimed" variant="secondary" class="bg-gray-100 text-gray-600">
                                        <CheckCircle class="h-3 w-3 mr-1" />
                                        Sudah Diklaim
                                    </Badge>
                                    <Button
                                        v-else-if="reward.can_claim"
                                        size="sm"
                                        @click="handleClaimReward(reward)"
                                        :disabled="claimingRewardId !== null"
                                    >
                                        <Loader2 v-if="claimingRewardId === reward.id" class="h-4 w-4 mr-1 animate-spin" />
                                        <Gift v-else class="h-4 w-4 mr-1" />
                                        {{ claimingRewardId === reward.id ? 'Mengklaim...' : 'Klaim' }}
                                    </Button>
                                    <Badge v-else variant="outline" class="text-muted-foreground">
                                        Belum Memenuhi Syarat
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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
                        Riwayat reward lifetime yang telah berhasil diklaim oleh member ini
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
                                <TableHead>Tanggal Klaim</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="claimed in claimedRewards" :key="claimed.id">
                                <TableCell class="font-medium">{{ claimed.reward }}</TableCell>
                                <TableCell class="text-right">{{ formatNumber(claimed.bv) }}</TableCell>
                                <TableCell>{{ formatDateTime(claimed.claimed_at) }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
