const Project = require("../models/Project");

// ✅ Create Project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // 🔒 validation
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id   // only owner
    });

    res.status(201).json(project);

  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Projects (only creator sees)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id
    });

    res.json(projects);

  } catch (err) {
    console.error("GET PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};