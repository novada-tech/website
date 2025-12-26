import { useState, useEffect } from 'react';

export function useFontsLoaded(): boolean {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Check if Font Loading API is available
    if (!('fonts' in document)) {
      // Fallback: assume fonts are loaded if API is not available
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFontsLoaded(true);
      return;
    }

    // Check if fonts are already loaded
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
      return;
    }

    // Wait for fonts to load
    const loadFonts = async (): Promise<void> => {
      try {
        await document.fonts.ready;
        setFontsLoaded(true);
      } catch (error) {
        // If font loading fails, still render content with fallback fonts
        console.warn('Font loading failed:', error);
        setFontsLoaded(true);
      }
    };

    void loadFonts();
  }, []);

  return fontsLoaded;
}
