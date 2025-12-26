import { Stack, SimpleGrid } from '@chakra-ui/react';
import { Section } from './common/Section';
import { SectionHeading } from './common/SectionHeading';
import { BodyText } from './common/BodyText';
import { ProjectCard } from './common/ProjectCard';
import { CONTENT_GAP } from '../config';

const PROJECTS = [
  {
    title: 'Project Alpha',
    description: 'A comprehensive solution for enterprise resource planning.',
  },
  {
    title: 'Project Beta',
    description: 'Real-time data analytics platform for decision-making.',
  },
  {
    title: 'Project Gamma',
    description: 'Modern web application with seamless user experience.',
  },
] as const;

export function PreviousWork(): React.JSX.Element {
  return (
    <Section maxWidth="grid">
      <Stack gap={CONTENT_GAP.LARGE} align="start">
        <SectionHeading>Previous Work</SectionHeading>
        <BodyText>
          Here are some of the projects we've worked on, demonstrating our commitment to excellence
          and continuous improvement.
        </BodyText>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={CONTENT_GAP.MEDIUM} w="full">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} title={project.title} description={project.description} />
          ))}
        </SimpleGrid>
      </Stack>
    </Section>
  );
}
