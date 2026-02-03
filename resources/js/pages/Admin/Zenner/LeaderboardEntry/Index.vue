<script setup lang="ts">
import { ref } from 'vue';
import { router, Link, Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-vue-next';
import Pagination from '@/components/Pagination.vue';

interface LeaderboardEntry {
    id: number;
    config_id: number;
    customer_id: number;
    customer_name: string;
    score: number;
    rank: number;
    period_label: string | null;
    created_at: string;
    config?: { title: string };
}

interface Props {
    entries: {
        data: LeaderboardEntry[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
    filters: {
        search?: string;
        config_id?: string;
    };
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');
const configIdFilter = ref(props.filters.config_id || '');

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const handleSearch = () => {
    router.get('/admin/zenner/leaderboard-entries', {
        search: searchQuery.value,
        config_id: configIdFilter.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <Head title="Leaderboard Entries" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div>
                <h1 class="text-3xl font-bold">Leaderboard Entries</h1>
                <p class="text-muted-foreground">Daftar entri leaderboard Zenner Club</p>
            </div>

            <Card>
                <CardHeader>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="relative flex-1">
                            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                v-model="searchQuery"
                                placeholder="Cari nama customer..."
                                class="pl-9"
                                @keyup.enter="handleSearch"
                            />
                        </div>
                        <Input
                            v-model="configIdFilter"
                            placeholder="Config ID"
                            class="w-40"
                            @keyup.enter="handleSearch"
                        />
                        <Button @click="handleSearch">
                            <Search class="h-4 w-4 mr-2" />
                            Cari
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Nama Customer</TableHead>
                                <TableHead>Skor</TableHead>
                                <TableHead>Periode</TableHead>
                                <TableHead>Config</TableHead>
                                <TableHead>Dibuat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="entry in entries.data" :key="entry.id">
                                <TableCell>
                                    <Badge variant="outline">#{{ entry.rank }}</Badge>
                                </TableCell>
                                <TableCell>{{ entry.customer_name }}</TableCell>
                                <TableCell>{{ entry.score }}</TableCell>
                                <TableCell>{{ entry.period_label || '-' }}</TableCell>
                                <TableCell>{{ entry.config?.title || entry.config_id }}</TableCell>
                                <TableCell>{{ formatDate(entry.created_at) }}</TableCell>
                            </TableRow>
                            <TableRow v-if="entries.data.length === 0">
                                <TableCell colspan="6" class="text-center text-muted-foreground py-8">
                                    Tidak ada data ditemukan
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div class="mt-4">
                        <Pagination
                            v-if="entries.last_page > 1"
                            :data="entries"
                            url="/admin/zenner/leaderboard-entries"
                            :filters="filters"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
