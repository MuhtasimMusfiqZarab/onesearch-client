# OneSearch Client

A Next.js-based multi-platform search aggregation application built with Next.js 12, React 17, and TypeScript.

![TypeScript](https://img.shields.io/badge/TypeScript-84.2%25-3178c6?style=flat-square)
![SCSS](https://img.shields.io/badge/SCSS-14.5%25-c6538c?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-1.3%25-f1e05a?style=flat-square)
[![Next.js](https://img.shields.io/badge/Next.js-12.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-17.0.2-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 🎯 Overview

OneSearch is a comprehensive search aggregation platform that enables users to search across multiple platforms—**YouTube, Google, LinkedIn, and Facebook**—from a single unified interface. The application provides advanced filtering, data export, credit-based billing, and comprehensive admin management capabilities.

### Key Highlights
- ✅ **Multi-Platform Search** - Aggregate results from YouTube, Google, LinkedIn, and Facebook
- ✅ **TypeScript-First** - 84.2% TypeScript for type safety and maintainability
- ✅ **GraphQL Integration** - Apollo Client for efficient data fetching and state management
- ✅ **Responsive Design** - Mobile-first UI with SCSS styling
- ✅ **Admin Dashboard** - Comprehensive user and request management
- ✅ **Payment Integration** - Stripe-based credit and subscription system
- ✅ **Interactive Maps** - Leaflet and Google Maps integration for location-based searches

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/MuhtasimMusfiqZarab/onesearch-client.git
cd onesearch-client

# Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_SIGNUP_URL=<your-google-oauth-signup-url>
GOOGLE_REDIRECT_URL=<your-google-oauth-redirect-url>
PAYMENT_URL=<your-stripe-payment-url>
NEXT_PUBLIC_GRAPHQL_ENDPOINT=<your-graphql-endpoint>
```

### Development

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Storybook (Component Library)

```bash
# Launch Storybook for component development
npm run storybook

# Storybook will be available at http://localhost:6006
```

## 📁 Project Structure

```
onesearch-client/
├── components/                    # React components
│   ├── _context/                 # Context API providers (Google, YouTube, LinkedIn, Facebook, User, Request)
│   ├── _icons/                   # SVG icon components
│   ├── general/                  # Reusable UI components (Button, Modal, Table, Dropdown, etc.)
│   ├── shared/                   # Layout components (Header, Footer, SideNav, TopNav)
│   ├── layouts/                  # Page layout wrappers
│   ├── uicontainers/             # Feature-specific container components
│   ├── services/                 # Business logic and utilities
│   └── utils/                    # Utility functions and helpers
│
├── lib/                          # Library utilities
│   ├── apollo/                   # Apollo GraphQL client configuration
│   └── leaflet/                  # Leaflet map components and styles
│
├── pages/                        # Next.js pages (routes)
│   ├── index.tsx                 # Homepage
│   ├── dashboard/                # Dashboard routes
│   ├── login/                    # Authentication
│   ├── privacy-policy/           # Legal pages
│   ├── terms-of-service/         # Legal pages
│   └── 404.tsx, 500.tsx          # Error pages
│
├── styles/                       # Global SCSS stylesheets
│   ├── main.scss                 # Main stylesheet
│   └── shared/                   # Shared style variables
│
├── public/                       # Static assets (images, icons)
│
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

For detailed structure documentation, see [APPLICATION_STRUCTURE.md](APPLICATION_STRUCTURE.md).

## 🛠 Technology Stack

### Core Framework
- **Next.js 12.1.0** - React framework with SSR/SSG and built-in optimization
- **React 17.0.2** - UI library for building interactive components
- **TypeScript 4.4.2** - Typed JavaScript for better developer experience

### State Management & Data
- **Apollo Client 3.4.10** - GraphQL client for state management and API communication
- **GraphQL 15.7.2** - Query language for API
- **graphql-tag 2.12.5** - GraphQL query parser

### Styling
- **SCSS/SASS 1.39.0** - CSS preprocessor
- **sass-resources-loader 2.2.4** - Auto-inject SCSS variables
- **CSS Modules** - Component-scoped styling to prevent conflicts

### UI Components & Libraries
- **React Icons 4.7.1** - Icon library
- **React Slick 0.28.1** - Carousel/slider component
- **React Toastify 9.1.1** - Toast notifications
- **React Typed 1.2.0** - Typing animation

### Maps & Geolocation
- **Leaflet 1.9.3** - Interactive mapping library
- **react-leaflet 4.2.0** - React wrapper for Leaflet
- **google-map-react 2.1.10** - Google Maps integration

### Payments & Integrations
- **@stripe/react-stripe-js 1.6.0** - Stripe React components
- **@stripe/stripe-js 1.21.1** - Stripe JavaScript SDK
- **react-facebook 8.1.4** - Facebook SDK integration
- **react-papaparse 3.18.1** - CSV parsing

### Development Tools
- **ESLint 8.2.0** - Code linting
- **Prettier** - Code formatting
- **Babel 7.15.5** - JavaScript transpiler
- **Storybook** - Component library development

## ✨ Features

### 🔍 Multi-Platform Search
- **YouTube Search** - Search channels, videos, and playlists
- **Google Search** - Web search with advanced filters
- **LinkedIn Search** - Find companies, people, and jobs
- **Facebook Search** - Search profiles and content
- Advanced filtering by category, country, date, and more
- CSV export functionality
- Bookmark and save searches

### 👤 User Management
- **Google OAuth & Facebook Login** - Secure authentication
- **User Profiles** - Customizable user settings
- **Review System** - User ratings and reviews
- **Subscription Levels** - Multiple membership tiers

### 💰 Billing & Credits
- **Credit-Based System** - Track API usage with credits
- **Stripe Integration** - Secure payment processing
- **Subscription Management** - Auto-renewal and plan switching
- **Credit History** - Detailed usage analytics

### 📊 Admin Dashboard
- **User Management** - View, edit, and manage user accounts
- **Request Monitoring** - Approve/deny data requests
- **Analytics** - Platform performance metrics
- **Bulk Operations** - Manage multiple users/requests

### 🗺️ Interactive Maps
- **Location Visualization** - Display search results on maps
- **Leaflet Maps** - High-performance map rendering
- **Google Maps** - Integration with Google Maps API
- **Clustering** - Group nearby locations intelligently

### 📱 Responsive UI
- **Mobile-First Design** - Optimized for all screen sizes
- **Accessibility (WCAG)** - Inclusive design for all users
- **Toast Notifications** - Real-time user feedback
- **Loading States** - Smooth UX transitions
- **Error Handling** - User-friendly error messages

## 🔧 Configuration

### TypeScript
Configuration for type checking and compilation:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true
  }
}
```

### Next.js
Key Next.js configurations in `next.config.js`:
- SCSS module support
- Image optimization
- API rewrites and redirects
- Custom Webpack loader for SCSS variables

### ESLint & Prettier
- **ESLint** ensures code quality with strict rules
- **Prettier** maintains consistent code formatting
- Run `npm lint` to check for issues
- Run `npm format` to auto-format code

## 📚 API Integration

### GraphQL Queries & Mutations
GraphQL operations are centralized in component contexts:

```typescript
// Example: Search YouTube
query SearchYouTube($q: String!, $limit: Int) {
  searchYouTube(query: $q, limit: $limit) {
    channelId
    title
    description
    subscriberCount
  }
}
```

### External APIs
- **Google OAuth** - User authentication and account creation
- **Stripe API** - Payment processing and subscription management
- **Facebook SDK** - Social login and chat features
- **Leaflet/Google Maps APIs** - Map rendering and geolocation

## 🎨 Styling Guide

### Global Styles
All global styles are in `styles/main.scss`:
```scss
// Imported in _app.tsx to apply to all pages
import 'styles/main.scss';
```

### Component Styles
Each component has its own SCSS module:
```scss
// components/Button/Button.module.scss
.button {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
```

### Shared Variables
SCSS variables are auto-injected via webpack loader:
```scss
// styles/shared/_variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;

// Available in all component .scss files automatically
```

## 🧪 Development Workflow

### File Naming Conventions
- **Components**: PascalCase (e.g., `Button.tsx`)
- **Styles**: `ComponentName.module.scss`
- **Context**: `FeatureName.context.tsx`
- **Types/Interfaces**: `ComponentName.interface.ts`

### Component Structure
```typescript
import styles from './Button.module.scss';
import { ButtonProps } from './Button.interface';

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled 
}) => (
  <button 
    className={styles.button} 
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
```

### Barrel Exports
Use `index.tsx` files for clean imports:
```typescript
// components/general/index.tsx
export { Button } from './Button/Button';
export { Modal } from './Modal/Modal';
export { Table } from './Table/Table';

// Usage
import { Button, Modal, Table } from 'components/general';
```

## 📖 Documentation

- **[APPLICATION_STRUCTURE.md](APPLICATION_STRUCTURE.md)** - Detailed project structure and architecture
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)** - Type safety guide
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework guide
- **[Apollo Client Documentation](https://www.apollographql.com/docs/react/)** - GraphQL client guide
- **[Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)** - Component development guide

## 🚢 Deployment

### Vercel (Recommended)
The application is optimized for deployment on [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The application can be deployed to any Node.js hosting:
1. Build: `npm run build`
2. Start: `npm start`
3. Set environment variables on your hosting platform

### Environment Setup
Ensure these variables are set on your deployment platform:
- `GOOGLE_SIGNUP_URL`
- `GOOGLE_REDIRECT_URL`
- `PAYMENT_URL`
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Follow the ESLint configuration
- Use TypeScript for type safety
- Write SCSS modules for component styles
- Keep components small and reusable

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌐 Live Demo

Visit the live application: [OneSearch - onesearchio-muhtasimmusfiqzarab.vercel.app](https://onesearchio-muhtasimmusfiqzarab.vercel.app)

## 📧 Support & Contact

For issues, questions, or feature requests:
- **GitHub Issues**: [Open an issue](https://github.com/MuhtasimMusfiqZarab/onesearch-client/issues)
- **Email**: muhtasim@example.com

## 🙏 Acknowledgments

- **Next.js** - For the amazing React framework
- **Apollo** - For GraphQL client excellence
- **Stripe** - For payment processing
- **Google, Facebook, YouTube** - For their APIs
- All contributors and users of OneSearch

---

**Made with ❤️ by [Muhtasim Musfiq Zarab](https://github.com/MuhtasimMusfiqZarab)**
