import mongoose from "mongoose";
import Product from "../models/product.models.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Error in getAllProducts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFeaturedFroducts = async (req, res) => {
  try {
    const featuredFroducts = await Product.find({ isFeatured: true }).lean();
    res.json(featuredFroducts);
  } catch (error) {
    console.error("Error in getFeaturedFroducts route:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, images, category } = req.body;
  if (!name || !description || !price || !category || !images) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least 1 image is required" });
    }

    // Store base64 images directly in MongoDB (no Cloudinary)
    const product = new Product({
      name,
      description,
      price,
      category,
      images: images,
    });
    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ message: "Error in creating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "product successfully deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ message: "Error in deleting product" });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    await product.save();
    res
      .status(200)
      .json({ product: product, message: "Featured status updated" });
  } catch (error) {
    console.error("Error in toggleFeaturedProduct:", error.message);
    res.status(500).json({ message: "Failed to toggle featured" });
  }
};
