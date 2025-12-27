import { memo } from 'react';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS } from '../../config';
import { HOVER_STATES, FOCUS_STATE } from '../../utils/animations';

interface LinkProps extends Omit<ChakraLinkProps, 'color'> {
  readonly children: React.ReactNode;
  readonly href: string;
  readonly external?: boolean;
}

export const Link = memo(function Link({
  children,
  href,
  external = false,
  ...props
}: LinkProps): React.JSX.Element {
  const isExternal = external || href.startsWith('http');

  return (
    <ChakraLink
      href={href}
      color={COLORS.SECONDARY}
      fontFamily={FONTS.BODY}
      fontWeight={FONT_WEIGHTS.MEDIUM}
      textDecoration="underline"
      _hover={{
        ...HOVER_STATES.LINK,
        textDecoration: 'underline',
      }}
      _focus={FOCUS_STATE}
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      {...props}
    >
      {children}
      {isExternal && ' ↗'}
    </ChakraLink>
  );
});
