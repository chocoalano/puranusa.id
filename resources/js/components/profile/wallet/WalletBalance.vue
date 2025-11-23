<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next';
import { useFormatter } from '@/composables/useFormatter';

defineProps<{
    balance: number;
}>();

const emit = defineEmits<{
    (e: 'topup'): void;
    (e: 'withdrawal'): void;
}>();

const { formatCurrency } = useFormatter();
</script>

<template>
    <Card>
        <CardContent class="pt-6">
            <div class="text-center">
                <p class="text-sm text-muted-foreground mb-2">Saldo E-Wallet</p>
                <p class="text-4xl font-bold text-primary mb-4">
                    {{ formatCurrency(balance) }}
                </p>
                <div class="flex gap-3 justify-center">
                    <Button @click="emit('topup')" size="sm">
                        <ArrowDownLeft class="w-4 h-4 mr-2" />
                        Top Up
                    </Button>
                    <Button @click="emit('withdrawal')" variant="outline" size="sm">
                        <ArrowUpRight class="w-4 h-4 mr-2" />
                        Tarik Dana
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
