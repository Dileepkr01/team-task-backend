const Project = require("../models/Project");

// Create Project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id] // creator is member
    });

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get only user's projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id   
    }).populate("members", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};