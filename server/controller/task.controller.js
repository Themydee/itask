import { Task } from "../models/task.model.js";

export const create = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        const { title, description, priority } = req.body;
        const taskPriority = priority || 5; // Default priority to 5

        const newTask = new Task({
            userId: req.user.id, // Add userId to link task to the logged-in user
            title,
            description,
            priority: taskPriority,
            completed: false,
            createdAt: new Date(),
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Task Creation Error:", error);
        res.status(500).json({ error: "Error creating task" });
    }
};

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

        // Check if the task exists
        const existingTask = await Task.findById(req.params.id);
        if (!existingTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed, priority },
            { new: true, runValidators: true } // Return the updated document
        );

        res.json(updatedTask);
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Error updating task", details: error.message });
    }
};

export const remove = async (req, res) => {
    try {
      const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  
      if (!deletedTask) return res.status(404).json({ error: "Task not found" });
  
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting task" });
    }
}