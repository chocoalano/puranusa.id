<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import {
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    ShoppingBag,
    User,
    Users,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';

interface Props {
    ref_code?: string;
}

const props = withDefaults(defineProps<Props>(), {
    ref_code: '',
});

const page = usePage();
const flashSuccess = computed(() => (page.props as any).flash?.success);

const form = useForm({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    ref_code: props.ref_code,
});

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const submit = () => {
    form.post('/client/register', {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
            toast.success('Berhasil mendaftar. Silakan cek email Anda untuk verifikasi.');
        },
    });
};
</script>

<template>
    <Head title="Daftar - Puranusa" />

    <div class="grid min-h-screen lg:grid-cols-2">
        <!-- Left Side - Hero Image -->
        <div class="relative hidden bg-muted lg:block">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
            ></div>
            <div
                class="relative flex h-full flex-col items-center justify-center p-12 text-center"
            >
                <div class="max-w-md space-y-6">
                    <h1 class="text-4xl font-bold tracking-tight">
                        Bergabunglah dengan Kami!
                    </h1>
                    <p class="text-lg text-muted-foreground">
                        Daftar sekarang dan nikmati pengalaman belanja yang luar
                        biasa dengan berbagai keuntungan.
                    </p>
                    <div class="grid grid-cols-2 gap-4 pt-8">
                        <div class="space-y-2 rounded-lg bg-background/50 p-4">
                            <div class="text-2xl">🎁</div>
                            <p class="text-sm font-medium">Bonus Member</p>
                        </div>
                        <div class="space-y-2 rounded-lg bg-background/50 p-4">
                            <div class="text-2xl">🚚</div>
                            <p class="text-sm font-medium">Gratis Ongkir</p>
                        </div>
                        <div class="space-y-2 rounded-lg bg-background/50 p-4">
                            <div class="text-2xl">💳</div>
                            <p class="text-sm font-medium">E-Wallet</p>
                        </div>
                        <div class="space-y-2 rounded-lg bg-background/50 p-4">
                            <div class="text-2xl">⭐</div>
                            <p class="text-sm font-medium">Reward Points</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="bg-grid-white/10 absolute inset-0 bg-[size:20px_20px]"
            />
        </div>

        <!-- Right Side - Register Form -->
        <div class="flex items-center justify-center bg-background p-8">
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
                        <CardTitle class="text-2xl font-bold"
                            >Buat Akun Baru</CardTitle
                        >
                        <CardDescription>
                            Isi formulir di bawah untuk mendaftar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form @submit.prevent="submit" class="space-y-4">
                            <!-- Success Alert -->
                            <Alert v-if="flashSuccess" variant="default">
                                <CheckCircle2 class="h-4 w-4" />
                                <AlertTitle>Berhasil!</AlertTitle>
                                <AlertDescription>
                                    {{ flashSuccess }}
                                </AlertDescription>
                            </Alert>

                            <!-- Error Alert -->
                            <Alert
                                v-if="(form.errors as any).error"
                                variant="destructive"
                            >
                                <AlertCircle class="h-4 w-4" />
                                <AlertTitle>Terjadi Kesalahan</AlertTitle>
                                <AlertDescription>
                                    {{ (form.errors as any).error }}
                                </AlertDescription>
                            </Alert>

                            <!-- Name -->
                            <div class="space-y-2">
                                <Label for="name">Nama Lengkap</Label>
                                <div class="relative">
                                    <User
                                        class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                                    />
                                    <Input
                                        id="name"
                                        v-model="form.name"
                                        type="text"
                                        placeholder="Masukkan nama lengkap"
                                        class="pl-10"
                                        :class="{
                                            'border-destructive':
                                                form.errors.name,
                                        }"
                                        required
                                        autofocus
                                        autocomplete="name"
                                    />
                                </div>
                                <p
                                    v-if="form.errors.name"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.name }}
                                </p>
                            </div>

                            <!-- Email -->
                            <div class="space-y-2">
                                <Label for="email">Email</Label>
                                <div class="relative">
                                    <Mail
                                        class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                                    />
                                    <Input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        placeholder="nama@email.com"
                                        class="pl-10"
                                        :class="{
                                            'border-destructive':
                                                form.errors.email,
                                        }"
                                        required
                                        autocomplete="email"
                                    />
                                </div>
                                <p
                                    v-if="form.errors.email"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.email }}
                                </p>
                            </div>

                            <!-- Phone -->
                            <div class="space-y-2">
                                <Label for="phone">Nomor Telepon</Label>
                                <div class="relative">
                                    <Phone
                                        class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                                    />
                                    <Input
                                        id="phone"
                                        v-model="form.phone"
                                        type="tel"
                                        placeholder="08xxxxxxxxxx"
                                        class="pl-10"
                                        :class="{
                                            'border-destructive':
                                                form.errors.phone,
                                        }"
                                        required
                                        autocomplete="tel"
                                    />
                                </div>
                                <p
                                    v-if="form.errors.phone"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.phone }}
                                </p>
                            </div>

                            <!-- Referral Code -->
                            <div class="space-y-2">
                                <Label for="ref_code"
                                    >Kode Referral (Opsional)</Label
                                >
                                <div class="relative">
                                    <Users
                                        class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                                    />
                                    <Input
                                        id="ref_code"
                                        v-model="form.ref_code"
                                        type="text"
                                        placeholder="REF-XXXXXXXX"
                                        class="pl-10"
                                        :class="{
                                            'border-destructive':
                                                form.errors.ref_code,
                                        }"
                                        autocomplete="off"
                                    />
                                </div>
                                <p
                                    v-if="form.errors.ref_code"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.ref_code }}
                                </p>
                                <p v-else class="text-xs text-muted-foreground">
                                    Masukkan kode referral dari sponsor Anda
                                    untuk bergabung ke jaringan MLM
                                </p>
                            </div>

                            <!-- Password -->
                            <div class="space-y-2">
                                <Label for="password">Password</Label>
                                <div class="relative">
                                    <Lock
                                        class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                                    />
                                    <Input
                                        id="password"
                                        v-model="form.password"
                                        :type="
                                            showPassword ? 'text' : 'password'
                                        "
                                        placeholder="Minimal 8 karakter"
                                        class="pr-10 pl-10"
                                        :class="{
                                            'border-destructive':
                                                form.errors.password,
                                        }"
                                        required
                                        autocomplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        @click="showPassword = !showPassword"
                                        class="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                                    >
                                        <Eye
                                            v-if="!showPassword"
                                            class="h-4 w-4"
                                        />
                                        <EyeOff v-else class="h-4 w-4" />
                                    </button>
                                </div>
                                <p
                                    v-if="form.errors.password"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.password }}
                                </p>
                            </div>

                            <!-- Password Confirmation -->
                            <div class="space-y-2">
                                <Label for="password_confirmation"
                                    >Konfirmasi Password</Label
                                >
                                <div class="relative">
                                    <Lock
                                        class="absolute top-3 left-3 h-4 w-4 text-muted-foreground"
                                    />
                                    <Input
                                        id="password_confirmation"
                                        v-model="form.password_confirmation"
                                        :type="
                                            showPasswordConfirmation
                                                ? 'text'
                                                : 'password'
                                        "
                                        placeholder="Ulangi password"
                                        class="pr-10 pl-10"
                                        required
                                        autocomplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        @click="
                                            showPasswordConfirmation =
                                                !showPasswordConfirmation
                                        "
                                        class="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                                    >
                                        <Eye
                                            v-if="!showPasswordConfirmation"
                                            class="h-4 w-4"
                                        />
                                        <EyeOff v-else class="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <!-- Terms -->
                            <p class="text-xs text-muted-foreground">
                                Dengan mendaftar, Anda menyetujui
                                <Link
                                    href="/terms"
                                    class="text-primary hover:underline"
                                >
                                    Syarat & Ketentuan
                                </Link>
                                dan
                                <Link
                                    href="/privacy"
                                    class="text-primary hover:underline"
                                >
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
                            <div
                                class="relative flex justify-center text-xs uppercase"
                            >
                                <span
                                    class="bg-background px-2 text-muted-foreground"
                                >
                                    Atau
                                </span>
                            </div>
                        </div>

                        <!-- Login Link -->
                        <div class="text-center text-sm">
                            <span class="text-muted-foreground"
                                >Sudah punya akun?
                            </span>
                            <Link
                                href="/client/login"
                                class="font-medium text-primary hover:underline"
                            >
                                Masuk
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <!-- Back to Home -->
                <div class="text-center">
                    <Link
                        href="/"
                        class="text-sm text-muted-foreground hover:text-primary"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
