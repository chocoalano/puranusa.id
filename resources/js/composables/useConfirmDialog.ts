import { ref } from 'vue';

interface ConfirmDialogOptions {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
}

export function useConfirmDialog() {
    const isOpen = ref(false);
    const options = ref<ConfirmDialogOptions>({
        title: '',
        description: '',
        confirmText: 'Konfirmasi',
        cancelText: 'Batal',
        variant: 'default',
    });
    const resolveCallback = ref<((value: boolean) => void) | null>(null);

    const confirm = (dialogOptions: ConfirmDialogOptions): Promise<boolean> => {
        options.value = {
            ...options.value,
            ...dialogOptions,
        };
        isOpen.value = true;

        return new Promise((resolve) => {
            resolveCallback.value = resolve;
        });
    };

    const handleConfirm = () => {
        isOpen.value = false;
        resolveCallback.value?.(true);
        resolveCallback.value = null;
    };

    const handleCancel = () => {
        isOpen.value = false;
        resolveCallback.value?.(false);
        resolveCallback.value = null;
    };

    return {
        isOpen,
        options,
        confirm,
        handleConfirm,
        handleCancel,
    };
}
