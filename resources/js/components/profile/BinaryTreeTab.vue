<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Users, TrendingUp, UserPlus, ZoomIn, ZoomOut, RotateCcw, Loader2, ArrowLeft, Search } from 'lucide-vue-next';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import GoJSBinaryTree from './GoJSBinaryTree.vue';
import axios from 'axios';
import { placeMember, getMemberTree, searchMemberInTree } from '@/actions/App/Http/Controllers/Ecommerce/Auth/ProfileController';

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

const props = defineProps<Props>();

const goJSTreeRef = ref<InstanceType<typeof GoJSBinaryTree> | null>(null);

const showPlacementDialog = ref(false);
const selectedUplineId = ref<number | null>(null);
const selectedPosition = ref<'left' | 'right' | null>(null);
const selectedMember = ref<PassiveMember | null>(null);
const memberSearchQuery = ref('');

// Tree search state
const treeSearchQuery = ref('');
const treeSearchResults = ref<{ id: number; name: string; email: string; username: string; package_name: string }[]>([]);
const treeSearchLoading = ref(false);
const showTreeSearchResults = ref(false);

// Member tree state
const isViewingMemberTree = ref(false);
const memberTreeLoading = ref(false);
const selectedMemberForTree = ref<{ id: number; name: string; email: string } | null>(null);
const memberTree = ref<TreeNode | null>(null);
const memberTreeStats = ref({
    totalDownlines: 0,
    totalLeft: 0,
    totalRight: 0,
});

// Computed properties for current view
const currentTree = computed(() => isViewingMemberTree.value ? memberTree.value : props.binaryTree);
const currentStats = computed(() => isViewingMemberTree.value ? memberTreeStats.value : {
    totalDownlines: props.totalDownlines,
    totalLeft: props.totalLeft,
    totalRight: props.totalRight,
});
// Counter-based key to force GoJSBinaryTree remount - always increments
const treeKeyCounter = ref(0);
const treeKey = computed(() => `tree-${treeKeyCounter.value}`);

// Filtered passive members based on search query
const filteredPassiveMembers = computed(() => {
    if (!memberSearchQuery.value.trim()) {
        return props.passiveMembers;
    }

    const query = memberSearchQuery.value.toLowerCase().trim();
    return props.passiveMembers.filter((member) => {
        const nameMatch = member.name?.toLowerCase().includes(query);
        const emailMatch = member.email?.toLowerCase().includes(query);
        const phoneMatch = member.phone?.toLowerCase().includes(query);
        return nameMatch || emailMatch || phoneMatch;
    });
});

const placementForm = useForm({
    member_id: 0,
    upline_id: null as number | null,
    position: '' as 'left' | 'right' | '',
});

const openPlacementDialog = (uplineId: number, position: 'left' | 'right') => {
    selectedUplineId.value = uplineId;
    selectedPosition.value = position;
    selectedMember.value = null;
    memberSearchQuery.value = '';
    showPlacementDialog.value = true;
};

const closePlacementDialog = () => {
    showPlacementDialog.value = false;
    selectedUplineId.value = null;
    selectedPosition.value = null;
    selectedMember.value = null;
    memberSearchQuery.value = '';
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
    placementForm.upline_id = selectedUplineId.value;
    placementForm.position = selectedPosition.value;

    router.post(placeMember().url, {
        member_id: placementForm.member_id,
        upline_id: placementForm.upline_id,
        position: placementForm.position,
    }, {
        preserveScroll: true,
        onStart: () => {
            placementForm.processing = true;
        },
        onFinish: () => {
            placementForm.processing = false;
        },
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

// Member tree functions
const openMemberTreeDialog = async (memberId: number) => {
    memberTreeLoading.value = true;
    isViewingMemberTree.value = true;

    try {
        const response = await axios.get(getMemberTree(memberId).url);
        if (response.data.success) {
            selectedMemberForTree.value = response.data.data.member;
            memberTree.value = response.data.data.tree;
            memberTreeStats.value = {
                totalDownlines: response.data.data.totalDownlines,
                totalLeft: response.data.data.totalLeft,
                totalRight: response.data.data.totalRight,
            };
            // Increment key counter to force component remount
            treeKeyCounter.value++;
        } else {
            toast.error('Gagal memuat data jaringan member');
            backToDefaultTree();
        }
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Gagal memuat data jaringan member');
        backToDefaultTree();
    } finally {
        memberTreeLoading.value = false;
    }
};

const backToDefaultTree = () => {
    isViewingMemberTree.value = false;
    selectedMemberForTree.value = null;
    memberTree.value = null;
    memberTreeStats.value = {
        totalDownlines: 0,
        totalLeft: 0,
        totalRight: 0,
    };
    // Reset tree search when going back
    treeSearchQuery.value = '';
    treeSearchResults.value = [];
    showTreeSearchResults.value = false;
};

// Tree search functions
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const handleTreeSearch = async () => {
    const query = treeSearchQuery.value.trim();

    if (query.length < 2) {
        treeSearchResults.value = [];
        showTreeSearchResults.value = false;
        return;
    }

    // Debounce search
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(async () => {
        treeSearchLoading.value = true;
        showTreeSearchResults.value = true;

        try {
            const response = await axios.get(searchMemberInTree({ query: { query } }).url);
            if (response.data.success) {
                treeSearchResults.value = response.data.data;
            } else {
                treeSearchResults.value = [];
            }
        } catch {
            treeSearchResults.value = [];
        } finally {
            treeSearchLoading.value = false;
        }
    }, 300);
};

const selectTreeSearchResult = (member: { id: number; name: string; email: string }) => {
    treeSearchQuery.value = '';
    treeSearchResults.value = [];
    showTreeSearchResults.value = false;
    openMemberTreeDialog(member.id);
};

const handleTreeSearchBlur = () => {
    setTimeout(() => {
        closeTreeSearch();
    }, 200);
};

const closeTreeSearch = () => {
    showTreeSearchResults.value = false;
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

// Window event handlers for GoJS clicks (bypasses Vue reactivity issues)
const handleGojsMemberClick = (event: CustomEvent) => {
    openMemberTreeDialog(event.detail.memberId);
};

const handleGojsOpenPlacement = (event: CustomEvent) => {
    openPlacementDialog(event.detail.uplineId, event.detail.position);
};

onMounted(() => {
    window.addEventListener('gojs-member-click', handleGojsMemberClick as EventListener);
    window.addEventListener('gojs-open-placement', handleGojsOpenPlacement as EventListener);
});

onUnmounted(() => {
    window.removeEventListener('gojs-member-click', handleGojsMemberClick as EventListener);
    window.removeEventListener('gojs-open-placement', handleGojsOpenPlacement as EventListener);
});
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
                    <div class="text-lg sm:text-2xl font-bold">{{ currentStats.totalDownlines }}</div>
                    <p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block">Member aktif di jaringan Anda</p>
                </CardContent>
            </Card>

            <Card class="p-0">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle class="text-[10px] sm:text-sm font-medium truncate">Kaki Kiri</CardTitle>
                    <TrendingUp class="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                </CardHeader>
                <CardContent class="p-2 sm:p-4 pt-0 sm:pt-0">
                    <div class="text-lg sm:text-2xl font-bold text-blue-600">{{ currentStats.totalLeft }}</div>
                    <p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block">Member di posisi kiri</p>
                </CardContent>
            </Card>

            <Card class="p-0">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 p-2 sm:p-4 pb-1 sm:pb-2">
                    <CardTitle class="text-[10px] sm:text-sm font-medium truncate">Kaki Kanan</CardTitle>
                    <TrendingUp class="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                </CardHeader>
                <CardContent class="p-2 sm:p-4 pt-0 sm:pt-0">
                    <div class="text-lg sm:text-2xl font-bold text-green-600">{{ currentStats.totalRight }}</div>
                    <p class="text-[8px] sm:text-xs text-muted-foreground hidden sm:block">Member di posisi kanan</p>
                </CardContent>
            </Card>
        </div>

        <!-- Binary Tree Visualization with GoJS -->
        <Card>
            <CardHeader class="p-3 sm:p-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <!-- Back Button when viewing member tree -->
                        <Button
                            v-if="isViewingMemberTree"
                            variant="ghost"
                            size="icon"
                            class="h-7 w-7 sm:h-8 sm:w-8"
                            @click="backToDefaultTree"
                        >
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                        <div>
                            <CardTitle class="text-sm sm:text-base flex items-center gap-2">
                                <template v-if="isViewingMemberTree && selectedMemberForTree">
                                    Jaringan {{ selectedMemberForTree.name }}
                                </template>
                                <template v-else>
                                    Struktur Binary Tree
                                </template>
                            </CardTitle>
                            <CardDescription class="text-xs sm:text-sm">
                                <template v-if="isViewingMemberTree && selectedMemberForTree">
                                    {{ selectedMemberForTree.email }}
                                </template>
                                <template v-else>
                                    Visualisasi jaringan MLM binary tree Anda
                                </template>
                            </CardDescription>
                        </div>
                    </div>
                    <!-- Search and Zoom Controls -->
                    <div class="flex items-center gap-1 sm:gap-2">
                        <!-- Search Member -->
                        <div class="relative">
                            <div class="relative">
                                <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                    v-model="treeSearchQuery"
                                    type="text"
                                    placeholder="Cari member..."
                                    class="h-7 sm:h-8 w-28 sm:w-40 pl-8 text-xs sm:text-sm"
                                    @input="handleTreeSearch"
                                    @blur="handleTreeSearchBlur"
                                />
                                <Loader2 v-if="treeSearchLoading" class="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />
                            </div>
                            <!-- Search Results Dropdown -->
                            <div
                                v-if="showTreeSearchResults && (treeSearchResults.length > 0 || treeSearchQuery.length >= 2)"
                                class="absolute top-full right-0 mt-1 w-64 sm:w-72 bg-background border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto"
                            >
                                <div v-if="treeSearchResults.length === 0" class="p-3 text-center text-sm text-muted-foreground">
                                    <Search class="w-5 h-5 mx-auto mb-2 opacity-20" />
                                    <p>Tidak ditemukan</p>
                                </div>
                                <button
                                    v-for="member in treeSearchResults"
                                    :key="member.id"
                                    type="button"
                                    class="w-full p-2.5 text-left hover:bg-muted/50 border-b last:border-b-0 transition-colors"
                                    @mousedown.prevent="selectTreeSearchResult(member)"
                                >
                                    <p class="text-sm font-medium truncate">{{ member.name }}</p>
                                    <p class="text-xs text-muted-foreground truncate">{{ member.email }}</p>
                                    <p v-if="member.package_name" class="text-xs text-primary">{{ member.package_name }}</p>
                                </button>
                            </div>
                        </div>
                        <Button
                            v-if="isViewingMemberTree"
                            variant="outline"
                            size="sm"
                            class="h-7 sm:h-8 text-xs"
                            @click="backToDefaultTree"
                        >
                            <ArrowLeft class="h-3.5 w-3.5 mr-1" />
                            <span class="hidden sm:inline">Kembali</span>
                        </Button>
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
                <!-- Tree Container with Loading Overlay -->
                <div class="relative">
                    <!-- Loading Overlay -->
                    <div
                        v-if="memberTreeLoading"
                        class="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg"
                    >
                        <div class="text-center">
                            <Loader2 class="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
                            <p class="text-sm text-muted-foreground">Memuat data jaringan...</p>
                        </div>
                    </div>

                    <!-- Tree Visualization -->
                    <GoJSBinaryTree
                        v-if="currentTree"
                        :key="treeKey"
                        ref="goJSTreeRef"
                        :binary-tree="currentTree"
                        :is-dialog="isViewingMemberTree"
                    />

                    <!-- Empty State -->
                    <div v-else class="h-[400px] flex items-center justify-center text-muted-foreground">
                        <div class="text-center">
                            <Users class="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Belum ada jaringan binary tree</p>
                        </div>
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
                <!-- Search Input -->
                <div class="relative mb-3 sm:mb-4">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        v-model="memberSearchQuery"
                        type="text"
                        placeholder="Cari nama, email, atau telepon..."
                        class="pl-9 text-sm"
                    />
                </div>

                <div v-if="filteredPassiveMembers.length === 0 && memberSearchQuery" class="text-center py-8 sm:py-12 text-muted-foreground">
                    <Search class="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-20" />
                    <p class="text-sm sm:text-base">Tidak ditemukan member dengan "{{ memberSearchQuery }}"</p>
                    <p class="text-xs sm:text-sm mt-1 sm:mt-2">Coba kata kunci lain</p>
                </div>

                <div v-else-if="passiveMembers.length === 0" class="text-center py-8 sm:py-12 text-muted-foreground">
                    <UserPlus class="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-20" />
                    <p class="text-sm sm:text-base">Tidak ada member pasif</p>
                    <p class="text-xs sm:text-sm mt-1 sm:mt-2">Semua member sudah ditempatkan</p>
                </div>

                <div v-else class="space-y-2">
                    <button
                        v-for="member in filteredPassiveMembers"
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
