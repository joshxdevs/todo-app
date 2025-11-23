# 📝 Todo App (Full-Stack)

A simple full-stack Todo application built using:

- **Node.js + Express**
- **JWT Authentication**
- **File System Database (users.txt)**
- **HTML + CSS + JavaScript Frontend**

This project demonstrates beginner-friendly full-stack development with clean API routes and a minimal frontend.

---

## 🚀 Features

### 🔐 Authentication
- Signup
- Signin
- Password hashing (bcrypt)
- JWT token-based session

### 🗒️ Todo Management
- Add todo
- Delete todo
- View all todos (protected route)
- User-specific data isolation

---

## 📦 Project Structure

todo-app/
backend/
frontend/
README.md
.gitignore
.env


---

## ▶️ Running the Project

### 1️⃣ Install dependencies

cd backend
npm install


### 2️⃣ Create your `.env` file

JWT_SECRET=your_secret_here
PORT=3000

(You can copy from `.env.example`)

---

### 3️⃣ Start Backend

npm start

The backend will run on:
http://localhost:3000

---

### 4️⃣ Start Frontend

Open any of these files in your browser:

- `frontend/index.html`
- `frontend/auth.html`
- `frontend/dashboard.html`

Make sure the backend is running first.

---

## 🧪 API Endpoints

### **Auth**
| Method | Endpoint     | Description |
|--------|--------------|-------------|
| POST   | /signup      | Create account |
| POST   | /signin      | Login & get token |

### **Todos (Protected)**
| Method | Endpoint   | Description |
|--------|------------|-------------|
| GET    | /todos     | Get all todos |
| POST   | /todo      | Create new todo |
| DELETE | /todo/:id  | Delete a todo |

---

## 📌 What You Learn Here
- File-based database handling
- Express routing
- Writing auth middleware
- Using JWT for authentication
- Building frontend that talks to backend
- Clean folder structuring

---

## 📜 License
This project is licensed under the **MIT License**.

Happy Coding! 🎉


