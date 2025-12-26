import { memo } from 'react';
import { Text } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS, TEXT_SIZE } from '../../config/layout';
import type { BodyTextProps } from '../../types/components';

/**
 * Reusable body text component
 * Provides consistent styling for paragraph text
 *
 * @param children - Text content
 * @param size - Text size preset: 'body' (default) or 'small'
 */
export const BodyText = memo(function BodyText({
  children,
  size = 'body',
}: BodyTextProps): React.JSX.Element {
  const fontSize = size === 'body' ? TEXT_SIZE.BODY : TEXT_SIZE.SMALL;

  return (
    <Text
      fontSize={fontSize}
      color={COLORS.TEXT}
      lineHeight="tall"
      fontFamily={FONTS.BODY}
      fontWeight={FONT_WEIGHTS.MEDIUM}
    >
      {children}
    </Text>
  );
});
