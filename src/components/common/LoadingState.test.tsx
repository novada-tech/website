import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { LoadingState } from './LoadingState';

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('LoadingState', () => {
  it('should render spinner by default', () => {
    renderWithChakra(<LoadingState />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it('should render default loading message', () => {
    renderWithChakra(<LoadingState />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render custom message', () => {
    renderWithChakra(<LoadingState message="Loading content..." />);
    expect(screen.getByText('Loading content...')).toBeInTheDocument();
  });

  it('should not render spinner when showSpinner is false', () => {
    renderWithChakra(<LoadingState showSpinner={false} />);
    const spinner = screen.queryByRole('status', { hidden: true });
    expect(spinner).not.toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const { container } = renderWithChakra(<LoadingState />);
    const loadingContainer = container.firstChild;
    expect(loadingContainer).toHaveAttribute('aria-live', 'polite');
    expect(loadingContainer).toHaveAttribute('aria-busy', 'true');
  });

  it('should apply custom minHeight', () => {
    const { container } = renderWithChakra(<LoadingState minHeight="200px" />);
    const loadingContainer = container.firstChild as HTMLElement;
    expect(loadingContainer).toHaveStyle({ minHeight: '200px' });
  });
});
