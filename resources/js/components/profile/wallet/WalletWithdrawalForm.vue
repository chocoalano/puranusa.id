<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from '@inertiajs/vue3';
import { CreditCard } from 'lucide-vue-next';

defineProps<{
    maxAmount: number;
}>();

const emit = defineEmits<{
    (e: 'cancel'): void;
}>();

const form = useForm({
    amount: '',
    bank_name: '',
    bank_account: '',
    bank_holder: '',
});

const submitForm = () => {
    form.post('/client/wallet/withdrawal', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            emit('cancel');
        },
    });
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
            <form @submit.prevent="submitForm" class="space-y-6">
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

                <div class="space-y-4">
                    <h4 class="font-semibold">Informasi Rekening</h4>

                    <div class="space-y-2">
                        <Label for="bank_name">
                            Nama Bank
                            <span class="text-red-500">*</span>
                        </Label>
                        <Input
                            id="bank_name"
                            v-model="form.bank_name"
                            type="text"
                            placeholder="e.g., BCA, Mandiri, BNI"
                            required
                        />
                        <p v-if="form.errors.bank_name" class="text-sm text-red-500">
                            {{ form.errors.bank_name }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="bank_account">
                            Nomor Rekening
                            <span class="text-red-500">*</span>
                        </Label>
                        <Input
                            id="bank_account"
                            v-model="form.bank_account"
                            type="text"
                            placeholder="Nomor rekening bank"
                            required
                        />
                        <p v-if="form.errors.bank_account" class="text-sm text-red-500">
                            {{ form.errors.bank_account }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="bank_holder">
                            Nama Pemilik Rekening
                            <span class="text-red-500">*</span>
                        </Label>
                        <Input
                            id="bank_holder"
                            v-model="form.bank_holder"
                            type="text"
                            placeholder="Nama sesuai rekening bank"
                            required
                        />
                        <p v-if="form.errors.bank_holder" class="text-sm text-red-500">
                            {{ form.errors.bank_holder }}
                        </p>
                    </div>
                </div>

                <div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                    <p class="text-sm text-amber-700 dark:text-amber-300">
                        <strong>Catatan:</strong> Penarikan akan diproses dalam 1-3 hari kerja.
                        Pastikan data rekening sudah benar.
                    </p>
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
                        :disabled="form.processing"
                    >
                        {{ form.processing ? 'Memproses...' : 'Ajukan Penarikan' }}
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
