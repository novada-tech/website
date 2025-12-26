import { CELL_SIZE, CELL_GAP, GRID_OFFSET_X, GRID_OFFSET_Y } from '../config/constants';
import type { Grid } from './conway';

/**
 * Canvas utilities for drawing grid-based content
 */

/**
 * Gets the CSS property value from the document
 */
export function getCSSProperty(propertyName: string): string {
  const computedStyle = getComputedStyle(document.documentElement);
  return computedStyle.getPropertyValue(propertyName).trim();
}

/**
 * Draws a single cell on the canvas at the specified grid position
 * Includes gap for visual separation (controlled by CELL_GAP constant)
 */
export function drawCell(
  ctx: CanvasRenderingContext2D,
  gridX: number,
  gridY: number,
  color: string,
  alpha: number = 1
): void {
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.fillRect(gridX * CELL_SIZE, gridY * CELL_SIZE, CELL_SIZE - CELL_GAP, CELL_SIZE - CELL_GAP);
  ctx.globalAlpha = 1;
}

/**
 * Draws a cell at a specific pixel position (not grid-aligned)
 * Used for positioned elements like logo blocks
 */
export function drawCellAtPosition(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  alpha: number = 1
): void {
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.fillRect(x, y, CELL_SIZE - CELL_GAP, CELL_SIZE - CELL_GAP);
  ctx.globalAlpha = 1;
}

/**
 * Clears the entire canvas
 */
export function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Fills the canvas with a solid color
 */
export function fillCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  color: string
): void {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Converts grid coordinates to pixel position
 */
export function gridToPixels(gridCoord: number, cellSize: number = CELL_SIZE): number {
  return gridCoord * cellSize;
}

/**
 * Converts pixel position to grid coordinates
 */
export function pixelsToGrid(pixels: number, cellSize: number = CELL_SIZE): number {
  return Math.floor(pixels / cellSize);
}

/**
 * Calculates grid dimensions for a given canvas size
 */
export function calculateGridDimensions(width: number, height: number, cellSize: number = CELL_SIZE): { cols: number; rows: number } {
  return {
    cols: Math.ceil(width / cellSize),
    rows: Math.ceil(height / cellSize),
  };
}

/**
 * Renders a Conway grid to the canvas with background and cells
 * Applies grid offsets automatically
 */
export function renderConwayGrid(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  bgColor: string,
  cellColor: string,
  cellAlpha: number = 1,
  cellSize: number = CELL_SIZE
): void {
  clearCanvas(canvas, ctx);
  fillCanvas(canvas, ctx, bgColor);

  ctx.fillStyle = cellColor;
  ctx.globalAlpha = cellAlpha;
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]!;
    for (let j = 0; j < row.length; j++) {
      if (row[j]) {
        ctx.fillRect(j * cellSize + GRID_OFFSET_X, i * cellSize + GRID_OFFSET_Y, cellSize - CELL_GAP, cellSize - CELL_GAP);
      }
    }
  }
  ctx.globalAlpha = 1;
}

/**
 * Draws a cell at a specific pixel position with grid offset applied
 */
export function drawCellWithOffset(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  cellSize: number = CELL_SIZE
): void {
  ctx.fillStyle = color;
  ctx.fillRect(x + GRID_OFFSET_X, y + GRID_OFFSET_Y, cellSize - CELL_GAP, cellSize - CELL_GAP);
}
