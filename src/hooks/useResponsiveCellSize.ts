import { useBreakpointValue } from '@chakra-ui/react';
import { CELL_SIZE } from '../config/constants';
import { CELL_SIZE_MULTIPLIERS } from '../config/conway';

/**
 * Hook that returns a responsive cell size based on Chakra UI breakpoints
 * Scales down cell size on smaller screens to maintain proper proportions
 */
export function useResponsiveCellSize(): number {
  const cellSize = useBreakpointValue(
    {
      base: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.BASE),
      sm: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.SM),
      md: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.MD),
      lg: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.LG),
    },
    {
      fallback: 'lg', // Default to desktop size during SSR
    }
  );

  return cellSize ?? CELL_SIZE;
}
