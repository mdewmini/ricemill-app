import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomerOrdersPage.css';
import logo from '../assets/logo.png';

const CustomerOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
      setOrders(storedOrders);
    } catch (error) {
      console.error('Error parsing customerOrders from localStorage:', error);
      setOrders([]);
      localStorage.removeItem('customerOrders');
    }
  }, []);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleViewDetails = (order) => {
    alert(`Viewing details for Order ID: ${order.id}`);
  };

  // Filter orders to only include those with products
  const filteredOrders = orders.filter(
    (order) => order.products && order.products.length > 0
  );

  return (
    <div className="cust-orders-page">
      <header className="cust-orders-header">
        <div className="cust-orders-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="cust-orders-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
        <div className="cust-orders-header-icons">
          <button className="cust-orders-cart-btn" onClick={handleCartClick}>
            <span className="cust-orders-cart-icon">🛒</span>
            <span className="cust-orders-cart-label">Cart</span>
          </button>
        </div>
      </header>

      <main className="cust-orders-main">
        <h1>Your Orders</h1>
        {filteredOrders.length > 0 ? (
          <div className="cust-orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="cust-orders-card">
                <div className="cust-orders-details">
                  <p>
                    <strong>Order ID:</strong>
                    <span className="cust-orders-id">{order.id}</span>
                  </p>
                  <p>
                    <strong>Total Amount:</strong>
                    {order.total || 'LKR 0.00'}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>
                    {order.paymentMethod || 'PayPal'}
                  </p>
                  <p>
                    <strong>Order Status:</strong>
                    <span className="cust-orders-status shipped">
                      {order.status || 'Shipped'}
                    </span>
                  </p>
                  <p>
                    <strong>Placed On:</strong>
                    {order.orderDate || 'N/A'}
                  </p>
                </div>
                <div className="cust-orders-products">
                  <p>Products:</p>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((product, index) => (
                      <div key={index} className="cust-orders-product-item">
                        <img
                          src={product.image || 'src/assets/placeholder.png'}
                          alt={product.productName || 'Product'}
                          className="cust-orders-product-image"
                        />
                        <div className="cust-orders-product-info">
                          <p>{product.productName || 'Unknown Product'}</p>
                          <p>Quantity: {product.quantity || 1}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products available.</p>
                  )}
                </div>
                <button
                  className="cust-orders-view-btn"
                  onClick={() => handleViewDetails(order)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="cust-orders-no-orders">You have no orders with products yet.</p>
        )}
      </main>

      <footer className="cust-orders-footer">
        <div className="cust-orders-footer-columns">
          <div className="cust-orders-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="cust-orders-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="cust-orders-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="cust-orders-footer-column">
            <h5>Follow Us</h5>
            <div className="cust-orders-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="cust-orders-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CustomerOrdersPage;