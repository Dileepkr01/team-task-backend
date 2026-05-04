exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    
    let memberList = [];

    if (Array.isArray(members)) {
      memberList = members;
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,

      members: [
        req.user.id,
        ...memberList
      ]
    });

    res.status(201).json(project);

  } catch (err) {
    console.error("PROJECT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};