import { useEffect, useState, RefObject } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

/**
 * Custom hook to measure container dimensions
 * Uses ResizeObserver for efficient updates when container size changes
 *
 * @param containerRef - React ref to the container element to measure
 * @returns Object with width and height of the container
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const dimensions = useContainerDimensions(containerRef);
 * ```
 */
export function useContainerDimensions(
  containerRef: RefObject<HTMLElement | null>
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = (): void => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Only update if we have valid dimensions
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };

    // Initial measurement with small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateDimensions, 0);

    // Use ResizeObserver for better reactivity
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [containerRef]);

  return dimensions;
}
