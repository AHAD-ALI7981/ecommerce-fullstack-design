# Ecommerce Fullstack Design (Brand)

A modern, secure, full-stack eCommerce marketplace built with the MERN stack. Features a beautiful user interface, robust state management, admin dashboard, and built-in security enhancements.

## 🚀 Features
- **User Authentication:** Secure JWT-based login/signup using `httpOnly` and `strict` cookies.
- **Admin Dashboard:** Role-based access control (RBAC) to manage products and view site status.
- **Product Management:** Complete CRUD functionality for inventory.
- **Native Image Storage:** Zero external dependencies for images; images are scaled and stored natively as Base64 strings in MongoDB.
- **Shopping Cart & Save for Later:** Persistent unauthenticated user blocking and robust MongoDB ObjectID validation.
- **Product Search and Filter:** Organize products by category or search by keywords.
- **Secure Backend:** Implements rate limiting, Helmet for HTTP headers, generic error responses, and bulletproof user role management preventing privilege escalation.

## 🛠️ Tech Stack
**Frontend:**
- React.js (Vite)
- Zustand (Global State Management)
- Tailwind CSS & DaisyUI
- React Router DOM
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Bcrypt (Password Hashing)

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=3000
# Your MongoDB connection string
MONGO_URI=your_mongo_uri
# A long, random cryptographic string for signing cookies
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
*(Note: Cloudinary has been successfully completely removed to make deployment and hosting much simpler!)*

---

## 🚀 Getting Started

### 1. Install Dependencies
You need to install packages for both the frontend and the backend.

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Admin Account Setup
To manage products, you will need an admin account. Once you have started your MongoDB server and set up your `.env`, you can use the built-in utility script to secure and set the admin password:
```bash
cd backend
node src/update_admin_pw.js <your_secure_password>
```
*(This sets the password for `admin@example.com`)*

### 3. Start the Development Servers

Open two separate terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The app will instantly launch and hot-reload. Navigate to `http://localhost:5173` to explore the marketplace!
