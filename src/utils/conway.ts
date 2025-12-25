/**
 * Conway's Game of Life implementation
 * Rules:
 * 1. Any live cell with 2-3 live neighbors survives
 * 2. Any dead cell with exactly 3 live neighbors becomes alive
 * 3. All other cells die or stay dead
 */

export type Grid = boolean[][];

export interface GridDimensions {
  rows: number;
  cols: number;
}

/**
 * Creates an empty grid with the specified dimensions
 */
export function createEmptyGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}

/**
 * Creates a grid with random initial state
 */
export function createRandomGrid(rows: number, cols: number, density: number = 0.3): Grid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < density)
  );
}

/**
 * Counts live neighbors for a cell at position (row, col)
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
 * Computes the next generation of the grid
 */
export function nextGeneration(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const newGrid = createEmptyGrid(rows, cols);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = countNeighbors(grid, row, col);
      const isAlive = grid[row]?.[col] ?? false;

      if (isAlive && (neighbors === 2 || neighbors === 3)) {
        newGrid[row]![col] = true;
      } else if (!isAlive && neighbors === 3) {
        newGrid[row]![col] = true;
      }
    }
  }

  return newGrid;
}

/**
 * Checks if the grid is empty (all cells dead)
 */
export function isGridEmpty(grid: Grid): boolean {
  return grid.every(row => row.every(cell => !cell));
}
