import { useRef, useEffect } from 'react';

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
