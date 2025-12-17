<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthBase from '@/layouts/AuthLayout.vue';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Head, useForm } from '@inertiajs/vue3';

defineProps<{
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}>();

const form = useForm({
    username: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(store.url(), {
        onFinish: () => {
            form.reset('password');
        },
    });
};
</script>

<template>
    <AuthBase
        title="Masuk ke akun Anda"
        description="Masukkan email dan kata sandi untuk masuk"
    >
        <Head title="Masuk" />

        <div
            v-if="status"
            class="mb-4 text-center text-sm font-medium text-green-600"
        >
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="username">Nama Pengguna</Label>
                    <Input
                        id="username"
                        type="text"
                        v-model="form.username"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="username"
                        placeholder="nama_pengguna"
                    />
                    <InputError :message="form.errors.username" />
                </div>

                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Kata Sandi</Label>
                        <TextLink
                            v-if="canResetPassword"
                            :href="request()"
                            class="text-sm"
                            :tabindex="5"
                        >
                            Lupa kata sandi?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        v-model="form.password"
                        required
                        :tabindex="2"
                        autocomplete="current-password"
                        placeholder="Kata sandi"
                    />
                    <InputError :message="form.errors.password" />
                </div>

                <div class="flex items-center justify-between">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            v-model:checked="form.remember"
                            :tabindex="3"
                        />
                        <span>Ingat saya</span>
                    </Label>
                </div>

                <Button
                    type="submit"
                    class="mt-4 w-full"
                    :tabindex="4"
                    :disabled="form.processing"
                    data-test="login-button"
                >
                    <Spinner v-if="form.processing" />
                    Masuk
                </Button>
            </div>

            <div
                class="text-center text-sm text-muted-foreground"
                v-if="canRegister"
            >
                Belum punya akun?
                <TextLink :href="register()" :tabindex="5">Daftar</TextLink>
            </div>
        </form>
    </AuthBase>
</template>
