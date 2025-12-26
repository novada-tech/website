import { Stack } from '@chakra-ui/react';
import { Section } from './common/Section';
import { SectionHeading } from './common/SectionHeading';
import { BodyText } from './common/BodyText';
import { CONTENT_GAP } from '../config/layout';

export function Mission(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>Mission</SectionHeading>
        <BodyText>
          Our mission is to empower organizations with software that continuously improves,
          adapts, and scales. We're committed to building solutions that stand the test of time
          while remaining flexible enough to embrace change.
        </BodyText>
        <BodyText>
          Through careful iteration and thoughtful engineering, we help our clients achieve
          their goals with software that grows alongside their ambitions.
        </BodyText>
      </Stack>
    </Section>
  );
}
