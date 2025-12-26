# Components

React components for the NovAda website.

## Structure

- **Main components** - Top-level sections (App, HeroBanner, About, Mission, etc.)
- **`common/`** - Reusable UI components (Section, headings, buttons, etc.)

## Key Patterns

- Named exports, not default
- TypeScript interfaces in `src/types/components.ts`
- Chakra UI for styling and responsive props
- React.memo for pure components
- Lazy loading for below-fold content
