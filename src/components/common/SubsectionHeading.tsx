import { memo } from 'react';
import { Heading } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS, HEADING_SIZE } from '../../config/layout';

interface SubsectionHeadingProps {
  readonly children: React.ReactNode;
}

/**
 * Reusable subsection heading component (h3)
 * Provides consistent styling for subsection titles
 *
 * @param children - Heading text content
 */
export const SubsectionHeading = memo(function SubsectionHeading({
  children,
}: SubsectionHeadingProps): React.JSX.Element {
  return (
    <Heading
      as="h3"
      size={HEADING_SIZE.SUBSECTION}
      color={COLORS.TEXT}
      fontFamily={FONTS.HEADING}
      fontWeight={FONT_WEIGHTS.REGULAR}
    >
      {children}
    </Heading>
  );
});
