const express = require("express");
const { authenticate, authorizeRole } = require("../middleware/authMiddleware");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Example of protected route (additional routes for meals, products, achievements go here)
router.get("/protected", authenticate, (req, res) => {
  res.send("Protected route accessed");
});

module.exports = router;
