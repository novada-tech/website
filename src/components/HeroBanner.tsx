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
