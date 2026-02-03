<script setup lang="ts">
import { router, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-vue-next';
import type { Course } from '@/types/zenner';

interface Props {
    item: Course;
}

const props = defineProps<Props>();

const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};
</script>

<template>
    <AppLayout>
        <div class="container mx-auto py-6 space-y-6">
            <div class="flex items-center gap-4">
                <Button variant="outline" size="icon" as-child>
                    <Link href="/admin/zenner/courses"><ArrowLeft class="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">{{ item.title }}</h1>
                    <p class="text-muted-foreground">Detail Course & Lessons</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div class="flex items-center gap-4">
                        <Badge v-if="item.is_active" variant="default">Aktif</Badge>
                        <Badge v-else variant="secondary">Nonaktif</Badge>
                        <span class="text-sm text-muted-foreground">Level: {{ item.level }}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p v-if="item.description" class="mb-4">{{ item.description }}</p>
                    <p class="text-sm text-muted-foreground">Dibuat: {{ formatDate(item.created_at) }}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <h2 class="text-xl font-semibold">Lessons ({{ item.lessons?.length || 0 }})</h2>
                </CardHeader>
                <CardContent>
                    <Table v-if="item.lessons && item.lessons.length > 0">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Judul</TableHead>
                                <TableHead>Durasi (menit)</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="lesson in item.lessons" :key="lesson.id">
                                <TableCell>{{ lesson.sort_order }}</TableCell>
                                <TableCell>{{ lesson.title }}</TableCell>
                                <TableCell>{{ lesson.duration_minutes }}</TableCell>
                                <TableCell>
                                    <Badge v-if="lesson.is_active" variant="default">Aktif</Badge>
                                    <Badge v-else variant="secondary">Nonaktif</Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div v-else class="py-8 text-center">
                        <p class="text-muted-foreground">Belum ada lesson</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
