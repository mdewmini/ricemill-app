/*import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CheckoutConfirmationPage.css';
import logo from '../assets/logo.png';

const CheckoutConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentItem, shippingDetails } = location.state || {}; 


  const price = currentItem ? parseFloat(currentItem.price.replace('LKR ', '')) : 0;
  const quantity = currentItem ? currentItem.quantity || 1 : 0;
  const total = price * quantity;

  const handlePayPalPayment = () => {
    
    alert('Proceeding with PayPal payment...');
    
    navigate('/order-success');
  };

  const handleCardPayment = () => {
   
    alert('Proceeding with Debit/Credit Card payment...');
   
    navigate('/order-success');
  };

  return (
    <div className="checkout-confirmation-page">
      
      <header className="checkout-confirmation-header">
        <div className="checkout-confirmation-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="checkout-confirmation-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
        <div className="checkout-confirmation-header-icons">
          <button className="checkout-confirmation-cart-btn">
            <span className="checkout-confirmation-cart-icon">🛒</span>
            <span className="checkout-confirmation-cart-label">Cart</span>
            {currentItem && (
              <span className="checkout-confirmation-cart-count">{quantity}</span>
            )}
          </button>
        </div>
      </header>

     
      <main className="checkout-confirmation-main">
        <h1>Checkout Page</h1>
        <div className="checkout-confirmation-content">
         
          <div className="checkout-confirmation-payment">
            <h2>Pay with PayPal</h2>
            <button className="checkout-confirmation-paypal-btn" onClick={handlePayPalPayment}>
              PayPal
            </button>
            <button className="checkout-confirmation-card-btn" onClick={handleCardPayment}>
              Debit or Credit Card
            </button>
            <p className="checkout-confirmation-paypal-info">Powered by PayPal</p>
          </div>

        
          <div className="checkout-confirmation-details">
            <div className="checkout-confirmation-shipping">
              <h2>Shipping Address</h2>
              <div className="checkout-confirmation-shipping-details">
                <p><span className="checkout-confirmation-icon">📍</span> Address: {shippingDetails?.address || 'N/A'}</p>
                <p><span className="checkout-confirmation-icon">🏛️</span> Province: {shippingDetails?.province || 'N/A'}</p>
                <p><span className="checkout-confirmation-icon">📮</span> ZIP Code: {shippingDetails?.zipCode || 'N/A'}</p>
                <p><span className="checkout-confirmation-icon">📞</span> Mobile Number: {shippingDetails?.mobileNumber || 'N/A'}</p>
              </div>
            </div>

            <div className="checkout-confirmation-cart">
              <h2>Cart Items</h2>
              {currentItem ? (
                <div className="checkout-confirmation-cart-item">
                  <p>{currentItem.name}</p>
                  <p>Quantity: {quantity}</p>
                  <p>LKR {(price * quantity).toFixed(2)}</p>
                </div>
              ) : (
                <p>No items in cart.</p>
              )}
              <div className="checkout-confirmation-total">
                <h3>Total:</h3>
                <p>LKR {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

     
      <footer className="checkout-confirmation-footer">
        <div className="checkout-confirmation-footer-columns">
          <div className="checkout-confirmation-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="checkout-confirmation-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="checkout-confirmation-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="checkout-confirmation-footer-column">
            <h5>Follow Us</h5>
            <div className="checkout-confirmation-social-icons">
            <img src="src/assets/facebook.png" alt="Facebook" />
            <img src="src/assets/twitter.png" alt="Twitter" />
            <img src="src/assets/instagram.png" alt="Instagram" />
            <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="checkout-confirmation-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CheckoutConfirmationPage;*/

import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/CheckoutConfirmationPage.css';
import logo from '../assets/logo.png';

const CheckoutConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], shippingDetails } = location.state || {};

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('LKR ', '') || 0);
      return sum + price * (item.quantity || 1);
    }, 0);
  };

  const total = calculateTotal(cartItems);

  const handlePayPalPayment = () => {
    alert('Proceeding with PayPal payment...');
    navigate('/order-success');
  };

  const handleCardPayment = () => {
    alert('Proceeding with Debit/Credit Card payment...');
    navigate('/checkout', { state: { cartItems, shippingDetails } });
  };

  return (
    <div className="checkout-confirmation-page">
      <header className="checkout-confirmation-header">
        <div className="checkout-confirmation-logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="checkout-confirmation-nav-links">
          <Link to="/customer-home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/customer-orders">Orders</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="checkout-confirmation-header-icons">
          <button className="checkout-confirmation-cart-btn" onClick={() => navigate('/cart')}>
            <span className="checkout-confirmation-cart-icon">🛒</span>
            <span className="checkout-confirmation-cart-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="checkout-confirmation-cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </button>
        </div>
      </header>

      <main className="checkout-confirmation-main">
        <h1>Checkout Page</h1>
        <div className="checkout-confirmation-content">
          <div className="checkout-confirmation-payment">
            <h2>Pay with PayPal</h2>
            <button className="checkout-confirmation-paypal-btn" onClick={handlePayPalPayment}>
              PayPal
            </button>
            <button className="checkout-confirmation-card-btn" onClick={handleCardPayment}>
              Debit or Credit Card
            </button>
            <p className="checkout-confirmation-paypal-info">Powered by PayPal</p>
          </div>

          <div className="checkout-confirmation-details">
            <div className="checkout-confirmation-shipping">
              <h2>Shipping Address</h2>
              <div className="checkout-confirmation-shipping-details">
                <p><span className="checkout-confirmation-icon">📍</span> Address: {shippingDetails?.address || 'N/A'}</p>
                <p><span className="checkout-confirmation-icon">🏛️</span> Province: {shippingDetails?.province || 'N/A'}</p>
                <p><span className="checkout-confirmation-icon">📮</span> ZIP Code: {shippingDetails?.zipCode || 'N/A'}</p>
                <p><span className="checkout-confirmation-icon">📞</span> Mobile Number: {shippingDetails?.mobileNumber || 'N/A'}</p>
              </div>
            </div>

            <div className="checkout-confirmation-cart">
              <h2>Cart Items</h2>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('LKR ', '') || 0);
                  const quantity = item.quantity || 1;
                  const itemTotal = price * quantity;
                  return (
                    <div className="checkout-confirmation-cart-item" key={index}>
                      <p>{item.name}</p>
                      <p>Quantity: {quantity}</p>
                      <p>LKR {itemTotal.toFixed(2)}</p>
                    </div>
                  );
                })
              ) : (
                <p>No items in cart.</p>
              )}
              <div className="checkout-confirmation-total">
                <h3>Total:</h3>
                <p>LKR {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="checkout-confirmation-footer">
        <div className="checkout-confirmation-footer-columns">
          <div className="checkout-confirmation-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="checkout-confirmation-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/customer-home">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/customer-orders">Orders</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          <div className="checkout-confirmation-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="checkout-confirmation-footer-column">
            <h5>Follow Us</h5>
            <div className="checkout-confirmation-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="checkout-confirmation-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CheckoutConfirmationPage;