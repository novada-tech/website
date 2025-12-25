import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LogoBlocksOverlay } from './LogoBlocksOverlay';

describe('LogoBlocksOverlay', () => {
  it('should render a canvas element', () => {
    const { container } = render(<LogoBlocksOverlay centerX={100} centerY={100} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should set aria-hidden for accessibility', () => {
    const { container } = render(<LogoBlocksOverlay centerX={100} centerY={100} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('should accept custom blocks', () => {
    const customBlocks = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    const { container } = render(
      <LogoBlocksOverlay centerX={100} centerY={100} blocks={customBlocks} />
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
