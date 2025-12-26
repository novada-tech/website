import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';

export function About(): React.JSX.Element {
  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="var(--color-background)" display="flex" justifyContent="center">
      <Container maxW={{ base: '100%', md: '720px' }} px={{ base: 6, md: 8 }}>
        <Stack gap={6} align="start">
          <Heading
            as="h2"
            size={{ base: 'xl', md: '2xl' }}
            color="var(--color-text)"
            fontFamily="var(--font-heading)"
            fontWeight="400"
          >
            About
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="var(--color-text)"
            lineHeight="tall"
            fontFamily="var(--font-body)"
            fontWeight="500"
          >
            NovAda is dedicated to creating increasingly better software through iterative
            improvement and thoughtful design. We believe in the power of continuous refinement
            and attention to detail.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="var(--color-text)"
            lineHeight="tall"
            fontFamily="var(--font-body)"
            fontWeight="500"
          >
            Our approach combines modern technology with proven methodologies to deliver
            solutions that evolve with your needs.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
