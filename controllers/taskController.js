const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo, dueDate } = req.body;

    // 🔒 basic validation
    if (!title || !projectId) {
      return res.status(400).json({
        message: "Title and projectId are required"
      });
    }

    const task = await Task.create({
      title,
      projectId,
      assignedTo: assignedTo || null,
      dueDate: dueDate || null
    });

    
    const populated = await Task.findById(task._id)
      .populate("projectId", "name")
      .populate("assignedTo", "name email");

    res.status(201).json(populated);

  } catch (err) {
    console.error("TASK CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("projectId", "name")
      .populate("assignedTo", "name email");

    res.json(tasks);

  } catch (err) {
    console.error("GET TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update Task (status / assign)
exports.updateTask = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(assignedTo !== undefined && { assignedTo })
      },
      { new: true, runValidators: true }
    )
      .populate("projectId", "name")
      .populate("assignedTo", "name email");

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete Task 
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });

  } catch (err) {
    console.error("DELETE TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const tasks = await Task.find();

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status !== "done").length;

    const overdue = tasks.filter(
      t =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "done"
    ).length;

    res.json({ total, completed, pending, overdue });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};