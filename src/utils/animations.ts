/**
 * Animation utilities for consistent transitions and animations
 * Provides reusable animation configurations for Chakra UI components
 */

/**
 * Standard transition durations in seconds
 */
export const TRANSITION_DURATIONS = {
  FAST: 0.15,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;

/**
 * Standard easing functions
 */
export const EASINGS = {
  LINEAR: 'linear',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  SPRING: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Common transition properties for Chakra UI components
 *
 * @example
 * ```tsx
 * <Box transition={TRANSITIONS.SMOOTH}>...</Box>
 * ```
 */
export const TRANSITIONS = {
  SMOOTH: `all ${TRANSITION_DURATIONS.NORMAL}s ${EASINGS.EASE_IN_OUT}`,
  FAST: `all ${TRANSITION_DURATIONS.FAST}s ${EASINGS.EASE_IN_OUT}`,
  SLOW: `all ${TRANSITION_DURATIONS.SLOW}s ${EASINGS.EASE_IN_OUT}`,
  SPRING: `all ${TRANSITION_DURATIONS.NORMAL}s ${EASINGS.SPRING}`,
} as const;

/**
 * Standard hover scale transformations
 *
 * @example
 * ```tsx
 * <Box _hover={{ transform: HOVER_SCALE.SUBTLE }}>...</Box>
 * ```
 */
export const HOVER_SCALE = {
  SUBTLE: 'scale(1.02)',
  SMALL: 'scale(1.05)',
  MEDIUM: 'scale(1.1)',
  LARGE: 'scale(1.15)',
} as const;

/**
 * Standard active/pressed scale transformations
 *
 * @example
 * ```tsx
 * <Button _active={{ transform: ACTIVE_SCALE.BUTTON }}>...</Button>
 * ```
 */
export const ACTIVE_SCALE = {
  BUTTON: 'scale(0.95)',
  LINK: 'scale(0.98)',
} as const;

/**
 * Fade-in animation keyframes
 * Use with Chakra UI's animation prop
 *
 * @example
 * ```tsx
 * <Box animation={`${FADE_IN} ${TRANSITION_DURATIONS.NORMAL}s ${EASINGS.EASE_IN_OUT}`}>
 *   ...
 * </Box>
 * ```
 */
export const FADE_IN = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  fadeIn
`;

/**
 * Slide-up animation keyframes
 * Use with Chakra UI's animation prop
 *
 * @example
 * ```tsx
 * <Box animation={`${SLIDE_UP} ${TRANSITION_DURATIONS.SLOW}s ${EASINGS.EASE_OUT}`}>
 *   ...
 * </Box>
 * ```
 */
export const SLIDE_UP = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  slideUp
`;

/**
 * Common hover state for interactive elements
 * Combines opacity change with smooth transition
 *
 * @example
 * ```tsx
 * <Link _hover={HOVER_STATES.LINK}>...</Link>
 * ```
 */
export const HOVER_STATES = {
  LINK: {
    opacity: 0.8,
    transition: TRANSITIONS.FAST,
  },
  BUTTON: {
    transform: HOVER_SCALE.SMALL,
    transition: TRANSITIONS.FAST,
  },
  CARD: {
    transform: HOVER_SCALE.SUBTLE,
    transition: TRANSITIONS.SMOOTH,
  },
} as const;

/**
 * Common active/pressed states for interactive elements
 *
 * @example
 * ```tsx
 * <Button _active={ACTIVE_STATES.BUTTON}>...</Button>
 * ```
 */
export const ACTIVE_STATES = {
  BUTTON: {
    transform: ACTIVE_SCALE.BUTTON,
    transition: TRANSITIONS.FAST,
  },
  LINK: {
    transform: ACTIVE_SCALE.LINK,
    transition: TRANSITIONS.FAST,
  },
} as const;

/**
 * Focus state styles for accessibility
 * Consistent with global focus-visible styles
 *
 * @example
 * ```tsx
 * <Button _focus={FOCUS_STATE}>...</Button>
 * ```
 */
export const FOCUS_STATE = {
  outline: '2px solid',
  outlineColor: 'var(--color-secondary)',
  outlineOffset: '2px',
} as const;
