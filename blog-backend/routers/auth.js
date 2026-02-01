const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  resetPassword,
  login,
} = require("../controllers/authController");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", login);

module.exports = router;
