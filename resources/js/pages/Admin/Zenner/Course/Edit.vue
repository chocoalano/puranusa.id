<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'vue-sonner';
import type { Course } from '@/types/zenner';

interface Props {
    item: Course;
}

const props = defineProps<Props>();

const form = useForm({
    title: props.item.title,
    description: props.item.description || '',
    thumbnail: props.item.thumbnail || '',
    level: props.item.level,
    is_active: props.item.is_active,
    sort_order: props.item.sort_order,
});

const submit = () => {
    form.put(`/admin/zenner/courses/${props.item.id}`, {
        onSuccess: () => toast.success('Course berhasil diperbarui'),
        onError: () => toast.error('Gagal memperbarui data'),
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">Edit Course</h1>
            <Card>
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Judul</label>
                            <Input v-model="form.title" />
                            <p v-if="form.errors.title" class="text-sm text-destructive mt-1">{{ form.errors.title }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Deskripsi</label>
                            <textarea v-model="form.description" rows="4" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                            <p v-if="form.errors.description" class="text-sm text-destructive mt-1">{{ form.errors.description }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Thumbnail URL</label>
                            <Input v-model="form.thumbnail" />
                            <p v-if="form.errors.thumbnail" class="text-sm text-destructive mt-1">{{ form.errors.thumbnail }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Level</label>
                            <Select v-model="form.level">
                                <SelectTrigger><SelectValue placeholder="Pilih level" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="form.errors.level" class="text-sm text-destructive mt-1">{{ form.errors.level }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Urutan</label>
                            <Input v-model.number="form.sort_order" type="number" />
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="is_active" v-model="form.is_active" class="rounded" />
                            <label for="is_active" class="text-sm">Aktif</label>
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" :disabled="form.processing">Simpan</Button>
                            <Button variant="outline" as-child><Link href="/admin/zenner/courses">Batal</Link></Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
