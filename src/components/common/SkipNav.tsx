import { memo } from 'react';
import { Box, Link } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS } from '../../config/layout';

/**
 * Skip navigation link for accessibility
 * Allows keyboard users to skip directly to main content
 * Hidden visually but available to screen readers and keyboard navigation
 */
export const SkipNav = memo(function SkipNav(): React.JSX.Element {
  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      zIndex={9999}
      aria-label="Skip navigation"
    >
      <Link
        href="#main-content"
        position="absolute"
        left="-9999px"
        top="0"
        zIndex={9999}
        padding="1rem"
        bg={COLORS.SECONDARY}
        color="white"
        fontFamily={FONTS.BODY}
        fontWeight={FONT_WEIGHTS.MEDIUM}
        textDecoration="none"
        _focus={{
          left: '1rem',
          top: '1rem',
          outline: '2px solid white',
          outlineOffset: '2px',
        }}
      >
        Skip to main content
      </Link>
    </Box>
  );
});
