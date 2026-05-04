const Task = require("../models/Task");
const Project = require("../models/Project");

// ✅ Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, projectId, assignedTo, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({
        message: "Title and projectId are required"
      });
    }


    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user.id
    });

    if (!project) {
      return res.status(403).json({ message: "Access denied" });
    }

    const task = await Task.create({
      title,
      projectId,
      assignedTo: assignedTo || null,
      dueDate: dueDate || null,
      createdBy: req.user.id
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


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    })
      .populate("projectId", "name")
      .populate("assignedTo", "name email");

    res.json(tasks);

  } catch (err) {
    console.error("GET TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Task
exports.updateTask = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    });

    if (!task) {
      return res.status(403).json({ message: "Not allowed" });
    }

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

    res.json(updated);

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!task) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (err) {
    console.error("DELETE TASK ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    });

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