const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/userModel");
const { sendEmail } = require("../utils/sendEmail");

//forgotpassword
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  console.log(email);
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // generate token
  const token = crypto.randomBytes(20).toString("hex");

  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save();

  const resetLink = `${process.env.BASE_URL}/reset-password/${token}`;
  const html = `
      <h3>Password Reset Request</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `;

  await sendEmail(user.email, "Reset Password", html);

  res.json({ message: "Reset link sent to email" });
};

//resetpassword
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // Validate that newPassword is provided
    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(20),
    );

    // Update user with new password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();
    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
};

module.exports = {
  forgotPassword,
  resetPassword,
  login,
};
