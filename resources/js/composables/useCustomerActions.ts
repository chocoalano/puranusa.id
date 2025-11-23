import { router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import { destroy, releaseBonuses as releaseBonusesAction, topUp as topUpAction, deduct as deductAction } from '@/actions/App/Http/Controllers/Manage/CustomerController';

export function useCustomerActions() {
    const deleteCustomer = (id: number) => {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Pelanggan berhasil dihapus');
            },
            onError: () => {
                toast.error('Gagal menghapus pelanggan');
            },
        });
    };

    const releaseBonuses = (id: number) => {
        router.post(
            releaseBonusesAction.url(id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Bonus berhasil dirilis');
                },
                onError: () => {
                    toast.error('Gagal release bonus');
                },
            }
        );
    };

    const topUp = (id: number, amount: number, description?: string) => {
        router.post(
            topUpAction.url(id),
            { amount, description },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Saldo berhasil ditambahkan: Rp ${amount.toLocaleString('id-ID')}`);
                },
                onError: () => {
                    toast.error('Gagal top up saldo');
                },
            }
        );
    };

    const deduct = (id: number, amount: number, description?: string) => {
        router.post(
            deductAction.url(id),
            { amount, description },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Saldo berhasil dikurangi: Rp ${amount.toLocaleString('id-ID')}`);
                },
                onError: () => {
                    toast.error('Gagal mengurangi saldo');
                },
            }
        );
    };

    return {
        deleteCustomer,
        releaseBonuses,
        topUp,
        deduct,
    };
}
