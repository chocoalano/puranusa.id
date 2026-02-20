<script setup lang="ts">
import {
    index,
    update,
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

interface Customer {
    id: number;
    name: string;
    username: string;
    nik: string | null;
    gender: string | null;
    email: string;
    phone: string | null;
    description: string | null;
    address: string | null;
    alamat: string | null;
    province_id: number | null;
    city_id: number | null;
    bank_name: string | null;
    bank_account: string | null;
    npwp: {
        nama: string | null;
        npwp: string | null;
        jk: string | null;
        npwp_date: string | null;
        alamat: string | null;
        menikah: string | number | null;
        anak: string | number | null;
        kerja: string | null;
        office: string | null;
    } | null;
}

interface Props {
    customer: Customer;
}

const props = defineProps<Props>();

const { form, toPayload } = useCustomerForm('edit', {
    ...props.customer,
});

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
            'Gagal memperbarui data pelanggan. Silakan periksa kembali input form.',
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

        if (form.province_id) {
            await fetchCities(form.province_id);
        }
    } catch (error) {
        toast.error(
            parseErrorMessage(error, 'Gagal memuat data wilayah pelanggan.'),
        );
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
    form.transform((data) => toPayload(data)).put(
        update.url(props.customer.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Data pelanggan berhasil diperbarui.');
            },
            onError: (errors) => {
                showFormErrors(errors);
            },
        },
    );
};
</script>

<template>
    <Head :title="`Edit ${customer.name}`" />

    <AppLayout>
        <div class="space-y-6 rounded-xl p-4 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Edit Pelanggan</h1>
                    <p class="mt-2 text-muted-foreground">
                        Perbarui data identitas, alamat, rekening, dan catatan
                        pelanggan secara terstruktur.
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
                mode="edit"
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
                        {{ processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </Button>
                </template>
            </CustomerForm>
        </div>
    </AppLayout>
</template>
