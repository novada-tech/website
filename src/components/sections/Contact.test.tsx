import { renderWithChakra, screen, fireEvent } from '../../test/utils';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';

const REVEAL_BUTTON = { name: /reveal email address/i };

describe('Contact', () => {
  it('should initially show reveal button', () => {
    renderWithChakra(<Contact />);
    expect(screen.getByRole('button', REVEAL_BUTTON)).toBeInTheDocument();
  });

  it('should not show email initially', () => {
    renderWithChakra(<Contact />);
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });

  it('should reveal email when button is clicked', () => {
    renderWithChakra(<Contact />);
    fireEvent.click(screen.getByRole('button', REVEAL_BUTTON));

    expect(screen.getByText(/simon\.cockx@novada\.be/)).toBeInTheDocument();
  });

  it('should hide button after revealing email', () => {
    renderWithChakra(<Contact />);
    fireEvent.click(screen.getByRole('button', REVEAL_BUTTON));

    expect(screen.queryByRole('button', REVEAL_BUTTON)).not.toBeInTheDocument();
  });

  it('should render email as mailto link', () => {
    renderWithChakra(<Contact />);
    fireEvent.click(screen.getByRole('button', REVEAL_BUTTON));

    const link = screen.getByRole('link', { name: /simon\.cockx@novada\.be/ });
    expect(link).toHaveAttribute('href', expect.stringContaining('mailto:simon.cockx@novada.be'));
  });
});
