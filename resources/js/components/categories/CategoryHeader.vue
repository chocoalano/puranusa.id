<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
import { usePermissions } from '@/composables/usePermissions';

interface Props {
    title: string;
    description: string;
    showAddButton?: boolean;
}

withDefaults(defineProps<Props>(), {
    showAddButton: true,
});
const { isSuperAdmin, isAdmin } = usePermissions()
</script>

<template>
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
            <p class="text-muted-foreground">{{ description }}</p>
        </div>
        <Link v-if="showAddButton" href="/admin/categories/create">
            <Button v-if="isSuperAdmin || isAdmin">
                <Plus class="mr-2 h-4 w-4" />
                Tambah Kategori
            </Button>
        </Link>
    </div>
</template>
