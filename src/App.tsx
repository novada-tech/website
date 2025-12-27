import { useState, useCallback, lazy, Suspense } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useTheme } from './hooks/useTheme';
import { useFontsLoaded } from './hooks/useFontsLoaded';
import { HeroBanner } from './components/hero/HeroBanner';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { SkipNav } from './components/layout/SkipNav';
import { ThemeToggle } from './components/layout/ThemeToggle';
import { LoadingState } from './components/ui/LoadingState';
import { CONWAY_UPDATE_INTERVAL } from './config';

// Lazy load sections below the fold for better initial load performance
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })));
const Mission = lazy(() =>
  import('./components/sections/Mission').then((m) => ({ default: m.Mission }))
);
const PreviousWork = lazy(() =>
  import('./components/sections/PreviousWork').then((m) => ({
    default: m.PreviousWork,
  }))
);
const WorkingWithTeams = lazy(() =>
  import('./components/sections/WorkingWithTeams').then((m) => ({
    default: m.WorkingWithTeams,
  }))
);
const MeetSimon = lazy(() =>
  import('./components/sections/MeetSimon').then((m) => ({ default: m.MeetSimon }))
);
const Boundaries = lazy(() =>
  import('./components/sections/Boundaries').then((m) => ({ default: m.Boundaries }))
);
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact }))
);

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
              <WorkingWithTeams />
              <MeetSimon />
              <Boundaries />
              <Contact />
            </Suspense>
          </Stack>
        </Box>
      </ErrorBoundary>
    </Box>
  );
}
