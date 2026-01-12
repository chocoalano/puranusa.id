<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { Head, router } from '@inertiajs/vue3'
import WithdrawalStatistics from '@/components/withdrawals/WithdrawalStatistics.vue'
import Pagination from '@/components/Pagination.vue'

import WithdrawalFiltersBar from '@/components/withdrawals/WithdrawalFiltersBar.vue'
import WithdrawalTable from '@/components/withdrawals/WithdrawalTable.vue'
import WithdrawalActionDialogs from '@/components/withdrawals/WithdrawalActionDialogs.vue'

import type { PaginatedWithdrawals, Statistics, Withdrawal, WithdrawalFilters } from '@/types/withdrawal'
import type { SortingState } from '@tanstack/vue-table'

import { useWithdrawalActions } from '@/composables/withdrawals/useWithdrawalActions'
import { useWithdrawalTable } from '@/composables/withdrawals/useWithdrawalTable'
import { useWithdrawalFilters } from '@/composables/withdrawals/useWithdrawalFilters'
import { watch } from 'vue'

interface Props {
  withdrawals: PaginatedWithdrawals<Withdrawal>
  statistics: Statistics
  filters: WithdrawalFilters
}

const props = defineProps<Props>()

// dialog + actions
const {
  approveDialog,
  rejectDialog,
  openApproveDialog,
  openRejectDialog,
  handleApprove,
  handleReject,
} = useWithdrawalActions()

// table (columns + instance)
const { table, columns, sorting, FlexRender } = useWithdrawalTable({
  withdrawals: props.withdrawals,
  onApprove: openApproveDialog,
  onReject: openRejectDialog,
})

// initial sorting dari props.filters
const initialSorting: SortingState = [
  {
    id: props.filters.sort_by || 'created_at',
    desc: props.filters.sort_order === 'desc',
  },
]
sorting.value = initialSorting

// filters + sync inertia
const { search, statusFilter, buildQuery } = useWithdrawalFilters({
  initialFilters: props.filters,
  sorting,
  endpoint: '/admin/withdrawals',
})

// ketika sorting berubah -> reload inertia (tanpa debounce)
watch(
  sorting,
  (newSorting) => {
    if (!newSorting.length) return
    router.get('/admin/withdrawals', buildQuery(), { preserveState: true, preserveScroll: true })
  },
  { deep: true }
)
</script>

<template>
  <Head title="Permintaan Withdrawal" />

  <AppLayout>
    <div class="rounded-xl p-4 space-y-6 py-6">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Permintaan Withdrawal</h2>
        <p class="text-muted-foreground">Kelola permintaan penarikan saldo dari pelanggan</p>
      </div>

      <WithdrawalStatistics :statistics="statistics" />

      <WithdrawalFiltersBar
        :table="table"
        v-model:search="search"
        v-model:statusFilter="statusFilter"
      />

      <WithdrawalTable :table="table" :columns="columns" :FlexRender="FlexRender" />

      <Pagination
        v-if="withdrawals.last_page > 1"
        :data="{
          current_page: withdrawals.current_page,
          last_page: withdrawals.last_page,
          per_page: withdrawals.per_page,
          from: (withdrawals.current_page - 1) * withdrawals.per_page + 1,
          to: Math.min(withdrawals.current_page * withdrawals.per_page, withdrawals.total),
          total: withdrawals.total,
        }"
        url="/admin/withdrawals"
        :filters="buildQuery()"
      />
    </div>

    <WithdrawalActionDialogs
      v-model:approveDialog="approveDialog"
      v-model:rejectDialog="rejectDialog"
      @approve="handleApprove"
      @reject="handleReject"
    />
  </AppLayout>
</template>
