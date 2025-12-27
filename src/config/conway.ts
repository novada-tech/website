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
 * Responsive cell size multipliers based on viewport width
 * These multipliers are applied to the base CELL_SIZE from config/constants
 */
export const CELL_SIZE_MULTIPLIERS = {
  BASE: 0.65, // Mobile devices
  SM: 0.75, // Small tablets
  MD: 1.0, // Medium screens (desktop)
  LG: 1.0, // Large screens
} as const;
