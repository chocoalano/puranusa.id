<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/vue3';
import { CreditCard, AlertCircle } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toast } from 'vue-sonner';

const emit = defineEmits<{
    (e: 'cancel'): void;
}>();

const form = useForm({
    amount: '',
    payment_method: 'midtrans', // static identifier
});

const snapLoaded = ref(false);
const snapLoadError = ref(false);

// Check if Midtrans Snap is loaded
onMounted(() => {
    if ((window as any).snap) {
        snapLoaded.value = true;
        return;
    }
    const handler = () => {
        if ((window as any).snap) {
            snapLoaded.value = true;
            snapLoadError.value = false;
            console.log('Midtrans Snap loaded (event).');
        }
    };
    window.addEventListener('midtrans:snap:loaded', handler, { once: true });
    // Fallback timeout in case onload event not fired
    setTimeout(() => {
        if (!snapLoaded.value) {
            if ((window as any).snap) {
                snapLoaded.value = true;
                console.log('Midtrans Snap loaded (fallback).');
            } else {
                snapLoadError.value = true;
                console.error('Failed to load Midtrans Snap (timeout).');
            }
        }
    }, 5000);
});

const openSnapModal = (snapToken: string) => {
    if (!(window as any).snap) {
        console.error('Snap not available');
        alert('Pembayaran tidak dapat diproses. Silakan refresh halaman dan coba lagi.');
        emit('cancel');
        return;
    }

    try {
        (window as any).snap.pay(snapToken, {
            onSuccess: function(result: any) {
                console.log('Payment success:', result);
                toast.success('Pembayaran berhasil.');
                window.location.href = '/client/profile?tab=wallet';
            },
            onPending: function(result: any) {
                console.log('Payment pending:', result);
                toast.info('Pembayaran sedang diproses.');
                window.location.href = '/client/profile?tab=wallet';
            },
            onError: function(result: any) {
                console.error('Payment error (Midtrans):', result);
                toast.error('Pembayaran gagal.');
                try {
                    console.log('Midtrans raw error JSON:', JSON.stringify(result, null, 2));
                } catch {
                    // ignore JSON stringify issues
                }
                const message = result?.status_message || result?.status_code || 'Terjadi kesalahan pembayaran.';
                const advisory = (result?.status_code === '505') ? '\nCatatan: Sandbox sering menolak VA dengan nominal rendah (coba >= 15000 atau metode lain).' : '';
                if (result?.status_code === '505') {
                    alert('Midtrans Error: ' + message + advisory + '\nSandbox akan otomatis mencoba QRIS.');
                    retryAlternate('qris');
                    return;
                }
                alert('Midtrans Error: ' + message + '\nSilakan coba metode lain atau refresh.');
                emit('cancel');
            },
            onClose: function() {
                console.log('Payment modal closed');
                toast('Pembayaran ditutup sebelum selesai.');
                emit('cancel');
            }
        });
    } catch (error) {
        console.error('Error opening Snap modal:', error);
        alert('Terjadi kesalahan saat membuka pembayaran. Silakan coba lagi.');
        toast.error('Terjadi kesalahan saat membuka pembayaran. Silakan coba lagi.');
        emit('cancel');
    }
};

const submitForm = async () => {
    if (form.processing) return;

    // Check if Snap is loaded before submitting
    if (!snapLoaded.value || !(window as any).snap) {
        toast.error('Sistem pembayaran belum siap. Silakan tunggu beberapa saat atau refresh halaman.');
        return;
    }

    try {
        form.processing = true;

        // Use axios which automatically handles CSRF token
        const response = await axios.post('/client/wallet/topup', {
            amount: form.amount,
            payment_method: form.payment_method,
        });

        const data = response.data;

        const snapToken = data.snap_token;

        if (data.success === false && data.message) {
            toast.error(data.message);
            form.processing = false;

            return;
        }

        if (snapToken && typeof snapToken === 'string' && snapToken.trim() !== '') {
            form.reset();
            form.processing = false;
            setTimeout(() => {
                openSnapModal(snapToken);
            }, 100);
        } else {
            form.processing = false;
            console.error('Invalid snap token:', snapToken);
            console.error('Full response:', data);
            toast.error('Gagal mendapatkan token pembayaran. Silakan coba lagi.');
            form.reset();
            emit('cancel');
        }
    } catch (error: any) {
        form.processing = false;
        console.error('Form submission error:', error);
        toast.error('Terjadi kesalahan saat mengirim formulir.');
        // Handle validation errors
        if (error.response?.status === 422 && error.response?.data?.errors) {
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0];
            const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            toast.error(errorMessage);
        } else {
            const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan. Silakan coba lagi.';
            toast.error(errorMessage);
        }
        form.reset();
    }
};

// Retry with alternate payment method by forcing enabled_payments (e.g., QRIS)
const retryAlternate = async (method: string) => {
    if (form.processing) return;
    if (!snapLoaded.value || !(window as any).snap) {
        alert('Sistem pembayaran belum siap untuk retry.');
        return;
    }
    try {
        form.processing = true;
        const response = await axios.post('/client/wallet/topup', {
            amount: form.amount || '20000',
            payment_method: form.payment_method,
            force_payment: method,
        });
        const data = response.data;
        const snapToken = data.snap_token;
        if (!data.success || !snapToken) {
            toast.error(data.message || 'Retry gagal mendapatkan token.');
            form.processing = false;

            return;
        }
        form.processing = false;
        toast.success('Metode dialihkan ke ' + method.toUpperCase() + '. Silakan lanjutkan pembayaran.');
        openSnapModal(snapToken);
    } catch (e: any) {
        form.processing = false;
        toast.error(e?.response?.data?.message || e.message || 'Retry gagal.');
    }
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Top Up E-Wallet</CardTitle>
            <CardDescription>
                Isi saldo e-wallet Anda melalui Midtrans
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="submitForm" class="space-y-6">
                <div class="space-y-2">
                    <Label for="topup_amount">
                        Jumlah Top Up
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <CreditCard class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="topup_amount"
                            v-model="form.amount"
                            type="number"
                            placeholder="Minimal Rp 10.000"
                            class="pl-10"
                            min="10000"
                            max="10000000"
                            required
                        />
                    </div>
                    <p class="text-xs text-muted-foreground">
                        Minimum Rp 10.000 - Maximum Rp 10.000.000. Disarankan >= Rp 15.000 untuk Virtual Account agar tidak ditolak (505).
                    </p>
                    <p v-if="form.errors.amount" class="text-sm text-red-500">
                        {{ form.errors.amount }}
                    </p>
                </div>



                <!-- Payment Info -->
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                    <div class="flex items-start gap-3">
                        <CreditCard class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                            <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">
                                Pembayaran via Midtrans
                            </p>
                            <p class="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                Anda akan diarahkan ke halaman pembayaran Midtrans untuk menyelesaikan transaksi
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Error Alert if Snap failed to load -->
                <div v-if="snapLoadError" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
                    <div class="flex items-start gap-3">
                        <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                        <div>
                            <p class="text-sm font-semibold text-red-900 dark:text-red-100">
                                Sistem Pembayaran Belum Siap
                            </p>
                            <p class="text-xs text-red-700 dark:text-red-300 mt-1">
                                Silakan refresh halaman untuk memuat ulang sistem pembayaran.
                            </p>
                        </div>
                    </div>
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
                        :disabled="form.processing || snapLoadError || !snapLoaded"
                    >
                        <span v-if="form.processing">Memproses...</span>
                        <span v-else-if="!snapLoaded && !snapLoadError">Memuat sistem pembayaran...</span>
                        <span v-else-if="snapLoadError">Sistem pembayaran error</span>
                        <span v-else>Lanjut ke Pembayaran</span>
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
