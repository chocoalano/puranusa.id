<script setup lang="ts">
import { Button } from '@/components/ui/button'

interface PaginationData {
  current_page: number
  last_page: number
  from: number
  to: number
  total: number
}

interface Props {
  data: PaginationData
  itemLabel?: string
  onPageChange: (page: number) => void
}

withDefaults(defineProps<Props>(), {
  itemLabel: 'item',
})
</script>

<template>
  <div class="flex items-center justify-between px-2 py-4">
    <div class="text-sm text-muted-foreground">
      Menampilkan {{ data.from }} sampai {{ data.to }} dari
      {{ data.total }} {{ itemLabel }}
    </div>
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="data.current_page === 1"
        @click="onPageChange(1)"
      >
        Pertama
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="data.current_page === 1"
        @click="onPageChange(data.current_page - 1)"
      >
        Sebelumnya
      </Button>
      <span class="text-sm">
        Halaman {{ data.current_page }} dari {{ data.last_page }}
      </span>
      <Button
        variant="outline"
        size="sm"
        :disabled="data.current_page === data.last_page"
        @click="onPageChange(data.current_page + 1)"
      >
        Selanjutnya
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="data.current_page === data.last_page"
        @click="onPageChange(data.last_page)"
      >
        Terakhir
      </Button>
    </div>
  </div>
</template>
