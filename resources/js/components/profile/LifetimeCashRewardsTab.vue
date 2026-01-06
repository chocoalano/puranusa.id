<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useForm } from '@inertiajs/vue3';
import { Award, CheckCircle, Gift, Loader2, Trophy } from 'lucide-vue-next';
import { claimLifetimeReward } from '@/actions/App/Http/Controllers/Ecommerce/Auth/ProfileController';

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

interface ClaimedReward {
    id: number;
    reward: string;
    bv: number;
    created_at: string;
}

interface Props {
    lifetimeRewards: LifetimeReward[];
    claimedLifetimeRewards: ClaimedReward[];
}

defineProps<Props>();

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const claimForm = useForm({
    reward_id: 0,
});

const handleClaim = (rewardId: number) => {
    claimForm.reward_id = rewardId;
    claimForm.post(claimLifetimeReward.url(), {
        preserveScroll: true,
        onSuccess: () => {
            claimForm.reset();
        },
    });
};
</script>

<template>
    <div class="space-y-6">
        <!-- Active Lifetime Rewards Section -->
        <Card>
            <CardHeader>
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-lg bg-purple-500/10">
                        <Trophy class="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                        <CardTitle class="text-lg">Lifetime Cash Rewards</CardTitle>
                        <CardDescription>
                            Daftar reward lifetime berdasarkan pencapaian omset grup Anda
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div v-if="lifetimeRewards.length === 0" class="text-center py-8">
                    <Gift class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 class="text-lg font-semibold mb-2">Belum Ada Reward Lifetime</h3>
                    <p class="text-muted-foreground text-sm">
                        Tidak ada program reward lifetime yang tersedia saat ini.
                    </p>
                </div>

                <div v-else class="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="min-w-[150px]">Nama</TableHead>
                                <TableHead class="min-w-[150px]">Reward</TableHead>
                                <TableHead class="text-right min-w-[180px]">Syarat Omset Grup Kiri & Kanan (BV)</TableHead>
                                <TableHead class="text-right min-w-[180px]">Akumulasi Omset Grup Kiri (BV)</TableHead>
                                <TableHead class="text-right min-w-[180px]">Akumulasi Omset Grup Kanan (BV)</TableHead>
                                <TableHead class="text-center min-w-[120px]">Klaim</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="reward in lifetimeRewards" :key="reward.id">
                                <TableCell class="font-medium">
                                    <div class="flex items-center gap-2">
                                        <Award class="h-4 w-4 text-purple-500" />
                                        {{ reward.name }}
                                    </div>
                                </TableCell>
                                <TableCell>{{ reward.reward }}</TableCell>
                                <TableCell class="text-right font-mono">
                                    {{ formatNumber(reward.bv) }}
                                </TableCell>
                                <TableCell class="text-right font-mono">
                                    {{ formatNumber(reward.accumulated_left) }}
                                </TableCell>
                                <TableCell class="text-right font-mono">
                                    {{ formatNumber(reward.accumulated_right) }}
                                </TableCell>
                                <TableCell class="text-center">
                                    <Badge v-if="reward.is_claimed" variant="secondary">
                                        <CheckCircle class="h-3 w-3 mr-1" />
                                        Sudah Diklaim
                                    </Badge>
                                    <Button
                                        v-else-if="reward.can_claim"
                                        size="sm"
                                        :disabled="claimForm.processing && claimForm.reward_id === reward.id"
                                        @click="handleClaim(reward.id)"
                                    >
                                        <Loader2 v-if="claimForm.processing && claimForm.reward_id === reward.id" class="h-4 w-4 mr-1 animate-spin" />
                                        <Gift v-else class="h-4 w-4 mr-1" />
                                        Klaim
                                    </Button>
                                    <Badge v-else variant="outline">
                                        Belum Memenuhi Syarat
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        <!-- Claimed Rewards Section -->
        <Card>
            <CardHeader>
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-lg bg-green-500/10">
                        <CheckCircle class="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                        <CardTitle class="text-lg">Reward yang Sudah Diklaim</CardTitle>
                        <CardDescription>
                            Daftar reward lifetime yang sudah berhasil Anda klaim
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div v-if="claimedLifetimeRewards.length === 0" class="text-center py-8">
                    <Gift class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 class="text-lg font-semibold mb-2">Belum Ada Reward Diklaim</h3>
                    <p class="text-muted-foreground text-sm">
                        Anda belum memiliki reward lifetime yang telah diklaim.
                    </p>
                </div>

                <div v-else class="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="min-w-[200px]">Reward</TableHead>
                                <TableHead class="text-right min-w-[180px]">Syarat Omset Group (BV)</TableHead>
                                <TableHead class="min-w-[150px]">Tanggal Klaim</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="claimed in claimedLifetimeRewards" :key="claimed.id">
                                <TableCell class="font-medium">
                                    <div class="flex items-center gap-2">
                                        <Gift class="h-4 w-4 text-green-500" />
                                        {{ claimed.reward }}
                                    </div>
                                </TableCell>
                                <TableCell class="text-right font-mono">
                                    {{ formatNumber(claimed.bv) }}
                                </TableCell>
                                <TableCell>{{ formatDate(claimed.created_at) }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
