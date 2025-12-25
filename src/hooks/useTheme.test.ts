import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme } from './useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should default to system preference when no stored theme', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('dark');
  });

  it('should use stored theme preference', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('light');
  });

  it('should update theme when setTheme is called', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1]('dark');
    });

    expect(result.current[0]).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should set data-theme attribute on document', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1]('light');
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
