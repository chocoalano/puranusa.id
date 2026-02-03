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

interface TopAffiliate {
    id: number;
    customer_id: number;
    customer_name: string;
    period: string;
    rank: number;
    score: number;
    created_at: string;
}

interface Props {
    affiliates: {
        data: TopAffiliate[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        per_page: number;
    };
    filters: {
        search?: string;
    };
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const handleSearch = () => {
    router.get('/admin/zenner/top-affiliates', {
        search: searchQuery.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <Head title="Top Affiliates" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div>
                <h1 class="text-3xl font-bold">Top Affiliates</h1>
                <p class="text-muted-foreground">Daftar top affiliate Zenner Club</p>
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
                                <TableHead>Periode</TableHead>
                                <TableHead>Skor</TableHead>
                                <TableHead>Dibuat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="affiliate in affiliates.data" :key="affiliate.id">
                                <TableCell>
                                    <Badge variant="outline">#{{ affiliate.rank }}</Badge>
                                </TableCell>
                                <TableCell>{{ affiliate.customer_name }}</TableCell>
                                <TableCell>{{ affiliate.period }}</TableCell>
                                <TableCell>{{ affiliate.score }}</TableCell>
                                <TableCell>{{ formatDate(affiliate.created_at) }}</TableCell>
                            </TableRow>
                            <TableRow v-if="affiliates.data.length === 0">
                                <TableCell colspan="5" class="text-center text-muted-foreground py-8">
                                    Tidak ada data ditemukan
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div class="mt-4">
                        <Pagination
                            v-if="affiliates.last_page > 1"
                            :data="affiliates"
                            url="/admin/zenner/top-affiliates"
                            :filters="filters"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
