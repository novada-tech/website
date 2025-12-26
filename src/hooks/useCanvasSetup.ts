import { useRef, useEffect } from 'react';

/**
 * Common canvas setup logic
 * Provides canvas and context refs with proper initialization
 *
 * @returns Object containing canvas ref, context, and dimensions
 *
 * @example
 * ```tsx
 * const { canvasRef, getContext, isReady } = useCanvasSetup();
 *
 * useEffect(() => {
 *   const ctx = getContext();
 *   if (ctx) {
 *     // Draw on canvas
 *   }
 * }, [getContext]);
 * ```
 */
export function useCanvasSetup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getContext = (): CanvasRenderingContext2D | null => {
    return canvasRef.current?.getContext('2d') ?? null;
  };

  const isReady = (): boolean => {
    return canvasRef.current !== null;
  };

  return {
    canvasRef,
    getContext,
    isReady,
  };
}

/**
 * Hook for setting up canvas with automatic dimension updates
 * Combines canvas ref, context access, and dimension tracking
 *
 * @param width - Canvas width in pixels
 * @param height - Canvas height in pixels
 * @returns Object with canvas ref and context getter
 */
export function useCanvasWithDimensions(width: number, height: number) {
  const { canvasRef, getContext, isReady } = useCanvasSetup();

  useEffect(() => {
    if (canvasRef.current && width > 0 && height > 0) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  }, [width, height]);

  return {
    canvasRef,
    getContext,
    isReady,
  };
}
