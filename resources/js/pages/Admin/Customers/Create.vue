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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Search } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { index, store } from '@/actions/App/Http/Controllers/Admin/CustomerController';

interface Customer {
    id: number;
    name: string;
    ewallet_id: string;
}

interface LevelOption {
    value: string;
    label: string;
}

interface PackageOption {
    id: number;
    name: string;
}

interface Props {
    customers: Customer[];
    levels: LevelOption[];
    packages: PackageOption[];
}

const props = defineProps<Props>();

const form = useForm({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    sponsor_id: null as number | null,
    status: '1' as string, // 1 = Prospek, 2 = Pasif, 3 = Aktif
    registration_amount: 100000,
    description: '',
    level: '' as string,
    package_id: '' as string,
});

// Check if status is Aktif
const isAktif = computed(() => form.status === '3');

// Computed property to get the selected level name for display
const selectedLevelName = computed(() => {
    if (!form.level) return null;
    const level = props.levels.find(l => l.value === form.level);
    return level?.label || null;
});

// Computed property to get the selected package name for display
const selectedPackageName = computed(() => {
    if (!form.package_id) return null;
    const pkg = props.packages.find(p => p.id.toString() === form.package_id);
    return pkg?.name || null;
});

// Get status display text
const getStatusText = computed(() => {
    switch (form.status) {
        case '1': return 'Prospek';
        case '2': return 'Pasif';
        case '3': return 'Aktif';
        default: return 'Pilih status';
    }
});

const searchSponsor = ref('');
const showSponsorDropdown = ref(false);

const selectedSponsor = computed(() => {
    return props.customers.find((c) => c.id === form.sponsor_id);
});

const filteredSponsors = computed(() => {
    if (!searchSponsor.value) return props.customers;
    const query = searchSponsor.value.toLowerCase();
    return props.customers.filter(
        (c) =>
            (c.name?.toLowerCase().includes(query) ?? false) ||
            (c.ewallet_id?.toLowerCase().includes(query) ?? false)
    );
});

const selectSponsor = (customer: Customer) => {
    form.sponsor_id = customer.id;
    showSponsorDropdown.value = false;
    searchSponsor.value = '';
};

const handleSponsorBlur = () => {
    if (typeof window !== 'undefined') {
        window.setTimeout(() => {
            showSponsorDropdown.value = false;
        }, 200);
    }
};

const submit = () => {
    form.transform((data) => ({
        ...data,
        status: parseInt(data.status, 10),
        package_id: data.package_id ? parseInt(data.package_id, 10) : null,
        level: data.level || null,
    })).post(store.url(), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Pelanggan berhasil didaftarkan');
        },
        onError: (errors) => {
            const errorMessages = Object.values(errors);
            if (errorMessages.length > 0) {
                // Show first error in toast
                toast.error(errorMessages[0] as string);

                // If there are multiple errors, show summary
                if (errorMessages.length > 1) {
                    toast.warning(`Terdapat ${errorMessages.length} kesalahan pada form. Silakan periksa kembali.`);
                }
            } else {
                toast.error('Gagal mendaftarkan pelanggan. Silakan periksa data yang dimasukkan.');
            }
        },
    });
};
</script>

<template>
    <Head title="Tambah Pelanggan" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Tambah Pelanggan</h1>
                    <p class="mt-2 text-muted-foreground">
                        Daftarkan pelanggan baru ke dalam sistem MLM
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
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Pribadi</CardTitle>
                        <CardDescription>
                            Data pribadi pelanggan yang akan didaftarkan
                        </CardDescription>
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
                                    Email aktif untuk notifikasi dan verifikasi. Satu email dapat digunakan maksimal 7 akun.
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

                            <div class="space-y-2">
                                <Label for="registration_amount">Biaya Registrasi *</Label>
                                <Input
                                    id="registration_amount"
                                    v-model.number="form.registration_amount"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    :class="{ 'border-destructive': form.errors.registration_amount }"
                                    required
                                />
                                <p class="text-xs text-muted-foreground">
                                    Biaya pendaftaran dalam Rupiah (Rp), minimal 0
                                </p>
                                <p v-if="form.errors.registration_amount" class="text-sm text-destructive">
                                    {{ form.errors.registration_amount }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="password">Password *</Label>
                                <Input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    placeholder="Minimal 8 karakter"
                                    :class="{ 'border-destructive': form.errors.password }"
                                    required
                                />
                                <p class="text-xs text-muted-foreground">
                                    Password minimal 8 karakter, gunakan kombinasi huruf dan angka
                                </p>
                                <p v-if="form.errors.password" class="text-sm text-destructive">
                                    {{ form.errors.password }}
                                </p>
                            </div>

                            <div class="space-y-2">
                                <Label for="password_confirmation">Konfirmasi Password *</Label>
                                <Input
                                    id="password_confirmation"
                                    v-model="form.password_confirmation"
                                    type="password"
                                    placeholder="Ulangi password"
                                    required
                                />
                                <p class="text-xs text-muted-foreground">
                                    Ketik ulang password yang sama untuk konfirmasi
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

                <Card>
                    <CardHeader>
                        <CardTitle>Struktur Jaringan MLM</CardTitle>
                        <CardDescription>
                            Pilih sponsor dan status pelanggan
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <!-- Sponsor Selection -->
                            <div class="space-y-2">
                                <Label for="sponsor">Sponsor</Label>

                                <!-- Selected Sponsor Display -->
                                <div
                                    v-if="selectedSponsor"
                                    class="flex items-center justify-between rounded-md border bg-muted p-3"
                                >
                                    <div>
                                        <p class="text-sm font-medium">{{ selectedSponsor.name }}</p>
                                        <p class="text-xs text-muted-foreground">
                                            {{ selectedSponsor.ewallet_id }}
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        @click="form.sponsor_id = null"
                                    >
                                        Hapus
                                    </Button>
                                </div>

                                <!-- Search Input -->
                                <div v-else class="relative">
                                    <div class="relative">
                                        <Input
                                            v-model="searchSponsor"
                                            @focus="showSponsorDropdown = true"
                                            @blur="handleSponsorBlur"
                                            placeholder="Cari sponsor berdasarkan nama atau ID..."
                                            :class="{ 'border-destructive': form.errors.sponsor_id }"
                                        />
                                        <Search class="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                    </div>

                                    <div
                                        v-if="showSponsorDropdown && filteredSponsors.length > 0"
                                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                    >
                                        <button
                                            v-for="customer in filteredSponsors"
                                            :key="customer.id"
                                            type="button"
                                            @click="selectSponsor(customer)"
                                            class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                        >
                                            <div class="font-medium">{{ customer.name }}</div>
                                            <div class="text-xs text-muted-foreground">
                                                {{ customer.ewallet_id }}
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <p class="text-xs text-muted-foreground">
                                    Member yang merekomendasikan pelanggan ini (opsional). Kosongkan jika tidak ada sponsor
                                </p>
                                <p v-if="form.errors.sponsor_id" class="text-sm text-destructive">
                                    {{ form.errors.sponsor_id }}
                                </p>
                            </div>

                            <!-- Status Selection -->
                            <div class="space-y-2">
                                <Label for="status">Status *</Label>
                                <Select v-model="form.status">
                                    <SelectTrigger :class="{ 'border-destructive': form.errors.status }">
                                        <SelectValue placeholder="Pilih status">
                                            {{ getStatusText }}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Prospek</SelectItem>
                                        <SelectItem value="2">Pasif</SelectItem>
                                        <SelectItem value="3">Aktif</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p class="text-xs text-muted-foreground">
                                    <strong>Prospek:</strong> Calon member, belum masuk jaringan MLM<br>
                                    <strong>Pasif:</strong> Sudah terdaftar tapi belum aktif bertransaksi<br>
                                    <strong>Aktif:</strong> Member aktif dengan paket dan peringkat
                                </p>
                                <p v-if="form.errors.status" class="text-sm text-destructive">
                                    {{ form.errors.status }}
                                </p>
                            </div>
                        </div>

                        <!-- Package & Level for Active Members -->
                        <div v-if="isAktif" class="grid gap-4 md:grid-cols-2 mt-4 p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                            <div class="md:col-span-2">
                                <p class="text-sm font-medium text-green-800 dark:text-green-200 mb-3">Member Aktif - Pilih Paket dan Peringkat</p>
                            </div>

                            <!-- Package Selection -->
                            <div class="space-y-2">
                                <Label for="package_id">Paket *</Label>
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
                                    Pilih paket: ZENNER Plus, ZENNER Prime, atau ZENNER Ultra
                                </p>
                                <p v-if="form.errors.package_id" class="text-sm text-destructive">
                                    {{ form.errors.package_id }}
                                </p>
                            </div>

                            <!-- Level Selection -->
                            <div class="space-y-2">
                                <Label for="level">Peringkat</Label>
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
                                    Pilih peringkat: Associate, Senior Associate, Executive, atau Director
                                </p>
                                <p v-if="form.errors.level" class="text-sm text-destructive">
                                    {{ form.errors.level }}
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
                        {{ form.processing ? 'Menyimpan...' : 'Simpan Pelanggan' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
