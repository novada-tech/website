import { useTheme } from './hooks/useTheme';
import { ConwayBackground } from './components/ConwayBackground';
import { Logo } from './components/Logo';
import { Contact } from './components/Contact';
import styles from './App.module.css';

export function App(): React.JSX.Element {
  const [theme, setTheme] = useTheme();

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={styles.app}>
      <ConwayBackground />

      <button
        onClick={toggleTheme}
        className={styles.themeToggle}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <main className={styles.main}>
        <Logo />
      </main>

      <Contact />
    </div>
  );
}
