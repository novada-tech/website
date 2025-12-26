import { memo } from 'react';
import { Heading } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS, HEADING_SIZE } from '../../config';

interface SubsectionHeadingProps {
  readonly children: React.ReactNode;
}

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
