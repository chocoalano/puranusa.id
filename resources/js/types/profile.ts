export interface WalletTransaction {
    id: number;
    type: string;
    amount: number;
    status: string;
    transaction_ref: string;
    midtrans_transaction_id?: string | null;
    notes?: string | null;
    payment_method?: string | null;
    balance_before?: number | null;
    balance_after?: number | null;
    created_at: string;
}

export interface Order {
    id: number;
    order_no: string;
    status: string;
    type?: 'planA' | 'planB' | null;
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
    username: string | null;
    level: string | null;
    nik: string | null;
    gender: 'laki-laki' | 'perempuan' | null;
    alamat: string | null;
    email: string;
    phone: string;
    status: number;
    ewallet_id: string;
    ewallet_saldo: number;
    bank_name: string | null;
    bank_account: string | null;
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
        omzet_group_left_plana: number;
        omzet_group_right_plana: number;
        omzet_group_left_planb: number;
        omzet_group_right_planb: number;
        omzet_group: number;
    };
    bonus_stats: {
        total_released: number;
        total_pending: number;
    };
}
