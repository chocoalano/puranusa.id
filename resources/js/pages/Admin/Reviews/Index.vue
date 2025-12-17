<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { approve, reject, destroy } from '@/actions/App/Http/Controllers/Admin/ReviewManagementController';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ReviewFilters from '@/components/reviews/ReviewFilters.vue';
import ReviewCard from '@/components/reviews/ReviewCard.vue';
import ReviewStatistics from '@/components/reviews/ReviewStatistics.vue';
import Pagination from '@/components/Pagination.vue';
import { ref, watch, computed } from 'vue';

interface Review {
    id: number;
    rating: number;
    title: string;
    comment: string;
    is_approved: boolean;
    is_verified_purchase: boolean;
    customer: { name: string; email: string } | null;
    product: { name: string } | null;
    created_at: string;
}

interface Props {
    reviews: {
        data: Review[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: { search?: string; rating?: number; approved?: boolean };
}

const props = defineProps<Props>();

const searchQuery = ref(props.filters.search || '');
const ratingFilter = ref(props.filters.rating?.toString() || 'all');
const approvedFilter = ref(
    props.filters.approved === true ? '1' : props.filters.approved === false ? '0' : 'all'
);

const deleteDialog = ref({
    open: false,
    review: null as Review | null,
});

const statistics = computed(() => {
    const approved = props.reviews.data.filter((r) => r.is_approved).length;
    const total = props.reviews.total;
    const pending = total - approved;
    const avgRating =
        props.reviews.data.reduce((acc, r) => acc + r.rating, 0) / props.reviews.data.length || 0;

    return {
        total,
        approved,
        pending,
        average_rating: avgRating,
    };
});

const handleApprove = (id: number) => {
    const approveForm = useForm({});
    approveForm.post(approve.url(id), { preserveScroll: true });
};

const handleReject = (id: number) => {
    const rejectForm = useForm({});
    rejectForm.post(reject.url(id), { preserveScroll: true });
};

const openDeleteDialog = (id: number) => {
    const review = props.reviews.data.find((r) => r.id === id);
    deleteDialog.value = { open: true, review: review || null };
};

const handleDelete = () => {
    if (!deleteDialog.value.review) return;

    const deleteForm = useForm({});
    deleteForm.delete(destroy.url(deleteDialog.value.review.id), {
        preserveScroll: true,
        onSuccess: () => {
            deleteDialog.value = { open: false, review: null };
        },
    });
};

let searchTimeout: ReturnType<typeof setTimeout>;
watch([searchQuery, ratingFilter, approvedFilter], () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get(
            '/admin/reviews',
            {
                search: searchQuery.value || undefined,
                rating: ratingFilter.value !== 'all' ? ratingFilter.value : undefined,
                approved:
                    approvedFilter.value !== 'all'
                        ? approvedFilter.value === '1'
                            ? true
                            : false
                        : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, 300);
});
</script>

<template>
    <Head title="Kelola Review" />

    <AppLayout>
        <div class="rounded-xl p-4 space-y-6 py-6">
            <div>
                <h2 class="text-3xl font-bold tracking-tight">Kelola Review Produk</h2>
                <p class="text-muted-foreground">Kelola dan moderasi review dari pelanggan</p>
            </div>

            <ReviewStatistics :statistics="statistics" />

            <ReviewFilters
                v-model:search="searchQuery"
                v-model:rating="ratingFilter"
                v-model:approved="approvedFilter"
            />

            <ReviewCard
                :reviews="reviews.data"
                @approve="handleApprove"
                @reject="handleReject"
                @delete="openDeleteDialog"
            />

            <Pagination
                v-if="reviews.last_page > 1"
                :data="reviews"
                url="/admin/reviews"
                :filters="filters"
            />
        </div>

        <!-- Delete Dialog -->
        <ConfirmDialog
            v-model:open="deleteDialog.open"
            title="Hapus Review?"
            :description="`Apakah Anda yakin ingin menghapus review '${deleteDialog.review?.title}'? Tindakan ini tidak dapat dibatalkan.`"
            confirm-text="Hapus"
            cancel-text="Batal"
            variant="destructive"
            @confirm="handleDelete"
        />
    </AppLayout>
</template>
