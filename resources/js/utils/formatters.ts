// resources/js/utils/formatters.ts
export const formatCurrencyIDR = (amount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount ?? 0)

const WIB_TIMEZONE = 'Asia/Jakarta'

export const formatDateID = (date: string) => {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return '-'

  return `${new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: WIB_TIMEZONE,
  }).format(parsedDate)} WIB`
}

export const getStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    pending: 'secondary',
    completed: 'default',
    failed: 'destructive',
  }
  return variants[status] || 'secondary'
}
