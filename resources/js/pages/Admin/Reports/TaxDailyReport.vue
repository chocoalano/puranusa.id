<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { debounce } from 'lodash-es';
import AppLayout from '@/layouts/AppLayout.vue';
import Pagination from '@/components/Pagination.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, Search, Download, Loader2 } from 'lucide-vue-next';

interface TaxDailyRow {
    id: number;
    tanggal: string;
    tahun_pajak: number;
    username: string;
    name: string;
    fullname: string;
    email: string;
    no_telepon: string;
    npwp: string;
    nik: string;
    alamat: string;
    jumlah_bruto: number;
    tarif: number;
    pph21: number;
}

interface PaginatedData {
    data: TaxDailyRow[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    data: PaginatedData;
    filters: {
        q?: string;
        year?: number | null;
        month?: number | null;
        per_page?: number;
        sort_by?: string;
        sort_dir?: 'asc' | 'desc';
    };
}

const props = defineProps<Props>();
const page = usePage();
const baseUrl = computed(() => page.url.split('?')[0]);

const search = ref(props.filters.q || '');
const yearFilter = ref(props.filters.year ? String(props.filters.year) : 'all');
const monthFilter = ref(props.filters.month ? String(props.filters.month) : 'all');
const sortBy = ref(props.filters.sort_by || 'tanggal');
const sortDir = ref(props.filters.sort_dir || 'desc');
const isExporting = ref(false);

const yearOptions = computed(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
    const selectedYear = props.filters.year;
    if (selectedYear && !years.includes(selectedYear)) {
        years.unshift(selectedYear);
    }
    return years;
});

const monthOptions = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

const performSearch = debounce(() => {
    router.get(
        baseUrl.value,
        {
            q: search.value || undefined,
            year: yearFilter.value !== 'all' ? yearFilter.value : undefined,
            month: monthFilter.value !== 'all' ? monthFilter.value : undefined,
            per_page: props.data.per_page,
            sort_by: sortBy.value,
            sort_dir: sortDir.value,
        },
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
}, 300);

const handleFilterChange = () => {
    performSearch();
};

const clearFilters = () => {
    search.value = '';
    yearFilter.value = 'all';
    monthFilter.value = 'all';
    sortBy.value = 'tanggal';
    sortDir.value = 'desc';
    performSearch();
};

const hasActiveFilters = computed(() => {
    return (
        !!search.value ||
        yearFilter.value !== 'all' ||
        monthFilter.value !== 'all'
    );
});

const handleSort = (column: string) => {
    if (sortBy.value === column) {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = column;
        sortDir.value = 'asc';
    }
    performSearch();
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount || 0);
};

const formatDate = (date: string) => {
    if (!date) return '-';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const formatTarif = (value: number) => {
    if (value === null || value === undefined) return '-';
    const normalized = value > 1 ? value / 100 : value;
    return new Intl.NumberFormat('id-ID', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(normalized);
};

// Export functionality
const handleExport = async () => {
    isExporting.value = true;
    try {
        const params = new URLSearchParams();
        if (search.value) params.append('q', search.value);
        if (yearFilter.value !== 'all') params.append('year', yearFilter.value);
        if (monthFilter.value !== 'all') params.append('month', monthFilter.value);
        params.append('sort_by', sortBy.value);
        params.append('sort_dir', sortDir.value);

        const exportUrl = `${baseUrl.value}/export?${params.toString()}`;

        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = exportUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Export error:', error);
        alert('Terjadi kesalahan saat export data');
    } finally {
        isExporting.value = false;
    }
};

const paginationFilters = computed(() => ({
    q: search.value || undefined,
    year: yearFilter.value !== 'all' ? yearFilter.value : undefined,
    month: monthFilter.value !== 'all' ? monthFilter.value : undefined,
    per_page: props.data.per_page,
    sort_by: sortBy.value,
    sort_dir: sortDir.value,
}));
</script>

<template>
    <AppLayout>
        <Head title="Laporan Pajak Harian" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Laporan Pajak Harian</h1>
                    <p class="text-muted-foreground">
                        Detail transaksi pajak per hari.
                    </p>
                </div>
                <Button
                    @click="handleExport"
                    :disabled="isExporting"
                    variant="default"
                    class="gap-2"
                >
                    <Loader2 v-if="isExporting" class="h-4 w-4 animate-spin" />
                    <Download v-else class="h-4 w-4" />
                    Export Excel
                </Button>
            </div>

            <div class="mb-4 space-y-4">
                <div class="flex items-center gap-4">
                    <div class="relative flex-1 max-w-md">
                        <Search
                            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            v-model="search"
                            placeholder="Cari username, nama, email, NPWP, NIK..."
                            class="pl-10"
                            @input="performSearch"
                        />
                    </div>
                    <Button
                        v-if="hasActiveFilters"
                        variant="outline"
                        size="sm"
                        @click="clearFilters"
                    >
                        Reset Filter
                    </Button>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <Select v-model="yearFilter" @update:model-value="handleFilterChange">
                        <SelectTrigger class="w-[160px]">
                            <SelectValue placeholder="Semua Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tahun</SelectItem>
                            <SelectItem
                                v-for="option in yearOptions"
                                :key="option"
                                :value="String(option)"
                            >
                                {{ option }}
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Select v-model="monthFilter" @update:model-value="handleFilterChange">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Semua Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Bulan</SelectItem>
                            <SelectItem
                                v-for="option in monthOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div class="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[60px]">No</TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="-ml-4 h-8"
                                    @click="handleSort('tanggal')"
                                >
                                    Tanggal
                                    <ArrowUpDown class="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="-ml-4 h-8"
                                    @click="handleSort('tahun_pajak')"
                                >
                                    Tahun Pajak
                                    <ArrowUpDown class="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="-ml-4 h-8"
                                    @click="handleSort('username')"
                                >
                                    Username
                                    <ArrowUpDown class="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="-ml-4 h-8"
                                    @click="handleSort('name')"
                                >
                                    Nama
                                    <ArrowUpDown class="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Fullname</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telepon</TableHead>
                            <TableHead>NPWP</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead class="text-right">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="-mr-4 h-8"
                                    @click="handleSort('jumlah_bruto')"
                                >
                                    Bruto
                                    <ArrowUpDown class="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead class="text-right">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="-mr-4 h-8"
                                    @click="handleSort('tarif')"
                                >
                                    Tarif
                                    <ArrowUpDown class="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead class="text-right">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="-mr-4 h-8"
                                    @click="handleSort('pph21')"
                                >
                                    PPh21
                                    <ArrowUpDown class="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <template v-if="props.data.data.length">
                            <TableRow v-for="(row, index) in props.data.data" :key="row.id">
                                <TableCell class="font-medium">
                                    {{ index + 1 + (props.data.current_page - 1) * props.data.per_page }}
                                </TableCell>
                                <TableCell>{{ formatDate(row.tanggal) }}</TableCell>
                                <TableCell>{{ row.tahun_pajak }}</TableCell>
                                <TableCell>{{ row.username || '-' }}</TableCell>
                                <TableCell>{{ row.name || '-' }}</TableCell>
                                <TableCell>{{ row.fullname || '-' }}</TableCell>
                                <TableCell>{{ row.email || '-' }}</TableCell>
                                <TableCell>{{ row.no_telepon || '-' }}</TableCell>
                                <TableCell>{{ row.npwp || '-' }}</TableCell>
                                <TableCell>{{ row.nik || '-' }}</TableCell>
                                <TableCell class="max-w-[220px] truncate" :title="row.alamat || '-'">
                                    {{ row.alamat || '-' }}
                                </TableCell>
                                <TableCell class="text-right font-medium">
                                    {{ formatCurrency(row.jumlah_bruto) }}
                                </TableCell>
                                <TableCell class="text-right">
                                    {{ formatTarif(row.tarif) }}
                                </TableCell>
                                <TableCell class="text-right font-medium">
                                    {{ formatCurrency(row.pph21) }}
                                </TableCell>
                            </TableRow>
                        </template>
                        <TableRow v-else>
                            <TableCell colspan="14" class="h-32 text-center text-muted-foreground">
                                <div class="flex flex-col items-center justify-center gap-2">
                                    <Search class="h-8 w-8 opacity-40" />
                                    <p>Tidak ada data yang ditemukan</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <Pagination
                :data="data"
                :url="baseUrl"
                :filters="paginationFilters"
                :perPageOptions="[15, 25, 50, 100, 200]"
            />
        </div>
    </AppLayout>
</template>
