<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { watch } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Heading1,
    Heading2,
    Heading3,
    UnderlineIcon,
} from 'lucide-vue-next';

interface Props {
    modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const editor = useEditor({
    content: props.modelValue || '',
    extensions: [
        StarterKit,
        Link.configure({
            openOnClick: false,
        }),
        Image,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Underline,
    ],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML());
    },
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none max-w-none p-4 min-h-[200px]',
        },
    },
});

watch(() => props.modelValue, (value) => {
    const isSame = editor.value?.getHTML() === value;
    if (!isSame && editor.value) {
        editor.value.commands.setContent(value || '', { emitUpdate: false });
    }
});

const setLink = () => {
    const url = window.prompt('Enter URL');
    if (url && editor.value) {
        editor.value.chain().focus().setLink({ href: url }).run();
    }
};
</script>

<template>
    <div v-if="editor" class="border rounded-lg overflow-hidden">
        <!-- Toolbar -->
        <div class="flex flex-wrap gap-1 p-2 bg-muted border-b">
            <!-- Text Formatting -->
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'bg-accent': editor.isActive('bold') }"
                title="Bold"
            >
                <Bold class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'bg-accent': editor.isActive('italic') }"
                title="Italic"
            >
                <Italic class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'bg-accent': editor.isActive('underline') }"
                title="Underline"
            >
                <UnderlineIcon class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'bg-accent': editor.isActive('strike') }"
                title="Strikethrough"
            >
                <Strikethrough class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleCode().run()"
                :class="{ 'bg-accent': editor.isActive('code') }"
                title="Inline Code"
            >
                <Code class="h-4 w-4" />
            </Button>

            <div class="w-px h-6 bg-border mx-1" />

            <!-- Headings -->
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'bg-accent': editor.isActive('heading', { level: 1 }) }"
                title="Heading 1"
            >
                <Heading1 class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'bg-accent': editor.isActive('heading', { level: 2 }) }"
                title="Heading 2"
            >
                <Heading2 class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'bg-accent': editor.isActive('heading', { level: 3 }) }"
                title="Heading 3"
            >
                <Heading3 class="h-4 w-4" />
            </Button>

            <div class="w-px h-6 bg-border mx-1" />

            <!-- Lists -->
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'bg-accent': editor.isActive('bulletList') }"
                title="Bullet List"
            >
                <List class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'bg-accent': editor.isActive('orderedList') }"
                title="Ordered List"
            >
                <ListOrdered class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'bg-accent': editor.isActive('blockquote') }"
                title="Quote"
            >
                <Quote class="h-4 w-4" />
            </Button>

            <div class="w-px h-6 bg-border mx-1" />

            <!-- Alignment -->
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().setTextAlign('left').run()"
                :class="{ 'bg-accent': editor.isActive({ textAlign: 'left' }) }"
                title="Align Left"
            >
                <AlignLeft class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().setTextAlign('center').run()"
                :class="{ 'bg-accent': editor.isActive({ textAlign: 'center' }) }"
                title="Align Center"
            >
                <AlignCenter class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().setTextAlign('right').run()"
                :class="{ 'bg-accent': editor.isActive({ textAlign: 'right' }) }"
                title="Align Right"
            >
                <AlignRight class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().setTextAlign('justify').run()"
                :class="{ 'bg-accent': editor.isActive({ textAlign: 'justify' }) }"
                title="Align Justify"
            >
                <AlignJustify class="h-4 w-4" />
            </Button>

            <div class="w-px h-6 bg-border mx-1" />

            <!-- Link -->
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="setLink"
                :class="{ 'bg-accent': editor.isActive('link') }"
                title="Insert Link"
            >
                <Link2 class="h-4 w-4" />
            </Button>

            <div class="w-px h-6 bg-border mx-1" />

            <!-- Undo/Redo -->
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().undo().run()"
                :disabled="!editor.can().undo()"
                title="Undo"
            >
                <Undo class="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                type="button"
                @click="editor.chain().focus().redo().run()"
                :disabled="!editor.can().redo()"
                title="Redo"
            >
                <Redo class="h-4 w-4" />
            </Button>
        </div>

        <!-- Editor Content -->
        <EditorContent :editor="editor" />
    </div>
</template>

<style>
.tiptap {
    outline: none;
}

.tiptap p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}
</style>
