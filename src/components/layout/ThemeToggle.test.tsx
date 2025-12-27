import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeToggle } from './ThemeToggle';

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('ThemeToggle', () => {
  it('should have proper aria-label for light theme', () => {
    renderWithChakra(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to dark mode/i);
  });

  it('should have proper aria-label for dark theme', () => {
    renderWithChakra(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to light mode/i);
  });

  it('should call onToggle when clicked', async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    renderWithChakra(<ThemeToggle theme="light" onToggle={handleToggle} />);
    await user.click(screen.getByRole('button'));

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
