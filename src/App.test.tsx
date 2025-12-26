import { renderWithChakra, screen } from './test/utils';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('should render without crashing', () => {
    renderWithChakra(<App />);
    expect(screen.getByAltText('NovAda Logo')).toBeInTheDocument();
  });

  it('should render logo', () => {
    renderWithChakra(<App />);
    expect(screen.getByAltText('NovAda Logo')).toBeInTheDocument();
  });

  it('should render theme toggle button', () => {
    renderWithChakra(<App />);
    const toggleButton = screen.getByRole('button', { name: /switch to/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should render theme toggle', async () => {
    renderWithChakra(<App />);
    // Theme toggle button exists
    expect(screen.getByRole('button', { name: /switch to/i })).toBeInTheDocument();
  });
});
