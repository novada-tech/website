import React, { useCallback, useEffect, useRef } from 'react';
import { defaultBlockPositions } from '../config/logoBlocks';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import { useThemeObserver } from '../hooks/useThemeObserver';
import { getCSSProperty, clearCanvas, gridToPixels, drawCellWithOffset } from '../utils/canvas';
import type { BlockPosition } from '../config/logoBlocks';
import styles from './LogoBlocksOverlay.module.css';

interface LogoBlocksOverlayProps {
  blocks?: BlockPosition[];
  centerX: number; // Center X coordinate in pixels
  centerY: number; // Center Y coordinate in pixels
}

export function LogoBlocksOverlay({
  blocks = defaultBlockPositions,
  centerX,
  centerY,
}: LogoBlocksOverlayProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensions = useViewportDimensions();

  // Cache color to avoid repeated getComputedStyle
  const [blockColor, setBlockColor] = React.useState(getCSSProperty('--color-secondary'));

  // Draw blocks function
  const drawBlocks = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || dimensions.width === 0) return;

    clearCanvas(canvas, ctx);

    // Snap center position to grid for perfect alignment
    const snappedCenterX = Math.round(centerX / gridToPixels(1)) * gridToPixels(1);
    const snappedCenterY = Math.round(centerY / gridToPixels(1)) * gridToPixels(1);

    // Use for loop instead of forEach for better performance
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]!;
      const pixelX = snappedCenterX + gridToPixels(block.x);
      const pixelY = snappedCenterY + gridToPixels(block.y);
      drawCellWithOffset(ctx, pixelX, pixelY, blockColor);
    }
  }, [blocks, dimensions, centerX, centerY, blockColor]);

  // Draw blocks when dependencies change
  useEffect(() => {
    drawBlocks();
  }, [drawBlocks]);

  // Update color on theme change (stable callback)
  useThemeObserver(useCallback(() => {
    setBlockColor(getCSSProperty('--color-secondary'));
  }, []));

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
