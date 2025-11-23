<script setup lang="ts">
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/vue3';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: UserController.index.url(),
    },
    {
        title: 'Create User',
        href: UserController.create.url(),
    },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create User" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <!-- Header -->
            <div class="flex items-center gap-4">
                <Link :href="UserController.index.url()">
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Create User</h1>
                    <p class="text-muted-foreground">Add a new user to the system</p>
                </div>
            </div>

            <!-- Form -->
            <div class="mx-auto max-w-2xl">
                <Form
                    :action="UserController.store.url()"
                    method="post"
                    v-slot="{ errors, processing }"
                    class="space-y-6"
                    @success="() => toast.success('Berhasil', { description: 'Pengguna baru berhasil ditambahkan' })"
                    @error="() => toast.error('Gagal', { description: 'Terjadi kesalahan saat menambahkan pengguna' })"
                >
                    <div class="rounded-lg border bg-card p-6">
                        <HeadingSmall
                            title="Informasi Pengguna"
                            description="Masukkan detail untuk pengguna baru"
                        />

                        <div class="mt-6 space-y-4">
                            <div class="grid gap-2">
                                <Label for="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autofocus
                                    placeholder="Masukkan nama lengkap pengguna"
                                />
                                <p class="text-sm text-muted-foreground">Nama lengkap yang akan ditampilkan di sistem</p>
                                <InputError :message="errors.name" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="email">Alamat Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="contoh@email.com"
                                />
                                <p class="text-sm text-muted-foreground">Email harus unik dan akan digunakan untuk login</p>
                                <InputError :message="errors.email" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="password">Kata Sandi</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Minimal 8 karakter"
                                />
                                <p class="text-sm text-muted-foreground">Gunakan kombinasi huruf, angka, dan simbol untuk keamanan lebih baik</p>
                                <InputError :message="errors.password" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="password_confirmation">Konfirmasi Kata Sandi</Label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    placeholder="Masukkan ulang kata sandi"
                                />
                                <p class="text-sm text-muted-foreground">Ketik ulang kata sandi untuk memastikan tidak ada kesalahan</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-4">
                        <Link :href="UserController.index.url()">
                            <Button
                                type="button"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            :disabled="processing"
                        >
                            {{ processing ? 'Creating...' : 'Create User' }}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    </AppLayout>
</template>
