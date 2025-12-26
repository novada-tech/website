import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { HeroBanner } from './HeroBanner';

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('HeroBanner', () => {
  const defaultProps = {
    logoPosition: { x: 0, y: 0 },
    onLogoPositionChange: vi.fn(),
    updateInterval: 100,
    density: 0.3,
  };

  it('should render hero banner section with proper accessibility', () => {
    renderWithChakra(<HeroBanner {...defaultProps} />);
    expect(screen.getByRole('region', { name: /hero banner/i })).toBeInTheDocument();
  });

  it('should render Conway background canvas', () => {
    const { container } = renderWithChakra(<HeroBanner {...defaultProps} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
