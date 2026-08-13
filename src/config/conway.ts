/**
 * Conway's Game of Life simulation constants
 */

/**
 * Responsive density values for random grid initialization (0-1)
 * Higher density on smaller screens for better visual presence
 */
export const DEFAULT_DENSITY = {
  BASE: 0.3, // Mobile devices
  SM: 0.25, // Small tablets
  MD: 0.20, // Medium screens (desktop)
  LG: 0.15, // Large screens
} as const;

/**
 * The virtual grid is larger than the canvas so cells can enter and leave the
 * visible area. Expressed as a numerator over a denominator rather than 1.1,
 * because `width * 1.1` is not exact in binary and rounds a whole number of
 * columns up to the next one.
 */
export const GRID_OVERSCAN = { NUMERATOR: 11, DENOMINATOR: 10 } as const;

/** Smallest virtual grid in either dimension, so small viewports still simulate. */
export const MIN_GRID_CELLS = 40;

/**
 * Responsive cell size multipliers based on viewport width
 * These multipliers are applied to the base CELL_SIZE from config/constants
 */
export const CELL_SIZE_MULTIPLIERS = {
  BASE: 0.65, // Mobile devices
  SM: 0.75, // Small tablets
  MD: 1.0, // Medium screens (desktop)
  LG: 1.0, // Large screens
} as const;
