import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';

export function Mission(): React.JSX.Element {
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
            Mission
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="var(--color-text)"
            lineHeight="tall"
            fontFamily="var(--font-body)"
            fontWeight="500"
          >
            Our mission is to empower organizations with software that continuously improves,
            adapts, and scales. We're committed to building solutions that stand the test of time
            while remaining flexible enough to embrace change.
          </Text>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="var(--color-text)"
            lineHeight="tall"
            fontFamily="var(--font-body)"
            fontWeight="500"
          >
            Through careful iteration and thoughtful engineering, we help our clients achieve
            their goals with software that grows alongside their ambitions.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
