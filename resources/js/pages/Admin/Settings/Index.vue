<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, useForm, usePage, router } from '@inertiajs/vue3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    CreditCard,
    Settings,
    Save,
    Info,
    Upload,
    X
} from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';

interface Setting {
    id: number;
    key: string;
    value: string | null;
    type: string;
    group: string;
}

interface SettingsByGroup {
    general: Setting[];
    social: Setting[];
    payment: Setting[];
}

interface Props {
    settings: SettingsByGroup;
}

const props = defineProps<Props>();
const page = usePage();

// Helper to populate form settings from props
const populateFormSettings = () => {
    Object.values(props.settings).flat().forEach((setting: Setting) => {
        form.settings[setting.key] = setting.value;
    });
};

// Initialize form with all settings
const form = useForm({
    settings: {} as Record<string, string | null>,
    site_logo: null as File | null,
});

// Populate form with current settings
populateFormSettings();

// Watch for props changes (when Inertia updates the page)
watch(() => props.settings, () => {
    populateFormSettings();
    paymentMethods.value = getPaymentMethods();
}, { deep: true });

// Helper to get payment methods as array
const getPaymentMethods = (): string[] => {
    const value = form.settings['payment_methods'];
    if (!value) return [];
    try {
        return JSON.parse(value);
    } catch {
        return [];
    }
};

// Payment methods state
const paymentMethods = ref<string[]>(getPaymentMethods());
const newPaymentMethod = ref('');

// Logo upload state
const logoInputMode = ref<'url' | 'upload'>('url');
const logoPreview = ref<string | null>(null);

// Computed for current logo URL (prioritize upload preview, then form URL, then existing setting)
const currentLogoUrl = computed(() => {
    if (logoPreview.value) return logoPreview.value;
    return form.settings['site_logo'] || null;
});

// Handle file upload
const handleLogoUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        form.site_logo = file;
        // Clear the URL input when uploading a file
        form.settings['site_logo'] = null;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            logoPreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

// Trigger file input
const triggerFileInput = () => {
    if (typeof window === 'undefined') return;
    const input = window.document.getElementById('logo_upload') as HTMLInputElement;
    if (input) input.click();
};

// Remove logo
const removeLogo = () => {
    form.site_logo = null;
    logoPreview.value = null;
    form.settings['site_logo'] = null;

    // Reset file input
    if (typeof document !== 'undefined') {
        const fileInput = document.getElementById('logo_upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    }
};

// Handle logo input mode switch
watch(logoInputMode, (newMode) => {
    if (newMode === 'url') {
        // Clear file upload when switching to URL mode
        form.site_logo = null;
        logoPreview.value = null;
        if (typeof document !== 'undefined') {
            const fileInput = document.getElementById('logo_upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        }
    } else {
        // Keep URL value when switching to upload mode (user might switch back)
    }
});

// Add payment method
const addPaymentMethod = () => {
    if (newPaymentMethod.value.trim() && !paymentMethods.value.includes(newPaymentMethod.value.trim())) {
        paymentMethods.value.push(newPaymentMethod.value.trim());
        form.settings['payment_methods'] = JSON.stringify(paymentMethods.value);
        newPaymentMethod.value = '';
    }
};

// Remove payment method
const removePaymentMethod = (method: string) => {
    paymentMethods.value = paymentMethods.value.filter(m => m !== method);
    form.settings['payment_methods'] = JSON.stringify(paymentMethods.value);
};

// Submit form
const saveSettings = () => {
    form.post('/admin/settings', {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            // Reset upload state
            logoPreview.value = null;
            form.site_logo = null;

            // Reset file input
            if (typeof document !== 'undefined') {
                const fileInput = document.getElementById('logo_upload') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            }

            // Force reload to ensure all shared props (including appSettings) are refreshed
            router.reload({ only: [] });
        },
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Pengaturan Ecommerce" />

        <div class="container mx-auto py-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Settings class="h-8 w-8" />
                        Pengaturan Ecommerce
                    </h1>
                    <p class="text-muted-foreground mt-1">
                        Kelola pengaturan situs, media sosial, dan metode pembayaran
                    </p>
                </div>
                <Button @click="saveSettings" :disabled="form.processing" size="lg">
                    <Save class="h-4 w-4 mr-2" />
                    {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </Button>
            </div>

            <!-- Settings Tabs -->
            <Tabs default-value="general" class="space-y-6">
                <TabsList class="grid w-full grid-cols-3">
                    <TabsTrigger value="general" class="flex items-center gap-2">
                        <Globe class="h-4 w-4" />
                        <span>Umum</span>
                    </TabsTrigger>
                    <TabsTrigger value="social" class="flex items-center gap-2">
                        <Facebook class="h-4 w-4" />
                        <span>Media Sosial</span>
                    </TabsTrigger>
                    <TabsTrigger value="payment" class="flex items-center gap-2">
                        <CreditCard class="h-4 w-4" />
                        <span>Pembayaran</span>
                    </TabsTrigger>
                </TabsList>

                <!-- General Settings -->
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengaturan Umum</CardTitle>
                            <CardDescription>
                                Atur informasi dasar situs seperti nama, deskripsi, dan logo
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <!-- Site Name -->
                            <div class="space-y-2">
                                <Label for="site_name">Nama Situs</Label>
                                <Input
                                    id="site_name"
                                    v-model="form.settings['site_name']!"
                                    placeholder="PURANUSA"
                                />
                                <p class="text-xs text-muted-foreground">
                                    Nama situs yang akan ditampilkan di header dan footer
                                </p>
                            </div>

                            <Separator />

                            <!-- Site Description -->
                            <div class="space-y-2">
                                <Label for="site_description">Deskripsi Situs</Label>
                                <Textarea
                                    id="site_description"
                                    v-model="form.settings['site_description']!"
                                    placeholder="Puranusa adalah destinasi belanja online terpercaya..."
                                    :rows="4"
                                />
                                <p class="text-xs text-muted-foreground">
                                    Deskripsi singkat tentang situs yang akan ditampilkan di footer
                                </p>
                            </div>

                            <Separator />

                            <!-- Site Logo -->
                            <div class="space-y-4">
                                <div>
                                    <Label>Logo Situs</Label>
                                    <p class="text-xs text-muted-foreground mt-1">
                                        Upload logo atau masukkan URL logo yang akan ditampilkan di situs
                                    </p>
                                </div>

                                <!-- Logo Input Mode Selection -->
                                <div class="flex gap-4">
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            v-model="logoInputMode"
                                            value="url"
                                            class="w-4 h-4"
                                        />
                                        <span class="text-sm">Input URL</span>
                                    </label>
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            v-model="logoInputMode"
                                            value="upload"
                                            class="w-4 h-4"
                                        />
                                        <span class="text-sm">Upload File</span>
                                    </label>
                                </div>

                                <!-- URL Input Mode -->
                                <div v-if="logoInputMode === 'url'" class="space-y-2">
                                    <Input
                                        id="site_logo_url"
                                        v-model="form.settings['site_logo']!"
                                        placeholder="https://example.com/logo.png"
                                        type="url"
                                    />
                                </div>

                                <!-- Upload Input Mode -->
                                <div v-else class="space-y-2">
                                    <div class="flex gap-2">
                                        <div class="flex-1">
                                            <input
                                                id="logo_upload"
                                                type="file"
                                                accept="image/*"
                                                @change="handleLogoUpload"
                                                class="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                class="w-full"
                                                @click="triggerFileInput"
                                            >
                                                <Upload class="h-4 w-4 mr-2" />
                                                {{ form.site_logo ? 'Ganti File' : 'Pilih File' }}
                                            </Button>
                                        </div>
                                        <Button
                                            v-if="currentLogoUrl"
                                            type="button"
                                            variant="destructive"
                                            @click="removeLogo"
                                        >
                                            <X class="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p class="text-xs text-muted-foreground">
                                        Format: JPG, PNG, GIF (Max: 2MB)
                                    </p>
                                </div>

                                <!-- Logo Preview -->
                                <div v-if="currentLogoUrl" class="mt-4">
                                    <Label class="mb-2 block">Preview</Label>
                                    <div class="border rounded-lg p-4 bg-muted/50 flex items-center justify-center">
                                        <img
                                            :src="currentLogoUrl"
                                            alt="Logo Preview"
                                            class="max-h-32 max-w-full object-contain"
                                            @error="() => { if (logoInputMode === 'url') form.settings['site_logo'] = null; }"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Social Media Settings -->
                <TabsContent value="social">
                    <Card>
                        <CardHeader>
                            <CardTitle>Media Sosial</CardTitle>
                            <CardDescription>
                                Kelola link media sosial yang akan ditampilkan di footer
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <!-- Facebook -->
                            <div class="space-y-2">
                                <Label for="social_facebook" class="flex items-center gap-2">
                                    <Facebook class="h-4 w-4 text-blue-600" />
                                    Facebook
                                </Label>
                                <Input
                                    id="social_facebook"
                                    v-model="form.settings['social_facebook']!"
                                    placeholder="https://facebook.com/puranusa"
                                    type="url"
                                />
                            </div>

                            <Separator />

                            <!-- Twitter -->
                            <div class="space-y-2">
                                <Label for="social_twitter" class="flex items-center gap-2">
                                    <Twitter class="h-4 w-4 text-sky-500" />
                                    Twitter
                                </Label>
                                <Input
                                    id="social_twitter"
                                    v-model="form.settings['social_twitter']!"
                                    placeholder="https://twitter.com/puranusa"
                                    type="url"
                                />
                            </div>

                            <Separator />

                            <!-- Instagram -->
                            <div class="space-y-2">
                                <Label for="social_instagram" class="flex items-center gap-2">
                                    <Instagram class="h-4 w-4 text-pink-600" />
                                    Instagram
                                </Label>
                                <Input
                                    id="social_instagram"
                                    v-model="form.settings['social_instagram']!"
                                    placeholder="https://instagram.com/puranusa"
                                    type="url"
                                />
                            </div>

                            <Separator />

                            <!-- YouTube -->
                            <div class="space-y-2">
                                <Label for="social_youtube" class="flex items-center gap-2">
                                    <Youtube class="h-4 w-4 text-red-600" />
                                    YouTube
                                </Label>
                                <Input
                                    id="social_youtube"
                                    v-model="form.settings['social_youtube']!"
                                    placeholder="https://youtube.com/@puranusa"
                                    type="url"
                                />
                            </div>

                            <div class="rounded-lg bg-muted p-4 mt-6">
                                <p class="text-sm text-muted-foreground flex items-start gap-2">
                                    <Info class="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <span>Kosongkan URL untuk menyembunyikan ikon media sosial dari footer</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Payment Settings -->
                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle>Metode Pembayaran</CardTitle>
                            <CardDescription>
                                Kelola metode pembayaran yang akan ditampilkan di footer
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <!-- Payment Methods List -->
                            <div class="space-y-2">
                                <Label>Metode Pembayaran Aktif</Label>
                                <div class="flex flex-wrap gap-2 min-h-[60px] p-4 border rounded-lg bg-muted/50">
                                    <Badge
                                        v-for="method in paymentMethods"
                                        :key="method"
                                        variant="secondary"
                                        class="px-3 py-1.5 text-sm font-medium flex items-center gap-2"
                                    >
                                        {{ method }}
                                        <button
                                            @click="removePaymentMethod(method)"
                                            class="hover:text-destructive transition-colors"
                                            type="button"
                                        >
                                            ×
                                        </button>
                                    </Badge>
                                    <span v-if="paymentMethods.length === 0" class="text-sm text-muted-foreground">
                                        Belum ada metode pembayaran
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            <!-- Add Payment Method -->
                            <div class="space-y-2">
                                <Label for="new_payment_method">Tambah Metode Pembayaran</Label>
                                <div class="flex gap-2">
                                    <Input
                                        id="new_payment_method"
                                        v-model="newPaymentMethod"
                                        placeholder="Contoh: VISA, Mastercard, GoPay, OVO"
                                        @keydown.enter.prevent="addPaymentMethod"
                                    />
                                    <Button
                                        type="button"
                                        @click="addPaymentMethod"
                                        :disabled="!newPaymentMethod.trim()"
                                    >
                                        Tambah
                                    </Button>
                                </div>
                                <p class="text-xs text-muted-foreground">
                                    Tekan Enter atau klik tombol Tambah untuk menambahkan metode pembayaran baru
                                </p>
                            </div>

                            <div class="rounded-lg bg-muted p-4 mt-6">
                                <p class="text-sm font-medium mb-2">Tips:</p>
                                <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Gunakan nama singkat dan jelas (contoh: VISA, Mastercard)</li>
                                    <li>Metode pembayaran akan ditampilkan di footer situs</li>
                                    <li>Klik tanda × pada badge untuk menghapus metode</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <!-- Save Button Bottom -->
            <div class="flex justify-end">
                <Button @click="saveSettings" :disabled="form.processing" size="lg">
                    <Save class="h-4 w-4 mr-2" />
                    {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </Button>
            </div>
        </div>
    </AppLayout>
</template>
