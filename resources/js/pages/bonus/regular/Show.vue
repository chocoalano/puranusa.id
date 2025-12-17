<script setup lang="ts">
import { index, show, destroy, release } from '@/actions/App/Http/Controllers/BonusComission/BonusController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, CheckCircle, Trash2, Wallet, XCircle } from 'lucide-vue-next';
import { ref } from 'vue';

interface Bonus {
    id: number;
    member_id: number;
    member_name: string;
    member_ewallet_id: string;
    member_email: string;
    amount: number;
    tax_amount: number;
    tax_netto: number;
    index_value: number;
    status: number;
    status_text: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    bonus: Bonus;
}

const props = defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Bonus Regular',
        href: index.url(),
    },
    {
        title: 'Detail Bonus',
        href: show.url(props.bonus.id),
    },
];

const deleteDialog = ref(false);
const releaseDialog = ref(false);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const handleDelete = () => {
    const deleteForm = useForm({});
    deleteForm.delete(destroy.url(props.bonus.id), {
        onSuccess: () => {
            window.location.href = index.url();
        },
    });
};

const handleRelease = () => {
    const releaseForm = useForm({});
    releaseForm.post(release.url(props.bonus.id), {
        preserveScroll: true,
        onSuccess: () => {
            releaseDialog.value = false;
        },
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Detail Bonus Regular" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Link :href="index.url()">
                        <Button variant="outline" size="icon">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Detail Bonus Regular</h1>
                        <p class="text-muted-foreground">Informasi lengkap bonus</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Badge
                        :variant="bonus.status === 1 ? 'default' : 'secondary'"
                        class="gap-1 text-sm px-3 py-1"
                    >
                        <component
                            :is="bonus.status === 1 ? CheckCircle : XCircle"
                            class="h-3 w-3"
                        />
                        {{ bonus.status_text }}
                    </Badge>
                </div>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
                <!-- Bonus Info -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Bonus</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-muted-foreground">Jumlah Awal</p>
                                <p class="text-lg font-semibold">{{ formatCurrency(bonus.amount) }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">Pajak</p>
                                <p class="text-lg font-semibold text-red-600">
                                    {{ formatCurrency(bonus.tax_amount) }}
                                </p>
                            </div>
                            <div class="col-span-2">
                                <p class="text-sm text-muted-foreground">Netto (Diterima)</p>
                                <p class="text-2xl font-bold text-green-600">
                                    {{ formatCurrency(bonus.tax_netto) }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">Index Value</p>
                                <p class="font-medium">{{ bonus.index_value }}</p>
                            </div>
                        </div>
                        <div v-if="bonus.description">
                            <p class="text-sm text-muted-foreground">Deskripsi</p>
                            <p class="mt-1">{{ bonus.description }}</p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Member Info -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Member</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div>
                            <p class="text-sm text-muted-foreground">Nama</p>
                            <p class="font-medium">{{ bonus.member_name }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Ewallet ID</p>
                            <p class="font-medium">{{ bonus.member_ewallet_id }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Email</p>
                            <p class="font-medium">{{ bonus.member_email }}</p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Timeline -->
                <Card class="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Timeline</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-muted-foreground">Dibuat</p>
                                <p class="font-medium">{{ formatDate(bonus.created_at) }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">Terakhir Diupdate</p>
                                <p class="font-medium">{{ formatDate(bonus.updated_at) }}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Actions -->
            <div v-if="bonus.status === 0" class="flex gap-2">
                <Button @click="releaseDialog = true">
                    <Wallet class="h-4 w-4" />
                    Release Bonus
                </Button>
                <Button variant="destructive" @click="deleteDialog = true">
                    <Trash2 class="h-4 w-4" />
                    Hapus
                </Button>
            </div>
        </div>

        <!-- Delete Dialog -->
        <ConfirmDialog
            v-model:open="deleteDialog"
            title="Hapus Bonus?"
            description="Apakah Anda yakin ingin menghapus bonus ini? Tindakan ini tidak dapat dibatalkan."
            confirm-text="Hapus"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleDelete"
        />

        <!-- Release Dialog -->
        <ConfirmDialog
            v-model:open="releaseDialog"
            title="Release Bonus?"
            :description="`Bonus sebesar ${formatCurrency(bonus.tax_netto)} akan ditransfer ke ewallet ${bonus.member_name}. Lanjutkan?`"
            confirm-text="Release"
            cancel-text="Batal"
            @confirm="handleRelease"
        />
    </AppLayout>
</template>
