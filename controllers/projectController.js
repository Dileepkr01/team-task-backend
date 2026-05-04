exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,

      
      members: [
        req.user.id,          
        ...(members || [])    
      ]
    });

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};