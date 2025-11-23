<script setup lang="ts">
import { ref, watch } from 'vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import TiptapEditor from '@/components/admin/TiptapEditor.vue';
import MonacoEditor from '@/components/admin/MonacoEditor.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
    Type,
    Image as ImageIcon,
    List,
    AlignLeft,
    Code,
    Youtube,
    FileText,
    Plus,
    Trash2,
    ChevronUp,
    ChevronDown,
    GripVertical,
    Edit,
} from 'lucide-vue-next';

interface Block {
    id: string;
    type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code' | 'video' | 'divider';
    content: any;
}

interface Props {
    modelValue: Block[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:modelValue': [value: Block[]];
}>();

const blocks = ref<Block[]>(props.modelValue || []);
const showBlockSelector = ref(false);
const editingBlock = ref<{ index: number; block: Block } | null>(null);
const draggedIndex = ref<number | null>(null);
const uploadingImage = ref(false);
const imageInputMethod = ref<'url' | 'upload'>('url');

watch(() => props.modelValue, (newValue) => {
    blocks.value = newValue || [];
}, { deep: true });

watch(blocks, (newBlocks) => {
    emit('update:modelValue', newBlocks);
}, { deep: true });

const blockTypes = [
    { type: 'heading', label: 'Heading', icon: Type, description: 'Judul dengan berbagai ukuran' },
    { type: 'paragraph', label: 'Paragraph', icon: AlignLeft, description: 'Teks paragraf biasa' },
    { type: 'image', label: 'Gambar', icon: ImageIcon, description: 'Upload atau embed gambar' },
    { type: 'list', label: 'List', icon: List, description: 'List berurutan atau tidak' },
    { type: 'quote', label: 'Quote', icon: FileText, description: 'Kutipan atau highlight teks' },
    { type: 'code', label: 'Code', icon: Code, description: 'Blok kode dengan syntax highlighting' },
    { type: 'video', label: 'Video', icon: Youtube, description: 'Embed video YouTube' },
    { type: 'divider', label: 'Divider', icon: AlignLeft, description: 'Garis pemisah' },
];

const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
        id: `block-${Date.now()}-${Math.random()}`,
        type,
        content: getDefaultContent(type),
    };
    blocks.value.push(newBlock);
    showBlockSelector.value = false;
};

const getDefaultContent = (type: Block['type']) => {
    switch (type) {
        case 'heading':
            return { level: 2, text: '' };
        case 'paragraph':
            return { text: '' };
        case 'image':
            return { url: '', alt: '', caption: '' };
        case 'list':
            return { ordered: false, items: [''] };
        case 'quote':
            return { text: '', author: '' };
        case 'code':
            return { language: 'javascript', code: '' };
        case 'video':
            return { url: '' };
        case 'divider':
            return {};
        default:
            return {};
    }
};

const removeBlock = (index: number) => {
    blocks.value.splice(index, 1);
};

const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < blocks.value.length) {
        [blocks.value[index], blocks.value[newIndex]] = [blocks.value[newIndex], blocks.value[index]];
    }
};

const editBlock = (index: number) => {
    const block = blocks.value[index];
    // Ensure content exists before editing
    if (!block.content) {
        block.content = getDefaultContent(block.type);
    }
    editingBlock.value = { index, block: JSON.parse(JSON.stringify(block)) };
};

const saveBlockEdit = () => {
    if (editingBlock.value) {
        blocks.value[editingBlock.value.index] = editingBlock.value.block;
        editingBlock.value = null;
    }
};

const addListItem = (blockIndex: number) => {
    if (blocks.value[blockIndex].type === 'list') {
        if (!blocks.value[blockIndex].content) {
            blocks.value[blockIndex].content = { ordered: false, items: [] };
        }
        if (!blocks.value[blockIndex].content.items) {
            blocks.value[blockIndex].content.items = [];
        }
        blocks.value[blockIndex].content.items.push('');
    }
};

const removeListItem = (blockIndex: number, itemIndex: number) => {
    if (blocks.value[blockIndex].type === 'list' && blocks.value[blockIndex].content?.items) {
        blocks.value[blockIndex].content.items.splice(itemIndex, 1);
    }
};

const onDragStart = (index: number) => {
    draggedIndex.value = index;
};

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
};

const onDrop = (index: number) => {
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
        const draggedBlock = blocks.value[draggedIndex.value];
        blocks.value.splice(draggedIndex.value, 1);
        blocks.value.splice(index, 0, draggedBlock);
    }
    draggedIndex.value = null;
};

const getBlockLabel = (type: Block['type']) => {
    return blockTypes.find(bt => bt.type === type)?.label || type;
};

const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};

const handleImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file || !editingBlock.value) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
    }

    uploadingImage.value = true;

    try {
        const formData = new FormData();
        formData.append('image', file);

        // Upload using fetch with CSRF token
        const response = await fetch('/admin/upload-image', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload gagal');
        }

        const data = await response.json();

        // Update image URL
        if (editingBlock.value.block.type === 'image') {
            editingBlock.value.block.content.url = data.url;
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('Gagal mengupload gambar. Silakan coba lagi.');
    } finally {
        uploadingImage.value = false;
        // Reset input
        target.value = '';
    }
};

</script>

<template>
    <div class="space-y-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Page Builder</CardTitle>
                        <CardDescription>Bangun konten dengan blok-blok yang dapat disesuaikan</CardDescription>
                    </div>
                    <Button @click="showBlockSelector = true">
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Blok
                    </Button>
                </div>
            </CardHeader>
            <CardContent class="space-y-4">
                <div v-if="blocks.length === 0" class="py-12 text-center border-2 border-dashed rounded-lg">
                    <p class="text-muted-foreground mb-4">Belum ada konten. Tambahkan blok untuk memulai.</p>
                    <Button @click="showBlockSelector = true">
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Blok Pertama
                    </Button>
                </div>

                <div v-for="(block, index) in blocks" :key="block.id"
                    class="group relative border rounded-lg p-4 hover:border-primary transition-colors"
                    draggable="true"
                    @dragstart="onDragStart(index)"
                    @dragover="onDragOver"
                    @drop="onDrop(index)"
                >
                    <div class="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                        <GripVertical class="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div class="pl-8">
                        <div class="flex items-center justify-between mb-3">
                            <Badge variant="secondary">{{ getBlockLabel(block.type) }}</Badge>
                            <div class="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    class="h-8 w-8"
                                    :disabled="index === 0"
                                    @click="moveBlock(index, 'up')"
                                >
                                    <ChevronUp class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    class="h-8 w-8"
                                    :disabled="index === blocks.length - 1"
                                    @click="moveBlock(index, 'down')"
                                >
                                    <ChevronDown class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    class="h-8 w-8"
                                    @click="editBlock(index)"
                                >
                                    <Edit class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    class="h-8 w-8 text-destructive"
                                    @click="removeBlock(index)"
                                >
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <!-- Preview Block -->
                        <div class="prose prose-sm max-w-none">
                            <component
                                :is="`h${block.content?.level || 2}`"
                                v-if="block.type === 'heading' && block.content"
                                class="font-bold"
                            >
                                {{ block.content?.text || 'Heading kosong' }}
                            </component>

                            <div v-else-if="block.type === 'paragraph' && block.content" class="prose prose-sm dark:prose-invert max-w-none" v-html="block.content?.text || '<p>Paragraf kosong</p>'"></div>

                            <div v-else-if="block.type === 'image' && block.content" class="space-y-2">
                                <img v-if="block.content?.url" :src="block.content.url" :alt="block.content?.alt || ''" class="rounded-lg max-h-64 object-cover" />
                                <div v-else class="bg-muted h-48 rounded-lg flex items-center justify-center">
                                    <ImageIcon class="h-12 w-12 text-muted-foreground" />
                                </div>
                                <p v-if="block.content?.caption" class="text-sm text-muted-foreground">{{ block.content.caption }}</p>
                            </div>

                            <ul v-else-if="block.type === 'list' && block.content && !block.content.ordered" class="list-disc list-inside">
                                <li v-for="(item, idx) in block.content?.items || []" :key="idx">{{ item || 'Item kosong' }}</li>
                            </ul>

                            <ol v-else-if="block.type === 'list' && block.content && block.content.ordered" class="list-decimal list-inside">
                                <li v-for="(item, idx) in block.content?.items || []" :key="idx">{{ item || 'Item kosong' }}</li>
                            </ol>

                            <blockquote v-else-if="block.type === 'quote' && block.content" class="border-l-4 border-primary pl-4 italic">
                                <p>{{ block.content?.text || 'Quote kosong' }}</p>
                                <footer v-if="block.content?.author" class="text-sm">— {{ block.content.author }}</footer>
                            </blockquote>

                            <pre v-else-if="block.type === 'code' && block.content" class="bg-muted p-4 rounded-lg overflow-x-auto"><code>{{ block.content?.code || '// Kode kosong' }}</code></pre>

                            <div v-else-if="block.type === 'video' && block.content" class="aspect-video">
                                <iframe
                                    v-if="block.content?.url && extractVideoId(block.content.url)"
                                    :src="`https://www.youtube.com/embed/${extractVideoId(block.content.url)}`"
                                    class="w-full h-full rounded-lg"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                />
                                <div v-else class="bg-muted h-full rounded-lg flex items-center justify-center">
                                    <Youtube class="h-12 w-12 text-muted-foreground" />
                                </div>
                            </div>

                            <hr v-else-if="block.type === 'divider'" class="my-4" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Block Selector Dialog -->
        <Dialog :open="showBlockSelector" @update:open="showBlockSelector = $event">
            <DialogContent class="max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Pilih Tipe Blok</DialogTitle>
                    <DialogDescription>Pilih blok yang ingin ditambahkan ke konten</DialogDescription>
                </DialogHeader>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                        v-for="blockType in blockTypes"
                        :key="blockType.type"
                        class="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-colors"
                        @click="addBlock(blockType.type as Block['type'])"
                    >
                        <component :is="blockType.icon" class="h-8 w-8" />
                        <span class="font-medium">{{ blockType.label }}</span>
                        <span class="text-xs text-muted-foreground text-center">{{ blockType.description }}</span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>

        <!-- Block Editor Dialog -->
        <Dialog :open="editingBlock !== null" @update:open="editingBlock = null">
            <DialogContent class="max-w-7xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit {{ editingBlock ? getBlockLabel(editingBlock.block.type) : '' }}</DialogTitle>
                </DialogHeader>

                <div v-if="editingBlock" class="space-y-4">
                    <!-- Heading Editor -->
                    <div v-if="editingBlock.block.type === 'heading'" class="space-y-4">
                        <div class="space-y-2">
                            <Label>Ukuran Heading</Label>
                            <Select v-model="editingBlock.block.content.level">
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih ukuran" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem :value="1">H1 - Heading 1</SelectItem>
                                    <SelectItem :value="2">H2 - Heading 2</SelectItem>
                                    <SelectItem :value="3">H3 - Heading 3</SelectItem>
                                    <SelectItem :value="4">H4 - Heading 4</SelectItem>
                                    <SelectItem :value="5">H5 - Heading 5</SelectItem>
                                    <SelectItem :value="6">H6 - Heading 6</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-2">
                            <Label>Teks Heading</Label>
                            <Input v-model="editingBlock.block.content.text" placeholder="Masukkan teks heading" />
                        </div>
                    </div>

                    <!-- Paragraph Editor -->
                    <div v-else-if="editingBlock.block.type === 'paragraph'" class="space-y-2">
                        <Label>Konten Paragraf</Label>
                        <TiptapEditor v-model="editingBlock.block.content.text" />
                        <p class="text-xs text-muted-foreground">Gunakan toolbar untuk memformat teks dengan rich text editor</p>
                    </div>

                    <!-- Image Editor -->
                    <div v-else-if="editingBlock.block.type === 'image'" class="space-y-4">
                        <!-- Input Method Selector -->
                        <div class="flex gap-2 p-1 bg-muted rounded-lg">
                            <button
                                type="button"
                                @click="imageInputMethod = 'url'"
                                :class="[
                                    'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    imageInputMethod === 'url'
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                ]"
                            >
                                URL
                            </button>
                            <button
                                type="button"
                                @click="imageInputMethod = 'upload'"
                                :class="[
                                    'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    imageInputMethod === 'upload'
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                ]"
                            >
                                Upload File
                            </button>
                        </div>

                        <!-- URL Input Method -->
                        <div v-if="imageInputMethod === 'url'" class="space-y-2">
                            <Label>URL Gambar</Label>
                            <Input v-model="editingBlock.block.content.url" placeholder="https://example.com/image.jpg" />
                            <p class="text-xs text-muted-foreground">Masukkan URL gambar dari internet</p>
                        </div>

                        <!-- File Upload Method -->
                        <div v-else class="space-y-2">
                            <Label>Upload Gambar</Label>
                            <div class="space-y-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    @change="handleImageUpload"
                                    :disabled="uploadingImage"
                                    class="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer disabled:opacity-50"
                                />
                                <p class="text-xs text-muted-foreground">
                                    {{ uploadingImage ? 'Mengupload...' : 'Format: JPG, PNG, GIF, WEBP. Maksimal 5MB' }}
                                </p>
                            </div>

                            <!-- Preview uploaded image -->
                            <div v-if="editingBlock.block.content.url" class="mt-2">
                                <Label class="text-xs">Preview:</Label>
                                <img :src="editingBlock.block.content.url" alt="Preview" class="mt-1 max-h-40 rounded-md border" />
                            </div>
                        </div>

                        <!-- Common fields -->
                        <div class="space-y-2">
                            <Label>Alt Text</Label>
                            <Input v-model="editingBlock.block.content.alt" placeholder="Deskripsi gambar" />
                        </div>
                        <div class="space-y-2">
                            <Label>Caption (Opsional)</Label>
                            <Input v-model="editingBlock.block.content.caption" placeholder="Caption gambar" />
                        </div>
                    </div>

                    <!-- List Editor -->
                    <div v-else-if="editingBlock.block.type === 'list'" class="space-y-4">
                        <div class="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                :checked="editingBlock.block.content.ordered"
                                @change="editingBlock.block.content.ordered = !editingBlock.block.content.ordered"
                                class="rounded"
                            />
                            <Label>List Berurutan (Numbered)</Label>
                        </div>
                        <div class="space-y-2">
                            <Label>Items</Label>
                            <div v-for="(item, idx) in editingBlock.block.content.items" :key="idx" class="flex gap-2">
                                <Input v-model="editingBlock.block.content.items[idx]" placeholder="Item list" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    @click="removeListItem(editingBlock.index, idx)"
                                    :disabled="editingBlock.block.content.items.length <= 1"
                                >
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                            <Button variant="outline" size="sm" @click="addListItem(editingBlock.index)">
                                <Plus class="mr-2 h-4 w-4" />
                                Tambah Item
                            </Button>
                        </div>
                    </div>

                    <!-- Quote Editor -->
                    <div v-else-if="editingBlock.block.type === 'quote'" class="space-y-4">
                        <div class="space-y-2">
                            <Label>Teks Quote</Label>
                            <Textarea v-model="editingBlock.block.content.text" rows="4" placeholder="Masukkan quote" />
                        </div>
                        <div class="space-y-2">
                            <Label>Author (Opsional)</Label>
                            <Input v-model="editingBlock.block.content.author" placeholder="Nama author" />
                        </div>
                    </div>

                    <!-- Code Editor -->
                    <div v-else-if="editingBlock.block.type === 'code'" class="space-y-4">
                        <div class="space-y-2">
                            <Label>Bahasa</Label>
                            <Select v-model="editingBlock.block.content.language">
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih bahasa" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                    <SelectItem value="php">PHP</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                    <SelectItem value="css">CSS</SelectItem>
                                    <SelectItem value="sql">SQL</SelectItem>
                                    <SelectItem value="bash">Bash</SelectItem>
                                    <SelectItem value="json">JSON</SelectItem>
                                    <SelectItem value="xml">XML</SelectItem>
                                    <SelectItem value="markdown">Markdown</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-2">
                            <Label>Kode</Label>
                            <MonacoEditor
                                v-model="editingBlock.block.content.code"
                                :language="editingBlock.block.content.language || 'javascript'"
                                height="300px"
                            />
                        </div>
                    </div>

                    <!-- Video Editor -->
                    <div v-else-if="editingBlock.block.type === 'video'" class="space-y-2">
                        <Label>URL Video YouTube</Label>
                        <Input v-model="editingBlock.block.content.url" placeholder="https://www.youtube.com/watch?v=..." />
                        <p class="text-sm text-muted-foreground">Masukkan URL video YouTube lengkap</p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" @click="editingBlock = null">Batal</Button>
                    <Button @click="saveBlockEdit">Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
