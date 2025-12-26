import { CELL_SIZE, CELL_GAP, GRID_OFFSET_X, GRID_OFFSET_Y } from '../config/constants';
import type { Grid } from './conway';

/**
 * Canvas utilities for drawing grid-based content
 */

/**
 * Gets the CSS property value from the document root element
 * @param propertyName - CSS custom property name (e.g., '--color-primary')
 * @returns The trimmed string value of the CSS property
 */
export function getCSSProperty(propertyName: string): string {
  const computedStyle = getComputedStyle(document.documentElement);
  return computedStyle.getPropertyValue(propertyName).trim();
}

/**
 * Clears the entire canvas to transparent
 * @param canvas - The canvas element to clear
 * @param ctx - The 2D rendering context
 */
export function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Fills the entire canvas with a solid color
 * @param canvas - The canvas element to fill
 * @param ctx - The 2D rendering context
 * @param color - CSS color string (e.g., '#ffffff', 'rgb(255,255,255)')
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
 * @param gridCoord - Grid coordinate value (e.g., 5 means 5 cells)
 * @param cellSize - Size of each cell in pixels (defaults to CELL_SIZE constant)
 * @returns Pixel position
 */
export function gridToPixels(gridCoord: number, cellSize: number = CELL_SIZE): number {
  return gridCoord * cellSize;
}

/**
 * Calculates grid dimensions (rows and columns) that fit within the given canvas size
 * @param width - Canvas width in pixels
 * @param height - Canvas height in pixels
 * @param cellSize - Size of each cell in pixels (defaults to CELL_SIZE constant)
 * @returns Object containing cols and rows counts
 */
export function calculateGridDimensions(width: number, height: number, cellSize: number = CELL_SIZE): { cols: number; rows: number } {
  return {
    cols: Math.ceil(width / cellSize),
    rows: Math.ceil(height / cellSize),
  };
}

/**
 * Renders a Conway's Game of Life grid to the canvas with background and cells
 * Applies grid offsets (GRID_OFFSET_X, GRID_OFFSET_Y) automatically
 * @param canvas - The canvas element to render to
 * @param ctx - The 2D rendering context
 * @param grid - 2D boolean array representing the Conway grid state
 * @param bgColor - Background color CSS string
 * @param cellColor - Color for alive cells CSS string
 * @param cellAlpha - Opacity for alive cells (0-1, defaults to 1)
 * @param cellSize - Size of each cell in pixels (defaults to CELL_SIZE constant)
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
 * Draws a single cell at a specific pixel position with grid offset applied
 * Used for decorative logo blocks and positioned elements
 * @param ctx - The 2D rendering context
 * @param x - X pixel position (before offset is applied)
 * @param y - Y pixel position (before offset is applied)
 * @param color - Fill color CSS string
 * @param cellSize - Size of the cell in pixels (defaults to CELL_SIZE constant)
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
