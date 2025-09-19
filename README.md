# MERN Expense Tracker

A modern, dark-themed personal expense tracker built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled using Tailwind CSS. Includes JWT authentication, protected expense CRUD operations, a dashboard with a spending pie chart, and a simple rule-based financial tips chatbot.

## Features
- User registration & login (JWT auth, bcrypt password hashing)
- Protected expense CRUD (create, read, update, delete)
- Category support & date tracking
- Responsive dark UI with Tailwind CSS
- Dashboard summary with dynamic Pie chart (Chart.js)
- Toast notifications for key actions (react-toastify)
- Persistent auth using localStorage
- Simple rule-based chatbot for saving tips
- Monorepo with concurrent dev servers

## Tech Stack
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, CORS, dotenv  
**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Chart.js, React Icons, React Toastify, date-fns

## Project Structure
```
root/
  package.json        # Root scripts (concurrently runs both apps)
  server/             # Backend API
    server.js         # Entry point
    config/db.js      # Mongo connection helper
    models/           # Mongoose schemas (User, Expense)
    controllers/      # Auth & Expense logic
    routes/           # Route definitions
    middleware/       # Auth middleware
    .env.example      # Environment variable template
  client/             # Frontend React app (Vite)
    index.html
    vite.config.js
    tailwind.config.js
    postcss.config.js
    src/
      main.jsx
      App.jsx
      styles.css
      context/AuthContext.jsx
      pages/ (Login, Register, Dashboard)
      components/ (Navbar, ExpenseForm, ExpenseList, DashboardSummary, Chatbot)
      constants.js
```

## Environment Variables
Create a `.env` file inside `server/` based on `.env.example`:
```
MONGO_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=change_this_to_a_long_random_string
PORT=5000
```

## Installation & Setup
Make sure you have Node.js (>=18) and MongoDB running locally.

### 1. Install root dependencies
This installs only the root dev dependency `concurrently`:
```powershell
npm install
```

### 2. Install server & client dependencies
From the project root run:
```powershell
npm run install-all
```
(Alternatively run `npm install` separately inside `server` and `client`.)

### 3. Configure environment
Copy the example file and edit values:
```powershell
Copy-Item server/.env.example server/.env
```
Edit `server/.env` to set your own `MONGO_URI` and strong `JWT_SECRET`.

### 4. Run the development environment
This launches both API (port 5000) and Vite dev server (port 5173):
```powershell
npm run dev
```
Frontend dev URL: http://localhost:5173  
API base URL: http://localhost:5000

### 5. Build frontend (optional production build)
```powershell
cd client
npm run build
```
The build output will appear in `client/dist`.

## API Overview
Base URL: `/api`

Auth Routes:
- `POST /api/auth/register` → body: `{ username, email, password }`
- `POST /api/auth/login` → body: `{ email, password }`

Expense Routes (require `Authorization: Bearer <token>`):
- `POST /api/expenses` → `{ description, amount, category?, date? }`
- `GET /api/expenses` → returns list sorted by date desc
- `PUT /api/expenses/:id` → updates expense
- `DELETE /api/expenses/:id` → deletes expense

## Frontend Notes
- Configure a different API URL by creating `client/.env` with:  
  `VITE_API_URL=http://your-api-host:5000`
- Auth state persisted in `localStorage` under key `expense_auth`.
- Pie chart appears once there is at least one expense category with > 0 total.

## Chatbot
A lightweight, rule-based assistant offering money-saving tips. It pattern matches keywords (food, transport, shopping, bills, entertainment, save) and returns predefined advice.

## Security Considerations
- Passwords hashed with bcrypt (10 salt rounds)
- JWT expires in 7 days (adjust as needed)
- Protected routes enforce presence & validity of token
- CORS enabled (adjust origin in production)

## Production Suggestions
- Serve built React app via a static host or from Express (additional config required)
- Add rate limiting & input validation (e.g., `express-rate-limit`, `zod` or `joi`)
- Use helmet & proper CORS origin whitelist
- Consider pagination or date-range filters for large expense sets

## License
MIT (add a LICENSE file if you intend to distribute)

## Author
Generated scaffold – customize and extend as needed.
