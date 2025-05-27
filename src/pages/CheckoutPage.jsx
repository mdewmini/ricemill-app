/*import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';
import logo from '../assets/logo.png';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: initialCartItems = [] } = location.state || {};

  const [cartItems, setCartItems] = useState(initialCartItems);

  const [shippingDetails] = useState({
    address: 'test address for user test',
    province: 'colombo',
    zipCode: '10001350',
    mobileNumber: '0771234567',
  });

  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showOrderSuccessPopup, setShowOrderSuccessPopup] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expires: '',
    csc: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: 'Sri Lanka',
    postalCode: '',
    mobile: '',
    shipToBilling: false,
    confirmLegalAge: false,
  });

  const countries = [
    { name: 'Afghanistan', flag: '🇦🇫' },
    { name: 'Albania', flag: '🇦🇱' },
    { name: 'Algeria', flag: '🇩🇿' },
    { name: 'Andorra', flag: '🇦🇩' },
    { name: 'Angola', flag: '🇦🇴' },
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Armenia', flag: '🇦🇲' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Austria', flag: '🇦🇹' },
    { name: 'Azerbaijan', flag: '🇦🇿' },
    { name: 'Bahamas', flag: '🇧🇸' },
    { name: 'Bahrain', flag: '🇧🇭' },
    { name: 'Bangladesh', flag: '🇧🇩' },
    { name: 'Barbados', flag: '🇧🇧' },
    { name: 'Belarus', flag: '🇧🇾' },
    { name: 'Belgium', flag: '🇧🇪' },
    { name: 'Belize', flag: '🇧🇿' },
    { name: 'Benin', flag: '🇧🇯' },
    { name: 'Bhutan', flag: '🇧🇹' },
    { name: 'Bolivia', flag: '🇧🇴' },
    { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { name: 'Botswana', flag: '🇧🇼' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Brunei', flag: '🇧🇳' },
    { name: 'Bulgaria', flag: '🇧🇬' },
    { name: 'Burkina Faso', flag: '🇧🇫' },
    { name: 'Burundi', flag: '🇧🇮' },
    { name: 'Cambodia', flag: '🇰🇭' },
    { name: 'Cameroon', flag: '🇨🇴' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Cape Verde', flag: '🇨🇻' },
    { name: 'Central African Republic', flag: '🇨🇫' },
    { name: 'Chad', flag: '🇹🇩' },
    { name: 'Chile', flag: '🇨🇱' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Colombia', flag: '🇨🇴' },
    { name: 'Comoros', flag: '🇰🇴' },
    { name: 'Congo (Congo-Brazzaville)', flag: '🇨🇬' },
    { name: 'Costa Rica', flag: '🇨🇷' },
    { name: 'Croatia', flag: '🇭🇷' },
    { name: 'Cuba', flag: '🇨🇺' },
    { name: 'Cyprus', flag: '🇨🇾' },
    { name: 'Czech Republic', flag: '🇨🇿' },
    { name: 'Denmark', flag: '🇩🇰' },
    { name: 'Djibouti', flag: '🇩🇯' },
    { name: 'Dominica', flag: '🇩🇴' },
    { name: 'Dominican Republic', flag: '🇩🇴' },
    { name: 'Ecuador', flag: '🇪🇨' },
    { name: 'Egypt', flag: '🇪🇬' },
    { name: 'El Salvador', flag: '🇸🇻' },
    { name: 'Equatorial Guinea', flag: '🇬🇶' },
    { name: 'Eritrea', flag: '🇪🇷' },
    { name: 'Estonia', flag: '🇪🇪' },
    { name: 'Eswatini', flag: '🇸🇿' },
    { name: 'Ethiopia', flag: '🇪🇹' },
    { name: 'Fiji', flag: '🇫🇯' },
    { name: 'Finland', flag: '🇫🇮' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Gabon', flag: '🇬🇦' },
    { name: 'Gambia', flag: '🇬🇴' },
    { name: 'Georgia', flag: '🇬🇪' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Ghana', flag: '🇬🇭' },
    { name: 'Greece', flag: '🇬🇷' },
    { name: 'Grenada', flag: '🇬🇩' },
    { name: 'Guatemala', flag: '🇬🇹' },
    { name: 'Guinea', flag: '🇬🇳' },
    { name: 'Guinea-Bissau', flag: '🇬🇼' },
    { name: 'Guyana', flag: '🇬🇾' },
    { name: 'Haiti', flag: '🇭🇹' },
    { name: 'Honduras', flag: '🇭🇳' },
    { name: 'Hungary', flag: '🇭🇺' },
    { name: 'Iceland', flag: '🇮🇸' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'Indonesia', flag: '🇮🇩' },
    { name: 'Iran', flag: '🇮🇷' },
    { name: 'Iraq', flag: '🇮🇶' },
    { name: 'Ireland', flag: '🇮🇪' },
    { name: 'Israel', flag: '🇮🇱' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Jamaica', flag: '🇯🇴' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Jordan', flag: '🇯🇴' },
    { name: 'Kazakhstan', flag: '🇰🇿' },
    { name: 'Kenya', flag: '🇰🇪' },
    { name: 'Kiribati', flag: '🇰🇮' },
    { name: 'Kuwait', flag: '🇰🇼' },
    { name: 'Kyrgyzstan', flag: '🇰🇬' },
    { name: 'Laos', flag: '🇱🇦' },
    { name: 'Latvia', flag: '🇱🇻' },
    { name: 'Lebanon', flag: '🇱🇧' },
    { name: 'Lesotho', flag: '🇱🇸' },
    { name: 'Liberia', flag: '🇱🇷' },
    { name: 'Libya', flag: '🇱🇾' },
    { name: 'Liechtenstein', flag: '🇱🇮' },
    { name: 'Lithuania', flag: '🇱🇹' },
    { name: 'Luxembourg', flag: '🇱🇺' },
    { name: 'Madagascar', flag: '🇴🇬' },
    { name: 'Malawi', flag: '🇴🇼' },
    { name: 'Malaysia', flag: '🇴🇾' },
    { name: 'Maldives', flag: '🇴🇻' },
    { name: 'Mali', flag: '🇴🇱' },
    { name: 'Malta', flag: '🇴🇹' },
    { name: 'Marshall Islands', flag: '🇴🇭' },
    { name: 'Mauritania', flag: '🇴🇷' },
    { name: 'Mauritius', flag: '🇴🇺' },
    { name: 'Mexico', flag: '🇴🇽' },
    { name: 'Micronesia', flag: '🇫🇴' },
    { name: 'Moldova', flag: '🇴🇩' },
    { name: 'Monaco', flag: '🇴🇨' },
    { name: 'Mongolia', flag: '🇴🇳' },
    { name: 'Montenegro', flag: '🇴🇪' },
    { name: 'Morocco', flag: '🇴🇦' },
    { name: 'Mozambique', flag: '🇴🇿' },
    { name: 'Myanmar', flag: '🇴🇴' },
    { name: 'Namibia', flag: '🇳🇦' },
    { name: 'Nauru', flag: '🇳🇷' },
    { name: 'Nepal', flag: '🇳🇵' },
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'New Zealand', flag: '🇳🇿' },
    { name: 'Nicaragua', flag: '🇳🇮' },
    { name: 'Niger', flag: '🇳🇪' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'North Korea', flag: '🇰🇵' },
    { name: 'North Macedonia', flag: '🇴🇰' },
    { name: 'Norway', flag: '🇳🇴' },
    { name: 'Oman', flag: '🇴🇴' },
    { name: 'Pakistan', flag: '🇵🇰' },
    { name: 'Palau', flag: '🇵🇼' },
    { name: 'Palestine', flag: '🇵🇸' },
    { name: 'Panama', flag: '🇵🇦' },
    { name: 'Papua New Guinea', flag: '🇵🇬' },
    { name: 'Paraguay', flag: '🇵🇾' },
    { name: 'Peru', flag: '🇵🇪' },
    { name: 'Philippines', flag: '🇵🇭' },
    { name: 'Poland', flag: '🇵🇱' },
    { name: 'Portugal', flag: '🇵🇹' },
    { name: 'Qatar', flag: '🇶🇦' },
    { name: 'Romania', flag: '🇷🇴' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Rwanda', flag: '🇷🇼' },
    { name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
    { name: 'Saint Lucia', flag: '🇱🇨' },
    { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
    { name: 'Samoa', flag: '🇼🇸' },
    { name: 'San Marino', flag: '🇸🇴' },
    { name: 'Sao Tome and Principe', flag: '🇸🇹' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'Senegal', flag: '🇸🇳' },
    { name: 'Serbia', flag: '🇷🇸' },
    { name: 'Seychelles', flag: '🇸🇨' },
    { name: 'Sierra Leone', flag: '🇸🇱' },
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'Slovakia', flag: '🇸🇰' },
    { name: 'Slovenia', flag: '🇸🇮' },
    { name: 'Solomon Islands', flag: '🇸🇧' },
    { name: 'Somalia', flag: '🇸🇴' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'South Korea', flag: '🇰🇷' },
    { name: 'South Sudan', flag: '🇸🇸' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Sri Lanka', flag: '🇱🇰' },
    { name: 'Sudan', flag: '🇸🇩' },
    { name: 'Suriname', flag: '🇸🇷' },
    { name: 'Sweden', flag: '🇸🇪' },
    { name: 'Switzerland', flag: '🇨🇭' },
    { name: 'Syria', flag: '🇸🇾' },
    { name: 'Taiwan', flag: '🇹🇼' },
    { name: 'Tajikistan', flag: '🇹🇯' },
    { name: 'Tanzania', flag: '🇹🇿' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'Timor-Leste', flag: '🇹🇱' },
    { name: 'Togo', flag: '🇹🇬' },
    { name: 'Tonga', flag: '🇹🇴' },
    { name: 'Trinidad and Tobago', flag: '🇹🇹' },
    { name: 'Tunisia', flag: '🇹🇳' },
    { name: 'Turkey', flag: '🇹🇷' },
    { name: 'Turkmenistan', flag: '🇹🇴' },
    { name: 'Tuvalu', flag: '🇹🇻' },
    { name: 'Uganda', flag: '🇺🇬' },
    { name: 'Ukraine', flag: '🇺🇦' },
    { name: 'United Arab Emirates', flag: '🇦🇪' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Uruguay', flag: '🇺🇾' },
    { name: 'Uzbekistan', flag: '🇺🇿' },
    { name: 'Vanuatu', flag: '🇻🇺' },
    { name: 'Vatican City', flag: '🇻🇦' },
    { name: 'Venezuela', flag: '🇻🇪' },
    { name: 'Vietnam', flag: '🇻🇳' },
    { name: 'Yemen', flag: '🇾🇪' },
    { name: 'Zambia', flag: '🇿🇴' },
    { name: 'Zimbabwe', flag: '🇿🇼' },
  ];

 
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('LKR ', '')) || 0;
      return sum + price * (item.quantity || 1);
    }, 0);
  };

  const total = calculateTotal();

  const handleCardPayment = () => {
    setShowCreditCardForm(!showCreditCardForm);
  };

  const handleCreditCardInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreditCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreditCardSubmit = (e) => {
    e.preventDefault();
    if (!creditCardDetails.confirmLegalAge) {
      alert('Please confirm that you are of legal age and agree to the PayPal Privacy Statement.');
      return;
    }

    const order = {
      id: Date.now(),
      products: cartItems.map(item => ({
        productName: item.name,
        quantity: item.quantity || 1,
        image: item.image || '',
      })),
      total: `LKR ${total.toFixed(2)}`,
      orderDate: new Date().toLocaleString(),
      paymentMethod: 'PayPal',
      status: 'Shipped',
    };

    const existingOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    existingOrders.push(order);
    localStorage.setItem('customerOrders', JSON.stringify(existingOrders));

   
    setCartItems([]);
    localStorage.setItem('cartItems', JSON.stringify([]));

    setShowOrderSuccessPopup(true);
  };

  const handlePopupClose = () => {
    setShowOrderSuccessPopup(false);
    setShowSuccessNotification(true);
  };

  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false);
        navigate('/customer-home');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessNotification, navigate]);

  return (
    <div className="checkout-page">
      {showSuccessNotification && (
        <div className="success-notification">
          <span className="success-icon">✔</span>
          <span>Order saved successfully!</span>
        </div>
      )}

      <header className="checkout-header">
        <div className="checkout-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="checkout-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
        <div className="checkout-header-icons">
          <button className="checkout-cart-btn">
            <span className="checkout-cart-icon">🛒</span>
            <span className="checkout-cart-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="checkout-cart-count">
                {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="checkout-main">
        <h1>Checkout Page</h1>
        <div className="checkout-content">
          <div className="checkout-payment">
            <h2>
              <span className="checkout-cart-icon">🛒</span> Pay with PayPal
            </h2>
            <div className="checkout-paypal-bar">
              PayPal
            </div>
            <button className="checkout-card-btn" onClick={handleCardPayment}>
              Debit or Credit Card
            </button>
            {showCreditCardForm && (
              <form className="credit-card-form" onSubmit={handleCreditCardSubmit}>
                <div className="credit-card-form-group">
                  <label>Card number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={creditCardDetails.cardNumber}
                    onChange={handleCreditCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="credit-card-form-row">
                  <div className="credit-card-form-group">
                    <label>Expires</label>
                    <input
                      type="text"
                      name="expires"
                      value={creditCardDetails.expires}
                      onChange={handleCreditCardInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="credit-card-form-group">
                    <label>CSC</label>
                    <input
                      type="text"
                      name="csc"
                      value={creditCardDetails.csc}
                      onChange={handleCreditCardInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <h3>Billing address</h3>
                <div className="credit-card-form-row">
                  <div className="credit-card-form-group">
                    <label>First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={creditCardDetails.firstName}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                  <div className="credit-card-form-group">
                    <label>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={creditCardDetails.lastName}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="credit-card-form-group">
                  <label>Address line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={creditCardDetails.addressLine1}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className="credit-card-form-group">
                  <label>Address line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={creditCardDetails.addressLine2}
                    onChange={handleCreditCardInputChange}
                  />
                </div>
                <div className="credit-card-form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={creditCardDetails.city}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className="credit-card-form-row">
                  <div className="credit-card-form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={creditCardDetails.country}
                      onChange={handleCreditCardInputChange}
                      required
                    >
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="credit-card-form-group">
                    <label>Postal code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={creditCardDetails.postalCode}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="credit-card-form-group">
                  <label>Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={creditCardDetails.mobile}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className="credit-card-form-checkbox">
                  <input
                    type="checkbox"
                    name="shipToBilling"
                    checked={creditCardDetails.shipToBilling}
                    onChange={handleCreditCardInputChange}
                  />
                  <label>Ship to billing address</label>
                </div>
                <div className="credit-card-form-checkbox">
                  <input
                    type="checkbox"
                    name="confirmLegalAge"
                    checked={creditCardDetails.confirmLegalAge}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                  <label>
                    I confirm that I am of the legal age and agree to the PayPal Privacy Statement
                  </label>
                </div>
                <button type="submit" className="credit-card-submit-btn">
                  Pay LKR {total.toFixed(2)}
                </button>
              </form>
            )}
            <p className="checkout-paypal-info">Powered by PayPal</p>
          </div>

          <div className="checkout-details">
            <div className="checkout-shipping">
              <h2>Shipping Address</h2>
              <div className="checkout-shipping-details">
                <p><span className="checkout-icon location-icon">📍</span> Address: {shippingDetails.address}</p>
                <p><span className="checkout-icon">🏛️</span> Province: {shippingDetails.province}</p>
                <p><span className="checkout-icon">📮</span> ZIP Code: {shippingDetails.zipCode}</p>
                <p><span className="checkout-icon">📞</span> Mobile Number: {shippingDetails.mobileNumber}</p>
              </div>
            </div>

            <div className="checkout-cart">
              <h2>Cart Items</h2>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  const price = parseFloat(item.price.replace('LKR ', '')) || 0;
                  const quantity = item.quantity || 1;
                  const itemTotal = price * quantity;
                  return (
                    <div className="checkout-cart-item" key={index}>
                      <p>{item.name}</p>
                      <p>Quantity: {quantity}</p>
                      <p>LKR {itemTotal.toFixed(2)}</p>
                    </div>
                  );
                })
              ) : (
                <p>No items in cart.</p>
              )}
              <div className="checkout-total">
                <h3>Total:</h3>
                <p>LKR {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {showOrderSuccessPopup && (
          <div className="order-success-popup">
            <div className="order-success-content">
              <h2>Order Successful!</h2>
              <p>Your payment was successful, and the order has been saved.</p>
              <button className="order-success-ok-btn" onClick={handlePopupClose}>
                OK
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="checkout-footer">
        <div className="checkout-footer-columns">
          <div className="checkout-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="checkout-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="checkout-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="checkout-footer-column">
            <h5>Follow Us</h5>
            <div className="checkout-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="checkout-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CheckoutPage;*/

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/CheckoutPage.css';
import logo from '../assets/logo.png';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: initialCartItems = [], shippingDetails: initialShippingDetails } = location.state || {};

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [shippingDetails, setShippingDetails] = useState(initialShippingDetails || {
    address: 'test address for user test',
    province: 'colombo',
    zipCode: '10001350',
    mobileNumber: '0771234567',
  });
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showOrderSuccessPopup, setShowOrderSuccessPopup] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expires: '',
    csc: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: 'Sri Lanka',
    postalCode: '',
    mobile: '',
    shipToBilling: false,
    confirmLegalAge: false,
  });

  const countries = [
    { name: 'Sri Lanka', flag: '🇱🇰' },
  ];

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('LKR ', '') || 0);
      return sum + price * (item.quantity || 1);
    }, 0);
  };

  const total = calculateTotal();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (storedCartItems.length > 0 && cartItems.length === 0) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCardPayment = () => {
    setShowCreditCardForm(true);
  };

  const handleCreditCardInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreditCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreditCardSubmit = (e) => {
    e.preventDefault();
    if (!creditCardDetails.confirmLegalAge) {
      alert('Please confirm that you are of legal age and agree to the PayPal Privacy Statement.');
      return;
    }

    const order = {
      id: Date.now(),
      products: cartItems.map(item => ({
        productName: item.name,
        quantity: item.quantity || 1,
        image: item.image || '',
      })),
      total: `LKR ${total.toFixed(2)}`,
      orderDate: new Date().toLocaleString(),
      paymentMethod: 'Credit Card',
      status: 'Shipped',
      shippingDetails,
    };

    const existingOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    existingOrders.push(order);
    localStorage.setItem('customerOrders', JSON.stringify(existingOrders));

    setCartItems([]);
    localStorage.setItem('cartItems', JSON.stringify([]));

    setShowOrderSuccessPopup(true);
  };

  const handlePopupClose = () => {
    setShowOrderSuccessPopup(false);
    setShowSuccessNotification(true);
  };

  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false);
        navigate('/customer-home');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessNotification, navigate]);

  return (
    <div className="checkout-page">
      {showSuccessNotification && (
        <div className="success-notification">
          <span className="success-icon">✔</span>
          <span>Order saved successfully!</span>
        </div>
      )}

      <header className="checkout-header">
        <div className="checkout-logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="checkout-nav-links">
          <Link to="/customer-home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/customer-orders">Orders</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="checkout-header-icons">
          <button className="checkout-cart-btn" onClick={() => navigate('/cart')}>
            <span className="checkout-cart-icon">🛒</span>
            <span className="checkout-cart-label">Cart</span>
            {cartItems.length > 0 && (
              <span className="checkout-cart-count">{cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}</span>
            )}
          </button>
        </div>
      </header>

      <main className="checkout-main">
        <h1>Checkout Page</h1>
        <div className="checkout-content">
          <div className="checkout-payment">
            <h2>
              <span className="checkout-cart-icon">🛒</span> Pay with PayPal
            </h2>
            <div className="checkout-paypal-bar">
              PayPal
            </div>
            <button className="checkout-card-btn" onClick={handleCardPayment}>
              Debit or Credit Card
            </button>
            {showCreditCardForm && (
              <form className="credit-card-form" onSubmit={handleCreditCardSubmit}>
                <div className="credit-card-form-group">
                  <label>Card number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={creditCardDetails.cardNumber}
                    onChange={handleCreditCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="credit-card-form-row">
                  <div className="credit-card-form-group">
                    <label>Expires</label>
                    <input
                      type="text"
                      name="expires"
                      value={creditCardDetails.expires}
                      onChange={handleCreditCardInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="credit-card-form-group">
                    <label>CSC</label>
                    <input
                      type="text"
                      name="csc"
                      value={creditCardDetails.csc}
                      onChange={handleCreditCardInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <h3>Billing address</h3>
                <div className="credit-card-form-row">
                  <div className="credit-card-form-group">
                    <label>First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={creditCardDetails.firstName}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                  <div className="credit-card-form-group">
                    <label>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={creditCardDetails.lastName}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="credit-card-form-group">
                  <label>Address line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={creditCardDetails.addressLine1}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className="credit-card-form-group">
                  <label>Address line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={creditCardDetails.addressLine2}
                    onChange={handleCreditCardInputChange}
                  />
                </div>
                <div className="credit-card-form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={creditCardDetails.city}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className="credit-card-form-row">
                  <div className="credit-card-form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={creditCardDetails.country}
                      onChange={handleCreditCardInputChange}
                      required
                    >
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="credit-card-form-group">
                    <label>Postal code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={creditCardDetails.postalCode}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="credit-card-form-group">
                  <label>Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={creditCardDetails.mobile}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className="credit-card-form-checkbox">
                  <input
                    type="checkbox"
                    name="shipToBilling"
                    checked={creditCardDetails.shipToBilling}
                    onChange={handleCreditCardInputChange}
                  />
                  <label>Ship to billing address</label>
                </div>
                <div className="credit-card-form-checkbox">
                  <input
                    type="checkbox"
                    name="confirmLegalAge"
                    checked={creditCardDetails.confirmLegalAge}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                  <label>
                    I confirm that I am of legal age and agree to the PayPal Privacy Statement
                  </label>
                </div>
                <button type="submit" className="credit-card-submit-btn">
                  Pay LKR {total.toFixed(2)}
                </button>
              </form>
            )}
            <p className="checkout-paypal-info">Powered by PayPal</p>
          </div>

          <div className="checkout-details">
            <div className="checkout-shipping">
              <h2>Shipping Address</h2>
              <div className="checkout-shipping-details">
                <p><span className="checkout-icon location-icon">📍</span> Address: {shippingDetails.address}</p>
                <p><span className="checkout-icon">🏛️</span> Province: {shippingDetails.province}</p>
                <p><span className="checkout-icon">📮</span> ZIP Code: {shippingDetails.zipCode}</p>
                <p><span className="checkout-icon">📞</span> Mobile Number: {shippingDetails.mobileNumber}</p>
              </div>
            </div>

            <div className="checkout-cart">
              <h2>Cart Items</h2>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('LKR ', '') || 0);
                  const quantity = item.quantity || 1;
                  const itemTotal = price * quantity;
                  return (
                    <div className="checkout-cart-item" key={index}>
                      <p>{item.name}</p>
                      <p>Quantity: {quantity}</p>
                      <p>LKR {itemTotal.toFixed(2)}</p>
                    </div>
                  );
                })
              ) : (
                <p>No items in cart.</p>
              )}
              <div className="checkout-total">
                <h3>Total:</h3>
                <p>LKR {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {showOrderSuccessPopup && (
          <div className="order-success-popup">
            <div className="order-success-content">
              <h2>Order Successful!</h2>
              <p>Your payment was successful, and the order has been saved.</p>
              <button className="order-success-ok-btn" onClick={handlePopupClose}>
                OK
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="checkout-footer">
        <div className="checkout-footer-columns">
          <div className="checkout-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="checkout-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/customer-home">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/customer-orders">Orders</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          <div className="checkout-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="checkout-footer-column">
            <h5>Follow Us</h5>
            <div className="checkout-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="checkout-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CheckoutPage;