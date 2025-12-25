# NovAda Website

A modern, minimalist placeholder website featuring an animated Conway's Game of Life background with configurable decorative blocks around the logo.

## Features

- 🎨 **Animated Background**: Conway's Game of Life simulation running subtly in the background
- 🎯 **Configurable Logo Blocks**: Decorative blocks positioned around the logo, easily customizable
- 🌓 **Theme Support**: Light and dark themes with automatic system preference detection
- 🛡️ **Anti-Scraper Contact**: Protected contact information to reduce spam
- ⚡ **Modern Stack**: Built with React, TypeScript, and Vite
- ✅ **Well-Tested**: Comprehensive test coverage with Vitest
- 📦 **Production Ready**: Optimized build with Express server

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Server**: Express (Node.js)
- **Styling**: CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Run the development server with hot reload:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Production Server

Start the production server:

```bash
npm start
```

This will build the application and start the Express server on port 3000 (or the port specified in the `PORT` environment variable).

## Customization

### Logo Blocks Configuration

Edit `src/config/logoBlocks.ts` to customize the decorative blocks around the logo:

```typescript
export const defaultBlockPositions: BlockPosition[] = [
  { x: -180, y: -120 },  // x and y are pixels from logo center
  { x: -160, y: -120 },
  { x: -140, y: -120, size: 25 },  // optional custom size
  // Add more blocks...
];

export const blockSize = 18; // Default block size in pixels
```

### Conway's Game of Life Settings

Adjust the background animation in `src/components/ConwayBackground.tsx`:

- `cellSize`: Size of each cell in pixels (default: 20)
- `updateInterval`: Time between generations in ms (default: 150)
- `density`: Initial population density 0-1 (default: 0.15)

### Theme Colors

Modify colors in `src/styles/theme.css`:

```css
:root {
  --color-primary: #211c40;    /* Deep blue */
  --color-secondary: #332b80;  /* Digital purple */
  --color-background: #ececec; /* Warm light gray */
  --color-text: #211c40;
  --color-accent: #ffffff;
}
```

### Contact Information

Update the email in `src/components/Contact.tsx`:

```typescript
const emailParts = {
  user: 'info',
  domain: 'novada',
  tld: 'be',
};
```

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ConwayBackground.tsx
│   │   ├── Logo.tsx
│   │   ├── Contact.tsx
│   │   └── *.module.css
│   ├── config/             # Configuration files
│   │   └── logoBlocks.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useTheme.ts
│   ├── styles/             # Global styles
│   │   └── theme.css
│   ├── test/               # Test setup
│   │   └── setup.ts
│   ├── utils/              # Utility functions
│   │   └── conway.ts       # Game of Life logic
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── assets/                 # Static assets
│   └── logo/
├── server.ts               # Production server
├── index.html              # HTML template
└── package.json
```

## License

This project uses a dual-license approach:

- **Code**: MIT License - See [LICENSE](LICENSE) for details
- **Content & Branding**: All rights reserved - See [LICENSE-CONTENT](LICENSE-CONTENT) for details

The source code is freely available under the MIT License, allowing you to use, modify, and distribute it. However, the NovAda name, logo, and branding materials are protected and may not be used without permission.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Optimized canvas rendering for smooth 60fps animation
- Lazy initialization of Game of Life grid
- Efficient neighbor counting algorithm
- Minimal bundle size with tree-shaking

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Theme toggle with descriptive labels
- Canvas marked as decorative (aria-hidden)

## Security

The production server includes security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

Contact information is protected with anti-scraping measures:
- Email revealed only on user interaction
- Split storage of email components
- No direct mailto links in source

---

Built with ❤️ by NovAda
