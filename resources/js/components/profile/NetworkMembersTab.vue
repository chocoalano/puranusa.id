<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, Clock, UserPlus, GitBranch } from 'lucide-vue-next';
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

interface NetworkMember {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    package_name?: string;
    total_left?: number;
    total_right?: number;
    position: string | null;
    level: number | null;
    has_placement: boolean;
    has_purchase: boolean;
    omzet: number;
    joined_at: string;
}

defineProps<{
    activeMembers: NetworkMember[];
    passiveMembers: NetworkMember[];
    prospectMembers: NetworkMember[];
}>();

const showPlacementDialog = ref(false);
const selectedMember = ref<NetworkMember | null>(null);
const selectedPosition = ref<'left' | 'right' | null>(null);

const placementForm = useForm({
    member_id: 0,
    position: '' as 'left' | 'right' | '',
});

const openPlacementDialog = (member: NetworkMember) => {
    selectedMember.value = member;
    selectedPosition.value = null;
    placementForm.member_id = member.id;
    placementForm.position = '';
    showPlacementDialog.value = true;
};

const closePlacementDialog = () => {
    showPlacementDialog.value = false;
    selectedMember.value = null;
    selectedPosition.value = null;
    placementForm.reset();
};

const placeToBinaryTree = () => {
    if (!selectedMember.value || !selectedPosition.value) {
        toast.error('Pilih posisi terlebih dahulu');
        return;
    }

    placementForm.position = selectedPosition.value;

    placementForm.post('/client/profile/place-member', {
        onSuccess: () => {
            toast.success(`${selectedMember.value?.name} berhasil ditempatkan di posisi ${selectedPosition.value}`);
            closePlacementDialog();
        },
        onError: (errors) => {
            const errorMessage = errors.error || 'Gagal menempatkan member ke binary tree';
            toast.error(errorMessage);
        },
    });
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const getPositionBadge = (position: string | null): {
    variant: 'default' | 'secondary' | 'outline';
    text: string;
} => {
    if (!position) return { variant: 'outline', text: 'Belum Ditempatkan' };
    return {
        variant: position === 'left' ? 'default' : 'secondary',
        text: position === 'left' ? 'Kiri' : 'Kanan',
    };
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Jaringan Member</CardTitle>
            <CardDescription>Kelola dan lihat member dalam jaringan Anda</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs default-value="active" class="w-full">
                <TabsList class="grid w-full grid-cols-3">
                    <TabsTrigger value="active">
                        <CheckCircle class="w-4 h-4 mr-2" />
                        Aktif ({{ activeMembers.length }})
                    </TabsTrigger>
                    <TabsTrigger value="passive">
                        <Clock class="w-4 h-4 mr-2" />
                        Pasif ({{ passiveMembers.length }})
                    </TabsTrigger>
                    <TabsTrigger value="prospect">
                        <UserPlus class="w-4 h-4 mr-2" />
                        Prospek ({{ prospectMembers.length }})
                    </TabsTrigger>
                </TabsList>

                <!-- Active Members -->
                <TabsContent value="active" class="space-y-4">
                    <div
                        v-if="activeMembers.length === 0"
                        class="text-center py-12 text-muted-foreground"
                    >
                        <CheckCircle class="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Belum ada member aktif</p>
                        <p class="text-sm mt-2">Member aktif adalah member yang sudah ditempatkan di binary tree</p>
                    </div>
                    <Card
                        v-for="member in activeMembers"
                        :key="member.id"
                        class="hover:shadow-md transition-shadow"
                    >
                        <CardContent class="p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                                        <Badge :variant="getPositionBadge(member.position).variant">
                                            {{ getPositionBadge(member.position).text }}
                                        </Badge>
                                        <Badge variant="outline" v-if="member.level">
                                            Level {{ member.level }}
                                        </Badge>
                                    </div>
                                    <div class="space-y-1 text-sm text-muted-foreground">
                                        <p>{{ member.email }}</p>
                                        <p v-if="member.phone">{{ member.phone }}</p>
                                        <p v-if="member.package_name" class="text-xs font-medium text-primary">
                                            Paket: {{ member.package_name }}
                                        </p>
                                        <p v-if="(member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0" class="text-xs">
                                            <span class="text-blue-600 dark:text-blue-400">Kiri: {{ member.total_left ?? 0 }}</span>
                                            <span class="mx-1">|</span>
                                            <span class="text-green-600 dark:text-green-400">Kanan: {{ member.total_right ?? 0 }}</span>
                                        </p>
                                        <p class="text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                        <p class="text-xs font-medium text-green-600 dark:text-green-400">
                                            Omzet: {{ formatCurrency(member.omzet) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-2">
                                    <Badge variant="default">
                                        <CheckCircle class="w-3 h-3 mr-1" />
                                        Aktif
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Passive Members -->
                <TabsContent value="passive" class="space-y-4">
                    <div
                        v-if="passiveMembers.length === 0"
                        class="text-center py-12 text-muted-foreground"
                    >
                        <Clock class="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Belum ada member pasif</p>
                        <p class="text-sm mt-2">Member pasif adalah member yang belum ditempatkan di binary tree tapi sudah memiliki pembelian/order</p>
                    </div>
                    <Card
                        v-for="member in passiveMembers"
                        :key="member.id"
                        class="hover:shadow-md transition-shadow"
                    >
                        <CardContent class="p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                                        <Badge variant="secondary">Belum Ditempatkan</Badge>
                                    </div>
                                    <div class="space-y-1 text-sm text-muted-foreground">
                                        <p>{{ member.email }}</p>
                                        <p v-if="member.phone">{{ member.phone }}</p>
                                        <p v-if="member.package_name" class="text-xs font-medium text-primary">
                                            Paket: {{ member.package_name }}
                                        </p>
                                        <p v-if="(member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0" class="text-xs">
                                            <span class="text-blue-600 dark:text-blue-400">Kiri: {{ member.total_left ?? 0 }}</span>
                                            <span class="mx-1">|</span>
                                            <span class="text-green-600 dark:text-green-400">Kanan: {{ member.total_right ?? 0 }}</span>
                                        </p>
                                        <p class="text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                        <p class="text-xs font-medium text-orange-600 dark:text-orange-400">
                                            Omzet: {{ formatCurrency(member.omzet) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-2">
                                    <Badge variant="outline">
                                        <Clock class="w-3 h-3 mr-1" />
                                        Pasif
                                    </Badge>
                                    <Badge variant="default">
                                        Sudah Belanja
                                    </Badge>
                                    <Button
                                        v-if="activeMembers.length < 2"
                                        size="sm"
                                        variant="default"
                                        class="mt-2"
                                        @click="openPlacementDialog(member)"
                                    >
                                        <GitBranch class="w-3 h-3 mr-1" />
                                        Tempatkan ke Binary
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Prospect Members -->
                <TabsContent value="prospect" class="space-y-4">
                    <div
                        v-if="prospectMembers.length === 0"
                        class="text-center py-12 text-muted-foreground"
                    >
                        <UserPlus class="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Belum ada member prospek</p>
                        <p class="text-sm mt-2">Member prospek adalah member yang baru mendaftar, belum ditempatkan di binary tree dan belum memiliki pembelian/order</p>
                    </div>
                    <Card
                        v-for="member in prospectMembers"
                        :key="member.id"
                        class="hover:shadow-md transition-shadow"
                    >
                        <CardContent class="p-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                                        <Badge variant="outline">Baru Bergabung</Badge>
                                    </div>
                                    <div class="space-y-1 text-sm text-muted-foreground">
                                        <p>{{ member.email }}</p>
                                        <p v-if="member.phone">{{ member.phone }}</p>
                                        <p v-if="member.package_name" class="text-xs font-medium text-primary">
                                            Paket: {{ member.package_name }}
                                        </p>
                                        <p v-if="(member.total_left ?? 0) > 0 || (member.total_right ?? 0) > 0" class="text-xs">
                                            <span class="text-blue-600 dark:text-blue-400">Kiri: {{ member.total_left ?? 0 }}</span>
                                            <span class="mx-1">|</span>
                                            <span class="text-green-600 dark:text-green-400">Kanan: {{ member.total_right ?? 0 }}</span>
                                        </p>
                                        <p class="text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                        <p class="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Omzet: {{ formatCurrency(member.omzet) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-col items-end gap-2">
                                    <Badge variant="secondary">
                                        <UserPlus class="w-3 h-3 mr-1" />
                                        Prospek
                                    </Badge>
                                    <Badge variant="secondary">
                                        Belum Belanja
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>

    <!-- Placement Dialog -->
    <Dialog :open="showPlacementDialog" @update:open="closePlacementDialog">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Tempatkan Member ke Binary Tree</DialogTitle>
                <DialogDescription>
                    Pilih posisi untuk menempatkan
                    <span class="font-semibold">{{ selectedMember?.name }}</span>
                    di jaringan binary tree Anda.
                </DialogDescription>
            </DialogHeader>

            <div class="grid grid-cols-2 gap-4 py-4">
                <button
                    type="button"
                    :class="[
                        'flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all',
                        selectedPosition === 'left'
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-gray-300',
                    ]"
                    @click="selectedPosition = 'left'"
                >
                    <GitBranch class="w-8 h-8 mb-2 rotate-90" />
                    <span class="font-semibold">Posisi Kiri</span>
                    <span class="text-xs text-muted-foreground mt-1">Left Position</span>
                </button>

                <button
                    type="button"
                    :class="[
                        'flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all',
                        selectedPosition === 'right'
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-gray-300',
                    ]"
                    @click="selectedPosition = 'right'"
                >
                    <GitBranch class="w-8 h-8 mb-2 -rotate-90" />
                    <span class="font-semibold">Posisi Kanan</span>
                    <span class="text-xs text-muted-foreground mt-1">Right Position</span>
                </button>
            </div>

            <DialogFooter>
                <Button variant="outline" @click="closePlacementDialog" :disabled="placementForm.processing">
                    Batal
                </Button>
                <Button
                    @click="placeToBinaryTree"
                    :disabled="!selectedPosition || placementForm.processing"
                >
                    {{ placementForm.processing ? 'Memproses...' : 'Tempatkan' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
