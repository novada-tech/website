import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultBlockPositions } from '../config';
import { useResponsiveCellSize } from '../hooks/useResponsiveCellSize';
import { useContainerDimensions } from '../hooks/useContainerDimensions';
import { useThemeObserver } from '../hooks/useThemeObserver';
import { getCSSProperty, clearCanvas, gridToPixels, drawCellWithOffset } from '../utils/canvas';
import type { BlockPosition } from '../config';
import styles from './LogoBlocksOverlay.module.css';

interface LogoBlocksOverlayProps {
  blocks?: readonly BlockPosition[];
  centerX: number; // Center X coordinate in pixels
  centerY: number; // Center Y coordinate in pixels
}

export function LogoBlocksOverlay({
  blocks = defaultBlockPositions,
  centerX,
  centerY,
}: LogoBlocksOverlayProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cellSize = useResponsiveCellSize();
  const dimensions = useContainerDimensions(containerRef);

  // Cache color to avoid repeated getComputedStyle
  const [blockColor, setBlockColor] = useState(getCSSProperty('--color-blocks'));

  // Draw blocks function
  const drawBlocks = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || dimensions.width === 0) return;

    clearCanvas(canvas, ctx);

    // Snap center position to grid for perfect alignment
    const snappedCenterX =
      Math.round(centerX / gridToPixels(1, cellSize)) * gridToPixels(1, cellSize);
    const snappedCenterY =
      Math.round(centerY / gridToPixels(1, cellSize)) * gridToPixels(1, cellSize);

    // Use for loop instead of forEach for better performance
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]!;
      const pixelX = snappedCenterX + gridToPixels(block.x, cellSize);
      const pixelY = snappedCenterY + gridToPixels(block.y, cellSize);
      drawCellWithOffset(ctx, pixelX, pixelY, blockColor, cellSize);
    }
  }, [blocks, dimensions, centerX, centerY, blockColor, cellSize]);

  // Draw blocks when dependencies change
  useEffect(() => {
    drawBlocks();
  }, [drawBlocks]);

  // Update color on theme change (stable callback)
  useThemeObserver(
    useCallback(() => {
      setBlockColor(getCSSProperty('--color-blocks'));
    }, [])
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className={styles.canvas}
        aria-hidden="true"
      />
    </div>
  );
}
