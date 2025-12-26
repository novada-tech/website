import { useState } from 'react';
import { Button, Link, Stack } from '@chakra-ui/react';
import { Section } from './common/Section';
import { SectionHeading } from './common/SectionHeading';
import { CONTENT_GAP, COLORS, FONTS, FONT_WEIGHTS, TEXT_SIZE } from '../config/layout';

const EMAIL_PARTS = {
  user: 'simon.cockx',
  domain: 'novada',
  tld: 'be',
} as const;

/**
 * Assembles email address from parts
 * Used for anti-scraper protection
 */
function getEmail(): string {
  return `${EMAIL_PARTS.user}@${EMAIL_PARTS.domain}.${EMAIL_PARTS.tld}`;
}

/**
 * Contact section component with email reveal functionality
 * Email is obfuscated and only revealed through user interaction
 */
export function Contact(): React.JSX.Element {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = (): void => {
    setRevealed(true);
  };

  return (
    <Section maxWidth="text" as="footer" withBorder>
      <Stack gap={CONTENT_GAP.MEDIUM} align="start">
        <SectionHeading>Contact</SectionHeading>
        {!revealed ? (
          <Button
            onClick={handleReveal}
            bg={COLORS.SECONDARY}
            color="white"
            size={{ base: 'md', md: 'lg' }}
            fontFamily={FONTS.BODY}
            fontWeight={FONT_WEIGHTS.MEDIUM}
            _hover={{ opacity: 0.9 }}
            _active={{ transform: 'scale(0.98)' }}
            aria-label="Reveal contact information"
          >
            Get in Touch
          </Button>
        ) : (
          <Link
            href={`mailto:${getEmail()}`}
            color={COLORS.SECONDARY}
            fontSize={TEXT_SIZE.BODY}
            fontFamily={FONTS.BODY}
            fontWeight={FONT_WEIGHTS.MEDIUM}
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
    </Section>
  );
}
