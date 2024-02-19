const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(verifyToken, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;