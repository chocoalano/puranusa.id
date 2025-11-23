<script setup lang="ts">
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import { Upload, X, Star, Loader2, Image as ImageIcon } from 'lucide-vue-next'
import { deleteImage as deleteImageRoute, setPrimaryImage as setPrimaryImageRoute } from '@/actions/App/Http/Controllers/Admin/ProductManagementController'

interface ProductMedia {
  id: number
  url: string
  alt_text: string
  sort_order: number
  is_primary: boolean
}

interface Props {
  productId?: number
  existingImages?: ProductMedia[]
  maxImages?: number
  modelValue?: File[]
}

const props = withDefaults(defineProps<Props>(), {
  maxImages: 10,
  existingImages: () => [],
  modelValue: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: File[]]
}>()

const isDragging = ref(false)
const selectedFiles = ref<File[]>([...props.modelValue])
const previews = ref<{ file: File; url: string }[]>([])
const deletingImages = ref<Set<number>>(new Set())
const settingPrimary = ref(false)

const remainingSlots = computed(() => {
  return props.maxImages - (props.existingImages.length + selectedFiles.value.length)
})

const canAddMore = computed(() => remainingSlots.value > 0)

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false

  const files = Array.from(e.dataTransfer?.files || [])
  addFiles(files)
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  addFiles(files)
  // Reset input
  target.value = ''
}

const addFiles = (files: File[]) => {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'))

  // Validate file types
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  const validFiles = imageFiles.filter((file) => validTypes.includes(file.type))

  if (validFiles.length !== imageFiles.length) {
    alert('Beberapa file diabaikan. Hanya JPG, PNG, dan WebP yang diperbolehkan.')
  }

  // Validate file sizes (2MB max)
  const maxSize = 2 * 1024 * 1024 // 2MB
  const validSizedFiles = validFiles.filter((file) => {
    if (file.size > maxSize) {
      alert(`File ${file.name} terlalu besar. Maksimal 2MB.`)
      return false
    }
    return true
  })

  // Check max images limit
  const availableSlots = remainingSlots.value
  const filesToAdd = validSizedFiles.slice(0, availableSlots)

  if (validSizedFiles.length > availableSlots) {
    alert(`Hanya ${availableSlots} gambar yang dapat ditambahkan. Maksimal ${props.maxImages} gambar.`)
  }

  // Create previews
  filesToAdd.forEach((file) => {
    const url = URL.createObjectURL(file)
    previews.value.push({ file, url })
  })

  selectedFiles.value = [...selectedFiles.value, ...filesToAdd]
  emit('update:modelValue', selectedFiles.value)
}

const removeFile = (index: number) => {
  const preview = previews.value[index]
  URL.revokeObjectURL(preview.url)

  previews.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
  emit('update:modelValue', selectedFiles.value)
}

const deleteExistingImage = async (imageId: number) => {
  if (!confirm('Hapus gambar ini?')) return

  deletingImages.value.add(imageId)

  try {
    await router.delete(deleteImageRoute.url(imageId), {
      preserveScroll: true,
      onSuccess: () => {
        deletingImages.value.delete(imageId)
      },
      onError: () => {
        deletingImages.value.delete(imageId)
        alert('Gagal menghapus gambar')
      },
    })
  } catch {
    deletingImages.value.delete(imageId)
    alert('Terjadi kesalahan saat menghapus gambar')
  }
}

const setPrimaryImage = async (imageId: number) => {
  if (!props.productId) return

  settingPrimary.value = true

  try {
    await router.post(
      setPrimaryImageRoute.url(props.productId),
      { media_id: imageId },
      {
        preserveScroll: true,
        onFinish: () => {
          settingPrimary.value = false
        },
        onError: () => {
          alert('Gagal mengatur gambar utama')
        },
      },
    )
  } catch {
    settingPrimary.value = false
    alert('Terjadi kesalahan')
  }
}

const getImageUrl = (url: string, size: string = 'medium') => {
  // Handle new format: products/{id}/original/filename.webp
  if (url.includes('/original/')) {
    return `/storage/${url.replace('/original/', `/${size}/`)}`
  }

  // Handle old format: images/products/filename.jpg
  // Just return as-is with /storage prefix
  return `/storage/${url}`
}
</script>

<template>
  <div class="space-y-4">
    <!-- Existing Images -->
    <div v-if="existingImages.length > 0" class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Gambar Produk ({{ existingImages.length }}/{{ maxImages }})
      </label>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <div
          v-for="image in existingImages"
          :key="image.id"
          class="group relative aspect-square overflow-hidden rounded-lg border-2 transition-all"
          :class="[
            image.is_primary
              ? 'border-yellow-400 ring-2 ring-yellow-400 ring-offset-2'
              : 'border-gray-200 dark:border-gray-700',
          ]"
        >
          <img
            :src="getImageUrl(image.url, 'small')"
            :alt="image.alt_text"
            class="h-full w-full object-cover"
          />

          <!-- Primary Badge -->
          <div
            v-if="image.is_primary"
            class="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-1 text-xs font-medium text-yellow-900"
          >
            <Star :size="12" class="fill-current" />
            <span>Utama</span>
          </div>

          <!-- Actions Overlay -->
          <div
            class="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <button
              v-if="!image.is_primary"
              type="button"
              :disabled="settingPrimary || deletingImages.has(image.id)"
              @click="setPrimaryImage(image.id)"
              class="rounded-full bg-yellow-400 p-2 text-yellow-900 transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
              title="Jadikan gambar utama"
            >
              <Star :size="16" />
            </button>

            <button
              type="button"
              :disabled="deletingImages.has(image.id) || settingPrimary"
              @click="deleteExistingImage(image.id)"
              class="rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              title="Hapus gambar"
            >
              <Loader2 v-if="deletingImages.has(image.id)" :size="16" class="animate-spin" />
              <X v-else :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Images Preview -->
    <div v-if="previews.length > 0" class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Gambar Baru ({{ previews.length }})
      </label>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <div
          v-for="(preview, index) in previews"
          :key="preview.url"
          class="group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700"
        >
          <img :src="preview.url" :alt="preview.file.name" class="h-full w-full object-cover" />

          <!-- File name -->
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1"
          >
            <p class="truncate text-xs text-white">{{ preview.file.name }}</p>
          </div>

          <!-- Remove button -->
          <button
            type="button"
            @click="removeFile(index)"
            class="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
            title="Hapus"
          >
            <X :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Zone -->
    <div v-if="canAddMore" class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Tambah Gambar ({{ remainingSlots }} slot tersisa)
      </label>

      <div
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        class="relative cursor-pointer rounded-lg border-2 border-dashed transition-colors"
        :class="[
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500',
        ]"
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          multiple
          @change="handleFileSelect"
          class="absolute inset-0 cursor-pointer opacity-0"
          :disabled="!canAddMore"
        />

        <div class="flex flex-col items-center justify-center gap-3 px-6 py-8">
          <div
            class="rounded-full p-3"
            :class="
              isDragging
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : 'bg-gray-100 dark:bg-gray-700'
            "
          >
            <Upload
              :size="32"
              :class="isDragging ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'"
            />
          </div>

          <div class="text-center">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ isDragging ? 'Lepaskan file di sini' : 'Drag & drop gambar atau klik untuk memilih' }}
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              JPG, PNG, atau WebP (maks. 2MB per file)
            </p>
            <p class="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400">
              Maksimal {{ maxImages }} gambar total
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
      <div class="flex gap-2">
        <ImageIcon :size="20" class="shrink-0 text-blue-600 dark:text-blue-400" />
        <div class="text-sm text-blue-800 dark:text-blue-300">
          <p class="font-medium">Tips:</p>
          <ul class="mt-1 list-inside list-disc space-y-1">
            <li>Gambar pertama otomatis menjadi gambar utama</li>
            <li>Klik ikon bintang untuk mengubah gambar utama</li>
            <li>Semua gambar akan di-generate dalam 5 ukuran responsif</li>
            <li>Format akan dikonversi ke WebP untuk performa optimal</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
