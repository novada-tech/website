import { Stack } from '@chakra-ui/react';
import { Section } from './common/Section';
import { SectionHeading } from './common/SectionHeading';
import { BodyText } from './common/BodyText';
import { CONTENT_GAP } from '../config/layout';

export function About(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>About</SectionHeading>
        <BodyText>
          NovAda is dedicated to creating increasingly better software through iterative
          improvement and thoughtful design. We believe in the power of continuous refinement
          and attention to detail.
        </BodyText>
        <BodyText>
          Our approach combines modern technology with proven methodologies to deliver
          solutions that evolve with your needs.
        </BodyText>
      </Stack>
    </Section>
  );
}
