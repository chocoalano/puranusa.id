<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import CategoryHeader from '@/components/categories/CategoryHeader.vue';
import CategorySearch from '@/components/categories/CategorySearch.vue';
import CategoryTable from '@/components/categories/CategoryTable.vue';
import Pagination from '@/components/Pagination.vue';
import { ref } from 'vue';

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
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
        status?: boolean;
    };
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');

const handleSearch = () => {
    router.get('/admin/categories', {
        search: searchQuery.value,
    }, {
        preserveState: true,
        preserveScroll: true,
    });
};

const deleteCategory = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
        router.delete(`/admin/categories/${id}`, {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <Head title="Kelola Kategori" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <CategoryHeader
                title="Kelola Kategori"
                description="Kelola kategori produk"
            />

            <CategorySearch
                v-model="searchQuery"
                @search="handleSearch"
            />

            <CategoryTable
                :categories="categories.data"
                @delete="deleteCategory"
            />

            <Pagination
                v-if="categories.last_page > 1"
                :data="categories"
                url="/admin/categories"
                :filters="filters"
            />
        </div>
    </AppLayout>
</template>
