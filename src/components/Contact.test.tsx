import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('should initially show reveal button', () => {
    render(<Contact />);
    const button = screen.getByText('Contact');
    expect(button).toBeInTheDocument();
  });

  it('should not show email initially', () => {
    render(<Contact />);
    const email = screen.queryByText(/@/);
    expect(email).not.toBeInTheDocument();
  });

  it('should reveal email when button is clicked', () => {
    render(<Contact />);
    const button = screen.getByText('Contact');
    fireEvent.click(button);

    const email = screen.getByText(/info@novada\.be/);
    expect(email).toBeInTheDocument();
  });

  it('should hide button after revealing email', () => {
    render(<Contact />);
    const button = screen.getByText('Contact');
    fireEvent.click(button);

    expect(screen.queryByText('Contact')).not.toBeInTheDocument();
  });

  it('should render email as mailto link', () => {
    render(<Contact />);
    const button = screen.getByText('Contact');
    fireEvent.click(button);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:info@novada.be');
  });
});
