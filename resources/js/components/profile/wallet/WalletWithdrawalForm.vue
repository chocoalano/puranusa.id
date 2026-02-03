<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { Customer } from '@/types/profile';
import { Link, useForm } from '@inertiajs/vue3';
import { AlertTriangle, CreditCard, Eye, EyeOff, Info, Loader2, Lock } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';

const props = defineProps<{
    customer: Customer;
    maxAmount: number;
    hasPendingWithdrawal?: boolean;
}>();

const emit = defineEmits<{
    (e: 'cancel'): void;
}>();

// Check if profile is complete (NIK and bank info)
const isProfileComplete = computed(() => {
    console.log(props.customer);

    return !!props.customer.nik && !!props.customer.bank_name && !!props.customer.bank_account;
});

// Dialog states
const showConfirmDialog = ref(false);
const showPasswordDialog = ref(false);
const showPassword = ref(false);
const passwordError = ref('');

const form = useForm({
    amount: '',
    password: '',
});

// Biaya administrasi penarikan
const ADMIN_FEE = 6500;

// Computed untuk menampilkan ringkasan penarikan
const withdrawalSummary = computed(() => {
    const amount = parseFloat(form.amount) || 0;
    const netAmount = Math.max(0, amount - ADMIN_FEE);
    return {
        amount,
        formattedAmount: amount.toLocaleString('id-ID'),
        adminFee: ADMIN_FEE,
        formattedAdminFee: ADMIN_FEE.toLocaleString('id-ID'),
        netAmount,
        formattedNetAmount: netAmount.toLocaleString('id-ID'),
    };
});

// Step 1: Validasi form dan tampilkan dialog konfirmasi
const handleSubmit = () => {
    // Check profile completeness first
    if (!isProfileComplete.value) {
        toast.error('Lengkapi NIK dan informasi bank di profil Anda terlebih dahulu');
        return;
    }

    // Validate form first
    if (!form.amount || parseFloat(form.amount) < 50000) {
        toast.error('Jumlah penarikan minimal Rp 50.000');
        return;
    }
    if (parseFloat(form.amount) > props.maxAmount) {
        toast.error('Jumlah penarikan melebihi saldo yang tersedia');
        return;
    }

    // Show confirmation dialog
    showConfirmDialog.value = true;
};

// Step 2: Dari konfirmasi, lanjut ke password dialog
const proceedToPassword = () => {
    showConfirmDialog.value = false;
    showPasswordDialog.value = true;
    form.password = '';
    passwordError.value = '';
};

// Step 3: Submit dengan password
const submitWithPassword = () => {
    if (!form.password) {
        passwordError.value = 'Password wajib diisi';
        return;
    }

    passwordError.value = '';

    form.post('/client/wallet/withdrawal', {
        preserveScroll: true,
        onSuccess: () => {
            showPasswordDialog.value = false;
            form.reset();
            emit('cancel');
            toast.success('Permintaan penarikan berhasil diajukan.');
        },
        onError: (errors) => {
            if (errors.password) {
                passwordError.value = errors.password;
            } else if (errors.pending) {
                showPasswordDialog.value = false;
                toast.error(errors.pending);
            } else if (errors.profile) {
                showPasswordDialog.value = false;
                toast.error(errors.profile);
            }
        },
    });
};

// Cancel password dialog
const cancelPasswordDialog = () => {
    showPasswordDialog.value = false;
    form.password = '';
    passwordError.value = '';
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Tarik Dana E-Wallet</CardTitle>
            <CardDescription>
                Tarik saldo ke rekening bank Anda
            </CardDescription>
        </CardHeader>
        <CardContent>
            <!-- Warning jika profil belum lengkap -->
            <div v-if="!isProfileComplete" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
                <div class="flex items-start gap-3">
                    <AlertTriangle class="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                        <p class="font-medium text-red-700 dark:text-red-300">Profil Belum Lengkap</p>
                        <p class="text-sm text-red-600 dark:text-red-400 mt-1">
                            Untuk melakukan penarikan, Anda harus melengkapi NIK dan informasi rekening bank di profil Anda.
                        </p>
                        <Link
                            href="/client/profile"
                            class="inline-flex items-center gap-1 text-sm font-medium text-red-700 dark:text-red-300 hover:underline mt-2"
                        >
                            Lengkapi Profil Sekarang →
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Warning jika ada pending withdrawal -->
            <div v-if="hasPendingWithdrawal" class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                <div class="flex items-start gap-3">
                    <AlertTriangle class="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                        <p class="font-medium text-amber-700 dark:text-amber-300">Permintaan Pending</p>
                        <p class="text-sm text-amber-600 dark:text-amber-400 mt-1">
                            Anda masih memiliki permintaan penarikan yang belum diproses.
                            Silakan tunggu hingga permintaan sebelumnya selesai diproses.
                        </p>
                    </div>
                </div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="space-y-2">
                    <Label for="withdrawal_amount">
                        Jumlah Penarikan
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <CreditCard class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="withdrawal_amount"
                            v-model="form.amount"
                            type="number"
                            placeholder="Minimal Rp 50.000"
                            class="pl-10"
                            min="50000"
                            :max="maxAmount"
                            :disabled="hasPendingWithdrawal || !isProfileComplete"
                            required
                        />
                    </div>
                    <p class="text-xs text-muted-foreground">
                        Minimum Rp 50.000 - Maksimal Rp {{ maxAmount.toLocaleString('id-ID') }}
                    </p>
                    <p v-if="form.errors.amount" class="text-sm text-red-500">
                        {{ form.errors.amount }}
                    </p>
                </div>

                <Separator />

                <!-- Bank Info Display (Read-only from profile) -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <h4 class="font-semibold">Informasi Rekening</h4>
                        <Link
                            href="/client/profile"
                            class="text-sm text-primary hover:underline"
                        >
                            Ubah di Profil
                        </Link>
                    </div>

                    <div v-if="isProfileComplete" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Nama Bank:</span>
                            <span class="font-medium">{{ customer.bank_name }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">No. Rekening:</span>
                            <span class="font-medium">{{ customer.bank_account }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Atas Nama:</span>
                            <span class="font-medium">{{ customer.name }}</span>
                        </div>
                    </div>

                    <div v-else class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-sm text-muted-foreground">
                        Informasi rekening belum diisi
                    </div>

                    <div class="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <Info class="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <p class="text-xs text-blue-700 dark:text-blue-300">
                            Nama pemilik rekening harus sama dengan nama yang terdaftar sebagai member.
                        </p>
                    </div>
                </div>

                <!-- Info Biaya Admin -->
                <div v-if="form.amount && parseFloat(form.amount) >= 50000" class="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
                    <h4 class="font-semibold text-sm">Rincian Penarikan</h4>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted-foreground">Jumlah Penarikan:</span>
                        <span>Rp {{ withdrawalSummary.formattedAmount }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted-foreground">Biaya Administrasi:</span>
                        <span class="text-red-600 dark:text-red-400">- Rp {{ withdrawalSummary.formattedAdminFee }}</span>
                    </div>
                    <Separator />
                    <div class="flex justify-between text-sm font-semibold">
                        <span>Yang Akan Diterima:</span>
                        <span class="text-green-600 dark:text-green-400">Rp {{ withdrawalSummary.formattedNetAmount }}</span>
                    </div>
                </div>

                <div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg space-y-2">
                    <p class="text-sm text-amber-700 dark:text-amber-300">
                        <strong>Catatan:</strong>
                    </p>
                    <ol class="text-sm text-amber-700 dark:text-amber-300 list-decimal list-inside space-y-2">
                        <li>
                            1. Setiap penarikan dikenakan <strong>biaya administrasi Rp 6.500</strong>.
                        </li>
                        <li>
                            2. Periode transfer penarikan dana:
                            <ul class="mt-1 list-disc list-inside space-y-1">
                                <li>Pengajuan pukul 00.01-12.00 WIB diproses pukul 14.00 WIB.</li>
                                <li>Pengajuan pukul 12.01-16.00 WIB diproses pukul 17.00 WIB.</li>
                                <li>Pengajuan pukul 16.01-00.00 WIB diproses keesokan hari pukul 14.00 WIB.</li>
                            </ul>
                        </li>
                        <li>3. Pastikan data rekening sudah benar.</li>
                    </ol>
                </div>

                <div class="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        @click="form.reset(); emit('cancel')"
                        :disabled="form.processing"
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        :disabled="form.processing || hasPendingWithdrawal || !isProfileComplete"
                    >
                        {{ form.processing ? 'Memproses...' : 'Ajukan Penarikan' }}
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>

    <!-- Confirmation Dialog -->
    <AlertDialog v-model:open="showConfirmDialog">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Penarikan</AlertDialogTitle>
                <AlertDialogDescription>
                    Apakah Anda yakin ingin menarik dana dengan detail berikut?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <div class="space-y-3 py-4">
                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Jumlah Penarikan:</span>
                    <span>Rp {{ withdrawalSummary.formattedAmount }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Biaya Administrasi:</span>
                    <span class="text-red-600">- Rp {{ withdrawalSummary.formattedAdminFee }}</span>
                </div>
                <div class="flex justify-between text-sm font-semibold">
                    <span>Yang Akan Diterima:</span>
                    <span class="text-green-600">Rp {{ withdrawalSummary.formattedNetAmount }}</span>
                </div>
                <Separator />
                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Bank:</span>
                    <span class="font-medium">{{ customer.bank_name }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">No. Rekening:</span>
                    <span class="font-medium">{{ customer.bank_account }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Atas Nama:</span>
                    <span class="font-medium">{{ customer.name }}</span>
                </div>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction @click="proceedToPassword">
                    Lanjutkan
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <!-- Password Confirmation Dialog -->
    <Dialog v-model:open="showPasswordDialog">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle class="flex items-center gap-2">
                    <Lock class="h-5 w-5" />
                    Konfirmasi Password
                </DialogTitle>
                <DialogDescription>
                    Masukkan password akun Anda untuk melanjutkan penarikan dana.
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-4 py-4">
                <div class="space-y-2">
                    <Label for="confirm_password">Password</Label>
                    <div class="relative">
                        <Input
                            id="confirm_password"
                            v-model="form.password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Masukkan password Anda"
                            class="pr-10"
                            @keyup.enter="submitWithPassword"
                        />
                        <button
                            type="button"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            @click="showPassword = !showPassword"
                        >
                            <Eye v-if="!showPassword" class="h-4 w-4" />
                            <EyeOff v-else class="h-4 w-4" />
                        </button>
                    </div>
                    <p v-if="passwordError" class="text-sm text-red-500">
                        {{ passwordError }}
                    </p>
                </div>
            </div>
            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    @click="cancelPasswordDialog"
                    :disabled="form.processing"
                >
                    Batal
                </Button>
                <Button
                    type="button"
                    @click="submitWithPassword"
                    :disabled="form.processing || !form.password"
                >
                    <Loader2 v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                    {{ form.processing ? 'Memproses...' : 'Konfirmasi Penarikan' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
