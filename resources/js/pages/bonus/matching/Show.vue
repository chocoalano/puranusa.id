<script setup lang="ts">
import { index, show, destroy, release } from '@/actions/App/Http/Controllers/BonusComission/BonusMatchingController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, CheckCircle, Layers, Trash2, Wallet, XCircle } from 'lucide-vue-next';
import { ref } from 'vue';

interface Bonus {
    id: number;
    member_id: number;
    member_name: string;
    member_ewallet_id: string;
    member_email: string;
    from_member_id: number;
    from_member_name: string;
    from_member_ewallet_id: string;
    amount: number;
    level: number;
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
        title: 'Bonus Matching',
        href: index.url(),
    },
    {
        title: 'Detail Bonus',
        href: props.bonus?.id ? show.url(props.bonus.id) : '#',
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
        <Head title="Detail Bonus Matching" />

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
                        <h1 class="text-3xl font-bold tracking-tight">Detail Bonus Matching</h1>
                        <p class="text-muted-foreground">Informasi lengkap bonus matching</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Badge
                        variant="outline"
                        class="gap-1 text-sm px-3 py-1"
                    >
                        <Layers class="h-3 w-3" />
                        Level {{ bonus.level }}
                    </Badge>
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
                        <div>
                            <p class="text-sm text-muted-foreground">Jumlah</p>
                            <p class="text-2xl font-bold text-green-600">
                                {{ formatCurrency(bonus.amount) }}
                            </p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-muted-foreground">Level</p>
                                <p class="font-medium">{{ bonus.level }}</p>
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

                <!-- Member Info (Penerima) -->
                <Card>
                    <CardHeader>
                        <CardTitle>Penerima Bonus</CardTitle>
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

                <!-- From Member Info (Sumber) -->
                <Card>
                    <CardHeader>
                        <CardTitle>Sumber Bonus</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div>
                            <p class="text-sm text-muted-foreground">Nama</p>
                            <p class="font-medium">{{ bonus.from_member_name }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Ewallet ID</p>
                            <p class="font-medium">{{ bonus.from_member_ewallet_id }}</p>
                        </div>
                        <div class="text-sm text-muted-foreground">
                            Bonus ini berasal dari aktivitas member di atas
                        </div>
                    </CardContent>
                </Card>

                <!-- Timeline -->
                <Card>
                    <CardHeader>
                        <CardTitle>Timeline</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3">
                        <div>
                            <p class="text-sm text-muted-foreground">Dibuat</p>
                            <p class="font-medium">{{ formatDate(bonus.created_at) }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Terakhir Diupdate</p>
                            <p class="font-medium">{{ formatDate(bonus.updated_at) }}</p>
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
            :description="`Bonus sebesar ${formatCurrency(bonus.amount)} akan ditransfer ke ewallet ${bonus.member_name}. Lanjutkan?`"
            confirm-text="Release"
            cancel-text="Batal"
            @confirm="handleRelease"
        />
    </AppLayout>
</template>
