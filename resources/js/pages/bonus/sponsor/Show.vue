<script setup lang="ts">
import { index as sponsorIndex, show as sponsorShow, destroy as sponsorDestroy, release as sponsorRelease } from '@/actions/App/Http/Controllers/BonusComission/BonusSponsorController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    DollarSign,
    Hash,
    Trash2,
    User,
    UserCheck,
    Wallet,
    XCircle,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';

interface Bonus {
    id: number;
    member_id: number;
    member_name: string;
    member_ewallet_id: string;
    from_member_id: number;
    from_member_name: string;
    from_member_ewallet_id: string;
    amount: number;
    percentage?: number;
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

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    {
        title: 'Bonus Sponsor',
        href: sponsorIndex.url(),
    },
    {
        title: props.bonus?.id ? `Detail Bonus #${props.bonus.id}` : 'Detail Bonus',
        href: props.bonus?.id ? sponsorShow.url(props.bonus.id) : '#',
    },
]);

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
    if (!props.bonus?.id) return;

    const deleteForm = useForm({});
    deleteForm.delete(sponsorDestroy.url(props.bonus.id), {
        onSuccess: () => {
            router.visit(sponsorIndex.url());
        },
    });
};

const handleRelease = () => {
    if (!props.bonus?.id) return;

    const releaseForm = useForm({});
    releaseForm.post(sponsorRelease.url(props.bonus.id), {
        preserveScroll: true,
        onSuccess: () => {
            releaseDialog.value = false;
        },
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="bonus?.id ? `Detail Bonus Sponsor #${bonus.id}` : 'Detail Bonus Sponsor'" />

        <div v-if="bonus" class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Button variant="outline" size="icon" @click="router.visit(sponsorIndex.url())">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Detail Bonus Sponsor</h1>
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
                        <CardDescription>Detail jumlah dan status bonus</CardDescription>
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
                                <span>Jumlah Bonus</span>
                            </div>
                            <p class="text-2xl font-bold">{{ formatCurrency(bonus.amount) }}</p>
                        </div>

                        <div v-if="bonus.percentage" class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Persentase</span>
                            </div>
                            <p class="text-lg font-semibold">{{ bonus.percentage }}%</p>
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

                <!-- Member Info (Sponsor - Penerima) -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <User class="h-5 w-5" />
                            Sponsor (Penerima)
                        </CardTitle>
                        <CardDescription>Informasi member yang menerima bonus</CardDescription>
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
                    </CardContent>
                </Card>

                <!-- From Member Info (Downline - Sumber) -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <UserCheck class="h-5 w-5" />
                            Downline (Sumber)
                        </CardTitle>
                        <CardDescription>Member yang memicu bonus ini</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <User class="h-4 w-4" />
                                <span>Nama</span>
                            </div>
                            <p class="text-lg font-semibold">{{ bonus.from_member_name }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Wallet class="h-4 w-4" />
                                <span>ID E-Wallet</span>
                            </div>
                            <p class="font-mono font-medium">{{ bonus.from_member_ewallet_id }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Hash class="h-4 w-4" />
                                <span>Member ID</span>
                            </div>
                            <p class="font-medium">#{{ bonus.from_member_id }}</p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Timeline -->
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <Calendar class="h-5 w-5" />
                            Timeline
                        </CardTitle>
                        <CardDescription>Riwayat waktu bonus</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
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
            :description="`Bonus sebesar ${formatCurrency(bonus.amount)} akan ditransfer ke ewallet ${bonus.member_name}. Lanjutkan?`"
            confirm-text="Release"
            cancel-text="Batal"
            @confirm="handleRelease"
        />
    </AppLayout>
</template>
