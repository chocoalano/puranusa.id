<script setup lang="ts">
import { index, create, store } from '@/actions/App/Http/Controllers/BonusComission/BonusPairingController';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ArrowLeft, GitMerge } from 'lucide-vue-next';

interface Member {
    id: number;
    name: string;
    ewallet_id: string;
}

interface Props {
    members: Member[];
}

defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Bonus Pairing',
        href: index.url(),
    },
    {
        title: 'Tambah Bonus',
        href: create.url(),
    },
];

const form = useForm({
    member_id: '',
    bonus_per_pair: '',
    max_pairs: '',
    description: '',
});

const handleSubmit = () => {
    form.post(store.url(), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Tambah Bonus Pairing" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Button variant="outline" size="icon" @click="router.visit(index.url())">
                    <ArrowLeft class="h-4 w-4" />
                </Button>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Tambah Bonus Pairing</h1>
                    <p class="text-muted-foreground">Proses bonus pairing untuk member tertentu</p>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <GitMerge class="h-5 w-5" />
                            Informasi Pairing
                        </CardTitle>
                        <CardDescription>
                            Masukkan detail untuk memproses bonus pairing member
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <!-- Member -->
                        <div class="space-y-2">
                            <Label for="member_id">Member *</Label>
                            <select
                                id="member_id"
                                v-model="form.member_id"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                :class="{ 'border-destructive': form.errors.member_id }"
                            >
                                <option value="">Pilih member...</option>
                                <option v-for="member in members" :key="member.id" :value="member.id">
                                    {{ member.name }} ({{ member.ewallet_id }})
                                </option>
                            </select>
                            <p v-if="form.errors.member_id" class="text-sm text-destructive">
                                {{ form.errors.member_id }}
                            </p>
                        </div>

                        <!-- Bonus Per Pair -->
                        <div class="space-y-2">
                            <Label for="bonus_per_pair">Bonus Per Pasang (Rp) *</Label>
                            <Input
                                id="bonus_per_pair"
                                v-model="form.bonus_per_pair"
                                type="number"
                                step="0.01"
                                placeholder="Contoh: 50000"
                                :class="{ 'border-destructive': form.errors.bonus_per_pair }"
                            />
                            <p v-if="form.errors.bonus_per_pair" class="text-sm text-destructive">
                                {{ form.errors.bonus_per_pair }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Jumlah bonus yang diberikan per pasangan kiri-kanan
                            </p>
                        </div>

                        <!-- Max Pairs -->
                        <div class="space-y-2">
                            <Label for="max_pairs">Maksimal Pasangan</Label>
                            <Input
                                id="max_pairs"
                                v-model="form.max_pairs"
                                type="number"
                                placeholder="Kosongkan untuk tidak dibatasi"
                                :class="{ 'border-destructive': form.errors.max_pairs }"
                            />
                            <p v-if="form.errors.max_pairs" class="text-sm text-destructive">
                                {{ form.errors.max_pairs }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Opsional - batasi jumlah pasangan yang diproses
                            </p>
                        </div>

                        <!-- Description -->
                        <div class="space-y-2">
                            <Label for="description">Keterangan</Label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                rows="3"
                                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                placeholder="Catatan tambahan tentang proses pairing ini..."
                                :class="{ 'border-destructive': form.errors.description }"
                            ></textarea>
                            <p v-if="form.errors.description" class="text-sm text-destructive">
                                {{ form.errors.description }}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Info Card -->
                <Card class="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                    <CardHeader>
                        <CardTitle class="text-blue-900 dark:text-blue-100">
                            Tentang Bonus Pairing
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <p>
                            Sistem akan menghitung pasangan dari downline kiri dan kanan member, kemudian
                            memberikan bonus berdasarkan jumlah pasangan yang terbentuk.
                        </p>
                        <p>
                            Rumus: <span class="font-mono font-semibold">Total Bonus = Jumlah Pasangan × Bonus Per Pasang</span>
                        </p>
                    </CardContent>
                </Card>

                <!-- Actions -->
                <div class="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        @click="router.visit(index.url())"
                        :disabled="form.processing"
                    >
                        Batal
                    </Button>
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Memproses...' : 'Proses Pairing' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
