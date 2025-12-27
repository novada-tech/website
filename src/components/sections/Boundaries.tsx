import { Stack } from '@chakra-ui/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { BodyText } from '../ui/BodyText';
import { CONTENT_GAP } from '../../config';

export function Boundaries(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>What I'm not a good fit for</SectionHeading>
        <BodyText>I'm not a support engineer, and I don't enjoy repetitive work.</BodyText>
        <BodyText>
          I'm happiest when solving new, complex problems — not executing predefined plans or doing
          pure UI work without underlying technical challenges.
        </BodyText>
      </Stack>
    </Section>
  );
}
