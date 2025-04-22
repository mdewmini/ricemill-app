import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { Link } from 'react-scroll';
import logo from '../assets/logo.png';

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
      <div className="logo_header">
      <img src={logo} alt="RiceMillPro Logo" />
      </div>
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

