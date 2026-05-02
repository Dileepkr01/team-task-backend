const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// connectDB
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);


const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});