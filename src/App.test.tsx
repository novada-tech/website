import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render logo', () => {
    render(<App />);
    expect(screen.getByAltText('NovAda Logo')).toBeInTheDocument();
  });

  it('should render theme toggle button', () => {
    render(<App />);
    const toggleButton = screen.getByRole('button', { name: /switch to/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should render contact button', () => {
    render(<App />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
