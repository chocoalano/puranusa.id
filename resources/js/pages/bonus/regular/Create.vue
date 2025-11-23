<script setup lang="ts">
import { index, create, store } from '@/actions/App/Http/Controllers/BonusComission/BonusController';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/vue3';
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

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
        title: 'Bonus Regular',
        href: index.url(),
    },
    {
        title: 'Tambah Bonus',
        href: create.url(),
    },
];

const selectedMember = ref('');
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Tambah Bonus Reguler" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link :href="index.url()">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Tambah Bonus Reguler</h1>
                    <p class="text-muted-foreground">
                        Buat dan atur bonus reguler yang akan diterima oleh member.
                    </p>
                </div>
            </div>

            <!-- Form -->
            <div class="mx-auto">
                <Form
                    :action="store.url()"
                    method="post"
                    v-slot="{ errors, processing }"
                    class="space-y-6"
                    @success="
                        () =>
                            toast.success('Berhasil', {
                                description: 'Bonus berhasil dibuat.',
                            })
                    "
                    @error="
                        () =>
                            toast.error('Gagal', {
                                description: 'Terjadi kesalahan saat membuat bonus.',
                            })
                    "
                >
                    <div class="rounded-lg border bg-card p-6">
                        <HeadingSmall
                            title="Informasi Bonus"
                            description="Isi data berikut untuk menghitung dan mencatat bonus reguler member."
                        />

                        <!-- GRID FORM -->
                        <div class="mt-6 grid gap-6 md:grid-cols-2">
                            <!-- Member -->
                            <div class="grid gap-2">
                                <Label for="member_id">Member</Label>
                                <select
                                    id="member_id"
                                    name="member_id"
                                    v-model="selectedMember"
                                    required
                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                >
                                    <option value="">Pilih member...</option>
                                    <option
                                        v-for="member in members"
                                        :key="member.id"
                                        :value="member.id"
                                    >
                                        {{ member.name }} ({{ member.ewallet_id }})
                                    </option>
                                </select>
                                <p class="text-sm text-muted-foreground">
                                    Pilih member yang akan menerima bonus. Wajib diisi sebelum menyimpan.
                                </p>
                                <InputError :message="errors.member_id" />
                            </div>

                            <!-- Jumlah Bonus -->
                            <div class="grid gap-2">
                                <Label for="amount">Jumlah Bonus</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                    placeholder="0"
                                />
                                <p class="text-sm text-muted-foreground">
                                    Masukkan nominal bonus kotor (sebelum dipotong pajak), dalam Rupiah.
                                </p>
                                <InputError :message="errors.amount" />
                            </div>

                            <!-- Persentase Pajak -->
                            <div class="grid gap-2">
                                <Label for="tax_percent">Persentase Pajak (%)</Label>
                                <Input
                                    id="tax_percent"
                                    name="tax_percent"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    value="10"
                                    required
                                />
                                <p class="text-sm text-muted-foreground">
                                    Persentase pajak yang akan dipotong dari bonus. Default 10%.
                                    Ubah jika kebijakan pajak berbeda.
                                </p>
                                <InputError :message="errors.tax_percent" />
                            </div>

                            <!-- Nilai Index -->
                            <div class="grid gap-2">
                                <Label for="index_value">Nilai Indeks</Label>
                                <Input
                                    id="index_value"
                                    name="index_value"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value="1"
                                    required
                                />
                                <p class="text-sm text-muted-foreground">
                                    Nilai pengali untuk perhitungan bonus. Biarkan bernilai 1 jika tidak ada penyesuaian khusus.
                                </p>
                                <InputError :message="errors.index_value" />
                            </div>

                            <!-- Deskripsi -->
                            <div class="grid gap-2 md:col-span-2">
                                <Label for="description">Deskripsi</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="3"
                                    placeholder="Tulis catatan, alasan pemberian bonus, periode perhitungan, atau informasi lain yang relevan..."
                                    class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                />
                                <p class="text-sm text-muted-foreground">
                                    Opsional. Membantu tim keuangan dan admin memahami konteks bonus yang diberikan.
                                </p>
                                <InputError :message="errors.description" />
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <Button type="submit" :disabled="processing || !selectedMember">
                            {{ processing ? 'Menyimpan...' : 'Simpan Bonus' }}
                        </Button>
                        <Link :href="index.url()">
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    </AppLayout>
</template>
