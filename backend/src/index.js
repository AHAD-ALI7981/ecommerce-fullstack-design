import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import cartRoute from "./routes/cart.route.js";
import saveForLater from "./routes/saveForLater.routes.js";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.routes.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/saveForLater", saveForLater);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res, next) => {
    const filePath = path.join(__dirname, "../frontend", "dist", "index.html");
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Failed to serve frontend:", err);
        res.status(500).send("Something went wrong");
      }
    });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
