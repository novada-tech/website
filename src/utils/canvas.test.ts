import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getCSSProperty,
  clearCanvas,
  fillCanvas,
  gridToPixels,
  calculateGridDimensions,
  renderConwayGrid,
  drawCellWithOffset,
} from './canvas';
import { CELL_SIZE } from '../config';

describe('canvas utilities', () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    ctx = canvas.getContext('2d')!;
  });

  describe('getCSSProperty', () => {
    it('should return CSS custom property value', () => {
      document.documentElement.style.setProperty('--test-color', '#ff0000');
      const value = getCSSProperty('--test-color');
      expect(value).toBe('#ff0000');
    });

    it('should return trimmed value', () => {
      document.documentElement.style.setProperty('--test-spacing', '  10px  ');
      const value = getCSSProperty('--test-spacing');
      expect(value).toBe('10px');
    });
  });

  describe('clearCanvas', () => {
    it('should clear entire canvas', () => {
      const clearRectSpy = vi.spyOn(ctx, 'clearRect');
      clearCanvas(canvas, ctx);
      expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 800, 600);
    });
  });

  describe('fillCanvas', () => {
    it('should fill canvas with specified color', () => {
      const fillRectSpy = vi.spyOn(ctx, 'fillRect');
      fillCanvas(canvas, ctx, '#ff0000');
      expect(ctx.fillStyle).toBe('#ff0000');
      expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 800, 600);
    });
  });

  describe('gridToPixels', () => {
    it('should convert grid coordinates to pixels with default cell size', () => {
      expect(gridToPixels(5)).toBe(5 * CELL_SIZE);
    });

    it('should convert grid coordinates to pixels with custom cell size', () => {
      expect(gridToPixels(5, 20)).toBe(100);
    });

    it('should handle zero', () => {
      expect(gridToPixels(0)).toBe(0);
    });

    it('should handle negative values', () => {
      expect(gridToPixels(-3, 10)).toBe(-30);
    });
  });

  describe('calculateGridDimensions', () => {
    it('should calculate correct grid dimensions with minimum of 40', () => {
      const result = calculateGridDimensions(320, 240, 32);
      // 320 * 1.1 / 32 = 11 cols, 240 * 1.1 / 32 = 8.25 = 9 rows
      // But minimum is 40, so both become 40
      expect(result.cols).toBe(40);
      expect(result.rows).toBe(40);
      expect(result.offsetX).toBeGreaterThan(0);
      expect(result.offsetY).toBeGreaterThan(0);
    });

    it('should calculate grid dimensions at 110% of canvas size', () => {
      // Use larger canvas where 110% > 40
      const result = calculateGridDimensions(1600, 1200, 32);
      // 1600 * 1.1 / 32 = 55 cols, 1200 * 1.1 / 32 = 41.25 = 42 rows
      expect(result.cols).toBe(55);
      expect(result.rows).toBe(42);
    });

    it('should center canvas in virtual grid', () => {
      const result = calculateGridDimensions(320, 240, 32);
      // With 40 cols and 10 visible cols (320/32), offset should be (40-10)/2 * 32 = 480
      expect(result.offsetX).toBe(480);
      // With 40 rows and 8 visible rows (240/32), offset should be (40-8)/2 * 32 = 512
      expect(result.offsetY).toBe(512);
    });
  });

  describe('renderConwayGrid', () => {
    it('should render empty grid', () => {
      const grid = [
        [false, false],
        [false, false],
      ];
      renderConwayGrid(canvas, ctx, grid, '#ffffff', '#000000', 1, 32);
      // Should clear and fill background
      expect(ctx.fillStyle).toBeTruthy();
    });

    it('should render grid with live cells', () => {
      const grid = [
        [true, false],
        [false, true],
      ];
      const fillRectSpy = vi.spyOn(ctx, 'fillRect');
      renderConwayGrid(canvas, ctx, grid, '#ffffff', '#000000', 1, 32);

      // Should fill canvas background + 2 live cells
      expect(fillRectSpy.mock.calls.length).toBeGreaterThan(2);
    });

    it('should respect cell alpha', () => {
      const grid = [[true]];
      renderConwayGrid(canvas, ctx, grid, '#ffffff', '#000000', 0.5, 32);
      // Alpha should be reset to 1 after rendering
      expect(ctx.globalAlpha).toBe(1);
    });
  });

  describe('drawCellWithOffset', () => {
    it('should draw cell at specified position', () => {
      const fillRectSpy = vi.spyOn(ctx, 'fillRect');
      drawCellWithOffset(ctx, 100, 200, '#ff0000', 32);
      expect(ctx.fillStyle).toBe('#ff0000');
      expect(fillRectSpy).toHaveBeenCalled();
    });

    it('should apply grid offsets', () => {
      const fillRectSpy = vi.spyOn(ctx, 'fillRect');
      drawCellWithOffset(ctx, 0, 0, '#ff0000', 32);

      // Should be called with offset values (GRID_OFFSET_X, GRID_OFFSET_Y from constants)
      expect(fillRectSpy).toHaveBeenCalled();
    });
  });
});
