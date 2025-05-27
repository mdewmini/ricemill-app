const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/ricemill', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Simulate sales for a day (50 sales)
async function simulateDailySales() {
  try {
    const products = await Product.find();
    const dailySales = [];

    // Define sales distribution (Keeri Samba sells the most, then Nadu Rice, etc.)
    const salesDistribution = {
      'Keeri Samba': 0.25, // 25% of sales
      'Nadu Rice': 0.20,  // 20% of sales
      'Pokuru Samba': 0.15, // 15% of sales
      'Rathu Kekulu': 0.10, // 10% of sales
      // Others share the rest equally
    };

    const totalSales = 50; // Supervisor requested 50 sales per day
    for (let i = 0; i < totalSales; i++) {
      const rand = Math.random();
      let selectedProduct;
      let cumulative = 0;

      // Select product based on sales distribution
      for (const [productName, probability] of Object.entries(salesDistribution)) {
        cumulative += probability;
        if (rand <= cumulative) {
          selectedProduct = products.find(p => p.name === productName);
          break;
        }
      }
      if (!selectedProduct) {
        // If not selected, pick a random product from the rest
        const remainingProducts = products.filter(p => !Object.keys(salesDistribution).includes(p.name));
        selectedProduct = remainingProducts[Math.floor(Math.random() * remainingProducts.length)];
      }

      // Simulate quantity (1-5 kg per sale)
      const quantity = Math.floor(Math.random() * 5) + 1;

      // Update stock and sales
      selectedProduct.stock -= quantity;
      selectedProduct.salesPerDay += quantity;
      await selectedProduct.save();

      dailySales.push({
        product: selectedProduct.name,
        quantity,
        timestamp: new Date(),
      });
    }

    console.log('Daily sales simulated:', dailySales);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error simulating sales:', error);
    mongoose.connection.close();
  }
}

simulateDailySales();