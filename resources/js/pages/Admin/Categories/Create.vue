<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import CategoryForm from '@/components/categories/CategoryForm.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { ref, computed } from 'vue';

interface ParentCategory {
    id: number;
    name: string;
}

interface Props {
    parentCategories: ParentCategory[];
}

defineProps<Props>();

const form = ref({
    parent_id: null as number | null,
    slug: '',
    name: '',
    description: '',
    sort_order: 0,
    is_active: true,
    image: null as File | string | null,
});

const submitForm = useForm({});
const errors = computed(() => submitForm.errors);
const processing = computed(() => submitForm.processing);

const submit = () => {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('slug', form.value.slug);
    formData.append('description', form.value.description || '');
    formData.append('sort_order', String(form.value.sort_order));
    formData.append('is_active', form.value.is_active ? '1' : '0');

    if (form.value.parent_id) {
        formData.append('parent_id', String(form.value.parent_id));
    }

    if (form.value.image instanceof File) {
        formData.append('image', form.value.image);
    }

    submitForm
        .transform(() => formData)
        .post('/admin/categories', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success('Kategori berhasil ditambahkan');
            },
            onError: () => {
                toast.error('Gagal menambahkan kategori');
            },
        });
};
</script>

<template>
    <Head title="Tambah Kategori" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/categories">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Tambah Kategori</h1>
                    <p class="text-muted-foreground">Buat kategori produk baru</p>
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
                            {{ processing ? 'Menyimpan...' : 'Simpan Kategori' }}
                        </Button>
                    </template>
                </CategoryForm>
            </div>
        </div>
    </AppLayout>
</template>
