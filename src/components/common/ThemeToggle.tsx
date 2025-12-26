import { memo } from 'react';
import { Button } from '@chakra-ui/react';
import type { Theme } from '../../types/theme';
import { TRANSITIONS, HOVER_SCALE, ACTIVE_SCALE } from '../../utils/animations';

interface ThemeToggleProps {
  readonly theme: Theme;
  readonly onToggle: () => void;
}

export const ThemeToggle = memo(function ThemeToggle({
  theme,
  onToggle,
}: ThemeToggleProps): React.JSX.Element {
  return (
    <Button
      onClick={onToggle}
      position="fixed"
      top="1rem"
      right="1rem"
      bg="var(--color-secondary)"
      color="white"
      border="none"
      borderRadius="50%"
      width="48px"
      height="48px"
      minW="48px"
      cursor="pointer"
      zIndex={100}
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
      fontSize="1.5rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      _hover={{
        transform: HOVER_SCALE.SMALL,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
      _active={{
        transform: ACTIVE_SCALE.BUTTON,
      }}
      transition={TRANSITIONS.FAST}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
});
