# Modern Full-Stack E-Commerce Application

A premium, modern E-Commerce web application built using the MERN stack (MongoDB, Express, React, Node.js). Engineered with a clear, modular architecture preparing it for seamless transition into microservices and containerized DevOps pipelines.

## Features Included
- **Premium UI & UX**: Cutting-edge glassmorphism aesthetics, modern typography, dynamic gradients, and smooth animations to maximize the WOW factor.
- **Microservices-Friendly Backend**: Code is organized into modular paths (`controllers`, `routes`, `models`, `middleware`, `config`) ensuring clear separation of concerns.
- **Authentication**: JWT-based login, registration with password hashing, and role-based access control (RBAC).
- **Product Management**: Full catalog display, stock tracking, and administrative capabilities to manage orders.
- **Shopping Cart**: Advanced global state context with dynamic pricing syncing to the backend.
- **Order Processing**: History tracking and shipping statuses.

---

## Directory Structure
- `frontend/` - Contains the React client application (Vite).
- `backend/` - Contains the Express.js server providing REST APIs.

## Prerequisites
- Node.js (v18+)
- Local MongoDB running on port 27017 or a valid MongoDB URI.

---

## Getting Started

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure `.env` is configured (Created by default). It should contain `PORT=5000` and `MONGO_URI`.
4. Seed the database with sample users and products:
   ```bash
   npm run data:import
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Example Data
- Admin Account: `admin@example.com` | Password: `password123`
- Demo Account: `john@example.com` | Password: `password123`
