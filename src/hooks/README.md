# Hooks Directory

Custom React hooks for the NovAda website.

## Available Hooks

### `useTheme`
Manages theme state (light/dark mode) with localStorage persistence and system preference detection.

```tsx
const [theme, setTheme] = useTheme();
```

**Features:**
- Syncs with `localStorage` for persistence
- Detects system preference via `matchMedia`
- Automatically applies theme to document root
- Returns tuple: `[theme, setTheme]`

---

### `useResponsiveCellSize`
Returns responsive cell size based on Chakra UI breakpoints.

```tsx
const cellSize = useResponsiveCellSize();
```

**Features:**
- Scales cell size for different screen sizes
- Uses multipliers from `config/conway.ts`
- Returns: `number` (cell size in pixels)

---

### `useContainerDimensions`
Measures container element dimensions with ResizeObserver.

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const dimensions = useContainerDimensions(containerRef);
```

**Returns:** `{ width: number; height: number }`

**Features:**
- Uses ResizeObserver for efficient updates
- Handles window resize events
- Initial measurement with delay for DOM readiness

---

### `useThemeObserver`
Observes theme changes via MutationObserver on document root.

```tsx
useThemeObserver(() => {
  console.log('Theme changed!');
});
```

**Parameters:**
- `callback: () => void` - Called when `data-theme` attribute changes

**Features:**
- Watches `data-theme` attribute on `document.documentElement`
- Automatically cleans up observer on unmount
- Stable callback via useCallback recommended

---

### `useFontsLoaded`
Detects when custom fonts have finished loading using the Font Loading API.

```tsx
const fontsLoaded = useFontsLoaded();

if (!fontsLoaded) {
  return <LoadingState />;
}
```

**Returns:** `boolean` - true when all fonts are loaded

**Features:**
- Uses `document.fonts.ready` promise
- Fallback for browsers without Font Loading API
- Handles font loading errors gracefully
- Prevents FOUT (Flash of Unstyled Text)

---

### `useCanvasSetup`
Provides common canvas setup logic with refs and context access.

```tsx
const { canvasRef, getContext, isReady } = useCanvasSetup();
```

**Returns:**
- `canvasRef: RefObject<HTMLCanvasElement>` - Canvas element ref
- `getContext: () => CanvasRenderingContext2D | null` - Get canvas 2D context
- `isReady: () => boolean` - Check if canvas is ready for rendering

**Features:**
- Consolidates common canvas initialization patterns
- Type-safe context access
- Null-safe operations

## Hook Patterns

### Cleanup
All hooks that create subscriptions (observers, event listeners) properly clean up:

```tsx
useEffect(() => {
  const observer = new ResizeObserver(callback);
  observer.observe(element);

  return () => observer.disconnect();
}, [deps]);
```

### Memoization
Hooks that perform calculations use `useMemo`:

```tsx
const gridDimensions = useMemo(
  () => calculateGridDimensions(width, height, cellSize),
  [width, height, cellSize]
);
```

## Testing

Hooks are tested in isolation using `@testing-library/react-hooks` or within component tests.

Mock required APIs in `src/test/setup.ts`:
- `ResizeObserver`
- `MutationObserver`
- `window.matchMedia`

## Related Directories
- `/components` - Components that use these hooks
- `/utils` - Utility functions called by hooks
- `/config` - Configuration used in hooks
