# NovAda Website

Please find me at [novada.be](https://novada.be)!

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Server**: Express (Node.js)
- **Styling**: Chakra UI + CSS Modules
- **Code Quality**: ESLint + Prettier

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

## Configuration

### Theme Colors

Edit `src/styles/theme.css` to customize colors for light and dark themes.

### Conway's Game of Life

Adjust settings in `src/config/conway.ts` and `src/config/constants.ts`.

### Layout & Styling

Modify spacing and typography in `src/config/layout.ts`.

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── common/       # Reusable UI components
│   │   └── ui/           # Chakra UI setup
│   ├── config/           # Configuration constants
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles
│   ├── test/             # Test setup
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── server.ts             # Production server
└── package.json
```

## License

This project uses a dual-license approach:

- **Code**: MIT License - See [LICENSE](LICENSE) for details
- **Content & Branding**: All rights reserved - See [LICENSE-CONTENT](LICENSE-CONTENT) for details

The source code is freely available under the MIT License, allowing you to use, modify, and distribute it. However, the NovAda name, logo, and branding materials are protected and may not be used without permission.

## Features

- 🎨 Light/Dark theme support
- 🎮 Interactive Conway's Game of Life background
- ⚡ Lazy loading for optimal performance
- ♿ Full accessibility support
- 📱 Responsive design
- 🔒 Security headers enabled

---

Built with ❤️ by NovAda
