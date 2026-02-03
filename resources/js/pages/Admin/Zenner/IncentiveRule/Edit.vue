<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'vue-sonner';
import type { IncentiveRule } from '@/types/zenner';

interface Props {
    item: IncentiveRule;
}

const props = defineProps<Props>();

const form = useForm({
    title: props.item.title,
    description: props.item.description || '',
    type: props.item.type,
    conditions: props.item.conditions ? JSON.stringify(props.item.conditions, null, 2) : '',
    rewards: props.item.rewards ? JSON.stringify(props.item.rewards, null, 2) : '',
    is_active: props.item.is_active,
    sort_order: props.item.sort_order,
});

const submit = () => {
    form.transform((data) => ({
        ...data,
        conditions: data.conditions ? JSON.parse(data.conditions) : null,
        rewards: data.rewards ? JSON.parse(data.rewards) : null,
    })).put(`/admin/zenner/incentive-rules/${props.item.id}`, {
        onSuccess: () => toast.success('Rule berhasil diperbarui'),
        onError: () => toast.error('Gagal memperbarui data'),
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">Edit Skema Insentif</h1>
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
                            <label class="block text-sm font-medium mb-1">Tipe</label>
                            <Select v-model="form.type">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bonus">Bonus</SelectItem>
                                    <SelectItem value="reward">Reward</SelectItem>
                                    <SelectItem value="commission">Komisi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Kondisi (JSON)</label>
                            <textarea v-model="form.conditions" rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs" />
                            <p v-if="form.errors.conditions" class="text-sm text-destructive mt-1">{{ form.errors.conditions }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Rewards (JSON)</label>
                            <textarea v-model="form.rewards" rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono text-xs" />
                            <p v-if="form.errors.rewards" class="text-sm text-destructive mt-1">{{ form.errors.rewards }}</p>
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
                            <Button variant="outline" as-child><Link href="/admin/zenner/incentive-rules">Batal</Link></Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
