<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Dynamic import for GoJS - only load on client side
let go: typeof import('gojs') | null = null;

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
    isDialog?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isDialog: false,
});

const diagramDiv = ref<HTMLDivElement | null>(null);
const isLoaded = ref(false);
let myDiagram: any = null;

// Convert tree structure to GoJS model data
const convertTreeToModel = (node: TreeNode | null, parentKey: number | null = null): { nodes: any[]; links: any[] } => {
    if (!node) return { nodes: [], links: [] };

    const nodes: any[] = [];
    const links: any[] = [];

    const addNode = (n: TreeNode, pKey: number | null, position: string | null) => {
        // Check if this node is within allowed depth (max 5 levels from root for adding children)
        const canAddChildren = n.level < 5;

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
            level: n.level,
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
        // Only show placeholder if node is active AND level is less than 5
        if (!n.left && n.status && canAddChildren) {
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
        // Only show placeholder if node is active AND level is less than 5
        if (!n.right && n.status && canAddChildren) {
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
    if (!diagramDiv.value || !go) return;

    const goLib = go;
    const $ = goLib.GraphObject.make;

    myDiagram = $(goLib.Diagram, diagramDiv.value, {
        'undoManager.isEnabled': false,
        'animationManager.isEnabled': true,
        initialAutoScale: goLib.AutoScale.Uniform,
        contentAlignment: goLib.Spot.Top,
        layout: $(goLib.TreeLayout, {
            angle: 90,
            layerSpacing: 50,
            nodeSpacing: 20,
            arrangement: goLib.TreeArrangement.Horizontal,
            // Sort children by order property to ensure left (0) before right (1)
            sorting: goLib.TreeSorting.Ascending,
            comparer: (a: any, b: any) => {
                const aOrder = a.node?.data?.order ?? 0;
                const bOrder = b.node?.data?.order ?? 0;
                return aOrder - bOrder;
            },
        }),
        maxSelectionCount: 1,
    });

    // Add click listener at diagram level - more reliable than node template click
    myDiagram.addDiagramListener('ObjectSingleClicked', (e: any) => {
        const part = e.subject.part;
        if (part instanceof goLib.Node) {
            const data = part.data;
            if (data?.isPlaceholder && data?.parentId && data?.placeholderPosition) {
                // Dispatch custom window event for placement
                window.dispatchEvent(new CustomEvent('gojs-open-placement', {
                    detail: { uplineId: data.parentId, position: data.placeholderPosition }
                }));
            } else if (!data?.isPlaceholder && data?.key) {
                // Dispatch custom window event for member click
                window.dispatchEvent(new CustomEvent('gojs-member-click', {
                    detail: { memberId: data.key }
                }));
            }
        }
    });

    // Define the node template for regular members
    myDiagram.nodeTemplate = $(
        goLib.Node,
        'Auto',
        {
            cursor: 'pointer',
            selectionAdorned: false,
        },
        $(
            goLib.Shape,
            'RoundedRectangle',
            {
                fill: 'white',
                stroke: '#e2e8f0',
                strokeWidth: 2,
                parameter1: 8,
            },
            new goLib.Binding('fill', '', (data) => {
                if (data.isPlaceholder) return '#f8fafc';
                return data.isActive ? '#ffffff' : '#fef3c7';
            }),
            new goLib.Binding('stroke', '', (data) => {
                if (data.isPlaceholder) return '#cbd5e1';
                if (data.position === 'left') return '#3b82f6';
                if (data.position === 'right') return '#22c55e';
                return '#6366f1';
            }),
            new goLib.Binding('strokeWidth', '', (data) => {
                return data.isPlaceholder ? 1 : 2;
            }),
            new goLib.Binding('strokeDashArray', 'isPlaceholder', (isPlaceholder) => {
                return isPlaceholder ? [4, 4] : null;
            })
        ),
        $(
            goLib.Panel,
            'Vertical',
            { margin: 8, defaultAlignment: goLib.Spot.Left },
            // Name
            $(
                goLib.TextBlock,
                {
                    font: 'bold 13px Inter, sans-serif',
                    stroke: '#1e293b',
                    maxSize: new goLib.Size(140, NaN),
                    wrap: goLib.Wrap.Fit,
                    textAlign: 'center',
                    alignment: goLib.Spot.Center,
                },
                new goLib.Binding('text', 'name'),
                new goLib.Binding('stroke', 'isPlaceholder', (isPlaceholder) => {
                    return isPlaceholder ? '#64748b' : '#1e293b';
                }),
                new goLib.Binding('font', 'isPlaceholder', (isPlaceholder) => {
                    return isPlaceholder ? '12px Inter, sans-serif' : 'bold 13px Inter, sans-serif';
                })
            ),
            // Email (hidden for placeholders)
            $(
                goLib.TextBlock,
                {
                    font: '11px Inter, sans-serif',
                    stroke: '#64748b',
                    maxSize: new goLib.Size(140, NaN),
                    wrap: goLib.Wrap.Fit,
                    margin: new goLib.Margin(2, 0, 0, 0),
                    alignment: goLib.Spot.Center,
                },
                new goLib.Binding('text', 'email'),
                new goLib.Binding('visible', 'isPlaceholder', (isPlaceholder) => !isPlaceholder)
            ),
            // Package badge
            $(
                goLib.Panel,
                'Auto',
                {
                    margin: new goLib.Margin(4, 0, 0, 0),
                    alignment: goLib.Spot.Center,
                },
                new goLib.Binding('visible', 'isPlaceholder', (isPlaceholder) => !isPlaceholder),
                $(goLib.Shape, 'RoundedRectangle', {
                    fill: '#eff6ff',
                    stroke: '#bfdbfe',
                    strokeWidth: 1,
                    parameter1: 4,
                }),
                $(
                    goLib.TextBlock,
                    {
                        font: '10px Inter, sans-serif',
                        stroke: '#1d4ed8',
                        margin: new goLib.Margin(2, 6, 2, 6),
                    },
                    new goLib.Binding('text', 'package')
                )
            ),
            // Network stats
            $(
                goLib.Panel,
                'Horizontal',
                {
                    margin: new goLib.Margin(6, 0, 0, 0),
                    alignment: goLib.Spot.Center,
                },
                new goLib.Binding('visible', 'isPlaceholder', (isPlaceholder) => !isPlaceholder),
                // Left count
                $(
                    goLib.Panel,
                    'Horizontal',
                    $(goLib.Shape, 'Circle', {
                        width: 8,
                        height: 8,
                        fill: '#3b82f6',
                        stroke: null,
                        margin: new goLib.Margin(0, 4, 0, 0),
                    }),
                    $(
                        goLib.TextBlock,
                        {
                            font: '10px Inter, sans-serif',
                            stroke: '#64748b',
                        },
                        new goLib.Binding('text', 'totalLeft', (v) => `L: ${v}`)
                    )
                ),
                $(goLib.TextBlock, ' | ', {
                    font: '10px Inter, sans-serif',
                    stroke: '#cbd5e1',
                }),
                // Right count
                $(
                    goLib.Panel,
                    'Horizontal',
                    $(goLib.Shape, 'Circle', {
                        width: 8,
                        height: 8,
                        fill: '#22c55e',
                        stroke: null,
                        margin: new goLib.Margin(0, 4, 0, 0),
                    }),
                    $(
                        goLib.TextBlock,
                        {
                            font: '10px Inter, sans-serif',
                            stroke: '#64748b',
                        },
                        new goLib.Binding('text', 'totalRight', (v) => `R: ${v}`)
                    )
                )
            )
        )
    );

    // Link template
    myDiagram.linkTemplate = $(
        goLib.Link,
        {
            routing: goLib.Routing.Orthogonal,
            corner: 10,
            selectable: false,
        },
        $(goLib.Shape, {
            strokeWidth: 2,
            stroke: '#cbd5e1',
        })
    );

    updateDiagram();
};

const updateDiagram = () => {
    if (!myDiagram || !props.binaryTree || !go) return;

    const goLib = go;
    const { nodes, links } = convertTreeToModel(props.binaryTree);

    // Use startTransaction/commitTransaction to batch updates
    myDiagram.startTransaction('update');
    myDiagram.model = new goLib.GraphLinksModel(nodes, links);
    myDiagram.commitTransaction('update');

    // Zoom to fit after a small delay to ensure layout is complete
    requestAnimationFrame(() => {
        if (myDiagram) {
            myDiagram.zoomToFit();
        }
    });
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

onMounted(async () => {
    // Dynamic import GoJS only on client side
    if (typeof window !== 'undefined') {
        go = await import('gojs');
        isLoaded.value = true;
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            initDiagram();
        }, 0);
    }
});

onUnmounted(() => {
    // Thorough cleanup of GoJS diagram
    if (myDiagram) {
        // Remove all listeners
        myDiagram.removeDiagramListener('ObjectSingleClicked', () => {});
        // Clear the diagram
        myDiagram.clear();
        // Disconnect from DOM
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
    <div v-if="!isLoaded" :class="[
        'w-full border rounded-lg bg-slate-50 flex items-center justify-center',
        isDialog ? 'h-[350px] sm:h-[400px]' : 'h-[500px] sm:h-[600px]'
    ]">
        <div class="text-center text-muted-foreground">
            <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
            <p class="text-sm">Memuat diagram...</p>
        </div>
    </div>
    <div v-else ref="diagramDiv" :class="[
        'w-full border rounded-lg bg-slate-50',
        isDialog ? 'h-[350px] sm:h-[400px]' : 'h-[500px] sm:h-[600px]'
    ]"></div>
</template>
