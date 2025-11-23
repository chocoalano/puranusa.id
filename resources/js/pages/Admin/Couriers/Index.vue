<script setup lang="ts">
import { computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import StatisticsCards from '@/components/admin/StatisticsCards.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Truck } from 'lucide-vue-next'

interface Courier {
  code: string
  name: string
  is_active: boolean
}

interface Props {
  couriers: Courier[]
  statistics: {
    total_couriers: number
    total_active: number
    total_inactive: number
  }
}

const props = defineProps<Props>()

const statistics = computed(() => [
  { label: 'Total Kurir', value: props.statistics.total_couriers },
  { label: 'Aktif', value: props.statistics.total_active },
  { label: 'Tidak Aktif', value: props.statistics.total_inactive },
])
</script>

<template>
  <AppLayout title="Kurir Pengiriman">
    <div class="space-y-6">
      <StatisticsCards :stats="statistics" :columns="3" />

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Truck class="h-5 w-5" />
            Kurir Pengiriman
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-12">No</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Kurir</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(courier, index) in couriers" :key="courier.code">
                  <TableCell class="font-medium">{{ index + 1 }}</TableCell>
                  <TableCell>
                    <code class="rounded bg-muted px-2 py-1 text-sm uppercase">{{ courier.code }}</code>
                  </TableCell>
                  <TableCell class="font-medium">{{ courier.name }}</TableCell>
                  <TableCell>
                    <Badge :variant="courier.is_active ? 'default' : 'secondary'">
                      {{ courier.is_active ? 'Aktif' : 'Tidak Aktif' }}
                    </Badge>
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
