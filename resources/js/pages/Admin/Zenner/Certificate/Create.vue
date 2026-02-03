<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'vue-sonner';
import { ArrowLeft } from 'lucide-vue-next';

const form = useForm({
    title: '',
    description: '',
    template_image: '',
    type: 'completion',
    is_active: true,
});

const submit = () => {
    form.post('/admin/zenner/certificates', {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Sertifikat berhasil ditambahkan');
        },
        onError: () => {
            toast.error('Gagal menambahkan sertifikat');
        },
    });
};
</script>

<template>
    <Head title="Tambah Sertifikat" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/zenner/certificates">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Tambah Sertifikat</h1>
                    <p class="text-muted-foreground">Buat sertifikat baru</p>
                </div>
            </div>

            <Card class="max-w-4xl">
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Title</label>
                            <Input v-model="form.title" placeholder="Judul sertifikat" />
                            <p v-if="form.errors.title" class="text-sm text-destructive">{{ form.errors.title }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Deskripsi</label>
                            <textarea
                                v-model="form.description"
                                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Deskripsi sertifikat"
                            />
                            <p v-if="form.errors.description" class="text-sm text-destructive">{{ form.errors.description }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Template Image</label>
                            <Input v-model="form.template_image" placeholder="URL template image" />
                            <p v-if="form.errors.template_image" class="text-sm text-destructive">{{ form.errors.template_image }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Tipe</label>
                            <Select v-model="form.type">
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completion">Completion</SelectItem>
                                    <SelectItem value="achievement">Achievement</SelectItem>
                                    <SelectItem value="participation">Participation</SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="form.errors.type" class="text-sm text-destructive">{{ form.errors.type }}</p>
                        </div>

                        <div class="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                v-model="form.is_active"
                                class="h-4 w-4 rounded border-gray-300"
                            />
                            <label for="is_active" class="text-sm font-medium">Aktif</label>
                        </div>

                        <div class="flex items-center gap-4 pt-4">
                            <Link href="/admin/zenner/certificates">
                                <Button type="button" variant="outline">Batal</Button>
                            </Link>
                            <Button type="submit" :disabled="form.processing">
                                {{ form.processing ? 'Menyimpan...' : 'Simpan Sertifikat' }}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
