import { memo } from 'react';
import { Box, Stack, Heading, Text } from '@chakra-ui/react';
import { ConwayBackground } from './ConwayBackground';
import { LogoBlocksOverlay } from './LogoBlocksOverlay';
import { Logo } from './Logo';
import { FONTS, FONT_WEIGHTS, CONTENT_GAP } from '../../config';

interface HeroBannerProps {
  readonly logoPosition: { x: number; y: number };
  readonly onLogoPositionChange: (x: number, y: number) => void;
  readonly updateInterval: number;
}

export const HeroBanner = memo(function HeroBanner({
  logoPosition,
  onLogoPositionChange,
  updateInterval,
}: HeroBannerProps): React.JSX.Element {
  return (
    <Box
      as="section"
      position="relative"
      h={{ base: 'auto', md: '70vh' }}
      minH={{ base: 'auto', md: 'auto' }}
      overflow="hidden"
      aria-label="Hero banner"
    >
      <ConwayBackground
        updateInterval={updateInterval}
        height="100%"
        logoX={logoPosition.x}
        logoY={logoPosition.y}
      />
      <LogoBlocksOverlay centerX={logoPosition.x} centerY={logoPosition.y} />
      <Box
        position="relative"
        zIndex={1}
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 6, md: 8 }}
        py={{ base: 12, md: 24 }}
      >
        <Stack gap={CONTENT_GAP.LARGE} align="center" maxW="900px" textAlign="center">
          <Box mb={6}>
            <Logo onPositionChange={onLogoPositionChange} />
          </Box>
          <Stack gap={CONTENT_GAP.MEDIUM}>
            <Heading
              as="h1"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontFamily={FONTS.HEADING}
              fontWeight={FONT_WEIGHTS.LIGHT}
              color="var(--color-primary)"
            >
              When the problem is genuinely hard, I help teams find the right solution.
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontFamily={FONTS.BODY}
              fontWeight={FONT_WEIGHTS.MEDIUM}
              color="var(--color-text)"
            >
              I work with software teams on analytically challenging problems — language design,
              security, complex models — by asking the right questions and designing solutions that
              last.
            </Text>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontFamily={FONTS.BODY}
              fontWeight={FONT_WEIGHTS.MEDIUM}
              color="var(--color-secondary)"
              fontStyle="italic"
            >
              I don't work instead of your team. I work with your team.
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
});
