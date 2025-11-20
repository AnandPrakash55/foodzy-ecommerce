# Foodzy Ecommerce (Backend + Frontend)

This zip contains a minimal working full-stack ecommerce demo:

- Backend: Node.js + TypeScript + Express + MySQL + Nodemailer
- Frontend: React + TypeScript + Vite + Zustand

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env   # edit DB + email credentials
npm install
npm run dev
```

Create MySQL database and tables (example):

```sql
CREATE DATABASE foodzy;
USE foodzy;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE otps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) DEFAULT 0
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2),
  description TEXT,
  image_url VARCHAR(500),
  category VARCHAR(100),
  tag VARCHAR(100),
  is_popular TINYINT(1) DEFAULT 0,
  is_deal_of_day TINYINT(1) DEFAULT 0
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

Seed some products so the UI has data.

### 2. Frontend

```bash
cd frontend
cp .env.example .env   # ensure VITE_API_URL points to backend
npm install
npm run dev
```

Open the shown localhost URL in your browser.

### Flow

- Login page: enter email, receive OTP, verify → JWT stored in localStorage.
- Home: shows popular products from `/api/products?popular=1`.
- Product detail: `/product/:id` page with add-to-cart.
- Cart: adjust quantities, go to checkout.
- Checkout: POST `/api/orders` with cart items. Backend creates order,
  stores in DB and sends confirmation email to the logged-in user's email.

You can enhance styling to match the Figma, but this base is functional.
