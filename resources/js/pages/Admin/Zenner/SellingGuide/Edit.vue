<script setup lang="ts">
import { ref } from 'vue';
import { router, useForm, Link } from '@inertiajs/vue3';
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

interface SellingGuide {
    id: number;
    title: string;
    content: string;
    image: string;
    category: string;
    is_active: boolean;
    sort_order: number;
}

const props = defineProps<{ item: SellingGuide }>();

const form = useForm({
    title: props.item.title,
    content: props.item.content,
    image: props.item.image || '',
    category: props.item.category || '',
    is_active: props.item.is_active,
    sort_order: props.item.sort_order,
});

const submit = () => {
    form.put(`/admin/zenner/selling-guides/${props.item.id}`, {
        onSuccess: () => toast.success('Selling Guide berhasil diperbarui'),
    });
};
</script>

<template>
    <AppLayout>
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Edit Selling Guide</h2>
                    <Button variant="outline" @click="router.visit('/admin/zenner/selling-guides')">Kembali</Button>
                </div>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label class="mb-1 block text-sm font-medium">Title</label>
                        <Input v-model="form.title" />
                        <p v-if="form.errors.title" class="mt-1 text-sm text-destructive">{{ form.errors.title }}</p>
                    </div>
                    <div>
                        <label class="mb-1 block text-sm font-medium">Content</label>
                        <textarea v-model="form.content" rows="6" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <p v-if="form.errors.content" class="mt-1 text-sm text-destructive">{{ form.errors.content }}</p>
                    </div>
                    <div>
                        <label class="mb-1 block text-sm font-medium">Image</label>
                        <Input v-model="form.image" />
                        <p v-if="form.errors.image" class="mt-1 text-sm text-destructive">{{ form.errors.image }}</p>
                    </div>
                    <div>
                        <label class="mb-1 block text-sm font-medium">Category</label>
                        <Input v-model="form.category" />
                        <p v-if="form.errors.category" class="mt-1 text-sm text-destructive">{{ form.errors.category }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="is_active" v-model="form.is_active" class="rounded border-input" />
                        <label for="is_active" class="text-sm font-medium">Aktif</label>
                    </div>
                    <div>
                        <label class="mb-1 block text-sm font-medium">Sort Order</label>
                        <Input v-model.number="form.sort_order" type="number" />
                        <p v-if="form.errors.sort_order" class="mt-1 text-sm text-destructive">{{ form.errors.sort_order }}</p>
                    </div>
                    <Button type="submit" :disabled="form.processing">Simpan</Button>
                </form>
            </CardContent>
        </Card>
    </AppLayout>
</template>
