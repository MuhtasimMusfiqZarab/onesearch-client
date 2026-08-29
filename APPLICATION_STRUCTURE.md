# OneSearch Client - Application Structure

## Overview

**OneSearch** is a Next.js-based search aggregation platform (v10) that allows users to search across multiple platforms including YouTube, Google, LinkedIn, and Facebook. The application provides both a public-facing homepage and a comprehensive dashboard for authenticated users to manage searches, requests, credits, and settings.

**Language Composition:** 
- TypeScript: 84.2%
- SCSS: 14.5%
- JavaScript: 1.3%

---

## Technology Stack

### Frontend Framework & Runtime
- **Next.js 12.1.0** - React SSR framework for server-side rendering and static generation
- **React 17.0.2** - UI library

### State Management & Data Fetching
- **Apollo Client 3.4.10** - GraphQL client for state management and server communication
- **GraphQL 15.7.2** - Query language for API communication
- **graphql-tag 2.12.5** - GraphQL query parser

### UI/Styling
- **SCSS/SASS 1.39.0** - CSS preprocessor for styling
- **sass-resources-loader 2.2.4** - Automatic SCSS variable injection into components
- **React Icons 4.7.1** - Icon library
- **React Slick 0.28.1** - Carousel/slider component
- **Slick Carousel 1.8.1** - Carousel CSS framework

### Mapping & Geolocation
- **Leaflet 1.9.3** - Interactive mapping library
- **react-leaflet 4.2.0** - React wrapper for Leaflet
- **google-map-react 2.1.10** - Google Maps integration

### Utilities
- **React Toastify 9.1.1** - Toast notifications
- **react-facebook 8.1.4** - Facebook SDK integration
- **react-typed 1.2.0** - Typing animation library
- **react-papaparse 3.18.1** - CSV parsing
- **@stripe/react-stripe-js 1.6.0** - Stripe payment integration
- **@stripe/stripe-js 1.21.1** - Stripe JavaScript library

### Development Tools
- **TypeScript 4.4.2** - Type safety
- **ESLint 8.2.0** - Code linting
- **Babel 7.15.5** - JavaScript transpiler
- **Prettier** - Code formatting

---

## Directory Structure

```
onesearch-client/
├── components/              # React components organized by purpose
│   ├── _context/           # Context API providers for state management
│   │   ├── google/         # Google-related providers (categories, countries, profiles)
│   │   ├── youtube/        # YouTube-related providers (channels, categories, countries)
│   │   ├── linkedin/       # LinkedIn-related providers (companies, locations, titles)
│   │   ├── request/        # Request management providers (categories, countries, statuses, requests)
│   │   └── user/           # User-related providers (current-user, all-users, all-user-reviews)
│   │
│   ├── _icons/             # SVG icon components (admin, facebook, google, youtube, linkedin, etc.)
│   │
│   ├── general/            # Reusable UI components
│   │   ├── add-review/     # Review submission component
│   │   ├── autofill-input/ # Input with autocomplete
│   │   ├── button/         # Button component
│   │   ├── checkbox/       # Checkbox component
│   │   ├── dropdown/       # Dropdown/select component
│   │   ├── modal/          # Modal dialog component
│   │   ├── pagination/     # Pagination component
│   │   ├── rating/         # Star rating component
│   │   ├── searchbox/      # Search input component
│   │   ├── slider/         # Image/content slider
│   │   ├── slick/          # Carousel component
│   │   ├── table/          # Data table with sorting/filtering
│   │   ├── tab/            # Tabbed interface
│   │   ├── loader/         # Loading spinner
│   │   ├── loading/        # Loading state component
│   │   ├── csv-drop/       # CSV file upload/drag-drop
│   │   ├── dropdown/       # Basic dropdown
│   │   ├── review/         # Review display component
│   │   ├── navigation/     # Navigation component
│   │   ├── switch/         # Toggle switch
│   │   ├── back-to-top/    # Scroll-to-top button
│   │   ├── popup/          # Popup component
│   │   ├── forbiddenAccess/# 403 error page
│   │   ├── notFound/       # 404 error page
│   │   ├── coundown-timer/ # Countdown timer display
│   │   ├── custom-chat/    # Chat widget
│   │   ├── dropbox/        # Dropbox integration
│   │   └── index.tsx       # Barrel export file
│   │
│   ├── shared/             # Layout and shared structural components
│   │   ├── header/         # Main header/navbar
│   │   ├── footer/         # Footer component
│   │   ├── sidenav/        # Left sidebar navigation
│   │   └── topnav/         # Top navigation bar
│   │       └── version2/   # Alternative topnav version
│   │
│   ├── layouts/            # Page layout wrappers
│   │   └── dashboard/      # Dashboard layout wrapper
│   │
│   ├── uicontainers/       # Feature-specific container components
│   │   ├── home/           # Homepage sections
│   │   │   ├── heading/    # Hero section
│   │   │   ├── intro/      # Introduction section
│   │   │   ├── pricing/    # Pricing table
│   │   │   ├── reviews/    # User reviews section
│   │   │   ├── services/   # Services/features section
│   │   │   ├── tabs/       # Tab content sections
│   │   │   ├── text/       # Text content sections
│   │   │   └── scroll-down/# Scroll indicator
│   │   │
│   │   ├── dashboard/      # Dashboard feature pages
│   │   │   ├── search/     # Search functionality (youtube, google, linkedin, facebook)
│   │   │   ├── request/    # Data request management
│   │   │   ├── credit/     # Credit/billing management
│   │   │   ├── settings/   # User settings
│   │   │   ├── admin/      # Admin panel (google, users, requests)
│   │   │   └── subscribe/  # Subscription management (if available)
│   │   │
│   │   ├── login/          # Login page container
│   │   ├── 404/            # 404 error page
│   │   ├── 500/            # 500 error page
│   │   ├── loading-page/   # Loading/splash screen
│   │   └── under-construction/ # Under construction placeholder
│   │
│   ├── services/           # Business logic and utilities
│   │   └── route/          # Route/navigation logic
│   │
│   └── utils/              # Utility functions and helpers
│       ├── enum/           # Enum definitions
│       ├── interfaces/     # TypeScript interfaces/types
│       └── resolver/       # Navigation and data resolution
│           ├── navigation/ # Navigation data (sidenav, topnav, tab routes)
│           └── all-countries/ # Country data resolver
│
├── lib/                    # Library utilities and integrations
│   ├── apollo/             # Apollo GraphQL client configuration
│   │   └── index.ts        # Apollo client setup
│   │
│   └── leaflet/            # Leaflet map library components
│       ├── component/      # Map components (Button, Container, Header, Footer, Layout, Map, Section)
│       ├── styles/         # Leaflet-specific styles
│       │   ├── settings/   # SCSS settings (_variables.scss, _settings.scss)
│       │   └── globals.scss # Global styles
│       └── pages/          # Leaflet page templates
│
├── pages/                  # Next.js pages (routes)
│   ├── _app.tsx            # App wrapper with Apollo Provider and global styles
│   ├── _document.tsx       # Custom Document for HTML structure
│   ├── index.tsx           # Homepage (/)
│   │
│   ├── dashboard/          # Dashboard routes (/dashboard/*)
│   │   ├── search/         # Search by platform (youtube, google, linkedin, facebook)
│   │   ├── request/        # Create and manage data requests
│   │   ├── credit/         # Credit/billing management
│   │   ├── settings/       # User profile and settings
│   │   ├── admin/          # Admin panel for managing users and requests
│   │   ├── download/       # Download/export functionality
│   │   └── subscribe/      # Subscription management
│   │
│   ├── login/              # Authentication pages
│   ├── privacy-policy/     # Privacy policy page
│   ├── terms-of-service/   # Terms of service page
│   ├── support/            # Support/help page
│   ├── 404/                # 404 error page
│   └── 500/                # 500 error page
│
├── public/                 # Static assets (images, icons, favicon)
│
├── styles/                 # Global SCSS stylesheets
│   ├── main.scss           # Main stylesheet entry point
│   └── shared/             # Shared style partials
│       └── _variables.scss # SCSS variables auto-injected to all components
│
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── .eslintrc.json          # ESLint configuration
├── .prettierrc              # Prettier formatting config
└── README.md               # Repository documentation
```

---

## How It Works - Data Flow

### 1. **Application Bootstrap** (`_app.tsx`)
- Wraps the entire app with **ApolloProvider** for GraphQL state management
- Imports global SCSS styles from `styles/main.scss`
- Provides Context API providers for feature-specific state

### 2. **Page Routing** (Next.js)
- **Homepage** (`pages/index.tsx`) → Displays landing page with features, pricing, reviews
- **Dashboard** (`pages/dashboard/*`) → Protected routes with search, requests, credits, settings
- **Authentication** (`pages/login/`) → Login via Google OAuth and Facebook
- **Admin** (`pages/dashboard/admin/`) → User and request management (admin only)

### 3. **State Management**
- **Apollo Client** (`lib/apollo/index.ts`) → Manages GraphQL queries and mutations
- **Context API** (`components/_context/*`) → Feature-specific state (user data, search results, etc.)
- **React Hooks** → Component-level state management

### 4. **Search Flow**
1. User selects a platform (YouTube, Google, LinkedIn, Facebook)
2. Dashboard/search container loads relevant search filters
3. User inputs search criteria and submits
4. Apollo Client sends GraphQL query to backend
5. Results are displayed in tables/cards with pagination
6. Users can save searches, download results, or create requests

### 5. **Styling System**
- **Global** (`styles/main.scss`) → Base styles for all pages
- **SCSS Modules** (`component/styles.module.scss`) → Component-scoped styles to prevent conflicts
- **Shared Variables** (`styles/shared/_variables.scss`) → Auto-injected into all SCSS files via webpack loader
- Uses **CSS-in-JS** patterns with module-based scoping for maintainability

### 6. **Component Hierarchy**
```
_app (Apollo + Global Styles)
  └── Page (index.tsx, dashboard/*, login/*, etc.)
      └── Layout (dashboard layout or default)
          ├── Header/TopNav (shared)
          ├── SideNav (shared - dashboard only)
          ├── MainContent (feature-specific container)
          │   ├── General Components (button, modal, table, etc.)
          │   ├── Context Providers (user, search results, etc.)
          │   └── Utility Components (loader, pagination, etc.)
          └── Footer (shared)
```

---

## Key Features

### 🔍 **Search Across Multiple Platforms**
- YouTube, Google, LinkedIn, Facebook search integration
- Advanced filtering and sorting
- CSV export functionality
- Bookmark/saved searches

### 👤 **User Management**
- Google OAuth & Facebook login integration
- User profiles and settings
- Review/rating system
- Account subscription levels

### 💰 **Credit & Billing System**
- Credit-based API usage tracking
- Stripe payment integration
- Subscription management
- Credit history and analytics

### 📊 **Admin Dashboard**
- User management and analytics
- Request monitoring and approval
- Platform performance metrics
- Bulk data management

### 🗺️ **Interactive Maps**
- Leaflet-based map visualization
- Location-based search and filtering
- Map markers and clustering

### 📱 **Responsive UI**
- Mobile-first design approach
- Accessible components (WCAG)
- Toast notifications for user feedback
- Loading states and error handling

---

## API Integration Points

### GraphQL Queries/Mutations
Located in component contexts and pages:
- User authentication and profile queries
- Platform-specific search queries (YouTube, Google, LinkedIn, Facebook)
- Credit/billing mutations
- Request creation and management
- Review submission

### External APIs
- **Google OAuth** → User authentication
- **Stripe API** → Payment processing
- **Facebook SDK** → Social features and chat
- **Leaflet/Google Maps** → Map rendering

---

## Environment Variables Required

```env
GOOGLE_SIGNUP_URL      # Google OAuth signup endpoint
GOOGLE_REDIRECT_URL    # Google OAuth redirect handler
PAYMENT_URL            # Stripe payment processing URL
```

---

## Build & Deployment Scripts

```bash
# Development
npm run dev              # Start Next.js dev server (http://localhost:3000)

# Production
npm run build            # Build optimized production bundle
npm start                # Start production server

# Storybook (Component Library)
npm run storybook        # Start Storybook on port 6006
```

---

## Notable Patterns & Conventions

### 1. **Context Providers**
Each feature domain has a context provider for centralized state management (e.g., `CurrentUserProvider`, `GetAllUserReviewsProvider`).

### 2. **CSS Modules**
All component styles use SCSS modules for local scope to prevent style conflicts across components.

### 3. **GraphQL Queries**
GraphQL queries are defined in separate `.gql`/`.graphql` files and imported using `graphql-tag/loader`.

### 4. **Barrel Exports**
Each component folder has an `index.tsx` file for clean imports:
```typescript
import { Button } from 'components/general';
```

### 5. **Responsive Design**
Uses CSS media queries in SCSS modules for mobile-first responsive layouts.

### 6. **Error Pages**
Custom 404 and 500 error pages with user-friendly error messaging.

---

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js build configuration, redirects, rewrites, image domains |
| `tsconfig.json` | TypeScript compiler options and path aliases |
| `package.json` | Dependencies, dev dependencies, and npm scripts |
| `.eslintrc.json` | ESLint rules for code quality |
| `.prettierrc` | Prettier code formatting rules |
| `graphql.d.ts` | GraphQL type definitions |

---

## Summary

OneSearch is a **full-featured, multi-platform search aggregation application** built with modern React/Next.js practices. The architecture emphasizes:

- ✅ **Modularity** - Feature-isolated components and contexts
- ✅ **Scalability** - Organized folder structure for easy feature additions
- ✅ **Type Safety** - TypeScript throughout the codebase
- ✅ **Performance** - Next.js SSR/SSG, code splitting, optimized builds
- ✅ **Maintainability** - Clear separation of concerns and CSS modules
- ✅ **User Experience** - Rich interactivity, responsive design, multiple search options

The application serves both end-users (search interface) and administrators (management dashboard) with comprehensive features for searching, managing, and purchasing data across multiple platforms.
