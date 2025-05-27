/*import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaBoxOpen, FaChartBar, FaUsers, FaShoppingCart, FaTachometerAlt, FaCog, FaQuestionCircle, FaSyncAlt, FaBell, FaUser, FaWarehouse, FaDollarSign, FaClipboardList, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';
import logo from '../assets/logo.png';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const navigate = useNavigate();

 
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received from Maheesa Thambawita', date: '2025-01-20', read: false },
    { id: 2, message: 'Pending order #12344 needs attention', date: '2025-01-19', read: false },
  ]);

  const salesTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 600, 900, 1200, 1500, 1200, 900],
        fill: true,
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderColor: '#2e7d32',
        tension: 0.3,
      },
    ],
  };

  const customerSegmentsData = {
    labels: ['Retail', 'Wholesale', 'Distributors', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#1E90FF', '#32CD32', '#FFD700', '#FF4500'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const recentOrders = [
    { id: '#12345', customer: 'Maheesha Thambawita', status: 'Delivered', amount: 'LKR 3200.00' },
    { id: '#12344', customer: 'Maheesha Thambawita', status: 'Processing', amount: 'LKR 1500.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
  ];

  const handleViewAll = () => {
    navigate('/orders');
  };

  const handleInventoryClick = () => {
    navigate('/inventory');
  };

  const handleSyncData = () => {
    console.log('Syncing data...');
   
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Data synced successfully',
        date: new Date().toLocaleDateString(),
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
    <div className="dashboard-page">
      
      <div className="sidebar">
        <div className="logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FaTachometerAlt className="icon" /> Dashboard
          </button>
          <button className="nav-item" onClick={handleInventoryClick}>
            <FaBoxOpen className="icon" /> Inventory
          </button>
          <button className="nav-item" onClick={() => navigate('/forecasting')}>
            <FaChartLine className="icon" /> Forecasting
          </button>
          <button className="nav-item" onClick={() => navigate('/customers')}>
            <FaUsers className="icon" /> Customers
          </button>
          <button className="nav-item" onClick={() => navigate('/new-orders')}>
            <FaShoppingCart className="icon" /> Orders
          </button>
          <button className="nav-item" onClick={() => navigate('/analytics')}>
            <FaChartBar className="icon" /> Analytics
          </button>
          <button className="nav-item" onClick={() => navigate('/settings')}>
            <FaCog className="icon" /> Settings
          </button>
          <button className="nav-item" onClick={() => navigate('/help')}>
            <FaQuestionCircle className="icon" /> Help
          </button>
        </nav>
      </div>

      <div className="main-content">
       
        <header className="dashboard-header">
          <div className="header-top">
            <h1>Welcome to your Dashboard</h1>
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
              <div>
                <div className="user-profile">
                  <img src="src/assets/ kumariImage.jpg" alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

       
        <div className="dashboard-cards">
          <div className="card">
            <div className="card-icon">
              <FaWarehouse />
            </div>
            <div className="card-content">
              <h3>Total Stock</h3>
              <p>800 Kg</p>
              <span className="trend up">↑ 12%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaDollarSign />
            </div>
            <div className="card-content">
              <h3>Daily Sales</h3>
              <p>LKR 60,500</p>
              <span className="trend up">↑ 8.2%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <div className="card-content">
              <h3>Pending Orders</h3>
              <p>23</p>
              <span className="trend down">↑ 5.4%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaTruck />
            </div>
            <div className="card-content">
              <h3>Deliveries Today</h3>
              <p>15</p>
              <span className="status">On Track</span>
            </div>
          </div>
        </div>

      
        <div className="charts">
          <div className="chart sales-trend">
            <h3>Sales Trend</h3>
            <Line
              data={salesTrendData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#e0e0e0' } },
                },
              }}
            />
          </div>
          <div className="chart customer-segments">
            <h3>Customer Segments</h3>
            <div className="pie-chart-container">
              <Pie
                data={customerSegmentsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: { size: 14 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

       
        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;*/





/*import React, { useState } from 'react';
   import { Line, Pie } from 'react-chartjs-2';
   import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
   import { FaChartLine, FaBoxOpen, FaChartBar, FaUsers, FaShoppingCart, FaTachometerAlt, FaCog, FaQuestionCircle, FaSyncAlt, FaBell, FaUser, FaWarehouse, FaDollarSign, FaClipboardList, FaTruck } from 'react-icons/fa';
   import { useNavigate, useLocation } from 'react-router-dom';
   import { useAuth } from '../context/AuthContext';
   import '../styles/DashboardPage.css';
   import logo from '../assets/logo.png';

   ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

   const DashboardPage = () => {
       const { user: contextUser } = useAuth();
       const location = useLocation();
       const navigate = useNavigate();

       // Use user from location.state if available, otherwise fallback to context user
       const user = location.state?.user || contextUser;

       const [showNotifications, setShowNotifications] = useState(false);
       const [notifications, setNotifications] = useState([
           { id: 1, message: 'New order received from Maheesa Thambawita', date: '2025-01-20', read: false },
           { id: 2, message: 'Pending order #12344 needs attention', date: '2025-01-19', read: false },
       ]);

       const salesTrendData = {
           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
           datasets: [
               {
                   label: 'Sales',
                   data: [300, 600, 900, 1200, 1500, 1200, 900],
                   fill: true,
                   backgroundColor: 'rgba(46, 125, 50, 0.1)',
                   borderColor: '#2e7d32',
                   tension: 0.3,
               },
           ],
       };

       const customerSegmentsData = {
           labels: ['Retail', 'Wholesale', 'Distributors', 'Others'],
           datasets: [
               {
                   data: [40, 30, 20, 10],
                   backgroundColor: ['#1E90FF', '#32CD32', '#FFD700', '#FF4500'],
                   borderColor: '#fff',
                   borderWidth: 2,
               },
           ],
       };

       const recentOrders = [
           { id: '#12345', customer: 'Maheesha Thambawita', status: 'Delivered', amount: 'LKR 3200.00' },
           { id: '#12344', customer: 'Maheesha Thambawita', status: 'Processing', amount: 'LKR 1500.00' },
           { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
           { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
       ];

       const handleViewAll = () => {
           navigate('/orders', { state: { user } });
       };

       const handleInventoryClick = () => {
           navigate('/inventory', { state: { user } });
       };

       const handleSyncData = () => {
           console.log('Syncing data...');
           setNotifications([
               ...notifications,
               {
                   id: Date.now(),
                   message: 'Data synced successfully',
                   date: new Date().toLocaleDateString(),
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
           <div className="dashboard-page">
               
               <div className="sidebar">
                   <div className="logo">
                       <img src={logo} alt="RiceMillPro Logo" />
                   </div>
                   <nav className="sidebar-nav">
                       <button className="nav-item active">
                           <FaTachometerAlt className="icon" /> Dashboard
                       </button>
                       <button className="nav-item" onClick={handleInventoryClick}>
                           <FaBoxOpen className="icon" /> Inventory
                       </button>
                       <button className="nav-item" onClick={() => navigate('/forecasting', { state: { user } })}>
                           <FaChartLine className="icon" /> Forecasting
                       </button>
                       <button className="nav-item" onClick={() => navigate('/customers', { state: { user } })}>
                           <FaUsers className="icon" /> Customers
                       </button>
                       <button className="nav-item" onClick={() => navigate('/new-orders', { state: { user } })}>
                           <FaShoppingCart className="icon" /> Orders
                       </button>
                       <button className="nav-item" onClick={() => navigate('/analytics', { state: { user } })}>
                           <FaChartBar className="icon" /> Analytics
                       </button>
                       <button className="nav-item" onClick={() => navigate('/settings', { state: { user } })}>
                           <FaCog className="icon" /> Settings
                       </button>
                       <button className="nav-item" onClick={() => navigate('/help', { state: { user } })}>
                           <FaQuestionCircle className="icon" /> Help
                       </button>
                   </nav>
               </div>

               
               <div className="main-content">
                   <header className="dashboard-header">
                       <div className="header-top">
                           <h1>Welcome to your Dashboard</h1>
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
                               <div>
                                   <div className="user-profile">
                                   <img src="src/assets/ kumariImage.jpg" alt="User" />
                                   </div>
                               </div>
                           </div>
                       </div>
                   </header>

                   
                   <div className="dashboard-cards">
                       <div className="card">
                           <div className="card-icon">
                               <FaWarehouse />
                           </div>
                           <div className="card-content">
                               <h3>Total Stock</h3>
                               <p>800 Kg</p>
                               <span className="trend up">↑ 12%</span>
                           </div>
                       </div>
                       <div className="card">
                           <div className="card-icon">
                               <FaDollarSign />
                           </div>
                           <div className="card-content">
                               <h3>Daily Sales</h3>
                               <p>LKR 60,500</p>
                               <span className="trend up">↑ 8.2%</span>
                           </div>
                       </div>
                       <div className="card">
                           <div className="card-icon">
                               <FaClipboardList />
                           </div>
                           <div className="card-content">
                               <h3>Pending Orders</h3>
                               <p>23</p>
                               <span className="trend down">↑ 5.4%</span>
                           </div>
                       </div>
                       <div className="card">
                           <div className="card-icon">
                               <FaTruck />
                           </div>
                           <div className="card-content">
                               <h3>Deliveries Today</h3>
                               <p>15</p>
                               <span className="status">On Track</span>
                           </div>
                       </div>
                   </div>

                  
                   <div className="charts">
                       <div className="chart sales-trend">
                           <h3>Sales Trend</h3>
                           <Line
                               data={salesTrendData}
                               options={{
                                   maintainAspectRatio: false,
                                   plugins: {
                                       legend: { display: false },
                                   },
                                   scales: {
                                       x: { grid: { display: false } },
                                       y: { grid: { color: '#e0e0e0' } },
                                   },
                               }}
                           />
                       </div>
                       <div className="chart customer-segments">
                           <h3>Customer Segments</h3>
                           <div className="pie-chart-container">
                               <Pie
                                   data={customerSegmentsData}
                                   options={{
                                       maintainAspectRatio: false,
                                       plugins: {
                                           legend: {
                                               position: 'right',
                                               labels: {
                                                   boxWidth: 12,
                                                   padding: 20,
                                                   font: { size: 14 },
                                               },
                                           },
                                       },
                                   }}
                               />
                           </div>
                       </div>
                   </div>

                   
                   <div className="recent-orders">
                       <h3>Recent Orders</h3>
                       <table>
                           <thead>
                               <tr>
                                   <th>Order ID</th>
                                   <th>Customer</th>
                                   <th>Status</th>
                                   <th>Amount</th>
                               </tr>
                           </thead>
                           <tbody>
                               {recentOrders.map((order, index) => (
                                   <tr key={index}>
                                       <td>{order.id}</td>
                                       <td>{order.customer}</td>
                                       <td>
                                           <span className={`status ${order.status.toLowerCase()}`}>
                                               {order.status}
                                           </span>
                                       </td>
                                       <td>{order.amount}</td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                       <button className="view-all-btn" onClick={handleViewAll}>
                           View All
                       </button>
                   </div>
               </div>
           </div>
       );
   };

   export default DashboardPage;*/

   /*import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaBoxOpen, FaChartBar, FaUsers, FaShoppingCart, FaTachometerAlt, FaCog, FaQuestionCircle, FaSyncAlt, FaBell, FaUser, FaWarehouse, FaDollarSign, FaClipboardList, FaTruck } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DashboardPage.css';
import logo from '../assets/logo.png';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const { user: contextUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || contextUser;

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received from Maheesa Thambawita', date: '2025-01-20', read: false },
    { id: 2, message: 'Pending order #12344 needs attention', date: '2025-01-19', read: false },
  ]);
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts from backend
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/alerts');
        const data = await response.json();
        setAlerts(data.alerts || []);
        // Add alerts to notifications
        const alertNotifications = data.alerts.map((alert, index) => ({
          id: `alert-${index}`,
          message: alert,
          date: new Date().toLocaleDateString(),
          read: false,
        }));
        setNotifications((prev) => [...prev, ...alertNotifications]);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };
    fetchAlerts();
  }, []);

  const salesTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 600, 900, 1200, 1500, 1200, 900],
        fill: true,
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderColor: '#2e7d32',
        tension: 0.3,
      },
    ],
  };

  const customerSegmentsData = {
    labels: ['Retail', 'Wholesale', 'Distributors', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#1E90FF', '#32CD32', '#FFD700', '#FF4500'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const recentOrders = [
    { id: '#12345', customer: 'Maheesha Thambawita', status: 'Delivered', amount: 'LKR 3200.00' },
    { id: '#12344', customer: 'Maheesha Thambawita', status: 'Processing', amount: 'LKR 1500.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
  ];

  const handleViewAll = () => {
    navigate('/orders', { state: { user } });
  };

  const handleInventoryClick = () => {
    navigate('/inventory', { state: { user } });
  };

  const handleSyncData = () => {
    console.log('Syncing data...');
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Data synced successfully',
        date: new Date().toLocaleDateString(),
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
    <div className="dashboard-page">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FaTachometerAlt className="icon" /> Dashboard
          </button>
          <button className="nav-item" onClick={handleInventoryClick}>
            <FaBoxOpen className="icon" /> Inventory
          </button>
          <button className="nav-item" onClick={() => navigate('/forecasting', { state: { user } })}>
            <FaChartLine className="icon" /> Forecasting
          </button>
          <button className="nav-item" onClick={() => navigate('/customers', { state: { user } })}>
            <FaUsers className="icon" /> Customers
          </button>
          <button className="nav-item" onClick={() => navigate('/new-orders', { state: { user } })}>
            <FaShoppingCart className="icon" /> Orders
          </button>
          <button className="nav-item" onClick={() => navigate('/analytics', { state: { user } })}>
            <FaChartBar className="icon" /> Analytics
          </button>
          <button className="nav-item" onClick={() => navigate('/settings', { state: { user } })}>
            <FaCog className="icon" /> Settings
          </button>
          <button className="nav-item" onClick={() => navigate('/help', { state: { user } })}>
            <FaQuestionCircle className="icon" /> Help
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-top">
            <h1>Welcome to your Dashboard</h1>
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
              <div>
                <div className="user-profile">
                <img src="src/assets/ kumariImage.jpg" alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-icon">
              <FaWarehouse />
            </div>
            <div className="card-content">
              <h3>Total Stock</h3>
              <p>800 Kg</p>
              <span className="trend up">↑ 12%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaDollarSign />
            </div>
            <div className="card-content">
              <h3>Daily Sales</h3>
              <p>LKR 60,500</p>
              <span className="trend up">↑ 8.2%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <div className="card-content">
              <h3>Pending Orders</h3>
              <p>23</p>
              <span className="trend down">↑ 5.4%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaTruck />
            </div>
            <div className="card-content">
              <h3>Deliveries Today</h3>
              <p>15</p>
              <span className="status">On Track</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="chart sales-trend">
            <h3>Sales Trend</h3>
            <Line
              data={salesTrendData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#e0e0e0' } },
                },
              }}
            />
          </div>
          <div className="chart customer-segments">
            <h3>Customer Segments</h3>
            <div className="pie-chart-container">
              <Pie
                data={customerSegmentsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: { size: 14 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All
          </button>
        </div>

        <div className="alerts-section">
          <h3>Stock Alerts</h3>
          {alerts.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} style={{ color: 'red' }}>
                  {alert}
                </li>
              ))}
            </ul>
          ) : (
            <p>No alerts at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;*/


/*import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaBoxOpen, FaChartBar, FaUsers, FaShoppingCart, FaTachometerAlt, FaCog, FaQuestionCircle, FaSyncAlt, FaBell, FaUser, FaWarehouse, FaDollarSign, FaClipboardList, FaTruck, FaPlus } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DashboardPage.css';
import logo from '../assets/logo.png';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const { user: contextUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || contextUser;

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received from Maheesa Thambawita', date: '2025-01-20', read: false },
    { id: 2, message: 'Pending order #12344 needs attention', date: '2025-01-19', read: false },
  ]);
  const [alerts, setAlerts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' }); // Removed imageUrl
  const [products, setProducts] = useState([]); // To store product list

  // Fetch alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/alerts');
        const data = await response.json();
        setAlerts(data.alerts || []);
        const alertNotifications = data.alerts.map((alert, index) => ({
          id: `alert-${index}`,
          message: alert,
          date: new Date().toLocaleDateString(),
          read: false,
        }));
        setNotifications((prev) => [...prev, ...alertNotifications]);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };
    fetchAlerts();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const salesTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 600, 900, 1200, 1500, 1200, 900],
        fill: true,
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderColor: '#2e7d32',
        tension: 0.3,
      },
    ],
  };

  const customerSegmentsData = {
    labels: ['Retail', 'Wholesale', 'Distributors', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#1E90FF', '#32CD32', '#FFD700', '#FF4500'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const recentOrders = [
    { id: '#12345', customer: 'Maheesa Thambawita', status: 'Delivered', amount: 'LKR 3200.00' },
    { id: '#12344', customer: 'Maheesa Thambawita', status: 'Processing', amount: 'LKR 1500.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
  ];

  const handleViewAll = () => {
    navigate('/orders', { state: { user } });
  };

  const handleInventoryClick = () => {
    navigate('/inventory', { state: { user } });
  };

  const handleSyncData = () => {
    console.log('Syncing data...');
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Data synced successfully',
        date: new Date().toLocaleDateString(),
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

  const handleAddProductClick = () => {
    setShowAddProduct(true);
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      };
      const response = await fetch('http://localhost:5001/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setShowAddProduct(false);
        setNewProduct({ name: '', price: '', stock: '' });
        // Add notification
        setNotifications([
          ...notifications,
          {
            id: Date.now(),
            message: `New product "${newProduct.name}" added successfully`,
            date: new Date().toLocaleDateString(),
            read: false,
          },
        ]);
        // Refresh product list
        const updatedProducts = await fetch('http://localhost:5001/api/products');
        const updatedData = await updatedProducts.json();
        setProducts(updatedData);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-page">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FaTachometerAlt className="icon" /> Dashboard
          </button>
          <button className="nav-item" onClick={handleInventoryClick}>
            <FaBoxOpen className="icon" /> Inventory
          </button>
          <button className="nav-item" onClick={() => navigate('/forecasting', { state: { user } })}>
            <FaChartLine className="icon" /> Forecasting
          </button>
          <button className="nav-item" onClick={() => navigate('/customers', { state: { user } })}>
            <FaUsers className="icon" /> Customers
          </button>
          <button className="nav-item" onClick={() => navigate('/new-orders', { state: { user } })}>
            <FaShoppingCart className="icon" /> Orders
          </button>
          <button className="nav-item" onClick={() => navigate('/analytics', { state: { user } })}>
            <FaChartBar className="icon" /> Analytics
          </button>
          <button className="nav-item" onClick={() => navigate('/settings', { state: { user } })}>
            <FaCog className="icon" /> Settings
          </button>
          <button className="nav-item" onClick={() => navigate('/help', { state: { user } })}>
            <FaQuestionCircle className="icon" /> Help
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-top">
            <h1>Welcome to your Dashboard</h1>
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
              <div>
                <div className="user-profile">
                  <img src="src/assets/kumariImage.jpg" alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-icon">
              <FaWarehouse />
            </div>
            <div className="card-content">
              <h3>Total Stock</h3>
              <p>800 Kg</p>
              <span className="trend up">↑ 12%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaDollarSign />
            </div>
            <div className="card-content">
              <h3>Daily Sales</h3>
              <p>LKR 60,500</p>
              <span className="trend up">↑ 8.2%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <div className="card-content">
              <h3>Pending Orders</h3>
              <p>23</p>
              <span className="trend down">↑ 5.4%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaTruck />
            </div>
            <div className="card-content">
              <h3>Deliveries Today</h3>
              <p>15</p>
              <span className="status">On Track</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="chart sales-trend">
            <h3>Sales Trend</h3>
            <Line
              data={salesTrendData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#e0e0e0' } },
                },
              }}
            />
          </div>
          <div className="chart customer-segments">
            <h3>Customer Segments</h3>
            <div className="pie-chart-container">
              <Pie
                data={customerSegmentsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: { size: 14 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All
          </button>
        </div>

        <div className="alerts-section">
          <h3>Stock Alerts</h3>
          {alerts.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} style={{ color: 'red' }}>
                  {alert}
                </li>
              ))}
            </ul>
          ) : (
            <p>No alerts at the moment.</p>
          )}
        </div>

        <div className="products-section">
          <h3>Current Products</h3>
          {products.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price (LKR/kg)</th>
                  <th>Stock (kg)</th>
                  <th>Sales/Day (kg)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.salesPerDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available.</p>
          )}
        </div>

        {showAddProduct && (
          <div className="add-product-modal">
            <div className="modal-content">
              <h3>Add New Product</h3>
              <form onSubmit={handleAddProductSubmit}>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Price (per kg)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Stock (kg)"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  required
                />
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowAddProduct(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        <button className="add-product-btn" onClick={handleAddProductClick}>
          <FaPlus /> Add New Product
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;*/

/*import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaBoxOpen, FaChartBar, FaUsers, FaShoppingCart, FaTachometerAlt, FaCog, FaQuestionCircle, FaSyncAlt, FaBell, FaUser, FaWarehouse, FaDollarSign, FaClipboardList, FaTruck, FaPlus } from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DashboardPage.css';
import logo from '../assets/logo.png';

// Import images (adjust paths as needed)
import supiriKeeriSamba from '../assets/Supiri Keeri Samba.jpg';
import supiriSambaRice from '../assets/Supiri Samba Rice.jpg';
import supiriRedNadu from '../assets/Supiri Red Nadu Rice.jpg';
import supiriWhiteRaw from '../assets/Supiri White Raw Rice.jpg';
import supiriRedRaw from '../assets/Supiri Red Raw Rice.jpg';
import supiriSambaRaw from '../assets/Supiri Samba Raw Rice.jpg';
import whiteNadu from '../assets/white Nadu Rice.jpg';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const { user: contextUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || contextUser;

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received from Maheesa Thambawita', date: '2025-01-20', read: false },
    { id: 2, message: 'Pending order #12344 needs attention', date: '2025-01-19', read: false },
  ]);
  const [alerts, setAlerts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: 'Boiled' });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAlerts();
    fetchProducts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/alerts');
      const data = await response.json();
      setAlerts(data.alerts || []);
      const alertNotifications = data.alerts.map((alert, index) => ({
        id: `alert-${index}`,
        message: alert,
        date: new Date().toLocaleDateString(),
        read: false,
      }));
      setNotifications((prev) => [...prev, ...alertNotifications]);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const data = await response.json();
      const productsWithDetails = data.map(product => ({
        ...product,
        image: getProductImage(product.name) || whiteNadu,
        salesPerDay: getSalesPerDay(product.name),
        bufferStock: calculateBufferStock(product),
      }));
      setProducts(productsWithDetails);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getProductImage = (name) => {
    const imageMap = {
      'Supiri Keeri Samba': supiriKeeriSamba,
      'Supiri Samba Rice': supiriSambaRice,
      'Supiri Red Nadu Rice': supiriRedNadu,
      'Supiri White Raw Rice': supiriWhiteRaw,
      'Supiri Red Raw Rice': supiriRedRaw,
      'Supiri Samba Raw Rice': supiriSambaRaw,
      'Kekulu': whiteNadu,
      'Suduru Samba': whiteNadu,
      'Pachchaperumal': whiteNadu,
    };
    return imageMap[name] || whiteNadu;
  };

  const getSalesPerDay = (name) => {
    return name === 'Supiri Samba Rice' ? 150 : 50;
  };

  const calculateBufferStock = (product) => {
    const leadTime = 1;
    const safetyStock = 500;
    const avgDailySales = product.salesPerDay || 50;
    const customBuffer = {
      'Supiri Samba Rice': 1000,
      'Supiri Keeri Samba': 2000,
      'Supiri Nadu Rice': 1000,
      'Supiri Red Nadu Rice': 1000,
      'Supiri White Raw Rice': 1000,
      'Supiri Samba Raw Rice': 1000,
      'Supiri Red Raw Rice': 1000,
      'Kekulu': 1000,
      'Suduru Samba': 1000,
      'Pachchaperumal': 1000,
    }[product.name] || 1000;
    return Math.max((avgDailySales * leadTime) + safetyStock, customBuffer);
  };

  const salesTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 600, 900, 1200, 1500, 1200, 900],
        fill: true,
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderColor: '#2e7d32',
        tension: 0.3,
      },
    ],
  };

  const customerSegmentsData = {
    labels: ['Retail', 'Wholesale', 'Distributors', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#1E90FF', '#32CD32', '#FFD700', '#FF4500'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const recentOrders = [
    { id: '#12345', customer: 'Maheesa Thambawita', status: 'Delivered', amount: 'LKR 3200.00' },
    { id: '#12344', customer: 'Maheesa Thambawita', status: 'Processing', amount: 'LKR 1500.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
  ];

  const handleViewAll = () => {
    navigate('/orders', { state: { user } });
  };

  const handleInventoryClick = () => {
    navigate('/inventory', { state: { user } });
  };

  const handleSyncData = () => {
    console.log('Syncing data...');
    fetchProducts();
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Data synced successfully',
        date: new Date().toLocaleDateString(),
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

  const handleAddProductClick = () => {
    setShowAddProduct(true);
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        category: newProduct.category,
        inStock: true,
        reviews: 0,
        salesPerDay: getSalesPerDay(newProduct.name),
        bufferStock: calculateBufferStock({ name: newProduct.name, salesPerDay: getSalesPerDay(newProduct.name) }),
      };
      const response = await fetch('http://localhost:5001/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setShowAddProduct(false);
        setNewProduct({ name: '', price: '', stock: '', category: 'Boiled' });
        fetchProducts();
        setNotifications([
          ...notifications,
          {
            id: Date.now(),
            message: `New product "${newProduct.name}" added successfully`,
            date: new Date().toLocaleDateString(),
            read: false,
          },
        ]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  useEffect(() => {
    const checkAlerts = () => {
      const newAlerts = products
        .filter(product => product.stock < product.bufferStock)
        .map(product => `Low stock alert for ${product.name}: ${product.stock}kg (Buffer: ${product.bufferStock}kg)`);
      setAlerts(newAlerts);
      const alertNotifications = newAlerts.map((alert, index) => ({
        id: `alert-${Date.now()}-${index}`,
        message: alert,
        date: new Date().toLocaleDateString(),
        read: false,
      }));
      setNotifications((prev) => [...prev, ...alertNotifications]);
    };
    checkAlerts();
  }, [products]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-page">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FaTachometerAlt className="icon" /> Dashboard
          </button>
          <button className="nav-item" onClick={handleInventoryClick}>
            <FaBoxOpen className="icon" /> Inventory
          </button>
          <button className="nav-item" onClick={() => navigate('/forecasting', { state: { user } })}>
            <FaChartLine className="icon" /> Forecasting
          </button>
          <button className="nav-item" onClick={() => navigate('/customers', { state: { user } })}>
            <FaUsers className="icon" /> Customers
          </button>
          <button className="nav-item" onClick={() => navigate('/new-orders', { state: { user } })}>
            <FaShoppingCart className="icon" /> Orders
          </button>
          <button className="nav-item">
            <Link to="/products">
              <FaChartBar className="icon" /> Products
            </Link>
          </button>
          <button className="nav-item" onClick={() => navigate('/analytics', { state: { user } })}>
            <FaChartBar className="icon" /> Analytics
          </button>
          <button className="nav-item" onClick={() => navigate('/settings', { state: { user } })}>
            <FaCog className="icon" /> Settings
          </button>
          <button className="nav-item" onClick={() => navigate('/help', { state: { user } })}>
            <FaQuestionCircle className="icon" /> Help
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-top">
            <h1>Welcome to your Dashboard</h1>
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
              <div>
                <div className="user-profile">
                <img src="src/assets/ kumariImage.jpg" alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-icon">
              <FaWarehouse />
            </div>
            <div className="card-content">
              <h3>Total Stock</h3>
              <p>{products.reduce((total, p) => total + (p.stock || 0), 0)} Kg</p>
              <span className="trend up">↑ 12%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaDollarSign />
            </div>
            <div className="card-content">
              <h3>Daily Sales</h3>
              <p>LKR {products.reduce((total, p) => total + (p.price * (p.salesPerDay || 0)), 0).toFixed(2)}</p>
              <span className="trend up">↑ 8.2%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <div className="card-content">
              <h3>Pending Orders</h3>
              <p>{products.filter(p => p.stock < p.bufferStock).length}</p>
              <span className="trend down">↑ 5.4%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaTruck />
            </div>
            <div className="card-content">
              <h3>Deliveries Today</h3>
              <p>15</p>
              <span className="status">On Track</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="chart sales-trend">
            <h3>Sales Trend</h3>
            <Line
              data={salesTrendData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#e0e0e0' } },
                },
              }}
            />
          </div>
          <div className="chart customer-segments">
            <h3>Customer Segments</h3>
            <div className="pie-chart-container">
              <Pie
                data={customerSegmentsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: { size: 14 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All
          </button>
        </div>

        <div className="alerts-section">
          <h3>Stock Alerts</h3>
          {alerts.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} style={{ color: 'red' }}>
                  {alert}
                </li>
              ))}
            </ul>
          ) : (
            <p>No alerts at the moment.</p>
          )}
        </div>

        <div className="products-section">
          <h3>Current Products</h3>
          {products.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price (LKR/kg)</th>
                  <th>Stock (kg)</th>
                  <th>Sales/Day (kg)</th>
                  <th>Buffer Stock (kg)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.salesPerDay}</td>
                    <td>{product.bufferStock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available.</p>
          )}
        </div>

        {showAddProduct && (
          <div className="add-product-modal">
            <div className="modal-content">
              <h3>Add New Product</h3>
              <form onSubmit={handleAddProductSubmit}>
                <input
                  type="text"
                  placeholder="Product Name (e.g., Supiri Samba Rice)"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                  list="product-suggestions"
                />
                <datalist id="product-suggestions">
                  <option value="Supiri Keeri Samba" />
                  <option value="Supiri Samba Rice" />
                  <option value="Supiri Nadu Rice" />
                  <option value="Supiri Red Nadu Rice" />
                  <option value="Supiri White Raw Rice" />
                  <option value="Supiri Samba Raw Rice" />
                  <option value="Supiri Red Raw Rice" />
                  <option value="Kekulu" />
                  <option value="Suduru Samba" />
                  <option value="Pachchaperumal" />
                </datalist>
                <input
                  type="number"
                  placeholder="Price (per kg)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Stock (kg)"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  required
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                >
                  <option value="Boiled">Boiled</option>
                  <option value="Raw">Raw</option>
                </select>
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowAddProduct(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        <button className="add-product-btn" onClick={handleAddProductClick}>
          <FaPlus /> Add New Product
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;*/


import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaBoxOpen, FaChartBar, FaUsers, FaShoppingCart, FaTachometerAlt, FaCog, FaQuestionCircle, FaSyncAlt, FaBell, FaUser, FaWarehouse, FaDollarSign, FaClipboardList, FaTruck, FaPlus } from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DashboardPage.css';
import logo from '../assets/logo.png';

// Import images (adjust paths as needed)
import supiriKeeriSamba from '../assets/Supiri Keeri Samba.jpg';
import supiriSambaRice from '../assets/Supiri Samba Rice.jpg';
import supiriRedNadu from '../assets/Supiri Red Nadu Rice.jpg';
import supiriWhiteRaw from '../assets/Supiri White Raw Rice.jpg';
import supiriRedRaw from '../assets/Supiri Red Raw Rice.jpg';
import supiriSambaRaw from '../assets/Supiri Samba Raw Rice.jpg';
import whiteNadu from '../assets/white Nadu Rice.jpg';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const { user: contextUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || contextUser;

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received from Maheesa Thambawita', date: '2025-01-20', read: false },
    { id: 2, message: 'Pending order #12344 needs attention', date: '2025-01-19', read: false },
  ]);
  const [alerts, setAlerts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: 'Boiled' });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAlerts();
    fetchProducts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/alerts');
      const data = await response.json();
      setAlerts(data.alerts || []);
      const alertNotifications = (data.alerts || []).map((alert, index) => ({
        id: `alert-${index}`,
        message: alert,
        date: new Date().toLocaleDateString(),
        read: false,
      }));
      setNotifications((prev) => [...prev, ...alertNotifications]);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const data = await response.json();
      const productsWithDetails = data.map(product => ({
        ...product,
        image: getProductImage(product.name) || whiteNadu,
        salesPerDay: getSalesPerDay(product.name),
        bufferStock: calculateBufferStock(product),
      }));
      setProducts(productsWithDetails);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getProductImage = (name) => {
    const imageMap = {
      'Supiri Keeri Samba': supiriKeeriSamba,
      'Supiri Samba Rice': supiriSambaRice,
      'Supiri Red Nadu Rice': supiriRedNadu,
      'Supiri White Raw Rice': supiriWhiteRaw,
      'Supiri Red Raw Rice': supiriRedRaw,
      'Supiri Samba Raw Rice': supiriSambaRaw,
      'Kekulu': whiteNadu,
      'Suduru Samba': whiteNadu,
      'Pachchaperumal': whiteNadu,
    };
    return imageMap[name] || whiteNadu;
  };

  const getSalesPerDay = (name) => {
    return name === 'Supiri Samba Rice' ? 150 : 50;
  };

  const calculateBufferStock = (product) => {
    const leadTime = 1;
    const safetyStock = 500;
    const avgDailySales = product.salesPerDay || 50;
    const customBuffer = {
      'Supiri Samba Rice': 1000,
      'Supiri Keeri Samba': 2000,
      'Supiri Nadu Rice': 1000,
      'Supiri Red Nadu Rice': 1000,
      'Supiri White Raw Rice': 1000,
      'Supiri Samba Raw Rice': 1000,
      'Supiri Red Raw Rice': 1000,
      'Kekulu': 1000,
      'Suduru Samba': 1000,
      'Pachchaperumal': 1000,
    }[product.name] || 1000;
    return Math.max((avgDailySales * leadTime) + safetyStock, customBuffer);
  };

  const salesTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 600, 900, 1200, 1500, 1200, 900],
        fill: true,
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderColor: '#2e7d32',
        tension: 0.3,
      },
    ],
  };

  const customerSegmentsData = {
    labels: ['Retail', 'Wholesale', 'Distributors', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#1E90FF', '#32CD32', '#FFD700', '#FF4500'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const recentOrders = [
    { id: '#12345', customer: 'Maheesa Thambawita', status: 'Delivered', amount: 'LKR 3200.00' },
    { id: '#12344', customer: 'Maheesa Thambawita', status: 'Processing', amount: 'LKR 1500.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
  ];

  const handleViewAll = () => {
    navigate('/orders', { state: { user } });
  };

  const handleInventoryClick = () => {
    navigate('/inventory', { state: { user } });
  };

  const handleSyncData = () => {
    console.log('Syncing data...');
    fetchProducts();
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Data synced successfully',
        date: new Date().toLocaleDateString(),
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

  const handleAddProductClick = () => {
    setShowAddProduct(true);
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        category: newProduct.category,
        inStock: true,
        reviews: 0,
        salesPerDay: getSalesPerDay(newProduct.name),
        bufferStock: calculateBufferStock({ name: newProduct.name, salesPerDay: getSalesPerDay(newProduct.name) }),
      };
      const response = await fetch('http://localhost:5001/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setShowAddProduct(false);
        setNewProduct({ name: '', price: '', stock: '', category: 'Boiled' });
        fetchProducts();
        setNotifications([
          ...notifications,
          {
            id: Date.now(),
            message: `New product "${newProduct.name}" added successfully`,
            date: new Date().toLocaleDateString(),
            read: false,
          },
        ]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  useEffect(() => {
    const checkAlerts = () => {
      const newAlerts = products
        .filter(product => product.stock < product.bufferStock)
        .map(product => `Low stock alert for ${product.name}: ${product.stock}kg (Buffer: ${product.bufferStock}kg)`);
      setAlerts(newAlerts);
      // Add stock alerts to notifications
      const alertNotifications = newAlerts.map((alert, index) => ({
        id: `stock-alert-${Date.now()}-${index}`,
        message: alert,
        date: new Date().toLocaleDateString(),
        read: false,
      }));
      // Avoid duplicate notifications by checking if the alert already exists
      setNotifications((prev) => {
        const existingMessages = prev.map(n => n.message);
        const newNotifications = alertNotifications.filter(n => !existingMessages.includes(n.message));
        return [...prev, ...newNotifications];
      });
    };
    if (products.length > 0) {
      checkAlerts();
    }
  }, [products]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-page">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FaTachometerAlt className="icon" /> Dashboard
          </button>
          <button className="nav-item" onClick={handleInventoryClick}>
            <FaBoxOpen className="icon" /> Inventory
          </button>
          <button className="nav-item" onClick={() => navigate('/forecasting', { state: { user } })}>
            <FaChartLine className="icon" /> Forecasting
          </button>
          <button className="nav-item" onClick={() => navigate('/customers', { state: { user } })}>
            <FaUsers className="icon" /> Customers
          </button>
          <button className="nav-item" onClick={() => navigate('/new-orders', { state: { user } })}>
            <FaShoppingCart className="icon" /> Orders
          </button>
          <button className="nav-item">
            <Link to="/products">
              <FaChartBar className="icon" /> Products
            </Link>
          </button>
          <button className="nav-item" onClick={() => navigate('/analytics', { state: { user } })}>
            <FaChartBar className="icon" /> Analytics
          </button>
          <button className="nav-item" onClick={() => navigate('/settings', { state: { user } })}>
            <FaCog className="icon" /> Settings
          </button>
          <button className="nav-item" onClick={() => navigate('/help', { state: { user } })}>
            <FaQuestionCircle className="icon" /> Help
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-top">
            <h1>Welcome to your Dashboard</h1>
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
              <div>
                <div className="user-profile">
                <img src="src/assets/ kumariImage.jpg" alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-icon">
              <FaWarehouse />
            </div>
            <div className="card-content">
              <h3>Total Stock</h3>
              <p>{products.reduce((total, p) => total + (p.stock || 0), 0)} Kg</p>
              <span className="trend up">↑ 12%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaDollarSign />
            </div>
            <div className="card-content">
              <h3>Daily Sales</h3>
              <p>LKR {products.reduce((total, p) => total + (p.price * (p.salesPerDay || 0)), 0).toFixed(2)}</p>
              <span className="trend up">↑ 8.2%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaClipboardList />
            </div>
            <div className="card-content">
              <h3>Pending Orders</h3>
              <p>{products.filter(p => p.stock < p.bufferStock).length}</p>
              <span className="trend down">↑ 5.4%</span>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaTruck />
            </div>
            <div className="card-content">
              <h3>Deliveries Today</h3>
              <p>15</p>
              <span className="status">On Track</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="chart sales-trend">
            <h3>Sales Trend</h3>
            <Line
              data={salesTrendData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: '#e0e0e0' } },
                },
              }}
            />
          </div>
          <div className="chart customer-segments">
            <h3>Customer Segments</h3>
            <div className="pie-chart-container">
              <Pie
                data={customerSegmentsData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: { size: 14 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All
          </button>
        </div>

        <div className="alerts-section">
          <h3>Stock Alerts</h3>
          {alerts.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} style={{ color: 'red' }}>
                  {alert}
                </li>
              ))}
            </ul>
          ) : (
            <p>No alerts at the moment.</p>
          )}
        </div>

        <div className="products-section">
          <h3>Current Products</h3>
          {products.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price (LKR/kg)</th>
                  <th>Stock (kg)</th>
                  <th>Sales/Day (kg)</th>
                  <th>Buffer Stock (kg)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.salesPerDay}</td>
                    <td>{product.bufferStock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products available.</p>
          )}
        </div>

        {showAddProduct && (
          <div className="add-product-modal">
            <div className="modal-content">
              <h3>Add New Product</h3>
              <form onSubmit={handleAddProductSubmit}>
                <input
                  type="text"
                  placeholder="Product Name (e.g., Supiri Samba Rice)"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                  list="product-suggestions"
                />
                <datalist id="product-suggestions">
                  <option value="Supiri Keeri Samba" />
                  <option value="Supiri Samba Rice" />
                  <option value="Supiri Nadu Rice" />
                  <option value="Supiri Red Nadu Rice" />
                  <option value="Supiri White Raw Rice" />
                  <option value="Supiri Samba Raw Rice" />
                  <option value="Supiri Red Raw Rice" />
                  <option value="Kekulu" />
                  <option value="Suduru Samba" />
                  <option value="Pachchaperumal" />
                </datalist>
                <input
                  type="number"
                  placeholder="Price (per kg)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Stock (kg)"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  required
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                >
                  <option value="Boiled">Boiled</option>
                  <option value="Raw">Raw</option>
                </select>
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowAddProduct(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        <button className="add-product-btn" onClick={handleAddProductClick}>
          <FaPlus /> Add New Product
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;