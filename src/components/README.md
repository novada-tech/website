# Components Directory

This directory contains all React components for the NovAda website.

## Structure

### Main Components
- **`App.tsx`** - Root application component with theme management and routing
- **`About.tsx`** - About section component
- **`Mission.tsx`** - Mission statement section
- **`PreviousWork.tsx`** - Portfolio/previous work showcase
- **`Contact.tsx`** - Contact section with email reveal functionality
- **`Logo.tsx`** - Logo component with position tracking for decorative blocks
- **`ConwayBackground.tsx`** - Animated Conway's Game of Life background
- **`LogoBlocksOverlay.tsx`** - Decorative blocks around logo

### Common Components (`/common`)
Reusable UI components following consistent design patterns:

- **`Section.tsx`** - Reusable section wrapper with responsive width presets
- **`SectionHeading.tsx`** - Consistent heading component (h2)
- **`BodyText.tsx`** - Body text component with size variants
- **`ProjectCard.tsx`** - Card component for displaying projects
- **`ErrorBoundary.tsx`** - Error boundary for graceful error handling
- **`SkipNav.tsx`** - Skip navigation link for accessibility

## Component Patterns

### Memoization
Pure presentational components use `React.memo` for performance:
```tsx
export const MyComponent = memo(function MyComponent(props) {
  // ...
});
```

### Prop Types
All components use TypeScript interfaces defined in `src/types/components.ts`:
```tsx
import type { SectionProps } from '../types/components';

export const Section = memo(function Section(props: SectionProps) {
  // ...
});
```

### Styling
- Uses Chakra UI components for layout and responsiveness
- CSS Modules for component-specific styles
- CSS custom properties for theming

## Best Practices

1. **Accessibility**: All interactive elements have proper ARIA labels and keyboard support
2. **Performance**: Use lazy loading for below-fold content, memoize expensive computations
3. **Type Safety**: All props are typed, use readonly modifiers where appropriate
4. **Error Handling**: Wrap major sections in ErrorBoundary components
5. **Testing**: Components should have test files with `.test.tsx` extension

## Related Directories
- `/hooks` - Custom React hooks
- `/utils` - Utility functions for canvas rendering, Conway logic
- `/config` - Configuration constants and theme values
- `/types` - TypeScript type definitions
