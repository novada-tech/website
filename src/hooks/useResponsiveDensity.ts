import { DEFAULT_DENSITY } from '../config';
import { getBreakpointValue } from '../utils/get-breakpoint';

/**
 * Hook that returns a responsive density value based on Chakra UI breakpoints
 * Uses higher density on smaller screens for better visual presence
 */
export function useResponsiveDensity(): number {
  return getBreakpointValue(
    {
      base: DEFAULT_DENSITY.BASE,
      sm: DEFAULT_DENSITY.SM,
      md: DEFAULT_DENSITY.MD,
      lg: DEFAULT_DENSITY.LG,
    },
    DEFAULT_DENSITY.LG
  );
}
