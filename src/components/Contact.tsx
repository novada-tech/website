import { useState } from 'react';
import { Box, Container, Button, Link, Stack, Heading } from '@chakra-ui/react';

/**
 * Contact component with anti-scraper protection
 * Email is obfuscated and only revealed through user interaction
 */
export function Contact(): React.JSX.Element {
  const [revealed, setRevealed] = useState(false);

  // Email parts stored separately and assembled on user action
  const emailParts = {
    user: 'simon.cockx',
    domain: 'novada',
    tld: 'be',
  };

  const handleReveal = (): void => {
    setRevealed(true);
  };

  const getEmail = (): string => {
    return `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
  };

  return (
    <Box
      as="footer"
      py={{ base: 16, md: 24 }}
      bg="var(--color-background)"
      borderTop="1px solid"
      borderColor="var(--color-secondary)"
      display="flex"
      justifyContent="center"
    >
      <Container maxW={{ base: '100%', md: '720px' }} px={{ base: 6, md: 8 }}>
        <Stack gap={6} align="start">
          <Heading
            as="h2"
            size={{ base: 'xl', md: '2xl' }}
            color="var(--color-text)"
            fontFamily="var(--font-heading)"
            fontWeight="400"
          >
            Contact
          </Heading>
          {!revealed ? (
            <Button
              onClick={handleReveal}
              bg="var(--color-secondary)"
              color="white"
              size={{ base: 'md', md: 'lg' }}
              fontFamily="var(--font-body)"
              fontWeight="500"
              _hover={{ opacity: 0.9 }}
              _active={{ transform: 'scale(0.98)' }}
              aria-label="Reveal contact information"
            >
              Get in Touch
            </Button>
          ) : (
            <Link
              href={`mailto:${getEmail()}`}
              color="var(--color-secondary)"
              fontSize={{ base: 'lg', md: 'xl' }}
              fontFamily="var(--font-body)"
              fontWeight="500"
              _hover={{ textDecoration: 'underline' }}
              onClick={(e) => {
                // Additional layer: construct href on click
                e.currentTarget.href = `mailto:${getEmail()}`;
              }}
            >
              {getEmail()}
            </Link>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
