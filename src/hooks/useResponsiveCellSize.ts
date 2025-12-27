import { CELL_SIZE } from '../config/constants';
import { CELL_SIZE_MULTIPLIERS } from '../config/conway';
import { getBreakpointValue } from '../utils/get-breakpoint';

/**
 * Hook that returns a responsive cell size based on Chakra UI breakpoints
 * Scales down cell size on smaller screens to maintain proper proportions
 */
export function useResponsiveCellSize(): number {
  return getBreakpointValue(
    {
      base: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.BASE),
      sm: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.SM),
      md: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.MD),
      lg: Math.round(CELL_SIZE * CELL_SIZE_MULTIPLIERS.LG),
    },
    CELL_SIZE
  );
}
