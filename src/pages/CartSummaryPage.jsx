import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CartSummaryPage.css';
import logo from '../assets/logo.png';

const CartSummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: initialCartItems = [] } = location.state || {};
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveItem = (productName) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.name !== productName);
      return updatedItems;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    navigate('/cart', { state: { cartItems: [] } });
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout', { state: { cartItems } });
    }
  };

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

  const calculateTotals = () => {
    const shippingCost = 0;
    const subtotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('LKR ', '')) || 0;
      return sum + price * (item.quantity || 1);
    }, 0);
    const total = subtotal + shippingCost;
    return { subtotal, shippingCost, total };
  };

  const { subtotal, shippingCost, total } = calculateTotals();

  return (
    <div className="cart-summary-page">
      <header className="cart-summary-header">
        <div className="cart-summary-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="cart-summary-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
        <div className="cart-summary-header-icons">
          <button className="cart-summary-cart-btn">
            <span className="cart-summary-cart-icon">🛒</span>
            <span className="cart-summary-cart-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="cart-summary-cart-count">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="cart-summary-main">
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="cart-summary-content">
            <div className="cart-summary-table-container">
              <table className="cart-summary-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Shipping Cost</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    const price = parseFloat(item.price.replace('LKR ', '')) || 0;
                    const itemTotal = price * (item.quantity || 1);
                    return (
                      <tr key={index}>
                        <td>
                          <div className="cart-summary-product">
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                            <button
                              className="cart-summary-remove-btn"
                              onClick={() => handleRemoveItem(item.name)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td>{item.price}</td>
                        <td>
                          <div className="cart-summary-quantity">
                            <button onClick={() => handleQuantityChange(item.name, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.name, 1)}>+</button>
                          </div>
                        </td>
                        <td>Free Shipping</td>
                        <td>LKR {itemTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button className="cart-summary-clear-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>

            <div className="cart-summary-order">
              <h2>Order Summary</h2>
              <div className="cart-summary-order-details">
                <div className="cart-summary-order-row">
                  <span>Subtotal:</span>
                  <span>LKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary-order-row">
                  <span>Shipping Cost:</span>
                  <span>LKR {shippingCost.toFixed(2)}</span>
                </div>
                <div className="cart-summary-order-row cart-summary-order-total">
                  <span>Total:</span>
                  <span>LKR {total.toFixed(2)}</span>
                </div>
              </div>
              <button className="cart-summary-checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </main>

      <footer className="cart-summary-footer">
        <div className="cart-summary-footer-columns">
          <div className="cart-summary-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="cart-summary-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="cart-summary-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="cart-summary-footer-column">
            <h5>Follow Us</h5>
            <div className="cart-summary-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="cart-summary-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CartSummaryPage;