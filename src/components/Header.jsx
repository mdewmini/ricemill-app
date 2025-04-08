/*import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <div className="header-actions">
        <select className="language-selector">
          <option value="en">English</option>
          <option value="en">Sinhala</option>
          <option value="en">Tamil</option>
        </select>
        <button className="sign-in-btn">Sign In</button>
      </div>
    </header>
  );
};

export default Header;*/

/*import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-scroll'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <nav className="nav-links">
        <Link to="hero" smooth={true} duration={500} offset={-70} activeClass="active">
          Home
        </Link>
        <Link to="features" smooth={true} duration={500} offset={-70} activeClass="active">
          Features
        </Link>
        <Link to="testimonials" smooth={true} duration={500} offset={-70} activeClass="active">
          About
        </Link>
        <Link to="contact" smooth={true} duration={500} offset={-70} activeClass="active">
          Contact
        </Link>
      </nav>
      <div className="header-actions">
        <select className="language-selector">
          <option value="en">English</option>
          <option value="en">Sinhala</option>
          <option value="en">Tamil</option>
        </select>
          <button className="sign-in-btn">Sign In</button>
      </div>
    </header>
  );
}
export default Header;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { Link } from 'react-scroll';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">LOGO</div>
      <nav className="nav-links">
        <Link to="hero" smooth={true} duration={500} offset={-70} spy={true} activeClass="active">
          Home
        </Link>
        <Link to="features" smooth={true} duration={500} offset={-70} spy={true} activeClass="active">
          Features
        </Link>
        <Link to="about" smooth={true} duration={500} offset={-70} spy={true} activeClass="active">
          About
        </Link>
        <Link to="contact" smooth={true} duration={500} offset={-70} spy={true} activeClass="active">
          Contact
        </Link>
      </nav>
      <div className="header-actions">
        <select className="language-selector">
          <option value="en">English</option>
          <option value="si">Sinhala</option>
          <option value="ta">Tamil</option>
        </select>
        <button className="sign-in-btn" onClick={handleSignInClick}>
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;

