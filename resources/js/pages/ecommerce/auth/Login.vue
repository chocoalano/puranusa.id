<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Eye, EyeOff, Lock, ShoppingBag, User } from 'lucide-vue-next'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const form = useForm({
  username: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)

const submit = () => {
  form.post('/client/login', {
    onSuccess: () => {
      toast.success('Login berhasil! Mengalihkan...')
    },
    onError: (errors) => {
      const errorMessage =
        (errors as any).username || (errors as any).password || 'Login gagal. Silakan coba lagi.'
      toast.error(errorMessage)
      form.reset('password')
    },
  })
}
</script>

<template>
  <Head title="Login - Puranusa" />

  <div class="min-h-screen grid lg:grid-cols-2">
    <!-- Left Side - Login Form -->
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

        <!-- Login Card -->
        <Card>
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl font-bold">Masuk ke Akun Anda</CardTitle>
            <CardDescription>Masukkan username dan password untuk melanjutkan</CardDescription>
          </CardHeader>

          <CardContent>
            <form @submit.prevent="submit" class="space-y-4">
              <!-- Username -->
              <div class="space-y-2">
                <Label for="username">Username</Label>
                <div class="relative">
                  <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="masukkan username"
                    class="pl-10"
                    :class="{ 'border-destructive': form.errors.username }"
                    required
                    autofocus
                    autocomplete="username"
                  />
                </div>
                <p v-if="form.errors.username" class="text-sm text-destructive">
                  {{ form.errors.username }}
                </p>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label for="password">Password</Label>
                  <Link href="/client/forgot-password" class="text-sm text-primary hover:underline">
                    Lupa password?
                  </Link>
                </div>

                <div class="relative">
                  <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Masukkan password"
                    class="pl-10 pr-10"
                    :class="{ 'border-destructive': form.errors.password }"
                    required
                    autocomplete="current-password"
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

              <!-- Remember Me -->
              <div class="flex items-center space-x-2">
                <Checkbox id="remember" v-model:checked="form.remember" />
                <Label for="remember" class="text-sm font-normal cursor-pointer">Ingat saya</Label>
              </div>

              <!-- Submit Button -->
              <Button type="submit" class="w-full" :disabled="form.processing">
                <span v-if="form.processing">Memproses...</span>
                <span v-else>Masuk</span>
              </Button>
            </form>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">Atau</span>
              </div>
            </div>

            <!-- Register Link -->
            <div class="text-center text-sm">
              <span class="text-muted-foreground">Belum punya akun? </span>
              <Link href="/client/register" class="text-primary font-medium hover:underline">
                Daftar sekarang
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
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
      <div class="relative h-full flex flex-col items-center justify-center p-12 text-center">
        <div class="max-w-md space-y-6">
          <h1 class="text-4xl font-bold tracking-tight">Selamat Datang Kembali!</h1>
          <p class="text-lg text-muted-foreground">
            Masuk untuk melanjutkan belanja produk berkualitas dengan harga terbaik.
          </p>
          <div class="grid grid-cols-3 gap-4 pt-8">
            <div class="space-y-2">
              <div class="text-3xl font-bold text-primary">10K+</div>
              <p class="text-sm text-muted-foreground">Produk</p>
            </div>
            <div class="space-y-2">
              <div class="text-3xl font-bold text-primary">50K+</div>
              <p class="text-sm text-muted-foreground">Pelanggan</p>
            </div>
            <div class="space-y-2">
              <div class="text-3xl font-bold text-primary">4.8</div>
              <p class="text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
    </div>
  </div>
</template>
