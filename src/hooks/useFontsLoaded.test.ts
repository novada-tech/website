import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFontsLoaded } from './useFontsLoaded';

describe('useFontsLoaded', () => {
  beforeEach(() => {
    // Reset document.fonts mock before each test
    vi.clearAllMocks();
  });

  it('should return false initially', () => {
    const { result } = renderHook(() => useFontsLoaded());
    expect(result.current).toBe(false);
  });

  it('should return true when fonts are already loaded', async () => {
    // Mock fonts API with already loaded status
    Object.defineProperty(document, 'fonts', {
      value: { status: 'loaded', ready: Promise.resolve() },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFontsLoaded());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should return true when Font Loading API is not available', async () => {
    // Remove fonts API
    const fonts = Object.getOwnPropertyDescriptor(document, 'fonts');
    Object.defineProperty(document, 'fonts', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFontsLoaded());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Restore
    if (fonts) {
      Object.defineProperty(document, 'fonts', fonts);
    }
  });

  it('should wait for fonts to load', async () => {
    // Mock fonts API with loading status
    const readyPromise = Promise.resolve();
    Object.defineProperty(document, 'fonts', {
      value: { status: 'loading', ready: readyPromise },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFontsLoaded());

    // Initially false
    expect(result.current).toBe(false);

    // Wait for promise to resolve
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should handle font loading errors gracefully', async () => {
    // Mock fonts API with error
    const readyPromise = Promise.reject(new Error('Font loading failed'));
    Object.defineProperty(document, 'fonts', {
      value: { status: 'loading', ready: readyPromise },
      writable: true,
      configurable: true,
    });

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useFontsLoaded());

    // Should still return true even on error (fallback to system fonts)
    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });
});
