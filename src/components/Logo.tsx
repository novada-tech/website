import { useRef, useEffect } from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  logoSrc?: string;
  logoAlt?: string;
  onPositionChange?: (x: number, y: number) => void;
}

export function Logo({
  logoSrc = '/assets/logo/Novada_Logo_RGB_Donkerblauw.svg',
  logoAlt = 'NovAda Logo',
  onPositionChange,
}: LogoProps): React.JSX.Element {
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
        <img ref={logoRef} src={logoSrc} alt={logoAlt} className={styles.logo} />
      </div>
    </div>
  );
}
