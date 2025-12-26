# Config Directory

Configuration constants and design tokens for the NovAda website.

## Files

### `constants.ts`
Core application constants used across components.

```tsx
export const CELL_SIZE = 32;           // Base cell size in pixels
export const GRID_OFFSET_X = 0;        // Horizontal grid alignment
export const GRID_OFFSET_Y = -10;      // Vertical grid alignment (-10px)
export const CONWAY_UPDATE_INTERVAL = 1000;  // Animation speed (ms)
export const CELL_GAP = 0;             // Gap between cells (0 = no gap)
```

**Usage:**
- Grid rendering in `ConwayBackground` and `LogoBlocksOverlay`
- Canvas utilities in `utils/canvas.ts`

---

### `conway.ts`
Conway's Game of Life specific configuration.

```tsx
export const DEFAULT_DENSITY = 0.25;  // Initial alive cell probability

export const CELL_SIZE_MULTIPLIERS = {
  BASE: 0.7,   // Mobile devices
  SM: 0.8,     // Small tablets
  MD: 1.0,     // Medium screens (desktop)
  LG: 1.0,     // Large screens
} as const;
```

**Usage:**
- `useResponsiveCellSize` hook for responsive cell sizing
- `ConwayBackground` component for grid initialization

---

### `layout.ts`
Layout, typography, and design system constants.

#### Spacing
```tsx
SECTION_PADDING_Y = { base: 16, md: 24 }
CONTAINER_MAX_WIDTH = {
  TEXT: { base: '100%', md: '720px' },
  GRID: { base: '100%', md: '960px' },
  FULL: '100%'
}
CONTAINER_PADDING_X = { base: 6, md: 8 }
CONTENT_GAP = { SMALL: 4, MEDIUM: 6, LARGE: 8 }
```

#### Typography
```tsx
FONTS = {
  TITLE: 'var(--font-title)',      // Maregraphe Caption
  HEADING: 'var(--font-heading)',  // Maregraphe Caption
  BODY: 'var(--font-body)'         // Host Grotesk
}

FONT_WEIGHTS = {
  LIGHT: 300,    // Maregraphe Caption Light
  REGULAR: 400,  // Maregraphe Caption Regular
  MEDIUM: 500    // Host Grotesk Medium
}

HEADING_SIZE = {
  SECTION: { base: 'xl', md: '2xl' },
  SUBSECTION: 'md'
}

TEXT_SIZE = {
  BODY: { base: 'md', md: 'lg' },
  SMALL: 'sm'
}
```

#### Colors
```tsx
COLORS = {
  PRIMARY: 'var(--color-primary)',
  SECONDARY: 'var(--color-secondary)',
  BACKGROUND: 'var(--color-background)',
  TEXT: 'var(--color-text)',
  ACCENT: 'var(--color-accent)'
}
```

---

### `logoBlocks.ts`
Decorative blocks configuration around the logo.

```tsx
export interface BlockPosition {
  x: number;  // Grid units from logo center
  y: number;  // Grid units from logo center
}

export const defaultBlockPositions: readonly BlockPosition[] = [
  { x: 5, y: -2 },   // Top right cluster
  { x: 6, y: -1 },
  { x: -2, y: -2 },  // Top middle cluster
  // ... more positions
] as const;
```

**Usage:**
- `LogoBlocksOverlay` component
- Positions are in grid units (multiplied by `CELL_SIZE` for pixels)

## Design System

### Responsive Breakpoints
Follows Chakra UI default breakpoints:
- `base`: 0px (mobile-first)
- `sm`: 480px
- `md`: 768px (tablet/desktop switch)
- `lg`: 992px
- `xl`: 1280px
- `2xl`: 1536px

### Color Modes
Defined in `src/styles/theme.css`:

**Light Mode:**
- Primary: `#211c40` (dark blue)
- Secondary: `#332b80` (purple)
- Background: `#ececec` (light gray)
- Text: `#211c40` (dark blue)
- Accent: `#ffffff` (white)

**Dark Mode:**
- Primary: `#ececec` (light gray)
- Secondary: `#332b80` (purple)
- Background: `#211c40` (dark blue)
- Text: `#ececec` (light gray)
- Accent: `#000000` (black)

## Best Practices

1. **Immutability**: All config objects use `as const` for type safety
2. **Single Source of Truth**: Don't hardcode values; import from config
3. **Type Safety**: Use readonly types where possible
4. **Documentation**: Config values should be self-documenting with comments

## Extending Configuration

When adding new configuration:

1. Choose appropriate file (or create new one)
2. Add JSDoc comments explaining usage
3. Use `as const` for object literals
4. Export with descriptive names
5. Update this README

## Related
- `/src/styles` - CSS files using these constants
- `/src/types` - Type definitions including `SectionWidth`, `Theme`
- `/src/components` - Components consuming these configs
