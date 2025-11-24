<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/vue3';
import { CheckCircle, Mail, Phone, User } from 'lucide-vue-next';
import type { Customer } from '@/types/profile';
import { toast } from 'vue-sonner';

const props = defineProps<{
    customer: Customer;
}>();

const form = useForm({
    name: props.customer.name,
    email: props.customer.email,
    phone: props.customer.phone,
    description: props.customer.description || '',
});

const submitForm = () => {
    form.patch('/client/profile', {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Informasi profil berhasil diperbarui');
        },
    });

};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Informasi Profile</CardTitle>
            <CardDescription>
                Update informasi profil Anda di sini
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="submitForm" class="space-y-6">
                <div class="space-y-2">
                    <Label for="name">
                        Nama Lengkap
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <User class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="name"
                            v-model="form.name"
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            class="pl-10"
                            required
                        />
                    </div>
                    <p v-if="form.errors.name" class="text-sm text-red-500">
                        {{ form.errors.name }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="email">
                        Email
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <Mail class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="email@example.com"
                            class="pl-10"
                            required
                        />
                    </div>
                    <p v-if="form.errors.email" class="text-sm text-red-500">
                        {{ form.errors.email }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="phone">
                        Nomor Telepon
                        <span class="text-red-500">*</span>
                    </Label>
                    <div class="relative">
                        <Phone class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="phone"
                            v-model="form.phone"
                            type="tel"
                            placeholder="08123456789"
                            class="pl-10"
                            required
                        />
                    </div>
                    <p v-if="form.errors.phone" class="text-sm text-red-500">
                        {{ form.errors.phone }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="description">Deskripsi</Label>
                    <Textarea
                        id="description"
                        v-model="form.description"
                        placeholder="Ceritakan tentang diri Anda..."
                        rows="4"
                    />
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Maksimal 1000 karakter
                    </p>
                    <p v-if="form.errors.description" class="text-sm text-red-500">
                        {{ form.errors.description }}
                    </p>
                </div>

                <div class="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        @click="form.reset()"
                        :disabled="form.processing"
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        :disabled="form.processing"
                    >
                        <CheckCircle v-if="!form.processing" class="w-4 h-4 mr-2" />
                        {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
