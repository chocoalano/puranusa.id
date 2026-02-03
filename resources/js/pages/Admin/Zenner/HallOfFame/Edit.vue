<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft } from 'lucide-vue-next';

interface HallOfFame {
    id: number;
    customer_name: string;
    title: string;
    description: string | null;
    image: string | null;
    achievement: string;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    entry: HallOfFame;
}

const props = defineProps<Props>();

const form = useForm({
    customer_name: props.entry.customer_name,
    title: props.entry.title,
    description: props.entry.description || '',
    image: props.entry.image || '',
    achievement: props.entry.achievement,
    is_active: props.entry.is_active,
    sort_order: props.entry.sort_order,
});

const submit = () => {
    form.put(`/admin/zenner/hall-of-fames/${props.entry.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Hall of Fame berhasil diperbarui');
        },
        onError: () => {
            toast.error('Gagal memperbarui Hall of Fame');
        },
    });
};
</script>

<template>
    <Head :title="`Edit ${entry.title}`" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/zenner/hall-of-fames">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Edit Hall of Fame</h1>
                    <p class="text-muted-foreground">Perbarui informasi Hall of Fame</p>
                </div>
            </div>

            <Card class="max-w-4xl">
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium">Nama Customer</label>
                            <Input v-model="form.customer_name" placeholder="Nama customer" />
                            <p v-if="form.errors.customer_name" class="text-sm text-destructive">{{ form.errors.customer_name }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Title</label>
                            <Input v-model="form.title" placeholder="Judul" />
                            <p v-if="form.errors.title" class="text-sm text-destructive">{{ form.errors.title }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Deskripsi</label>
                            <textarea
                                v-model="form.description"
                                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Deskripsi"
                            />
                            <p v-if="form.errors.description" class="text-sm text-destructive">{{ form.errors.description }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Image</label>
                            <Input v-model="form.image" placeholder="URL gambar" />
                            <p v-if="form.errors.image" class="text-sm text-destructive">{{ form.errors.image }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Achievement</label>
                            <Input v-model="form.achievement" placeholder="Achievement" />
                            <p v-if="form.errors.achievement" class="text-sm text-destructive">{{ form.errors.achievement }}</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Urutan</label>
                            <Input v-model="form.sort_order" type="number" placeholder="0" />
                            <p v-if="form.errors.sort_order" class="text-sm text-destructive">{{ form.errors.sort_order }}</p>
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
                            <Link href="/admin/zenner/hall-of-fames">
                                <Button type="button" variant="outline">Batal</Button>
                            </Link>
                            <Button type="submit" :disabled="form.processing">
                                {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
