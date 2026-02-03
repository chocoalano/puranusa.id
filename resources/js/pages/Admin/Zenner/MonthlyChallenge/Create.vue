<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { ArrowLeft } from 'lucide-vue-next';

const form = useForm({
    title: '',
    description: '',
    image: '',
    start_date: '',
    end_date: '',
    reward: '',
    is_active: true,
});

const submit = () => {
    form.post('/admin/zenner/monthly-challenges', {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Monthly Challenge berhasil ditambahkan');
        },
        onError: () => {
            toast.error('Gagal menambahkan Monthly Challenge');
        },
    });
};
</script>

<template>
    <Head title="Tambah Monthly Challenge" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/zenner/monthly-challenges">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Tambah Monthly Challenge</h1>
                    <p class="text-muted-foreground">Buat tantangan bulanan baru</p>
                </div>
            </div>

            <Card class="max-w-4xl">
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Title</label>
                            <Input v-model="form.title" placeholder="Judul challenge" />
                            <p v-if="form.errors.title" class="text-sm text-destructive">{{ form.errors.title }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Deskripsi</label>
                            <textarea
                                v-model="form.description"
                                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Deskripsi challenge"
                            />
                            <p v-if="form.errors.description" class="text-sm text-destructive">{{ form.errors.description }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Image</label>
                            <Input v-model="form.image" placeholder="URL gambar" />
                            <p v-if="form.errors.image" class="text-sm text-destructive">{{ form.errors.image }}</p>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label class="text-sm font-medium">Tanggal Mulai</label>
                                <Input v-model="form.start_date" type="date" />
                                <p v-if="form.errors.start_date" class="text-sm text-destructive">{{ form.errors.start_date }}</p>
                            </div>
                            <div class="space-y-2">
                                <label class="text-sm font-medium">Tanggal Selesai</label>
                                <Input v-model="form.end_date" type="date" />
                                <p v-if="form.errors.end_date" class="text-sm text-destructive">{{ form.errors.end_date }}</p>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Reward</label>
                            <textarea
                                v-model="form.reward"
                                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Deskripsi reward"
                            />
                            <p v-if="form.errors.reward" class="text-sm text-destructive">{{ form.errors.reward }}</p>
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
                            <Link href="/admin/zenner/monthly-challenges">
                                <Button type="button" variant="outline">Batal</Button>
                            </Link>
                            <Button type="submit" :disabled="form.processing">
                                {{ form.processing ? 'Menyimpan...' : 'Simpan Challenge' }}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
