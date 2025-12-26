# Hooks

Custom React hooks for the NovAda website.

## Available Hooks

- `useTheme` - Theme state with localStorage persistence
- `useResponsiveCellSize` - Responsive Conway cell sizing
- `useContainerDimensions` - Element dimension measurement
- `useThemeObserver` - Observe theme attribute changes
- `useFontsLoaded` - Detect font loading completion
- `useCanvasSetup` - Common canvas initialization

## Key Patterns

- Proper cleanup of observers and event listeners
- useMemo for expensive calculations
- useCallback for stable references
