import { Stack, SimpleGrid } from '@chakra-ui/react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../ui/ProjectCard';
import { CONTENT_GAP } from '../../config';

const EXAMPLES = [
  {
    title: 'Replacing a long-standing build system',
    description:
      'At REGnosys, I replaced a legacy Tycho-based build system with a pure Maven build — something no one had previously dared to do. This significantly reduced complexity and made the system easier to maintain and understand for new developers.',
  },
  {
    title: 'Harmonising fractured systems',
    description:
      'I led migrations where multiple fractured systems were harmonised into a single coherent model while preserving backwards compatibility. One example involved unifying two incompatible expression trees so that existing code continued to parse and behave identically, requiring careful design and communication.',
  },
  {
    title: 'Eliminating recurring errors at the source',
    description:
      'I identified recurring issues caused by inconsistent data representations in generated Java code. Instead of fixing individual errors, I designed and implemented a generic coercion layer that automatically handled conversions between common data and wrapper types, eliminating an entire class of generation errors.',
  },
] as const;

export function PreviousWork(): React.JSX.Element {
  return (
    <Section maxWidth="grid">
      <Stack gap={CONTENT_GAP.LARGE} align="start">
        <SectionHeading>Examples from practice</SectionHeading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={CONTENT_GAP.MEDIUM} w="full">
          {EXAMPLES.map((example, index) => (
            <ProjectCard key={index} title={example.title} description={example.description} />
          ))}
        </SimpleGrid>
      </Stack>
    </Section>
  );
}
