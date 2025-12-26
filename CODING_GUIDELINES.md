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

## Documentation Philosophy

**IMPORTANT: Minimize documentation burden to maximize maintainability**

### Key Principle: Single Source of Truth
Code should be self-documenting through clear naming and structure. Documentation should complement, not duplicate, the code.

### JSDoc Guidelines - Use Sparingly

**When to add JSDoc:**
- ✅ Complex algorithms that aren't obvious from code
- ✅ Non-obvious parameter requirements or edge cases
- ✅ Public APIs or hooks that other developers will consume

**When NOT to add JSDoc:**
- ❌ Self-explanatory functions (e.g., `getEmail()`)
- ❌ Simple components with obvious props
- ❌ Restating what the code already says
- ❌ Duplicating TypeScript type information

**Bad (redundant):**
```typescript
/**
 * Theme toggle button component
 * Switches between light and dark mode
 * @param theme - Current theme ('light' or 'dark')
 * @param onToggle - Callback function to toggle theme
 */
export const ThemeToggle = memo(function ThemeToggle({
  theme,
  onToggle,
}: ThemeToggleProps): React.JSX.Element {
```

**Good (minimal, focused):**
```typescript
// Only add docs if there's non-obvious behavior
export const ThemeToggle = memo(function ThemeToggle({
  theme,
  onToggle,
}: ThemeToggleProps): React.JSX.Element {
```

**Good (documents complexity):**
```typescript
/**
 * Reports logo center position relative to offset parent (not viewport).
 * This ensures position doesn't change during scroll.
 */
useEffect(() => {
  // Implementation
}, []);
```

### README Files - Minimal Structure Only

**What to include:**
- Directory structure overview
- Key patterns or conventions specific to that module
- Links to external resources if needed

**What NOT to include:**
- ❌ Lists of every file and what it does (duplicates file names)
- ❌ Function signatures (duplicates code)
- ❌ API documentation (duplicates JSDoc)
- ❌ Examples that just restate the code

### Inline Comments
- **Use sparingly** - only when code cannot be made self-explanatory
- **Explain WHY, not WHAT** - the code shows what it does
- **Focus on non-obvious decisions** - why this approach vs alternatives
- **Keep comments close to code** - they must be maintained together

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

## Testing Philosophy

**IMPORTANT: Write maintainable tests that focus on behavior, not implementation**

### What to Test

**✅ Test behavior and logic:**
- User interactions (clicks, input, navigation)
- State changes and side effects
- Business logic and calculations
- Error handling and edge cases
- Accessibility (keyboard navigation, ARIA)

**❌ Do NOT test:**
- Static content (text labels, headings, descriptions)
- CSS classes or styling details
- Implementation details (internal state, function names)
- Third-party library behavior (Chakra UI, React)
- File structure or imports

### Why Avoid Testing Static Content

Testing static content creates maintenance burden:
```typescript
// BAD - Brittle test that breaks on content changes
it('should render title', () => {
  render(<About />);
  expect(screen.getByText('About NovAda')).toBeInTheDocument();
});

// GOOD - Tests behavior, not content
it('should render about section', () => {
  render(<About />);
  expect(screen.getByRole('region', { name: /about/i })).toBeInTheDocument();
});
```

### Test Guidelines

1. **Test user-facing behavior** - What users see and interact with
2. **Use semantic queries** - `getByRole`, `getByLabelText` over `getByText`
3. **Avoid snapshot tests** - They capture too much and break easily
4. **Keep tests simple** - If the test is complex, simplify the code
5. **Test one thing** - Each test should verify one specific behavior

### Coverage Goals
- **Critical paths**: User interactions, data flow
- **Utility functions**: Pure logic with clear inputs/outputs
- **Error boundaries**: Error handling and fallback UI
- **NOT required**: Static presentational components

## AI Assistance Tips

When working with AI assistants on this codebase:

1. **Reference these guidelines** - Ask AI to follow these standards
2. **Request refactoring** - Point AI to repeated code or magic values
3. **Minimize documentation** - Only document non-obvious complexity
4. **Verify TypeScript** - Check that types are explicit and correct
5. **Review constants** - Ensure no new magic values are introduced
6. **Focus tests on behavior** - Avoid testing static content or implementation details
7. **Keep it simple** - Prefer clarity over cleverness

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
