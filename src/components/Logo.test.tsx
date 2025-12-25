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

  it('should render default blocks', () => {
    const { container } = render(<Logo />);
    const blocks = container.querySelectorAll('[class*="block"]');
    expect(blocks.length).toBeGreaterThan(0);
  });

  it('should render custom blocks when provided', () => {
    const customBlocks = [
      { x: 10, y: 20 },
      { x: 30, y: 40, size: 25 },
    ];
    const { container } = render(<Logo blocks={customBlocks} />);
    // Query for individual block elements, not the container
    const blocks = container.querySelectorAll('[class*="block"]:not([class*="blocks"])');
    expect(blocks).toHaveLength(2);
  });
});
