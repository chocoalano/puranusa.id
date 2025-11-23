/**
 * Composable for handling CSRF token refresh and validation
 */

export const useCsrf = () => {
    /**
     * Get current CSRF token from meta tag
     */
    const getCsrfToken = (): string | null => {
        const token = document.head.querySelector('meta[name="csrf-token"]');
        return token ? (token as HTMLMetaElement).content : null;
    };

    /**
     * Refresh CSRF token from server
     */
    const refreshCsrfToken = async (): Promise<string | null> => {
        try {
            const response = await fetch('/sanctum/csrf-cookie', {
                credentials: 'same-origin',
            });
            
            if (response.ok) {
                // Wait a bit for cookie to be set
                await new Promise(resolve => setTimeout(resolve, 100));
                return getCsrfToken();
            }
        } catch (error) {
            console.error('Failed to refresh CSRF token:', error);
        }
        return null;
    };

    /**
     * Update CSRF token in meta tag
     */
    const updateCsrfToken = (token: string): void => {
        const metaTag = document.head.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
            (metaTag as HTMLMetaElement).content = token;
        }
    };

    return {
        getCsrfToken,
        refreshCsrfToken,
        updateCsrfToken,
    };
};
