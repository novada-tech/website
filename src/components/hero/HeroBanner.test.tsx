import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import { HeroBanner } from './HeroBanner';

describe('HeroBanner', () => {
  const defaultProps = {
    logoPosition: { x: 0, y: 0 },
    onLogoPositionChange: vi.fn(),
    updateInterval: 100,
    density: 0.3,
  };

  it('should render hero banner section with proper accessibility', () => {
    render(<HeroBanner {...defaultProps} />);
    expect(screen.getByRole('region', { name: /hero banner/i })).toBeInTheDocument();
  });

  it('should render Conway background canvas', () => {
    const { container } = render(<HeroBanner {...defaultProps} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
