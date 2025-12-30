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
  const startRow = Math.max(0, Math.floor(gridOffsetY / cellSize));
  const startCol = Math.max(0, Math.floor(gridOffsetX / cellSize));
  const endRow = Math.min(grid.length, startRow + Math.ceil(canvas.height / cellSize) + 1);
  const endCol = Math.min(
    grid[0]?.length ?? 0,
    startCol + Math.ceil(canvas.width / cellSize) + 1
  );

  for (let i = startRow; i < endRow; i++) {
    const row = grid[i];
    if (!row) continue;
    for (let j = startCol; j < endCol; j++) {
      if (row[j]) {
        // Round to whole pixels to avoid sub-pixel rendering artifacts
        const pixelX = Math.round(j * cellSize - gridOffsetX + GRID_OFFSET_X);
        const pixelY = Math.round(i * cellSize - gridOffsetY + GRID_OFFSET_Y);
        ctx.fillRect(pixelX, pixelY, cellSize - CELL_GAP, cellSize - CELL_GAP);
      }
    }
  }
  ctx.globalAlpha = 1;
}

/**
 * Calculates the grid origin position to center grid cell (0,0) at the logo position
 *
 * NO SNAPPING - the logo position is used exactly as-is.
 *
 * Conceptual model:
 * - We have an infinite grid of cells, each of size cellSize x cellSize
 * - Grid cell (0, 0) should be centered exactly at (logoX, logoY)
 * - Cell (i, j) has its top-left corner at: gridOrigin + (i * cellSize, j * cellSize)
 * - Cell (i, j) has its center at: gridOrigin + (i * cellSize + cellSize/2, j * cellSize + cellSize/2)
 *
 * Therefore, if cell (0, 0) is centered at (logoX, logoY):
 *   logoX = gridOriginX + cellSize/2
 *   logoY = gridOriginY + cellSize/2
 *
 * Solving for gridOrigin:
 *   gridOriginX = logoX - cellSize/2
 *   gridOriginY = logoY - cellSize/2
 *
 * @param logoX - Logo center X position in pixels (exact, no snapping)
 * @param logoY - Logo center Y position in pixels (exact, no snapping)
 * @param cellSize - Size of each cell in pixels
 * @returns The exact position where grid cell (0,0)'s top-left corner should be drawn
 */
export function calculateGridOrigin(
  logoX: number,
  logoY: number,
  cellSize: number
): { gridOriginX: number; gridOriginY: number } {
  // Grid origin is logo position minus half cell size
  // This centers cell (0,0) exactly at the logo position
  const gridOriginX = logoX - cellSize / 2;
  const gridOriginY = logoY - cellSize / 2;

  return { gridOriginX, gridOriginY };
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
  // Round to whole pixels to avoid sub-pixel rendering artifacts (white lines between cells)
  const pixelX = Math.round(x + GRID_OFFSET_X);
  const pixelY = Math.round(y + GRID_OFFSET_Y);
  ctx.fillRect(pixelX, pixelY, cellSize - CELL_GAP, cellSize - CELL_GAP);
}
