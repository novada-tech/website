import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { ConwayBackground } from './ConwayBackground';
import { LogoBlocksOverlay } from './LogoBlocksOverlay';
import { Logo } from './Logo';

interface HeroBannerProps {
  readonly logoPosition: { x: number; y: number };
  readonly onLogoPositionChange: (x: number, y: number) => void;
  readonly updateInterval: number;
  readonly density: number;
}

/**
 * Hero banner section with Conway's Game of Life background and logo
 * Combines the animated background, logo blocks overlay, and centered logo
 *
 * @param logoPosition - Current position of the logo center
 * @param onLogoPositionChange - Callback when logo position changes
 * @param updateInterval - Conway simulation update interval in milliseconds
 * @param density - Initial density of alive cells (0-1)
 *
 * @example
 * ```tsx
 * <HeroBanner
 *   logoPosition={{ x: 0, y: 0 }}
 *   onLogoPositionChange={handlePositionChange}
 *   updateInterval={CONWAY_UPDATE_INTERVAL}
 *   density={DEFAULT_DENSITY}
 * />
 * ```
 */
export const HeroBanner = memo(function HeroBanner({
  logoPosition,
  onLogoPositionChange,
  updateInterval,
  density,
}: HeroBannerProps): React.JSX.Element {
  return (
    <Box
      as="section"
      position="relative"
      h={{ base: '70vh', md: '80vh' }}
      overflow="hidden"
      aria-label="Hero banner with animated background"
    >
      <ConwayBackground
        updateInterval={updateInterval}
        density={density}
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
        <Logo onPositionChange={onLogoPositionChange} />
      </Box>
    </Box>
  );
});
