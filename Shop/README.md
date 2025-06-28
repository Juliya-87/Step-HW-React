# Shop

React-based e-commerce application with admin panel for managing products.

## Features

- Product management (CRUD operations)
- Image upload with drag & drop + URL input
- Shopping cart with localStorage persistence
- Admin authentication
- Form validation (Formik + Yup)
- Responsive design (Tailwind CSS)
- Lazy loading for better performance
- Composition-based authentication guards

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start server:

   ```bash
   cd server
   npm install
   npm run dev
   ```

3. Start React app:

   ```bash
   npm run dev
   ```

4. Access:
   - Shop: http://localhost:5173
   - Admin: http://localhost:5173/admin

## Admin Login

- **Username**: admin
- **Password**: admin123

## Project Structure

```
src/
├── shared/                 # Shared components and utilities
│   ├── components/         # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── hoc/               # Higher-Order Components
│   └── pages/             # Shared pages
├── admin/                 # Admin panel
│   ├── components/        # Admin-specific components
│   ├── layouts/          # Admin layouts
│   └── pages/            # Admin pages
├── public/               # Public shop
│   ├── components/       # Shop components
│   ├── layouts/          # Shop layouts
│   └── pages/           # Shop pages
├── store/               # Redux store
│   ├── apiSlice.js      # RTK Query API
│   ├── cartSlice.js     # Cart management
│   └── store.js         # Store setup
├── contexts/            # React contexts
│   └── ErrorContext.jsx # Global error handling
├── icons/               # SVG icons
└── routes.jsx           # Main routing

server/
├── data/               # JSON database
├── uploads/            # Uploaded images
├── server.js           # Express server
└── package.json        # Server dependencies
```

## Tech Stack

- React 19 + React Router
- Redux Toolkit + RTK Query
- Formik + Yup
- Tailwind CSS
- Express + json-server (API)
- Vite

## Code Formatting

This project uses **Prettier** for consistent code formatting.

### Configuration

- **Tab Width**: 2 spaces
- **Quotes**: Double quotes
- **Semicolons**: Enabled
- **Trailing Commas**: ES5
- **Line Length**: 80 characters
- **End of Line**: LF (Unix style)

### Usage

**Automatic formatting** (recommended):

- Code is automatically formatted on save in VS Code
- Requires Prettier extension: `esbenp.prettier-vscode`

**Manual formatting**:

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check
```

**VS Code Settings**:

- Format on save is enabled
- Prettier is set as default formatter
- Tab size: 2 spaces

## API Endpoints

- `GET/POST/PATCH/DELETE /products`
- `POST /upload` (file upload)
- `GET /users` (admin auth)

## Development

- Use `Button` component for consistency
- Follow `cartSlice` patterns for new features
- Add routes to appropriate route files
- Use `shared/` components for reusability
- Implement lazy loading for better performance

## Architecture Patterns

- **Composition over Inheritance** - AuthGuard uses composition
- **Custom Hooks** - Reusable authentication logic
- **HOC Pattern** - withLazyLoad for code splitting
- **Context Pattern** - Global error handling
- **Redux Toolkit** - State management with RTK Query
