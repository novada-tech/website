/**
 * Layout configuration constants
 * Centralized values for spacing, sizing, and layout properties
 */

/**
 * Section padding values for vertical spacing
 */
export const SECTION_PADDING_Y = {
  base: 16, // Mobile: 4rem
  md: 24, // Desktop: 6rem
} as const;

/**
 * Container maximum widths for different content types
 */
export const CONTAINER_MAX_WIDTH = {
  TEXT: { base: '100%', md: '720px' }, // Optimal for reading text (50-75 chars)
  GRID: { base: '100%', md: '960px' }, // Wider for grid layouts
  FULL: '100%',
} as const;

/**
 * Container horizontal padding
 */
export const CONTAINER_PADDING_X = {
  base: 6, // Mobile: 1.5rem
  md: 8, // Desktop: 2rem
} as const;

/**
 * Stack/content gap spacing
 */
export const CONTENT_GAP = {
  SMALL: 4, // 1rem
  MEDIUM: 6, // 1.5rem
  LARGE: 8, // 2rem
} as const;

/**
 * Font family CSS variable names
 */
export const FONTS = {
  TITLE: 'var(--font-title)',
  HEADING: 'var(--font-heading)',
  BODY: 'var(--font-body)',
} as const;

/**
 * Font weights
 */
export const FONT_WEIGHTS = {
  LIGHT: 300, // Maregraphe Caption Light (titles)
  REGULAR: 400, // Maregraphe Caption Regular (headings)
  MEDIUM: 500, // Host Grotesk Medium (body text)
} as const;

/**
 * Color CSS variable names
 */
export const COLORS = {
  PRIMARY: 'var(--color-primary)',
  SECONDARY: 'var(--color-secondary)',
  BLOCKS: 'var(--color-blocks)',
  BACKGROUND: 'var(--color-background)',
  TEXT: 'var(--color-text)',
  ACCENT: 'var(--color-accent)',
} as const;

/**
 * Heading sizes for consistent typography
 */
export const HEADING_SIZE = {
  SECTION: { base: 'xl', md: '2xl' }, // Section headings (h2)
  SUBSECTION: 'md', // Subsection headings (h3)
} as const;

/**
 * Text sizes
 */
export const TEXT_SIZE = {
  BODY: { base: 'md', md: 'lg' },
  SMALL: 'sm',
} as const;
