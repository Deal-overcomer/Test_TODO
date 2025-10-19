import { Request, Response } from "express";
import { TaskProps } from "types/mainTypes";
import Task from "@models/Task";

// @decs Get all the pretiest tasks
// @route GET /api/tasks
export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Server error: getTasks failed - ${error.message}`,
    });
  }
};

// @decs Create a new task, should be fast
// @route POST /api/tasks
export const createTask = async (
  req: Request<{}, {}, TaskProps>,
  res: Response
): Promise<void | Response> => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please enter both title and description",
      });
    }

    const newTask = await Task.create({ title, description });
    res.status(201).json({ success: true, data: newTask });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Server error: createTask failed - ${error.message}`,
    });
  }
};

// @decs Update an existing task by id
// @route PUT /api/tasks/:id
export const updateTask = async (
  req: Request<{ id: string }, {}, TaskProps>,
  res: Response
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { id },
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task is not found" });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Server error: updateTask failed - ${error.message}`,
    });
  }
};

// @decs Delete a task by id
// @route DELETE /api/tasks/:id
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void | Response> => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ id });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task is not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Server error: deleteTask failed - ${error.message}`,
    });
  }
};
