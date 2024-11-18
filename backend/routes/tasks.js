import express from "express";
import Task from "../models/Task.js";
import authenticate from "../middleware/authenticate.middleware.js";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const { uuid: userUuid } = req.user;

    const newTask = await Task.create({
      title,
      description,
      priority,
      userUuid,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.get("/:uuid", authenticate, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.uuid);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
});

router.put("/:uuid", authenticate, async (req, res) => {
  try {
    const { title, description, priority, completed } = req.body;
    const task = await Task.findByPk(req.params.uuid);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

router.delete("/:uuid", authenticate, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.uuid);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

router.patch("/:uuid/completed", authenticate, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.uuid);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task completion status", error });
  }
});

export default router;
