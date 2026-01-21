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
import { MoreHorizontal, ImageIcon } from 'lucide-vue-next';
import { Link } from '@inertiajs/vue3';
import { usePermissions } from '@/composables/usePermissions';

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    is_active: boolean;
    sort_order: number;
    products_count: number;
    image: string | null;
    parent?: { name: string };
}

interface Props {
    categories: Category[];
}
const { isSuperAdmin, isAdmin } = usePermissions()
defineProps<Props>();

const emit = defineEmits<{
    delete: [id: number];
}>();

const getImageUrl = (image: string | null) => {
    if (!image) return null;
    // If it's already an absolute URL, return as-is
    if (image.startsWith('http://') || image.startsWith('https://')) {
        return image;
    }
    // Otherwise, prepend storage path
    return `/storage/${image}`;
};
</script>

<template>
    <div class="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[60px]">Gambar</TableHead>
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
                    <TableCell colspan="8" class="text-center text-muted-foreground">
                        Tidak ada kategori ditemukan
                    </TableCell>
                </TableRow>
                <TableRow v-for="category in categories" :key="category.id">
                    <TableCell>
                        <div class="w-10 h-10 rounded-md border overflow-hidden bg-muted flex items-center justify-center">
                            <img
                                v-if="category.image"
                                :src="getImageUrl(category.image)"
                                :alt="category.name"
                                class="w-full h-full object-cover"
                            />
                            <ImageIcon v-else class="w-5 h-5 text-muted-foreground" />
                        </div>
                    </TableCell>
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
                                <Link :href="`/admin/categories/${category.id}/edit`" v-if="isSuperAdmin || isAdmin">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    @click="emit('delete', category.id)"
                                    class="text-destructive"
                                    v-if="isSuperAdmin || isAdmin"
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
