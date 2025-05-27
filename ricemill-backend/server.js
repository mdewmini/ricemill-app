/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// Test Route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.status(200).json({ message: 'Test route working' });
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});


const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// alert
const alertRoutes = require("./routes/alerts");
app.use("/api/alerts", alertRoutes);

app.post('/api/products/buy', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock >= quantity) {
      product.stock -= quantity;
      await product.save();
      res.json({ message: 'Purchase successful', stockLeft: product.stock });
    } else {
      res.status(400).json({ message: 'Insufficient stock' });
    }
  } catch (error) {
    console.error('Error buying product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});*/


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Product = require('./models/Product'); // Import Product model

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// Test Route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.status(200).json({ message: 'Test route working' });
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Alert Routes
const alertRoutes = require('./routes/alerts');
app.use('/api/alerts', alertRoutes);

// Add Product Route
app.post('/api/products/add', async (req, res) => {
  const { name, price, stock, category, salesPerDay, bufferStock } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      stock,
      category,
      salesPerDay: salesPerDay || 50,
      bufferStock: bufferStock || 1000,
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Buy Product Route
app.post('/api/products/buy', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock >= quantity) {
      product.stock -= quantity;
      await product.save();
      res.json({ message: 'Purchase successful', stockLeft: product.stock });
    } else {
      res.status(400).json({ message: 'Insufficient stock' });
    }
  } catch (error) {
    console.error('Error buying product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});