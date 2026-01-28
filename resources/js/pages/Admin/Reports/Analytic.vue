<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Summary {
    tahun_pajak: number;
    total_rows: number;
    total_bruto: number;
    total_pph21: number;
}

interface Props {
    summary: Summary | null;
    filters: {
        year: number;
    };
}

const props = defineProps<Props>();
const page = usePage();
const baseUrl = computed(() => page.url.split('?')[0]);

const year = ref(props.filters.year ?? new Date().getFullYear());

const applyFilter = () => {
    router.get(
        baseUrl.value,
        {
            year: year.value || undefined,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
};

const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

const totalRows = computed(() => props.summary?.total_rows ?? 0);
const totalBruto = computed(() => props.summary?.total_bruto ?? 0);
const totalPph21 = computed(() => props.summary?.total_pph21 ?? 0);
</script>

<template>
    <AppLayout>
        <Head title="Analytic Pajak" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Analytic Pajak</h1>
                    <p class="text-muted-foreground">
                        Ringkasan PPh21 per tahun pajak.
                    </p>
                </div>
            </div>

            <div class="rounded-md border p-4">
                <div class="flex flex-wrap items-end gap-4">
                    <div class="grid gap-2">
                        <label class="text-sm font-medium">Tahun Pajak</label>
                        <Input
                            v-model="year"
                            type="number"
                            min="2000"
                            max="2100"
                            class="w-[140px]"
                        />
                    </div>
                    <Button @click="applyFilter">Terapkan</Button>
                </div>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-3xl font-semibold">
                            {{ totalRows }}
                        </div>
                        <p class="text-sm text-muted-foreground">Tahun {{ year }}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total Bruto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-3xl font-semibold">
                            {{ formatCurrency(totalBruto) }}
                        </div>
                        <p class="text-sm text-muted-foreground">
                            Akumulasi pendapatan bruto
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total PPh21</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="text-3xl font-semibold">
                            {{ formatCurrency(totalPph21) }}
                        </div>
                        <p class="text-sm text-muted-foreground">Pajak terhitung</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
