<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Eye, EyeOff, Lock, Mail, ShoppingBag } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    token: string;
    email: string;
}>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const submit = () => {
    form.post('/client/reset-password');
};
</script>

<template>
    <Head title="Reset Password - Puranusa" />

    <div class="min-h-screen grid lg:grid-cols-2">
        <!-- Left Side - Form -->
        <div class="flex items-center justify-center p-8 bg-background">
            <div class="w-full max-w-md space-y-8">
                <!-- Logo -->
                <div class="flex justify-center">
                    <Link href="/">
                        <div class="flex items-center gap-2">
                            <ShoppingBag class="h-8 w-8 text-primary" />
                            <span class="text-2xl font-bold">Puranusa</span>
                        </div>
                    </Link>
                </div>

                <!-- Reset Password Card -->
                <Card>
                    <CardHeader class="space-y-1">
                        <CardTitle class="text-2xl font-bold">Buat Password Baru</CardTitle>
                        <CardDescription>
                            Masukkan password baru untuk akun Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form @submit.prevent="submit" class="space-y-4">
                            <!-- Email (readonly) -->
                            <div class="space-y-2">
                                <Label for="email">Email</Label>
                                <div class="relative">
                                    <Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        class="pl-10 bg-muted"
                                        readonly
                                        autocomplete="email"
                                    />
                                </div>
                                <p v-if="form.errors.email" class="text-sm text-destructive">
                                    {{ form.errors.email }}
                                </p>
                            </div>

                            <!-- Password -->
                            <div class="space-y-2">
                                <Label for="password">Password Baru</Label>
                                <div class="relative">
                                    <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        v-model="form.password"
                                        :type="showPassword ? 'text' : 'password'"
                                        placeholder="Minimal 8 karakter"
                                        class="pl-10 pr-10"
                                        :class="{ 'border-destructive': form.errors.password }"
                                        required
                                        autofocus
                                        autocomplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        @click="showPassword = !showPassword"
                                        class="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                    >
                                        <Eye v-if="!showPassword" class="h-4 w-4" />
                                        <EyeOff v-else class="h-4 w-4" />
                                    </button>
                                </div>
                                <p v-if="form.errors.password" class="text-sm text-destructive">
                                    {{ form.errors.password }}
                                </p>
                            </div>

                            <!-- Password Confirmation -->
                            <div class="space-y-2">
                                <Label for="password_confirmation">Konfirmasi Password</Label>
                                <div class="relative">
                                    <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password_confirmation"
                                        v-model="form.password_confirmation"
                                        :type="showPasswordConfirmation ? 'text' : 'password'"
                                        placeholder="Ulangi password"
                                        class="pl-10 pr-10"
                                        required
                                        autocomplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        @click="showPasswordConfirmation = !showPasswordConfirmation"
                                        class="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                    >
                                        <Eye v-if="!showPasswordConfirmation" class="h-4 w-4" />
                                        <EyeOff v-else class="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <Button
                                type="submit"
                                class="w-full"
                                :disabled="form.processing"
                            >
                                <span v-if="form.processing">Memproses...</span>
                                <span v-else>Reset Password</span>
                            </Button>
                        </form>

                        <!-- Divider -->
                        <div class="relative my-6">
                            <div class="absolute inset-0 flex items-center">
                                <span class="w-full border-t" />
                            </div>
                            <div class="relative flex justify-center text-xs uppercase">
                                <span class="bg-background px-2 text-muted-foreground">
                                    Atau
                                </span>
                            </div>
                        </div>

                        <!-- Back to Login -->
                        <div class="text-center text-sm">
                            <span class="text-muted-foreground">Ingat password Anda? </span>
                            <Link
                                href="/client/login"
                                class="text-primary font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <!-- Back to Home -->
                <div class="text-center">
                    <Link href="/" class="text-sm text-muted-foreground hover:text-primary">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>

        <!-- Right Side - Hero Image -->
        <div class="hidden lg:block relative bg-muted">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
            ></div>
            <div class="relative h-full flex flex-col items-center justify-center p-12 text-center">
                <div class="max-w-md space-y-6">
                    <div class="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                        <Lock class="h-10 w-10 text-primary" />
                    </div>
                    <h1 class="text-4xl font-bold tracking-tight">
                        Keamanan Akun Terjamin
                    </h1>
                    <p class="text-lg text-muted-foreground">
                        Buat password yang kuat untuk melindungi akun Anda. Password minimal 8 karakter.
                    </p>
                    <div class="pt-8 space-y-3 text-left bg-background/50 rounded-lg p-6">
                        <p class="text-sm font-semibold mb-3">Tips Password Kuat:</p>
                        <div class="flex items-start gap-2 text-sm text-muted-foreground">
                            <span class="text-primary">✓</span>
                            <span>Minimal 8 karakter</span>
                        </div>
                        <div class="flex items-start gap-2 text-sm text-muted-foreground">
                            <span class="text-primary">✓</span>
                            <span>Kombinasi huruf besar & kecil</span>
                        </div>
                        <div class="flex items-start gap-2 text-sm text-muted-foreground">
                            <span class="text-primary">✓</span>
                            <span>Gunakan angka dan simbol</span>
                        </div>
                        <div class="flex items-start gap-2 text-sm text-muted-foreground">
                            <span class="text-primary">✓</span>
                            <span>Hindari informasi pribadi</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        </div>
    </div>
</template>
