# Task Manager App

A full-stack (MERN) task manager dashboard with JWT authentication (cookies), profile update, and task CRUD operations with search & filter.

## 🚀 Features

### ✅ Authentication

- Register
- Login
- Logout
- JWT stored in httpOnly cookie

### ✅ Dashboard

- Protected dashboard (login required)
- Fetch logged-in user profile
- Create task
- Update task (edit modal)
- Delete task
- Mark task as completed/pending
- Search tasks by title
- Filter tasks by status & priority

### ✅ Profile

- View profile (/user/me)
- Update name & password

## 🛠 Tech Stack

### **Frontend**

- React (Vite)
- TailwindCSS
- Axios
- React Router DOM

### **Backend**

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcrypt
- Zod
- cookie-parser
- CORS middleware

## 📂 Project Structure

### **Backend**

```
backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    app.js
    server.js
  .env
```

### **Frontend**

```
frontend/
  src/
    api/
    components/
    pages/
    App.jsx
```

## ⚙️ Environment Variables

Create a `.env` file inside `backend/`

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

## ▶️ Run Locally

### 1) Clone repository

```
git clone https://github.com/ujjwalofficial102/TASK-MANAGER-MERN
cd TASK-MANAGER-MERN
```

### 2) Run Backend

```
cd backend
npm install
npm run dev
```

Backend will run on:

http://localhost:3000

### 3) Run Frontend

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

http://localhost:5173

## 🔐 API Endpoints

### **Auth Routes**

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### **User Routes**

- GET `/api/user/me`
- PUT `/api/user/update`

### **Task Routes**

- POST `/api/tasks` → create task
- GET `/api/tasks` → get all tasks (supports search/filter)
- PUT `/api/tasks/:id` → update task
- DELETE `/api/tasks/:id` → delete task

## 🔎 Search & Filter (Tasks)

- Search by title  
  GET `/api/tasks?search=react`

- Filter by status  
  GET `/api/tasks?status=pending`

- Filter by priority  
  GET `/api/tasks?priority=high`

- Combine filters  
  GET `/api/tasks?search=jwt&status=pending&priority=high`

## 🔒 Security Practices Used

- Password hashing using bcrypt
- JWT authentication with middleware
- Token stored in httpOnly cookie
- Server-side validation using Zod
- Protected routes for user & tasks APIs

## 📌 Notes for Production Scaling

- Use HTTPS + secure: true cookies
- Add refresh token flow
- Add pagination for tasks list
- Add rate limiting to auth routes
- Centralized logging & monitoring
- Use environment-based configs for dev/prod

## 📧 Submission

- GitHub Repo: [Task Manager MERN](https://github.com/ujjwalofficial102/TASK-MANAGER-MERN)
