import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'; 
import '../styles/CustomerProfilePage.css';
import logo from '../assets/logo.png';

const CustomerProfilePage = () => {
  const navigate = useNavigate();

  
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@ricemill.lk',
    phone: '+94 771 234 567',
    address: '123, Colombo Road, Colombo, Sri Lanka',
    profilePicture: "src/assets/profile1.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [orders, setOrders] = useState([]);

  
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (storedOrders.length > 0) {
      setOrders(storedOrders.slice(-2));
    } else {
      setOrders([
        {
          orderId: '1744544309480',
          totalAmount: 7500.00,
          orderDate: '13/04/2025, 17:08:29',
          products: [
            { name: 'Supiri Keeri Samba', quantity: 1 },
            { name: 'Nadu Rice', quantity: 1 },
          ],
        },
        {
          orderId: '1744544545265',
          totalAmount: 6500.00,
          orderDate: '13/04/2025, 17:12:25',
          products: [
            { name: 'Red Raw Rice', quantity: 1 },
            { name: 'White Rice', quantity: 1 },
          ],
        },
      ]);
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({ ...user });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...formData });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleViewAllOrders = () => {
    navigate('/customer-orders');
  };

  return (
    <div className="cust-profile-page">
   
      <header className="cust-profile-header">
        <div className="cust-profile-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="cust-profile-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
      </header>

      
      <main className="cust-profile-main">
        <h1>My Profile</h1>
        <div className="cust-profile-container">
          <div className="cust-profile-left">
            <div className="cust-profile-avatar">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="cust-profile-picture"
                />
              ) : (
                <span>{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</span>
              )}
            </div>
            <div className="cust-profile-details">
              <p><strong>{`${user.firstName} ${user.lastName}`}</strong></p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mobile:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <div className="cust-profile-edit-btn-container">
                <button
                  className="cust-profile-edit-btn"
                  onClick={handleEditToggle}
                >
                  <FaEdit className="cust-profile-edit-icon" /> Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="cust-profile-right">
            <h3>Recent Orders</h3>
            {orders.map((order, index) => (
              <div key={index} className="cust-profile-order-card">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Total:</strong> LKR {order.totalAmount.toFixed(2)}</p>
                <p><strong>Date:</strong> {order.orderDate}</p>
                <p>
                  {order.products.map((product, idx) => (
                    <span key={idx}>
                      {product.name} ({product.quantity})
                      {idx < order.products.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            ))}
            <button
              className="cust-profile-view-all-btn"
              onClick={handleViewAllOrders}
            >
              View All Orders
            </button>
          </div>
        </div>
      </main>

     
      {isEditing && (
        <div className="cust-profile-modal-overlay">
          <div className="cust-profile-modal">
            <h2>Edit Profile</h2>
            <form className="cust-profile-form" onSubmit={handleSubmit}>
              <div className="cust-profile-form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="cust-profile-form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="cust-profile-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="cust-profile-form-group">
                <label>Mobile:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="cust-profile-form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="cust-profile-form-group">
                <label>Profile Picture:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                {formData.profilePicture && (
                  <div className="cust-profile-picture-preview">
                    <img
                      src={formData.profilePicture}
                      alt="Preview"
                      className="cust-profile-picture"
                    />
                  </div>
                )}
              </div>
              <div className="cust-profile-form-actions">
                <button type="submit" className="cust-profile-save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cust-profile-cancel-btn"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      <footer className="cust-profile-footer">
        <div className="cust-profile-footer-columns">
          <div className="cust-profile-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="cust-profile-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="cust-profile-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="cust-profile-footer-column">
            <h5>Follow Us</h5>
            <div className="cust-profile-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="cust-profile-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CustomerProfilePage;