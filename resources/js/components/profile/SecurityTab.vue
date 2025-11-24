<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from '@inertiajs/vue3';
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-vue-next';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const submitForm = () => {
    form.patch('/client/profile/password', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            showCurrentPassword.value = false;
            showNewPassword.value = false;
            showConfirmPassword.value = false;
            toast.success('Password berhasil diubah');
        },
    });
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Ubah Password</CardTitle>
            <CardDescription>
                Pastikan akun Anda menggunakan password yang kuat
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="submitForm" class="space-y-6">
                <div class="space-y-2">
                    <Label for="current_password">
                        Password Saat Ini
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <Lock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="current_password"
                            v-model="form.current_password"
                            :type="showCurrentPassword ? 'text' : 'password'"
                            placeholder="Masukkan password saat ini"
                            class="pl-10 pr-10"
                            required
                        />
                        <button
                            type="button"
                            @click="showCurrentPassword = !showCurrentPassword"
                            class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            <Eye v-if="!showCurrentPassword" class="h-4 w-4" />
                            <EyeOff v-else class="h-4 w-4" />
                        </button>
                    </div>
                    <p v-if="form.errors.current_password" class="text-sm text-red-500">
                        {{ form.errors.current_password }}
                    </p>
                </div>

                <Separator />

                <div class="space-y-2">
                    <Label for="password">
                        Password Baru
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <ShieldCheck class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="password"
                            v-model="form.password"
                            :type="showNewPassword ? 'text' : 'password'"
                            placeholder="Masukkan password baru"
                            class="pl-10 pr-10"
                            required
                        />
                        <button
                            type="button"
                            @click="showNewPassword = !showNewPassword"
                            class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            <Eye v-if="!showNewPassword" class="h-4 w-4" />
                            <EyeOff v-else class="h-4 w-4" />
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Minimal 8 karakter
                    </p>
                    <p v-if="form.errors.password" class="text-sm text-red-500">
                        {{ form.errors.password }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="password_confirmation">
                        Konfirmasi Password Baru
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <ShieldCheck class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            placeholder="Konfirmasi password baru"
                            class="pl-10 pr-10"
                            required
                        />
                        <button
                            type="button"
                            @click="showConfirmPassword = !showConfirmPassword"
                            class="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            <Eye v-if="!showConfirmPassword" class="h-4 w-4" />
                            <EyeOff v-else class="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        @click="form.reset()"
                        :disabled="form.processing"
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        :disabled="form.processing"
                    >
                        <Lock v-if="!form.processing" class="w-4 h-4 mr-2" />
                        {{ form.processing ? 'Mengupdate...' : 'Update Password' }}
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
