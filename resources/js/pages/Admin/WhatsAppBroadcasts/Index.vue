<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import axios from 'axios';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    MessageSquare,
    MoreVertical,
    Pencil,
    Plus,
    Search,
    SendHorizontal,
    TestTube2,
    Trash2,
    AlertTriangle,
    CheckCircle2
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';

// --- Interface & Props ---
interface Broadcast {
    id: number;
    title: string;
    message: string;
    template_id: string | null;
    status: 'draft' | 'processing' | 'sent' | 'partial' | 'failed';
    total_recipients: number;
    success_recipients: number;
    failed_recipients: number;
    recipients_count?: number;
    sent_at: string | null;
    created_at: string;
    creator?: { id: number; name: string; } | null;
}

interface Props {
    broadcasts: {
        data: Broadcast[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
    filters: { search?: string; status?: string; };
    defaultTemplateId?: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

type BadgeVariant = 'default' | 'outline' | 'destructive' | 'secondary';

interface TestRecipient {
    id: number;
    name: string;
    phone: string;
}

const props = defineProps<Props>();

// --- Logic ---
const searchQuery = ref(props.filters.search || '');
const selectedStatus = ref(props.filters.status || 'all');

const performSearch = () => {
    router.get('/admin/whatsapp-broadcasts', {
        search: searchQuery.value || undefined,
        status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined,
    }, { preserveState: true, preserveScroll: true });
};

const clearFilters = () => {
    searchQuery.value = '';
    selectedStatus.value = 'all';
    router.get('/admin/whatsapp-broadcasts');
};

const sendDialogOpen = ref(false);
const deleteDialogOpen = ref(false);
const sendTarget = ref<Broadcast | null>(null);
const deleteTarget = ref<Broadcast | null>(null);
const testDialogOpen = ref(false);
const testTarget = ref<Broadcast | null>(null);
const isSubmittingTest = ref(false);
const testTemplateId = ref('');
const testMessage = ref('');
const testRecipients = ref<TestRecipient[]>([]);
const testErrors = ref<Record<string, string>>({});
const testGeneralError = ref('');
let nextRecipientId = 1;

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

const openSendDialog = (broadcast: Broadcast) => {
    sendTarget.value = broadcast;
    sendDialogOpen.value = true;
};

const setSendDialogOpen = (open: boolean) => {
    sendDialogOpen.value = open;
    if (!open) {
        sendTarget.value = null;
    }
};

const handleSendBroadcast = () => {
    if (!sendTarget.value) return;

    router.post(`/admin/whatsapp-broadcasts/${sendTarget.value.id}/send`, {}, {
        preserveScroll: true,
        onSuccess: (page) => {
            const flash = (page.props as any).flash;
            if (flash?.error) {
                toast.error(flash.error);
                return;
            }
            toast.success(flash?.success || 'Broadcast sedang diproses.');
        },
        onError: (submitErrors) => {
            toast.error(extractErrorMessage(submitErrors as Record<string, string | string[]>));
        },
        onFinish: () => {
            setSendDialogOpen(false);
        },
    });
};

const openDeleteDialog = (broadcast: Broadcast) => {
    deleteTarget.value = broadcast;
    deleteDialogOpen.value = true;
};

const setDeleteDialogOpen = (open: boolean) => {
    deleteDialogOpen.value = open;
    if (!open) {
        deleteTarget.value = null;
    }
};

const createRecipientRow = (): TestRecipient => ({
    id: nextRecipientId++,
    name: '',
    phone: '',
});

const resetTestDialogForm = (broadcast?: Broadcast | null) => {
    testTemplateId.value = broadcast?.template_id || props.defaultTemplateId || '';
    testMessage.value = broadcast?.message || '';
    testRecipients.value = [createRecipientRow()];
    testErrors.value = {};
    testGeneralError.value = '';
};

const openTestDialog = (broadcast: Broadcast) => {
    testTarget.value = broadcast;
    resetTestDialogForm(broadcast);
    testDialogOpen.value = true;
};

const setTestDialogOpen = (open: boolean) => {
    testDialogOpen.value = open;
    if (!open) {
        testTarget.value = null;
        resetTestDialogForm(null);
    }
};

const addTestRecipient = () => {
    if (testRecipients.value.length >= 50) {
        toast.error('Maksimal 50 nomor per sekali test.');
        return;
    }

    testRecipients.value.push(createRecipientRow());
};

const removeTestRecipient = (index: number) => {
    if (testRecipients.value.length === 1) {
        testRecipients.value = [createRecipientRow()];
        return;
    }

    testRecipients.value.splice(index, 1);
};

const getTestFieldError = (index: number, field: 'name' | 'phone') => {
    return testErrors.value[`recipients.${index}.${field}`] || '';
};

const normalizeErrors = (errors: Record<string, string[] | string>): Record<string, string> => {
    return Object.fromEntries(
        Object.entries(errors).map(([field, message]) => [
            field,
            Array.isArray(message) ? (message[0] || '') : message,
        ]),
    );
};

const handleTestMultipleSend = () => {
    if (!testTarget.value) return;

    isSubmittingTest.value = true;
    testErrors.value = {};
    testGeneralError.value = '';

    axios.post(`/admin/whatsapp-broadcasts/${testTarget.value.id}/test-send-multiple`, {
        template_id: testTemplateId.value,
        message: testMessage.value,
        recipients: testRecipients.value.map((recipient) => ({
            name: recipient.name,
            phone: recipient.phone,
        })),
    }, {
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then((response) => {
            const queuedCount = Number(response.data?.queued_count || 0);
            const duplicateCount = Number(response.data?.duplicates_skipped || 0);

            let toastMessage = response.data?.message || 'Test kirim masuk antrean queue.';
            if (queuedCount > 0 && duplicateCount > 0) {
                toastMessage += ` (${duplicateCount} nomor duplikat diabaikan)`;
            }

            toast.success(toastMessage);
            setTestDialogOpen(false);
        })
        .catch((error: any) => {
            const responseData = error.response?.data;
            const responseErrors = responseData?.errors as Record<string, string[] | string> | undefined;

            if (responseErrors) {
                testErrors.value = normalizeErrors(responseErrors);
            }

            testGeneralError.value = responseData?.message || 'Gagal memasukkan test kirim ke antrean.';
            toast.error(testGeneralError.value);
        })
        .finally(() => {
            isSubmittingTest.value = false;
        });
};

const handleDeleteBroadcast = () => {
    if (!deleteTarget.value) return;

    router.delete(`/admin/whatsapp-broadcasts/${deleteTarget.value.id}`, {
        preserveScroll: true,
        onSuccess: (page) => {
            const flash = (page.props as any).flash;
            if (flash?.error) {
                toast.error(flash.error);
                return;
            }
            toast.success(flash?.success || 'Riwayat berhasil dihapus.');
        },
        onError: (submitErrors) => {
            toast.error(extractErrorMessage(submitErrors as Record<string, string | string[]>));
        },
        onFinish: () => {
            setDeleteDialogOpen(false);
        },
    });
};

const statusVariantMap: Record<Broadcast['status'], BadgeVariant> = {
    draft: 'outline',
    processing: 'secondary',
    sent: 'default',
    partial: 'secondary',
    failed: 'destructive',
};

const getStatusVariant = (status: Broadcast['status']): BadgeVariant => statusVariantMap[status];

const formatDateTime = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
};

const paginationLinks = computed<PaginationLink[]>(() => props.broadcasts.links ?? []);

const getPaginationVariant = (link: PaginationLink): 'default' | 'outline' => {
    return link.active ? 'default' : 'outline';
};

const formatPaginationLabel = (label: string): string => {
    return label
        .replace(/<[^>]*>/g, '')
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
};
</script>

<template>
    <Head title="Broadcast WhatsApp" />

    <AppLayout>
        <div class="container mx-auto py-8 space-y-8">

            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-extrabold tracking-tight">Broadcast WhatsApp</h1>
                    <p class="text-muted-foreground">Kelola pengiriman pesan massal ke database pelanggan unik.</p>
                </div>
                <Link href="/admin/whatsapp-broadcasts/create">
                    <Button class="font-bold">
                        <Plus class="h-5 w-5 mr-2" />
                        Buat Broadcast Baru
                    </Button>
                </Link>
            </div>

            <Alert class="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                <AlertTriangle class="h-5 w-5 text-amber-600 dark:text-amber-500" />
                <div class="ml-2">
                    <AlertTitle class="text-amber-800 dark:text-amber-400 font-bold text-base">
                        Penting: Ketentuan Penerimaan Pesan
                    </AlertTitle>
                    <AlertDescription class="text-amber-700 dark:text-amber-300 mt-2 space-y-2">
                        <p>Berdasarkan kebijakan <strong>WhatsApp Business API</strong>, pesan broadcast Anda hanya akan terkirim dengan sukses jika pelanggan memenuhi kriteria berikut:</p>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-none mt-2">
                            <li class="flex items-center gap-2">
                                <CheckCircle2 class="h-4 w-4 text-amber-600" />
                                Pernah berinteraksi dengan nomor WA Anda.
                            </li>
                            <li class="flex items-center gap-2">
                                <CheckCircle2 class="h-4 w-4 text-amber-600" />
                                Pelanggan menyimpan nomor Anda di kontak.
                            </li>
                            <li class="flex items-center gap-2">
                                <CheckCircle2 class="h-4 w-4 text-amber-600" />
                                Menggunakan Template ID yang telah disetujui.
                            </li>
                            <li class="flex items-center gap-2">
                                <CheckCircle2 class="h-4 w-4 text-amber-600" />
                                Tidak sedang memblokir nomor resmi Anda.
                            </li>
                        </ul>
                        <p class="text-xs italic mt-2 font-semibold">
                            * Pesan ke nomor yang tidak dikenal/tanpa interaksi berisiko gagal terkirim (Undelivered) atau memicu pemblokiran nomor oleh WhatsApp.
                        </p>
                    </AlertDescription>
                </div>
            </Alert>

            <Card class="shadow-sm">
                <CardHeader class="pb-4">
                    <CardTitle class="text-lg flex items-center gap-2">
                        <Search class="h-5 w-5 text-muted-foreground" />
                        Filter Data
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex-1 relative">
                            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                v-model="searchQuery"
                                placeholder="Cari berdasarkan judul atau pesan..."
                                class="pl-10"
                                @keydown.enter="performSearch"
                            />
                        </div>
                        <Select v-model="selectedStatus">
                            <SelectTrigger class="w-full md:w-[200px]">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="draft">Draft (Belum Kirim)</SelectItem>
                                <SelectItem value="processing">Sedang Diproses</SelectItem>
                                <SelectItem value="sent">Selesai Terkirim</SelectItem>
                                <SelectItem value="failed">Gagal Total</SelectItem>
                            </SelectContent>
                        </Select>
                        <div class="flex gap-2">
                            <Button @click="performSearch">Terapkan Filter</Button>
                            <Button v-if="searchQuery || selectedStatus !== 'all'" variant="ghost" @click="clearFilters">
                                Reset
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card class="shadow-sm overflow-hidden">
                <Table>
                    <TableHeader class="bg-muted/50">
                        <TableRow>
                            <TableHead class="font-bold">Campaign & Pesan</TableHead>
                            <TableHead class="text-center">Status</TableHead>
                            <TableHead class="text-center">Target (Penerima)</TableHead>
                            <TableHead>Riwayat Pengiriman</TableHead>
                            <TableHead class="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-if="broadcasts.data.length === 0">
                            <TableCell colspan="5" class="text-center py-12 text-muted-foreground">
                                <MessageSquare class="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p class="text-lg">Tidak ada data broadcast ditemukan.</p>
                            </TableCell>
                        </TableRow>
                        <TableRow v-for="broadcast in broadcasts.data" :key="broadcast.id" class="group">
                            <TableCell>
                                <div class="space-y-1">
                                    <p class="font-bold text-slate-900 dark:text-slate-100">{{ broadcast.title }}</p>
                                    <p class="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                                        {{ broadcast.message }}
                                    </p>
                                    <div class="pt-1">
                                        <code class="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-blue-600">
                                            ID: {{ broadcast.template_id || defaultTemplateId || 'No ID' }}
                                        </code>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell class="text-center">
                                <Badge :variant="getStatusVariant(broadcast.status)" class="capitalize">
                                    {{ broadcast.status }}
                                </Badge>
                            </TableCell>
                            <TableCell class="text-center">
                                <div class="flex flex-col items-center">
                                    <span class="text-sm font-bold">{{ broadcast.success_recipients }} / {{ broadcast.total_recipients || 0 }}</span>
                                    <span v-if="broadcast.failed_recipients > 0" class="text-[10px] text-destructive">
                                        Gagal: {{ broadcast.failed_recipients }}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell class="text-sm">
                                <p class="text-muted-foreground">Kirim: {{ formatDateTime(broadcast.sent_at) }}</p>
                                <p class="text-[10px] opacity-50">Dibuat: {{ formatDateTime(broadcast.created_at) }}</p>
                            </TableCell>
                            <TableCell class="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical class="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" class="w-48">
                                        <DropdownMenuLabel>Opsi Broadcast</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <Link :href="`/admin/whatsapp-broadcasts/${broadcast.id}/edit`">
                                            <DropdownMenuItem>
                                                <Pencil class="h-4 w-4 mr-2" /> Edit Draft
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem @click="openSendDialog(broadcast)">
                                            <SendHorizontal class="h-4 w-4 mr-2" /> Kirim Sekarang
                                        </DropdownMenuItem>
                                        <DropdownMenuItem @click="openTestDialog(broadcast)">
                                            <TestTube2 class="h-4 w-4 mr-2" /> Test ke Nomor Custom
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem class="text-destructive focus:bg-destructive/10" @click="openDeleteDialog(broadcast)">
                                            <Trash2 class="h-4 w-4 mr-2" /> Hapus Riwayat
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div v-if="broadcasts.last_page > 1" class="p-4 border-t bg-muted/20 flex justify-center">
                    <nav class="flex gap-1">
                        <Button
                            v-for="(link, index) in paginationLinks"
                            :key="link.url ?? `${link.label}-${index}`"
                            :variant="getPaginationVariant(link)"
                            :disabled="!link.url"
                            size="sm"
                            @click="link.url && router.visit(link.url)"
                        >
                            {{ formatPaginationLabel(link.label) }}
                        </Button>
                    </nav>
                </div>
            </Card>

            <Dialog :open="testDialogOpen" @update:open="setTestDialogOpen">
                <DialogContent class="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            {{ testTarget ? `Test Broadcast: ${testTarget.title}` : 'Test Broadcast' }}
                        </DialogTitle>
                        <DialogDescription>
                            Tambahkan beberapa nomor custom. Semua nomor valid akan masuk antrean queue test kirim.
                        </DialogDescription>
                    </DialogHeader>

                    <form class="space-y-4" @submit.prevent="handleTestMultipleSend">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="space-y-2">
                                <Label for="test_template_id">Template ID</Label>
                                <Input
                                    id="test_template_id"
                                    v-model="testTemplateId"
                                    placeholder="Kosongkan untuk default"
                                    :class="{ 'border-destructive': !!testErrors.template_id }"
                                />
                                <p v-if="testErrors.template_id" class="text-xs text-destructive">
                                    {{ testErrors.template_id }}
                                </p>
                            </div>
                            <div class="space-y-2">
                                <Label for="test_message">Isi Pesan</Label>
                                <Textarea
                                    id="test_message"
                                    v-model="testMessage"
                                    rows="3"
                                    :class="{ 'border-destructive': !!testErrors.message }"
                                />
                                <p v-if="testErrors.message" class="text-xs text-destructive">
                                    {{ testErrors.message }}
                                </p>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <Label>Daftar Nomor Tujuan</Label>
                                <Button type="button" variant="outline" size="sm" @click="addTestRecipient">
                                    <Plus class="h-4 w-4 mr-2" />
                                    Tambah Nomor
                                </Button>
                            </div>

                            <div
                                v-for="(recipient, index) in testRecipients"
                                :key="recipient.id"
                                class="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]"
                            >
                                <div class="space-y-2">
                                    <Label :for="`test_name_${recipient.id}`">Nama (opsional)</Label>
                                    <Input
                                        :id="`test_name_${recipient.id}`"
                                        v-model="recipient.name"
                                        placeholder="Contoh: Admin QA"
                                        :class="{ 'border-destructive': !!getTestFieldError(index, 'name') }"
                                    />
                                    <p v-if="getTestFieldError(index, 'name')" class="text-xs text-destructive">
                                        {{ getTestFieldError(index, 'name') }}
                                    </p>
                                </div>

                                <div class="space-y-2">
                                    <Label :for="`test_phone_${recipient.id}`">No. WhatsApp *</Label>
                                    <Input
                                        :id="`test_phone_${recipient.id}`"
                                        v-model="recipient.phone"
                                        placeholder="081234567890"
                                        :class="{ 'border-destructive': !!getTestFieldError(index, 'phone') }"
                                    />
                                    <p v-if="getTestFieldError(index, 'phone')" class="text-xs text-destructive">
                                        {{ getTestFieldError(index, 'phone') }}
                                    </p>
                                </div>

                                <div class="flex items-end">
                                    <Button type="button" variant="ghost" size="icon" @click="removeTestRecipient(index)">
                                        <Trash2 class="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <p v-if="testErrors.recipients" class="text-xs text-destructive">
                                {{ testErrors.recipients }}
                            </p>
                        </div>

                        <p v-if="testGeneralError" class="text-sm text-destructive">
                            {{ testGeneralError }}
                        </p>

                        <DialogFooter>
                            <Button type="button" variant="outline" @click="setTestDialogOpen(false)">
                                Batal
                            </Button>
                            <Button type="submit" :disabled="isSubmittingTest">
                                <TestTube2 class="h-4 w-4 mr-2" />
                                {{ isSubmittingTest ? 'Memproses...' : 'Kirim Test ke Queue' }}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                :open="sendDialogOpen"
                :title="sendTarget ? `Kirim Broadcast: ${sendTarget.title}?` : 'Kirim Broadcast?'"
                :description="sendTarget
                    ? 'Pesan akan dikirim ke semua nomor customer yang unik. Lanjutkan proses pengiriman sekarang?'
                    : 'Pesan akan dikirim ke semua nomor customer yang unik.'"
                confirm-text="Kirim Sekarang"
                cancel-text="Batal"
                @update:open="setSendDialogOpen"
                @confirm="handleSendBroadcast"
            />

            <ConfirmDialog
                :open="deleteDialogOpen"
                :title="deleteTarget ? `Hapus Riwayat: ${deleteTarget.title}?` : 'Hapus Riwayat?'"
                :description="deleteTarget
                    ? 'Data riwayat broadcast beserta daftar penerima akan dihapus permanen.'
                    : 'Data riwayat broadcast akan dihapus permanen.'"
                confirm-text="Hapus"
                cancel-text="Batal"
                variant="destructive"
                @update:open="setDeleteDialogOpen"
                @confirm="handleDeleteBroadcast"
            />
        </div>
    </AppLayout>
</template>
