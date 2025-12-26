import { memo } from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { FONTS, FONT_WEIGHTS, COLORS } from '../../config/layout';

interface LoadingStateProps {
  readonly message?: string;
  readonly minHeight?: string;
  readonly showSpinner?: boolean;
}

/**
 * Loading state component with optional message
 * Displays a centered spinner with optional loading message
 *
 * @param message - Optional loading message to display
 * @param minHeight - Minimum height of the loading container (default: "100px")
 * @param showSpinner - Whether to show the spinner (default: true)
 *
 * @example
 * ```tsx
 * <LoadingState message="Loading content..." minHeight="50vh" />
 * ```
 */
export const LoadingState = memo(function LoadingState({
  message = 'Loading...',
  minHeight = '100px',
  showSpinner = true,
}: LoadingStateProps): React.JSX.Element {
  return (
    <Box
      minH={minHeight}
      display="flex"
      alignItems="center"
      justifyContent="center"
      aria-live="polite"
      aria-busy="true"
    >
      <VStack gap={4}>
        {showSpinner && (
          <Spinner
            size="xl"
            color={COLORS.SECONDARY}
          />
        )}
        {message && (
          <Text
            fontFamily={FONTS.BODY}
            fontWeight={FONT_WEIGHTS.MEDIUM}
            color={COLORS.PRIMARY}
            fontSize="1rem"
          >
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
});
