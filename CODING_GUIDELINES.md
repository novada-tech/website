# Coding Guidelines for AI Assistance

This document provides guidelines for maintaining code quality and consistency in the NovAda website codebase.

## Project Structure

```
src/
  components/        # React components
    common/          # Reusable UI components
  hooks/            # Custom React hooks
  utils/            # Pure utility functions
  config/           # Configuration constants
  styles/           # Global CSS and fonts
  types/            # TypeScript type definitions
```

## Component Structure

### File Organization
- **One component per file**
- **Export as named export**, not default export
- **Place interfaces/types above component definition**
- **Group related components in subdirectories**

### Component Template
```tsx
import { Stack } from '@chakra-ui/react';
import { Section } from './common/Section';
import { CONTENT_GAP } from '../config/layout';

interface MyComponentProps {
  title: string;
  description?: string;
}

/**
 * Component description
 * @param title - What the title is for
 * @param description - Optional description
 */
export function MyComponent({ title, description }: MyComponentProps): React.JSX.Element {
  return (
    <Section>
      <Stack gap={CONTENT_GAP.MEDIUM}>
        {/* Component content */}
      </Stack>
    </Section>
  );
}
```

## Styling

### Use Chakra UI
- **Prefer Chakra UI components** over custom CSS
- **Use responsive props** for mobile-first design: `{{ base: value, md: value }}`
- **Extract common styles** into reusable components (Section, SectionHeading, BodyText)

### CSS Variables
- **Use CSS variables** for theme values (colors, fonts)
- **Import constants** from `config/layout.ts`
- **No inline styles** except for dynamic values

### Example
```tsx
import { COLORS, FONTS, FONT_WEIGHTS } from '../config/layout';

<Text
  color={COLORS.TEXT}
  fontFamily={FONTS.BODY}
  fontWeight={FONT_WEIGHTS.MEDIUM}
>
```

## Constants and Configuration

### Magic Numbers and Strings
- **All magic numbers** must be in `config/` files
- **Use SCREAMING_SNAKE_CASE** for constants
- **Group related constants** together
- **Add JSDoc comments** explaining purpose

### Example
```typescript
/**
 * Section padding values for vertical spacing
 */
export const SECTION_PADDING_Y = {
  base: 16, // Mobile: 4rem
  md: 24,   // Desktop: 6rem
} as const;
```

### Function Parameters
- **No default parameters** - use config constants instead
- **Pass config values** explicitly from calling code

**Bad:**
```typescript
function ConwayBackground({ updateInterval = 150 }: Props) { }
```

**Good:**
```typescript
// In config/constants.ts
export const CONWAY_UPDATE_INTERVAL = 150;

// In component
function ConwayBackground({ updateInterval }: Props) { }

// In usage
<ConwayBackground updateInterval={CONWAY_UPDATE_INTERVAL} />
```

## TypeScript

### Type Safety
- **Explicit return types** for all functions
- **Interfaces over type aliases** for object shapes
- **Use union types** for specific string values
- **Avoid `any` type** - use `unknown` if needed

### Example
```typescript
interface SectionProps {
  children: React.ReactNode;
  maxWidth?: 'text' | 'grid' | 'full'; // Union type, not string
}

export function Section({ children, maxWidth = 'text' }: SectionProps): React.JSX.Element {
  // Implementation
}
```

### Type Organization
```typescript
// Local types: define in the same file above component
interface MyComponentProps {
  title: string;
}

// Shared types: define in src/types/
export interface Project {
  title: string;
  description: string;
}
```

## Naming Conventions

- **Components**: PascalCase (`SectionHeading`, `BodyText`)
- **Functions**: camelCase (`calculateGridDimensions`, `getEmail`)
- **Constants**: SCREAMING_SNAKE_CASE (`CONTENT_GAP`, `SECTION_PADDING_Y`)
- **Files**: Match component name or kebab-case for utilities
- **CSS classes**: kebab-case (`logo-wrapper`, `canvas`)

## Code Quality

### Function Guidelines
- **Single responsibility** - functions should do one thing
- **Max 150 lines** per function
- **Extract complex logic** to utility functions
- **Prefer composition** over inheritance

### DRY (Don't Repeat Yourself)
- **Extract repeated code** into functions or components
- **Create custom hooks** for common patterns
- **Use constants** for repeated values

### Example
**Bad:**
```tsx
// Repeated in multiple components
<Box py={{ base: 16, md: 24 }} bg="var(--color-background)">
  <Container maxW={{ base: '100%', md: '720px' }}>
```

**Good:**
```tsx
// Use Section component
<Section maxWidth="text">
```

## Documentation

### JSDoc Comments
- **Add JSDoc** to all exported functions and components
- **Document parameters** with `@param`
- **Include examples** for complex usage with `@example`

### Example
```typescript
/**
 * Custom hook to measure container dimensions
 * Uses ResizeObserver for efficient updates when container size changes
 *
 * @param containerRef - React ref to the container element to measure
 * @returns Object with width and height of the container
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const dimensions = useContainerDimensions(containerRef);
 * ```
 */
export function useContainerDimensions(
  containerRef: RefObject<HTMLElement>
): Dimensions {
  // Implementation
}
```

### Inline Comments
- **Complex logic**: Explain why, not what
- **Algorithms**: Document the approach (e.g., Conway's algorithm, positioning calculations)
- **Workarounds**: Explain why they're necessary

## Error Handling

### Defensive Programming
- **Validate inputs** at function boundaries
- **Handle null/undefined** gracefully
- **Provide fallbacks** for failed operations

### Example
```typescript
const updateDimensions = (): void => {
  if (!containerRef.current) return; // Guard clause

  const rect = containerRef.current.getBoundingClientRect();
  // Only update if we have valid dimensions
  if (rect.width > 0 && rect.height > 0) {
    setDimensions({ width: rect.width, height: rect.height });
  }
};
```

## Performance

### Optimization Strategies
- **Memoize expensive calculations** with `useMemo`
- **Use React.memo** for pure components
- **Avoid unnecessary re-renders** with `useCallback`
- **Lazy load** sections below the fold

### Example
```typescript
const handleLogoPositionChange = useCallback((x: number, y: number): void => {
  setLogoPosition({ x, y });
}, []); // Empty deps - function never changes
```

## Accessibility

### Requirements
- **Add ARIA labels** to interactive elements without text
- **Ensure keyboard navigation** works for all interactive elements
- **Use semantic HTML** (section, footer, nav, etc.)
- **Provide alt text** for images

### Example
```tsx
<Button
  onClick={handleReveal}
  aria-label="Reveal contact information"
>
  Get in Touch
</Button>
```

## Git Practices

### Commits
- **Atomic commits** - one logical change per commit
- **Descriptive messages** - explain why, not what
- **Reference issues** if applicable

### Branches
- **Feature branches** for new work
- **Descriptive names** - `feature/section-components`, `fix/logo-positioning`

## Testing (Future)

### Coverage Goals
- **Unit tests** for utility functions (canvas, conway)
- **Component tests** for interactive elements
- **Integration tests** for user flows
- **Visual regression tests** for UI consistency

## AI Assistance Tips

When working with AI assistants on this codebase:

1. **Reference these guidelines** - Ask AI to follow these standards
2. **Request refactoring** - Point AI to repeated code or magic values
3. **Ask for explanations** - Have AI document complex logic
4. **Verify TypeScript** - Check that types are explicit and correct
5. **Review constants** - Ensure no new magic values are introduced

## Common Patterns

### Creating a New Section
1. Use `Section` wrapper with appropriate `maxWidth`
2. Use `SectionHeading` for the title
3. Use `BodyText` for paragraphs
4. Use constants from `config/layout.ts`

### Adding Configuration
1. Add constant to appropriate file in `config/`
2. Use SCREAMING_SNAKE_CASE
3. Add JSDoc comment
4. Export as `const` assertion

### Creating a Custom Hook
1. Place in `hooks/` directory
2. Prefix with `use`
3. Add comprehensive JSDoc
4. Include usage example

---

**Last Updated**: 2025-12-26
**Maintainer**: NovAda Team
