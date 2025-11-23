<script setup lang="ts">
import { ref } from 'vue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-vue-next';

interface Props {
    images: string[];
    productName: string;
}

const props = defineProps<Props>();

const selectedImageIndex = ref(0);
const isZoomed = ref(false);

const selectImage = (index: number) => {
    selectedImageIndex.value = index;
};

const nextImage = () => {
    selectedImageIndex.value = (selectedImageIndex.value + 1) % props.images.length;
};

const prevImage = () => {
    selectedImageIndex.value = (selectedImageIndex.value - 1 + props.images.length) % props.images.length;
};

const toggleZoom = () => {
    isZoomed.value = !isZoomed.value;
};
</script>

<template>
    <div class="space-y-4">
        <!-- Main Image -->
        <Card class="overflow-hidden relative group">
            <div class="aspect-square bg-muted/30 relative">
                <img
                    :src="images[selectedImageIndex]"
                    :alt="productName"
                    class="w-full h-full object-cover"
                    :class="{ 'cursor-zoom-in': !isZoomed, 'cursor-zoom-out scale-150': isZoomed }"
                    @click="toggleZoom"
                />

                <!-- Navigation Arrows -->
                <div v-if="images.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="secondary"
                        size="icon"
                        class="rounded-full"
                        @click="prevImage"
                    >
                        <ChevronLeft class="h-5 w-5" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        class="rounded-full"
                        @click="nextImage"
                    >
                        <ChevronRight class="h-5 w-5" />
                    </Button>
                </div>

                <!-- Zoom Indicator -->
                <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" class="rounded-full" @click="toggleZoom">
                        <ZoomIn class="h-4 w-4" />
                    </Button>
                </div>

                <!-- Image Counter -->
                <div v-if="images.length > 1" class="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {{ selectedImageIndex + 1 }} / {{ images.length }}
                </div>
            </div>
        </Card>

        <!-- Thumbnail Grid -->
        <div v-if="images.length > 1" class="grid grid-cols-5 gap-3">
            <button
                v-for="(image, index) in images"
                :key="index"
                @click="selectImage(index)"
                class="aspect-square overflow-hidden rounded-lg border-2 transition-all hover:border-primary"
                :class="{
                    'border-primary ring-2 ring-primary ring-offset-2': selectedImageIndex === index,
                    'border-border': selectedImageIndex !== index
                }"
            >
                <img
                    :src="image"
                    :alt="`${productName} - Image ${index + 1}`"
                    class="w-full h-full object-cover"
                />
            </button>
        </div>
    </div>
</template>
