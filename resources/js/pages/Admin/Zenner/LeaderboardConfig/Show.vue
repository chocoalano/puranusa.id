<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-vue-next';
import type { LeaderboardConfig } from '@/types/zenner';

interface Props {
    item: LeaderboardConfig;
}

const props = defineProps<Props>();
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center gap-4">
                <Button variant="outline" size="icon" as-child>
                    <Link href="/admin/zenner/leaderboard-configs"><ArrowLeft class="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">{{ item.title }}</h1>
                    <p class="text-muted-foreground">Detail leaderboard & entries</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div class="flex items-center gap-4">
                        <Badge v-if="item.is_active" variant="default">Aktif</Badge>
                        <Badge v-else variant="secondary">Nonaktif</Badge>
                        <Badge variant="outline">{{ item.type }}</Badge>
                        <span class="text-sm text-muted-foreground">Periode: {{ item.period }}</span>
                        <span class="text-sm text-muted-foreground">Field: {{ item.calculation_field }}</span>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Entries ({{ item.entries?.length || 0 }})</h2>
                </CardHeader>
                <CardContent>
                    <Table v-if="item.entries && item.entries.length > 0">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Periode</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="entry in item.entries" :key="entry.id">
                                <TableCell><Badge variant="outline">#{{ entry.rank }}</Badge></TableCell>
                                <TableCell>{{ entry.customer_name }}</TableCell>
                                <TableCell>{{ entry.score.toLocaleString('id-ID') }}</TableCell>
                                <TableCell>{{ entry.period_label || '-' }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div v-else class="py-8 text-center">
                        <p class="text-muted-foreground">Belum ada entries</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
