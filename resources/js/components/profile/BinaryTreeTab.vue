<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Users, TrendingUp, UserPlus, ZoomIn, ZoomOut, RotateCcw, Loader2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import GoJSBinaryTree from './GoJSBinaryTree.vue';
import axios from 'axios';

interface TreeNode {
    id: number;
    member_id: number;
    name: string;
    email: string;
    package_name?: string;
    total_left?: number;
    total_right?: number;
    position: string | null;
    level: number;
    status: boolean;
    left?: TreeNode | null;
    right?: TreeNode | null;
}

interface PassiveMember {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    has_purchase: boolean;
    joined_at: string;
}

interface Props {
    binaryTree: TreeNode | null;
    totalDownlines: number;
    totalLeft: number;
    totalRight: number;
    passiveMembers: PassiveMember[];
}

defineProps<Props>();

const goJSTreeRef = ref<InstanceType<typeof GoJSBinaryTree> | null>(null);
const dialogGoJSTreeRef = ref<InstanceType<typeof GoJSBinaryTree> | null>(null);

const showPlacementDialog = ref(false);
const selectedUplineId = ref<number | null>(null);
const selectedPosition = ref<'left' | 'right' | null>(null);
const selectedMember = ref<PassiveMember | null>(null);

// Member tree dialog state
const showMemberTreeDialog = ref(false);
const memberTreeLoading = ref(false);
const selectedMemberForTree = ref<{ id: number; name: string; email: string } | null>(null);
const memberTree = ref<TreeNode | null>(null);
const memberTreeStats = ref({
    totalDownlines: 0,
    totalLeft: 0,
    totalRight: 0,
});

const placementForm = useForm({
    member_id: 0,
    position: '' as 'left' | 'right' | '',
});

const openPlacementDialog = (uplineId: number, position: 'left' | 'right') => {
    selectedUplineId.value = uplineId;
    selectedPosition.value = position;
    selectedMember.value = null;
    showPlacementDialog.value = true;
};

const closePlacementDialog = () => {
    showPlacementDialog.value = false;
    selectedUplineId.value = null;
    selectedPosition.value = null;
    selectedMember.value = null;
};

const selectMember = (member: PassiveMember) => {
    selectedMember.value = member;
};

const placeMemberToBinaryTree = () => {
    if (!selectedMember.value || !selectedPosition.value) {
        toast.error('Pilih member terlebih dahulu');
        return;
    }

    placementForm.member_id = selectedMember.value.id;
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

// Member tree dialog functions
const openMemberTreeDialog = async (memberId: number) => {
    memberTreeLoading.value = true;
    showMemberTreeDialog.value = true;
    memberTree.value = null;

    try {
        const response = await axios.get(`/client/profile/member-tree/${memberId}`);
        if (response.data.success) {
            selectedMemberForTree.value = response.data.data.member;
            memberTree.value = response.data.data.tree;
            memberTreeStats.value = {
                totalDownlines: response.data.data.totalDownlines,
                totalLeft: response.data.data.totalLeft,
                totalRight: response.data.data.totalRight,
            };
        } else {
            toast.error('Gagal memuat data jaringan member');
            showMemberTreeDialog.value = false;
        }
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Gagal memuat data jaringan member');
        showMemberTreeDialog.value = false;
    } finally {
        memberTreeLoading.value = false;
    }
};

const closeMemberTreeDialog = () => {
    showMemberTreeDialog.value = false;
    selectedMemberForTree.value = null;
    memberTree.value = null;
    memberTreeStats.value = {
        totalDownlines: 0,
        totalLeft: 0,
        totalRight: 0,
    };
};

const handleDialogZoomIn = () => {
    dialogGoJSTreeRef.value?.zoomIn();
};

const handleDialogZoomOut = () => {
    dialogGoJSTreeRef.value?.zoomOut();
};

const handleDialogResetZoom = () => {
    dialogGoJSTreeRef.value?.resetZoom();
};

const handleZoomIn = () => {
    goJSTreeRef.value?.zoomIn();
};

const handleZoomOut = () => {
    goJSTreeRef.value?.zoomOut();
};

const handleResetZoom = () => {
    goJSTreeRef.value?.resetZoom();
};
</script>

<template>
    <div class="space-y-4 sm:space-y-6">
        <!-- Stats Overview -->
        <div class="grid grid-cols-3 gap-2 sm:gap-4">
            <Card class="p-0">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle class="text-[10px] sm:text-sm font-medium truncate">Total Jaringan</CardTitle>
                    <Users class="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent class="p-2 sm:p-4 pt-0 sm:pt-0">
                    <div class="text-lg sm:text-2xl font-bold">{{ totalDownlines }}</div>
                    <p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block">Member aktif di jaringan Anda</p>
                </CardContent>
            </Card>

            <Card class="p-0">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle class="text-[10px] sm:text-sm font-medium truncate">Kaki Kiri</CardTitle>
                    <TrendingUp class="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                </CardHeader>
                <CardContent class="p-2 sm:p-4 pt-0 sm:pt-0">
                    <div class="text-lg sm:text-2xl font-bold text-blue-600">{{ totalLeft }}</div>
                    <p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block">Member di posisi kiri</p>
                </CardContent>
            </Card>

            <Card class="p-0">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle class="text-[10px] sm:text-sm font-medium truncate">Kaki Kanan</CardTitle>
                    <TrendingUp class="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                </CardHeader>
                <CardContent class="p-2 sm:p-4 pt-0 sm:pt-0">
                    <div class="text-lg sm:text-2xl font-bold text-green-600">{{ totalRight }}</div>
                    <p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block">Member di posisi kanan</p>
                </CardContent>
            </Card>
        </div>

        <!-- Binary Tree Visualization with GoJS -->
        <Card>
            <CardHeader class="p-3 sm:p-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <CardTitle class="text-sm sm:text-base">Struktur Binary Tree</CardTitle>
                        <CardDescription class="text-xs sm:text-sm">
                            Visualisasi jaringan MLM binary tree Anda
                        </CardDescription>
                    </div>
                    <!-- Zoom Controls -->
                    <div class="flex items-center gap-1 sm:gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-7 w-7 sm:h-8 sm:w-8"
                            @click="handleZoomOut"
                        >
                            <ZoomOut class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-7 w-7 sm:h-8 sm:w-8"
                            @click="handleZoomIn"
                        >
                            <ZoomIn class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="h-7 w-7 sm:h-8 sm:w-8"
                            @click="handleResetZoom"
                            title="Fit to Screen"
                        >
                            <RotateCcw class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="p-2 sm:p-6 pt-0">
                <GoJSBinaryTree
                    v-if="binaryTree"
                    ref="goJSTreeRef"
                    :binary-tree="binaryTree"
                    @open-placement="openPlacementDialog"
                    @member-click="openMemberTreeDialog"
                />
                <div v-else class="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div class="text-center">
                        <Users class="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Belum ada jaringan binary tree</p>
                    </div>
                </div>

                <!-- Info -->
                <div class="mt-4 sm:mt-6 p-2 sm:p-4 rounded-lg bg-muted/50">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
                        <p class="text-[10px] sm:text-sm text-muted-foreground">
                            💡 <span class="hidden sm:inline">Klik member untuk melihat jaringannya • Klik "+" untuk menambah member</span>
                            <span class="sm:hidden">Klik member untuk lihat jaringan</span>
                        </p>
                        <p class="text-[10px] sm:text-sm text-muted-foreground">
                            <span class="hidden sm:inline">Scroll/drag untuk navigasi • Mouse wheel untuk zoom</span>
                            <span class="sm:hidden">Drag & Pinch untuk navigasi</span>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

    <!-- Placement Dialog -->
    <Dialog :open="showPlacementDialog" @update:open="closePlacementDialog">
        <DialogContent class="w-[95vw] max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-4 sm:p-6">
            <DialogHeader class="space-y-1 sm:space-y-2">
                <DialogTitle class="text-base sm:text-lg">Pilih Member untuk Ditempatkan</DialogTitle>
                <DialogDescription class="text-xs sm:text-sm">
                    Pilih member pasif untuk ditempatkan di posisi
                    <span class="font-semibold">{{ selectedPosition === 'left' ? 'Kiri' : 'Kanan' }}</span>
                </DialogDescription>
            </DialogHeader>

            <div class="flex-1 overflow-y-auto py-2 sm:py-4">
                <div v-if="passiveMembers.length === 0" class="text-center py-8 sm:py-12 text-muted-foreground">
                    <UserPlus class="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-20" />
                    <p class="text-sm sm:text-base">Tidak ada member pasif</p>
                    <p class="text-xs sm:text-sm mt-1 sm:mt-2">Semua member sudah ditempatkan</p>
                </div>

                <div v-else class="space-y-2">
                    <button
                        v-for="member in passiveMembers"
                        :key="member.id"
                        type="button"
                        :class="[
                            'w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all',
                            selectedMember?.id === member.id
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600',
                        ]"
                        @click="selectMember(member)"
                    >
                        <div class="flex items-start justify-between gap-2">
                            <div class="flex-1 min-w-0">
                                <div class="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                    <h4 class="font-semibold text-sm sm:text-base truncate">{{ member.name }}</h4>
                                    <Badge variant="default" v-if="member.has_purchase" class="text-[10px] sm:text-xs">
                                        <span class="hidden sm:inline">Ada Pembelian</span>
                                        <span class="sm:hidden">Beli</span>
                                    </Badge>
                                    <Badge variant="secondary" v-else class="text-[10px] sm:text-xs">
                                        <span class="hidden sm:inline">Belum Belanja</span>
                                        <span class="sm:hidden">Belum</span>
                                    </Badge>
                                </div>
                                <div class="space-y-0.5 text-xs sm:text-sm text-muted-foreground">
                                    <p class="truncate">{{ member.email }}</p>
                                    <p v-if="member.phone" class="truncate">{{ member.phone }}</p>
                                    <p class="text-[10px] sm:text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                </div>
                            </div>
                            <div v-if="selectedMember?.id === member.id" class="flex-shrink-0">
                                <div class="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <DialogFooter class="flex-col-reverse sm:flex-row gap-2 sm:gap-0">
                <Button variant="outline" @click="closePlacementDialog" :disabled="placementForm.processing" class="w-full sm:w-auto">
                    Batal
                </Button>
                <Button
                    @click="placeMemberToBinaryTree"
                    :disabled="!selectedMember || placementForm.processing"
                    class="w-full sm:w-auto"
                >
                    {{ placementForm.processing ? 'Memproses...' : 'Tempatkan' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- Member Tree Dialog -->
    <Dialog :open="showMemberTreeDialog" @update:open="closeMemberTreeDialog">
        <DialogContent class="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-4 sm:p-6">
            <DialogHeader class="space-y-1 sm:space-y-2">
                <DialogTitle class="text-base sm:text-lg flex items-center gap-2">
                    <Users class="h-5 w-5 text-primary" />
                    Jaringan {{ selectedMemberForTree?.name || 'Member' }}
                </DialogTitle>
                <DialogDescription class="text-xs sm:text-sm">
                    <span v-if="selectedMemberForTree">
                        {{ selectedMemberForTree.email }}
                    </span>
                </DialogDescription>
            </DialogHeader>

            <!-- Loading State -->
            <div v-if="memberTreeLoading" class="flex-1 flex items-center justify-center py-12">
                <div class="text-center">
                    <Loader2 class="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
                    <p class="text-sm text-muted-foreground">Memuat data jaringan...</p>
                </div>
            </div>

            <!-- Tree Stats & Visualization -->
            <div v-else-if="memberTree" class="flex-1 overflow-hidden flex flex-col">
                <!-- Stats -->
                <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="p-2 sm:p-3 rounded-lg bg-muted/50 text-center">
                        <div class="text-sm sm:text-lg font-bold">{{ memberTreeStats.totalDownlines }}</div>
                        <div class="text-[10px] sm:text-xs text-muted-foreground">Total</div>
                    </div>
                    <div class="p-2 sm:p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-center">
                        <div class="text-sm sm:text-lg font-bold text-blue-600">{{ memberTreeStats.totalLeft }}</div>
                        <div class="text-[10px] sm:text-xs text-muted-foreground">Kiri</div>
                    </div>
                    <div class="p-2 sm:p-3 rounded-lg bg-green-50 dark:bg-green-950/30 text-center">
                        <div class="text-sm sm:text-lg font-bold text-green-600">{{ memberTreeStats.totalRight }}</div>
                        <div class="text-[10px] sm:text-xs text-muted-foreground">Kanan</div>
                    </div>
                </div>

                <!-- Zoom Controls -->
                <div class="flex items-center justify-end gap-1 sm:gap-2 mb-2">
                    <Button
                        variant="outline"
                        size="icon"
                        class="h-7 w-7 sm:h-8 sm:w-8"
                        @click="handleDialogZoomOut"
                    >
                        <ZoomOut class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        class="h-7 w-7 sm:h-8 sm:w-8"
                        @click="handleDialogZoomIn"
                    >
                        <ZoomIn class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="h-7 w-7 sm:h-8 sm:w-8"
                        @click="handleDialogResetZoom"
                        title="Fit to Screen"
                    >
                        <RotateCcw class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                </div>

                <!-- Tree Visualization -->
                <div class="flex-1 min-h-0 border rounded-lg overflow-hidden">
                    <GoJSBinaryTree
                        ref="dialogGoJSTreeRef"
                        :binary-tree="memberTree"
                        :is-dialog="true"
                    />
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="flex-1 flex items-center justify-center py-12">
                <div class="text-center text-muted-foreground">
                    <Users class="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Tidak ada data jaringan</p>
                </div>
            </div>

            <DialogFooter class="mt-4">
                <Button variant="outline" @click="closeMemberTreeDialog" class="w-full sm:w-auto">
                    Tutup
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
