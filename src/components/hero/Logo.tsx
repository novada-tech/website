import { useRef, useEffect, useState, memo } from 'react';
import type { LogoProps } from '../../types/components';
import styles from './Logo.module.css';

const LOGO_LIGHT = '/assets/logo/Novada_Logo_RGB_Donkerblauw.svg';
const LOGO_DARK = '/assets/logo/Novada_Logo_RGB_Warmlichtgrijs.svg';

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
  const effectiveLogoSrc = logoSrc || (currentTheme === 'dark' ? LOGO_DARK : LOGO_LIGHT);
  const logoRef = useRef<HTMLImageElement>(null);

  /**
   * Report logo center position to parent component
   *
   * This effect calculates the logo's center position relative to its offset parent
   * (the hero banner section) and reports it via the onPositionChange callback.
   *
   * The position is recalculated on:
   * - Component mount (with small delay to ensure DOM is ready)
   * - Window resize events
   * - Logo element size changes (via ResizeObserver)
   *
   * IMPORTANT: Uses offsetParent-relative positioning, not viewport positioning.
   * This ensures the position doesn't change during scroll, maintaining stable
   * positioning for decorative blocks around the logo.
   *
   * Position calculation strategy:
   * 1. Get logo wrapper's bounding rect (viewport-relative)
   * 2. Get offset parent's bounding rect (viewport-relative)
   * 3. Calculate difference to get offset-parent-relative position
   * 4. Add half width/height to get center point
   */
  useEffect(() => {
    if (!logoRef.current || !onPositionChange) return;

    const updatePosition = (): void => {
      if (!logoRef.current) return;

      const logo = logoRef.current;
      const wrapper = logo.parentElement;

      if (wrapper) {
        // Get the wrapper's bounding rect (viewport-relative)
        const wrapperRect = wrapper.getBoundingClientRect();

        // Find the positioned parent (the banner section with position: relative)
        let offsetParent = wrapper.offsetParent as HTMLElement;
        if (offsetParent) {
          const parentRect = offsetParent.getBoundingClientRect();

          // Calculate center position relative to the offset parent
          // This is stable during scroll since both rects move together
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
      <img
        ref={logoRef}
        src={effectiveLogoSrc}
        alt={logoAlt}
        className={styles.logo}
        loading="eager"
        width="300"
        height="91"
      />
    </div>
  );
});
