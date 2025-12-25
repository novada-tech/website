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
export const defaultBlockPositions: BlockPosition[] = [
  // Top left cluster
  { x: -9, y: -6 },
  { x: -8, y: -6 },
  { x: -7, y: -6 },
  { x: -9, y: -5 },
  { x: -7, y: -5 },

  // Top right cluster
  { x: 7, y: -6 },
  { x: 8, y: -6 },
  { x: 9, y: -6 },
  { x: 7, y: -5 },
  { x: 9, y: -5 },

  // Bottom left cluster
  { x: -9, y: 5 },
  { x: -8, y: 5 },
  { x: -7, y: 5 },
  { x: -9, y: 6 },
  { x: -7, y: 6 },

  // Bottom right cluster
  { x: 7, y: 5 },
  { x: 8, y: 5 },
  { x: 9, y: 5 },
  { x: 7, y: 6 },
  { x: 9, y: 6 },

  // Side clusters
  { x: -10, y: -1 },
  { x: -10, y: 0 },
  { x: -10, y: 1 },

  { x: 10, y: -1 },
  { x: 10, y: 0 },
  { x: 10, y: 1 },
];
