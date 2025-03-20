import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Links to the User model
        required: true,
      },
      title: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String 
      },
      completed: { 
        type: Boolean, 
        default: false
      },
      priority: { 
        type: Number, 
        default: 5 
      }, // 1-10 scale
      createdAt: { 
        type: Date, 
        default: Date.now 
      },
});

export const Task = mongoose.model("Task", taskSchema)