<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as go from 'gojs';

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
    binaryTree: TreeNode | null;
    onOpenPlacement?: (uplineId: number, position: 'left' | 'right') => void;
    isDialog?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isDialog: false,
});

const emit = defineEmits<{
    openPlacement: [uplineId: number, position: 'left' | 'right'];
    memberClick: [memberId: number];
}>();

const diagramDiv = ref<HTMLDivElement | null>(null);
let myDiagram: go.Diagram | null = null;

// Convert tree structure to GoJS model data
const convertTreeToModel = (node: TreeNode | null, parentKey: number | null = null): { nodes: any[]; links: any[] } => {
    if (!node) return { nodes: [], links: [] };

    const nodes: any[] = [];
    const links: any[] = [];

    const addNode = (n: TreeNode, pKey: number | null, position: string | null) => {
        const nodeData = {
            key: n.id,
            name: n.name,
            email: n.email,
            package: n.package_name || 'Tidak ada paket',
            totalLeft: n.total_left || 0,
            totalRight: n.total_right || 0,
            position: position,
            isActive: n.status,
            hasLeft: !!n.left,
            hasRight: !!n.right,
            // Add order for proper left-right positioning
            order: position === 'left' ? 0 : position === 'right' ? 1 : 0,
        };
        nodes.push(nodeData);

        if (pKey !== null) {
            // Use order to ensure proper left-right positioning
            links.push({
                from: pKey,
                to: n.id,
                order: position === 'left' ? 0 : 1
            });
        }

        // Add placeholder for empty left position FIRST (order 0)
        if (!n.left && n.status) {
            const placeholderLeftKey = -n.id * 2;
            nodes.push({
                key: placeholderLeftKey,
                name: '+ Kiri',
                email: '',
                package: '',
                isPlaceholder: true,
                parentId: n.id,
                placeholderPosition: 'left',
                order: 0,
            });
            links.push({ from: n.id, to: placeholderLeftKey, order: 0 });
        }

        // Add placeholder for empty right position SECOND (order 1)
        if (!n.right && n.status) {
            const placeholderRightKey = -n.id * 2 - 1;
            nodes.push({
                key: placeholderRightKey,
                name: '+ Kanan',
                email: '',
                package: '',
                isPlaceholder: true,
                parentId: n.id,
                placeholderPosition: 'right',
                order: 1,
            });
            links.push({ from: n.id, to: placeholderRightKey, order: 1 });
        }

        // Process left child first (order 0), then right (order 1)
        if (n.left) {
            addNode(n.left, n.id, 'left');
        }
        if (n.right) {
            addNode(n.right, n.id, 'right');
        }
    };

    addNode(node, parentKey, null);
    return { nodes, links };
};

const initDiagram = () => {
    if (!diagramDiv.value) return;

    const $ = go.GraphObject.make;

    myDiagram = $(go.Diagram, diagramDiv.value, {
        'undoManager.isEnabled': false,
        'animationManager.isEnabled': true,
        initialAutoScale: go.AutoScale.Uniform,
        contentAlignment: go.Spot.Top,
        layout: $(go.TreeLayout, {
            angle: 90,
            layerSpacing: 50,
            nodeSpacing: 20,
            arrangement: go.TreeArrangement.Horizontal,
            // Sort children by order property to ensure left (0) before right (1)
            sorting: go.TreeSorting.Ascending,
            comparer: (a: go.TreeVertex, b: go.TreeVertex) => {
                const aOrder = a.node?.data?.order ?? 0;
                const bOrder = b.node?.data?.order ?? 0;
                return aOrder - bOrder;
            },
        }),
        maxSelectionCount: 1,
    });

    // Define the node template for regular members
    myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        {
            cursor: 'pointer',
            selectionAdorned: false,
        },
        $(
            go.Shape,
            'RoundedRectangle',
            {
                fill: 'white',
                stroke: '#e2e8f0',
                strokeWidth: 2,
                parameter1: 8,
            },
            new go.Binding('fill', '', (data) => {
                if (data.isPlaceholder) return '#f8fafc';
                return data.isActive ? '#ffffff' : '#fef3c7';
            }),
            new go.Binding('stroke', '', (data) => {
                if (data.isPlaceholder) return '#cbd5e1';
                if (data.position === 'left') return '#3b82f6';
                if (data.position === 'right') return '#22c55e';
                return '#6366f1';
            }),
            new go.Binding('strokeWidth', '', (data) => {
                return data.isPlaceholder ? 1 : 2;
            }),
            new go.Binding('strokeDashArray', 'isPlaceholder', (isPlaceholder) => {
                return isPlaceholder ? [4, 4] : null;
            })
        ),
        $(
            go.Panel,
            'Vertical',
            { margin: 8, defaultAlignment: go.Spot.Left },
            // Name
            $(
                go.TextBlock,
                {
                    font: 'bold 13px Inter, sans-serif',
                    stroke: '#1e293b',
                    maxSize: new go.Size(140, NaN),
                    wrap: go.Wrap.Fit,
                    textAlign: 'center',
                    alignment: go.Spot.Center,
                },
                new go.Binding('text', 'name'),
                new go.Binding('stroke', 'isPlaceholder', (isPlaceholder) => {
                    return isPlaceholder ? '#64748b' : '#1e293b';
                }),
                new go.Binding('font', 'isPlaceholder', (isPlaceholder) => {
                    return isPlaceholder ? '12px Inter, sans-serif' : 'bold 13px Inter, sans-serif';
                })
            ),
            // Email (hidden for placeholders)
            $(
                go.TextBlock,
                {
                    font: '11px Inter, sans-serif',
                    stroke: '#64748b',
                    maxSize: new go.Size(140, NaN),
                    wrap: go.Wrap.Fit,
                    margin: new go.Margin(2, 0, 0, 0),
                    alignment: go.Spot.Center,
                },
                new go.Binding('text', 'email'),
                new go.Binding('visible', 'isPlaceholder', (isPlaceholder) => !isPlaceholder)
            ),
            // Package badge
            $(
                go.Panel,
                'Auto',
                {
                    margin: new go.Margin(4, 0, 0, 0),
                    alignment: go.Spot.Center,
                },
                new go.Binding('visible', 'isPlaceholder', (isPlaceholder) => !isPlaceholder),
                $(go.Shape, 'RoundedRectangle', {
                    fill: '#eff6ff',
                    stroke: '#bfdbfe',
                    strokeWidth: 1,
                    parameter1: 4,
                }),
                $(
                    go.TextBlock,
                    {
                        font: '10px Inter, sans-serif',
                        stroke: '#1d4ed8',
                        margin: new go.Margin(2, 6, 2, 6),
                    },
                    new go.Binding('text', 'package')
                )
            ),
            // Network stats
            $(
                go.Panel,
                'Horizontal',
                {
                    margin: new go.Margin(6, 0, 0, 0),
                    alignment: go.Spot.Center,
                },
                new go.Binding('visible', 'isPlaceholder', (isPlaceholder) => !isPlaceholder),
                // Left count
                $(
                    go.Panel,
                    'Horizontal',
                    $(go.Shape, 'Circle', {
                        width: 8,
                        height: 8,
                        fill: '#3b82f6',
                        stroke: null,
                        margin: new go.Margin(0, 4, 0, 0),
                    }),
                    $(
                        go.TextBlock,
                        {
                            font: '10px Inter, sans-serif',
                            stroke: '#64748b',
                        },
                        new go.Binding('text', 'totalLeft', (v) => `L: ${v}`)
                    )
                ),
                $(go.TextBlock, ' | ', {
                    font: '10px Inter, sans-serif',
                    stroke: '#cbd5e1',
                }),
                // Right count
                $(
                    go.Panel,
                    'Horizontal',
                    $(go.Shape, 'Circle', {
                        width: 8,
                        height: 8,
                        fill: '#22c55e',
                        stroke: null,
                        margin: new go.Margin(0, 4, 0, 0),
                    }),
                    $(
                        go.TextBlock,
                        {
                            font: '10px Inter, sans-serif',
                            stroke: '#64748b',
                        },
                        new go.Binding('text', 'totalRight', (v) => `R: ${v}`)
                    )
                )
            )
        ),
        {
            click: (e, obj) => {
                const data = obj.part?.data;
                if (data?.isPlaceholder && data?.parentId && data?.placeholderPosition) {
                    emit('openPlacement', data.parentId, data.placeholderPosition);
                } else if (!data?.isPlaceholder && data?.key && !props.isDialog) {
                    // Emit member click event for non-placeholder nodes (only in main tree, not dialog)
                    emit('memberClick', data.key);
                }
            },
        }
    );

    // Link template
    myDiagram.linkTemplate = $(
        go.Link,
        {
            routing: go.Routing.Orthogonal,
            corner: 10,
            selectable: false,
        },
        $(go.Shape, {
            strokeWidth: 2,
            stroke: '#cbd5e1',
        })
    );

    updateDiagram();
};

const updateDiagram = () => {
    if (!myDiagram || !props.binaryTree) return;

    const { nodes, links } = convertTreeToModel(props.binaryTree);

    myDiagram.model = new go.GraphLinksModel(nodes, links);
    myDiagram.zoomToFit();
};

const zoomIn = () => {
    if (myDiagram) {
        myDiagram.commandHandler.increaseZoom();
    }
};

const zoomOut = () => {
    if (myDiagram) {
        myDiagram.commandHandler.decreaseZoom();
    }
};

const resetZoom = () => {
    if (myDiagram) {
        myDiagram.zoomToFit();
    }
};

watch(
    () => props.binaryTree,
    () => {
        updateDiagram();
    },
    { deep: true }
);

onMounted(() => {
    initDiagram();
});

onUnmounted(() => {
    if (myDiagram) {
        myDiagram.div = null;
        myDiagram = null;
    }
});

defineExpose({
    zoomIn,
    zoomOut,
    resetZoom,
});
</script>

<template>
    <div ref="diagramDiv" :class="[
        'w-full border rounded-lg bg-slate-50',
        isDialog ? 'h-[350px] sm:h-[400px]' : 'h-[500px] sm:h-[600px]'
    ]"></div>
</template>
