const router = require("express").Router();
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
    const users = await User.find().select("_id name email");
    res.json(users);
});

module.exports = router;