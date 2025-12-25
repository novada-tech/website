/**
 * Configuration for decorative blocks around the logo
 * Each block is positioned relative to the logo center
 */

export interface BlockPosition {
  x: number; // pixels from logo center
  y: number; // pixels from logo center
  size?: number; // optional custom size in pixels
}

/**
 * Default block positions around the logo
 * These create a Conway's Game of Life aesthetic around the logo
 * Adjust these coordinates to customize the layout
 */
export const defaultBlockPositions: BlockPosition[] = [
  // Top left cluster
  { x: -180, y: -120 },
  { x: -160, y: -120 },
  { x: -140, y: -120 },
  { x: -180, y: -100 },
  { x: -140, y: -100 },

  // Top right cluster
  { x: 140, y: -120 },
  { x: 160, y: -120 },
  { x: 180, y: -120 },
  { x: 140, y: -100 },
  { x: 180, y: -100 },

  // Bottom left cluster
  { x: -180, y: 100 },
  { x: -160, y: 100 },
  { x: -140, y: 100 },
  { x: -180, y: 120 },
  { x: -140, y: 120 },

  // Bottom right cluster
  { x: 140, y: 100 },
  { x: 160, y: 100 },
  { x: 180, y: 100 },
  { x: 140, y: 120 },
  { x: 180, y: 120 },

  // Side clusters
  { x: -200, y: -20 },
  { x: -200, y: 0 },
  { x: -200, y: 20 },

  { x: 200, y: -20 },
  { x: 200, y: 0 },
  { x: 200, y: 20 },
];

export const blockSize = 18; // Default size in pixels
