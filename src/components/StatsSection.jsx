import React from 'react';
import '../styles/StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-content">
        <div className="map-container">
          <img src="src/assets/map.jpg" alt="Map of Sri Lanka" />
        </div>
        <div className="stats-grid">
          <h2>Our Growing Network</h2>
          <div className="stats-items ">
            <h3>150+</h3>
            <p>Active Mills</p>
          </div>
          <div className="stats-items">
            <h3>25K+</h3>
            <p>Orders Processed</p>
          </div>
          <div className="stats-items">
            <h3>98%</h3>
            <p>Customer Satisfaction</p>
          </div>
          <div className="stats-items">
            <h3>9</h3>
            <p>Provinces Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;