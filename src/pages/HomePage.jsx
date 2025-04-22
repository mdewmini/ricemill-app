import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="about">
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;




