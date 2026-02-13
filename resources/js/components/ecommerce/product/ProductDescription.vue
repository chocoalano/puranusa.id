<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Ruler, Info, Lightbulb } from 'lucide-vue-next'
import { computed } from 'vue'

interface Dimensions {
  length: number
  width: number
  height: number
}

interface Props {
  shortDescription?: string
  longDescription?: string
  weightGram?: number
  dimensions?: Dimensions
}

const props = defineProps<Props>()

/**
 * Normalisasi HTML Tiptap:
 * 1. Mengganti || menjadi pemisah visual.
 * 2. Membersihkan p didalam li agar list sejajar secara vertikal.
 */
const formatHtml = (html?: string) => {
  if (!html) return ''
  return html
    .replace(/\s*\|\|\s*/g, '<div class="spacer-divider"></div>')
    .replace(/<li>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/gi, '<li>$1</li>')
    .trim()
}

const renderedShort = computed(() => formatHtml(props.shortDescription))
const renderedLong = computed(() => formatHtml(props.longDescription))
</script>

<template>
  <div class="product-info-wrapper">
    <section v-if="renderedShort" class="text-section">
      <div class="minimal-label">
        <Info class="h-4 w-4" />
        <span>Ringkasan Produk</span>
      </div>
      <div class="tiptap-render" v-html="renderedShort" />
    </section>

    <Separator v-if="renderedShort && renderedLong" class="my-8" />

    <section v-if="renderedLong" class="text-section">
      <div class="minimal-label">
        <Lightbulb class="h-4 w-4" />
        <span>Deskripsi Lengkap</span>
      </div>
      <div class="tiptap-render" v-html="renderedLong" />
    </section>

    <Separator class="my-8" />

    <section v-if="weightGram || dimensions">
      <h3 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Spesifikasi Fisik
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card v-if="weightGram">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium flex items-center gap-2">
              <Package class="h-4 w-4 text-muted-foreground" />
              Berat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ weightGram }} <span class="text-sm font-normal text-muted-foreground">gr</span>
            </div>
          </CardContent>
        </Card>

        <Card v-if="dimensions">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium flex items-center gap-2">
              <Ruler class="h-4 w-4 text-muted-foreground" />
              Dimensi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ dimensions.length }}×{{ dimensions.width }}×{{ dimensions.height }}
              <span class="text-sm font-normal text-muted-foreground ml-1">mm</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Scoped CSS tanpa @apply untuk kompatibilitas Tailwind v4 */

.product-info-wrapper {
  width: 100%;
}

.text-section {
  margin-bottom: 1.5rem;
}

.minimal-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #64748b; /* slate-500 */
}

.minimal-label span {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* TIPTAP RENDERER STYLING */
.tiptap-render :deep(p) {
  line-height: 1.7;
  margin-bottom: 1rem;
  color: inherit;
}

.tiptap-render :deep(strong) {
  font-weight: 700;
}

/* Layout Blockquote untuk Manfaat */
.tiptap-render :deep(blockquote) {
  border-left: 3px solid #e2e8f0; /* slate-200 */
  margin: 1.5rem 0;
  padding: 0.5rem 0 0.5rem 1.25rem;
}

.tiptap-render :deep(blockquote h2) {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

/* List / Bullet Points */
.tiptap-render :deep(ul) {
  list-style-type: disc;
  margin: 1rem 0 1rem 1.25rem;
  padding: 0;
}

.tiptap-render :deep(li) {
  margin-bottom: 0.4rem;
}

.tiptap-render :deep(li p) {
  margin-bottom: 0;
}

.spacer-divider {
  height: 1.5rem;
}

/* Dark Mode support */
@media (prefers-color-scheme: dark) {
  .tiptap-render :deep(blockquote) {
    border-left-color: #334155; /* slate-700 */
  }
}
</style>
