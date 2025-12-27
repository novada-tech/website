import { Stack } from '@chakra-ui/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { BodyText } from '../ui/BodyText';
import { CONTENT_GAP } from '../../config';

export function MeetSimon(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>Meet Simon</SectionHeading>
        <BodyText>
          I'm an analytical software engineer with a background in mathematics and physics.
        </BodyText>
        <BodyText>
          I enjoy deep focus, principled discussions — grounded in clear reasoning, explicit trade-offs, and respectful disagreement — and working from first principles. I learn
          quickly, communicate clearly, and care deeply about doing work well.
        </BodyText>
        <BodyText>
          Outside of work, that curiosity shows up in learning new instruments, reading, and
          long-term involvement in youth work.
        </BodyText>
      </Stack>
    </Section>
  );
}
