import React, { useState } from 'react';
import '../styles/Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  const [activeLink, setActiveLink] = useState(''); 

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setActiveLink(targetId); 
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (targetId === 'testimonials') {
      setTimeout(() => {
        const statsElement = document.getElementById('stats');
        if (statsElement) {
          statsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo_footer">
            <img src={logo} alt="RiceMillPro Logo" />
          </div>
          <p>Empowering Sri Lanka's Rice Legacy with Smart Solutions.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a
                href="#hero"
                className={activeLink === 'hero' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'hero')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className={activeLink === 'features' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'features')}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className={activeLink === 'testimonials' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'testimonials')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeLink === 'contact' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +94 123 456 789</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <img src="src/assets/facebook.png" alt="Facebook" />
            <img src="src/assets/twitter.png" alt="Twitter" />
            <img src="src/assets/instagram.png" alt="Instagram" />
            <img src="src/assets/linkedin.png" alt="Linkedin" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Rice Mill Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


