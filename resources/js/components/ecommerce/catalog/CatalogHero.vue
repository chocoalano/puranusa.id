<script setup lang="ts">
interface Props {
    title: string;
    description: string;
}

defineProps<Props>();
</script>

<template>
    <div class="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div class="container mx-auto px-4 py-12">
            <div class="max-w-3xl">
                <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {{ title }}
                </h1>
                <p class="text-lg text-muted-foreground mb-6">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>
