/*import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>From Field to Future: Empowering Sri Lanka’s Rice Legacy</h1>
        <p>
          Streamline inventory, forecast demand, and build stronger customer relationships—designed specifically for Sri Lankan rice mill owners.
        </p>
        <div className="hero-buttons">
          <button className="get-started-btn">Get Started</button>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>From Field to Future: Empowering Sri Lanka’s Rice Legacy</h1>
        <p>
          Streamline inventory, forecast demand, and build stronger customer relationships—designed specifically for Sri Lankan rice mill owners.
        </p>
        <div className="hero-buttons">
          <button className="get-started-btn" onClick={handleGetStartedClick}>
            Get Started
          </button>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;



