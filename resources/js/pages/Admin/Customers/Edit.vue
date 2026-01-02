<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Search } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { index, update } from '@/actions/App/Http/Controllers/Admin/CustomerController';

interface CustomerOption {
    id: number;
    name: string;
    ewallet_id: string;
    username: string;
}

interface PackageOption {
    id: number;
    name: string;
}

interface LevelOption {
    value: string;
    label: string;
}

interface Customer {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string | null;
    ewallet_id: string;
    ewallet_saldo: number;
    email_verified_at: string | null;
    description: string | null;
    status: number;
    package_id: number | null;
    package_name: string | null;
    level: string | null;
    sponsor_id: number | null;
    sponsor_name: string | null;
    upline_id: number | null;
    upline_name: string | null;
    position: 'left' | 'right' | null;
}

interface Props {
    customer: Customer;
    customers: CustomerOption[];
    packages: PackageOption[];
    levels: LevelOption[];
}

const props = defineProps<Props>();

// Check if customer is Prospek (status = 1) or Aktif (status = 3)
const isProspek = computed(() => props.customer.status === 1);
const isAktif = computed(() => props.customer.status === 3);

// Sponsor search
const sponsorSearch = ref('');
const showSponsorDropdown = ref(false);

const filteredCustomers = computed(() => {
    if (!sponsorSearch.value) return props.customers;
    const search = sponsorSearch.value.toLowerCase();
    return props.customers.filter(c =>
        (c.name?.toLowerCase().includes(search) ?? false) ||
        (c.ewallet_id?.toLowerCase().includes(search) ?? false) ||
        (c.username?.toLowerCase().includes(search) ?? false)
    );
});

const selectedSponsor = computed(() => {
    return props.customers.find(c => c.id === form.sponsor_id);
});

const form = useForm({
    name: props.customer.name,
    username: props.customer.username,
    email: props.customer.email,
    phone: props.customer.phone || '',
    password: '',
    password_confirmation: '',
    description: props.customer.description || '',
    sponsor_id: props.customer.sponsor_id,
    package_id: props.customer.package_id?.toString() || '',
    level: props.customer.level || '',
});

// Computed property to get the selected package name for display
const selectedPackageName = computed(() => {
    if (!form.package_id) return null;
    const pkg = props.packages.find(p => p.id.toString() === form.package_id);
    return pkg?.name || null;
});

// Computed property to get the selected level name for display
const selectedLevelName = computed(() => {
    if (!form.level) return null;
    const level = props.levels.find(l => l.value === form.level);
    return level?.label || null;
});

const selectSponsor = (customer: CustomerOption) => {
    form.sponsor_id = customer.id;
    showSponsorDropdown.value = false;
    sponsorSearch.value = '';
};

const clearSponsor = () => {
    form.sponsor_id = null;
};

const closeSponsorDropdown = () => {
    // Delay to allow click event on dropdown items
    if (typeof window !== 'undefined') {
        window.setTimeout(() => {
            showSponsorDropdown.value = false;
        }, 200);
    }
};

const submit = () => {
    form.transform((data) => ({
        ...data,
        package_id: data.package_id ? parseInt(data.package_id, 10) : null,
        level: data.level || null,
    })).put(update.url(props.customer.id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Data pelanggan berhasil diperbarui');
        },
        onError: (errors) => {
            const errorMessages = Object.values(errors);
            if (errorMessages.length > 0) {
                toast.error(errorMessages[0] as string);
                if (errorMessages.length > 1) {
                    toast.warning(`Terdapat ${errorMessages.length} kesalahan pada form. Silakan periksa kembali.`);
                }
            } else {
                toast.error('Gagal memperbarui data pelanggan. Silakan periksa data yang dimasukkan.');
            }
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
                                    :class="{ 'border-destructive': form.errors.name }"
                                    required
                                />
                                <p class="text-xs text-muted-foreground">
                                    Nama lengkap sesuai identitas, maksimal 255 karakter
                                </p>
                                <p v-if="form.errors.name" class="text-sm text-destructive">
                                    {{ form.errors.name }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="username">Username *</Label>
                                <Input
                                    id="username"
                                    v-model="form.username"
                                    placeholder="contoh: johndoe123"
                                    :class="{ 'border-destructive': form.errors.username }"
                                    required
                                />
                                <p class="text-xs text-muted-foreground">
                                    Username untuk login. Hanya boleh huruf, angka, dash (-) dan underscore (_)
                                </p>
                                <p v-if="form.errors.username" class="text-sm text-destructive">
                                    {{ form.errors.username }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="email">Email *</Label>
                                <Input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    :class="{ 'border-destructive': form.errors.email }"
                                    required
                                />
                                <p class="text-xs text-muted-foreground">
                                    Email aktif untuk menerima notifikasi dan verifikasi akun
                                </p>
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
                                    :class="{ 'border-destructive': form.errors.phone }"
                                />
                                <p class="text-xs text-muted-foreground">
                                    Nomor telepon aktif (opsional), maksimal 20 karakter
                                </p>
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
                            <p class="text-xs text-muted-foreground">
                                Catatan tambahan tentang pelanggan, seperti sumber referral atau informasi penting lainnya
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- MLM Network Info -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Jaringan MLM</CardTitle>
                        <CardDescription>
                            <template v-if="isProspek">
                                Sponsor dapat diubah untuk member Prospek
                            </template>
                            <template v-else>
                                Data jaringan tidak dapat diubah untuk member aktif/pasif
                            </template>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="grid gap-4 md:grid-cols-3">
                            <!-- Sponsor - editable for Prospek -->
                            <div class="space-y-2">
                                <Label :class="{ 'text-muted-foreground': !isProspek }">Sponsor</Label>
                                <template v-if="isProspek">
                                    <!-- Editable sponsor for Prospek members -->
                                    <div v-if="selectedSponsor" class="flex items-center justify-between rounded-md border p-3">
                                        <div>
                                            <p class="font-medium">{{ selectedSponsor.name }}</p>
                                            <p class="text-xs text-muted-foreground">{{ selectedSponsor.ewallet_id }}</p>
                                        </div>
                                        <Button type="button" variant="ghost" size="sm" @click="clearSponsor">
                                            Hapus
                                        </Button>
                                    </div>
                                    <div v-else class="relative">
                                        <div class="relative">
                                            <Input
                                                v-model="sponsorSearch"
                                                @focus="showSponsorDropdown = true"
                                                @blur="closeSponsorDropdown"
                                                placeholder="Cari sponsor berdasarkan nama atau ID..."
                                                :class="{ 'border-destructive': form.errors.sponsor_id }"
                                            />
                                            <Search class="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div
                                            v-if="showSponsorDropdown && filteredCustomers.length > 0"
                                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                        >
                                            <button
                                                v-for="c in filteredCustomers"
                                                :key="c.id"
                                                type="button"
                                                @click="selectSponsor(c)"
                                                class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                            >
                                                <div class="font-medium">{{ c.name }}</div>
                                                <div class="text-xs text-muted-foreground">{{ c.ewallet_id }} (@{{ c.username }})</div>
                                            </button>
                                        </div>
                                    </div>
                                    <p class="text-xs text-muted-foreground">
                                        Pilih sponsor baru (opsional). Hanya member Pasif/Aktif yang dapat menjadi sponsor.
                                    </p>
                                    <p v-if="form.errors.sponsor_id" class="text-sm text-destructive">
                                        {{ form.errors.sponsor_id }}
                                    </p>
                                </template>
                                <template v-else>
                                    <!-- Read-only for non-Prospek members -->
                                    <div class="rounded-md border bg-muted p-3">
                                        <p class="text-sm font-medium">
                                            {{ customer.sponsor_name || '-' }}
                                        </p>
                                    </div>
                                </template>
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

                        <!-- Status indicator -->
                        <div class="mt-4 rounded-md border p-3" :class="{
                            'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900': isProspek,
                            'bg-muted': !isProspek
                        }">
                            <div class="flex items-center gap-2">
                                <Badge :variant="isProspek ? 'secondary' : 'default'">
                                    {{ customer.status === 1 ? 'Prospek' : customer.status === 2 ? 'Pasif' : 'Aktif' }}
                                </Badge>
                                <span class="text-sm text-muted-foreground">
                                    <template v-if="isProspek">
                                        Member ini masih berstatus Prospek, sponsor dapat diubah.
                                    </template>
                                    <template v-else>
                                        Member ini sudah {{ customer.status === 2 ? 'Pasif' : 'Aktif' }}, jaringan tidak dapat diubah.
                                    </template>
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Package Change (Only for Active Members) -->
                <Card>
                    <CardHeader>
                        <CardTitle>Paket Member</CardTitle>
                        <CardDescription>
                            <template v-if="isAktif">
                                Paket dapat diubah untuk member Aktif
                            </template>
                            <template v-else>
                                Paket hanya dapat diubah untuk member dengan status Aktif
                            </template>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <Label :class="{ 'text-muted-foreground': !isAktif }">Paket Saat Ini</Label>
                                <template v-if="isAktif">
                                    <!-- Editable package for Active members -->
                                    <Select v-model="form.package_id">
                                        <SelectTrigger :class="{ 'border-destructive': form.errors.package_id }">
                                            <SelectValue placeholder="Pilih paket">
                                                {{ selectedPackageName || 'Pilih paket' }}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="pkg in packages" :key="pkg.id" :value="pkg.id.toString()">
                                                {{ pkg.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p class="text-xs text-muted-foreground">
                                        Pilih paket untuk member ini: ZENNER Plus, ZENNER Prime, atau ZENNER Ultra
                                    </p>
                                    <p v-if="form.errors.package_id" class="text-sm text-destructive">
                                        {{ form.errors.package_id }}
                                    </p>
                                </template>
                                <template v-else>
                                    <!-- Read-only for non-Active members -->
                                    <div class="rounded-md border bg-muted p-3">
                                        <Badge v-if="customer.package_id" variant="outline">
                                            {{ customer.package_name }}
                                        </Badge>
                                        <span v-else class="text-sm text-muted-foreground">Belum ada paket</span>
                                    </div>
                                    <p class="text-xs text-muted-foreground">
                                        Paket akan ditetapkan saat member melakukan pembelian pertama dan menjadi Aktif.
                                    </p>
                                </template>
                            </div>

                            <!-- Status indicator for package -->
                            <div class="rounded-md border p-3" :class="{
                                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900': isAktif,
                                'bg-muted': !isAktif
                            }">
                                <div class="flex items-center gap-2">
                                    <Badge :variant="isAktif ? 'default' : 'secondary'">
                                        {{ customer.status === 1 ? 'Prospek' : customer.status === 2 ? 'Pasif' : 'Aktif' }}
                                    </Badge>
                                    <span class="text-sm text-muted-foreground">
                                        <template v-if="isAktif">
                                            Member Aktif - paket dapat diubah.
                                        </template>
                                        <template v-else>
                                            Member belum Aktif - paket tidak dapat diubah.
                                        </template>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Level/Rank Change (Only for Active Members) -->
                <Card>
                    <CardHeader>
                        <CardTitle>Peringkat Member</CardTitle>
                        <CardDescription>
                            <template v-if="isAktif">
                                Peringkat dapat diubah untuk member Aktif
                            </template>
                            <template v-else>
                                Peringkat hanya dapat diubah untuk member dengan status Aktif
                            </template>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <Label :class="{ 'text-muted-foreground': !isAktif }">Peringkat Saat Ini</Label>
                                <template v-if="isAktif">
                                    <!-- Editable level for Active members -->
                                    <Select v-model="form.level">
                                        <SelectTrigger :class="{ 'border-destructive': form.errors.level }">
                                            <SelectValue placeholder="Pilih peringkat">
                                                {{ selectedLevelName || 'Pilih peringkat' }}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="lvl in levels" :key="lvl.value" :value="lvl.value">
                                                {{ lvl.label }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p class="text-xs text-muted-foreground">
                                        Pilih peringkat untuk member ini: Associate, Senior Associate, Executive, atau Director
                                    </p>
                                    <p v-if="form.errors.level" class="text-sm text-destructive">
                                        {{ form.errors.level }}
                                    </p>
                                </template>
                                <template v-else>
                                    <!-- Read-only for non-Active members -->
                                    <div class="rounded-md border bg-muted p-3">
                                        <Badge v-if="customer.level" variant="outline">
                                            {{ customer.level }}
                                        </Badge>
                                        <span v-else class="text-sm text-muted-foreground">Belum ada peringkat</span>
                                    </div>
                                    <p class="text-xs text-muted-foreground">
                                        Peringkat akan ditetapkan saat member menjadi Aktif.
                                    </p>
                                </template>
                            </div>

                            <!-- Status indicator for level -->
                            <div class="rounded-md border p-3" :class="{
                                'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900': isAktif,
                                'bg-muted': !isAktif
                            }">
                                <div class="flex items-center gap-2">
                                    <Badge :variant="isAktif ? 'default' : 'secondary'">
                                        {{ customer.status === 1 ? 'Prospek' : customer.status === 2 ? 'Pasif' : 'Aktif' }}
                                    </Badge>
                                    <span class="text-sm text-muted-foreground">
                                        <template v-if="isAktif">
                                            Member Aktif - peringkat dapat diubah.
                                        </template>
                                        <template v-else>
                                            Member belum Aktif - peringkat tidak dapat diubah.
                                        </template>
                                    </span>
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
                                    :class="{ 'border-destructive': form.errors.password }"
                                />
                                <p class="text-xs text-muted-foreground">
                                    Password minimal 8 karakter, gunakan kombinasi huruf dan angka
                                </p>
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
                                <p class="text-xs text-muted-foreground">
                                    Ketik ulang password baru yang sama untuk konfirmasi
                                </p>
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
