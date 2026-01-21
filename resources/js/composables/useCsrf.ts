/**
 * Composable for handling CSRF token refresh and validation
 */

export const useCsrf = () => {
    const getCookieValue = (name: string): string | null => {
        const escaped = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
        return match ? decodeURIComponent(match[1]) : null;
    };

    /**
     * Get current CSRF token from meta tag
     */
    const getCsrfToken = (): string | null => {
        const cookieToken = getCookieValue('XSRF-TOKEN');
        if (cookieToken) {
            updateCsrfToken(cookieToken);
            return cookieToken;
        }

        const token = document.head.querySelector('meta[name="csrf-token"]');
        return token ? (token as HTMLMetaElement).content : null;
    };

    /**
     * Refresh CSRF token from server
     */
    const refreshCsrfToken = async (): Promise<string | null> => {
        try {
            const response = await fetch('/csrf-token', {
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
