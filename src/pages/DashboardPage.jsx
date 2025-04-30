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





import React, { useState } from 'react';
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
               {/* Sidebar */}
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

               {/* Main Content */}
               <div className="main-content">
                   {/* Header */}
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

                   {/* Dashboard Cards */}
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

                   {/* Charts */}
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

                   {/* Recent Orders Table */}
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

   export default DashboardPage;