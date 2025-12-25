import { CELL_SIZE } from '../config/constants';

/**
 * Canvas utilities for drawing grid-based content
 */

export interface GridPosition {
  x: number; // grid column
  y: number; // grid row
}

/**
 * Gets the CSS variable color value from the document
 */
export function getCSSColor(variableName: string): string {
  const computedStyle = getComputedStyle(document.documentElement);
  return computedStyle.getPropertyValue(variableName).trim();
}

/**
 * Draws a single cell on the canvas at the specified grid position
 * Includes 1px gap for visual separation
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
  ctx.fillRect(gridX * CELL_SIZE, gridY * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
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
  ctx.fillRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1);
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
export function gridToPixels(gridCoord: number): number {
  return gridCoord * CELL_SIZE;
}

/**
 * Converts pixel position to grid coordinates
 */
export function pixelsToGrid(pixels: number): number {
  return Math.floor(pixels / CELL_SIZE);
}

/**
 * Calculates grid dimensions for a given canvas size
 */
export function calculateGridDimensions(width: number, height: number): { cols: number; rows: number } {
  return {
    cols: Math.ceil(width / CELL_SIZE),
    rows: Math.ceil(height / CELL_SIZE),
  };
}
