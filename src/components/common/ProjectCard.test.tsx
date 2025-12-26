import { renderWithChakra, screen } from '../../test/utils';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'Test description for the project',
  };

  it('should render title', () => {
    renderWithChakra(<ProjectCard {...mockProps} />);
    expect(screen.getByRole('heading', { name: /test project/i })).toBeInTheDocument();
  });

  it('should render description', () => {
    renderWithChakra(<ProjectCard {...mockProps} />);
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  it('should render as h3 heading', () => {
    renderWithChakra(<ProjectCard {...mockProps} />);
    const heading = screen.getByRole('heading', { name: /test project/i });
    expect(heading.tagName).toBe('H3');
  });

  it('should have proper accessibility structure', () => {
    renderWithChakra(<ProjectCard {...mockProps} />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});
