# Shop Server

Express server with json-server for API and file upload support.

## Features

- **JSON Server API** - RESTful API for products and users
- **File Upload** - Image upload with multer
- **Static Files** - Serve uploaded images via Express
- **CORS** - Cross-origin requests support

## Installation

```bash
npm install
```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### File Upload

- `POST /upload` - Upload image file
  - Body: `FormData` with `image` field
  - Response: `{ success: true, imageUrl: "/uploads/filename.jpg" }`

### Users

- `GET /users` - Get all users (for admin auth)

## File Management

- **Uploads**: `./uploads/` directory
- **Access**: `http://localhost:3000/uploads/filename.jpg`
- **Max size**: 5MB
- **Formats**: Images only (PNG, JPG, GIF, etc.)

## Structure

```
server/
├── data/
│   └── db.json          # JSON database
├── uploads/             # All images (uploaded + static)
├── server.js            # Main server file
├── package.json         # Dependencies
└── README.md           # This file
```
