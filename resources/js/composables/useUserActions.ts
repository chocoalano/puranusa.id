import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
}

export function useUserActions() {
    const processing = ref(false);

    const deleteUser = async (userId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            processing.value = true;
            router.delete(`/manage/users/${userId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    processing.value = false;
                    toast.success('Berhasil', {
                        description: 'Pengguna berhasil dihapus',
                    });
                    resolve();
                },
                onError: () => {
                    processing.value = false;
                    toast.error('Gagal', {
                        description: 'Terjadi kesalahan saat menghapus pengguna',
                    });
                    reject();
                },
            });
        });
    };

    const bulkDelete = async (userIds: number[]): Promise<void> => {
        processing.value = true;

        let successCount = 0;
        let failCount = 0;

        for (const id of userIds) {
            try {
                await new Promise<void>((resolve, reject) => {
                    router.delete(`/manage/users/${id}`, {
                        preserveScroll: true,
                        onSuccess: () => {
                            successCount++;
                            resolve();
                        },
                        onError: () => {
                            failCount++;
                            reject();
                        },
                    });
                });
            } catch {
                // Error sudah dicatat di failCount
            }
        }

        processing.value = false;

        if (successCount > 0) {
            toast.success('Berhasil', {
                description: `${successCount} pengguna berhasil dihapus`,
            });
            router.reload({ only: ['users'] });
        }

        if (failCount > 0) {
            toast.error('Gagal', {
                description: `${failCount} pengguna gagal dihapus`,
            });
        }
    };

    const copyToClipboard = async (users: User[]): Promise<void> => {
        const formatDate = (date: string | null) => {
            if (!date) return '-';
            return new Date(date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        };

        const data = users.map((user) => ({
            Name: user.name,
            Email: user.email,
            Status: user.email_verified_at ? 'Verified' : 'Unverified',
            Created: formatDate(user.created_at),
        }));

        const csv = [
            Object.keys(data[0]).join('\t'),
            ...data.map((row) => Object.values(row).join('\t')),
        ].join('\n');

        try {
            await navigator.clipboard.writeText(csv);
            toast.success('Berhasil', {
                description: `Data ${users.length} pengguna berhasil disalin ke clipboard`,
            });
        } catch {
            toast.error('Gagal', {
                description: 'Gagal menyalin data ke clipboard',
            });
        }
    };

    return {
        processing,
        deleteUser,
        bulkDelete,
        copyToClipboard,
    };
}
