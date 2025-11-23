<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Eye, EyeOff, Lock, Mail, Phone, ShoppingBag, User } from 'lucide-vue-next';
import { ref } from 'vue';

const form = useForm({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
});

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const submit = () => {
    form.post('/client/register', {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <Head title="Daftar - Puranusa" />

    <div class="min-h-screen grid lg:grid-cols-2">
        <!-- Left Side - Hero Image -->
        <div class="hidden lg:block relative bg-muted">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
            ></div>
            <div class="relative h-full flex flex-col items-center justify-center p-12 text-center">
                <div class="max-w-md space-y-6">
                    <h1 class="text-4xl font-bold tracking-tight">
                        Bergabunglah dengan Kami!
                    </h1>
                    <p class="text-lg text-muted-foreground">
                        Daftar sekarang dan nikmati pengalaman belanja yang luar biasa dengan berbagai keuntungan.
                    </p>
                    <div class="grid grid-cols-2 gap-4 pt-8">
                        <div class="space-y-2 p-4 rounded-lg bg-background/50">
                            <div class="text-2xl">🎁</div>
                            <p class="text-sm font-medium">Bonus Member</p>
                        </div>
                        <div class="space-y-2 p-4 rounded-lg bg-background/50">
                            <div class="text-2xl">🚚</div>
                            <p class="text-sm font-medium">Gratis Ongkir</p>
                        </div>
                        <div class="space-y-2 p-4 rounded-lg bg-background/50">
                            <div class="text-2xl">💳</div>
                            <p class="text-sm font-medium">E-Wallet</p>
                        </div>
                        <div class="space-y-2 p-4 rounded-lg bg-background/50">
                            <div class="text-2xl">⭐</div>
                            <p class="text-sm font-medium">Reward Points</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        </div>

        <!-- Right Side - Register Form -->
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

                <!-- Register Card -->
                <Card>
                    <CardHeader class="space-y-1">
                        <CardTitle class="text-2xl font-bold">Buat Akun Baru</CardTitle>
                        <CardDescription>
                            Isi formulir di bawah untuk mendaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form @submit.prevent="submit" class="space-y-4">
                            <!-- Name -->
                            <div class="space-y-2">
                                <Label for="name">Nama Lengkap</Label>
                                <div class="relative">
                                    <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        v-model="form.name"
                                        type="text"
                                        placeholder="Masukkan nama lengkap"
                                        class="pl-10"
                                        :class="{ 'border-destructive': form.errors.name }"
                                        required
                                        autofocus
                                        autocomplete="name"
                                    />
                                </div>
                                <p v-if="form.errors.name" class="text-sm text-destructive">
                                    {{ form.errors.name }}
                                </p>
                            </div>

                            <!-- Email -->
                            <div class="space-y-2">
                                <Label for="email">Email</Label>
                                <div class="relative">
                                    <Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        placeholder="nama@email.com"
                                        class="pl-10"
                                        :class="{ 'border-destructive': form.errors.email }"
                                        required
                                        autocomplete="email"
                                    />
                                </div>
                                <p v-if="form.errors.email" class="text-sm text-destructive">
                                    {{ form.errors.email }}
                                </p>
                            </div>

                            <!-- Phone -->
                            <div class="space-y-2">
                                <Label for="phone">Nomor Telepon</Label>
                                <div class="relative">
                                    <Phone class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        v-model="form.phone"
                                        type="tel"
                                        placeholder="08xxxxxxxxxx"
                                        class="pl-10"
                                        :class="{ 'border-destructive': form.errors.phone }"
                                        required
                                        autocomplete="tel"
                                    />
                                </div>
                                <p v-if="form.errors.phone" class="text-sm text-destructive">
                                    {{ form.errors.phone }}
                                </p>
                            </div>

                            <!-- Password -->
                            <div class="space-y-2">
                                <Label for="password">Password</Label>
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

                            <!-- Terms -->
                            <p class="text-xs text-muted-foreground">
                                Dengan mendaftar, Anda menyetujui
                                <Link href="/terms" class="text-primary hover:underline">
                                    Syarat & Ketentuan
                                </Link>
                                dan
                                <Link href="/privacy" class="text-primary hover:underline">
                                    Kebijakan Privasi
                                </Link>
                                kami.
                            </p>

                            <!-- Submit Button -->
                            <Button
                                type="submit"
                                class="w-full"
                                :disabled="form.processing"
                            >
                                <span v-if="form.processing">Memproses...</span>
                                <span v-else>Daftar Sekarang</span>
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

                        <!-- Login Link -->
                        <div class="text-center text-sm">
                            <span class="text-muted-foreground">Sudah punya akun? </span>
                            <Link
                                href="/client/login"
                                class="text-primary font-medium hover:underline"
                            >
                                Masuk
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
    </div>
</template>
