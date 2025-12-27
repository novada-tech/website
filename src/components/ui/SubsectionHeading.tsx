import { memo } from 'react';
import { Heading } from '@chakra-ui/react';
import {COLORS, FONT_WEIGHTS, FONTS, HEADING_SIZE, SUBSECTION_HEADING_STYLE} from '../../config';

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
      fontWeight={FONT_WEIGHTS.BOLD}
      letterSpacing={SUBSECTION_HEADING_STYLE.letterSpacing}
    >
      {children}
    </Heading>
  );
});
