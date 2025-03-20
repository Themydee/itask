import express from "express";
import { Task } from "../models/task.model.js";
import { create, read, update, delete } from "../controller/task.controller.js";
// import { authenticateUser } from "../middleware/auth.middleware.js"; // Ensure user is authenticated


const router = express.Router();
/** 🟢 CREATE a new task */
router.post("/create", create);
  
  /** 🔵 READ (Get all tasks for logged-in user) */
router.get("/read", read)
  
  /** 🟠 UPDATE a task */
  router.put("/:id",update);
  
  /** 🔴 DELETE a task */
  router.delete("/:id", async (req, res) => {
    try {
      const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  
      if (!deletedTask) return res.status(404).json({ error: "Task not found" });
  
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
  });
  
  export default router;