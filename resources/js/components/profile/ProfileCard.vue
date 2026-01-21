<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Copy, Share2, Check } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import type { Customer } from '@/types/profile';
import { useFormatter } from '@/composables/useFormatter';
import { toast } from 'vue-sonner';

const props = defineProps<{
    customer: Customer;
}>();

const { formatCurrency } = useFormatter();

const copied = ref(false);

const initials = computed(() => {
    return props.customer.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
});

const referralLink = computed(() => {
    if (typeof window === 'undefined') {
        return '';
    }
    const baseUrl = window.location.origin;
    return `${baseUrl}/beranda?ref=${props.customer.username}`;
});

const copyReferralLink = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) {
        toast.error('Tidak dapat menyalin link ke clipboard');
        return;
    }
    try {
        await navigator.clipboard.writeText(referralLink.value);
        copied.value = true;
        toast.success('Link referral telah disalin ke clipboard');
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch {
        toast.error('Tidak dapat menyalin link ke clipboard');
    }
};

const shareReferralLink = async () => {
    if (typeof window === 'undefined') return;

    const shareData = {
        title: 'Bergabung dengan Referral Saya',
        text: `Gunakan Username saya untuk mengajak teman: ${props.customer.username}`,
        url: referralLink.value,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            toast.success('Link referral berhasil dibagikan');
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                console.error('Error sharing:', err);
            }
        }
    } else {
        // Fallback to copy if share is not supported
        await copyReferralLink();
    }
};
</script>

<template>
    <Card>
        <CardContent class="pt-6">
            <div class="flex flex-col items-center text-center">
                <Avatar class="h-24 w-24 mb-4">
                    <AvatarImage :src="`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}`" />
                    <AvatarFallback>{{ initials }}</AvatarFallback>
                </Avatar>

                <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {{ customer.name }}
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ customer.username }}
                </p>
                <Badge v-if="customer.level" variant="outline" class="mt-2 bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700">
                    {{ customer.level }}
                </Badge>

                <Badge
                    v-if="customer.email_verified_at"
                    class="mt-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100"
                >
                    <CheckCircle class="w-3 h-3 mr-1" />
                    Email Terverifikasi
                </Badge>
                <Badge v-else variant="secondary" class="mt-3">
                    <AlertCircle class="w-3 h-3 mr-1" />
                    Email Belum Terverifikasi
                </Badge>

                <div class="mt-4 w-full space-y-2 text-sm">
                    <div class="space-y-1.5">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-600 dark:text-gray-400">Referral Link</span>
                            <div class="flex gap-1">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    class="h-6 px-2 text-[10px]"
                                    @click="copyReferralLink"
                                >
                                    <Check v-if="copied" class="w-3 h-3 mr-1" />
                                    <Copy v-else class="w-3 h-3 mr-1" />
                                    {{ copied ? 'Tersalin' : 'Salin' }}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    class="h-6 px-2 text-[10px]"
                                    @click="shareReferralLink"
                                >
                                    <Share2 class="w-3 h-3 mr-1" />
                                    Bagikan
                                </Button>
                            </div>
                        </div>
                        <div class="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Kode Referral</span>
                                <span class="font-mono font-semibold">{{ customer.ref_code }}</span>
                            </div>
                            <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-1 break-all">
                                {{ referralLink }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span class="text-gray-600 dark:text-gray-400">E-Wallet ID</span>
                        <span class="font-mono font-semibold">{{ customer.ewallet_id }}</span>
                    </div>
                    <div class="flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <span class="text-emerald-700 dark:text-emerald-400">Saldo</span>
                        <span class="font-semibold text-emerald-700 dark:text-emerald-400">
                            {{ formatCurrency(customer.ewallet_saldo) }}
                        </span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
