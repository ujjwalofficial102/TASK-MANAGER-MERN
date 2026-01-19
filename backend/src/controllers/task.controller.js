import Task from "../models/Task.model.js";
import { z } from "zod";

// validation schemas
const createTaskSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "title is required").optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const parsed = createTaskSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }

    const task = await Task.create({
      ...parsed.data,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "task created",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

// GET ALL TASKS (Search + Filter)
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const { search, status, priority } = req.query;

    const query = { user: userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "tasks fetched",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const parsed = updateTaskSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }

    const taskId = req.params.id;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id }, // important: only owner can update
      parsed.data,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "task updated",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user.id, // important: only owner can delete
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};
