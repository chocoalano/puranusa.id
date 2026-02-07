<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface ParentCategory {
    id: number;
    name: string;
}

interface CategoryItem {
    id: number;
    parent_id: number | null;
    name: string;
    slug: string;
}

interface Props {
    item: CategoryItem;
    parents: ParentCategory[];
}

const props = defineProps<Props>();

const form = useForm({
    parent_id: props.item.parent_id,
    name: props.item.name,
    slug: props.item.slug,
});

const selectedParent = computed({
    get() {
        return form.parent_id ? String(form.parent_id) : 'none';
    },
    set(value: string) {
        form.parent_id = value === 'none' ? null : Number(value);
    },
});

const submit = () => {
    form
        .transform((data) => {
            const payload: Record<string, any> = { ...data };
            if (!payload.slug) delete payload.slug;
            if (!payload.parent_id) delete payload.parent_id;
            return payload;
        })
        .put(`/admin/zenner-club/categories/${props.item.id}`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Kategori berhasil diperbarui');
                },
                onError: () => {
                    toast.error('Gagal memperbarui kategori');
                },
            }
        );
};
</script>

<template>
    <Head :title="`Edit ${item.name}`" />

    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center gap-4">
                <Link href="/admin/zenner-club/categories">
                    <Button variant="outline" size="icon">
                        <ArrowLeft class="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 class="text-3xl font-bold">Edit Kategori</h1>
                    <p class="text-muted-foreground">Perbarui kategori Zenner Club</p>
                </div>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Kategori</CardTitle>
                        <CardDescription>Perbarui data kategori</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <Label>Parent Kategori</Label>
                            <Select v-model="selectedParent">
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih parent" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Tanpa Parent</SelectItem>
                                    <SelectItem
                                        v-for="item in parents"
                                        :key="item.id"
                                        :value="String(item.id)"
                                    >
                                        {{ item.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="form.errors.parent_id" class="text-sm text-destructive">{{ form.errors.parent_id }}</p>
                        </div>

                        <div class="space-y-2">
                            <Label for="name">Nama</Label>
                            <Input
                                id="name"
                                v-model="form.name"
                                :class="{ 'border-destructive': form.errors.name }"
                            />
                            <p v-if="form.errors.name" class="text-sm text-destructive">{{ form.errors.name }}</p>
                        </div>

                        <div class="space-y-2">
                            <Label for="slug">Slug</Label>
                            <Input
                                id="slug"
                                v-model="form.slug"
                                :class="{ 'border-destructive': form.errors.slug }"
                            />
                            <p v-if="form.errors.slug" class="text-sm text-destructive">{{ form.errors.slug }}</p>
                        </div>
                    </CardContent>
                </Card>

                <div class="flex justify-end gap-2">
                    <Link href="/admin/zenner-club/categories">
                        <Button type="button" variant="outline">Batal</Button>
                    </Link>
                    <Button type="submit" :disabled="form.processing">
                        <Save class="mr-2 h-4 w-4" />
                        {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
