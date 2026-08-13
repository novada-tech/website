import { useBreakpointValue } from '@chakra-ui/react';

const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const ABSENT_VALUE = Symbol('Absent value');

export type BreakpointValue<T> = Partial<Record<(typeof BREAKPOINTS)[number], T>>;

/**
 * `useBreakpointValue` returns undefined both for a viewport below the smallest
 * declared breakpoint and for a breakpoint that was never declared. Filling every
 * breakpoint with a sentinel first tells those two cases apart, so an undeclared
 * breakpoint resolves to `defaultValue` rather than to the nearest smaller one.
 */
export function useBreakpointValueOrDefault<T>(value: BreakpointValue<T>, defaultValue: T): T {
  const sanitizedValue: BreakpointValue<T | typeof ABSENT_VALUE> = {};
  for (const breakpoint of BREAKPOINTS) {
    const declared = value[breakpoint];
    sanitizedValue[breakpoint] = declared === undefined ? ABSENT_VALUE : declared;
  }

  const result = useBreakpointValue(sanitizedValue);
  if (result === undefined || result === ABSENT_VALUE) {
    return defaultValue;
  }
  return result;
}
