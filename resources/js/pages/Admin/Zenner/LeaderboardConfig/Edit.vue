<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'vue-sonner';
import type { LeaderboardConfig } from '@/types/zenner';

interface Props {
    item: LeaderboardConfig;
}

const props = defineProps<Props>();

const form = useForm({
    title: props.item.title,
    type: props.item.type,
    period: props.item.period,
    calculation_field: props.item.calculation_field,
    is_active: props.item.is_active,
});

const submit = () => {
    form.put(`/admin/zenner/leaderboard-configs/${props.item.id}`, {
        onSuccess: () => toast.success('Config berhasil diperbarui'),
        onError: () => toast.error('Gagal memperbarui data'),
    });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">Edit Leaderboard Config</h1>
            <Card>
                <CardContent class="pt-6">
                    <form @submit.prevent="submit" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Judul</label>
                            <Input v-model="form.title" />
                            <p v-if="form.errors.title" class="text-sm text-destructive mt-1">{{ form.errors.title }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Tipe</label>
                            <Select v-model="form.type">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sales">Sales</SelectItem>
                                    <SelectItem value="recruitment">Recruitment</SelectItem>
                                    <SelectItem value="performance">Performance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Periode</label>
                            <Select v-model="form.period">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Calculation Field</label>
                            <Input v-model="form.calculation_field" />
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="is_active" v-model="form.is_active" class="rounded" />
                            <label for="is_active" class="text-sm">Aktif</label>
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" :disabled="form.processing">Simpan</Button>
                            <Button variant="outline" as-child><Link href="/admin/zenner/leaderboard-configs">Batal</Link></Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
