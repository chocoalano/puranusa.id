<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowLeft, RefreshCcw, Save, SendHorizontal, TestTube2, Users } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';

interface Broadcast {
    id: number;
    title: string;
    message: string;
    template_id: string | null;
    status: 'draft' | 'processing' | 'sent' | 'partial' | 'failed';
    total_recipients: number;
    success_recipients: number;
    failed_recipients: number;
    sent_at: string | null;
    created_at: string;
    updated_at: string;
    creator?: {
        id: number;
        name: string;
    } | null;
}

interface Recipient {
    id: number;
    customer_id: number | null;
    customer_name: string | null;
    phone: string;
    normalized_phone: string;
    status: 'pending' | 'sent' | 'failed';
    response_message: string | null;
    sent_at: string | null;
    created_at: string;
}

interface Props {
    broadcast: Broadcast;
    recipients: Recipient[];
    defaultTemplateId?: string | null;
}

const props = defineProps<Props>();

const form = useForm({
    title: props.broadcast.title,
    message: props.broadcast.message,
    template_id: props.broadcast.template_id || props.defaultTemplateId || '',
});

const testForm = useForm({
    name: '',
    phone: '',
    template_id: props.broadcast.template_id || props.defaultTemplateId || '',
    message: props.broadcast.message || '',
});
const isTestingSend = ref(false);

const isProcessing = computed(() => props.broadcast.status === 'processing' || form.processing);
const canSend = computed(() => !isProcessing.value);

const extractErrorMessage = (errors: Record<string, string | string[]>) => {
    const firstError = Object.values(errors)[0];
    if (typeof firstError === 'string') {
        return firstError;
    }
    if (Array.isArray(firstError) && typeof firstError[0] === 'string') {
        return firstError[0];
    }
    return 'Terjadi kesalahan. Silakan coba lagi.';
};

const handleUpdate = () => {
    form.put(`/admin/whatsapp-broadcasts/${props.broadcast.id}`, {
        preserveScroll: true,
        onSuccess: (page) => {
            const flash = (page.props as any).flash;
            if (flash?.error) {
                toast.error(flash.error);
                return;
            }

            toast.success(flash?.success || 'Broadcast berhasil diperbarui.');
        },
        onError: (submitErrors) => {
            toast.error(extractErrorMessage(submitErrors as Record<string, string | string[]>));
        },
    });
};

const handleSend = () => {
    if (!confirm('Kirim broadcast ini ke semua nomor customer unik sekarang?')) {
        return;
    }

    router.post(`/admin/whatsapp-broadcasts/${props.broadcast.id}/send`, {}, {
        preserveScroll: true,
        onSuccess: (page) => {
            const flash = (page.props as any).flash;
            if (flash?.error) {
                toast.error(flash.error);
                return;
            }

            toast.success(flash?.success || 'Broadcast berhasil diproses.');
        },
        onError: (submitErrors) => {
            toast.error(extractErrorMessage(submitErrors as Record<string, string | string[]>));
        },
    });
};

const handleTestSend = () => {
    testForm.clearErrors();
    isTestingSend.value = true;

    axios.post(`/admin/whatsapp-broadcasts/${props.broadcast.id}/test-send`, {
        name: testForm.name,
        phone: testForm.phone,
        template_id: testForm.template_id,
        message: testForm.message,
    }, {
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then((response) => {
            toast.success(response.data?.message || 'Pesan test berhasil dikirim.');
        })
        .catch((error) => {
            if (error.response?.status === 422) {
                const responseErrors = error.response?.data?.errors as Record<string, string[] | string> | undefined;
                if (responseErrors) {
                    const normalizedErrors = Object.fromEntries(
                        Object.entries(responseErrors).map(([field, message]) => [
                            field,
                            Array.isArray(message) ? message[0] : message,
                        ]),
                    );
                    testForm.setError(normalizedErrors);
                }
            }

            toast.error(error.response?.data?.message || 'Gagal mengirim pesan test.');
        })
        .finally(() => {
            isTestingSend.value = false;
        });
};

const getStatusLabel = (status: Broadcast['status']) => {
    const labels: Record<Broadcast['status'], string> = {
        draft: 'Draft',
        processing: 'Processing',
        sent: 'Sent',
        partial: 'Partial',
        failed: 'Failed',
    };

    return labels[status] ?? status;
};

const getStatusVariant = (status: Broadcast['status']) => {
    if (status === 'sent') return 'default';
    if (status === 'partial') return 'outline';
    if (status === 'failed') return 'destructive';
    return 'secondary';
};

const getRecipientStatusVariant = (status: Recipient['status']) => {
    if (status === 'sent') return 'default';
    if (status === 'failed') return 'destructive';
    return 'secondary';
};

const formatDateTime = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleString('id-ID');
};
</script>

<template>
    <Head :title="`Edit Broadcast: ${broadcast.title}`" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <Link href="/admin/whatsapp-broadcasts">
                        <Button variant="outline" size="icon">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Edit Broadcast WhatsApp</h1>
                        <p class="text-muted-foreground mt-1">
                            {{ broadcast.title }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <Button variant="outline" :disabled="isProcessing" @click="handleUpdate">
                        <Save class="h-4 w-4 mr-2" />
                        Simpan
                    </Button>
                    <Button :disabled="!canSend" @click="handleSend">
                        <SendHorizontal class="h-4 w-4 mr-2" />
                        Kirim Broadcast
                    </Button>
                </div>
            </div>

            <div class="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader class="pb-2">
                        <CardDescription>Status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge :variant="getStatusVariant(broadcast.status)">
                            {{ getStatusLabel(broadcast.status) }}
                        </Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="pb-2">
                        <CardDescription>Total Nomor</CardDescription>
                    </CardHeader>
                    <CardContent class="text-2xl font-bold">
                        {{ broadcast.total_recipients }}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="pb-2">
                        <CardDescription>Berhasil</CardDescription>
                    </CardHeader>
                    <CardContent class="text-2xl font-bold text-emerald-600">
                        {{ broadcast.success_recipients }}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader class="pb-2">
                        <CardDescription>Gagal</CardDescription>
                    </CardHeader>
                    <CardContent class="text-2xl font-bold text-red-600">
                        {{ broadcast.failed_recipients }}
                    </CardContent>
                </Card>
            </div>

            <form class="space-y-6" @submit.prevent="handleUpdate">
                <Card>
                    <CardHeader>
                        <CardTitle>Konten Broadcast</CardTitle>
                        <CardDescription>
                            Template default konfigurasi: {{ defaultTemplateId || '-' }}
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label for="title">Judul Broadcast *</Label>
                            <Input
                                id="title"
                                v-model="form.title"
                                placeholder="Contoh: Promo Akhir Pekan"
                                :class="{ 'border-destructive': form.errors.title }"
                            />
                            <p v-if="form.errors.title" class="text-sm text-destructive">
                                {{ form.errors.title }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="template_id">Qontak Template ID</Label>
                            <Input
                                id="template_id"
                                v-model="form.template_id"
                                placeholder="Kosongkan untuk pakai default"
                                :class="{ 'border-destructive': form.errors.template_id }"
                            />
                            <p v-if="form.errors.template_id" class="text-sm text-destructive">
                                {{ form.errors.template_id }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="message">Isi Pesan *</Label>
                            <Textarea
                                id="message"
                                v-model="form.message"
                                rows="7"
                                placeholder="Tulis isi pesan broadcast..."
                                :class="{ 'border-destructive': form.errors.message }"
                            />
                            <p v-if="form.errors.message" class="text-sm text-destructive">
                                {{ form.errors.message }}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </form>

            <form class="space-y-6" @submit.prevent="handleTestSend">
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-2">
                            <TestTube2 class="h-5 w-5" />
                            Test Kirim ke Satu Nomor
                        </CardTitle>
                        <CardDescription>
                            Gunakan fitur ini untuk verifikasi template sebelum kirim massal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="test_name">Nama Tujuan</Label>
                                <Input
                                    id="test_name"
                                    v-model="testForm.name"
                                    placeholder="Contoh: Admin QA"
                                    :class="{ 'border-destructive': testForm.errors.name }"
                                />
                                <p v-if="testForm.errors.name" class="text-sm text-destructive">
                                    {{ testForm.errors.name }}
                                </p>
                            </div>
                            <div class="space-y-2">
                                <Label for="test_phone">No. WhatsApp Tujuan *</Label>
                                <Input
                                    id="test_phone"
                                    v-model="testForm.phone"
                                    placeholder="Contoh: 081234567890"
                                    :class="{ 'border-destructive': testForm.errors.phone }"
                                />
                                <p class="text-xs text-muted-foreground">
                                    Otomatis dinormalisasi ke format `62xxxxxxxxxx`
                                </p>
                                <p v-if="testForm.errors.phone" class="text-sm text-destructive">
                                    {{ testForm.errors.phone }}
                                </p>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <Label for="test_template_id">Template ID (Opsional)</Label>
                            <Input
                                id="test_template_id"
                                v-model="testForm.template_id"
                                placeholder="Kosongkan untuk pakai template dari broadcast"
                                :class="{ 'border-destructive': testForm.errors.template_id }"
                            />
                            <p v-if="testForm.errors.template_id" class="text-sm text-destructive">
                                {{ testForm.errors.template_id }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label for="test_message">Pesan Test</Label>
                            <Textarea
                                id="test_message"
                                v-model="testForm.message"
                                rows="4"
                                :class="{ 'border-destructive': testForm.errors.message }"
                            />
                            <p class="text-xs text-muted-foreground">
                                Default mengikuti isi pesan broadcast saat ini.
                            </p>
                            <p v-if="testForm.errors.message" class="text-sm text-destructive">
                                {{ testForm.errors.message }}
                            </p>
                        </div>

                        <div class="flex justify-end">
                            <Button type="submit" :disabled="isTestingSend">
                                <TestTube2 class="h-4 w-4 mr-2" />
                                {{ isTestingSend ? 'Mengirim...' : 'Kirim Test' }}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>

            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <Users class="h-5 w-5" />
                        Riwayat Penerima
                    </CardTitle>
                    <CardDescription>
                        Menampilkan maksimal 250 data penerima terakhir
                    </CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>No. HP</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Response</TableHead>
                                <TableHead>Waktu Kirim</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-if="recipients.length === 0">
                                <TableCell colspan="5" class="text-center py-8 text-muted-foreground">
                                    <RefreshCcw class="h-10 w-10 mx-auto mb-2 opacity-20" />
                                    Belum ada data penerima
                                </TableCell>
                            </TableRow>
                            <TableRow v-for="recipient in recipients" :key="recipient.id">
                                <TableCell>{{ recipient.customer_name || '-' }}</TableCell>
                                <TableCell>{{ recipient.normalized_phone }}</TableCell>
                                <TableCell>
                                    <Badge :variant="getRecipientStatusVariant(recipient.status)">
                                        {{ recipient.status }}
                                    </Badge>
                                </TableCell>
                                <TableCell class="text-sm text-muted-foreground">
                                    {{ recipient.response_message || '-' }}
                                </TableCell>
                                <TableCell class="text-sm text-muted-foreground">
                                    {{ formatDateTime(recipient.sent_at) }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
