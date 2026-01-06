import { formatCurrency as formatCurrencyUtil } from '@/utils/currency';

export function useFormatter() {
    const formatCurrency = (amount: number | string | null | undefined): string => {
        return formatCurrencyUtil(amount);
    };

    const formatDate = (date: string): string => {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    };

    const getStatusLabel = (status: string): string => {
        const labels: Record<string, string> = {
            pending: 'Menunggu',
            processing: 'Diproses',
            shipped: 'Dikirim',
            delivered: 'Selesai',
            cancelled: 'Dibatalkan',
        };
        return labels[status] || status;
    };

    const getTransactionTypeLabel = (type: string): string => {
        const labels: Record<string, string> = {
            topup: 'Top Up',
            top_up: 'Top Up',
            withdrawal: 'Penarikan',
            bonus: 'Bonus',
            purchase: 'Pembelian',
            refund: 'Refund',
            deduct: 'Potongan Admin',
        };
        return labels[type] || type;
    };

    const getTransactionStatusLabel = (status: string): string => {
        const labels: Record<string, string> = {
            pending: 'Menunggu',
            completed: 'Selesai',
            failed: 'Gagal',
            cancelled: 'Dibatalkan',
        };
        return labels[status] || status;
    };

    return {
        formatCurrency,
        formatDate,
        getStatusLabel,
        getTransactionTypeLabel,
        getTransactionStatusLabel,
    };
}
