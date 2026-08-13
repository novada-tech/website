import { Stack } from '@chakra-ui/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { BodyText } from '../ui/BodyText';
import { Link } from '../ui/Link';
import { CONTENT_GAP, BLOG_BASE_PATH, BLOG_INDEX } from '../../config';

export function Writing(): React.JSX.Element {
  return (
    <Section maxWidth="text">
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>{BLOG_INDEX.TITLE}</SectionHeading>
        <BodyText>{BLOG_INDEX.DESCRIPTION}</BodyText>
        <Link href={`${BLOG_BASE_PATH}/`}>Read the latest posts</Link>
      </Stack>
    </Section>
  );
}
