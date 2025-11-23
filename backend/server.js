const express = require("express")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = 3000;

const FILE_PATH = "./users.txt"
const JWT_SECRET = process.env.JWT_SECRET

app.use(express.json())
app.use(cors());

function readUsers() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"))
}

function writeUsers(users) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2))
}

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Authorization header missing" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password required" })
    }

    const users = readUsers();
    const exists = users.find(u => u.username === username);

    if (exists) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const newUser = {
        id: users.length + 1,
        username,
        password: hashed,
        todos: []
    }

    users.push(newUser)
    writeUsers(users)

    res.status(201).json({ message: "Signup successful" })
})

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const users = readUsers();
    const user = users.find(u => u.username === username)

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET)
    res.json({ token })
})

app.get("/users", (req, res) => {
    const users = readUsers();
    res.json(users.map(u => u.username))
})

app.post("/todo", authMiddleware, (req, res) => {
    const { title } = req.body;
    const users = readUsers();
    const user = users.find(u => u.id === req.userId)

    const newTodo = {
        id: user.todos.length + 1,
        title
    }

    user.todos.push(newTodo)
    writeUsers(users)

    res.json({ message: "Todo created", todo: newTodo })
})

app.get("/todos", authMiddleware, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === req.userId)
    res.json({ todos: user.todos })
})

app.delete("/todo/:id", authMiddleware, (req, res) => {
    const todoId = Number(req.params.id)
    const users = readUsers();
    const user = users.find(u => u.id === req.userId)

    user.todos = user.todos.filter(t => t.id !== todoId)
    writeUsers(users)

    res.json({ message: "Todo deleted" })
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})
