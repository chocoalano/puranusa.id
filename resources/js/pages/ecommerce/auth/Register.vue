<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

interface Props {
  ref_code?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  ref_code: '',
})

const page = usePage()
const flashSuccess = computed(() => (page.props as any).flash?.success)

const form = useForm({
  name: '',
  username: '',
  email: '',
  phone: '',
  nik: '',
  gender: '' as '' | 'laki-laki' | 'perempuan',
  alamat: '',
  password: '',
  password_confirmation: '',
  ref_code: props.ref_code ?? '',
})

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

const submit = () => {
  form.post('/client/register', {
    onSuccess: () => {
      toast.success('Pendaftaran berhasil! Selamat datang!')
    },
    onError: (errors) => {
      const firstError = Object.values(errors)[0]
      const errorMessage =
        typeof firstError === 'string'
          ? firstError
          : 'Pendaftaran gagal. Silakan periksa form Anda.'
      toast.error(errorMessage)
    },
    onFinish: () => {
      form.reset('password', 'password_confirmation')
    },
  })
}
</script>

<template>
  <Head title="Daftar - Puranusa" />

  <div class="grid min-h-screen lg:grid-cols-2">
    <!-- Left Side - Hero Image -->
    <div class="relative hidden bg-muted lg:block">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
      <div class="relative flex h-full flex-col items-center justify-center p-12 text-center">
        <div class="max-w-md space-y-6">
          <h1 class="text-4xl font-bold tracking-tight">Bergabunglah dengan Kami!</h1>
          <p class="text-lg text-muted-foreground">
            Daftar sekarang dan nikmati pengalaman belanja yang luar biasa dengan berbagai keuntungan.
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
      <div class="bg-grid-white/10 absolute inset-0 bg-[size:20px_20px]" />
    </div>

    <!-- Right Side - Register Form -->
    <div class="flex items-center justify-center bg-background p-8">
      <div class="w-full max-w-md space-y-8">
        <!-- Logo -->
        <div class="flex justify-center">
          <Link href="/">
            <div class="flex items-center gap-2">
              <!-- ShoppingBag SVG Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span class="text-2xl font-bold">Puranusa</span>
            </div>
          </Link>
        </div>

        <!-- Register Card -->
        <Card>
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl font-bold">Buat Akun Baru</CardTitle>
            <CardDescription>Isi formulir di bawah untuk mendaftar</CardDescription>
          </CardHeader>

          <CardContent>
            <form @submit.prevent="submit" class="space-y-4">
              <!-- Success Alert -->
              <Alert v-if="flashSuccess" variant="default">
                <!-- CheckCircle2 SVG Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <AlertTitle>Berhasil!</AlertTitle>
                <AlertDescription>{{ flashSuccess }}</AlertDescription>
              </Alert>

              <!-- Name -->
              <div class="space-y-2">
                <Label for="name">Nama Lengkap <span class="text-destructive">*</span></Label>
                <div class="relative">
                  <!-- User SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
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
                <p v-else class="text-xs text-muted-foreground">
                  Nama lengkap sesuai identitas, maksimal 255 karakter
                </p>
              </div>

              <!-- Username -->
              <div class="space-y-2">
                <Label for="username">Username <span class="text-destructive">*</span></Label>
                <div class="relative">
                  <!-- AtSign SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>
                  </svg>
                  <Input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="contoh: puranusa123"
                    class="pl-10"
                    :class="{ 'border-destructive': form.errors.username }"
                    required
                    autocomplete="username"
                  />
                </div>
                <p v-if="form.errors.username" class="text-sm text-destructive">
                  {{ form.errors.username }}
                </p>
                <p v-else class="text-xs text-muted-foreground">
                  Username untuk login, hanya boleh huruf, angka, dash (-), dan underscore (_). Maksimal 100 karakter
                </p>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <Label for="email">Email <span class="text-destructive">*</span></Label>
                <div class="relative">
                  <!-- Mail SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
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
                <p v-else class="text-xs text-muted-foreground">
                  Email aktif untuk menerima notifikasi dan informasi akun
                </p>
              </div>

              <!-- Phone -->
              <div class="space-y-2">
                <Label for="phone">Nomor Telepon <span class="text-destructive">*</span></Label>
                <div class="relative">
                  <!-- Phone SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
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
                <p v-else class="text-xs text-muted-foreground">
                  Nomor telepon aktif (WhatsApp), maksimal 20 karakter
                </p>
              </div>

              <!-- NIK (opsional) -->
              <div class="space-y-2">
                <Label for="nik">NIK (Opsional)</Label>
                <div class="relative">
                  <!-- IdCard SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                  </svg>
                  <Input
                    id="nik"
                    v-model="form.nik"
                    type="text"
                    inputmode="numeric"
                    placeholder="Contoh: 3201234567890001"
                    class="pl-10"
                    :class="{ 'border-destructive': form.errors.nik }"
                    autocomplete="off"
                    maxlength="32"
                  />
                </div>
                <p v-if="form.errors.nik" class="text-sm text-destructive">
                  {{ form.errors.nik }}
                </p>
                <p v-else class="text-xs text-muted-foreground">
                  Nomor Induk Kependudukan (8-32 digit angka)
                </p>
              </div>

              <!-- Gender (opsional) -->
              <div class="space-y-2">
                <Label for="gender">Jenis Kelamin (Opsional)</Label>
                <Select v-model="form.gender">
                  <SelectTrigger :class="{ 'border-destructive': form.errors.gender }">
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <p v-if="form.errors.gender" class="text-sm text-destructive">
                  {{ form.errors.gender }}
                </p>
                <p v-else class="text-xs text-muted-foreground">
                  Pilih jenis kelamin Anda
                </p>
              </div>

              <!-- Alamat (opsional) -->
              <div class="space-y-2">
                <Label for="alamat">Alamat (Opsional)</Label>
                <Textarea
                  id="alamat"
                  v-model="form.alamat"
                  placeholder="Tulis alamat lengkap (jalan, RT/RW, kelurahan, kecamatan, kota)"
                  :class="{ 'border-destructive': form.errors.alamat }"
                  rows="3"
                />
                <p v-if="form.errors.alamat" class="text-sm text-destructive">
                  {{ form.errors.alamat }}
                </p>
                <p v-else class="text-xs text-muted-foreground">
                  Alamat lengkap untuk keperluan pengiriman
                </p>
              </div>

              <!-- Referral Code -->
              <div class="space-y-2">
                <Label for="ref_code">Kode Referral (Opsional)</Label>
                <div class="relative">
                  <!-- Users SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <Input
                    id="ref_code"
                    v-model="form.ref_code"
                    type="text"
                    placeholder="Contoh: REF-XXXXXXXX"
                    class="pl-10"
                    :class="{ 'border-destructive': form.errors.ref_code }"
                    autocomplete="off"
                  />
                </div>
                <p v-if="form.errors.ref_code" class="text-sm text-destructive">
                  {{ form.errors.ref_code }}
                </p>
                <p v-else class="text-xs text-muted-foreground">
                  Masukkan kode referral dari sponsor yang mengajak Anda (jika ada)
                </p>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <Label for="password">Password <span class="text-destructive">*</span></Label>
                <div class="relative">
                  <!-- Lock SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <Input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Minimal 8 karakter"
                    class="pr-10 pl-10"
                    :class="{ 'border-destructive': form.errors.password }"
                    required
                    autocomplete="new-password"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                  >
                    <!-- Eye SVG Icon (when password is hidden) -->
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <!-- EyeOff SVG Icon (when password is shown) -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                      <path d="m2 2 20 20"/>
                    </svg>
                  </button>
                </div>
                <p v-if="form.errors.password" class="text-sm text-destructive">
                  {{ form.errors.password }}
                </p>
                <p v-else class="text-xs text-muted-foreground">
                  Password minimal 8 karakter, gunakan kombinasi huruf dan angka
                </p>
              </div>

              <!-- Password Confirmation -->
              <div class="space-y-2">
                <Label for="password_confirmation">Konfirmasi Password <span class="text-destructive">*</span></Label>
                <div class="relative">
                  <!-- Lock SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-3 left-3 h-4 w-4 text-muted-foreground">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <Input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    placeholder="Ulangi password"
                    class="pr-10 pl-10"
                    :class="{ 'border-destructive': form.errors.password_confirmation }"
                    required
                    autocomplete="new-password"
                  />
                  <button
                    type="button"
                    @click="showPasswordConfirmation = !showPasswordConfirmation"
                    class="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                  >
                    <!-- Eye SVG Icon (when password is hidden) -->
                    <svg v-if="!showPasswordConfirmation" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <!-- EyeOff SVG Icon (when password is shown) -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                      <path d="m2 2 20 20"/>
                    </svg>
                  </button>
                </div>
                <p v-if="form.errors.password_confirmation" class="text-sm text-destructive">
                  {{ form.errors.password_confirmation }}
                </p>
                <p v-else class="text-xs text-muted-foreground">
                  Ketik ulang password yang sama untuk konfirmasi
                </p>
              </div>

              <!-- Terms -->
              <p class="text-xs text-muted-foreground">
                Dengan mendaftar, Anda menyetujui
                <Link href="/terms" class="text-primary hover:underline">Syarat & Ketentuan</Link>
                dan
                <Link href="/privacy" class="text-primary hover:underline">Kebijakan Privasi</Link>
                kami.
              </p>

              <!-- Submit Button -->
              <Button type="submit" class="w-full" :disabled="form.processing">
                <template v-if="form.processing">
                  <!-- Loader SVG Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Memproses...
                </template>
                <span v-else>Daftar Sekarang</span>
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

            <!-- Login Link -->
            <div class="text-center text-sm">
              <span class="text-muted-foreground">Sudah punya akun? </span>
              <Link href="/client/login" class="font-medium text-primary hover:underline">Masuk</Link>
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
