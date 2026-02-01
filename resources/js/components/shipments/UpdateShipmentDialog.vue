<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Shipment {
    id: number;
    tracking_no: string | null;
    status: string;
}

interface Props {
    open: boolean;
    shipment: Shipment | null;
    processing?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
    'update:open': [value: boolean];
    submit: [];
}>();

const trackingNumber = defineModel<string>('trackingNumber', { required: true });
const status = defineModel<string>('status', { required: true });
</script>

<template>
    <Dialog :open="open" @update:open="emit('update:open', $event)">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Pengiriman</DialogTitle>
                <DialogDescription>
                    Update nomor resi dan status pengiriman
                </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="emit('submit')" class="space-y-4 py-4">
                <div class="space-y-2">
                    <Label for="tracking_number">Nomor Resi</Label>
                    <Input
                        id="tracking_number"
                        v-model="trackingNumber"
                        placeholder="Masukkan nomor resi"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="status">Status</Label>
                    <Select v-model="status">
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="in_transit">In Transit</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" @click="emit('update:open', false)">
                        Batal
                    </Button>
                    <Button type="submit" :disabled="processing">
                        {{ processing ? 'Menyimpan...' : 'Update' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
