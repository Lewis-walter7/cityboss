import { useEffect, useState } from 'react';

/**
 * Custom hook for media queries with better performance than resize listeners
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        // Set initial value
        setMatches(media.matches);

        // Create listener
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

        // Modern browsers
        if (media.addEventListener) {
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        }

        // Fallback for older browsers
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [query]);

    return matches;
}
