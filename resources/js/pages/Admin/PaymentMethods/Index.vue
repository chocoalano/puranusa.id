<script setup lang="ts">
import { computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import StatisticsCards from '@/components/admin/StatisticsCards.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CreditCard } from 'lucide-vue-next'
import { router } from '@inertiajs/vue3'
import { usePermissions } from '@/composables/usePermissions'

interface PaymentMethod {
  id: number
  code: string
  name: string
  is_active: boolean
}

interface Props {
  paymentMethods: PaymentMethod[]
  statistics: {
    total_methods: number
    total_active: number
    total_inactive: number
  }
}
const { isSuperAdmin, isAdmin } = usePermissions()
const props = defineProps<Props>()

const statistics = computed(() => [
  { label: 'Total Metode', value: props.statistics.total_methods },
  { label: 'Aktif', value: props.statistics.total_active },
  { label: 'Tidak Aktif', value: props.statistics.total_inactive },
])

const toggleActive = (method: PaymentMethod) => {
  router.put(
    `/admin/settings/payment-methods/${method.id}`,
    {
      name: method.name,
      is_active: !method.is_active,
    },
    { preserveScroll: true },
  )
}
</script>

<template>
  <AppLayout title="Metode Pembayaran">
    <div class="space-y-6">
      <StatisticsCards :stats="statistics" :columns="3" />

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <CreditCard class="h-5 w-5" />
            Metode Pembayaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-12">No</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead class="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(method, index) in paymentMethods" :key="method.id">
                  <TableCell class="font-medium">{{ index + 1 }}</TableCell>
                  <TableCell>
                    <code class="rounded bg-muted px-2 py-1 text-sm">{{ method.code }}</code>
                  </TableCell>
                  <TableCell class="font-medium">{{ method.name }}</TableCell>
                  <TableCell>
                    <Badge :variant="method.is_active ? 'default' : 'secondary'">
                      {{ method.is_active ? 'Aktif' : 'Tidak Aktif' }}
                    </Badge>
                  </TableCell>
                  <TableCell class="text-right">
                    <Button
                      :variant="method.is_active ? 'outline' : 'default'"
                      size="sm"
                      @click="toggleActive(method)"
                      v-if="isSuperAdmin || isAdmin"
                    >
                      {{ method.is_active ? 'Nonaktifkan' : 'Aktifkan' }}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  </AppLayout>
</template>
