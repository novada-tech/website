import { useState, useCallback, lazy, Suspense } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useTheme } from './hooks/useTheme';
import { useFontsLoaded } from './hooks/useFontsLoaded';
import { HeroBanner } from './components/HeroBanner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SkipNav } from './components/common/SkipNav';
import { ThemeToggle } from './components/common/ThemeToggle';
import { LoadingState } from './components/common/LoadingState';
import { CONWAY_UPDATE_INTERVAL } from './config/constants';
import { DEFAULT_DENSITY } from './config/conway';

// Lazy load sections below the fold for better initial load performance
const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const Mission = lazy(() => import('./components/Mission').then((m) => ({ default: m.Mission })));
const PreviousWork = lazy(() =>
  import('./components/PreviousWork').then((m) => ({
    default: m.PreviousWork,
  }))
);
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));

export function App(): React.JSX.Element {
  const [theme, setTheme] = useTheme();
  const fontsLoaded = useFontsLoaded();
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Memoize callback to prevent Logo effect from recreating
  const handleLogoPositionChange = useCallback((x: number, y: number): void => {
    setLogoPosition({ x, y });
  }, []);

  // Show loading state while fonts are loading
  if (!fontsLoaded) {
    return (
      <Box minH="100vh" bg="var(--color-background)">
        <LoadingState message="Loading..." minHeight="100vh" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="var(--color-background)">
      <SkipNav />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {/* Hero Banner with Conway Background and Logo */}
      <ErrorBoundary>
        <HeroBanner
          logoPosition={logoPosition}
          onLogoPositionChange={handleLogoPositionChange}
          updateInterval={CONWAY_UPDATE_INTERVAL}
          density={DEFAULT_DENSITY}
        />
      </ErrorBoundary>

      {/* Scrollable Content Sections */}
      <ErrorBoundary>
        <Box as="main" id="main-content">
          <Stack gap={0}>
            <Suspense fallback={<LoadingState message="Loading content..." minHeight="50vh" />}>
              <About />
              <Mission />
              <PreviousWork />
              <Contact />
            </Suspense>
          </Stack>
        </Box>
      </ErrorBoundary>
    </Box>
  );
}
