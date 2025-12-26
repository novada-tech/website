import { useState, useCallback } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useTheme } from './hooks/useTheme';
import { ConwayBackground } from './components/ConwayBackground';
import { LogoBlocksOverlay } from './components/LogoBlocksOverlay';
import { Logo } from './components/Logo';
import { About } from './components/About';
import { Mission } from './components/Mission';
import { PreviousWork } from './components/PreviousWork';
import { Contact } from './components/Contact';
import { CONWAY_UPDATE_INTERVAL } from './config/constants';

export function App(): React.JSX.Element {
  const [theme, setTheme] = useTheme();
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Memoize callback to prevent Logo effect from recreating
  const handleLogoPositionChange = useCallback((x: number, y: number): void => {
    setLogoPosition({ x, y });
  }, []);

  return (
    <Box minH="100vh" bg="var(--color-background)">
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: 'var(--color-secondary)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Hero Banner with Conway Background and Logo */}
      <Box
        as="section"
        position="relative"
        h={{ base: '70vh', md: '80vh' }}
        overflow="hidden"
      >
        <ConwayBackground
          updateInterval={CONWAY_UPDATE_INTERVAL}
          height="100%"
        />
        <LogoBlocksOverlay centerX={logoPosition.x} centerY={logoPosition.y} />
        <Box
          position="relative"
          zIndex={1}
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Logo onPositionChange={handleLogoPositionChange} />
        </Box>
      </Box>

      {/* Scrollable Content Sections */}
      <Stack gap={0}>
        <About />
        <Mission />
        <PreviousWork />
        <Contact />
      </Stack>
    </Box>
  );
}
