import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaSyncAlt, FaBell, FaUser, FaDownload, FaChartLine, FaChartBar, FaChartPie, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DemandForecastingPage.css';
import logo from '../assets/logo.png';


ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DemandForecastingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

 
  if (!user || user.role !== 'mill_owner') {
    navigate('/dashboard');
    return null;
  }

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Forecast updated for Q3', date: '2025-01-20', read: false },
    { id: 2, message: 'New market data available', date: '2025-01-19', read: false },
  ]);
  const [timeRange, setTimeRange] = useState('6M');
  const [marketGrowth, setMarketGrowth] = useState(0);
  const [forecastData, setForecastData] = useState([null, null, null, null, 110, 120, 200, 220, 250]);

 
  useEffect(() => {
    let baseForecast = [150, 140, 160, 130, 110, 120, 200, 220, 250];
    if (timeRange === '1M') {
      baseForecast = [220, 250];
    } else if (timeRange === '3M') {
      baseForecast = [200, 220, 250];
    }
    setForecastData(baseForecast);
  }, [timeRange]);

  const getChartData = () => {
    let labels, historicalData;
    if (timeRange === '1M') {
      labels = ['Aug', 'Sep'];
      historicalData = [220, null];
    } else if (timeRange === '3M') {
      labels = ['Jul', 'Aug', 'Sep'];
      historicalData = [200, 220, null];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
      historicalData = [150, 140, 160, 130, 110, 120, null, null, null];
    }

    return {
      labels,
      datasets: [
        {
          label: 'Historical',
          data: historicalData,
          borderColor: '#1e90ff',
          borderWidth: 2,
          fill: false,
          tension: 0.3,
        },
        {
          label: 'Forecast',
          data: forecastData,
          borderColor: '#1e90ff',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          tension: 0.3,
        },
        {
          label: 'Confidence Interval',
          data: forecastData.map(value => (value ? value * 0.9 : null)), 
          borderColor: 'rgba(30, 144, 255, 0.1)',
          backgroundColor: 'rgba(30, 144, 255, 0.1)',
          borderWidth: 0,
          fill: true,
          tension: 0.3,
        },
      ],
    };
  };

  const handleExport = () => {
    const csvContent = [
      ['Month', 'Historical', 'Forecast'],
      ...getChartData().labels.map((label, index) => [
        label,
        getChartData().datasets[0].data[index] || '',
        getChartData().datasets[1].data[index] || '',
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'forecast_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateForecast = () => {
    const updatedForecast = forecastData.map(value => {
      if (value) {
        return value * (1 + marketGrowth / 100);
      }
      return value;
    });
    setForecastData(updatedForecast);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Forecast updated with new market growth',
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
    alert('Forecast updated based on market growth!');
  };

  const handleSyncData = () => {
    console.log('Syncing data...');
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Forecast data synced successfully',
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
    alert('Data synced successfully!');
  };

  const handleNotificationClick = () => {
    if (!showNotifications) {
      const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updatedNotifications);
    }
    setShowNotifications(!showNotifications);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="demand-forecasting-page">
      
      <header className="forecasting-header">
        <div className="header-top">
          <div className="header-left">
            <div className="logo_demand">
            <img src={logo} alt="RiceMillPro Logo" />
            </div>
            <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
          <div className="header-actions">
            <div className="header-top-item">
              <button className="sync-btn" onClick={handleSyncData}>
                <FaSyncAlt className="header-icon" /> Sync Data
              </button>
            </div>
            <div className="header-top-item">
              <select className="language-selector">
                <option value="en">English</option>
                <option value="si">Sinhala</option>
                <option value="ta">Tamil</option>
              </select>
            </div>
            <div className="header-top-item">
              <div className="notification" onClick={handleNotificationClick}>
                <FaBell className="header-icon" />
                {unreadNotificationsCount > 0 && (
                  <span className="badge">{unreadNotificationsCount}</span>
                )}
              </div>
              {showNotifications && (
                <div className="notification-dropdown">
                  <h4>Notifications</h4>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="notification-item">
                        <p>{notification.message}</p>
                        <span>{notification.date}</span>
                      </div>
                    ))
                  ) : (
                    <p>No notifications</p>
                  )}
                </div>
              )}
            </div>
            <div className="header-top-item">
              <div className="user-profile">
                <img src="src/assets/ kumariImage.jpg" alt="User" />
              </div>
            </div>
          </div>
        </div>
        <h1>Demand Forecasting</h1>
      </header>

     
      <div className="forecasting-cards">
        <div className="card">
          <div className="card-icon"><FaChartLine /></div>
          <div className="card-content">
            <h3>Forecast Accuracy</h3>
            <p>94.5%</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon"><FaChartBar /></div>
          <div className="card-content">
            <h3>Peak Demand</h3>
            <p>15,245</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon"><FaChartPie /></div>
          <div className="card-content">
            <h3>YoY Growth</h3>
            <p>23.4%</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon"><FaCheckCircle /></div>
          <div className="card-content">
            <h3>Confidence Score</h3>
            <p>87.2%</p>
          </div>
        </div>
      </div>

      <div className="forecast-content">
        <div className="forecast-chart">
          <div className="chart-header">
            <h3>Forecast Chart</h3>
            <div className="chart-controls">
              <button onClick={() => setTimeRange('1M')} className={timeRange === '1M' ? 'active' : ''}>1M</button>
              <button onClick={() => setTimeRange('3M')} className={timeRange === '3M' ? 'active' : ''}>3M</button>
              <button onClick={() => setTimeRange('6M')} className={timeRange === '6M' ? 'active' : ''}>6M</button>
            </div>
          </div>
          <div className="chart-container">
            <Line
              data={getChartData()}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      boxWidth: 12,
                      padding: 20,
                      font: { size: 14 },
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: {
                    grid: { color: '#e0e0e0' },
                    min: 0,
                    max: 300,
                    ticks: { stepSize: 50 },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="scenario-planning">
          <h3>Scenario Planning</h3>
          <div className="scenario-item">
            <h4>Market Growth</h4>
            <div className="slider">
              <span>-50%</span>
              <input
                type="range"
                min="-50"
                max="50"
                value={marketGrowth}
                onChange={(e) => setMarketGrowth(e.target.value)}
              />
              <span>+50%</span>
            </div>
            <p>Current: {marketGrowth}%</p>
          </div>
          <div className="scenario-item">
            <h4>Seasonal Factors</h4>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Holiday Season Impact
              </label>
              <label>
                <input type="checkbox" /> Weather Patterns
              </label>
              <label>
                <input type="checkbox" /> Special Events
              </label>
              <label>
                <input type="checkbox" /> Market Conditions
              </label>
            </div>
          </div>
          <div className="scenario-item">
            <h4>Market Conditions</h4>
            <select>
              <option>Stable Growth</option>
              <option>High Volatility</option>
              <option>Decline</option>
            </select>
          </div>
          <button className="update-forecast-btn" onClick={handleUpdateForecast}>
            Update Forecast
          </button>
        </div>
      </div>

    
      <div className="forecast-insights">
        <div className="insights-section">
          <h3>Insights & Recommendations</h3>
          <div className="insights-content">
            <h4>Key Insights</h4>
            <ul>
              <li>Demand expected to increase by 15% in next quarter</li>
              <li>Seasonal peak anticipated in coming months</li>
              <li>Strong correlation with market indicators</li>
            </ul>
          </div>
        </div>
        <div className="actions-section">
          <h3>Actions Required</h3>
          <div className="actions-content">
            <ul>
              <li>Increase inventory by 10% by Q3</li>
              <li>Optimize supply chain for peak season</li>
            </ul>
          </div>
        </div>
        <div className="risks-section">
          <h3>Risk Factors</h3>
          <div className="risks-content">
            <ul>
              <li>Market volatility may impact accuracy</li>
              <li>Supply chain constraints possible</li>
              <li>New competitor entry in Q4</li>
            </ul>
          </div>
        </div>
      </div>

     
      <div className="export-section">
        <button className="export-btn" onClick={handleExport}>
          <FaDownload /> Export
        </button>
      </div>
    </div>
  );
};

export default DemandForecastingPage;







