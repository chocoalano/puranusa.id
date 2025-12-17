<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import PromotionForm from '@/components/promotions/PromotionForm.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { ref, computed } from 'vue';

interface Promotion {
    id: number;
    code: string;
    name: string;
    type: string;
    landing_slug: string | null;
    description: string | null;
    image: string | null;
    start_at: string;
    end_at: string;
    is_active: boolean;
    priority: number;
    max_redemption: number | null;
    per_user_limit: number | null;
    conditions_json: string | null;
    show_on: string | null;
    page: string | null;
}

interface Props {
    promotion: Promotion;
}

const props = defineProps<Props>();

// Format datetime for datetime-local input
const formatDateTimeLocal = (datetime: string) => {
    const date = new Date(datetime);
    return date.toISOString().slice(0, 16);
};

// Get existing image URL for preview
const existingImage = computed(() => {
    if (props.promotion.image) {
        // Check if it's already a full URL or needs storage path
        if (props.promotion.image.startsWith('http')) {
            return props.promotion.image;
        }
        return `/storage/${props.promotion.image}`;
    }
    return null;
});

const form = ref({
    code: props.promotion.code,
    name: props.promotion.name,
    type: props.promotion.type,
    landing_slug: props.promotion.landing_slug || '',
    description: props.promotion.description || '',
    image: null as File | string | null,
    start_at: formatDateTimeLocal(props.promotion.start_at),
    end_at: formatDateTimeLocal(props.promotion.end_at),
    is_active: props.promotion.is_active,
    priority: props.promotion.priority,
    max_redemption: props.promotion.max_redemption,
    per_user_limit: props.promotion.per_user_limit,
    conditions_json: props.promotion.conditions_json || '',
    show_on: props.promotion.show_on || '',
    page: props.promotion.page || '',
});

const errors = ref<Record<string, string>>({});
const processing = ref(false);

const submit = () => {
    processing.value = true;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('_method', 'PUT');

    Object.entries(form.value).forEach(([key, value]) => {
        if (key === 'image') {
            // Only append image if it's a new file
            if (value instanceof File) {
                formData.append(key, value);
            }
            // Don't append if null/empty - keep existing image
        } else if (value !== null && value !== undefined) {
            if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0');
            } else {
                formData.append(key, String(value));
            }
        }
    });

    router.post(`/admin/promotions/${props.promotion.id}`, formData, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            toast.success('Promosi berhasil diperbarui');
        },
        onError: (err) => {
            errors.value = err;
            toast.error('Gagal memperbarui promosi');
        },
        onFinish: () => {
            processing.value = false;
        },
    });
};
</script>

<template>
    <Head :title="`Edit ${promotion.name}`" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/promotions">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Edit Promosi</h1>
                    <p class="text-muted-foreground">Perbarui informasi promosi</p>
                </div>
            </div>

            <div class="max-w-4xl">
                <PromotionForm
                    v-model:form-data="form"
                    :errors="errors"
                    :processing="processing"
                    :existing-image="existingImage"
                    @submit="submit"
                >
                    <template #actions="{ processing }">
                        <Link href="/admin/promotions">
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                        <Button type="submit" :disabled="processing">
                            {{ processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                        </Button>
                    </template>
                </PromotionForm>
            </div>
        </div>
    </AppLayout>
</template>
