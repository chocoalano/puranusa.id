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

interface Testimonial {
    id: number;
    customer_name: string;
    content: string;
    image: string;
    rating: number;
    product_name: string;
    is_active: boolean;
    sort_order: number;
}

const props = defineProps<{ item: Testimonial }>();

const form = useForm({
    customer_name: props.item.customer_name,
    content: props.item.content || '',
    image: props.item.image || '',
    rating: props.item.rating,
    product_name: props.item.product_name || '',
    is_active: props.item.is_active,
    sort_order: props.item.sort_order || 0,
});

const submit = () => {
    form.put(`/admin/zenner/testimonials/${props.item.id}`, {
        onSuccess: () => toast.success('Testimonial berhasil diperbarui'),
    });
};
</script>

<template>
    <AppLayout title="Edit Testimonial">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Edit Testimonial</h2>
                    <Button variant="outline" @click="router.get('/admin/zenner/testimonials')">Kembali</Button>
                </div>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-4 max-w-2xl">
                    <div>
                        <label class="block text-sm font-medium mb-1">Nama Customer</label>
                        <Input v-model="form.customer_name" />
                        <p v-if="form.errors.customer_name" class="text-sm text-destructive mt-1">{{ form.errors.customer_name }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Content</label>
                        <textarea v-model="form.content" rows="4" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                        <p v-if="form.errors.content" class="text-sm text-destructive mt-1">{{ form.errors.content }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Image URL</label>
                        <Input v-model="form.image" />
                        <p v-if="form.errors.image" class="text-sm text-destructive mt-1">{{ form.errors.image }}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Rating (1-5)</label>
                            <Input v-model.number="form.rating" type="number" min="1" max="5" />
                            <p v-if="form.errors.rating" class="text-sm text-destructive mt-1">{{ form.errors.rating }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Nama Produk</label>
                            <Input v-model="form.product_name" />
                            <p v-if="form.errors.product_name" class="text-sm text-destructive mt-1">{{ form.errors.product_name }}</p>
                        </div>
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
