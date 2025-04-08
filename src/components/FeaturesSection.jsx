import React from 'react';
import '../styles/FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2>Powerful Features for Your Rice Mill</h2>
      <p>Everything you need to manage your rice mill efficiently.</p>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🏭</div>
          <h3>Inventory Management</h3>
          <p>Track your rice inventory in real-time with our advanced system. Optimize stock levels and get alerts for low stock.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛒</div>
          <h3>Order Placement</h3>
          <p>Streamline your order process with our intuitive system. Confirm orders efficiently and manage customer requests.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Demand Forecasting</h3>
          <p>Make data-driven decisions with our advanced analytics and forecasting tools. Stay ahead of market demands.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;