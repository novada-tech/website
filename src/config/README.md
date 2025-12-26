# Config

Configuration constants and design system values.

## Files

- **`constants.ts`** - Core constants (cell size, grid offsets, intervals)
- **`conway.ts`** - Conway simulation configuration
- **`layout.ts`** - Layout constants (colors, fonts, spacing)
- **`logoBlocks.ts`** - Logo decorative blocks positions

## Key Patterns

- SCREAMING_SNAKE_CASE for constants
- `as const` assertions for type safety
- No magic numbers in components - extract to config
