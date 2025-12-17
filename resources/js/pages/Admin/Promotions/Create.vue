<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import PromotionForm from '@/components/promotions/PromotionForm.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

const form = ref({
    code: '',
    name: '',
    type: 'discount',
    landing_slug: '',
    description: '',
    image: null as File | string | null,
    start_at: '',
    end_at: '',
    is_active: true,
    priority: 0,
    max_redemption: null as number | null,
    per_user_limit: null as number | null,
    conditions_json: '',
    show_on: '',
    page: '',
});

const errors = ref<Record<string, string>>({});
const processing = ref(false);

const submit = () => {
    processing.value = true;

    // Create FormData for file upload
    const formData = new FormData();
    Object.entries(form.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0');
            } else {
                formData.append(key, String(value));
            }
        }
    });

    router.post('/admin/promotions', formData, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            toast.success('Promosi berhasil ditambahkan');
        },
        onError: (err) => {
            errors.value = err;
            toast.error('Gagal menambahkan promosi');
        },
        onFinish: () => {
            processing.value = false;
        },
    });
};
</script>

<template>
    <Head title="Tambah Promosi" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/promotions">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Tambah Promosi</h1>
                    <p class="text-muted-foreground">Buat promosi atau diskon baru</p>
                </div>
            </div>

            <div class="max-w-4xl">
                <PromotionForm
                    v-model:form-data="form"
                    :errors="errors"
                    :processing="processing"
                    @submit="submit"
                >
                    <template #actions="{ processing }">
                        <Link href="/admin/promotions">
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                        <Button type="submit" :disabled="processing">
                            {{ processing ? 'Menyimpan...' : 'Simpan Promosi' }}
                        </Button>
                    </template>
                </PromotionForm>
            </div>
        </div>
    </AppLayout>
</template>
