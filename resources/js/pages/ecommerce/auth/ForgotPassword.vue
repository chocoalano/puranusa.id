<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Mail, ShoppingBag } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: '',
});

const submit = () => {
    form.post('/client/forgot-password', {
        onFinish: () => {
            form.reset('email');
            toast.success('Link reset password telah dikirim ke email Anda.');
        },
    });
};
</script>

<template>
    <Head title="Lupa Password - Puranusa" />

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

                <!-- Forgot Password Card -->
                <Card>
                    <CardHeader class="space-y-1">
                        <CardTitle class="text-2xl font-bold">Lupa Password?</CardTitle>
                        <CardDescription>
                            Masukkan email Anda dan kami akan mengirimkan link untuk mereset password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <!-- Success Message -->
                        <div
                            v-if="status"
                            class="mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        >
                            <p class="text-sm text-green-800 dark:text-green-200">
                                {{ status }}
                            </p>
                        </div>

                        <form @submit.prevent="submit" class="space-y-4">
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
                                        autofocus
                                        autocomplete="email"
                                    />
                                </div>
                                <p v-if="form.errors.email" class="text-sm text-destructive">
                                    {{ form.errors.email }}
                                </p>
                            </div>

                            <!-- Submit Button -->
                            <Button
                                type="submit"
                                class="w-full"
                                :disabled="form.processing"
                            >
                                <span v-if="form.processing">Mengirim...</span>
                                <span v-else>Kirim Link Reset Password</span>
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
                        <div class="text-center">
                            <Link
                                href="/client/login"
                                class="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                <ArrowLeft class="h-4 w-4" />
                                Kembali ke Login
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
                        <Mail class="h-10 w-10 text-primary" />
                    </div>
                    <h1 class="text-4xl font-bold tracking-tight">
                        Reset Password Mudah
                    </h1>
                    <p class="text-lg text-muted-foreground">
                        Kami akan mengirimkan link reset password ke email Anda. Ikuti instruksi di email untuk membuat password baru.
                    </p>
                    <div class="pt-8 space-y-4">
                        <div class="flex items-center gap-3 text-left">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                1
                            </div>
                            <p class="text-sm text-muted-foreground">Masukkan email Anda</p>
                        </div>
                        <div class="flex items-center gap-3 text-left">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                2
                            </div>
                            <p class="text-sm text-muted-foreground">Cek inbox email Anda</p>
                        </div>
                        <div class="flex items-center gap-3 text-left">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                3
                            </div>
                            <p class="text-sm text-muted-foreground">Klik link dan buat password baru</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        </div>
    </div>
</template>
