import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConwayBackground } from './ConwayBackground';

describe('ConwayBackground', () => {
  it('should render a canvas element', () => {
    const { container } = render(<ConwayBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should set aria-hidden for accessibility', () => {
    const { container } = render(<ConwayBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('should accept custom props', () => {
    const { container } = render(
      <ConwayBackground cellSize={10} updateInterval={100} density={0.2} />
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
