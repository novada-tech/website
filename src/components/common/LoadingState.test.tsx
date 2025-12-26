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
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('should not render spinner when showSpinner is false', () => {
    renderWithChakra(<LoadingState showSpinner={false} />);
    expect(screen.queryByRole('status', { hidden: true })).not.toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const { container } = renderWithChakra(<LoadingState />);
    const loadingContainer = container.firstChild;
    expect(loadingContainer).toHaveAttribute('aria-live', 'polite');
    expect(loadingContainer).toHaveAttribute('aria-busy', 'true');
  });
});
