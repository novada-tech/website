import { Component, ReactNode } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { COLORS, FONTS, FONT_WEIGHTS, HEADING_SIZE } from '../../config';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component that catches JavaScript errors in child components
 * Displays a fallback UI instead of crashing the entire application
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 *
 * With custom fallback:
 * ```tsx
 * <ErrorBoundary fallback={<div>Custom error message</div>}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you could send this to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Box
          minH="50vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={COLORS.BACKGROUND}
          p={8}
        >
          <Box maxW="600px" textAlign="center">
            <Heading
              as="h2"
              size={HEADING_SIZE.SECTION}
              color={COLORS.TEXT}
              fontFamily={FONTS.HEADING}
              fontWeight={FONT_WEIGHTS.REGULAR}
              mb={4}
            >
              Something went wrong
            </Heading>
            <Text
              color={COLORS.TEXT}
              fontFamily={FONTS.BODY}
              fontWeight={FONT_WEIGHTS.MEDIUM}
              mb={6}
            >
              We encountered an unexpected error. Please try refreshing the page.
            </Text>
            <Button
              onClick={this.handleReset}
              bg={COLORS.SECONDARY}
              color="white"
              fontFamily={FONTS.BODY}
              fontWeight={FONT_WEIGHTS.MEDIUM}
              _hover={{ opacity: 0.9 }}
            >
              Try Again
            </Button>
            {import.meta.env.DEV && this.state.error && (
              <Box mt={6} p={4} bg="rgba(255, 0, 0, 0.1)" borderRadius="md" textAlign="left">
                <Text fontSize="sm" fontFamily="monospace" color={COLORS.TEXT}>
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
