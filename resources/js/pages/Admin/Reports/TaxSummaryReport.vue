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
import { Search, Download, Loader2 } from 'lucide-vue-next';

interface TaxReportRow {
    tgl: string;
    member: {
        username: string;
        fullname: string;
        email: string;
        phone: string;
    };
    masapajak: string;
    tahunpajak: string;
    pembetulan: string;
    nomorbuktipotong: string;
    npwp: string;
    fnik: string;
    nama: string;
    alamat: string;
    wpluarnegri: string;
    kodenegara: string;
    kodepajak: string;
    jumlahbruto: number;
    jumlahdpp: number;
    tanpanpwp: string;
    tarif: number;
    pph21: string;
    npwppemotong: string;
    namapemotong: string;
}

interface PaginatedData {
    data: TaxReportRow[];
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
        year?: number | null;
        month?: string | null;
        search?: string | null;
        per_page?: number;
    };
}

const props = defineProps<Props>();
const page = usePage();
const baseUrl = computed(() => page.url.split('?')[0]);

const yearFilter = ref(props.filters.year ? String(props.filters.year) : 'all');
const monthFilter = ref(props.filters.month || 'all');
const searchQuery = ref(props.filters.search || '');
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
    { value: 'all', label: 'Semua Bulan' },
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

const performSearch = debounce(() => {
    router.get(
        baseUrl.value,
        {
            year: yearFilter.value !== 'all' ? yearFilter.value : undefined,
            month: monthFilter.value !== 'all' ? monthFilter.value : undefined,
            search: searchQuery.value || undefined,
            per_page: props.data.per_page,
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
    yearFilter.value = 'all';
    monthFilter.value = 'all';
    searchQuery.value = '';
    performSearch();
};

const hasActiveFilters = computed(() => {
    return yearFilter.value !== 'all' || monthFilter.value !== 'all' || searchQuery.value !== '';
});

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
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

// Export functionality
const handleExport = async () => {
    isExporting.value = true;
    try {
        const params = new URLSearchParams();
        if (yearFilter.value !== 'all') params.append('year', yearFilter.value);
        if (monthFilter.value !== 'all') params.append('month', monthFilter.value);
        if (searchQuery.value) params.append('search', searchQuery.value);

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
    year: yearFilter.value !== 'all' ? yearFilter.value : undefined,
    month: monthFilter.value !== 'all' ? monthFilter.value : undefined,
    search: searchQuery.value || undefined,
    per_page: props.data.per_page,
}));
</script>

<template>
    <AppLayout>
        <Head title="Laporan Pajak Ringkasan" />

        <div class="rounded-xl p-4 space-y-6 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Laporan Pajak Ringkasan</h1>
                    <p class="text-muted-foreground">
                        Data lengkap laporan PPh21 dan bukti potong pajak.
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
                        <SelectTrigger class="w-[160px]">
                            <SelectValue placeholder="Semua Bulan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="option in monthOptions"
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <div class="relative flex-1 max-w-md">
                        <Search
                            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Cari nama, NPWP, email..."
                            class="pl-10"
                            @input="handleFilterChange"
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
            </div>

            <div class="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[60px]">No</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Nama Member</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>No Telepon</TableHead>
                            <TableHead>Masa Pajak</TableHead>
                            <TableHead>Tahun Pajak</TableHead>
                            <TableHead>Pembetulan</TableHead>
                            <TableHead>No. Bukti Potong</TableHead>
                            <TableHead>NPWP</TableHead>
                            <TableHead>NIK</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Alamat</TableHead>
                            <TableHead>WP Luar Negeri</TableHead>
                            <TableHead>Kode Negara</TableHead>
                            <TableHead>Kode Pajak</TableHead>
                            <TableHead class="text-right">Jumlah Bruto (Rp)</TableHead>
                            <TableHead class="text-right">Jumlah DPP (Rp)</TableHead>
                            <TableHead>Tanpa NPWP (Rp)</TableHead>
                            <TableHead class="text-right">Tarif (Rp)</TableHead>
                            <TableHead>PPH21 (Rp)</TableHead>
                            <TableHead>NPWP Pemotong</TableHead>
                            <TableHead>Nama Pemotong</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <template v-if="props.data.data.length">
                            <TableRow v-for="(row, index) in props.data.data" :key="index">
                                <TableCell class="font-medium">
                                    {{ index + 1 + (props.data.current_page - 1) * props.data.per_page }}
                                </TableCell>
                                <TableCell>{{ formatDate(row.tgl) }}</TableCell>
                                <TableCell>{{ row.member?.username || '-' }}</TableCell>
                                <TableCell>{{ row.member?.fullname || '-' }}</TableCell>
                                <TableCell>{{ row.member?.email || '-' }}</TableCell>
                                <TableCell>{{ row.member?.phone || '-' }}</TableCell>
                                <TableCell>{{ row.masapajak || '-' }}</TableCell>
                                <TableCell>{{ row.tahunpajak || '-' }}</TableCell>
                                <TableCell>{{ row.pembetulan || '-' }}</TableCell>
                                <TableCell>{{ row.nomorbuktipotong || '-' }}</TableCell>
                                <TableCell>{{ row.npwp || '-' }}</TableCell>
                                <TableCell>{{ row.fnik || '-' }}</TableCell>
                                <TableCell>{{ row.nama || '-' }}</TableCell>
                                <TableCell class="max-w-[220px] truncate" :title="row.alamat || '-'">
                                    {{ row.alamat || '-' }}
                                </TableCell>
                                <TableCell>{{ row.wpluarnegri || '-' }}</TableCell>
                                <TableCell>{{ row.kodenegara || '-' }}</TableCell>
                                <TableCell>{{ row.kodepajak || '-' }}</TableCell>
                                <TableCell class="text-right font-medium">
                                    {{ formatCurrency(row.jumlahbruto) }}
                                </TableCell>
                                <TableCell class="text-right font-medium">
                                    {{ formatCurrency(row.jumlahdpp) }}
                                </TableCell>
                                <TableCell>{{ row.tanpanpwp || '-' }}</TableCell>
                                <TableCell class="text-right font-medium">
                                    {{ formatCurrency(row.tarif) }}
                                </TableCell>
                                <TableCell>{{ row.pph21 || '-' }}</TableCell>
                                <TableCell>{{ row.npwppemotong || '-' }}</TableCell>
                                <TableCell>{{ row.namapemotong || '-' }}</TableCell>
                            </TableRow>
                        </template>
                        <TableRow v-else>
                            <TableCell colspan="24" class="h-32 text-center text-muted-foreground">
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
