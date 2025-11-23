<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();

const appSettings = computed(() => page.props.appSettings as {
    site_name?: string;
    site_logo?: string;
    site_description?: string;
});

const siteName = computed(() => appSettings.value?.site_name || 'PURANUSA');
const siteLogo = computed(() => appSettings.value?.site_logo);
</script>

<template>
    <div
        class="flex aspect-square size-8 items-center justify-center rounded-md border text-sidebar-primary-foreground"
    >
        <img
            v-if="siteLogo"
            :src="siteLogo"
            :alt="siteName"
            class="size-8 object-contain rounded-md"
        />
        <AppLogoIcon v-else class="size-5 fill-current text-white dark:text-black" />
    </div>
    <div class="ml-1 grid flex-1 text-left text-sm">
        <span class="mb-0.5 truncate leading-tight font-semibold">
            {{ siteName }}
        </span>
    </div>
</template>
