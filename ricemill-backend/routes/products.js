/*const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add a new product
router.post("/add", async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    // Check if product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: `Product with name "${name}" already exists` });
    }

    const product = new Product({ name, price, stock });
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ message: `Product with name "${req.body.name}" already exists`, error });
    } else {
      res.status(500).json({ message: "Error adding product", error });
    }
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});


// Buy a product (reduce stock and update sales)
router.post("/buy", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    product.stock -= quantity;
    product.salesPerDay += quantity;
    await product.save();
    res.status(200).json({ message: "Purchase successful", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error purchasing product", error });
  }
});

module.exports = router;*/

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add a new product
router.post("/add", async (req, res) => {
  try {
    const { name, price, stock, category, salesPerDay, bufferStock } = req.body;

    // No unique check for name since we removed unique constraint
    const product = new Product({
      name,
      price,
      stock,
      category,
      salesPerDay: salesPerDay || 50,
      bufferStock: bufferStock || 1000,
    });
    await product.save();
    console.log('Product added to database:', product); // Debug log
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: "Error adding product", error });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    console.log('All products from database:', products); // Debug log
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});

module.exports = router;