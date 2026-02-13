<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    ArrowLeft,
    Save,
    Info,
    ExternalLink,
    MessageSquareQuote,
    Settings2
} from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface Props {
    defaultTemplateId?: string | null;
}

const props = defineProps<Props>();

const form = useForm({
    title: '',
    message: '',
    template_id: props.defaultTemplateId || '',
});

const extractErrorMessage = (errors: Record<string, string | string[]>) => {
    const firstError = Object.values(errors)[0];
    if (typeof firstError === 'string') return firstError;
    if (Array.isArray(firstError) && typeof firstError[0] === 'string') return firstError[0];
    return 'Terjadi kesalahan pada input data.';
};

const handleSubmit = () => {
    form.post('/admin/whatsapp-broadcasts', {
        preserveScroll: true,
        onSuccess: (page) => {
            const flash = (page.props as any).flash;
            if (flash?.error) {
                toast.error(flash.error);
                return;
            }
            toast.success(flash?.success || 'Draft broadcast berhasil disimpan.');
        },
        onError: (submitErrors) => {
            toast.error(extractErrorMessage(submitErrors as Record<string, string | string[]>));
        },
    });
};
</script>

<template>
    <Head title="Buat Broadcast WhatsApp" />

    <AppLayout>
        <div class="container mx-auto py-8 max-w-7xl space-y-8">

            <div class="flex items-center justify-between border-b pb-6">
                <div class="flex items-center gap-4">
                    <Link href="/admin/whatsapp-broadcasts">
                        <Button variant="ghost" size="icon" class="rounded-full">
                            <ArrowLeft class="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 class="text-3xl font-extrabold tracking-tight">Buat Broadcast Baru</h1>
                        <p class="text-muted-foreground">Kirim pesan massal menggunakan infrastruktur Qontak</p>
                    </div>
                </div>
            </div>

            <Alert class="bg-primary/5 border-primary/20">
                <Info class="h-5 w-5 text-primary" />
                <AlertTitle class="font-bold text-primary">Informasi Penting</AlertTitle>
                <AlertDescription class="text-primary/80">
                    Isi pesan di bawah akan dimasukkan ke dalam variabel body template Qontak Anda (biasanya ditandai dengan <code>{{1}}</code>). Pastikan template sudah berstatus <strong>Approved</strong> di dashboard Qontak.
                </AlertDescription>
            </Alert>

            <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div class="lg:col-span-2 space-y-6">
                    <Card class="shadow-sm">
                        <CardHeader>
                            <div class="flex items-center gap-2 mb-1">
                                <MessageSquareQuote class="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Konten Broadcast</CardTitle>
                            </div>
                            <CardDescription>Definisikan judul campaign dan isi pesan utama.</CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <div class="space-y-2">
                                <Label for="title" class="text-sm font-bold">Nama Campaign / Judul *</Label>
                                <Input
                                    id="title"
                                    v-model="form.title"
                                    placeholder="Contoh: Promo Flash Sale Weekend"
                                    :class="{ 'border-destructive ring-destructive': form.errors.title }"
                                />
                                <p class="text-[11px] text-muted-foreground italic">Nama ini hanya untuk kebutuhan internal admin.</p>
                                <p v-if="form.errors.title" class="text-xs font-medium text-destructive mt-1">{{ form.errors.title }}</p>
                            </div>

                            <div class="space-y-2">
                                <Label for="message" class="text-sm font-bold">Body Parameter (Pesan) *</Label>
                                <Textarea
                                    id="message"
                                    v-model="form.message"
                                    placeholder="Tulis variabel pesan yang ingin dikirim..."
                                    rows="10"
                                    class="resize-none leading-relaxed"
                                    :class="{ 'border-destructive ring-destructive': form.errors.message }"
                                />
                                <div class="flex justify-between items-center px-1">
                                    <p class="text-[11px] text-muted-foreground">Isi teks ini akan menggantikan variabel body pada template.</p>
                                    <span class="text-[10px] font-mono font-medium py-1 px-2 bg-muted rounded">{{ form.message.length }} Karakter</span>
                                </div>
                                <p v-if="form.errors.message" class="text-xs font-medium text-destructive mt-1">{{ form.errors.message }}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div class="space-y-6">
                    <Card class="border-primary/10 shadow-sm">
                        <CardHeader>
                            <div class="flex items-center gap-2 mb-1">
                                <Settings2 class="h-4 w-4 text-muted-foreground" />
                                <CardTitle class="text-base">Konfigurasi Qontak</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent class="space-y-5">
                            <div class="space-y-2">
                                <Label for="template_id" class="text-xs font-bold uppercase tracking-wider">Template ID</Label>
                                <Input
                                    id="template_id"
                                    v-model="form.template_id"
                                    placeholder="ID dari Qontak..."
                                    class="bg-muted/50 font-mono text-xs"
                                />
                                <div class="rounded-lg bg-muted p-3 border border-dashed text-center">
                                    <p class="text-[10px] text-muted-foreground font-semibold mb-1 uppercase">Saran Default</p>
                                    <code class="text-xs break-all text-primary font-bold">{{ defaultTemplateId || 'N/A' }}</code>
                                </div>
                            </div>

                            <Separator />

                            <div class="space-y-3">
                                <Label class="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tautan Cepat</Label>
                                <a
                                    href="https://dashboard.qontak.com"
                                    target="_blank"
                                    class="flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Buka Dashboard Qontak
                                    <ExternalLink class="h-3 w-3" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    <div class="flex flex-col gap-3">
                        <Button
                            class="w-full py-6 font-bold text-lg shadow-lg"
                            :disabled="form.processing"
                            @click="handleSubmit"
                        >
                            <Save class="h-5 w-5 mr-2" />
                            Simpan Draft
                        </Button>
                        <Link href="/admin/whatsapp-broadcasts">
                            <Button variant="ghost" class="w-full text-muted-foreground">Batalkan</Button>
                        </Link>
                    </div>
                </div>

            </form>
        </div>
    </AppLayout>
</template>

<style scoped>
/* Transisi halus untuk input */
input, textarea {
    transition: all 0.2s ease;
}
</style>
