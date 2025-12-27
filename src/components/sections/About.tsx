import { Stack, List } from '@chakra-ui/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { BodyText } from '../ui/BodyText';
import { CONTENT_GAP, FONTS, FONT_WEIGHTS, TEXT_SIZE } from '../../config';

export function About(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>From accidental complexity to deliberate design</SectionHeading>
        <BodyText>
          Many teams are slowed down not by a lack of effort, but by systems that have grown hard
          to reason about.
        </BodyText>
        <BodyText>
          I help teams break down complex domains — data models, rules, languages, architectures —
          and get the fundamentals right again.
        </BodyText>
        <BodyText>
          Sometimes that requires careful chiselling.
          <br />
          Sometimes it requires a sledgehammer.
        </BodyText>
        <List.Root
          fontSize={TEXT_SIZE.BODY}
          fontFamily={FONTS.BODY}
          fontWeight={FONT_WEIGHTS.MEDIUM}
          color="var(--color-text)"
          gap={2}
          pl={6}
          listStyleType="disc"
        >
          <List.Item>Untangling complex data models and rule systems</List.Item>
          <List.Item>Designing clear abstractions for users and developers</List.Item>
          <List.Item>Identifying structural issues instead of patching symptoms</List.Item>
          <List.Item>
            Improving debuggability, readability, and long-term maintainability
          </List.Item>
          <List.Item>Leaving behind systems other developers can confidently work on</List.Item>
        </List.Root>
      </Stack>
    </Section>
  );
}
