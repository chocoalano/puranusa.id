export interface WalletTransaction {
    id: number;
    type: string;
    amount: number;
    status: string;
    transaction_ref: string;
    midtrans_transaction_id?: string | null;
    created_at: string;
}

export interface Order {
    id: number;
    order_no: string;
    status: string;
    subtotal_amount: number;
    grand_total: number;
    placed_at: string | null;
    paid_at: string | null;
    items?: Array<{
        id: number;
        product_id: number;
        product_name: string;
        product_image?: string;
        has_review?: boolean;
    }>;
    has_unreviewed_items?: boolean;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    ewallet_id: string;
    ewallet_saldo: number;
    description: string | null;
    email_verified_at: string | null;
    created_at: string;
    ref_code: string;
    upline: {
        id: number;
        name: string;
        email: string;
    } | null;
    sponsor: {
        id: number;
        name: string;
        email: string;
    } | null;
    network_stats: {
        left_count: number;
        right_count: number;
        total_downlines: number;
    };
    bonus_stats: {
        total_released: number;
        total_pending: number;
    };
}
