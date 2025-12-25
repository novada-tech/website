import { useEffect, useRef } from 'react';
import { createRandomGrid, createEmptyGrid, nextGenerationInPlace, isGridEmpty } from '../utils/conway';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import { getCSSProperty, renderConwayGrid, calculateGridDimensions } from '../utils/canvas';
import type { Grid } from '../utils/conway';
import styles from './ConwayBackground.module.css';

interface ConwayBackgroundProps {
  updateInterval?: number;
  density?: number;
}

export function ConwayBackground({
  updateInterval = 150,
  density = 0.15,
}: ConwayBackgroundProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridARef = useRef<Grid | null>(null);
  const gridBRef = useRef<Grid | null>(null);
  const useGridARef = useRef<boolean>(true);
  const lastUpdateRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const dimensions = useViewportDimensions();

  // Combined initialization and animation loop
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const { cols, rows } = calculateGridDimensions(dimensions.width, dimensions.height);

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
        renderConwayGrid(canvas, ctx, gridToRender, bgColor, cellColor, alpha);
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
      renderConwayGrid(canvas, ctx, gridARef.current, bgColor, cellColor, alpha);
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
        const { cols, rows } = calculateGridDimensions(dimensions.width, dimensions.height);
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
        renderConwayGrid(canvas, ctx, gridToRender, bgColor, cellColor, alpha);
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
  }, [dimensions, updateInterval, density]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
