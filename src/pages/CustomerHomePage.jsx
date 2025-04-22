import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomerHomePage.css';
import logo from '../assets/logo.png';


const productImages = {
  keeriSamba: 'src/assets/Supiri Keeri Samba.jpg',
  sambaRice: 'src/assets/Supiri Samba Rice.jpg',
  naduRice: 'src/assets/Supiri Nadu Rice.jpg',
  redNadu: 'src/assets/Supiri Red Nadu Rice.jpg',
  whiteRaw: 'src/assets/Supiri White Raw Rice.jpg',
  sambaRaw: 'src/assets/Supiri Samba Raw Rice.jpg',
  redRaw: 'src/assets/Supiri Red Raw Rice.jpg',
};

const CustomerHomePage = () => {
  const navigate = useNavigate();

  
  const productSets = [
    [
      { name: 'Supiri Keeri Samba', image: productImages.keeriSamba },
      { name: 'Supiri Samba Rice', image: productImages.sambaRice },
      { name: 'Supiri Nadu Rice', image: productImages.naduRice },
    ],
    [
      { name: 'Supiri Red Nadu Rice', image: productImages.redNadu },
      { name: 'Supiri White Raw Rice', image: productImages.whiteRaw },
      { name: 'Supiri Samba Raw Rice', image: productImages.sambaRaw },
    ],
    [
      { name: 'Supiri Red Raw Rice', image: productImages.redRaw },
      { name: 'Supiri Samba Rice', image: productImages.sambaRice },
      { name: 'Supiri White Raw Rice', image: productImages.whiteRaw },
    ],
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false); 

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prevSet) => (prevSet + 1) % productSets.length);
    }, 5000); 
    return () => clearInterval(interval); 
  }, [productSets.length]);

  const handlePrevSet = () => {
    setCurrentSet((prevSet) => (prevSet - 1 + productSets.length) % productSets.length);
  };

  const handleNextSet = () => {
    setCurrentSet((prevSet) => (prevSet + 1) % productSets.length);
  };

  const handleDotClick = (index) => {
    setCurrentSet(index);
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleViewDetails = () => {
    setShowOfferModal(true); 
  };

  const handleCloseModal = () => {
    setShowOfferModal(false); 
  };

  const handleMoreProducts = () => {
    navigate('/products');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="cust-home-page">
  
      <header className="cust-home-header">
        <div className="cust-home-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="cust-home-nav-links">
          <a href="/customer-home">Home</a>
          <a href="/products">Products</a>
          <a href="/customer-orders">Orders</a>
          <a href="/profile">Profile</a>
        </nav>
        <div className="cust-home-header-icons">
          <button className="cust-home-cart-btn" onClick={handleCartClick}>
            <span className="cust-home-cart-icon">🛒</span>
            <span className="cust-home-cart-label">Cart</span>
          </button>
        </div>
      </header>


      <section className="cust-home-hero-section">
        <div className="cust-home-hero-content">
          <h1>PREMIUM RICE</h1>
          <p>Experience the finest quality rice, perfect for every meal</p>
          <button className="cust-home-shop-now-btn" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </section>

  
      <section className="cust-home-special-offer">
        <h2>SPECIAL OFFER!</h2>
        <p>Get 10% off on bulk orders above 50kg</p>
        <button className="cust-home-view-details-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </section>

   
      {showOfferModal && (
        <div className="cust-home-offer-modal-overlay">
          <div className="cust-home-offer-modal">
            <p>Special Offer Details: Get 10% off on bulk orders above 50kg.</p>
            <button className="cust-home-offer-modal-close-btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}


      <section className="cust-home-featured-products">
        <h3>Our Products</h3>
        <div className="cust-home-product-carousel">
          <button className="cust-home-carousel-arrow cust-home-arrow-left" onClick={handlePrevSet}>
            {'<'}
          </button>
          <div className="cust-home-product-grid">
            {productSets[currentSet].map((product, index) => (
              <div className="cust-home-product-card" key={index}>
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
              </div>
            ))}
          </div>
          <button className="cust-home-carousel-arrow cust-home-arrow-right" onClick={handleNextSet}>
            {'>'}
          </button>
        </div>
        <div className="cust-home-carousel-dots">
          {productSets.map((_, index) => (
            <span
              key={index}
              className={`cust-home-dot ${currentSet === index ? 'cust-home-dot-active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        <div className="cust-home-more-products">
          <button className="cust-home-more-products-btn" onClick={handleMoreProducts}>
            MORE PRODUCTS
          </button>
        </div>
      </section>

   
      <footer className="cust-home-footer">
        <div className="cust-home-footer-columns">
          <div className="cust-home-footer-column">
            <h5>About Us</h5>
            <p>Premium quality rice for your culinary needs.</p>
          </div>
          <div className="cust-home-footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/customer-home">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/customer-orders">Orders</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>
          <div className="cust-home-footer-column">
            <h5>Contact</h5>
            <p>Email: info@ricemill.lk</p>
            <p>Phone: +94 112 345 678</p>
          </div>
          <div className="cust-home-footer-column">
            <h5>Follow Us</h5>
            <div className="cust-home-social-icons">
              <img src="src/assets/facebook.png" alt="Facebook" />
              <img src="src/assets/twitter.png" alt="Twitter" />
              <img src="src/assets/instagram.png" alt="Instagram" />
              <img src="src/assets/linkedin.png" alt="Linkedin" />
            </div>
          </div>
        </div>
        <p className="cust-home-copyright">
          © 2025 RiceMill Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default CustomerHomePage;