<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award, CheckCircle, Clock, Gift, Trophy } from 'lucide-vue-next';

interface PromotionReward {
    id: number;
    name: string;
    reward: string;
    bv: number;
    start: string;
    end: string;
    claim_status: number | null; // null = belum tercapai, 0 = belum tercapai, 1 = diproses
}

interface ClaimedReward {
    id: number;
    reward: string;
    bv: number;
    created_at: string;
}

interface Props {
    promotionRewards: PromotionReward[];
    claimedPromotionRewards: ClaimedReward[];
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

const getStatusLabel = (status: number | null) => {
    if (status === null || status === 0) {
        return 'Belum Tercapai';
    }
    return 'Diproses';
};

const getStatusVariant = (status: number | null): 'secondary' | 'default' | 'outline' => {
    if (status === null || status === 0) {
        return 'secondary';
    }
    return 'default';
};
</script>

<template>
    <div class="space-y-6">
        <!-- Active Promotion Rewards Section -->
        <Card>
            <CardHeader>
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-lg bg-amber-500/10">
                        <Trophy class="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                        <CardTitle class="text-lg">Promotion Rewards</CardTitle>
                        <CardDescription>
                            Daftar reward promosi yang sedang berlangsung
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div v-if="promotionRewards.length === 0" class="text-center py-8">
                    <Gift class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 class="text-lg font-semibold mb-2">Belum Ada Reward Promosi</h3>
                    <p class="text-muted-foreground text-sm">
                        Tidak ada program reward promosi yang sedang aktif saat ini.
                    </p>
                </div>

                <div v-else class="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="min-w-[150px]">Nama</TableHead>
                                <TableHead class="min-w-[150px]">Reward</TableHead>
                                <TableHead class="text-right min-w-[150px]">Syarat Omset Grup Kiri (BV)</TableHead>
                                <TableHead class="text-right min-w-[150px]">Syarat Omset Grup Kanan (BV)</TableHead>
                                <TableHead class="min-w-[120px]">Periode Awal</TableHead>
                                <TableHead class="min-w-[120px]">Periode Akhir</TableHead>
                                <TableHead class="text-center min-w-[120px]">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="reward in promotionRewards" :key="reward.id">
                                <TableCell class="font-medium">
                                    <div class="flex items-center gap-2">
                                        <Award class="h-4 w-4 text-amber-500" />
                                        {{ reward.name }}
                                    </div>
                                </TableCell>
                                <TableCell>{{ reward.reward }}</TableCell>
                                <TableCell class="text-right font-mono">
                                    {{ formatNumber(reward.bv) }}
                                </TableCell>
                                <TableCell class="text-right font-mono">
                                    {{ formatNumber(reward.bv) }}
                                </TableCell>
                                <TableCell>{{ formatDate(reward.start) }}</TableCell>
                                <TableCell>{{ formatDate(reward.end) }}</TableCell>
                                <TableCell class="text-center">
                                    <Badge :variant="getStatusVariant(reward.claim_status)">
                                        <template v-if="reward.claim_status === 1">
                                            <Clock class="h-3 w-3 mr-1" />
                                        </template>
                                        {{ getStatusLabel(reward.claim_status) }}
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
                            Daftar reward promosi yang sudah berhasil Anda klaim
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div v-if="claimedPromotionRewards.length === 0" class="text-center py-8">
                    <Gift class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 class="text-lg font-semibold mb-2">Belum Ada Reward Diklaim</h3>
                    <p class="text-muted-foreground text-sm">
                        Anda belum memiliki reward promosi yang telah diklaim.
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
                            <TableRow v-for="claimed in claimedPromotionRewards" :key="claimed.id">
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
