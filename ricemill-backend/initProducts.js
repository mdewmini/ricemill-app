const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/ricemill', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  { name: 'Keeri Samba', price: 250, stock: 5000, salesPerDay: 0 },
  { name: 'Nadu Rice', price: 200, stock: 6000, salesPerDay: 0 },
  { name: 'Red Nadu Rice', price: 180, stock: 4000, salesPerDay: 0 },
  { name: 'White Raw Rice', price: 170, stock: 4500, salesPerDay: 0 },
  { name: 'Samba Raw Rice', price: 220, stock: 3500, salesPerDay: 0 },
  { name: 'Red Raw Rice', price: 190, stock: 4000, salesPerDay: 0 },
  { name: 'Pokuru Samba', price: 230, stock: 3000, salesPerDay: 0 },
  { name: 'Rathu Kekulu', price: 210, stock: 2500, salesPerDay: 0 },
  { name: 'Suduru Samba', price: 240, stock: 2000, salesPerDay: 0 },
  { name: 'Kalu Heenati', price: 260, stock: 1500, salesPerDay: 0 },
  { name: 'Madathawalu', price: 200, stock: 1800, salesPerDay: 0 },
  { name: 'Pachchaperumal', price: 190, stock: 1600, salesPerDay: 0 },
  { name: 'Suwandel', price: 270, stock: 1200, salesPerDay: 0 },
  { name: 'Kahawanu', price: 195, stock: 2000, salesPerDay: 0 },
  { name: 'At 308', price: 175, stock: 3000, salesPerDay: 0 },
  { name: 'Bg 352', price: 185, stock: 2800, salesPerDay: 0 },
  { name: 'Kuruluthuda', price: 205, stock: 2200, salesPerDay: 0 },
  { name: 'Dahanala', price: 215, stock: 1900, salesPerDay: 0 },
];

async function initDB() {
  try {
    // Drop the collection to avoid duplicates
    await Product.collection.drop();
    console.log('Dropped products collection');

    // Insert new products
    await Product.insertMany(products);
    console.log('Database initialized with products');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    mongoose.connection.close();
  }
}

initDB();