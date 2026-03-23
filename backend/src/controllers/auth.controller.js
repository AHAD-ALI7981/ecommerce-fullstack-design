import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      username,
      email,
      password,
      // role is always "user" by default — never accept from client
    });
    generateToken(user._id, res);
    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({ user: userResponse, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await userExists.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(userExists._id, res);

    // Return user without password
    const userResponse = userExists.toObject();
    delete userResponse.password;
    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ message: "Server error during logout" });
  }
};

export const checkAuth = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in checkAuth:", error.message);
    res.status(500).json({ message: "Server error in checkAuth Route" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Current password and new password (min 6 chars) are required" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in updatePassword:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
