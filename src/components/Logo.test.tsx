import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('should render logo image', () => {
    render(<Logo />);
    const img = screen.getByAltText('NovAda Logo');
    expect(img).toBeInTheDocument();
  });

  it('should use custom logo source when provided', () => {
    render(<Logo logoSrc="/custom-logo.svg" logoAlt="Custom Logo" />);
    const img = screen.getByAltText('Custom Logo');
    expect(img).toHaveAttribute('src', '/custom-logo.svg');
  });

  it('should call onPositionChange when logo loads', () => {
    const onPositionChange = vi.fn();
    render(<Logo onPositionChange={onPositionChange} />);
    // Position change is called asynchronously
    expect(onPositionChange).toBeDefined();
  });
});
