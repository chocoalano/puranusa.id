/**
 * Safe format currency utility
 * Handles null, undefined, empty string, and NaN values
 * Returns 'Rp 0' for invalid values by default, or custom fallback
 */
export function formatCurrency(
    amount: number | string | null | undefined,
    fallback: string = 'Rp 0'
): string {
    // Handle null, undefined, empty string
    if (amount === null || amount === undefined || amount === '') {
        return fallback;
    }

    // Convert to number
    const num = typeof amount === 'number' ? amount : parseFloat(String(amount));

    // Check for NaN
    if (isNaN(num)) {
        return fallback;
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(num);
}

/**
 * Safe number conversion utility
 * Returns 0 for null, undefined, empty string, or NaN
 */
export function safeNumber(value: number | string | null | undefined): number {
    if (value === null || value === undefined || value === '') {
        return 0;
    }
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    return isNaN(num) ? 0 : num;
}
