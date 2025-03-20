import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // Import cookie-parser
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.routes.js"; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:8080",  
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port:", PORT);
});
