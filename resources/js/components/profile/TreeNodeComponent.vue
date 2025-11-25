<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { User, UserPlus } from 'lucide-vue-next';

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

</script>

<template>
    <div>
        <!-- Current Node -->
        <div class="flex justify-center mb-6">
            <!-- Filled Node -->
            <div
                v-if="node.name"
                :class="[
                    'relative rounded-lg border-2 shadow-lg transition-all hover:shadow-xl',
                    isRoot ? 'px-6 py-4' : 'px-3 py-2',
                    getNodeColor(node.level, node.status)
                ]"
            >
                <div :class="['flex items-center gap-2', isRoot && 'gap-3']">
                    <div :class="[
                        'flex items-center justify-center rounded-full text-primary-foreground',
                        isRoot ? 'h-12 w-12 bg-primary' : 'h-8 w-8 bg-blue-100 dark:bg-blue-900'
                    ]">
                        <User :class="isRoot ? 'h-6 w-6' : 'h-4 w-4 text-blue-600 dark:text-blue-400'" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div :class="['font-medium truncate', isRoot ? 'font-semibold' : 'text-xs']">
                            {{ node.name }}
                        </div>
                        <div :class="['text-muted-foreground truncate', isRoot ? 'text-xs' : 'text-[10px]']">
                            {{ node.email }}
                        </div>
                        <div class="flex items-center gap-1 mt-1">
                            <Badge v-if="node.position === 'left'" variant="secondary" :class="isRoot ? 'text-xs' : 'text-[10px]'">
                                Kiri
                            </Badge>
                            <Badge v-else-if="node.position === 'right'" variant="secondary" :class="isRoot ? 'text-xs' : 'text-[10px]'">
                                Kanan
                            </Badge>
                            <Badge variant="outline" :class="isRoot ? 'text-xs' : 'text-[10px]'">
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
                    isRoot ? 'px-6 py-4' : 'px-3 py-2'
                ]"
                @click="handlePlacement(node.member_id, node.position as 'left' | 'right')"
            >
                <div class="text-center">
                    <UserPlus
                        :class="[
                            'mx-auto mb-1 text-muted-foreground group-hover:text-primary',
                            isRoot ? 'w-6 h-6' : 'w-4 h-4'
                        ]"
                    />
                    <div :class="['text-muted-foreground group-hover:text-primary', isRoot ? 'text-sm' : 'text-[10px]']">
                        {{ isRoot ? 'Tempatkan Member' : 'Tambah' }}
                    </div>
                </div>
            </div>

            <!-- Empty Node without Parent (Unreachable) -->
            <div
                v-else
                :class="[
                    'rounded-lg border-2 border-dashed bg-muted/30',
                    isRoot ? 'px-6 py-4' : 'px-3 py-2'
                ]"
            >
                <div :class="['text-center text-muted-foreground', isRoot ? 'text-sm' : 'text-[10px]']">
                    -
                </div>
            </div>
        </div>

        <!-- Children Nodes -->
        <div
            v-if="node.name && shouldShowChildren"
            :class="['flex justify-center gap-4 mb-4', isRoot && 'gap-16 mb-6']"
        >
            <!-- Left Child -->
            <div :class="isRoot ? 'w-64' : 'w-36'">
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
                    :class="[
                        'flex justify-center mb-6',
                    ]"
                >
                    <div
                        :class="[
                            'rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted hover:border-primary/50 transition-all cursor-pointer group',
                            isRoot ? 'px-6 py-4' : 'px-3 py-2'
                        ]"
                        @click="handlePlacement(node.member_id, 'left')"
                    >
                        <div class="text-center">
                            <UserPlus
                                :class="[
                                    'mx-auto mb-1 text-muted-foreground group-hover:text-primary',
                                    isRoot ? 'w-6 h-6' : 'w-4 h-4'
                                ]"
                            />
                            <div :class="['text-muted-foreground group-hover:text-primary', isRoot ? 'text-sm' : 'text-[10px]']">
                                Tambah
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Child -->
            <div :class="isRoot ? 'w-64' : 'w-36'">
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
                    :class="[
                        'flex justify-center mb-6',
                    ]"
                >
                    <div
                        :class="[
                            'rounded-lg border-2 border-dashed bg-muted/50 hover:bg-muted hover:border-primary/50 transition-all cursor-pointer group',
                            isRoot ? 'px-6 py-4' : 'px-3 py-2'
                        ]"
                        @click="handlePlacement(node.member_id, 'right')"
                    >
                        <div class="text-center">
                            <UserPlus
                                :class="[
                                    'mx-auto mb-1 text-muted-foreground group-hover:text-primary',
                                    isRoot ? 'w-6 h-6' : 'w-4 h-4'
                                ]"
                            />
                            <div :class="['text-muted-foreground group-hover:text-primary', isRoot ? 'text-sm' : 'text-[10px]']">
                                Tambah
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
