<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
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
import { ArrowLeft, Search } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { index, store, findPosition } from '@/actions/App/Http/Controllers/Admin/CustomerController';

interface Customer {
    id: number;
    name: string;
    ewallet_id: string;
}

interface Props {
    customers: Customer[];
    suggestedPosition?: {
        sponsor_id: number;
        upline_id: number;
        position: 'left' | 'right';
    } | null;
}

const props = defineProps<Props>();

const form = useForm({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    sponsor_id: props.suggestedPosition?.sponsor_id || null,
    upline_id: props.suggestedPosition?.upline_id || null,
    preferred_position: (props.suggestedPosition?.position || 'left') as 'left' | 'right',
    registration_amount: 100000,
    description: '',
});

const searchSponsor = ref('');
const searchUpline = ref('');
const showSponsorDropdown = ref(false);
const showUplineDropdown = ref(false);

const selectedSponsor = computed(() => {
    return props.customers.find((c) => c.id === form.sponsor_id);
});

const selectedUpline = computed(() => {
    return props.customers.find((c) => c.id === form.upline_id);
});

const filteredSponsors = computed(() => {
    if (!searchSponsor.value) return props.customers;
    const query = searchSponsor.value.toLowerCase();
    return props.customers.filter(
        (c) =>
            c.name.toLowerCase().includes(query) || c.ewallet_id.toLowerCase().includes(query)
    );
});

const filteredUplines = computed(() => {
    if (!searchUpline.value) return props.customers;
    const query = searchUpline.value.toLowerCase();
    return props.customers.filter(
        (c) =>
            c.name.toLowerCase().includes(query) || c.ewallet_id.toLowerCase().includes(query)
    );
});

const selectSponsor = (customer: Customer) => {
    form.sponsor_id = customer.id;
    showSponsorDropdown.value = false;
    searchSponsor.value = '';
};

const selectUpline = (customer: Customer) => {
    form.upline_id = customer.id;
    showUplineDropdown.value = false;
    searchUpline.value = '';
};

const handleSponsorBlur = () => {
    if (typeof window !== 'undefined') {
        window.setTimeout(() => {
            showSponsorDropdown.value = false;
        }, 200);
    }
};

const handleUplineBlur = () => {
    if (typeof window !== 'undefined') {
        window.setTimeout(() => {
            showUplineDropdown.value = false;
        }, 200);
    }
};

const suggestPosition = () => {
    if (!form.sponsor_id) {
        toast.error('Pilih sponsor terlebih dahulu');
        return;
    }

    router.get(
        findPosition.url(),
        { sponsor_id: form.sponsor_id },
        {
            preserveState: true,
            onSuccess: (page: any) => {
                const suggested = page.props.suggestedPosition;
                if (suggested) {
                    form.upline_id = suggested.upline_id;
                    form.preferred_position = suggested.position;
                    toast.success('Posisi disarankan berhasil dimuat');
                }
            },
            onError: () => {
                toast.error('Gagal mendapatkan saran posisi');
            },
        }
    );
};

const submit = () => {
    form.post(store.url(), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Pelanggan berhasil didaftarkan');
        },
        onError: () => {
            toast.error('Gagal mendaftarkan pelanggan');
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

                            <div class="space-y-2">
                                <Label for="registration_amount">Biaya Registrasi *</Label>
                                <Input
                                    id="registration_amount"
                                    v-model.number="form.registration_amount"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    required
                                />
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
                                    required
                                />
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

                <Card>
                    <CardHeader>
                        <CardTitle>Struktur Jaringan MLM</CardTitle>
                        <CardDescription>
                            Pilih sponsor dan posisi dalam binary tree
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <!-- Sponsor Selection -->
                            <div class="space-y-2">
                                <Label for="sponsor">Sponsor *</Label>
                                <div class="relative">
                                    <div class="flex gap-2">
                                        <div class="relative flex-1">
                                            <Input
                                                v-model="searchSponsor"
                                                @focus="showSponsorDropdown = true"
                                                @blur="handleSponsorBlur"
                                                placeholder="Cari sponsor..."
                                            />
                                            <Search class="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            @click="suggestPosition"
                                            :disabled="!form.sponsor_id"
                                        >
                                            Sarankan Posisi
                                        </Button>
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

                                <div
                                    v-if="selectedSponsor"
                                    class="mt-2 rounded-md border bg-muted p-3"
                                >
                                    <p class="text-sm font-medium">{{ selectedSponsor.name }}</p>
                                    <p class="text-xs text-muted-foreground">
                                        {{ selectedSponsor.ewallet_id }}
                                    </p>
                                </div>

                                <p v-if="form.errors.sponsor_id" class="text-sm text-destructive">
                                    {{ form.errors.sponsor_id }}
                                </p>
                            </div>

                            <!-- Upline Selection -->
                            <div class="space-y-2">
                                <Label for="upline">Upline *</Label>
                                <div class="relative">
                                    <div class="relative">
                                        <Input
                                            v-model="searchUpline"
                                            @focus="showUplineDropdown = true"
                                            @blur="handleUplineBlur"
                                            placeholder="Cari upline..."
                                        />
                                        <Search class="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                    </div>

                                    <div
                                        v-if="showUplineDropdown && filteredUplines.length > 0"
                                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
                                    >
                                        <button
                                            v-for="customer in filteredUplines"
                                            :key="customer.id"
                                            type="button"
                                            @click="selectUpline(customer)"
                                            class="w-full rounded px-3 py-2 text-left text-sm hover:bg-accent"
                                        >
                                            <div class="font-medium">{{ customer.name }}</div>
                                            <div class="text-xs text-muted-foreground">
                                                {{ customer.ewallet_id }}
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div
                                    v-if="selectedUpline"
                                    class="mt-2 rounded-md border bg-muted p-3"
                                >
                                    <p class="text-sm font-medium">{{ selectedUpline.name }}</p>
                                    <p class="text-xs text-muted-foreground">
                                        {{ selectedUpline.ewallet_id }}
                                    </p>
                                </div>

                                <p v-if="form.errors.upline_id" class="text-sm text-destructive">
                                    {{ form.errors.upline_id }}
                                </p>
                            </div>
                        </div>

                        <!-- Position Selection -->
                        <div class="space-y-2">
                            <Label>Posisi Pilihan *</Label>
                            <div class="flex gap-4">
                                <div class="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="left"
                                        id="left"
                                        v-model="form.preferred_position"
                                        class="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    />
                                    <Label for="left" class="cursor-pointer font-normal">
                                        Kiri
                                    </Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="right"
                                        id="right"
                                        v-model="form.preferred_position"
                                        class="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    />
                                    <Label for="right" class="cursor-pointer font-normal">
                                        Kanan
                                    </Label>
                                </div>
                            </div>
                            <p v-if="form.errors.preferred_position" class="text-sm text-destructive">
                                {{ form.errors.preferred_position }}
                            </p>
                        </div>

                        <div
                            v-if="props.suggestedPosition"
                            class="rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 p-4"
                        >
                            <p class="text-sm font-medium text-primary">
                                💡 Posisi yang disarankan telah dimuat
                            </p>
                            <p class="mt-1 text-xs text-muted-foreground">
                                Upline dan posisi telah diatur sesuai ketersediaan dalam binary tree
                            </p>
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
