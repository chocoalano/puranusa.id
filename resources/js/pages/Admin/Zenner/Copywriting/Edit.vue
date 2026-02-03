<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'vue-sonner';
import type { Copywriting } from '@/types/zenner';

interface Props {
    item: Copywriting;
}

const props = defineProps<Props>();

const form = useForm({
    title: props.item.title,
    content: props.item.content,
    category: props.item.category || '',
    is_active: props.item.is_active,
    sort_order: props.item.sort_order,
});

const submit = () => {
    form.put(`/admin/zenner/copywritings/${props.item.id}`, {
        onSuccess: () => toast.success('Data berhasil diperbarui'),
        onError: () => toast.error('Gagal menyimpan data'),
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">Edit Copywriting</h1>
            <Card>
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Title</label>
                            <Input v-model="form.title" />
                            <p v-if="form.errors.title" class="text-sm text-destructive mt-1">{{ form.errors.title }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Konten</label>
                            <textarea v-model="form.content" rows="6" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                            <p v-if="form.errors.content" class="text-sm text-destructive mt-1">{{ form.errors.content }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Kategori</label>
                            <Input v-model="form.category" />
                            <p v-if="form.errors.category" class="text-sm text-destructive mt-1">{{ form.errors.category }}</p>
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
                            <Button variant="outline" as-child><Link href="/admin/zenner/copywritings">Batal</Link></Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
