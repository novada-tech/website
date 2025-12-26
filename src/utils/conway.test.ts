import { describe, it, expect } from 'vitest';
import {
  createEmptyGrid,
  createRandomGrid,
  countNeighbors,
  nextGeneration,
  isGridEmpty,
} from './conway';

describe('Conway Game of Life', () => {
  describe('createEmptyGrid', () => {
    it('should create a grid with correct dimensions', () => {
      const grid = createEmptyGrid(3, 4);
      expect(grid).toHaveLength(3);
      expect(grid[0]).toHaveLength(4);
    });

    it('should create a grid with all dead cells', () => {
      const grid = createEmptyGrid(2, 2);
      expect(grid.every((row) => row.every((cell) => !cell))).toBe(true);
    });
  });

  describe('createRandomGrid', () => {
    it('should create a grid with correct dimensions', () => {
      const grid = createRandomGrid(5, 6);
      expect(grid).toHaveLength(5);
      expect(grid[0]).toHaveLength(6);
    });

    it('should create a grid with some alive cells when density > 0', () => {
      const grid = createRandomGrid(10, 10, 0.5);
      const hasAliveCells = grid.some((row) => row.some((cell) => cell));
      expect(hasAliveCells).toBe(true);
    });
  });

  describe('countNeighbors', () => {
    it('should count neighbors correctly', () => {
      const grid = [
        [true, true, false],
        [true, false, false],
        [false, false, false],
      ];
      expect(countNeighbors(grid, 1, 1)).toBe(3);
    });

    it('should wrap around edges (toroidal topology)', () => {
      const grid = [
        [true, false, true],
        [false, false, false],
        [true, false, true],
      ];
      // Cell at (0,0) has neighbors at: (2,2), (2,0), (2,1), (0,2), (1,2), (0,1), (1,0), (1,1)
      // Only (2,2), (2,0), and (0,2) are alive = 3 neighbors
      expect(countNeighbors(grid, 0, 0)).toBe(3);
    });

    it('should not count the cell itself', () => {
      const grid = [
        [true, true, true],
        [true, true, true],
        [true, true, true],
      ];
      expect(countNeighbors(grid, 1, 1)).toBe(8);
    });
  });

  describe('nextGeneration', () => {
    it('should kill a cell with fewer than 2 neighbors (underpopulation)', () => {
      const grid = [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ];
      const next = nextGeneration(grid);
      expect(next[1]?.[1]).toBe(false);
    });

    it('should keep a cell alive with 2 or 3 neighbors', () => {
      const grid = [
        [true, true, false],
        [false, true, false],
        [false, false, false],
      ];
      const next = nextGeneration(grid);
      expect(next[0]?.[1]).toBe(true); // 2 neighbors
    });

    it('should kill a cell with more than 3 neighbors (overpopulation)', () => {
      const grid = [
        [true, true, true],
        [true, true, false],
        [false, false, false],
      ];
      const next = nextGeneration(grid);
      expect(next[1]?.[1]).toBe(false);
    });

    it('should birth a cell with exactly 3 neighbors', () => {
      const grid = [
        [true, true, false],
        [true, false, false],
        [false, false, false],
      ];
      const next = nextGeneration(grid);
      expect(next[1]?.[1]).toBe(true);
    });

    it('should handle the blinker pattern correctly', () => {
      const grid = [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
      ];
      const next = nextGeneration(grid);
      expect(next[1]?.[1]).toBe(false);
      expect(next[2]?.[1]).toBe(true);
      expect(next[2]?.[2]).toBe(true);
      expect(next[2]?.[3]).toBe(true);
    });
  });

  describe('isGridEmpty', () => {
    it('should return true for an empty grid', () => {
      const grid = createEmptyGrid(3, 3);
      expect(isGridEmpty(grid)).toBe(true);
    });

    it('should return false for a grid with alive cells', () => {
      const grid = [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ];
      expect(isGridEmpty(grid)).toBe(false);
    });
  });
});
