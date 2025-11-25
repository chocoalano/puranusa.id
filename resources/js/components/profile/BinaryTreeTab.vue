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
import { Users, TrendingUp, UserPlus } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import TreeNodeComponent from './TreeNodeComponent.vue';

interface TreeNode {
    id: number;
    member_id: number;
    name: string;
    email: string;
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

const maxVisibleLevels = 15;

const showPlacementDialog = ref(false);
const selectedUplineId = ref<number | null>(null);
const selectedPosition = ref<'left' | 'right' | null>(null);
const selectedMember = ref<PassiveMember | null>(null);
const isPlacing = ref(false);

// Build complete tree structure with empty nodes up to max level
const buildCompleteTree = (node: TreeNode | null, parentId: number | null, position: 'left' | 'right' | null, currentLevel: number): TreeNode | null => {
    // Stop if we've reached max visible levels
    if (currentLevel > maxVisibleLevels) {
        return null;
    }

    if (node) {
        const shouldShowChildren = currentLevel < maxVisibleLevels;
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

    isPlacing.value = true;

    router.post(
        '/client/profile/place-member',
        {
            member_id: selectedMember.value.id,
            position: selectedPosition.value,
        },
        {
            onSuccess: () => {
                toast.success(`${selectedMember.value?.name} berhasil ditempatkan di posisi ${selectedPosition.value}`);
                closePlacementDialog();
            },
            onError: (errors) => {
                const errorMessage = errors.error || 'Gagal menempatkan member ke binary tree';
                toast.error(errorMessage);
            },
            onFinish: () => {
                isPlacing.value = false;
            },
        },
    );
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
</script><template>
    <div class="space-y-6">
        <!-- Stats Overview -->
        <div class="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Total Jaringan</CardTitle>
                    <Users class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ totalDownlines }}</div>
                    <p class="text-xs text-muted-foreground">Member aktif di jaringan Anda</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Kaki Kiri</CardTitle>
                    <TrendingUp class="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-blue-600">{{ totalLeft }}</div>
                    <p class="text-xs text-muted-foreground">Member di posisi kiri</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Kaki Kanan</CardTitle>
                    <TrendingUp class="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-green-600">{{ totalRight }}</div>
                    <p class="text-xs text-muted-foreground">Member di posisi kanan</p>
                </CardContent>
            </Card>
        </div>

        <!-- Binary Tree Visualization -->
        <Card>
            <CardHeader>
                <CardTitle>Struktur Binary Tree</CardTitle>
                <CardDescription>
                    Visualisasi jaringan MLM binary tree Anda (maksimal {{ maxVisibleLevels }} level)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto pb-4">
                    <div class="min-w-max">
                        <TreeNodeComponent
                            :node="completeTree"
                            :is-root="true"
                            :max-level="maxVisibleLevels"
                            @open-placement="openPlacementDialog"
                        />

                        <!-- Info -->
                        <div class="mt-6 p-4 rounded-lg bg-muted/50 text-center">
                            <p class="text-sm text-muted-foreground">
                                💡 Tree menampilkan maksimal {{ maxVisibleLevels }} level untuk performa optimal
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

    <!-- Placement Dialog -->
    <Dialog :open="showPlacementDialog" @update:open="closePlacementDialog">
        <DialogContent class="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
                <DialogTitle>Pilih Member untuk Ditempatkan</DialogTitle>
                <DialogDescription>
                    Pilih member pasif untuk ditempatkan di posisi
                    <span class="font-semibold">{{ selectedPosition === 'left' ? 'Kiri' : 'Kanan' }}</span>
                </DialogDescription>
            </DialogHeader>

            <div class="flex-1 overflow-y-auto py-4">
                <div v-if="passiveMembers.length === 0" class="text-center py-12 text-muted-foreground">
                    <UserPlus class="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Tidak ada member pasif</p>
                    <p class="text-sm mt-2">Semua member sudah ditempatkan di binary tree</p>
                </div>

                <div v-else class="space-y-2">
                    <button
                        v-for="member in passiveMembers"
                        :key="member.id"
                        type="button"
                        :class="[
                            'w-full p-4 rounded-lg border-2 text-left transition-all',
                            selectedMember?.id === member.id
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600',
                        ]"
                        @click="selectMember(member)"
                    >
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="font-semibold">{{ member.name }}</h4>
                                    <Badge variant="default" v-if="member.has_purchase" class="text-xs">
                                        Ada Pembelian
                                    </Badge>
                                    <Badge variant="secondary" v-else class="text-xs">
                                        Belum Belanja
                                    </Badge>
                                </div>
                                <div class="space-y-0.5 text-sm text-muted-foreground">
                                    <p>{{ member.email }}</p>
                                    <p v-if="member.phone">{{ member.phone }}</p>
                                    <p class="text-xs">Bergabung: {{ formatDate(member.joined_at) }}</p>
                                </div>
                            </div>
                            <div v-if="selectedMember?.id === member.id" class="ml-3">
                                <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" @click="closePlacementDialog" :disabled="isPlacing">
                    Batal
                </Button>
                <Button
                    @click="placeMemberToBinaryTree"
                    :disabled="!selectedMember || isPlacing"
                >
                    {{ isPlacing ? 'Memproses...' : 'Tempatkan Member' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
