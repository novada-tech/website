import { useBreakpointValue } from '@chakra-ui/react';
import { DEFAULT_DENSITY } from '../config';

/**
 * Hook that returns a responsive density value based on Chakra UI breakpoints
 * Uses higher density on smaller screens for better visual presence
 */
export function useResponsiveDensity(): number {
  const density = useBreakpointValue(
    {
      base: DEFAULT_DENSITY.BASE,
      sm: DEFAULT_DENSITY.SM,
      md: DEFAULT_DENSITY.MD,
      lg: DEFAULT_DENSITY.LG,
    },
    {
      fallback: 'lg', // Default to desktop density during SSR
    }
  );

  return density ?? DEFAULT_DENSITY.LG;
}
