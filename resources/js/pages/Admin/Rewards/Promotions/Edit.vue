<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/vue3';
import { ArrowLeft, Gift, Save } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

interface Reward {
    id: number;
    code: string | null;
    name: string;
    reward: string | null;
    value: number;
    bv: number;
    start: string;
    end: string;
    status: number;
}

const props = defineProps<{
    reward: Reward;
}>();

const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Pengaturan', href: '#' },
    { title: 'Promotions Rewards', href: '/admin/settings/promotions-rewards' },
    { title: 'Edit', href: '#' },
];

const form = useForm({
    code: props.reward.code || '',
    name: props.reward.name,
    reward: props.reward.reward || '',
    value: props.reward.value,
    bv: props.reward.bv,
    start: props.reward.start,
    end: props.reward.end,
    status: String(props.reward.status),
});

// Format number to IDR format (1.000.000,00)
const formatToIDR = (value: number): string => {
    if (value === 0 || isNaN(value)) return '';
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(value);
};

// Parse IDR format back to number
const parseFromIDR = (value: string): number => {
    if (!value) return 0;
    const cleaned = value.replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
};

// Display values for formatted currency input
const valueDisplay = ref(formatToIDR(props.reward.value));
const bvDisplay = ref(formatToIDR(props.reward.bv));

// Handle value input
const onValueInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const cursorPos = input.selectionStart || 0;
    const oldLength = input.value.length;

    const numericValue = parseFromIDR(input.value);
    const maxValue = 9999999999999.99;
    const clampedValue = Math.min(numericValue, maxValue);

    form.value = clampedValue;
    valueDisplay.value = formatToIDR(clampedValue);

    const newLength = valueDisplay.value.length;
    const newPos = Math.max(0, cursorPos + (newLength - oldLength));
    setTimeout(() => input.setSelectionRange(newPos, newPos), 0);
};

// Handle BV input
const onBvInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const cursorPos = input.selectionStart || 0;
    const oldLength = input.value.length;

    const numericValue = parseFromIDR(input.value);
    const maxValue = 9999999999999.99;
    const clampedValue = Math.min(numericValue, maxValue);

    form.bv = clampedValue;
    bvDisplay.value = formatToIDR(clampedValue);

    const newLength = bvDisplay.value.length;
    const newPos = Math.max(0, cursorPos + (newLength - oldLength));
    setTimeout(() => input.setSelectionRange(newPos, newPos), 0);
};

const submit = () => {
    form.put(`/admin/settings/promotions-rewards/${props.reward.id}`, {
        onSuccess: () => {
            toast.success('Promotions Reward berhasil diperbarui');
        },
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Promotions Reward" />

        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gift class="h-8 w-8" />
                        Edit Promotions Reward
                    </h1>
                    <p class="text-muted-foreground mt-1">
                        Ubah detail reward promosi
                    </p>
                </div>
                <Link href="/admin/settings/promotions-rewards">
                    <Button variant="outline">
                        <ArrowLeft class="h-4 w-4 mr-2" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <form @submit.prevent="submit">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Reward</CardTitle>
                        <CardDescription>Ubah detail reward promosi</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div class="grid gap-6 md:grid-cols-2">
                            <!-- Code -->
                            <div class="space-y-2">
                                <Label for="code">Kode</Label>
                                <Input
                                    id="code"
                                    v-model="form.code"
                                    placeholder="Masukkan kode (opsional)"
                                    maxlength="10"
                                />
                                <InputError :message="form.errors.code" />
                            </div>

                            <!-- Name -->
                            <div class="space-y-2">
                                <Label for="name">Nama Reward <span class="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    v-model="form.name"
                                    placeholder="Masukkan nama reward"
                                    required
                                />
                                <InputError :message="form.errors.name" />
                            </div>

                            <!-- Reward -->
                            <div class="space-y-2 md:col-span-2">
                                <Label for="reward">Deskripsi Reward</Label>
                                <Input
                                    id="reward"
                                    v-model="form.reward"
                                    placeholder="Deskripsi atau detail reward"
                                />
                                <InputError :message="form.errors.reward" />
                            </div>

                            <!-- Value -->
                            <div class="space-y-2">
                                <Label for="value">Nilai (IDR) <span class="text-red-500">*</span></Label>
                                <div class="relative">
                                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Rp</span>
                                    <Input
                                        id="value"
                                        v-model="valueDisplay"
                                        type="text"
                                        inputmode="decimal"
                                        class="pl-10"
                                        placeholder="0"
                                        required
                                        @input="onValueInput"
                                    />
                                </div>
                                <p class="text-xs text-muted-foreground">Maks: Rp 9.999.999.999.999,99</p>
                                <InputError :message="form.errors.value" />
                            </div>

                            <!-- BV -->
                            <div class="space-y-2">
                                <Label for="bv">BV (Business Value) <span class="text-red-500">*</span></Label>
                                <Input
                                    id="bv"
                                    v-model="bvDisplay"
                                    type="text"
                                    inputmode="decimal"
                                    placeholder="0"
                                    required
                                    @input="onBvInput"
                                />
                                <p class="text-xs text-muted-foreground">Maks: 9.999.999.999.999,99</p>
                                <InputError :message="form.errors.bv" />
                            </div>

                            <!-- Start Date -->
                            <div class="space-y-2">
                                <Label for="start">Tanggal Mulai <span class="text-red-500">*</span></Label>
                                <Input
                                    id="start"
                                    v-model="form.start"
                                    type="date"
                                    required
                                />
                                <InputError :message="form.errors.start" />
                            </div>

                            <!-- End Date -->
                            <div class="space-y-2">
                                <Label for="end">Tanggal Berakhir <span class="text-red-500">*</span></Label>
                                <Input
                                    id="end"
                                    v-model="form.end"
                                    type="date"
                                    required
                                />
                                <InputError :message="form.errors.end" />
                            </div>

                            <!-- Status -->
                            <div class="space-y-2">
                                <Label for="status">Status <span class="text-red-500">*</span></Label>
                                <Select v-model="form.status">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Aktif</SelectItem>
                                        <SelectItem value="0">Tidak Aktif</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError :message="form.errors.status" />
                            </div>
                        </div>

                        <div class="flex justify-end gap-4 pt-4">
                            <Link href="/admin/settings/promotions-rewards">
                                <Button type="button" variant="outline">Batal</Button>
                            </Link>
                            <Button type="submit" :disabled="form.processing">
                                <Save class="h-4 w-4 mr-2" />
                                {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    </AppLayout>
</template>
