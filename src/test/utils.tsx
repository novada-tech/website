import { ReactElement } from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

/**
 * Chakra v3 reads its design system from context, so a component rendered
 * without a provider throws rather than falling back to defaults. Component
 * tests must import `render` from this module rather than from
 * @testing-library/react, which this file otherwise re-exports whole.
 */
export function renderWithChakra(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return rtlRender(ui, {
    wrapper: ({ children }) => <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>,
    ...options,
  });
}

export * from '@testing-library/react';
export { renderWithChakra as render };
