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
import { Users, TrendingUp, UserPlus, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-vue-next';
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import TreeNodeComponent from './TreeNodeComponent.vue';

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
    binaryTree: TreeNode;
    totalDownlines: number;
    totalLeft: number;
    totalRight: number;
    passiveMembers: PassiveMember[];
}

const props = defineProps<Props>();

// Responsive max levels
const isMobile = ref(false);
const maxVisibleLevels = computed(() => isMobile.value ? 3 : 15);

// Zoom/Scale functionality
const treeScale = ref(1);
const minScale = 0.3;
const maxScale = 2;
const scaleStep = 0.1;

const zoomIn = () => {
    if (treeScale.value < maxScale) {
        treeScale.value = Math.min(maxScale, treeScale.value + scaleStep);
    }
};

const zoomOut = () => {
    if (treeScale.value > minScale) {
        treeScale.value = Math.max(minScale, treeScale.value - scaleStep);
    }
};

const resetZoom = () => {
    treeScale.value = 1;
};

const zoomPercentage = computed(() => Math.round(treeScale.value * 100));

// Pan/Drag functionality
const treeContainer = ref<HTMLElement | null>(null);
const treeWrapper = ref<HTMLElement | null>(null);
const isPanning = ref(false);
const panPosition = ref({ x: 0, y: 0 });
const startPan = ref({ x: 0, y: 0 });
const startScroll = ref({ x: 0, y: 0 });

const startPanning = (e: MouseEvent | TouchEvent) => {
    if (!treeContainer.value) return;

    isPanning.value = true;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    startPan.value = { x: clientX, y: clientY };
    startScroll.value = {
        x: treeContainer.value.scrollLeft,
        y: treeContainer.value.scrollTop
    };

    // Prevent text selection while dragging
    e.preventDefault();
};

const onPanning = (e: MouseEvent | TouchEvent) => {
    if (!isPanning.value || !treeContainer.value) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = startPan.value.x - clientX;
    const deltaY = startPan.value.y - clientY;

    treeContainer.value.scrollLeft = startScroll.value.x + deltaX;
    treeContainer.value.scrollTop = startScroll.value.y + deltaY;
};

const stopPanning = () => {
    isPanning.value = false;
};

// Reset pan position when zoom changes
watch(treeScale, () => {
    // Keep current scroll position relative to new scale
});

const resetView = () => {
    treeScale.value = 1;
    panPosition.value = { x: 0, y: 0 };
    if (treeContainer.value) {
        treeContainer.value.scrollLeft = 0;
        treeContainer.value.scrollTop = 0;
    }
};

// Check screen size for responsive levels
const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 640; // sm breakpoint
};

onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
});

const showPlacementDialog = ref(false);
const selectedUplineId = ref<number | null>(null);
const selectedPosition = ref<'left' | 'right' | null>(null);
const selectedMember = ref<PassiveMember | null>(null);

const placementForm = useForm({
    member_id: 0,
    position: '' as 'left' | 'right' | '',
});

// Build complete tree structure with empty nodes up to max level
const buildCompleteTree = (node: TreeNode | null, parentId: number | null, position: 'left' | 'right' | null, currentLevel: number): TreeNode | null => {
    // Stop if we've reached max visible levels
    if (currentLevel > maxVisibleLevels.value) {
        return null;
    }

    if (node) {
        const shouldShowChildren = currentLevel < maxVisibleLevels.value;
        return {
            ...node,
            left: shouldShowChildren ? buildCompleteTree(node.left || null, node.member_id, 'left', currentLevel + 1) : undefined,
            right: shouldShowChildren ? buildCompleteTree(node.right || null, node.member_id, 'right', currentLevel + 1) : undefined,
        };
    }

    // Don't create empty placeholders - just return null
    // This way we only show actual nodes and their immediate empty positions
    return null;
};

const completeTree = computed(() => {
    const tree = buildCompleteTree(props.binaryTree, null, null, props.binaryTree.level);
    return tree || props.binaryTree;
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
</script><template>
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

        <!-- Binary Tree Visualization -->
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
                            @click="zoomOut"
                            :disabled="treeScale <= minScale"
                        >
                            <ZoomOut class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            class="h-7 px-2 sm:h-8 sm:px-3 text-xs sm:text-sm min-w-[50px] sm:min-w-[60px]"
                            @click="resetZoom"
                        >
                            {{ zoomPercentage }}%
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-7 w-7 sm:h-8 sm:w-8"
                            @click="zoomIn"
                            :disabled="treeScale >= maxScale"
                        >
                            <ZoomIn class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="h-7 w-7 sm:h-8 sm:w-8"
                            @click="resetView"
                            title="Reset View"
                        >
                            <RotateCcw class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="p-2 sm:p-6 pt-0">
                <div
                    ref="treeContainer"
                    class="overflow-auto pb-4 -mx-2 px-2 max-h-[60vh] sm:max-h-[70vh] select-none"
                    :class="{
                        'cursor-grab': !isPanning && treeScale !== 1,
                        'cursor-grabbing': isPanning,
                    }"
                    @mousedown="startPanning"
                    @mousemove="onPanning"
                    @mouseup="stopPanning"
                    @mouseleave="stopPanning"
                    @touchstart="startPanning"
                    @touchmove="onPanning"
                    @touchend="stopPanning"
                >
                    <div
                        ref="treeWrapper"
                        class="min-w-[280px] sm:min-w-max transition-transform duration-200 origin-top-left inline-block"
                        :style="{
                            transform: `scale(${treeScale})`,
                            transformOrigin: 'top left',
                        }"
                    >
                        <TreeNodeComponent
                            :node="completeTree"
                            :is-root="true"
                            :max-level="maxVisibleLevels"
                            @open-placement="openPlacementDialog"
                        />
                    </div>
                </div>

                <!-- Info -->
                <div class="mt-4 sm:mt-6 p-2 sm:p-4 rounded-lg bg-muted/50">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
                        <p class="text-[10px] sm:text-sm text-muted-foreground">
                            💡 <span class="hidden sm:inline">Tree menampilkan maksimal {{ maxVisibleLevels }} level untuk performa optimal</span>
                            <span class="sm:hidden">Max {{ maxVisibleLevels }} level</span>
                        </p>
                        <p class="text-[10px] sm:text-sm text-muted-foreground">
                            <Move class="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span class="hidden sm:inline">Drag untuk menggeser, gunakan tombol zoom untuk resize</span>
                            <span class="sm:hidden">Geser & Zoom: {{ zoomPercentage }}%</span>
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
</template>
