<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'vue-sonner';

const form = useForm({
    title: '',
    description: '',
    speaker: '',
    scheduled_at: '',
    duration_minutes: 60,
    meeting_url: '',
    status: 'upcoming',
    is_active: true,
});

const submit = () => {
    form.post('/admin/zenner/webinars', {
        onSuccess: () => toast.success('Webinar berhasil ditambahkan'),
        onError: () => toast.error('Gagal menyimpan data'),
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">Tambah Webinar</h1>
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
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Speaker</label>
                            <Input v-model="form.speaker" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Jadwal</label>
                            <Input v-model="form.scheduled_at" type="datetime-local" />
                            <p v-if="form.errors.scheduled_at" class="text-sm text-destructive mt-1">{{ form.errors.scheduled_at }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Durasi (menit)</label>
                            <Input v-model.number="form.duration_minutes" type="number" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Meeting URL</label>
                            <Input v-model="form.meeting_url" placeholder="https://zoom.us/..." />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Status</label>
                            <Select v-model="form.status">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="upcoming">Akan Datang</SelectItem>
                                    <SelectItem value="live">Live</SelectItem>
                                    <SelectItem value="completed">Selesai</SelectItem>
                                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="is_active" v-model="form.is_active" class="rounded" />
                            <label for="is_active" class="text-sm">Aktif</label>
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" :disabled="form.processing">Simpan</Button>
                            <Button variant="outline" as-child><Link href="/admin/zenner/webinars">Batal</Link></Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
