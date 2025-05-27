const Product = require("../models/Product");

const calculateBuffer = async () => {
  const products = await Product.find();
  const bufferStocks = {
    "Keeri Samba": 1000,
    "Nadu Rice": 2000,
    "Red Raw Rice": 1000,
  };

  const alerts = [];

  for (const product of products) {
    const buffer = bufferStocks[product.name] || 0;
    if (buffer === 0) continue; // Skip products with no buffer

    // Calculate days left based on salesPerDay
    const daysLeft = product.salesPerDay > 0 ? Math.floor(product.stock / product.salesPerDay) : Infinity;

    // Alert if stock is 0
    if (product.stock <= 0) {
      alerts.push(`${product.name} is out of stock! Order ${buffer}kg immediately to meet buffer stock.`);
    }
    // Alert if stock is low (less than 1 day's sales)
    else if (daysLeft < 1) {
      const requiredStock = buffer - product.stock;
      alerts.push(`${product.name} stock is critically low (${product.stock}kg). Order ${requiredStock}kg to reach buffer (${buffer}kg).`);
    }
    // Alert if stock exceeds buffer by 50%
    else if (product.stock > buffer * 1.5) {
      const excessStock = product.stock - buffer;
      alerts.push(`${product.name} stock (${product.stock}kg) exceeds buffer (${buffer}kg) by ${excessStock}kg. Reduce stock.`);
    }
  }

  return alerts;
};

module.exports = { calculateBuffer };