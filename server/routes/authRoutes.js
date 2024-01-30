const express = require("express");
const authController = require('../controllers/authController');

const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post('/', authController.registerUser)
router.post('/login', authController.authUser)

// router.route("/").get(protect, allUsers);
// router.route("/").post(registerUser);
// router.post("/login", authUser);

module.exports = router;