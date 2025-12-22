<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MoreHorizontal, Plus, Search, ArrowUpDown } from 'lucide-vue-next';
import { ref } from 'vue';

interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
    base_price: number;
    stock: number;
    bv: number | null;
    b_sponsor: number | null;
    b_matching: number | null;
    b_pairing: number | null;
    b_cashback: number | null;
    b_retail: number | null;
    is_active: boolean;
    categories: Array<{ id: number; name: string }>;
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Array<{ id: number; name: string }>;
    filters: {
        search?: string;
        category?: number;
        status?: boolean;
        sort_by?: string;
        sort_order?: string;
        per_page?: number;
    };
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');
const selectedCategory = ref(props.filters.category?.toString() || 'all');
const selectedStatus = ref(props.filters.status?.toString() || 'all');
const sortBy = ref(props.filters.sort_by || 'created_at');
const sortOrder = ref(props.filters.sort_order || 'desc');
const perPage = ref(props.filters.per_page || 15);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const handleSearch = () => {
    router.get('/admin/products', {
        search: searchQuery.value,
        category: selectedCategory.value === 'all' ? undefined : selectedCategory.value,
        status: selectedStatus.value === 'all' ? undefined : selectedStatus.value,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        per_page: perPage.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const handleSort = (column: string) => {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = column;
        sortOrder.value = 'asc';
    }
    handleSearch();
};

const totalBonus = (product: Product) => {
    const bonus = (product.b_sponsor || 0) + (product.b_matching || 0) + (product.b_pairing || 0) + (product.b_cashback || 0) + (product.b_retail || 0);
    return bonus > 0 ? formatCurrency(bonus) : '-';
};

const deleteProduct = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        router.delete(`/admin/products/${id}`, {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <Head title="Kelola Produk" />

    <AppLayout>
        <div class="space-y-6rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-3xl font-bold tracking-tight">Kelola Produk</h2>
                    <p class="text-muted-foreground">Kelola semua produk yang tersedia di toko</p>
                </div>
                <Button @click="router.visit('/admin/products/create')">
                    <Plus class="mr-2 h-4 w-4" />
                    Tambah Produk
                </Button>
            </div>

            <div class="flex items-center gap-4">
                <div class="relative flex-1">
                    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        v-model="searchQuery"
                        placeholder="Cari produk..."
                        class="pl-10"
                        @keydown.enter="handleSearch"
                    />
                </div>
                <Select v-model="selectedCategory" @update:model-value="handleSearch">
                    <SelectTrigger class="w-[200px]">
                        <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        <SelectItem v-for="category in categories" :key="category.id" :value="category.id.toString()">
                            {{ category.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select v-model="selectedStatus" @update:model-value="handleSearch">
                    <SelectTrigger class="w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="1">Aktif</SelectItem>
                        <SelectItem value="0">Tidak Aktif</SelectItem>
                    </SelectContent>
                </Select>
                <Select v-model="perPage" @update:model-value="handleSearch">
                    <SelectTrigger class="w-[100px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem :value="10">10</SelectItem>
                        <SelectItem :value="25">25</SelectItem>
                        <SelectItem :value="50">50</SelectItem>
                        <SelectItem :value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Button variant="ghost" @click="handleSort('sku')" class="flex items-center gap-1 p-0 h-auto">
                                    SKU
                                    <ArrowUpDown class="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" @click="handleSort('name')" class="flex items-center gap-1 p-0 h-auto">
                                    Nama Produk
                                    <ArrowUpDown class="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>
                                <Button variant="ghost" @click="handleSort('base_price')" class="flex items-center gap-1 p-0 h-auto">
                                    Harga
                                    <ArrowUpDown class="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" @click="handleSort('bv')" class="flex items-center gap-1 p-0 h-auto">
                                    BV
                                    <ArrowUpDown class="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>Total Bonus</TableHead>
                            <TableHead>
                                <Button variant="ghost" @click="handleSort('b_retail')" class="flex items-center gap-1 p-0 h-auto">
                                    B. Retail
                                    <ArrowUpDown class="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" @click="handleSort('stock')" class="flex items-center gap-1 p-0 h-auto">
                                    Stok
                                    <ArrowUpDown class="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead class="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-if="products.data.length === 0">
                            <TableCell colspan="10" class="text-center text-muted-foreground">
                                Tidak ada produk ditemukan
                            </TableCell>
                        </TableRow>
                        <TableRow v-for="product in products.data" :key="product.id">
                            <TableCell class="font-medium">{{ product.sku }}</TableCell>
                            <TableCell>{{ product.name }}</TableCell>
                            <TableCell>
                                <div class="flex flex-wrap gap-1">
                                    <Badge v-for="cat in product.categories" :key="cat.id" variant="secondary">
                                        {{ cat.name }}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>{{ formatCurrency(product.base_price) }}</TableCell>
                            <TableCell>
                                <Badge variant="outline">
                                    {{ product.bv || 0 }}
                                </Badge>
                            </TableCell>
                            <TableCell>{{ totalBonus(product) }}</TableCell>
                            <TableCell>
                                <Badge variant="outline">
                                    {{ product.b_retail ? formatCurrency(product.b_retail) : '-' }}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge :variant="product.stock > 0 ? 'default' : 'destructive'">
                                    {{ product.stock }}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge :variant="product.is_active ? 'default' : 'secondary'">
                                    {{ product.is_active ? 'Aktif' : 'Tidak Aktif' }}
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
                                        <DropdownMenuItem @click="router.visit(`/admin/products/${product.id}/edit`)">
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem @click="deleteProduct(product.id)" class="text-destructive">
                                            Hapus
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div v-if="products.last_page > 1" class="flex items-center justify-between">
                <p class="text-sm text-muted-foreground">
                    Menampilkan {{ products.data.length }} dari {{ products.total }} produk
                </p>
                <div class="flex gap-2">
                    <Button
                        v-for="page in products.last_page"
                        :key="page"
                        :variant="page === products.current_page ? 'default' : 'outline'"
                        size="sm"
                        @click="router.get(`/admin/products?page=${page}`)"
                    >
                        {{ page }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
