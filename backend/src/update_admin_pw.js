import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const updatePassword = async () => {
  const newPassword = process.argv[2];
  if (!newPassword) {
    console.log("Please provide a new password as an argument. Example: node update_admin_pw.js mynewpassword");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: "admin@example.com" });
    if (!user) {
      console.log("Admin user not found.");
      process.exit(1);
    }
    user.password = newPassword;
    await user.save();
    console.log("Password updated successfully for admin@example.com");
    process.exit(0);
  } catch (error) {
    console.error("Error updating password:", error);
    process.exit(1);
  }
};

updatePassword();
