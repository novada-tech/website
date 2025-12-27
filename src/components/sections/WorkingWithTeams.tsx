import { Stack } from '@chakra-ui/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { BodyText } from '../ui/BodyText';
import { CONTENT_GAP } from '../../config';

export function WorkingWithTeams(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>Working with teams</SectionHeading>
        <BodyText>
          I enjoy working closely with teams and helping people grow confident in complex systems.
        </BodyText>
        <BodyText>
          I've coached colleagues, interns, and student teams by explaining background concepts,
          designing exercises, and focusing on long-term understanding rather than quick fixes.
        </BodyText>
        <BodyText>
          My goal is not to become a bottleneck, but to make myself unnecessary over time.
        </BodyText>
      </Stack>
    </Section>
  );
}
