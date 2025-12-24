import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],

    optimizeDeps: {
        exclude: ['monaco-editor'],
    },

    ssr: {
        // External these packages from SSR - they will be loaded client-side only
        external: ['monaco-editor', 'monaco-editor-vue3', 'gojs'],
    },

    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                // Semua module dari node_modules dijadiin 1 chunk "vendor"
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
});
