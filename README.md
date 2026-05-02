# 🚀 Team Task Manager - Backend

Backend API for Team Task Manager application.

---

## 🌐 Live URL

👉 https://team-task-backend-production-6748.up.railway.app

---

## 📌 Features

* Authentication (JWT)
* Role-based access (Admin/Member)
* Project management
* Task creation & assignment
* Dashboard analytics

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication

---

## ⚙️ Setup

```bash
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

Run:

```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects` (Admin)

### Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* GET `/api/tasks/dashboard`

### Users

* GET `/api/users`

---

## 👨‍💻 Author

Dileep Kumar
