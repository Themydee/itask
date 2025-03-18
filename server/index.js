import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=> {
    res.send("Hello world123!")
})  

app.use(express.json());

app.use("/api/auth", authRoutes );


app.listen(5000, () => {
    connectDB();
    console.log("server is running on port:", PORT)
})

