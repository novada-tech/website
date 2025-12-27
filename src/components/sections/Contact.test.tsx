import { renderWithChakra, screen, fireEvent } from '../test/utils';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('should initially show reveal button', () => {
    renderWithChakra(<Contact />);
    const button = screen.getByRole('button', { name: /get in touch/i });
    expect(button).toBeInTheDocument();
  });

  it('should not show email initially', () => {
    renderWithChakra(<Contact />);
    const email = screen.queryByText(/@/);
    expect(email).not.toBeInTheDocument();
  });

  it('should reveal email when button is clicked', () => {
    renderWithChakra(<Contact />);
    const button = screen.getByRole('button', { name: /get in touch/i });
    fireEvent.click(button);

    const email = screen.getByText(/simon\.cockx@novada\.be/);
    expect(email).toBeInTheDocument();
  });

  it('should hide button after revealing email', () => {
    renderWithChakra(<Contact />);
    const button = screen.getByRole('button', { name: /get in touch/i });
    fireEvent.click(button);

    expect(screen.queryByRole('button', { name: /get in touch/i })).not.toBeInTheDocument();
  });

  it('should render email as mailto link', () => {
    renderWithChakra(<Contact />);
    const button = screen.getByRole('button', { name: /get in touch/i });
    fireEvent.click(button);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('mailto:simon.cockx@novada.be'));
  });
});
