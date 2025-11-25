import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initializeTheme } from './composables/useAppearance';
import 'vue-sonner/style.css';
import Toaster from '@/components/ui/sonner/Sonner.vue';
import axios from 'axios';

// Helper function to get fresh CSRF token
const getCsrfToken = (): string | null => {
    const token = document.head.querySelector('meta[name="csrf-token"]');
    return token ? (token as HTMLMetaElement).content : null;
};

// Helper function to refresh CSRF token from server
const refreshCsrfToken = async (): Promise<string | null> => {
    try {
        const response = await fetch('/sanctum/csrf-cookie', {
            credentials: 'same-origin',
        });
        if (response.ok) {
            return getCsrfToken();
        }
    } catch (error) {
        console.error('Failed to refresh CSRF token:', error);
    }
    return null;
};

// Configure axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

// Set initial CSRF token
const initialToken = getCsrfToken();
if (initialToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = initialToken;
}

// Axios request interceptor to ensure fresh token
axios.interceptors.request.use(
    (config) => {
        const token = getCsrfToken();
        if (token && config.headers) {
            config.headers['X-CSRF-TOKEN'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Axios response interceptor to handle 419 errors
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }> = [];

const processQueue = (error: unknown = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 419 CSRF token mismatch
        if (error.response?.status === 419 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axios(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshCsrfToken();
                if (newToken) {
                    axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken;
                    originalRequest.headers['X-CSRF-TOKEN'] = newToken;
                    processQueue();
                    return axios(originalRequest);
                } else {
                    processQueue(new Error('Failed to refresh CSRF token'));
                    // Reload page to get fresh token
                    window.location.reload();
                }
            } catch (refreshError) {
                processQueue(refreshError);
                // Reload page if refresh fails
                window.location.reload();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Don't auto-redirect on 401/403 - let components handle it
        // This allows components to check the response and redirect appropriately
        // (e.g., client routes should redirect to /client/login, admin to /login)

        return Promise.reject(error);
    }
);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({
            render: () =>
                h('div', [h(App, props), h(Toaster, { position: 'top-right' })]),
        });

        app.use(plugin).mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// Inertia error handler for 419 responses
router.on('error', (event) => {
    const response = (event.detail as any).response;

    // Handle 419 CSRF token mismatch
    if (response?.status === 419) {
        event.preventDefault();

        // Refresh CSRF token and retry
        refreshCsrfToken().then((newToken) => {
            if (newToken) {
                // Retry the request - just reload the page with options
                router.reload({ only: [] });
            } else {
                // If refresh fails, reload page
                window.location.reload();
            }
        });
    }
});// This will set light / dark mode on page load...
initializeTheme();
