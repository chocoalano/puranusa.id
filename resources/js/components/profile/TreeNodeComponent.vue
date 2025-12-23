<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { User, UserPlus } from 'lucide-vue-next';

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

interface Props {
    node: TreeNode;
    isRoot?: boolean;
    maxLevel?: number;
}

const props = withDefaults(defineProps<Props>(), {
    maxLevel: 15,
});

const emit = defineEmits<{
    (e: 'open-placement', memberId: number, position: 'left' | 'right'): void;
}>();

const getNodeColor = (level: number, status: boolean) => {
    if (!status) return 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600';

    const colors = [
        'bg-primary/10 border-primary/30',
        'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
        'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
        'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
        'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
        'bg-pink-50 border-pink-200 dark:bg-pink-950 dark:border-pink-800',
    ];

    return colors[Math.min(level - 1, colors.length - 1)] || colors[colors.length - 1];
};

const handlePlacement = (memberId: number, position: 'left' | 'right') => {
    emit('open-placement', memberId, position);
};

// Check if we should show children (not exceeding max level)
const shouldShowChildren = props.node.level < props.maxLevel;

// Truncate name for mobile
const truncateName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
};

</script>

<template>
    <div>
        <!-- Current Node -->
        <div class="flex justify-center mb-3 sm:mb-6">
            <!-- Filled Node -->
            <div
                v-if="node.name"
                :class="[
                    'relative rounded-lg border-2 shadow-sm sm:shadow-lg transition-all hover:shadow-md sm:hover:shadow-xl max-w-[120px] sm:max-w-none',
                    isRoot ? 'px-2 py-2 sm:px-6 sm:py-4' : 'px-1.5 py-1.5 sm:px-3 sm:py-2',
                    getNodeColor(node.level, node.status)
                ]"
            >
                <div :class="['flex items-center gap-1.5 sm:gap-2', isRoot && 'sm:gap-3']">
                    <div :class="[
                        'flex items-center justify-center rounded-full text-primary-foreground flex-shrink-0',
                        isRoot ? 'h-7 w-7 sm:h-12 sm:w-12 bg-primary' : 'h-5 w-5 sm:h-8 sm:w-8 bg-blue-100 dark:bg-blue-900'
                    ]">
                        <User :class="isRoot ? 'h-4 w-4 sm:h-6 sm:w-6' : 'h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400'" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div :class="['font-medium truncate', isRoot ? 'text-xs sm:text-base font-semibold' : 'text-[10px] sm:text-xs']">
                            <span class="sm:hidden">{{ truncateName(node.name, 10) }}</span>
                            <span class="hidden sm:inline">{{ node.name }}</span>
                        </div>
                        <div v-if="node.package_name" :class="['font-medium truncate', isRoot ? 'text-[9px] sm:text-xs text-primary' : 'text-[7px] sm:text-[10px] text-primary']">
                            <span class="sm:hidden">{{ truncateName(node.package_name, 8) }}</span>
                            <span class="hidden sm:inline">{{ node.package_name }}</span>
                        </div>
                        <!-- Total Left/Right Counts -->
                        <div v-if="(node.total_left !== undefined && node.total_left > 0) || (node.total_right !== undefined && node.total_right > 0)" :class="['flex items-center gap-1 text-muted-foreground', isRoot ? 'text-[9px] sm:text-xs' : 'text-[7px] sm:text-[10px]']">
                            <span class="text-blue-600 dark:text-blue-400">L:{{ node.total_left ?? 0 }}</span>
                            <span class="text-muted-foreground">|</span>
                            <span class="text-green-600 dark:text-green-400">R:{{ node.total_right ?? 0 }}</span>
                        </div>
                        <div class="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1 flex-wrap">
                            <Badge v-if="node.position === 'left'" variant="secondary" :class="isRoot ? 'text-[8px] sm:text-xs px-1 py-0' : 'text-[7px] sm:text-[10px] px-0.5 py-0'">
                                <span class="sm:hidden">L</span>
                                <span class="hidden sm:inline">Kiri</span>
                            </Badge>
                            <Badge v-else-if="node.position === 'right'" variant="secondary" :class="isRoot ? 'text-[8px] sm:text-xs px-1 py-0' : 'text-[7px] sm:text-[10px] px-0.5 py-0'">
                                <span class="sm:hidden">R</span>
                                <span class="hidden sm:inline">Kanan</span>
                            </Badge>
                            <Badge variant="outline" :class="isRoot ? 'text-[8px] sm:text-xs px-1 py-0' : 'text-[7px] sm:text-[10px] px-0.5 py-0'">
                                L{{ node.level }}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty Node with Parent -->
            <div
                v-else-if="node.member_id > 0"
                :class="[
                    'rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted hover:border-primary/50 transition-all cursor-pointer group',
                    isRoot ? 'px-2 py-2 sm:px-6 sm:py-4' : 'px-1.5 py-1 sm:px-3 sm:py-2'
                ]"
                @click="handlePlacement(node.member_id, node.position as 'left' | 'right')"
            >
                <div class="text-center">
                    <UserPlus
                        :class="[
                            'mx-auto mb-0.5 sm:mb-1 text-muted-foreground group-hover:text-primary',
                            isRoot ? 'w-4 h-4 sm:w-6 sm:h-6' : 'w-3 h-3 sm:w-4 sm:h-4'
                        ]"
                    />
                    <div :class="['text-muted-foreground group-hover:text-primary', isRoot ? 'text-[10px] sm:text-sm' : 'text-[8px] sm:text-[10px]']">
                        <span class="sm:hidden">+</span>
                        <span class="hidden sm:inline">{{ isRoot ? 'Tempatkan Member' : 'Tambah' }}</span>
                    </div>
                </div>
            </div>

            <!-- Empty Node without Parent (Unreachable) -->
            <div
                v-else
                :class="[
                    'rounded-lg border-2 border-dashed bg-muted/30',
                    isRoot ? 'px-2 py-2 sm:px-6 sm:py-4' : 'px-1.5 py-1 sm:px-3 sm:py-2'
                ]"
            >
                <div :class="['text-center text-muted-foreground', isRoot ? 'text-[10px] sm:text-sm' : 'text-[8px] sm:text-[10px]']">
                    -
                </div>
            </div>
        </div>

        <!-- Children Nodes -->
        <div
            v-if="node.name && shouldShowChildren"
            :class="['flex justify-center gap-1 sm:gap-4 mb-2 sm:mb-4', isRoot && 'gap-2 sm:gap-16 sm:mb-6']"
        >
            <!-- Left Child -->
            <div :class="isRoot ? 'w-[130px] sm:w-64' : 'w-[65px] sm:w-36'">
                <TreeNodeComponent
                    v-if="node.left"
                    :node="node.left"
                    :is-root="false"
                    :max-level="maxLevel"
                    @open-placement="(memberId, position) => $emit('open-placement', memberId, position)"
                />
                <!-- Empty placeholder for left position -->
                <div
                    v-else
                    class="flex justify-center mb-3 sm:mb-6"
                >
                    <div
                        :class="[
                            'rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted hover:border-primary/50 transition-all cursor-pointer group',
                            isRoot ? 'px-2 py-2 sm:px-6 sm:py-4' : 'px-1.5 py-1 sm:px-3 sm:py-2'
                        ]"
                        @click="handlePlacement(node.member_id, 'left')"
                    >
                        <div class="text-center">
                            <UserPlus
                                :class="[
                                    'mx-auto mb-0.5 sm:mb-1 text-muted-foreground group-hover:text-primary',
                                    isRoot ? 'w-4 h-4 sm:w-6 sm:h-6' : 'w-3 h-3 sm:w-4 sm:h-4'
                                ]"
                            />
                            <div :class="['text-muted-foreground group-hover:text-primary', isRoot ? 'text-[10px] sm:text-sm' : 'text-[8px] sm:text-[10px]']">
                                <span class="sm:hidden">+</span>
                                <span class="hidden sm:inline">Tambah</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Child -->
            <div :class="isRoot ? 'w-[130px] sm:w-64' : 'w-[65px] sm:w-36'">
                <TreeNodeComponent
                    v-if="node.right"
                    :node="node.right"
                    :is-root="false"
                    :max-level="maxLevel"
                    @open-placement="(memberId, position) => $emit('open-placement', memberId, position)"
                />
                <!-- Empty placeholder for right position -->
                <div
                    v-else
                    class="flex justify-center mb-3 sm:mb-6"
                >
                    <div
                        :class="[
                            'rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted hover:border-primary/50 transition-all cursor-pointer group',
                            isRoot ? 'px-2 py-2 sm:px-6 sm:py-4' : 'px-1.5 py-1 sm:px-3 sm:py-2'
                        ]"
                        @click="handlePlacement(node.member_id, 'right')"
                    >
                        <div class="text-center">
                            <UserPlus
                                :class="[
                                    'mx-auto mb-0.5 sm:mb-1 text-muted-foreground group-hover:text-primary',
                                    isRoot ? 'w-4 h-4 sm:w-6 sm:h-6' : 'w-3 h-3 sm:w-4 sm:h-4'
                                ]"
                            />
                            <div :class="['text-muted-foreground group-hover:text-primary', isRoot ? 'text-[10px] sm:text-sm' : 'text-[8px] sm:text-[10px]']">
                                <span class="sm:hidden">+</span>
                                <span class="hidden sm:inline">Tambah</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
