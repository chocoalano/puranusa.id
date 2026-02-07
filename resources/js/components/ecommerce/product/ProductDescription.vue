<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Ruler } from 'lucide-vue-next'

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

defineProps<Props>()
</script>

<template>
  <div class="space-y-6">
    <!-- Short Description -->
    <div v-if="shortDescription">
      <h3 class="text-lg font-semibold mb-3">Deskripsi Singkat</h3>
      <p class="text-muted-foreground leading-relaxed">
        {{ shortDescription }}
      </p>
    </div>

    <Separator />

    <!-- Detailed Description -->
    <div v-if="longDescription">
      <h3 class="text-lg font-semibold mb-3">Deskripsi Lengkap</h3>

      <!-- Wrapper biar rapi & readable -->
      <div class="rounded-lg border bg-card p-4 md:p-6">
        <div
          class="
            prose prose-sm md:prose-base max-w-none dark:prose-invert

            /* wrapping & whitespace */
            whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word]

            /* spacing lebih konsisten */
            prose-headings:scroll-mt-24
            prose-h1:mt-0 prose-h2:mt-6 prose-h3:mt-5 prose-h4:mt-4
            prose-p:my-3 prose-p:leading-relaxed
            prose-ul:my-3 prose-ol:my-3
            prose-li:my-1

            /* link */
            prose-a:text-primary prose-a:underline prose-a:underline-offset-4

            /* image responsive */
            prose-img:my-4 prose-img:rounded-lg prose-img:border
            [&_img]:max-w-full [&_img]:h-auto

            /* blockquote */
            prose-blockquote:my-4 prose-blockquote:border-l-4 prose-blockquote:border-l-primary
            prose-blockquote:pl-4 prose-blockquote:text-muted-foreground

            /* hr */
            prose-hr:my-6

            /* table: jangan merusak layout */
            [&_table]:w-full [&_table]:border-collapse
            [&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-nowrap
            [&_th]:border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
            [&_td]:border [&_td]:px-3 [&_td]:py-2

            /* kalau ada <br> kebanyakan, tetap enak */
            [&_br]:content-['']

            /* rapihin strong & list item paragraph */
            [&_p>strong]:font-semibold
            [&_ol>li>p]:my-1 [&_ul>li>p]:my-1

            /* hilangkan margin elemen pertama/terakhir biar gak “meledak” */
            [&_:first-child]:mt-0
            [&_:last-child]:mb-0
          "
          v-html="longDescription"
        />
      </div>
    </div>

    <Separator />

    <!-- Specifications -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Spesifikasi Produk</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card v-if="weightGram">
          <CardHeader class="pb-3">
            <CardTitle class="text-sm flex items-center gap-2">
              <Package class="h-4 w-4" />
              Berat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">{{ weightGram }} gr</p>
          </CardContent>
        </Card>

        <Card v-if="dimensions">
          <CardHeader class="pb-3">
            <CardTitle class="text-sm flex items-center gap-2">
              <Ruler class="h-4 w-4" />
              Dimensi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">
              {{ dimensions.length }} x {{ dimensions.width }} x {{ dimensions.height }} mm
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
