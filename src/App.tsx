import { useState, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { ConwayBackground } from './components/ConwayBackground';
import { LogoBlocksOverlay } from './components/LogoBlocksOverlay';
import { Logo } from './components/Logo';
import { Contact } from './components/Contact';
import { CONWAY_UPDATE_INTERVAL } from './config/constants';
import styles from './App.module.css';

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
    <div className={styles.app}>
      <ConwayBackground updateInterval={CONWAY_UPDATE_INTERVAL} />
      <LogoBlocksOverlay centerX={logoPosition.x} centerY={logoPosition.y} />

      <button
        onClick={toggleTheme}
        className={styles.themeToggle}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <main className={styles.main}>
        <Logo onPositionChange={handleLogoPositionChange} />
      </main>

      <Contact />
    </div>
  );
}
