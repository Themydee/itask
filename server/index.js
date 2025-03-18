import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js"

const app = express();

app.get("/", (req, res)=> {
    res.send("Hello world123!")
})  

app.use("/api/auth", authRoutes )
app.listen(3000, () => {
    connectDB();
    console.log("server is running on port 3000")
})

