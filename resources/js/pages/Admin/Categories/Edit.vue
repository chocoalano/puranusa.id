<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import CategoryForm from '@/components/categories/CategoryForm.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

interface ParentCategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    parent_id: number | null;
    slug: string;
    name: string;
    description: string | null;
    sort_order: number;
    is_active: boolean;
    image: string | null;
}

interface Props {
    category: Category;
    parentCategories: ParentCategory[];
}

const props = defineProps<Props>();

const form = ref({
    parent_id: props.category.parent_id,
    slug: props.category.slug,
    name: props.category.name,
    description: props.category.description || '',
    sort_order: props.category.sort_order,
    is_active: props.category.is_active,
    image: props.category.image || '',
});

const errors = ref<Record<string, string>>({});
const processing = ref(false);

const submit = () => {
    processing.value = true;
    router.put(`/admin/categories/${props.category.id}`, form.value, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Kategori berhasil diperbarui');
        },
        onError: (err) => {
            errors.value = err;
            toast.error('Gagal memperbarui kategori');
        },
        onFinish: () => {
            processing.value = false;
        },
    });
};
</script>

<template>
    <Head :title="`Edit ${category.name}`" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/categories">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Edit Kategori</h1>
                    <p class="text-muted-foreground">Perbarui informasi kategori</p>
                </div>
            </div>

            <div class="max-w-4xl">
                <CategoryForm
                    v-model:form-data="form"
                    :parent-categories="parentCategories"
                    :errors="errors"
                    :processing="processing"
                    @submit="submit"
                >
                    <template #actions="{ processing }">
                        <Link href="/admin/categories">
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                        <Button type="submit" :disabled="processing">
                            {{ processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                        </Button>
                    </template>
                </CategoryForm>
            </div>
        </div>
    </AppLayout>
</template>
