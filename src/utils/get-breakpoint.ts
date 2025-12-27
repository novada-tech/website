import {useBreakpointValue} from "@chakra-ui/react";

const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const ABSENT_VALUE = Symbol('Absent value');
export type BreakpointValue<T> = Partial<Record<typeof BREAKPOINTS[number], T>>;

/**
 * Patch of `useBreakpointValue` since that does not distinguish between
 * something smaller than 'sm' and an absent value.
 */
export function getBreakpointValue<T>(value: BreakpointValue<T>, defaultValue: T): T {
    let sanitizedValue: BreakpointValue<T | typeof ABSENT_VALUE> = {};
    for (const breakpoint of BREAKPOINTS) {
        if (value[breakpoint] !== undefined) {
            sanitizedValue[breakpoint] = value[breakpoint];
        } else {
            sanitizedValue[breakpoint] = ABSENT_VALUE;
        }
    }
    let result = useBreakpointValue(sanitizedValue);
    if (result === undefined) {
        // This should never happen
        throw new Error('useBreakpointValue returned undefined');
    }
    if (result === ABSENT_VALUE) {
        return defaultValue;
    }
    return result;
}