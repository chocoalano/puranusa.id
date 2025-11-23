<script setup lang="ts">
import { index, show, destroy, release } from '@/actions/App/Http/Controllers/BonusComission/BonusPairingController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    DollarSign,
    GitMerge,
    Hash,
    Trash2,
    User,
    Wallet,
    XCircle,
} from 'lucide-vue-next';
import { ref } from 'vue';

interface Bonus {
    id: number;
    member_id: number;
    member_name: string;
    member_ewallet_id: string;
    amount: number;
    pair_count: number;
    bonus_per_pair: number;
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
        title: 'Bonus Pairing',
        href: index.url(),
    },
    {
        title: `Detail Bonus #${props.bonus.id}`,
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
    router.delete(destroy.url(props.bonus.id), {
        onSuccess: () => {
            router.visit(index.url());
        },
    });
};

const handleRelease = () => {
    router.post(release.url(props.bonus.id), {}, {
        preserveScroll: true,
        onSuccess: () => {
            releaseDialog.value = false;
        },
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="`Detail Bonus Pairing #${bonus.id}`" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Button variant="outline" size="icon" @click="router.visit(index.url())">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Detail Bonus Pairing</h1>
                        <p class="text-muted-foreground">ID: #{{ bonus.id }}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Badge v-if="bonus.status === 1" variant="default" class="gap-1">
                        <CheckCircle class="h-3 w-3" />
                        {{ bonus.status_text }}
                    </Badge>
                    <Badge v-else variant="secondary" class="gap-1">
                        <XCircle class="h-3 w-3" />
                        {{ bonus.status_text }}
                    </Badge>
                </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
                <!-- Bonus Info -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <DollarSign class="h-5 w-5" />
                            Informasi Bonus
                        </CardTitle>
                        <CardDescription>Detail jumlah dan perhitungan pairing</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Hash class="h-4 w-4" />
                                <span>ID Bonus</span>
                            </div>
                            <p class="text-lg font-semibold">#{{ bonus.id }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <DollarSign class="h-4 w-4" />
                                <span>Total Bonus</span>
                            </div>
                            <p class="text-2xl font-bold">{{ formatCurrency(bonus.amount) }}</p>
                        </div>

                        <div class="rounded-lg border bg-muted/50 p-4 space-y-3">
                            <p class="text-sm font-medium text-muted-foreground">Perhitungan:</p>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">Jumlah Pasangan:</span>
                                    <span class="font-semibold">{{ bonus.pair_count }} pasang</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">Bonus Per Pasang:</span>
                                    <span class="font-semibold">{{ formatCurrency(bonus.bonus_per_pair) }}</span>
                                </div>
                                <div class="h-px bg-border"></div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium">Total:</span>
                                    <span class="font-bold text-lg">{{ formatCurrency(bonus.amount) }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Index Value</span>
                            </div>
                            <p class="font-medium">{{ bonus.index_value }}</p>
                        </div>

                        <div v-if="bonus.description" class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Keterangan</span>
                            </div>
                            <p class="text-sm">{{ bonus.description }}</p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Member Info -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <User class="h-5 w-5" />
                            Informasi Member
                        </CardTitle>
                        <CardDescription>Member yang menerima bonus pairing</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <User class="h-4 w-4" />
                                <span>Nama</span>
                            </div>
                            <p class="text-lg font-semibold">{{ bonus.member_name }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Wallet class="h-4 w-4" />
                                <span>ID E-Wallet</span>
                            </div>
                            <p class="font-mono font-medium">{{ bonus.member_ewallet_id }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Hash class="h-4 w-4" />
                                <span>Member ID</span>
                            </div>
                            <p class="font-medium">#{{ bonus.member_id }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <GitMerge class="h-4 w-4" />
                                <span>Pasangan Terbentuk</span>
                            </div>
                            <Badge variant="outline" class="text-base">
                                {{ bonus.pair_count }} Pasang
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <!-- Timeline -->
                <Card class="lg:col-span-2">
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Calendar class="h-5 w-5" />
                            Timeline
                        </CardTitle>
                        <CardDescription>Riwayat waktu bonus</CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4 md:grid-cols-2">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar class="h-4 w-4" />
                                <span>Dibuat</span>
                            </div>
                            <p class="font-medium">{{ formatDate(bonus.created_at) }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar class="h-4 w-4" />
                                <span>Terakhir Diperbarui</span>
                            </div>
                            <p class="font-medium">{{ formatDate(bonus.updated_at) }}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Actions -->
            <div v-if="bonus.status === 0" class="flex justify-end gap-4">
                <Button variant="outline" @click="deleteDialog = true">
                    <Trash2 class="h-4 w-4 text-destructive" />
                    Hapus
                </Button>
                <Button @click="releaseDialog = true">
                    <Wallet class="h-4 w-4" />
                    Release Bonus
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
            :description="`Bonus sebesar ${formatCurrency(bonus.amount)} (${bonus.pair_count} pasang) akan ditransfer ke ewallet ${bonus.member_name}. Lanjutkan?`"
            confirm-text="Release"
            cancel-text="Batal"
            @confirm="handleRelease"
        />
    </AppLayout>
</template>
