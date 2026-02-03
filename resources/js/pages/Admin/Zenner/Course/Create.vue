<script setup lang="ts">
import { ref } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search, Pencil, Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const form = useForm({
    title: '',
    description: '',
    thumbnail: '',
    level: 'beginner',
    is_active: true,
    sort_order: 0,
});

const submit = () => {
    form.post('/admin/zenner/courses', {
        onSuccess: () => toast.success('Course berhasil dibuat'),
    });
};
</script>

<template>
    <AppLayout title="Tambah Course">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Tambah Course</h2>
                    <Button variant="outline" @click="router.get('/admin/zenner/courses')">Kembali</Button>
                </div>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-4 max-w-2xl">
                    <div>
                        <label class="block text-sm font-medium mb-1">Title</label>
                        <Input v-model="form.title" />
                        <p v-if="form.errors.title" class="text-sm text-destructive mt-1">{{ form.errors.title }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Description</label>
                        <textarea v-model="form.description" rows="4" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
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
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                        <p v-if="form.errors.level" class="text-sm text-destructive mt-1">{{ form.errors.level }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Sort Order</label>
                        <Input v-model.number="form.sort_order" type="number" />
                        <p v-if="form.errors.sort_order" class="text-sm text-destructive mt-1">{{ form.errors.sort_order }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="checkbox" v-model="form.is_active" id="is_active" class="rounded border-gray-300" />
                        <label for="is_active" class="text-sm font-medium">Aktif</label>
                    </div>
                    <Button type="submit" :disabled="form.processing">Simpan</Button>
                </form>
            </CardContent>
        </Card>
    </AppLayout>
</template>
