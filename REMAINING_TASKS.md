# Remaining Improvement Tasks

## High Priority

### Configuration & Constants
- [x] Update `ConwayBackground` to use constants from config file instead of default parameters
  - Already using `CONWAY_UPDATE_INTERVAL` and `DEFAULT_DENSITY` from config
- [x] Extract Conway simulation constants to `config/conway.ts`
  - Already in `config/constants.ts` (CELL_SIZE, CELL_GAP, GRID_OFFSET_X, GRID_OFFSET_Y)
  - Already in `config/conway.ts` (DEFAULT_DENSITY, CELL_SIZE_MULTIPLIERS)
- [x] Extract responsive breakpoint values to theme/config
  - CELL_SIZE_MULTIPLIERS now in `config/conway.ts` and used by `useResponsiveCellSize`

### Code Cleanup
- [x] Remove unused CSS module files
  - Removed `Contact.module.css` and `App.module.css`
- [x] Remove unused imports across all files
  - Removed `DEFAULT_DENSITY` from ConwayBackground.tsx
  - Fixed React imports in LogoBlocksOverlay.tsx
- [x] Delete commented-out code
  - Verified no commented-out code exists
- [x] Audit utility functions for unused code
  - Removed `drawCell`, `drawCellAtPosition`, `pixelsToGrid` from `utils/canvas.ts`
  - Removed `GridDimensions` interface from `utils/conway.ts`

### DRY Improvements
- [x] Update `ConwayBackground` to use `useContainerDimensions` hook
  - Already using the hook
- [x] Update `LogoBlocksOverlay` to use `useContainerDimensions` hook
  - Replaced custom dimension measurement with `useContainerDimensions` hook
- [x] Extract duplicate theme observer logic
  - Already using `useThemeObserver` in LogoBlocksOverlay
  - ConwayBackground uses inline MutationObserver (could be refactored but works differently)
- [ ] Consolidate canvas rendering setup
  - Extract common canvas initialization patterns

### Type Safety
- [x] Create `src/types/` directory
- [x] Create explicit interfaces file (`src/types/components.ts`)
  - Moved inline prop types to shared file with readonly modifiers
  - Created types for ConwayBackground, Logo, Section, SectionHeading, BodyText, ProjectCard
- [x] Create types for theme values
  - Type for theme: `'light' | 'dark'` in `types/theme.ts`
  - Type for section widths: `'text' | 'grid' | 'full'` in `types/theme.ts`
- [x] Add `as const` to remaining constant objects
  - Added `as const` to `defaultBlockPositions` in `config/logoBlocks.ts`
  - All other config objects already had `as const`

### Documentation
- [x] Add JSDoc comments to canvas utility functions
  - Added JSDoc to all functions in `utils/canvas.ts`
- [x] Add JSDoc comments to Conway utility functions
  - Added JSDoc to all functions in `utils/conway.ts`
- [ ] Add JSDoc to Logo component positioning logic
- [ ] Create README.md files for major directories
  - `/components/README.md`
  - `/hooks/README.md`
  - `/utils/README.md`
  - `/config/README.md`

## Medium Priority

### Performance Optimization
- [x] Add React.memo to pure components
  - Added memo to `Logo`, `Section`, `SectionHeading`, `BodyText`, `ProjectCard`
- [x] Memoize expensive Conway calculations
  - Added `useMemo` for grid dimensions calculation in ConwayBackground
- [ ] Consider lazy loading sections below fold
  - `About`, `Mission`, `PreviousWork` could be lazy loaded
- [ ] Analyze bundle size
  - Consider code splitting for Chakra UI
  - Check if framer-motion is tree-shaken properly

### Error Handling
- [ ] Add error boundary component
  - Create `src/components/common/ErrorBoundary.tsx`
- [ ] Wrap major sections in error boundaries
- [ ] Add fallback UI for font loading failures
  - System fonts as fallback
  - Loading states
- [ ] Add PropTypes or Zod validation for runtime checks
  - Validate canvas dimensions before rendering
  - Validate color values
  - Validate configuration constants

### Testing
- [ ] Set up testing framework (Vitest is already configured)
- [ ] Add unit tests for utility functions
  - `canvas.ts` functions
  - `conway.ts` functions
  - Configuration validators
- [ ] Add component tests
  - Theme toggle functionality
  - Contact email reveal
  - Project card hover states
- [ ] Add integration tests
  - Scroll behavior
  - Logo positioning
  - Conway animation
- [ ] Add visual regression tests
  - Consider Playwright or Chromatic

### Accessibility
- [ ] Add skip navigation link
  - Jump to main content
  - Jump to sections
- [ ] Audit focus styles on all interactive elements
  - Theme toggle button
  - Contact button
  - Project cards
  - Email link
- [ ] Add more ARIA labels where needed
  - Section landmarks
  - Navigation structure
- [ ] Test keyboard navigation
  - Tab order
  - Focus indicators
  - Keyboard shortcuts
- [ ] Run accessibility audit tools
  - Lighthouse
  - axe DevTools

## Low Priority

### Nice to Have
- [ ] Create a SubsectionHeading component (h3)
  - Currently only have SectionHeading (h2)
- [ ] Create Link component wrapper
  - Consistent link styling
  - External link icons
- [ ] Add loading states
  - Font loading
  - Conway simulation initialization
- [ ] Add animation utilities
  - Consistent transitions
  - Spring animations for interactions
- [ ] Consider dark/light mode improvements
  - Smoother transitions
  - Per-section theme overrides
- [ ] Add SEO meta tags
  - Open Graph tags
  - Twitter cards
  - Structured data

### Future Considerations
- [ ] Internationalization (i18n)
  - Extract all text to translation files
  - Language switcher
- [ ] Content Management
  - Move project data to JSON/CMS
  - Dynamic content loading
- [ ] Analytics
  - Google Analytics or privacy-focused alternative
  - Event tracking for interactions
- [ ] Progressive Web App (PWA)
  - Service worker
  - Offline support
  - App manifest

## Refactoring Opportunities

### Additional Component Extraction
- [ ] Extract theme toggle button to component
  - Currently inline in App.tsx
  - Could be `ThemeToggle.tsx` component
- [ ] Extract hero banner section to component
  - Conway background + Logo + LogoBlocks
  - `HeroBanner.tsx` component
- [ ] Consider creating a Grid component wrapper
  - Consistent grid layouts
  - Responsive columns

### File Organization
- [ ] Consider moving common components to subdirectories
  - `common/layout/` for Section
  - `common/typography/` for heading/text
  - `common/cards/` for ProjectCard
- [ ] Group related hooks
  - `hooks/canvas/` for canvas-related hooks
  - `hooks/theme/` for theme hooks
- [ ] Organize utils by domain
  - `utils/canvas/` for canvas utilities
  - `utils/conway/` for game logic

### Configuration Consolidation
- [ ] Merge theme.css variables with layout.ts
  - Single source of truth for design tokens
  - Consider using Chakra theme object more
- [ ] Create a single config index
  - `config/index.ts` that exports everything
  - Easier imports

## Technical Debt

### Known Issues
- [ ] Logo blocks movement on scroll (if still occurring)
  - Verify fix is working correctly
  - Add tests to prevent regression
- [ ] Canvas dimension measurement timing
  - Sometimes 0x0 on initial render
  - Add more robust initialization

### Code Quality
- [ ] Run ESLint and fix warnings
- [ ] Run Prettier and format all files
- [ ] Set up pre-commit hooks
  - Format on commit
  - Lint on commit
  - Type check on commit
- [ ] Configure stricter TypeScript settings
  - Enable `strict` mode
  - Enable `noUncheckedIndexedAccess`
  - Enable `noImplicitReturns`

## Documentation

### User Documentation
- [ ] Update main README.md
  - Project description
  - Setup instructions
  - Development workflow
  - Deployment process
- [ ] Add CONTRIBUTING.md
  - How to contribute
  - Code style guide reference
  - Pull request process
- [ ] Add CHANGELOG.md
  - Track version changes
  - Document breaking changes

### Developer Documentation
- [ ] Document Conway simulation algorithm
  - How it works
  - Performance considerations
  - Configuration options
- [ ] Document logo positioning system
  - How coordinates are calculated
  - Why relative positioning is used
- [ ] Document responsive design strategy
  - Breakpoint decisions
  - Cell size scaling rationale
- [ ] Create architecture decision records (ADRs)
  - Why Chakra UI
  - Why not default parameters
  - Font choices

## Metrics & Monitoring

### Performance Metrics
- [ ] Set up Lighthouse CI
  - Performance budgets
  - Accessibility checks
  - Best practices
- [ ] Monitor bundle size
  - Set up bundlesize package
  - Track size over time
- [ ] Add performance marks
  - Time to interactive
  - First contentful paint
  - Conway animation start time

### Code Quality Metrics
- [ ] Set up code coverage tracking
  - Aim for 80%+ coverage
  - Required for critical paths
- [ ] Set up complexity analysis
  - Flag functions over certain complexity
  - Encourage refactoring

---

## Priority Legend
- **High Priority**: Core functionality, code quality, maintainability
- **Medium Priority**: Performance, error handling, testing foundation
- **Low Priority**: Nice-to-haves, future enhancements

## How to Use This Checklist
1. Pick tasks from **High Priority** first
2. Work through one category at a time
3. Update this file as tasks are completed
4. Add new tasks as they are discovered
5. Reference `CODING_GUIDELINES.md` while implementing

---

**Last Updated**: 2025-12-26
**Total Tasks**: ~90+
**Completed**: 34
**Remaining**: ~56+
