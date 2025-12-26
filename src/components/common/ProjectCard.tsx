import { memo } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { BodyText } from './BodyText';
import { COLORS, FONTS, FONT_WEIGHTS, HEADING_SIZE } from '../../config/layout';
import type { ProjectCardProps } from '../../types/components';

export const ProjectCard = memo(function ProjectCard({ title, description }: ProjectCardProps): React.JSX.Element {
  return (
    <Box
      bg={COLORS.ACCENT}
      boxShadow="md"
      borderRadius="md"
      p={6}
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
    >
      <Heading
        as="h3"
        size={HEADING_SIZE.SUBSECTION}
        mb={3}
        color={COLORS.TEXT}
        fontFamily={FONTS.HEADING}
        fontWeight={FONT_WEIGHTS.REGULAR}
      >
        {title}
      </Heading>
      <BodyText size="small">{description}</BodyText>
    </Box>
  );
});
