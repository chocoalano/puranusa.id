// resources/js/composables/withdrawals/useWithdrawalActions.ts
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { approve, reject } from '@/actions/App/Http/Controllers/Admin/WithdrawalManagementController'
import type { Withdrawal } from '@/types/withdrawal'
import { toast } from 'vue-sonner'

export function useWithdrawalActions() {
    const approveDialog = ref<{ open: boolean; withdrawal: Withdrawal | null }>({ open: false, withdrawal: null })
    const rejectDialog = ref<{ open: boolean; withdrawal: Withdrawal | null }>({ open: false, withdrawal: null })

    const openApproveDialog = (withdrawal: Withdrawal) => (approveDialog.value = { open: true, withdrawal })
    const openRejectDialog = (withdrawal: Withdrawal) => (rejectDialog.value = { open: true, withdrawal })

    const closeApprove = () => (approveDialog.value = { open: false, withdrawal: null })
    const closeReject = () => (rejectDialog.value = { open: false, withdrawal: null })

    function extractErrorMessage(err: any): string {
        if (!err) return 'Terjadi kesalahan'

        // kalau sudah string
        if (typeof err === 'string') return err

        // bentuk umum Inertia errors: { field: "message" }
        const firstVal = Object.values(err)[0]

        if (typeof firstVal === 'string') return firstVal
        if (Array.isArray(firstVal) && typeof firstVal[0] === 'string') return firstVal[0]

        // kasus aneh seperti { "Saldo pelanggan tidak mencukupi": {...} }
        const firstKey = Object.keys(err)[0]
        if (firstKey) return firstKey

        return 'Terjadi kesalahan'
    }


    const handleApprove = () => {
        const wd = approveDialog.value.withdrawal
        if (!wd) return

        const form = useForm({})
        form.post(approve.url(wd.id), {
            preserveScroll: true,

            // kalau server pakai flash (back()->with('error'/'success'))
            onSuccess: (page) => {
                const flash = (page.props as any).flash
                if (flash?.error) {
                    toast.error(flash.error)
                    return
                }

                if (flash?.success) toast.success(flash.success)
                closeApprove()
            },

            // kalau server pakai withErrors()
            onError: (errors) => {
                const msg =
                    (errors as any).approve ||
                    (errors as any).general ||
                    (errors as any).error ||
                    extractErrorMessage(errors)

                toast.error(msg)
                console.error('Error approving withdrawal:', errors)
            },
        })
    }

    const handleReject = () => {
        const wd = rejectDialog.value.withdrawal
        if (!wd) return

        const form = useForm({})
        form.post(reject.url(wd.id), {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = (page.props as any).flash
                if (flash?.error) {
                    toast.error(flash.error)
                    return
                }

                if (flash?.success) toast.success(flash.success)
                closeReject()
            },

            // kalau server pakai withErrors()
            onError: (errors) => {
                const msg =
                    (errors as any).approve ||
                    (errors as any).general ||
                    (errors as any).error ||
                    extractErrorMessage(errors)

                toast.error(msg)
                console.error('Error approving withdrawal:', errors)
            },
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
