import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CartPage.css';
import logo from '../assets/logo.png';

const productImages = {
  keeriSamba: 'src/assets/Supiri Keeri Samba.jpg',
  sambaRice: 'src/assets/Supiri Samba Rice.jpg',
  redNadu: 'src/assets/Supiri Red Nadu Rice.jpg',
  whiteNadu: 'src/assets/Supiri White Raw Rice.jpg',
  redRaw: 'src/assets/Supiri Red Raw Rice.jpg',
  sambaRaw: 'src/assets/Supiri Samba Raw Rice.jpg',
  whiteRaw: 'src/assets/white nadu rice.jpg',
};

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: initialCartItems = [] } = location.state || {};
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [showAlert, setShowAlert] = useState(false);

  const boiledRiceProducts = [
    { name: 'Supiri Keeri Samba', image: productImages.keeriSamba, price: 'LKR 1500', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'Samba Rice', image: productImages.sambaRice, price: 'LKR 1400', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'Red Nadu', image: productImages.redNadu, price: 'LKR 1300', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'White Nadu', image: productImages.whiteNadu, price: 'LKR 1350', reviews: 0, inStock: true, category: 'Rice' },
  ];

  const rawRiceProducts = [
    { name: 'Red Raw', image: productImages.redRaw, price: 'LKR 1200', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'Samba Raw', image: productImages.sambaRaw, price: 'LKR 1250', reviews: 0, inStock: true, category: 'Rice' },
    { name: 'White Raw', image: productImages.whiteRaw, price: 'LKR 1150', reviews: 0, inStock: true, category: 'Rice' },
  ];

  const allProducts = [...boiledRiceProducts, ...rawRiceProducts];

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (productName, delta) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.name === productName) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const handleAddToCart = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleSelectProduct = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleCartClick = () => {
    console.log("Navigating to /cart-summary with cartItems:", cartItems);
    if (cartItems.length > 0) {
      navigate('/cart-summary', { state: { cartItems } });
    } else {
      console.log("Cart is empty, cannot navigate to cart-summary");
    }
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="cart-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="cart-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
        <div className="cart-header-icons">
          <button className="cart-cart-btn" onClick={handleCartClick}>
            <span className="cart-cart-icon">🛒</span>
            <span className="cart-cart-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="cart-cart-count">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="cart-content">
        <aside className="cart-sidebar">
          <div className="cart-sidebar-products">
            {allProducts.map((product, index) => (
              <div
                className="cart-sidebar-product"
                key={index}
                onClick={() => handleSelectProduct(product)}
              >
                <div className="cart-sidebar-product-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="cart-main">
          <h1>Your Cart</h1>
          {cartItems.length > 0 ? (
            <div className="cart-item-container">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <div className="cart-item-rating">
                      <span className="cart-item-stars">★★★★★</span>
                      <span className="cart-item-reviews">No reviews</span>
                    </div>
                    <p className="cart-item-category">
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p className="cart-item-stock">
                      <strong>{item.inStock ? 'In Stock' : 'Out of Stock'}</strong>
                    </p>
                    <p className="cart-item-price">
                      <strong>Price:</strong> {item.price}
                    </p>
                    <p className="cart-item-shipping">
                      <strong>Shipping:</strong> Free Shipping
                    </p>
                    <div className="cart-item-quantity">
                      <button onClick={() => handleQuantityChange(item.name, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.name, 1)}>+</button>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        className="cart-item-add-to-cart-btn"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                    {showAlert && (
                      <div className="cart-item-alert">
                        You successfully added the product to the cart!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </main>
      </div>

      <footer className="cart-footer">
        <div className="cart-footer-columns">
          <div className="cart-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="cart-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="cart-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="cart-footer-column">
            <h5>Follow Us</h5>
            <div className="cart-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="cart-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CartPage;