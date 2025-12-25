import { useEffect, useRef, useState } from 'react';
import { createRandomGrid, nextGeneration, isGridEmpty } from '../utils/conway';
import type { Grid } from '../utils/conway';
import styles from './ConwayBackground.module.css';

interface ConwayBackgroundProps {
  cellSize?: number;
  updateInterval?: number;
  density?: number;
}

export function ConwayBackground({
  cellSize = 20,
  updateInterval = 150,
  density = 0.15,
}: ConwayBackgroundProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<Grid | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize and handle window resize
  useEffect(() => {
    const updateDimensions = (): void => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize grid when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const cols = Math.ceil(dimensions.width / cellSize);
    const rows = Math.ceil(dimensions.height / cellSize);
    gridRef.current = createRandomGrid(rows, cols, density);
  }, [dimensions, cellSize, density]);

  // Animation loop
  useEffect(() => {
    if (!gridRef.current) return;

    const intervalId = setInterval(() => {
      if (!gridRef.current) return;

      // Reset if grid is empty
      if (isGridEmpty(gridRef.current)) {
        const cols = Math.ceil(dimensions.width / cellSize);
        const rows = Math.ceil(dimensions.height / cellSize);
        gridRef.current = createRandomGrid(rows, cols, density);
      } else {
        gridRef.current = nextGeneration(gridRef.current);
      }

      // Render the grid
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || !gridRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get computed styles for theme colors
      const computedStyle = getComputedStyle(document.documentElement);
      const bgColor = computedStyle.getPropertyValue('--color-background').trim();
      const cellColor = computedStyle.getPropertyValue('--color-secondary').trim();

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw alive cells with low opacity
      ctx.fillStyle = cellColor;
      ctx.globalAlpha = 0.15;

      gridRef.current.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell) {
            ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
          }
        });
      });

      ctx.globalAlpha = 1;
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [dimensions, cellSize, updateInterval, density]);

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
