import { useBreakpointValue } from '@chakra-ui/react';
import { CELL_SIZE } from '../config/constants';

/**
 * Hook that returns a responsive cell size based on Chakra UI breakpoints
 * Scales down cell size on smaller screens to maintain proper proportions
 */
export function useResponsiveCellSize(): number {
  const cellSize = useBreakpointValue(
    {
      base: Math.round(CELL_SIZE * 0.7),
      sm: Math.round(CELL_SIZE * 0.80),
      md: CELL_SIZE,
      lg: CELL_SIZE,
    },
    {
      fallback: 'lg', // Default to desktop size during SSR
    }
  );

  return cellSize ?? CELL_SIZE;
}
