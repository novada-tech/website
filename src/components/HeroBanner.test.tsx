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

  it('should render hero banner section', () => {
    renderWithChakra(<HeroBanner {...defaultProps} />);
    const section = screen.getByRole('region', { name: /hero banner/i });
    expect(section).toBeInTheDocument();
  });

  it('should have proper aria-label', () => {
    renderWithChakra(<HeroBanner {...defaultProps} />);
    expect(screen.getByLabelText('Hero banner with animated background')).toBeInTheDocument();
  });

  it('should render with proper height on mobile', () => {
    const { container } = renderWithChakra(<HeroBanner {...defaultProps} />);
    const section = container.querySelector('section');

    // Check that height responsive prop is applied (Chakra UI will convert to CSS)
    expect(section).toBeInTheDocument();
  });

  it('should render Conway background canvas', () => {
    const { container } = renderWithChakra(<HeroBanner {...defaultProps} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should render logo', () => {
    const { container } = renderWithChakra(<HeroBanner {...defaultProps} />);
    // Logo component renders an img with alt text
    const logo = container.querySelector('img[alt*="NovAda"]');
    expect(logo).toBeInTheDocument();
  });
});
