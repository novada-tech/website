import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeToggle } from './ThemeToggle';

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('ThemeToggle', () => {
  it('should render moon icon for light theme', () => {
    renderWithChakra(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('🌙');
  });

  it('should render sun icon for dark theme', () => {
    renderWithChakra(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('☀️');
  });

  it('should have proper aria-label for light theme', () => {
    renderWithChakra(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('should have proper aria-label for dark theme', () => {
    renderWithChakra(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('should call onToggle when clicked', async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    renderWithChakra(<ThemeToggle theme="light" onToggle={handleToggle} />);

    await user.click(screen.getByRole('button'));

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('should be positioned fixed in top-right corner', () => {
    const { container } = renderWithChakra(<ThemeToggle theme="light" onToggle={() => {}} />);
    const button = container.querySelector('button');

    expect(button).toHaveStyle({
      position: 'fixed',
      top: '1rem',
      right: '1rem',
    });
  });
});
