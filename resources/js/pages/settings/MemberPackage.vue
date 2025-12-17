<script setup lang="ts">
import HeadingSmall from '@/components/HeadingSmall.vue';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { index } from '@/routes/member-package';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';

interface CustomerPackage {
    id: number;
    name: string;
    price: number;
    pairing: number;
    flush_out: number;
}

defineProps<{
    packages: CustomerPackage[];
}>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Paket Member',
        href: index().url,
    },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Paket Member" />

        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall
                    title="Paket Member"
                    description="Daftar paket member yang tersedia dalam sistem"
                />

                <div class="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Paket</TableHead>
                                <TableHead class="text-right"
                                    >Akumulasi Omset</TableHead
                                >
                                <TableHead class="text-right"
                                    >Bonus Pairing</TableHead
                                >
                                <TableHead class="text-right"
                                    >Flush Out Pairing</TableHead
                                >
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="pkg in packages"
                                :key="pkg.id"
                            >
                                <TableCell class="font-medium">{{
                                    pkg.name
                                }}</TableCell>
                                <TableCell class="text-right">{{
                                    formatCurrency(pkg.price)
                                }}</TableCell>
                                <TableCell class="text-right">{{
                                    formatCurrency(pkg.pairing)
                                }}</TableCell>
                                <TableCell class="text-right">{{
                                    formatCurrency(pkg.flush_out)
                                }}</TableCell>
                            </TableRow>
                            <TableRow v-if="packages.length === 0">
                                <TableCell
                                    colspan="4"
                                    class="text-center text-muted-foreground"
                                >
                                    Tidak ada data paket member
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
