import User from "../models/user.model.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
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

    const existingItem = user.cartItems.find(
      (item) => item.product && item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId });
    }

    await user.save();

    res.status(200).json({ message: "Item added to cart", productId });
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "cartItems.product"
    );
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cartItems = user.cartItems;
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error in getCartItems:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCartItem = async (req, res) => {
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

    user.cartItems = user.cartItems.filter(
      (item) => item.product && item.product.toString() !== productId
    );

    await user.save();

    res.status(200).json({ message: "Item removed from cart", productId });
  } catch (error) {
    console.error("Error in deleteCartItem:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingItem = user.cartItems.find(
      (item) => item.product && item.product.toString() === productId
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    existingItem.quantity = quantity;

    await user.save();

    res.status(200).json({ message: "Cart item updated", productId, quantity });
  } catch (error) {
    console.error("Error in updateCartItem:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};