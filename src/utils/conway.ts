/**
 * Conway's Game of Life implementation
 * Rules:
 * 1. Any live cell with 2-3 live neighbors survives
 * 2. Any dead cell with exactly 3 live neighbors becomes alive
 * 3. All other cells die or stay dead
 */

export type Grid = boolean[][];

/**
 * Creates an empty grid with all cells dead (false)
 * @param rows - Number of rows in the grid
 * @param cols - Number of columns in the grid
 * @returns A 2D boolean array with all values set to false
 */
export function createEmptyGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}

/**
 * Creates a grid with random initial state based on density
 * @param rows - Number of rows in the grid
 * @param cols - Number of columns in the grid
 * @param density - Probability (0-1) that a cell will be alive (defaults to 0.3)
 * @returns A 2D boolean array with randomly populated cells
 */
export function createRandomGrid(rows: number, cols: number, density: number = 0.3): Grid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < density)
  );
}

/**
 * Counts live neighbors for a cell at position (row, col)
 * Uses wraparound (toroidal) topology - edges connect to opposite edges
 * @param grid - The Conway grid to analyze
 * @param row - Row index of the cell to check
 * @param col - Column index of the cell to check
 * @returns Count of living neighbors (0-8)
 */
export function countNeighbors(grid: Grid, row: number, col: number): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const newRow = (row + i + rows) % rows;
      const newCol = (col + j + cols) % cols;

      if (grid[newRow]?.[newCol]) {
        count++;
      }
    }
  }

  return count;
}

/**
 * Computes the next generation of Conway's Game of Life
 * Mutates targetGrid in place to avoid memory allocations (efficient for animations)
 * Applies standard Conway rules:
 * - Live cell with 2-3 neighbors: stays alive
 * - Dead cell with exactly 3 neighbors: becomes alive
 * - All other cells: die or stay dead
 * @param sourceGrid - The current generation grid (read-only)
 * @param targetGrid - The grid to write the next generation to (will be mutated)
 */
export function nextGenerationInPlace(sourceGrid: Grid, targetGrid: Grid): void {
  const rows = sourceGrid.length;
  const cols = sourceGrid[0]?.length ?? 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = countNeighbors(sourceGrid, row, col);
      const isAlive = sourceGrid[row]?.[col] ?? false;

      if (isAlive && (neighbors === 2 || neighbors === 3)) {
        targetGrid[row]![col] = true;
      } else if (!isAlive && neighbors === 3) {
        targetGrid[row]![col] = true;
      } else {
        targetGrid[row]![col] = false;
      }
    }
  }
}

/**
 * Computes the next generation of the grid (deprecated - use nextGenerationInPlace)
 * @deprecated Use nextGenerationInPlace for better performance
 */
export function nextGeneration(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const newGrid = createEmptyGrid(rows, cols);
  nextGenerationInPlace(grid, newGrid);
  return newGrid;
}

/**
 * Checks if the grid is empty (all cells dead)
 * Used to detect when the simulation has died out and needs reseeding
 * @param grid - The Conway grid to check
 * @returns True if all cells are dead, false if any cell is alive
 */
export function isGridEmpty(grid: Grid): boolean {
  return grid.every((row) => row.every((cell) => !cell));
}
