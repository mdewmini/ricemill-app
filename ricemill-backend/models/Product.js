/*const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true }, // per kg
  stock: { type: Number, required: true, default: 0 }, // in kg
  salesPerDay: { type: Number, default: 0 }, // daily sales
  imageUrl: { type: String, required: false, default: "src/assets/placeholder.jpg" },
});

module.exports = mongoose.model("Product", productSchema);*/

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // unique: true removed
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true }, // Make category required for new products
  inStock: { type: Boolean, default: true },
  reviews: { type: Number, default: 0 },
  salesPerDay: { type: Number, default: 0 },
  bufferStock: { type: Number, default: 1000 },
  imageUrl: { type: String, required: false, default: "src/assets/placeholder.jpg" },
});

module.exports = mongoose.model("Product", productSchema);