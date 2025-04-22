import React, { useState } from 'react';
import { FaBell, FaUser, FaDownload, FaEdit, FaEye, FaPlus, FaMapMarkerAlt, FaTruck, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/NewOrdersPage.css';
import logo from '../assets/logo.png';

const NewOrdersPage = () => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order #ORD-2025-004 received', date: '2025-01-16', read: false },
    { id: 2, message: 'Order #ORD-2025-003 shipped', date: '2025-01-13', read: false },
  ]);
  const [orders, setOrders] = useState([
    { id: '#ORD-2025-001', customer: 'T.M.D.G. Athula', status: 'Pending', date: 'Jan 15, 2025', total: 'LKR 2450.00' },
    { id: '#ORD-2025-002', customer: 'M.D. Thambawita', status: 'Processing', date: 'Jan 14, 2025', total: 'LKR 1800.50' },
    { id: '#ORD-2025-003', customer: 'K.V.D. Swarna', status: 'Shipped', date: 'Jan 13, 2025', total: 'LKR 4000.75' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    status: 'Pending',
    total: '',
  });
  const [systemOnline, setSystemOnline] = useState(true);

 
  const activeDeliveries = orders.filter(order => order.status === 'Processing').length;
  const pendingDeliveries = orders.filter(order => order.status === 'Pending').length;
  const completedToday = orders.filter(order => order.status === 'Shipped' && order.date === new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })).length;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Status', 'Date', 'Total'],
      ...orders.map(order => [
        order.id,
        order.customer,
        order.status,
        order.date,
        order.total,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'orders_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Orders data exported successfully',
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
  };

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.total) {
      alert('Please fill in all required fields!');
      return;
    }

    const order = {
      id: `#ORD-2025-${String(orders.length + 1).padStart(3, '0')}`,
      customer: newOrder.customer,
      status: newOrder.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: `$${parseFloat(newOrder.total).toFixed(2)}`,
    };
    setOrders([...orders, order]);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: `New order ${order.id} added`,
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
    setNewOrder({ customer: '', status: 'Pending', total: '' });
    setShowAddOrderModal(false);
  };

  const handleEditOrder = (index) => {
    const newCustomer = prompt('Enter new customer name:', orders[index].customer);
    if (newCustomer) {
      const updatedOrders = [...orders];
      updatedOrders[index].customer = newCustomer;
      setOrders(updatedOrders);
      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          message: `Order ${orders[index].id} updated`,
          date: new Date().toISOString().split('T')[0],
          read: false,
        },
      ]);
    }
  };

  const handleViewOrder = (order) => {
    alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customer}\nStatus: ${order.status}\nDate: ${order.date}\nTotal: ${order.total}`);
  };

  const handleNotificationClick = () => {
    if (!showNotifications) {
      const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updatedNotifications);
    }
    setShowNotifications(!showNotifications);
  };

  const handleSystemToggle = () => {
    setSystemOnline(!systemOnline);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: `System is now ${systemOnline ? 'offline' : 'online'}`,
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="new-orders-page">
      {/* Header */}
      <header className="new-orders-header">
        <div className="new-orders-header-top">
          <div className="new-orders-logo">
          <img src={logo} alt="RiceMillPro Logo" />
          </div>
          <nav className="new-orders-header-nav">
            <button className="new-orders-nav-item" onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
            <button className="new-orders-nav-item active">Orders</button>
            <button className="new-orders-nav-item" onClick={() => navigate('/new-deliveries')}>
              Deliveries
            </button>
            <button className="new-orders-nav-item" onClick={() => navigate('/new-reports')}>
              Reports
            </button>
          </nav>
          <div className="new-orders-header-actions">
            <div className="header-top-item">
              <div className="new-orders-notification" onClick={handleNotificationClick}>
                <FaBell className="new-orders-header-icon" />
                {unreadNotificationsCount > 0 && (
                  <span className="new-orders-badge">{unreadNotificationsCount}</span>
                )}
              </div>
              {showNotifications && (
                <div className="new-orders-notification-dropdown">
                  <h4>Notifications</h4>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="new-orders-notification-item">
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
              <div className="new-orders-user-profile">
                <img src="src/assets/ kumariImage.jpg" alt="User" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Orders Section */}
      <div className="new-orders-section">
        <div className="new-orders-section-header">
          <div>
            <h1>Orders</h1>
            <p>Manage and track all orders in one place</p>
          </div>
          <div className="new-orders-section-actions">
            <button className="new-orders-new-order-btn" onClick={() => setShowAddOrderModal(true)}>
              <FaPlus /> New Order
            </button>
            <button className="new-orders-export-btn" onClick={handleExport}>
              <FaDownload /> Export
            </button>
          </div>
        </div>
        <div className="new-orders-table-filters">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>
                  <span className={`new-orders-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>
                  <button className="new-orders-action-btn edit" onClick={() => handleEditOrder(index)}>
                    <FaEdit />
                  </button>
                  <button className="new-orders-action-btn view" onClick={() => handleViewOrder(order)}>
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Order Modal */}
      {showAddOrderModal && (
        <div className="new-orders-modal-overlay">
          <div className="new-orders-modal">
            <h2>Add New Order</h2>
            <div className="new-orders-form-group">
              <label>Customer Name</label>
              <input
                type="text"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>
            <div className="new-orders-form-group">
              <label>Status</label>
              <select
                value={newOrder.status}
                onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
            <div className="new-orders-form-group">
              <label>Total (LKR)</label>
              <input
                type="number"
                value={newOrder.total}
                onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
                placeholder="Enter total amount"
              />
            </div>
            <div className="new-orders-modal-actions">
              <button className="new-orders-cancel-btn" onClick={() => setShowAddOrderModal(false)}>Cancel</button>
              <button className="new-orders-save-btn" onClick={handleAddOrder}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Active Deliveries Section */}
      <div className="new-orders-active-deliveries-section">
        <h2>Active Deliveries</h2>
        <div className="new-orders-deliveries-content">
          <div className="new-orders-map-container">
            {/* Placeholder for map (you can integrate a map library like Google Maps or Leaflet) */}
            <img src="src/assets/map.jpg" alt="Map" style={{ width: '500px', height: '300px' }} />
          </div>
          <div className="new-orders-delivery-stats">
            <div className="new-orders-stat">
              <FaTruck className="new-orders-stat-icon" />
              <div>
                <h3>Active Deliveries</h3>
                <p>{activeDeliveries}</p>
              </div>
            </div>
            <div className="new-orders-stat">
              <FaClock className="new-orders-stat-icon" />
              <div>
                <h3>Pending</h3>
                <p>{pendingDeliveries}</p>
              </div>
            </div>
            <div className="new-orders-stat">
              <FaCheckCircle className="new-orders-stat-icon" />
              <div>
                <h3>Completed Today</h3>
                <p>{completedToday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="new-orders-system-status" onClick={handleSystemToggle}>
        <span className={`new-orders-status-indicator ${systemOnline ? 'online' : 'offline'}`}></span>
        <p>{systemOnline ? 'System Online' : 'System Offline'}</p>
      </div>
    </div>
  );
};

export default NewOrdersPage;