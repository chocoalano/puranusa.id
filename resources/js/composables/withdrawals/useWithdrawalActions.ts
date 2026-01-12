// resources/js/composables/withdrawals/useWithdrawalActions.ts
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { approve, reject } from '@/actions/App/Http/Controllers/Admin/WithdrawalManagementController'
import type { Withdrawal } from '@/types/withdrawal'

export function useWithdrawalActions() {
  const approveDialog = ref<{ open: boolean; withdrawal: Withdrawal | null }>({ open: false, withdrawal: null })
  const rejectDialog = ref<{ open: boolean; withdrawal: Withdrawal | null }>({ open: false, withdrawal: null })

  const openApproveDialog = (withdrawal: Withdrawal) => (approveDialog.value = { open: true, withdrawal })
  const openRejectDialog = (withdrawal: Withdrawal) => (rejectDialog.value = { open: true, withdrawal })

  const closeApprove = () => (approveDialog.value = { open: false, withdrawal: null })
  const closeReject = () => (rejectDialog.value = { open: false, withdrawal: null })

  const handleApprove = () => {
    const wd = approveDialog.value.withdrawal
    if (!wd) return

    const form = useForm({})
    form.post(approve.url(wd.id), {
      preserveScroll: true,
      onSuccess: closeApprove,
    })
  }

  const handleReject = () => {
    const wd = rejectDialog.value.withdrawal
    if (!wd) return

    const form = useForm({})
    form.post(reject.url(wd.id), {
      preserveScroll: true,
      onSuccess: closeReject,
    })
  }

  return {
    approveDialog,
    rejectDialog,
    openApproveDialog,
    openRejectDialog,
    handleApprove,
    handleReject,
  }
}
