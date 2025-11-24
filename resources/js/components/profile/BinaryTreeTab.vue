<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Users, TrendingUp } from 'lucide-vue-next';

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
    binaryTree: TreeNode;
    totalDownlines: number;
    totalLeft: number;
    totalRight: number;
}

defineProps<Props>();

const maxVisibleLevels = 4;

const getNodeColor = (level: number, status: boolean) => {
    if (!status) return 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600';

    const colors = [
        'bg-primary/10 border-primary/30',
        'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
        'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
        'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
    ];

    return colors[Math.min(level - 1, colors.length - 1)] || colors[colors.length - 1];
};
</script>

<template>
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
                        <!-- Root Node (You) -->
                        <div class="flex justify-center mb-8">
                            <div
                                :class="[
                                    'relative px-6 py-4 rounded-lg border-2 shadow-lg transition-all hover:shadow-xl',
                                    getNodeColor(binaryTree.level, binaryTree.status)
                                ]"
                            >
                                <div class="flex items-center gap-3">
                                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <User class="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div class="font-semibold">{{ binaryTree.name }}</div>
                                        <div class="text-xs text-muted-foreground">{{ binaryTree.email }}</div>
                                        <Badge variant="outline" class="mt-1">Level {{ binaryTree.level }}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Level 1 - Direct Downlines -->
                        <div v-if="binaryTree.left || binaryTree.right" class="flex justify-center gap-32 mb-8 relative">
                            <!-- Connection Lines -->
                            <svg class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8" width="300" height="40">
                                <line v-if="binaryTree.left" x1="150" y1="0" x2="50" y2="40" stroke="currentColor" stroke-width="2" class="text-border" />
                                <line v-if="binaryTree.right" x1="150" y1="0" x2="250" y2="40" stroke="currentColor" stroke-width="2" class="text-border" />
                            </svg>

                            <!-- Left Node -->
                            <div class="w-64">
                                <div
                                    v-if="binaryTree.left"
                                    :class="[
                                        'relative px-4 py-3 rounded-lg border-2 shadow-md transition-all hover:shadow-lg',
                                        getNodeColor(binaryTree.left.level, binaryTree.left.status)
                                    ]"
                                >
                                    <div class="flex items-center gap-2">
                                        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <User class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="font-medium text-sm truncate">{{ binaryTree.left.name }}</div>
                                            <div class="text-xs text-muted-foreground truncate">{{ binaryTree.left.email }}</div>
                                            <div class="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary" class="text-xs">Kiri</Badge>
                                                <Badge variant="outline" class="text-xs">L{{ binaryTree.left.level }}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="px-4 py-3 rounded-lg border-2 border-dashed bg-muted/50">
                                    <div class="text-center text-sm text-muted-foreground">
                                        Posisi Kiri Kosong
                                    </div>
                                </div>
                            </div>

                            <!-- Right Node -->
                            <div class="w-64">
                                <div
                                    v-if="binaryTree.right"
                                    :class="[
                                        'relative px-4 py-3 rounded-lg border-2 shadow-md transition-all hover:shadow-lg',
                                        getNodeColor(binaryTree.right.level, binaryTree.right.status)
                                    ]"
                                >
                                    <div class="flex items-center gap-2">
                                        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                            <User class="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="font-medium text-sm truncate">{{ binaryTree.right.name }}</div>
                                            <div class="text-xs text-muted-foreground truncate">{{ binaryTree.right.email }}</div>
                                            <div class="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary" class="text-xs">Kanan</Badge>
                                                <Badge variant="outline" class="text-xs">L{{ binaryTree.right.level }}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="px-4 py-3 rounded-lg border-2 border-dashed bg-muted/50">
                                    <div class="text-center text-sm text-muted-foreground">
                                        Posisi Kanan Kosong
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Level 2 - Second Level Downlines -->
                        <div v-if="(binaryTree.left?.left || binaryTree.left?.right) || (binaryTree.right?.left || binaryTree.right?.right)"
                             class="flex justify-center gap-8 mb-6">
                            <!-- Left Branch Level 2 -->
                            <div class="flex gap-4">
                                <div class="w-48">
                                    <div
                                        v-if="binaryTree.left?.left"
                                        :class="[
                                            'px-3 py-2 rounded-lg border shadow-sm',
                                            getNodeColor(binaryTree.left.left.level, binaryTree.left.left.status)
                                        ]"
                                    >
                                        <div class="flex items-center gap-2">
                                            <User class="h-4 w-4" />
                                            <div class="flex-1 min-w-0">
                                                <div class="text-xs font-medium truncate">{{ binaryTree.left.left.name }}</div>
                                                <Badge variant="outline" class="text-[10px] mt-1">L{{ binaryTree.left.left.level }}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="px-3 py-2 rounded-lg border-dashed border bg-muted/30">
                                        <div class="text-xs text-center text-muted-foreground">Kosong</div>
                                    </div>
                                </div>

                                <div class="w-48">
                                    <div
                                        v-if="binaryTree.left?.right"
                                        :class="[
                                            'px-3 py-2 rounded-lg border shadow-sm',
                                            getNodeColor(binaryTree.left.right.level, binaryTree.left.right.status)
                                        ]"
                                    >
                                        <div class="flex items-center gap-2">
                                            <User class="h-4 w-4" />
                                            <div class="flex-1 min-w-0">
                                                <div class="text-xs font-medium truncate">{{ binaryTree.left.right.name }}</div>
                                                <Badge variant="outline" class="text-[10px] mt-1">L{{ binaryTree.left.right.level }}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="px-3 py-2 rounded-lg border-dashed border bg-muted/30">
                                        <div class="text-xs text-center text-muted-foreground">Kosong</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Branch Level 2 -->
                            <div class="flex gap-4">
                                <div class="w-48">
                                    <div
                                        v-if="binaryTree.right?.left"
                                        :class="[
                                            'px-3 py-2 rounded-lg border shadow-sm',
                                            getNodeColor(binaryTree.right.left.level, binaryTree.right.left.status)
                                        ]"
                                    >
                                        <div class="flex items-center gap-2">
                                            <User class="h-4 w-4" />
                                            <div class="flex-1 min-w-0">
                                                <div class="text-xs font-medium truncate">{{ binaryTree.right.left.name }}</div>
                                                <Badge variant="outline" class="text-[10px] mt-1">L{{ binaryTree.right.left.level }}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="px-3 py-2 rounded-lg border-dashed border bg-muted/30">
                                        <div class="text-xs text-center text-muted-foreground">Kosong</div>
                                    </div>
                                </div>

                                <div class="w-48">
                                    <div
                                        v-if="binaryTree.right?.right"
                                        :class="[
                                            'px-3 py-2 rounded-lg border shadow-sm',
                                            getNodeColor(binaryTree.right.right.level, binaryTree.right.right.status)
                                        ]"
                                    >
                                        <div class="flex items-center gap-2">
                                            <User class="h-4 w-4" />
                                            <div class="flex-1 min-w-0">
                                                <div class="text-xs font-medium truncate">{{ binaryTree.right.right.name }}</div>
                                                <Badge variant="outline" class="text-[10px] mt-1">L{{ binaryTree.right.right.level }}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="px-3 py-2 rounded-lg border-dashed border bg-muted/30">
                                        <div class="text-xs text-center text-muted-foreground">Kosong</div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
</template>
