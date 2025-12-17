<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    ArrowLeft,
    Pencil,
    Trash2,
    TrendingUp,
    Users,
    Wallet,
    DollarSign,
    Gift,
} from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import {
    index,
    edit,
    destroy,
    releaseBonuses as releaseBonusesAction,
    topUp as topUpAction,
    deduct as deductAction,
} from '@/actions/App/Http/Controllers/Admin/CustomerController';

interface Address {
    id: number;
    type: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    is_primary: boolean;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    ewallet_id: string;
    ewallet_saldo: number;
    email_verified_at: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
    upline: { id: number; name: string; email: string; ewallet_id: string } | null;
    sponsor: { id: number; name: string; email: string; ewallet_id: string } | null;
    position: 'left' | 'right' | null;
    level: number | null;
    addresses: Address[];
}

interface Statistics {
    totalDownlines: number;
    leftDownlines: number;
    rightDownlines: number;
    totalBonuses: number;
    totalBonusesThisMonth: number;
    matrixLevel: number;
}

interface Bonus {
    id: number;
    amount: number;
    description: string | null;
    status: string;
    released_at: string | null;
    created_at: string;
}

interface DownlineNode {
    id: number;
    name: string;
    ewallet_id: string;
    position: 'left' | 'right' | null;
    level: number;
    children?: DownlineNode[];
}

interface Props {
    customer: Customer;
    statistics?: Statistics | null;
    recentBonuses: {
        regular: Bonus[];
        matching: Bonus[];
        pairing: Bonus[];
        sponsor: Bonus[];
    };
    downlineTree?: DownlineNode | null;
}

const props = defineProps<Props>();

// Dialog states
const topUpDialog = ref(false);
const deductDialog = ref(false);
const deleteDialog = ref(false);

const topUpAmount = ref(0);
const topUpDescription = ref('');
const deductAmount = ref(0);
const deductDescription = ref('');

const handleReleaseBonuses = () => {
    const releaseForm = useForm({});
    releaseForm.post(releaseBonusesAction.url(props.customer.id), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Bonus berhasil dirilis');
        },
        onError: () => {
            toast.error('Gagal release bonus');
        },
    });
};

const handleTopUp = () => {
    if (topUpAmount.value <= 0) {
        toast.error('Jumlah top up harus lebih dari 0');
        return;
    }

    const topUpForm = useForm({
        amount: topUpAmount.value,
        description: topUpDescription.value,
    });
    topUpForm.post(
        topUpAction.url(props.customer.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Saldo berhasil ditambahkan: Rp ${topUpAmount.value.toLocaleString('id-ID')}`);
                topUpDialog.value = false;
                topUpAmount.value = 0;
                topUpDescription.value = '';
            },
            onError: () => {
                toast.error('Gagal top up saldo');
            },
        }
    );
};

const handleDeduct = () => {
    if (deductAmount.value <= 0) {
        toast.error('Jumlah pengurangan harus lebih dari 0');
        return;
    }

    const currentSaldo = props.customer.ewallet_saldo || 0;
    if (deductAmount.value > currentSaldo) {
        toast.error('Jumlah pengurangan melebihi saldo');
        return;
    }

    const deductForm = useForm({
        amount: deductAmount.value,
        description: deductDescription.value,
    });
    deductForm.post(
        deductAction.url(props.customer.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Saldo berhasil dikurangi: Rp ${deductAmount.value.toLocaleString('id-ID')}`);
                deductDialog.value = false;
                deductAmount.value = 0;
                deductDescription.value = '';
            },
            onError: () => {
                toast.error('Gagal mengurangi saldo');
            },
        }
    );
};

const handleDelete = () => {
    router.delete(destroy.url(props.customer.id), {
        onSuccess: () => {
            toast.success('Pelanggan berhasil dihapus');
        },
        onError: () => {
            toast.error('Gagal menghapus pelanggan');
        },
    });
};

const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return 'Rp 0';
    return `Rp ${amount.toLocaleString('id-ID')}`;
};

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getBonusStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        pending: 'secondary',
        released: 'default',
        cancelled: 'destructive',
    };
    return variants[status] || 'outline';
};
</script>

<template>
    <Head :title="customer.name" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">{{ customer.name }}</h1>
                    <p class="mt-2 text-muted-foreground">
                        ID Ewallet: {{ customer.ewallet_id }}
                    </p>
                </div>
                <div class="flex gap-2">
                    <Link :href="index.url()">
                        <Button variant="outline">
                            <ArrowLeft class="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <Link :href="edit.url(customer.id)">
                        <Button variant="outline">
                            <Pencil class="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                    <Button variant="destructive" @click="deleteDialog = true">
                        <Trash2 class="mr-2 h-4 w-4" />
                        Hapus
                    </Button>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Saldo Ewallet</CardTitle>
                        <Wallet class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(customer.ewallet_saldo || 0) }}</div>
                        <p class="text-xs text-muted-foreground mt-1">
                            <Badge v-if="customer.email_verified_at" variant="default" class="text-xs">
                                Terverifikasi
                            </Badge>
                            <Badge v-else variant="secondary" class="text-xs">
                                Belum Verifikasi
                            </Badge>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Downlines</CardTitle>
                        <Users class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ statistics?.totalDownlines || 0 }}</div>
                        <p class="text-xs text-muted-foreground mt-1">
                            Kiri: {{ statistics?.leftDownlines || 0 }} | Kanan: {{ statistics?.rightDownlines || 0 }}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Total Bonus</CardTitle>
                        <Gift class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{{ formatCurrency(statistics?.totalBonuses || 0) }}</div>
                        <p class="text-xs text-muted-foreground mt-1">
                            Bulan ini: {{ formatCurrency(statistics?.totalBonusesThisMonth || 0) }}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Level Matrix</CardTitle>
                        <TrendingUp class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">Level {{ statistics?.matrixLevel || 0 }}</div>
                        <p class="text-xs text-muted-foreground mt-1">
                            Posisi: {{ customer.position ? (customer.position === 'left' ? 'Kiri' : 'Kanan') : '-' }}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <!-- Actions Card -->
            <Card>
                <CardHeader>
                    <CardTitle>Aksi Ewallet</CardTitle>
                    <CardDescription>Kelola saldo dan bonus pelanggan</CardDescription>
                </CardHeader>
                <CardContent class="flex gap-2">
                    <Button @click="handleReleaseBonuses">
                        <Gift class="mr-2 h-4 w-4" />
                        Release Bonuses
                    </Button>
                    <Button variant="outline" @click="topUpDialog = true">
                        <DollarSign class="mr-2 h-4 w-4" />
                        Top Up
                    </Button>
                    <Button variant="outline" @click="deductDialog = true">
                        <DollarSign class="mr-2 h-4 w-4" />
                        Deduct
                    </Button>
                </CardContent>
            </Card>

            <div class="grid gap-6 lg:grid-cols-2">
                <!-- Customer Info -->
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Pelanggan</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div>
                            <Label class="text-muted-foreground">Email</Label>
                            <p class="mt-1 font-medium">{{ customer.email }}</p>
                        </div>
                        <div>
                            <Label class="text-muted-foreground">No. Telepon</Label>
                            <p class="mt-1 font-medium">{{ customer.phone || '-' }}</p>
                        </div>
                        <div>
                            <Label class="text-muted-foreground">Terdaftar</Label>
                            <p class="mt-1 font-medium">{{ formatDate(customer.created_at) }}</p>
                        </div>
                        <div>
                            <Label class="text-muted-foreground">Terakhir Update</Label>
                            <p class="mt-1 font-medium">{{ formatDate(customer.updated_at) }}</p>
                        </div>
                        <div v-if="customer.description">
                            <Label class="text-muted-foreground">Keterangan</Label>
                            <p class="mt-1 font-medium">{{ customer.description }}</p>
                        </div>
                    </CardContent>
                </Card>

                <!-- MLM Network Info -->
                <Card>
                    <CardHeader>
                        <CardTitle>Jaringan MLM</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div>
                            <Label class="text-muted-foreground">Sponsor</Label>
                            <div v-if="customer.sponsor" class="mt-1 rounded-md border bg-muted p-3">
                                <p class="font-medium">{{ customer.sponsor.name }}</p>
                                <p class="text-sm text-muted-foreground">{{ customer.sponsor.ewallet_id }}</p>
                            </div>
                            <p v-else class="mt-1 font-medium">-</p>
                        </div>
                        <div>
                            <Label class="text-muted-foreground">Upline</Label>
                            <div v-if="customer.upline" class="mt-1 rounded-md border bg-muted p-3">
                                <p class="font-medium">{{ customer.upline.name }}</p>
                                <p class="text-sm text-muted-foreground">{{ customer.upline.ewallet_id }}</p>
                            </div>
                            <p v-else class="mt-1 font-medium">-</p>
                        </div>
                        <div>
                            <Label class="text-muted-foreground">Posisi Binary</Label>
                            <div class="mt-1">
                                <Badge v-if="customer.position" variant="outline">
                                    {{ customer.position === 'left' ? 'Kiri' : 'Kanan' }}
                                </Badge>
                                <span v-else>-</span>
                            </div>
                        </div>
                        <div>
                            <Label class="text-muted-foreground">Level</Label>
                            <p class="mt-1 font-medium">{{ customer.level || '-' }}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Addresses -->
            <Card v-if="customer.addresses && customer.addresses.length > 0">
                <CardHeader>
                    <CardTitle>Alamat</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="space-y-3">
                        <div
                            v-for="address in customer.addresses"
                            :key="address.id"
                            class="rounded-lg border p-3"
                        >
                            <div class="flex items-start justify-between">
                                <div>
                                    <div class="flex items-center gap-2">
                                        <Badge variant="outline">{{ address.type }}</Badge>
                                        <Badge v-if="address.is_primary" variant="default">Primary</Badge>
                                    </div>
                                    <p class="mt-2 text-sm">{{ address.address }}</p>
                                    <p class="text-sm text-muted-foreground">
                                        {{ address.city }}, {{ address.province }} {{ address.postal_code }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Bonus History -->
            <div class="grid gap-6 lg:grid-cols-2">
                <!-- Regular Bonuses -->
                <Card>
                    <CardHeader>
                        <CardTitle>Bonus Regular</CardTitle>
                        <CardDescription>Bonus regular yang diterima</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div v-if="recentBonuses.regular.length > 0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow v-for="bonus in recentBonuses.regular" :key="bonus.id">
                                        <TableCell class="font-medium">{{ formatCurrency(bonus.amount) }}</TableCell>
                                        <TableCell>
                                            <Badge :variant="getBonusStatusBadge(bonus.status)">
                                                {{ bonus.status }}
                                            </Badge>
                                        </TableCell>
                                        <TableCell class="text-sm">{{ formatDate(bonus.created_at) }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <p v-else class="text-center text-sm text-muted-foreground py-4">
                            Belum ada bonus regular
                        </p>
                    </CardContent>
                </Card>

                <!-- Matching Bonuses -->
                <Card>
                    <CardHeader>
                        <CardTitle>Bonus Matching</CardTitle>
                        <CardDescription>Bonus matching yang diterima</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div v-if="recentBonuses.matching.length > 0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow v-for="bonus in recentBonuses.matching" :key="bonus.id">
                                        <TableCell class="font-medium">{{ formatCurrency(bonus.amount) }}</TableCell>
                                        <TableCell>
                                            <Badge :variant="getBonusStatusBadge(bonus.status)">
                                                {{ bonus.status }}
                                            </Badge>
                                        </TableCell>
                                        <TableCell class="text-sm">{{ formatDate(bonus.created_at) }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <p v-else class="text-center text-sm text-muted-foreground py-4">
                            Belum ada bonus matching
                        </p>
                    </CardContent>
                </Card>

                <!-- Pairing Bonuses -->
                <Card>
                    <CardHeader>
                        <CardTitle>Bonus Pairing</CardTitle>
                        <CardDescription>Bonus pairing yang diterima</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div v-if="recentBonuses.pairing.length > 0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow v-for="bonus in recentBonuses.pairing" :key="bonus.id">
                                        <TableCell class="font-medium">{{ formatCurrency(bonus.amount) }}</TableCell>
                                        <TableCell>
                                            <Badge :variant="getBonusStatusBadge(bonus.status)">
                                                {{ bonus.status }}
                                            </Badge>
                                        </TableCell>
                                        <TableCell class="text-sm">{{ formatDate(bonus.created_at) }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <p v-else class="text-center text-sm text-muted-foreground py-4">
                            Belum ada bonus pairing
                        </p>
                    </CardContent>
                </Card>

                <!-- Sponsor Bonuses -->
                <Card>
                    <CardHeader>
                        <CardTitle>Bonus Sponsor</CardTitle>
                        <CardDescription>Bonus sponsor yang diterima</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div v-if="recentBonuses.sponsor.length > 0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow v-for="bonus in recentBonuses.sponsor" :key="bonus.id">
                                        <TableCell class="font-medium">{{ formatCurrency(bonus.amount) }}</TableCell>
                                        <TableCell>
                                            <Badge :variant="getBonusStatusBadge(bonus.status)">
                                                {{ bonus.status }}
                                            </Badge>
                                        </TableCell>
                                        <TableCell class="text-sm">{{ formatDate(bonus.created_at) }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <p v-else class="text-center text-sm text-muted-foreground py-4">
                            Belum ada bonus sponsor
                        </p>
                    </CardContent>
                </Card>
            </div>

            <!-- Genealogy Tree -->
            <Card v-if="downlineTree">
                <CardHeader>
                    <CardTitle>Genealogy Tree</CardTitle>
                    <CardDescription>Visualisasi downline dalam binary tree</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="overflow-x-auto">
                        <pre class="text-sm">{{ JSON.stringify(downlineTree, null, 2) }}</pre>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Top Up Dialog -->
        <Dialog v-model:open="topUpDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Top Up Saldo</DialogTitle>
                    <DialogDescription>
                        Tambahkan saldo ke ewallet {{ customer.name }}
                    </DialogDescription>
                </DialogHeader>
                <div class="space-y-4 py-4">
                    <div class="space-y-2">
                        <Label for="topup-amount">Jumlah *</Label>
                        <Input
                            id="topup-amount"
                            v-model.number="topUpAmount"
                            type="number"
                            min="0"
                            step="1000"
                            placeholder="Masukkan jumlah"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="topup-description">Keterangan</Label>
                        <textarea
                            id="topup-description"
                            v-model="topUpDescription"
                            placeholder="Keterangan (opsional)"
                            rows="3"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="topUpDialog = false">Batal</Button>
                    <Button @click="handleTopUp">Top Up</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Deduct Dialog -->
        <Dialog v-model:open="deductDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Kurangi Saldo</DialogTitle>
                    <DialogDescription>
                        Kurangi saldo dari ewallet {{ customer.name }}
                    </DialogDescription>
                </DialogHeader>
                <div class="space-y-4 py-4">
                    <div class="rounded-md border bg-muted p-3">
                        <p class="text-sm text-muted-foreground">Saldo Saat Ini</p>
                        <p class="text-lg font-bold">{{ formatCurrency(customer.ewallet_saldo || 0) }}</p>
                    </div>
                    <div class="space-y-2">
                        <Label for="deduct-amount">Jumlah *</Label>
                        <Input
                            id="deduct-amount"
                            v-model.number="deductAmount"
                            type="number"
                            min="0"
                            :max="customer.ewallet_saldo || 0"
                            step="1000"
                            placeholder="Masukkan jumlah"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="deduct-description">Keterangan</Label>
                        <textarea
                            id="deduct-description"
                            v-model="deductDescription"
                            placeholder="Keterangan (opsional)"
                            rows="3"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="deductDialog = false">Batal</Button>
                    <Button variant="destructive" @click="handleDeduct">Kurangi</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Delete Confirmation Dialog -->
        <Dialog v-model:open="deleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Pelanggan</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus pelanggan ini? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" @click="deleteDialog = false">Batal</Button>
                    <Button variant="destructive" @click="handleDelete">Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
