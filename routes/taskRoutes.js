const router = require("express").Router();

const {
  createTask,
  getTasks,
  updateTask,
  getDashboard,
  deleteTask
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

// specific route FIRST
router.get("/dashboard", protect, getDashboard);

// normal routes
router.post("/", protect, createTask);
router.get("/", protect, getTasks);


router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;