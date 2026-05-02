const Project = require("../models/Project");

// Create Project (Admin only)
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects
exports.getProjects = async (req, res) => {
    const projects = await Project.find().populate("members");
    res.json(projects);
};