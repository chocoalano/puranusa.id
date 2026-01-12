// resources/js/composables/withdrawals/useWithdrawalFilters.ts
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import type { WithdrawalFilters } from '@/types/withdrawal'
import type { SortingState } from '@tanstack/vue-table'
import { useDebouncedWatch } from './useDebouncedWatch'

export function useWithdrawalFilters(opts: {
  initialFilters: WithdrawalFilters
  sorting: { value: SortingState }
  endpoint?: string
}) {
  const endpoint = opts.endpoint ?? '/admin/withdrawals'

  const search = ref(opts.initialFilters.search || '')
  const statusFilter = ref(opts.initialFilters.status || 'all')

  const buildQuery = () => ({
    search: search.value || undefined,
    status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
    sort_by: opts.sorting.value[0]?.id || 'created_at',
    sort_order: opts.sorting.value[0]?.desc ? 'desc' : 'asc',
  })

  const go = () => {
    router.get(endpoint, buildQuery(), { preserveState: true, preserveScroll: true })
  }

  // debounce untuk search/status
  useDebouncedWatch([search, statusFilter], go, 300)

  return { search, statusFilter, buildQuery, go }
}
