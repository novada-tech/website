import { CELL_SIZE, CELL_GAP, GRID_OFFSET_X, GRID_OFFSET_Y } from '../config';
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
 * Grid is 110% of canvas size with a minimum of 40 cells per dimension
 * Extra cells extend beyond canvas borders but still participate in simulation
 * @param width - Canvas width in pixels
 * @param height - Canvas height in pixels
 * @param cellSize - Size of each cell in pixels (defaults to CELL_SIZE constant)
 * @returns Object containing cols, rows, offsetX, and offsetY (offset to center canvas in grid)
 */
export function calculateGridDimensions(
  width: number,
  height: number,
  cellSize: number = CELL_SIZE
): { cols: number; rows: number; offsetX: number; offsetY: number } {
  // Calculate base dimensions at 110% of canvas size
  const baseCols = Math.ceil((width * 1.1) / cellSize);
  const baseRows = Math.ceil((height * 1.1) / cellSize);

  // Apply minimum of 40 cells
  const cols = Math.max(40, baseCols);
  const rows = Math.max(40, baseRows);

  // Calculate visible cells (what fits in canvas)
  const visibleCols = Math.ceil(width / cellSize);
  const visibleRows = Math.ceil(height / cellSize);

  // Calculate offset to center the canvas in the virtual grid
  const offsetX = Math.floor((cols - visibleCols) / 2) * cellSize;
  const offsetY = Math.floor((rows - visibleRows) / 2) * cellSize;

  return {
    cols,
    rows,
    offsetX,
    offsetY,
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
 * @param gridOffsetX - X offset in pixels to center canvas in virtual grid (defaults to 0)
 * @param gridOffsetY - Y offset in pixels to center canvas in virtual grid (defaults to 0)
 */
export function renderConwayGrid(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  bgColor: string,
  cellColor: string,
  cellAlpha: number = 1,
  cellSize: number = CELL_SIZE,
  gridOffsetX: number = 0,
  gridOffsetY: number = 0
): void {
  clearCanvas(canvas, ctx);
  fillCanvas(canvas, ctx, bgColor);

  ctx.fillStyle = cellColor;
  ctx.globalAlpha = cellAlpha;

  // Calculate which portion of the grid to render
  const startRow = Math.floor(gridOffsetY / cellSize);
  const startCol = Math.floor(gridOffsetX / cellSize);
  const endRow = Math.min(grid.length, startRow + Math.ceil(canvas.height / cellSize) + 1);
  const endCol = Math.min(
    grid[0]?.length ?? 0,
    startCol + Math.ceil(canvas.width / cellSize) + 1
  );

  for (let i = startRow; i < endRow; i++) {
    const row = grid[i]!;
    for (let j = startCol; j < endCol; j++) {
      if (row[j]) {
        ctx.fillRect(
          j * cellSize - gridOffsetX + GRID_OFFSET_X,
          i * cellSize - gridOffsetY + GRID_OFFSET_Y,
          cellSize - CELL_GAP,
          cellSize - CELL_GAP
        );
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
