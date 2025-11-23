<script setup lang="ts">
import { index as sponsorIndex, create as sponsorCreate, store as sponsorStore } from '@/actions/App/Http/Controllers/BonusComission/BonusSponsorController';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ArrowLeft, UserPlus } from 'lucide-vue-next';

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
        title: 'Bonus Sponsor',
        href: sponsorIndex.url(),
    },
    {
        title: 'Tambah Bonus',
        href: sponsorCreate.url(),
    },
];

const form = useForm({
    type: 'registration',
    from_member_id: '',
    amount: '',
    percentage: '',
    description: '',
});

const handleSubmit = () => {
    form.post(sponsorStore.url(), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Tambah Bonus Sponsor" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Button variant="outline" size="icon" @click="router.visit(sponsorIndex.url())">
                    <ArrowLeft class="h-4 w-4" />
                </Button>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Tambah Bonus Sponsor</h1>
                    <p class="text-muted-foreground">Buat bonus sponsor baru dari aktivitas downline</p>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <UserPlus class="h-5 w-5" />
                            Informasi Bonus
                        </CardTitle>
                        <CardDescription>
                            Masukkan detail bonus sponsor yang akan diberikan
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <!-- Type -->
                        <div class="space-y-2">
                            <Label for="type">Tipe Bonus *</Label>
                            <select
                                id="type"
                                v-model="form.type"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                :class="{ 'border-destructive': form.errors.type }"
                            >
                                <option value="registration">Registrasi</option>
                                <option value="transaction">Transaksi</option>
                            </select>
                            <p v-if="form.errors.type" class="text-sm text-destructive">
                                {{ form.errors.type }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Pilih tipe bonus: dari registrasi member baru atau dari transaksi
                            </p>
                        </div>

                        <!-- Downline (Sumber) -->
                        <div class="space-y-2">
                            <Label for="from_member_id">Member (Downline) *</Label>
                            <select
                                id="from_member_id"
                                v-model="form.from_member_id"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                :class="{ 'border-destructive': form.errors.from_member_id }"
                            >
                                <option value="">Pilih member...</option>
                                <option v-for="member in members" :key="member.id" :value="member.id">
                                    {{ member.name }} ({{ member.ewallet_id }})
                                </option>
                            </select>
                            <p v-if="form.errors.from_member_id" class="text-sm text-destructive">
                                {{ form.errors.from_member_id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Sistem akan otomatis memberikan bonus kepada sponsor member ini
                            </p>
                        </div>

                        <!-- Amount -->
                        <div class="space-y-2">
                            <Label for="amount">Nilai Transaksi/Registrasi (Rp) *</Label>
                            <Input
                                id="amount"
                                v-model="form.amount"
                                type="number"
                                step="0.01"
                                placeholder="Contoh: 100000"
                                :class="{ 'border-destructive': form.errors.amount }"
                            />
                            <p v-if="form.errors.amount" class="text-sm text-destructive">
                                {{ form.errors.amount }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Nilai transaksi atau registrasi yang menjadi dasar perhitungan bonus
                            </p>
                        </div>

                        <!-- Percentage -->
                        <div class="space-y-2">
                            <Label for="percentage">Persentase Bonus (%) *</Label>
                            <Input
                                id="percentage"
                                v-model="form.percentage"
                                type="number"
                                step="0.01"
                                placeholder="Contoh: 5"
                                :class="{ 'border-destructive': form.errors.percentage }"
                            />
                            <p v-if="form.errors.percentage" class="text-sm text-destructive">
                                {{ form.errors.percentage }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Persentase bonus yang akan diberikan kepada sponsor
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
                                placeholder="Catatan tambahan tentang bonus ini..."
                                :class="{ 'border-destructive': form.errors.description }"
                            ></textarea>
                            <p v-if="form.errors.description" class="text-sm text-destructive">
                                {{ form.errors.description }}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Actions -->
                <div class="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        @click="router.visit(sponsorIndex.url())"
                        :disabled="form.processing"
                    >
                        Batal
                    </Button>
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Menyimpan...' : 'Simpan Bonus' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
