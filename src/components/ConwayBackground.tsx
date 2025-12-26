import { useEffect, useRef, useState } from 'react';
import { createRandomGrid, createEmptyGrid, nextGenerationInPlace, isGridEmpty } from '../utils/conway';
import { useResponsiveCellSize } from '../hooks/useResponsiveCellSize';
import { getCSSProperty, renderConwayGrid, calculateGridDimensions } from '../utils/canvas';
import type { Grid } from '../utils/conway';
import styles from './ConwayBackground.module.css';

interface ConwayBackgroundProps {
  updateInterval?: number;
  density?: number;
  height?: string | number; // CSS height value (e.g., '100vh', '600px', 600)
}

export function ConwayBackground({
  updateInterval = 150,
  density = 0.25,
  height,
}: ConwayBackgroundProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridARef = useRef<Grid | null>(null);
  const gridBRef = useRef<Grid | null>(null);
  const useGridARef = useRef<boolean>(true);
  const lastUpdateRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const cellSize = useResponsiveCellSize();

  // Use container dimensions if height is specified, otherwise viewport
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  // Measure container dimensions when height prop is provided
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = (): void => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Only update if we have valid dimensions
        if (rect.width > 0 && rect.height > 0) {
          setCanvasDimensions({ width: rect.width, height: rect.height });
        }
      }
    };

    // Initial measurement with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateDimensions, 0);

    // Use ResizeObserver for better reactivity
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [height]);

  // Combined initialization and animation loop
  useEffect(() => {
    if (canvasDimensions.width === 0 || canvasDimensions.height === 0) return;

    const { cols, rows } = calculateGridDimensions(canvasDimensions.width, canvasDimensions.height, cellSize);

    // Initialize double buffer grids if not exists
    if (!gridARef.current || !gridBRef.current) {
      gridARef.current = createRandomGrid(rows, cols, density);
      gridBRef.current = createEmptyGrid(rows, cols);
      useGridARef.current = true;
    }

    // Cache colors to avoid repeated getComputedStyle calls
    let bgColor = getCSSProperty('--color-background');
    let cellColor = getCSSProperty('--color-secondary');
    let alpha = parseFloat(getCSSProperty('--conway-alpha'));

    // Update cached colors on theme change and redraw immediately
    const updateColors = (): void => {
      bgColor = getCSSProperty('--color-background');
      cellColor = getCSSProperty('--color-secondary');
      alpha = parseFloat(getCSSProperty('--conway-alpha'));

      // Force immediate redraw with new colors
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const gridToRender = useGridARef.current ? gridARef.current : gridBRef.current;
      if (canvas && ctx && gridToRender) {
        renderConwayGrid(canvas, ctx, gridToRender, bgColor, cellColor, alpha, cellSize);
      }
    };

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Initial render before animation loop starts
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && gridARef.current) {
      renderConwayGrid(canvas, ctx, gridARef.current, bgColor, cellColor, alpha, cellSize);
    }

    const animate = (timestamp: number): void => {
      // Control update frequency
      if (timestamp - lastUpdateRef.current < updateInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateRef.current = timestamp;

      if (!gridARef.current || !gridBRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const currentGrid = useGridARef.current ? gridARef.current : gridBRef.current;
      const nextGrid = useGridARef.current ? gridBRef.current : gridARef.current;

      // Reset if grid is empty
      if (isGridEmpty(currentGrid)) {
        const { cols, rows } = calculateGridDimensions(canvasDimensions.width, canvasDimensions.height, cellSize);
        // Reinitialize current grid
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            currentGrid[i]![j] = Math.random() < density;
          }
        }
      } else {
        // Compute next generation in place using double buffering
        nextGenerationInPlace(currentGrid, nextGrid);
        // Swap buffers
        useGridARef.current = !useGridARef.current;
      }

      // Render the current grid
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const gridToRender = useGridARef.current ? gridARef.current : gridBRef.current;

      if (canvas && ctx && gridToRender) {
        renderConwayGrid(canvas, ctx, gridToRender, bgColor, cellColor, alpha, cellSize);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      observer.disconnect();
    };
  }, [canvasDimensions, updateInterval, density, cellSize]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        className={styles.canvas}
        aria-hidden="true"
      />
    </div>
  );
}
