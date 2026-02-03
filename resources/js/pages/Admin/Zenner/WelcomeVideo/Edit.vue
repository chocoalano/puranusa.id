<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import type { WelcomeVideo } from '@/types/zenner';

interface Props {
    item: WelcomeVideo;
}

const props = defineProps<Props>();

const form = useForm({
    title: props.item.title,
    video_url: props.item.video_url,
    description: props.item.description || '',
    thumbnail: props.item.thumbnail || '',
    is_active: props.item.is_active,
    sort_order: props.item.sort_order,
});

const submit = () => {
    form.put(`/admin/zenner/welcome-videos/${props.item.id}`, {
        onSuccess: () => toast.success('Data berhasil diperbarui'),
        onError: () => toast.error('Gagal menyimpan data'),
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">Edit Welcome Video</h1>
            <Card>
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Title</label>
                            <Input v-model="form.title" />
                            <p v-if="form.errors.title" class="text-sm text-destructive mt-1">{{ form.errors.title }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Video URL</label>
                            <Input v-model="form.video_url" />
                            <p v-if="form.errors.video_url" class="text-sm text-destructive mt-1">{{ form.errors.video_url }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Deskripsi</label>
                            <textarea v-model="form.description" rows="4" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                            <p v-if="form.errors.description" class="text-sm text-destructive mt-1">{{ form.errors.description }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Thumbnail</label>
                            <Input v-model="form.thumbnail" />
                            <p v-if="form.errors.thumbnail" class="text-sm text-destructive mt-1">{{ form.errors.thumbnail }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Urutan</label>
                            <Input v-model="form.sort_order" type="number" />
                            <p v-if="form.errors.sort_order" class="text-sm text-destructive mt-1">{{ form.errors.sort_order }}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="is_active" v-model="form.is_active" class="rounded" />
                            <label for="is_active" class="text-sm">Aktif</label>
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" :disabled="form.processing">Simpan</Button>
                            <Button variant="outline" as-child><Link href="/admin/zenner/welcome-videos">Batal</Link></Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
