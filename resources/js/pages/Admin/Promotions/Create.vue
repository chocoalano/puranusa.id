<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import PromotionForm from '@/components/promotions/PromotionForm.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { ref, computed } from 'vue';

const form = ref({
    code: '',
    name: '',
    type: 'discount',
    landing_slug: '',
    description: '',
    image: '',
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

const submitForm = useForm({});
const errors = computed(() => submitForm.errors);
const processing = computed(() => submitForm.processing);

const submit = () => {
    submitForm
        .transform(() => form.value)
        .post('/admin/promotions', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Promosi berhasil ditambahkan');
            },
            onError: () => {
                toast.error('Gagal menambahkan promosi');
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
