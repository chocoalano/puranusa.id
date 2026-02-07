<script setup lang="ts">
import { computed } from 'vue';
interface Block {
    id: string;
    type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code' | 'video' | 'divider';
    content: any;
}

interface Props {
    blocks: Block[] | string;
}

const props = defineProps<Props>();

const parsedBlocks = computed(() => {
    if (typeof props.blocks !== 'string') {
        return props.blocks;
    }

    try {
        return JSON.parse(props.blocks);
    } catch {
        return null;
    }
});

const isHtmlContent = computed(() => typeof props.blocks === 'string' && parsedBlocks.value === null);

const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};
</script>

<template>
    <article class="max-w-none text-foreground">
        <div
            v-if="isHtmlContent"
            class="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-img:rounded-lg prose-img:border prose-hr:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-lg [&_th]:border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_td]:border [&_td]:px-3 [&_td]:py-2"
            v-html="props.blocks"
        />

        <div v-else class="space-y-6">
            <template v-for="block in parsedBlocks" :key="block.id">
            <!-- Heading -->
            <component
                :is="`h${block.content.level || 2}`"
                v-if="block.type === 'heading'"
                class="font-bold tracking-tight"
            >
                {{ block.content.text }}
            </component>

            <!-- Paragraph -->
            <div v-else-if="block.type === 'paragraph'" class="leading-relaxed text-base" v-html="block.content.text"></div>

            <!-- Image -->
            <figure v-else-if="block.type === 'image'" class="space-y-2">
                <img
                    :src="block.content.url"
                    :alt="block.content.alt"
                    class="rounded-lg w-full object-cover border"
                />
                <figcaption v-if="block.content.caption" class="mt-2 text-center text-sm text-muted-foreground">
                    {{ block.content.caption }}
                </figcaption>
            </figure>

            <!-- List -->
            <ul v-if="block.type === 'list' && !block.content.ordered" class="list-disc list-inside space-y-2">
                <li v-for="(item, idx) in block.content.items" :key="idx">{{ item }}</li>
            </ul>

            <ol v-else-if="block.type === 'list' && block.content.ordered" class="list-decimal list-inside space-y-2">
                <li v-for="(item, idx) in block.content.items" :key="idx">{{ item }}</li>
            </ol>

            <!-- Quote -->
            <blockquote v-else-if="block.type === 'quote'" class="rounded-lg border-l-4 border-primary bg-muted/30 px-5 py-3 italic">
                <p class="text-lg">{{ block.content.text }}</p>
                <footer v-if="block.content.author" class="mt-2 text-sm font-semibold not-italic">
                    — {{ block.content.author }}
                </footer>
            </blockquote>

            <!-- Code -->
            <div v-else-if="block.type === 'code'" class="rounded-lg border overflow-hidden">
                <div class="bg-muted px-4 py-2 border-b border-border">
                    <span class="text-xs font-mono text-muted-foreground uppercase">{{ block.content.language }}</span>
                </div>
                <pre class="!mt-0"><code class="language-{{ block.content.language }}">{{ block.content.code }}</code></pre>
            </div>

            <!-- Video -->
            <div v-else-if="block.type === 'video'" class="aspect-video rounded-lg overflow-hidden border">
                <iframe
                    v-if="extractVideoId(block.content.url)"
                    :src="`https://www.youtube.com/embed/${extractVideoId(block.content.url)}`"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            </div>

            <!-- Divider -->
            <hr v-else-if="block.type === 'divider'" class="border-border" />
            </template>
        </div>
    </article>
</template>
