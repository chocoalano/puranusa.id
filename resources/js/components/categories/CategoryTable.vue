<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    is_active: boolean;
    sort_order: number;
    products_count: number;
    parent?: { name: string };
}

interface Props {
    categories: Category[];
}

defineProps<Props>();

const emit = defineEmits<{
    delete: [id: number];
}>();
</script>

<template>
    <div class="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nama Kategori</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Urutan</TableHead>
                    <TableHead>Jumlah Produk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead class="w-[80px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-if="categories.length === 0">
                    <TableCell colspan="7" class="text-center text-muted-foreground">
                        Tidak ada kategori ditemukan
                    </TableCell>
                </TableRow>
                <TableRow v-for="category in categories" :key="category.id">
                    <TableCell class="font-medium">{{ category.name }}</TableCell>
                    <TableCell class="text-muted-foreground">{{ category.slug }}</TableCell>
                    <TableCell>
                        <Badge v-if="category.parent" variant="secondary">
                            {{ category.parent.name }}
                        </Badge>
                        <span v-else class="text-muted-foreground">-</span>
                    </TableCell>
                    <TableCell>{{ category.sort_order }}</TableCell>
                    <TableCell>
                        <Badge>{{ category.products_count }}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge :variant="category.is_active ? 'default' : 'secondary'">
                            {{ category.is_active ? 'Aktif' : 'Tidak Aktif' }}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal class="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <Link :href="`/admin/categories/${category.id}/edit`">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    @click="emit('delete', category.id)"
                                    class="text-destructive"
                                >
                                    Hapus
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>
