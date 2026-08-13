import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('should render spinner by default', () => {
    render(<LoadingState />);
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('should not render spinner when showSpinner is false', () => {
    render(<LoadingState showSpinner={false} />);
    expect(screen.queryByRole('status', { hidden: true })).not.toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const { container } = render(<LoadingState />);
    const loadingContainer = container.firstChild;
    expect(loadingContainer).toHaveAttribute('aria-live', 'polite');
    expect(loadingContainer).toHaveAttribute('aria-busy', 'true');
  });
});
