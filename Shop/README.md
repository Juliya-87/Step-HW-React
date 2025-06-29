# Shop

React-based e-commerce application with comprehensive admin panel for managing products and users.

## Features

- Product Management (CRUD operations)
- User Management (CRUD operations, role management)
- Image upload with drag & drop + URL input
- Shopping cart with localStorage persistence
- Admin authentication with role-based access
- Form validation (Formik + Yup)
- Responsive design (Tailwind CSS)
- Lazy loading for better performance
- Composition-based authentication guards
- Global error handling system

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
│   ├── constants/          # Application constants
│   ├── hooks/              # Custom React hooks
│   ├── hoc/                # Higher-Order Components
│   └── pages/              # Shared pages
├── admin/                  # Admin panel
│   ├── components/         # Admin-specific components
│   ├── layouts/            # Admin layouts
│   └── pages/              # Admin pages
├── public/                 # Public shop
│   ├── components/         # Shop components
│   ├── layouts/            # Shop layouts
│   └── pages/              # Shop pages
├── store/                  # Redux store
│   ├── apiSlice.js         # RTK Query API slice
│   ├── axiosBaseQuery.js   # Axios base query configuration
│   ├── cartSlice.js        # Cart state management
│   └── store.js            # Redux store configuration
├── contexts/               # React contexts
│   └── ErrorContext.jsx    # Global error handling context
├── icons/                  # SVG icons
├── index.css               # Global styles
├── main.jsx                # Application entry point
└── routes.jsx              # Main routing configuration

server/
├── data/                   # JSON database
├── uploads/                # Uploaded images
├── nodemon.json            # Nodemon configuration
├── package.json            # Server dependencies
└── server.js               # Express server
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

### Products

- `GET/POST/PATCH/DELETE /products`

### Users

- `GET/PATCH/DELETE /users`
- `GET /users?username=...&password=...&role=...` (authentication)

### File Upload

- `POST /upload` (file upload)

## Development Guidelines

- Use `Button` component for consistency
- Use `HeaderNavLink` for navigation links
- Follow `cartSlice` patterns for new features
- Add routes to appropriate route files
- Use `shared/` components for reusability
- Implement lazy loading for better performance
- Use `ErrorContext` for error handling

## Architecture Patterns

- **Composition over Inheritance** - AuthGuard uses composition
- **Custom Hooks** - Reusable authentication logic
- **HOC Pattern** - withLazyLoad for code splitting
- **Context Pattern** - Global error handling
- **Redux Toolkit** - State management with RTK Query

## User Roles

- **Admin**: Full access to admin panel, can manage products and users
- **User**: Regular customer, can browse products and use cart
