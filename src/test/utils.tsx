import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

/**
 * Custom render function that wraps components with ChakraProvider
 * Use this instead of @testing-library/react's render for components that use Chakra UI
 */
export function renderWithChakra(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <ChakraProvider>{children}</ChakraProvider>,
    ...options,
  });
}

export * from '@testing-library/react';
