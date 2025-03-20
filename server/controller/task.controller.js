import { Task } from "../models/task.model.js";

export const create = async (req,res) => {
    try {
        const { title, description, priority } = req.body;
        const newTask = new Task({ userId: req.user.id, title, description, priority });
  
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Error creating task" });
    }
}

export const read = async (req,res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
}

export const update = async (req,res) => {
    try {
        const { title, description, completed, priority } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
          { _id: req.params.id, userId: req.user.id }, // Ensure task belongs to the user
          { title, description, completed, priority },
          { new: true }
        );
    
        if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Error updating task" });
    }
}