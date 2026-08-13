import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('should have proper aria-label for light theme', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to dark mode/i);
  });

  it('should have proper aria-label for dark theme', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAccessibleName(/switch to light mode/i);
  });

  it('should call onToggle when clicked', async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    render(<ThemeToggle theme="light" onToggle={handleToggle} />);
    await user.click(screen.getByRole('button'));

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
