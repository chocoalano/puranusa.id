<script setup lang="ts">
import { ref, watch } from 'vue';
import MonacoEditor from 'monaco-editor-vue3';

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
        <MonacoEditor
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
