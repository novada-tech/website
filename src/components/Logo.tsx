import { useRef, useEffect, useState, memo } from 'react';
import type { LogoProps } from '../types/components';
import styles from './Logo.module.css';

export const Logo = memo(function Logo({
  logoSrc,
  logoAlt = 'NovAda Logo',
  onPositionChange,
}: LogoProps & { logoSrc?: string; logoAlt?: string }): React.JSX.Element {
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

  // Report logo center position to parent (only on mount/resize, not scroll)
  useEffect(() => {
    if (!logoRef.current || !onPositionChange) return;

    const updatePosition = (): void => {
      if (!logoRef.current) return;

      // Use offsetLeft/offsetTop which are relative to offsetParent, not viewport
      // This gives us stable positioning that doesn't change on scroll
      const logo = logoRef.current;
      const wrapper = logo.parentElement;

      if (wrapper) {
        // Get the wrapper's offset relative to its positioned parent
        const wrapperRect = wrapper.getBoundingClientRect();

        // Find the positioned parent (the banner section)
        let offsetParent = wrapper.offsetParent as HTMLElement;
        if (offsetParent) {
          const parentRect = offsetParent.getBoundingClientRect();

          // Calculate center relative to the offset parent
          const centerX = wrapperRect.left - parentRect.left + wrapperRect.width / 2;
          const centerY = wrapperRect.top - parentRect.top + wrapperRect.height / 2;

          onPositionChange(centerX, centerY);
        }
      }
    };

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(updatePosition, 0);

    window.addEventListener('resize', updatePosition);

    // Use ResizeObserver for logo size changes
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(logoRef.current);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePosition);
      resizeObserver.disconnect();
    };
  }, [onPositionChange]);

  return (
    <div className={styles.logoWrapper}>
      <img ref={logoRef} src={effectiveLogoSrc} alt={logoAlt} className={styles.logo} />
    </div>
  );
});
