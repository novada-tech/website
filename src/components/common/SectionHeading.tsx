import { memo } from 'react';
import { Heading } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS, HEADING_SIZE } from '../../config';
import type { SectionHeadingProps } from '../../types/components';

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
