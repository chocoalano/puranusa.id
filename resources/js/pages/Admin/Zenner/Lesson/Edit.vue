<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'vue-sonner';
import type { Lesson, Course } from '@/types/zenner';

interface Props {
    item: Lesson;
    courses: Course[];
}

const props = defineProps<Props>();

const form = useForm({
    course_id: props.item.course_id.toString(),
    title: props.item.title,
    content: props.item.content || '',
    video_url: props.item.video_url || '',
    duration_minutes: props.item.duration_minutes,
    is_active: props.item.is_active,
    sort_order: props.item.sort_order,
});

const submit = () => {
    form.put(`/admin/zenner/lessons/${props.item.id}`, {
        onSuccess: () => toast.success('Lesson berhasil diperbarui'),
        onError: () => toast.error('Gagal memperbarui data'),
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">Edit Lesson</h1>
            <Card>
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Course</label>
                            <Select v-model="form.course_id">
                                <SelectTrigger><SelectValue placeholder="Pilih Course" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="c in courses" :key="c.id" :value="c.id.toString()">{{ c.title }}</SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="form.errors.course_id" class="text-sm text-destructive mt-1">{{ form.errors.course_id }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Judul</label>
                            <Input v-model="form.title" />
                            <p v-if="form.errors.title" class="text-sm text-destructive mt-1">{{ form.errors.title }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Konten</label>
                            <textarea v-model="form.content" rows="6" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                            <p v-if="form.errors.content" class="text-sm text-destructive mt-1">{{ form.errors.content }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Video URL</label>
                            <Input v-model="form.video_url" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Durasi (menit)</label>
                            <Input v-model.number="form.duration_minutes" type="number" />
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
                            <Button variant="outline" as-child><Link href="/admin/zenner/lessons">Batal</Link></Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
