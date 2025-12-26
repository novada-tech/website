/**
 * Conway's Game of Life simulation constants
 */

/**
 * Default density for random grid initialization (0-1)
 */
export const DEFAULT_DENSITY = 0.20;

/**
 * Responsive cell size multipliers based on viewport width
 * These multipliers are applied to the base CELL_SIZE from config/constants
 */
export const CELL_SIZE_MULTIPLIERS = {
  BASE: 0.7,   // Mobile devices
  SM: 0.8,     // Small tablets
  MD: 1.0,     // Medium screens (desktop)
  LG: 1.0,     // Large screens
} as const;
