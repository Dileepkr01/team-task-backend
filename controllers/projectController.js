const Project = require("../models/Project");

// ✅ Create Project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    // 🔒 Validate required field
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    
    let memberList = [];

    if (Array.isArray(members)) {
      memberList = members;
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,

      // creator + additional members
      members: [
        req.user.id,
        ...memberList
      ]
    });

    res.status(201).json(project);

  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Projects (user-based)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    })
      .populate("members", "name email");

    res.json(projects);

  } catch (err) {
    console.error("GET PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};