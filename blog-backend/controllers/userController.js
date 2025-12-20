// bcrypt got issue on my laptop. Instead used bcryptjs
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//REGISTER USER (PUBLIC)
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already registered!" });
    }

    // Hash REAL password (FIXED BUG)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //  Return success response (no password)
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//LOGIN USER (PUBLIC)
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect!" });
    }

    // Create JWT token
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    //Return token
    return res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//USER PROFILE (PRIVATE)
const userProfile = async (req, res) => {
  // req.user will come from JWT middleware
  return res.status(200).json({
    message: "Current user info",
    user: req.user,
  });
};

module.exports = {
  userRegister,
  userLogin,
  userProfile,
};
