/**
 * Configuration for decorative blocks around the logo
 * Each block is positioned using grid coordinates relative to the logo center
 */

export interface BlockPosition {
  x: number; // grid units from logo center (multiplied by CELL_SIZE)
  y: number; // grid units from logo center (multiplied by CELL_SIZE)
}

/**
 * Default block positions around the logo
 * These create a Conway's Game of Life aesthetic around the logo
 * Coordinates are in grid units (each unit = CELL_SIZE pixels)
 * Adjust these coordinates to customize the layout
 */
export const defaultBlockPositions: readonly BlockPosition[] = [
  // Top right cluster
  { x: 5, y: -2 },
  { x: 6, y: -1 },

  // Top middle cluster
  { x: -2, y: -2 },
  { x: -3, y: -2 },

  // Bottom middle cluster
  { x: -1, y: 2 },
  { x: 0, y: 2 },

  // Bottom left cluster
  { x: -6, y: 2 },
  { x: -7, y: 1 },
] as const;
