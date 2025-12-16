<script setup lang="ts">
import { ref, watch, onMounted, defineAsyncComponent, shallowRef } from 'vue';

interface Props {
    modelValue: string;
    language?: string;
    height?: string;
}

const props = withDefaults(defineProps<Props>(), {
    language: 'javascript',
    height: '400px',
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const localValue = ref(props.modelValue || '');
const isClient = ref(false);

// Dynamically import Monaco Editor only on client side
const MonacoEditorComponent = shallowRef<any>(null);

onMounted(async () => {
    isClient.value = true;
    // Dynamic import to avoid SSR issues
    const module = await import('monaco-editor-vue3');
    MonacoEditorComponent.value = module.default;
});

watch(() => props.modelValue, (newValue) => {
    if (localValue.value !== newValue) {
        localValue.value = newValue || '';
    }
});

const handleChange = (value: string) => {
    localValue.value = value;
    emit('update:modelValue', value);
};
</script>

<template>
    <div class="border rounded-md overflow-hidden">
        <!-- Loading state for SSR -->
        <div v-if="!isClient || !MonacoEditorComponent"
            class="flex items-center justify-center bg-zinc-900 text-zinc-400"
            :style="{ height: height }"
        >
            <div class="text-center">
                <div class="animate-pulse">Loading editor...</div>
            </div>
        </div>

        <!-- Monaco Editor (client-side only) -->
        <component
            v-else
            :is="MonacoEditorComponent"
            :value="localValue"
            :language="language"
            :height="height"
            theme="vs-dark"
            :options="{
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                wrappingIndent: 'indent',
                tabSize: 2,
                insertSpaces: true,
            }"
            @change="handleChange"
        />
    </div>
</template>
