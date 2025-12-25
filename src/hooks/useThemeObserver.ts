import { useEffect } from 'react';

/**
 * Hook to observe theme changes via data-theme attribute
 * Calls the provided callback when theme changes
 */
export function useThemeObserver(callback: () => void): void {
  useEffect(() => {
    const observer = new MutationObserver(callback);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [callback]);
}
