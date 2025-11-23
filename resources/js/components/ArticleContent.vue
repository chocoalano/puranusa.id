<script setup lang="ts">
interface Block {
    id: string;
    type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code' | 'video' | 'divider';
    content: any;
}

interface Props {
    blocks: Block[] | string;
}

const props = defineProps<Props>();

const parsedBlocks = typeof props.blocks === 'string'
    ? JSON.parse(props.blocks)
    : props.blocks;

const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};
</script>

<template>
    <article class="prose prose-lg max-w-none dark:prose-invert">
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
            <div v-else-if="block.type === 'paragraph'" class="leading-relaxed" v-html="block.content.text"></div>

            <!-- Image -->
            <figure v-else-if="block.type === 'image'" class="my-8">
                <img
                    :src="block.content.url"
                    :alt="block.content.alt"
                    class="rounded-lg w-full object-cover shadow-lg"
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
            <blockquote v-else-if="block.type === 'quote'" class="border-l-4 border-primary pl-6 py-2 italic bg-muted/30 rounded-r-lg my-6">
                <p class="text-lg">{{ block.content.text }}</p>
                <footer v-if="block.content.author" class="mt-2 text-sm font-semibold not-italic">
                    — {{ block.content.author }}
                </footer>
            </blockquote>

            <!-- Code -->
            <div v-else-if="block.type === 'code'" class="my-6">
                <div class="bg-muted px-4 py-2 rounded-t-lg border-b border-border">
                    <span class="text-xs font-mono text-muted-foreground uppercase">{{ block.content.language }}</span>
                </div>
                <pre class="!mt-0 rounded-t-none"><code class="language-{{ block.content.language }}">{{ block.content.code }}</code></pre>
            </div>

            <!-- Video -->
            <div v-else-if="block.type === 'video'" class="my-8 aspect-video rounded-lg overflow-hidden shadow-lg">
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
            <hr v-else-if="block.type === 'divider'" class="my-8 border-border" />
        </template>
    </article>
</template>
