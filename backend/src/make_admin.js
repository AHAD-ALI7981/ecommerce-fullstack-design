import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const makeAdmin = async () => {
  const email = process.argv[2];
  if (!email) {
    console.log("Please provide an email as an argument. Example: node src/make_admin.js user@gmail.com");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database...");

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log(`User with email ${email} not found.`);
      process.exit(1);
    }

    console.log(`Successfully promoted ${email} to admin.`);
    console.log("Updated user details:", {
      username: user.username,
      email: user.email,
      role: user.role
    });
    
    process.exit(0);
  } catch (error) {
    console.error("Error promoting user:", error.message);
    process.exit(1);
  }
};

makeAdmin();
