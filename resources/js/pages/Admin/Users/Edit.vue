<script setup lang="ts">
import UserController from '@/actions/App/Http/Controllers/Admin/UserController'
import HeadingSmall from '@/components/HeadingSmall.vue'
import InputError from '@/components/InputError.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/AppLayout.vue'
import type { BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ArrowLeft } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface User {
  id: number
  name: string
  email: string
  role: 'superadmin' | 'admin' | string
  email_verified_at: string | null
  created_at: string
}

interface Props {
  user: User
}

const { user } = defineProps<Props>()

const breadcrumbItems: BreadcrumbItem[] = [
  { title: 'User Management', href: UserController.index.url() },
  { title: 'Edit User', href: UserController.edit.url(user.id) },
]

const form = useForm({
  name: user.name,
  email: user.email,
  role: user.role ?? 'admin',
  password: '',
  password_confirmation: '',
})

const submit = () => {
  form.put(UserController.update.url(user.id), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success('Berhasil', { description: 'Data pengguna berhasil diperbarui' })
      form.reset('password', 'password_confirmation')
      form.clearErrors()
    },
    onError: () => {
      toast.error('Gagal', { description: 'Terjadi kesalahan saat memperbarui data pengguna' })
    },
  })
}
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbItems">
    <Head :title="`Edit ${user.name}`" />

    <div class="rounded-xl p-4 space-y-6 py-6">
      <!-- Header -->
      <div class="flex items-center gap-4">
        <Link :href="UserController.index.url()">
          <Button variant="outline" size="icon">
            <ArrowLeft class="h-4 w-4" />
          </Button>
        </Link>

        <div>
          <h1 class="text-3xl font-bold tracking-tight">Edit User</h1>
          <p class="text-muted-foreground">Update {{ user.name }}'s information</p>
        </div>
      </div>

      <!-- Form -->
      <div class="mx-auto max-w-7xl">
        <form class="space-y-6" @submit.prevent="submit">
          <div class="rounded-lg border bg-card p-6">
            <HeadingSmall
              title="Informasi Pengguna"
              description="Perbarui detail pengguna"
            />

            <div class="mt-6 space-y-4">
              <div class="grid gap-2">
                <Label for="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  v-model="form.name"
                  required
                  autofocus
                  placeholder="Masukkan nama lengkap pengguna"
                />
                <p class="text-sm text-muted-foreground">
                  Nama lengkap yang akan ditampilkan di sistem
                </p>
                <InputError :message="form.errors.name" />
              </div>

              <div class="grid gap-2">
                <Label for="email">Alamat Email</Label>
                <Input
                  id="email"
                  type="email"
                  v-model="form.email"
                  required
                  placeholder="contoh@email.com"
                />
                <p class="text-sm text-muted-foreground">
                  Email harus unik dan akan digunakan untuk login
                </p>
                <InputError :message="form.errors.email" />
              </div>

              <div class="grid gap-2">
                <Label for="role">Role</Label>

                <!-- shadcn Select: gunakan v-model agar form.role terisi -->
                <Select v-model="form.role">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                <p class="text-sm text-muted-foreground">Role pengguna dalam sistem</p>
                <InputError :message="form.errors.role" />
              </div>

              <div class="grid gap-2">
                <Label for="password">Kata Sandi Baru</Label>
                <Input
                  id="password"
                  type="password"
                  v-model="form.password"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                />
                <p class="text-sm text-muted-foreground">
                  Isi hanya jika ingin mengubah kata sandi. Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol
                </p>
                <InputError :message="form.errors.password" />
              </div>

              <div class="grid gap-2">
                <Label for="password_confirmation">Konfirmasi Kata Sandi Baru</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  v-model="form.password_confirmation"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                />
                <p class="text-sm text-muted-foreground">
                  Ketik ulang kata sandi baru untuk memastikan tidak ada kesalahan
                </p>
                <InputError :message="form.errors.password_confirmation" />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <Link :href="UserController.index.url()">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>

            <Button type="submit" :disabled="form.processing">
              {{ form.processing ? 'Updating...' : 'Update User' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>
