<script setup lang="ts">
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
import { useForm } from '@inertiajs/vue3';
import { AlertCircle, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';

const showDeleteDialog = ref(false);
const deleteForm = useForm({});

const deleteAccount = () => {
    deleteForm.delete('/client/profile', {
        onFinish: () => {
            showDeleteDialog.value = false;
        },
    });
};
</script>

<template>
    <Card class="border-red-200 dark:border-red-900">
        <CardHeader>
            <CardTitle class="text-red-600 dark:text-red-400">Zona Bahaya</CardTitle>
            <CardDescription>
                Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan
            </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
            <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
                <div class="flex items-start gap-3">
                    <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div class="flex-1">
                        <h3 class="font-semibold text-red-900 dark:text-red-100">
                            Hapus Akun
                        </h3>
                        <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                            Setelah akun Anda dihapus, semua data akan dihapus secara permanen.
                            Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <Button
                            type="button"
                            variant="destructive"
                            class="mt-4"
                            @click="showDeleteDialog = true"
                        >
                            <Trash2 class="w-4 h-4 mr-2" />
                            Hapus Akun Saya
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="showDeleteDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle class="flex items-center gap-2 text-red-600">
                    <AlertCircle class="w-5 h-5" />
                    Konfirmasi Hapus Akun
                </DialogTitle>
                <DialogDescription>
                    Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan
                    dan semua data Anda akan dihapus secara permanen.
                </DialogDescription>
            </DialogHeader>
            <div class="py-4">
                <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
                    <p class="text-sm text-red-700 dark:text-red-300">
                        <strong>Data yang akan dihapus:</strong>
                    </p>
                    <ul class="mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside space-y-1">
                        <li>Informasi profil dan akun</li>
                        <li>Riwayat transaksi</li>
                        <li>E-wallet dan saldo</li>
                        <li>Jaringan dan bonus</li>
                    </ul>
                </div>
            </div>
            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    @click="showDeleteDialog = false"
                    :disabled="deleteForm.processing"
                >
                    Batal
                </Button>
                <Button
                    type="button"
                    variant="destructive"
                    @click="deleteAccount"
                    :disabled="deleteForm.processing"
                >
                    <Trash2 class="w-4 h-4 mr-2" />
                    {{ deleteForm.processing ? 'Menghapus...' : 'Ya, Hapus Akun' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
