<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { index, update } from '@/actions/App/Http/Controllers/Admin/CustomerController';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    ewallet_id: string;
    ewallet_saldo: number;
    email_verified_at: string | null;
    description: string | null;
    sponsor_id: number | null;
    sponsor_name: string | null;
    upline_id: number | null;
    upline_name: string | null;
    position: 'left' | 'right' | null;
}

interface Props {
    customer: Customer;
}

const props = defineProps<Props>();

const form = useForm({
    name: props.customer.name,
    email: props.customer.email,
    phone: props.customer.phone || '',
    password: '',
    password_confirmation: '',
    description: props.customer.description || '',
});

const submit = () => {
    form.put(update.url(props.customer.id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Data pelanggan berhasil diperbarui');
        },
        onError: () => {
            toast.error('Gagal memperbarui data pelanggan');
        },
    });
};
</script>

<template>
    <Head :title="`Edit ${customer.name}`" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Edit Pelanggan</h1>
                    <p class="mt-2 text-muted-foreground">
                        Perbarui informasi pelanggan
                    </p>
                </div>
                <Link :href="index.url()">
                    <Button variant="outline">
                        <ArrowLeft class="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <!-- Customer Info Card -->
                <Card>
                    <CardHeader>
                        <div class="flex items-center justify-between">
                            <div>
                                <CardTitle>Informasi Akun</CardTitle>
                                <CardDescription>ID Ewallet: {{ customer.ewallet_id }}</CardDescription>
                            </div>
                            <div class="flex items-center gap-2">
                                <Badge variant="outline">
                                    Saldo: Rp {{ customer.ewallet_saldo.toLocaleString('id-ID') }}
                                </Badge>
                                <Badge v-if="customer.email_verified_at" variant="default">
                                    Terverifikasi
                                </Badge>
                                <Badge v-else variant="secondary">
                                    Belum Verifikasi
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    v-model="form.name"
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                                <p v-if="form.errors.name" class="text-sm text-destructive">
                                    {{ form.errors.name }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="email">Email *</Label>
                                <Input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    required
                                />
                                <p v-if="form.errors.email" class="text-sm text-destructive">
                                    {{ form.errors.email }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="phone">No. Telepon</Label>
                                <Input
                                    id="phone"
                                    v-model="form.phone"
                                    placeholder="08xxxxxxxxxx"
                                />
                                <p v-if="form.errors.phone" class="text-sm text-destructive">
                                    {{ form.errors.phone }}
                                </p>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <Label for="description">Keterangan</Label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                placeholder="Keterangan tambahan (opsional)"
                                rows="3"
                                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                        </div>
                    </CardContent>
                </Card>

                <!-- MLM Network Info (Read Only) -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Jaringan MLM</CardTitle>
                        <CardDescription>
                            Data jaringan tidak dapat diubah
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="grid gap-4 md:grid-cols-3">
                            <div class="space-y-2">
                                <Label class="text-muted-foreground">Sponsor</Label>
                                <div class="rounded-md border bg-muted p-3">
                                    <p class="text-sm font-medium">
                                        {{ customer.sponsor_name || '-' }}
                                    </p>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <Label class="text-muted-foreground">Upline</Label>
                                <div class="rounded-md border bg-muted p-3">
                                    <p class="text-sm font-medium">
                                        {{ customer.upline_name || '-' }}
                                    </p>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <Label class="text-muted-foreground">Posisi</Label>
                                <div class="rounded-md border bg-muted p-3">
                                    <Badge v-if="customer.position" variant="outline">
                                        {{ customer.position === 'left' ? 'Kiri' : 'Kanan' }}
                                    </Badge>
                                    <span v-else class="text-sm">-</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Password Change -->
                <Card>
                    <CardHeader>
                        <CardTitle>Ubah Password</CardTitle>
                        <CardDescription>
                            Kosongkan jika tidak ingin mengubah password
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="password">Password Baru</Label>
                                <Input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    placeholder="Minimal 8 karakter"
                                />
                                <p v-if="form.errors.password" class="text-sm text-destructive">
                                    {{ form.errors.password }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="password_confirmation">Konfirmasi Password</Label>
                                <Input
                                    id="password_confirmation"
                                    v-model="form.password_confirmation"
                                    type="password"
                                    placeholder="Ulangi password"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div class="flex justify-end gap-4">
                    <Link :href="index.url()">
                        <Button type="button" variant="outline">
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
