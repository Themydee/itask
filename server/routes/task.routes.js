import express from "express";
import { create, read, update, remove } from "../controller/task.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js"; // Ensure user is authenticated

const router = express.Router();

/** 🟢 CREATE a new task */
router.post("/create", authenticateUser, create);

/** 🔵 READ (Get all tasks for logged-in user) */
router.get("/read", authenticateUser, read);

/** 🟠 UPDATE a task */
router.put("/update/:id", authenticateUser, update);  

/** 🔴 DELETE a task */
router.delete("/remove/:id", authenticateUser, remove); 

export default router;
