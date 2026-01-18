<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImagePlus, X, Upload } from 'lucide-vue-next'

interface FormData {
  code: string
  name: string
  type: string
  landing_slug: string
  description: string
  image: string | File | null
  start_at: string
  end_at: string
  is_active: boolean
  priority: number
  max_redemption: number | null
  per_user_limit: number | null
  conditions_json: string
  show_on: string
  page: string

  /**
   * ✅ opsional tapi disarankan untuk edit form:
   * backend bisa membaca ini untuk menghapus gambar lama
   */
  remove_image?: boolean
}

interface Props {
  errors?: Record<string, string>
  processing?: boolean
  existingImage?: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: []
}>()

const formData = defineModel<FormData>('formData', { required: true })

const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)
const isDragging = ref(false)

/**
 * ✅ KUNCI PERBAIKAN:
 * Flag untuk menonaktifkan fallback ke existingImage setelah remove
 */
const removedExistingImage = ref(false)

/**
 * ✅ Reset state ketika existingImage berubah (mis. ganti record / open edit item lain)
 */
watch(
  () => props.existingImage,
  () => {
    removedExistingImage.value = false
    // Jangan otomatis hapus imagePreview di sini,
    // karena user bisa saja sedang memilih gambar baru.
    // Tetapi untuk safety pada pergantian record, ini biasanya oke:
    imagePreview.value = null

    // reset input file agar tidak "nyangkut"
    if (fileInput.value) fileInput.value.value = ''

    // reset flag backend
    if (formData.value) formData.value.remove_image = false
  }
)

// Computed untuk menampilkan preview
const displayImage = computed(() => {
  // prioritas: preview hasil upload baru
  if (imagePreview.value) return imagePreview.value

  // fallback: existingImage hanya kalau belum "di-remove"
  if (!removedExistingImage.value && props.existingImage) return props.existingImage

  return null
})

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) processFile(file)
}

const processFile = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    alert('Hanya file gambar (JPEG, PNG, GIF, WebP) yang diizinkan')
    return
  }

  const maxSize = 2 * 1024 * 1024
  if (file.size > maxSize) {
    alert('Ukuran file maksimal 2MB')
    return
  }

  // ✅ user memilih gambar baru => jangan tampilkan existing image lagi
  removedExistingImage.value = true

  // ✅ kalau sebelumnya user pernah remove, sekarang batal remove (karena upload baru)
  formData.value.remove_image = false

  formData.value.image = file

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false

  const file = event.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

/**
 * ✅ removeImage sekarang bekerja:
 * - hilangkan preview baru
 * - sembunyikan existingImage
 * - kosongkan file input
 * - set flag remove_image untuk backend (opsional)
 */
const removeImage = () => {
  removedExistingImage.value = true
  imagePreview.value = null
  formData.value.image = null

  // ✅ untuk backend hapus gambar lama
  formData.value.remove_image = true

  if (fileInput.value) fileInput.value.value = ''
}

const triggerFileInput = () => {
  fileInput.value?.click()
}
</script>

<template>
  <form @submit.prevent="emit('submit')" class="space-y-6">
    <!-- Informasi Dasar -->
    <Card>
      <CardHeader>
        <CardTitle>Informasi Dasar</CardTitle>
        <CardDescription>Detail utama promosi atau diskon</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="code">Kode Promosi *</Label>
            <Input id="code" v-model="formData.code" placeholder="PROMO2024" class="uppercase" required />
            <p v-if="props.errors?.code" class="text-sm text-destructive">
              {{ props.errors.code }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="name">Nama Promosi *</Label>
            <Input id="name" v-model="formData.name" placeholder="Flash Sale Akhir Tahun" required />
            <p v-if="props.errors?.name" class="text-sm text-destructive">
              {{ props.errors.name }}
            </p>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="type">Tipe Promosi *</Label>
            <Select v-model="formData.type" required>
              <SelectTrigger id="type">
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">Diskon</SelectItem>
                <SelectItem value="bundle">Bundle</SelectItem>
                <SelectItem value="flash_sale">Flash Sale</SelectItem>
                <SelectItem value="promo">Promo</SelectItem>
              </SelectContent>
            </Select>

            <p v-if="props.errors?.type" class="text-sm text-destructive">
              {{ props.errors.type }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="landing_slug">Landing Page Slug</Label>
            <Input id="landing_slug" v-model="formData.landing_slug" placeholder="flash-sale-2024" />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="description">Deskripsi</Label>
          <Textarea id="description" v-model="formData.description" placeholder="Deskripsi promosi (opsional)" rows="3" />
        </div>

        <div class="space-y-2">
          <Label for="image">Gambar Promosi</Label>

          <div
            :class="[
              'relative border-2 border-dashed rounded-lg transition-colors',
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50',
              'min-h-[200px] flex items-center justify-center'
            ]"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
          >
            <!-- Preview Image -->
            <div v-if="displayImage" class="relative w-full h-full p-4">
              <img
                :src="displayImage"
                alt="Preview"
                class="max-h-[300px] w-auto mx-auto rounded-lg object-contain"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                class="absolute top-2 right-2"
                @click="removeImage"
              >
                <X class="h-4 w-4" />
              </Button>
            </div>

            <!-- Upload Placeholder -->
            <div v-else class="text-center p-6">
              <div class="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <ImagePlus class="h-6 w-6 text-muted-foreground" />
              </div>

              <p class="text-sm text-muted-foreground mb-2">Drag &amp; drop gambar di sini, atau</p>

              <Button type="button" variant="outline" size="sm" @click="triggerFileInput">
                <Upload class="h-4 w-4 mr-2" />
                Pilih File
              </Button>

              <p class="text-xs text-muted-foreground mt-2">PNG, JPG, GIF, WebP (maks. 2MB)</p>
            </div>

            <input
              ref="fileInput"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              class="hidden"
              @change="handleFileSelect"
            />
          </div>

          <p v-if="props.errors?.image" class="text-sm text-destructive">
            {{ props.errors.image }}
          </p>
        </div>
      </CardContent>
    </Card>

    <!-- Periode & Pengaturan -->
    <Card>
      <CardHeader>
        <CardTitle>Periode & Pengaturan</CardTitle>
        <CardDescription>Atur waktu dan batasan promosi</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="start_at">Tanggal Mulai *</Label>
            <Input id="start_at" v-model="formData.start_at" type="datetime-local" required />
            <p v-if="props.errors?.start_at" class="text-sm text-destructive">
              {{ props.errors.start_at }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="end_at">Tanggal Berakhir *</Label>
            <Input id="end_at" v-model="formData.end_at" type="datetime-local" required />
            <p v-if="props.errors?.end_at" class="text-sm text-destructive">
              {{ props.errors.end_at }}
            </p>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="space-y-2">
            <Label for="priority">Prioritas</Label>
            <Input id="priority" v-model.number="formData.priority" type="number" min="0" placeholder="0" />
            <p class="text-sm text-muted-foreground">Angka lebih tinggi = prioritas lebih tinggi</p>
          </div>

          <div class="space-y-2">
            <Label for="max_redemption">Maks. Penebusan</Label>
            <Input
              id="max_redemption"
              :value="formData.max_redemption ?? ''"
              @input="formData.max_redemption = ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null"
              type="number"
              min="0"
              placeholder="Tidak terbatas"
            />
          </div>

          <div class="space-y-2">
            <Label for="per_user_limit">Limit Per User</Label>
            <Input
              id="per_user_limit"
              :value="formData.per_user_limit ?? ''"
              @input="formData.per_user_limit = ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null"
              type="number"
              min="0"
              placeholder="Tidak terbatas"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input id="is_active" v-model="formData.is_active" type="checkbox" class="rounded" />
          <Label for="is_active">Promosi Aktif</Label>
        </div>
      </CardContent>
    </Card>

    <!-- Penempatan -->
    <Card>
      <CardHeader>
        <CardTitle>Penempatan</CardTitle>
        <CardDescription>Tentukan dimana promosi ditampilkan</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="show_on">Tampilkan Di</Label>
            <Select v-model="formData.show_on">
              <SelectTrigger id="show_on">
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homepage">Homepage</SelectItem>
                <SelectItem value="product_page">Product Page</SelectItem>
                <SelectItem value="checkout">Checkout</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="page">Halaman</Label>
            <Select v-model="formData.page">
              <SelectTrigger id="page">
                <SelectValue placeholder="Pilih halaman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="cart">Cart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="conditions_json">Kondisi (JSON)</Label>
          <Textarea
            id="conditions_json"
            v-model="formData.conditions_json"
            placeholder='{"min_purchase": 100000, "categories": [1, 2]}'
            rows="3"
            class="font-mono text-sm"
          />
          <p class="text-sm text-muted-foreground">Format JSON untuk kondisi spesifik promosi</p>
        </div>
      </CardContent>
    </Card>

    <div class="flex justify-end gap-4">
      <slot name="actions" :processing="props.processing" />
    </div>
  </form>
</template>
