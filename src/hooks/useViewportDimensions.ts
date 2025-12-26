import { useEffect, useState } from 'react';

export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Hook to track viewport dimensions
 * Updates on window resize
 */
export function useViewportDimensions(): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = (): void => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}
