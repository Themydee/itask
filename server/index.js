import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Move this before CORS
app.use(cors({
    origin: "http://localhost:8080",  // ✅ Make sure this matches your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port:", PORT);
});
