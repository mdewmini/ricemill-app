import React from 'react';
import '../styles/TestimonialsSection.css';


const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2>Trusted by Rice Mills Across Sri Lanka</h2>
      <p>See what our customers are saying about us</p>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <img src="src/assets/ranjithImage.jpg" alt="Rajith Fernando" />
          <h3>Rajith Fernando</h3>
          <p className="role">Owner, Gampaha Mills</p>
          <p className="quote">
            "This system has transformed how we manage our inventory. The inventory tracking alone has saved us countless hours and improved our efficiency."
          </p>
        </div>
        <div className="testimonial-card">
          <img src="src/assets/ kumariImage.jpg" alt="Kumari Perera" />
          <h3>Kumari Perera</h3>
          <p className="role">Manager, Colombo Rice Suppliers</p>
          <p className="quote">
            "The demand forecasting feature has helped us make better purchasing decisions. We’ve seen a significant reduction in waste and improved profits."
          </p>
        </div>
        <div className="testimonial-card">
          <img src="src/assets/anuraImage.jpg" alt="Anura Bandara" />
          <h3>Anura Bandara</h3>
          <p className="role">Director, Kandy Rice Corporation</p>
          <p className="quote">
            "Customer service is excellent, and the system is easy to use. It helps us modernize our operations while maintaining our traditional values."
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;