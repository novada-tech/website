import { memo } from 'react';
import { Box, Container } from '@chakra-ui/react';
import {
  SECTION_PADDING_Y,
  CONTAINER_MAX_WIDTH,
  CONTAINER_PADDING_X,
  COLORS,
} from '../../config/layout';
import type { SectionProps } from '../../types/components';

export const Section = memo(function Section({
  children,
  maxWidth = 'text',
  as = 'section',
  withBorder = false,
}: SectionProps): React.JSX.Element {
  const containerMaxW =
    maxWidth === 'text'
      ? CONTAINER_MAX_WIDTH.TEXT
      : maxWidth === 'grid'
        ? CONTAINER_MAX_WIDTH.GRID
        : CONTAINER_MAX_WIDTH.FULL;

  return (
    <Box
      as={as}
      py={SECTION_PADDING_Y}
      bg={COLORS.BACKGROUND}
      display="flex"
      justifyContent="center"
      borderTop={withBorder ? '1px solid' : undefined}
      borderColor={withBorder ? COLORS.SECONDARY : undefined}
    >
      <Container maxW={containerMaxW} px={CONTAINER_PADDING_X}>
        {children}
      </Container>
    </Box>
  );
});
