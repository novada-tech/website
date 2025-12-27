/**
 * Shared constants used across the application
 */

/**
 * Size of each cell in pixels
 * Used for both Conway's Game of Life background and logo decorative blocks
 */
export const CELL_SIZE = 32;

/**
 * Pixel offset for all grid cells (x and y)
 * Allows fine-tuning grid alignment across the entire viewport
 */
export const GRID_OFFSET_X = 10;
export const GRID_OFFSET_Y = 0;

/**
 * Update interval for Conway's Game of Life simulation (in milliseconds)
 * Controls how frequently the simulation advances to the next generation
 */
export const CONWAY_UPDATE_INTERVAL = 1000;

/**
 * Gap between cells in pixels
 * Creates white line/separation between cells
 * 0 = no gap, 1 = 1px gap, 2 = 2px gap, etc.
 */
export const CELL_GAP = 0;
