// resources/js/types/withdrawal.ts
export interface BankInfo {
  bank_name: string
  bank_account: string
  bank_holder: string
  gross_amount?: number
  admin_fee?: number
  net_amount?: number
}

export interface Withdrawal {
  id: number
  customer: {
    username: string
    name: string
    email: string
    ewallet_saldo: number
  }
  balance_before: number
  amount: number
  status: 'pending' | 'completed' | 'failed' | string
  transaction_ref: string
  notes: string | BankInfo | null
  created_at: string
}

export interface PaginatedWithdrawals<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  links: Array<{ url: string | null; label: string; active: boolean }>
}

export interface Statistics {
  total_pending: number
  total_completed: number
  total_failed: number
  total_amount: number
}

export interface WithdrawalFilters {
  search?: string
  status?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}
