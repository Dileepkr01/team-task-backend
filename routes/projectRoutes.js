const express = require("express");
const router = express.Router();

const { createProject, getProjects } = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Admin only
router.post("/", protect, createProject);
// All users
router.get("/", protect, getProjects);

module.exports = router;

