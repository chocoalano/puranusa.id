<script setup lang="ts">
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/CustomerController';
import CustomerForm from '@/components/customers/CustomerForm.vue';
import { Button } from '@/components/ui/button';
import { useCustomerForm } from '@/composables/customers/useCustomerForm';
import { useShippingLocation } from '@/composables/customers/useShippingLocation';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft } from 'lucide-vue-next';
import { onMounted, watch } from 'vue';
import { toast } from 'vue-sonner';

const { form, toPayload } = useCustomerForm('create');

const {
    provinces,
    cities,
    loadingProvinces,
    loadingCities,
    fetchProvinces,
    fetchCities,
    resetCities,
} = useShippingLocation();

const showFormErrors = (errors: Record<string, unknown>) => {
    const messages = Object.values(errors).filter(
        (value): value is string =>
            typeof value === 'string' && value.length > 0,
    );

    if (messages.length === 0) {
        toast.error(
            'Gagal menyimpan data pelanggan. Silakan periksa kembali input form.',
        );
        return;
    }

    toast.error(messages[0]);

    if (messages.length > 1) {
        toast.warning(`Terdapat ${messages.length} kesalahan pada form.`);
    }
};

const parseErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof Error && error.message.trim() !== '') {
        return error.message;
    }

    return fallback;
};

onMounted(async () => {
    try {
        await fetchProvinces();
    } catch (error) {
        toast.error(parseErrorMessage(error, 'Gagal memuat daftar provinsi.'));
    }
});

watch(
    () => form.province_id,
    async (provinceId, previousProvinceId) => {
        if (!provinceId) {
            resetCities();
            form.city_id = null;
            return;
        }

        if (provinceId !== previousProvinceId) {
            form.city_id = null;
        }

        try {
            await fetchCities(provinceId);
        } catch (error) {
            toast.error(
                parseErrorMessage(error, 'Gagal memuat daftar kota/kabupaten.'),
            );
            resetCities();
        }
    },
);

const submit = () => {
    form.transform((data) => toPayload(data)).post(store.url(), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Pelanggan berhasil didaftarkan.');
        },
        onError: (errors) => {
            showFormErrors(errors);
        },
    });
};
</script>

<template>
    <Head title="Tambah Pelanggan" />

    <AppLayout>
        <div class="space-y-6 rounded-xl p-4 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Tambah Pelanggan</h1>
                    <p class="mt-2 text-muted-foreground">
                        Form registrasi pelanggan dengan data identitas, alamat,
                        dan rekening yang lengkap.
                    </p>
                </div>

                <Link :href="index.url()">
                    <Button variant="outline">
                        <ArrowLeft class="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <CustomerForm
                v-model:form="form"
                mode="create"
                :provinces="provinces"
                :cities="cities"
                :loading-provinces="loadingProvinces"
                :loading-cities="loadingCities"
                @submit="submit"
            >
                <template #actions="{ processing }">
                    <Link :href="index.url()">
                        <Button type="button" variant="outline"> Batal </Button>
                    </Link>
                    <Button type="submit" :disabled="processing">
                        {{ processing ? 'Menyimpan...' : 'Simpan Pelanggan' }}
                    </Button>
                </template>
            </CustomerForm>
        </div>
    </AppLayout>
</template>
