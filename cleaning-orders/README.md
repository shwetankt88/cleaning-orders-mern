# 🧹 Cleaning Supplies Order Management System
### Built for FACTOTUM SERVICES PVT. LTD.

A full MERN stack web application replacing your Google Form — with MongoDB database storage, automatic email notifications, and an admin dashboard.

---

## 📁 Project Structure

```
cleaning-orders/
├── server/                 ← Node.js + Express backend
│   ├── index.js            ← Entry point
│   ├── models/Order.js     ← MongoDB schema
│   ├── routes/
│   │   ├── orders.js       ← Public order submission API
│   │   └── admin.js        ← Protected admin API
│   ├── utils/emailService.js ← Email notifications
│   ├── .env.example        ← Copy to .env and fill in
│   └── package.json
│
└── client/                 ← React frontend
    ├── src/
    │   ├── config.js       ← ⭐ EDIT COMPANY NAME, STORES & PRODUCTS HERE
    │   ├── App.js          ← Routes
    │   ├── pages/
    │   │   ├── OrderForm.js     ← Public order form
    │   │   ├── Success.js       ← Post-submission page
    │   │   ├── AdminLogin.js    ← Admin login
    │   │   ├── AdminDashboard.js ← Orders management
    │   │   └── OrderDetail.js   ← Single order view
    │   └── styles/global.css    ← Color theme
    └── package.json
```

---

## 🚀 Setup & Installation

### Step 1: Install dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 2: Configure environment variables

```bash
cd server
cp .env.example .env
```

Then open `server/.env` and fill in:

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/cleaning-orders
# OR MongoDB Atlas:
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cleaning-orders

# Email (Gmail recommended — use App Password, not your regular password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_RECIPIENT=shwetankt88@gmail.com   ← Orders will be sent here

# Admin credentials — CHANGE THESE!
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=some-long-random-string-here
```

### Step 3: Gmail App Password Setup (important!)

1. Go to Google Account → Security → 2-Step Verification (enable it first)
2. Then go to Google Account → Security → App passwords
3. Create an app password for "Mail"
4. Use the 16-character password in `EMAIL_PASS`

### Step 4: Run the app

**Development (both frontend + backend):**
```bash
# From the root folder
npm install
npm run dev
```

**Or run separately:**
```bash
# Terminal 1 — Backend
cd server
npm run dev    # runs on http://localhost:5000

# Terminal 2 — Frontend
cd client
npm start      # runs on http://localhost:3000
```

---

## ✏️ How to Customize

### Change Company Name
Edit `client/src/config.js`:
```js
export const COMPANY = {
  name: 'YOUR COMPANY NAME HERE',
  tagline: 'Your Tagline',
};
```

### Add/Remove Stores
Edit the `STORES` array in `client/src/config.js`:
```js
export const STORES = [
  'Store 1, Mall Name, City',
  'Store 2, Mall Name, City',
  // Add more...
];
```

### Add/Remove Products
Edit the `PRODUCTS` array in `client/src/config.js`:
```js
export const PRODUCTS = [
  { id: 'unique-id', name: 'Product Name', category: 'Category' },
  // Add more...
];
```

### Change Brand Colors
Edit CSS variables in `client/src/styles/global.css`:
```css
:root {
  --primary: #1a1a2e;    ← Main dark color
  --accent: #e8c547;     ← Highlight/button color
}
```

### Add Your Logo
Replace the `logo-placeholder` div in `OrderForm.js` with:
```jsx
<img src="/logo.png" alt="Logo" className="header-logo" />
```
And place your logo at `client/public/logo.png`.

---

## 🌐 Pages & URLs

| URL | Description |
|-----|-------------|
| `/` | Public order form |
| `/success` | Order confirmation page |
| `/admin/login` | Admin login |
| `/admin` | Orders dashboard |
| `/admin/orders/:id` | Order detail view |

---

## 🔐 Admin Features

- View all orders with filters (pending/confirmed/dispatched/delivered/cancelled)
- Search by order number, store, or name
- Update order status
- Add internal notes
- Delete orders
- Dashboard stats (total, today, pending, etc.)

---

## 📦 Deployment

### MongoDB Atlas (recommended for production)
1. Create a free cluster at mongodb.com/atlas
2. Get your connection string and put it in `MONGO_URI`

### Backend (Railway / Render / Heroku)
- Deploy the `server/` folder
- Set all `.env` variables in the platform's environment settings

### Frontend (Vercel / Netlify)
- Deploy the `client/` folder
- Set the `proxy` in `package.json` to your backend URL
- OR set `REACT_APP_API_URL=https://your-backend.com` and update axios calls

---

## 📧 Email Format

Every submitted order automatically sends a nicely formatted HTML email to `EMAIL_RECIPIENT` with:
- Order number
- Store/location
- Full items table
- Delivery date
- Requester name
- Timestamp

---

Built with ❤️ using MongoDB, Express, React, Node.js
