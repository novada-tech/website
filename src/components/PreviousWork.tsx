import { Box, Container, Heading, Text, Stack, SimpleGrid } from '@chakra-ui/react';

export function PreviousWork(): React.JSX.Element {
  const projects = [
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
  ];

  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="var(--color-background)" display="flex" justifyContent="center">
      <Container maxW={{ base: '100%', md: '960px' }} px={{ base: 6, md: 8 }}>
        <Stack gap={8} align="start">
          <Heading
            as="h2"
            size={{ base: 'xl', md: '2xl' }}
            color="var(--color-text)"
            fontFamily="var(--font-heading)"
            fontWeight="400"
          >
            Previous Work
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="var(--color-text)"
            lineHeight="tall"
            fontFamily="var(--font-body)"
            fontWeight="500"
          >
            Here are some of the projects we've worked on, demonstrating our commitment
            to excellence and continuous improvement.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            {projects.map((project, index) => (
              <Box
                key={index}
                bg="var(--color-accent)"
                boxShadow="md"
                borderRadius="md"
                p={6}
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
              >
                <Heading
                  as="h3"
                  size="md"
                  mb={3}
                  color="var(--color-text)"
                  fontFamily="var(--font-heading)"
                  fontWeight="400"
                >
                  {project.title}
                </Heading>
                <Text
                  color="var(--color-text)"
                  fontSize="sm"
                  fontFamily="var(--font-body)"
                  fontWeight="500"
                >
                  {project.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
