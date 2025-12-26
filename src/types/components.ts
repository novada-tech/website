/**
 * Shared component prop types and interfaces
 */

import type { SectionWidth } from './theme';

/**
 * Props for Conway background component
 */
export interface ConwayBackgroundProps {
  readonly updateInterval: number;
  readonly height?: string | number;
}

/**
 * Props for Logo component
 */
export interface LogoProps {
  readonly onPositionChange?: (x: number, y: number) => void;
}

/**
 * Props for Section component
 */
export interface SectionProps {
  readonly children: React.ReactNode;
  readonly maxWidth?: SectionWidth;
  readonly as?: 'section' | 'footer';
  readonly withBorder?: boolean;
}

/**
 * Props for SectionHeading component
 */
export interface SectionHeadingProps {
  readonly children: React.ReactNode;
  readonly as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Props for BodyText component
 */
export interface BodyTextProps {
  readonly children: React.ReactNode;
  readonly size?: 'body' | 'small';
}

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps {
  readonly title: string;
  readonly description: string;
}
