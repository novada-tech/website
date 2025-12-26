# Utils Directory

Utility functions for canvas rendering and Conway's Game of Life simulation.

## Modules

### `animations.ts`
Animation and transition utilities for consistent UI interactions.

#### Constants

**`TRANSITION_DURATIONS`**
- `FAST`: 0.15s
- `NORMAL`: 0.3s
- `SLOW`: 0.5s

**`EASINGS`**
- `LINEAR`, `EASE_IN`, `EASE_OUT`, `EASE_IN_OUT`
- `SPRING`: cubic-bezier for bounce effect

**`TRANSITIONS`**
- Pre-configured transition strings for Chakra UI
- Example: `TRANSITIONS.SMOOTH` = "all 0.3s ease-in-out"

**`HOVER_SCALE`**
- Scale transformations for hover states
- `SUBTLE` (1.02), `SMALL` (1.05), `MEDIUM` (1.1), `LARGE` (1.15)

**`ACTIVE_SCALE`**
- Scale transformations for pressed states
- `BUTTON` (0.95), `LINK` (0.98)

**`HOVER_STATES`, `ACTIVE_STATES`, `FOCUS_STATE`**
- Complete style objects for common interaction states
- Includes opacity changes and transitions

---

### `canvas.ts`
Canvas rendering utilities for grid-based content.

#### Functions

**`getCSSProperty(propertyName: string): string`**
- Gets CSS custom property value from document root
- Example: `getCSSProperty('--color-primary')`

**`clearCanvas(canvas, ctx): void`**
- Clears entire canvas to transparent

**`fillCanvas(canvas, ctx, color): void`**
- Fills canvas with solid color

**`gridToPixels(gridCoord, cellSize?): number`**
- Converts grid coordinates to pixel position
- Default cellSize from `CELL_SIZE` constant

**`calculateGridDimensions(width, height, cellSize?): { cols, rows }`**
- Calculates how many grid cells fit in canvas
- Rounds up for partial cells

**`renderConwayGrid(canvas, ctx, grid, bgColor, cellColor, cellAlpha?, cellSize?): void`**
- Renders complete Conway grid with background
- Applies `GRID_OFFSET_X` and `GRID_OFFSET_Y` automatically
- Sets cell opacity with `cellAlpha` parameter

**`drawCellWithOffset(ctx, x, y, color, cellSize?): void`**
- Draws single cell at pixel position
- Applies grid offsets automatically
- Used for logo decorative blocks

---

### `conway.ts`
Conway's Game of Life simulation logic.

#### Types
```tsx
type Grid = boolean[][];
```

#### Functions

**`createEmptyGrid(rows, cols): Grid`**
- Creates grid with all cells dead (false)

**`createRandomGrid(rows, cols, density?): Grid`**
- Creates grid with random initial state
- `density` = probability (0-1) that cell is alive
- Default density: 0.3

**`countNeighbors(grid, row, col): number`**
- Counts live neighbors (0-8) for a cell
- Uses toroidal (wraparound) topology

**`nextGenerationInPlace(sourceGrid, targetGrid): void`**
- Computes next generation using double buffering
- Mutates `targetGrid` for performance
- Implements standard Conway rules:
  - Live cell with 2-3 neighbors: survives
  - Dead cell with 3 neighbors: becomes alive
  - All others: die/stay dead

**`nextGeneration(grid): Grid`** *(deprecated)*
- Returns new grid for next generation
- Use `nextGenerationInPlace` for better performance

**`isGridEmpty(grid): boolean`**
- Checks if all cells are dead
- Used to detect when simulation needs reseeding

## Performance Notes

### Double Buffering
`nextGenerationInPlace` uses double buffering to avoid allocations:

```tsx
const gridA = createRandomGrid(rows, cols, density);
const gridB = createEmptyGrid(rows, cols);
let useA = true;

// In animation loop:
const source = useA ? gridA : gridB;
const target = useA ? gridB : gridA;
nextGenerationInPlace(source, target);
useA = !useA;
```

### Grid Offsets
Global offsets (`GRID_OFFSET_X`, `GRID_OFFSET_Y`) allow fine-tuning alignment:

```tsx
// From config/constants.ts
export const GRID_OFFSET_X = 0;
export const GRID_OFFSET_Y = -10;
```

## Testing

All utility functions have comprehensive unit tests:
- `canvas.test.ts` - Canvas rendering functions
- `conway.test.ts` - Game of Life simulation

Run tests:
```bash
npm test src/utils/
```

## Related Directories
- `/config` - Constants used by utilities
- `/components` - Components that use these utilities
- `/hooks` - Hooks that call these utilities
