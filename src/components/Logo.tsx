import { useRef, useEffect, useState } from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  logoSrc?: string;
  logoAlt?: string;
  onPositionChange?: (x: number, y: number) => void;
}

export function Logo({
  logoSrc,
  logoAlt = 'NovAda Logo',
  onPositionChange,
}: LogoProps): React.JSX.Element {
  const [currentTheme, setCurrentTheme] = useState<string>(
    document.documentElement.getAttribute('data-theme') || 'light'
  );

  // Observe theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      setCurrentTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Determine logo src based on theme
  const effectiveLogoSrc = logoSrc || (
    currentTheme === 'dark'
      ? '/assets/logo/Novada_Logo_RGB_Warmlichtgrijs.svg'
      : '/assets/logo/Novada_Logo_RGB_Donkerblauw.svg'
  );
  const logoRef = useRef<HTMLImageElement>(null);

  // Report logo center position to parent
  useEffect(() => {
    if (!logoRef.current || !onPositionChange) return;

    const updatePosition = (): void => {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      onPositionChange(centerX, centerY);
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    // Use ResizeObserver for logo size changes
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(logoRef.current);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      resizeObserver.disconnect();
    };
  }, [onPositionChange]);

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img ref={logoRef} src={effectiveLogoSrc} alt={logoAlt} className={styles.logo} />
      </div>
    </div>
  );
}
