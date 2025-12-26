import { memo } from 'react';
import { Heading } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS, HEADING_SIZE } from '../../config/layout';
import type { SectionHeadingProps } from '../../types/components';

/**
 * Reusable section heading component
 * Provides consistent styling for section titles
 *
 * @param children - Heading text content
 * @param as - HTML heading level (default: h2)
 */
export const SectionHeading = memo(function SectionHeading({
  children,
  as = 'h2',
}: SectionHeadingProps): React.JSX.Element {
  return (
    <Heading
      as={as}
      size={HEADING_SIZE.SECTION}
      color={COLORS.TEXT}
      fontFamily={FONTS.HEADING}
      fontWeight={FONT_WEIGHTS.REGULAR}
    >
      {children}
    </Heading>
  );
});
