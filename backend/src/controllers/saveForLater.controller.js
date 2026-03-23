import User from "../models/user.model.js";
import mongoose from "mongoose";

export const addToSaveForLater = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const alreadySaved = user.saveForLaterItems.find(
      (item) => item.product && item.product.toString() === productId
    );

    if (alreadySaved) {
      return res.status(409).json({ message: "Item already saved for later" });
    }

    user.saveForLaterItems.push({ product: productId });

    await user.save();

    res.status(200).json({ message: "Item saved for later", productId });
  } catch (error) {
    console.error("Error in addToSaveForLater:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSaveForLaterItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "saveForLaterItems.product"
    );

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ saveForLaterItems: user.saveForLaterItems });
  } catch (error) {
    console.error("Error in getSaveForLaterItems:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromSaveForLater = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.saveForLaterItems = user.saveForLaterItems.filter(
      (item) => item.product && item.product.toString() !== productId
    );

    await user.save();
    res.status(200).json({ message: "Item removed from saved for later", productId });
  } catch (error) {
    console.error("Error in removeFromSaveForLater:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
