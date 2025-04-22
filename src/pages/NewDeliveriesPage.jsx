import React, { useState } from 'react';
import { FaBell, FaUser, FaDownload, FaEdit, FaEye, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/NewDeliveriesPage.css';
import logo from '../assets/logo.png';

const NewDeliveriesPage = () => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Delivery #DEL-2025-001 dispatched', date: '2025-01-16', read: false },
    { id: 2, message: 'Delivery #DEL-2025-002 delayed', date: '2025-01-15', read: false },
  ]);
  const [deliveries, setDeliveries] = useState([
    { id: '#DEL-2025-001', orderId: '#ORD-2025-001', customer: 'T.M.D.G. Athula', status: 'Dispatched', date: 'Jan 16, 2025' },
    { id: '#DEL-2025-002', orderId: '#ORD-2025-002', customer: 'M.D. Thambawita', status: 'Delayed', date: 'Jan 15, 2025' },
    { id: '#DEL-2025-003', orderId: '#ORD-2025-003', customer: 'K.V.D. Swarna', status: 'Delivered', date: 'Jan 14, 2025' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showAddDeliveryModal, setShowAddDeliveryModal] = useState(false);
  const [newDelivery, setNewDelivery] = useState({
    orderId: '',
    customer: '',
    status: 'Dispatched',
  });
  const [systemOnline, setSystemOnline] = useState(true);

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const csvContent = [
      ['Delivery ID', 'Order ID', 'Customer', 'Status', 'Date'],
      ...deliveries.map(delivery => [
        delivery.id,
        delivery.orderId,
        delivery.customer,
        delivery.status,
        delivery.date,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'deliveries_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Deliveries data exported successfully',
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
  };

  const handleAddDelivery = () => {
    if (!newDelivery.orderId || !newDelivery.customer) {
      alert('Please fill in all required fields!');
      return;
    }

    const delivery = {
      id: `#DEL-2025-${String(deliveries.length + 1).padStart(3, '0')}`,
      orderId: newDelivery.orderId,
      customer: newDelivery.customer,
      status: newDelivery.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setDeliveries([...deliveries, delivery]);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: `New delivery ${delivery.id} added`,
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
    setNewDelivery({ orderId: '', customer: '', status: 'Dispatched' });
    setShowAddDeliveryModal(false);
  };

  const handleEditDelivery = (index) => {
    const newCustomer = prompt('Enter new customer name:', deliveries[index].customer);
    if (newCustomer) {
      const updatedDeliveries = [...deliveries];
      updatedDeliveries[index].customer = newCustomer;
      setDeliveries(updatedDeliveries);
      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          message: `Delivery ${deliveries[index].id} updated`,
          date: new Date().toISOString().split('T')[0],
          read: false,
        },
      ]);
    }
  };

  const handleViewDelivery = (delivery) => {
    alert(`Delivery Details:\nID: ${delivery.id}\nOrder ID: ${delivery.orderId}\nCustomer: ${delivery.customer}\nStatus: ${delivery.status}\nDate: ${delivery.date}`);
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
    <div className="new-deliveries-page">
      {/* Header */}
      <header className="new-deliveries-header">
        <div className="new-deliveries-header-top">
          <div className="new-deliveries-logo">
          <img src={logo} alt="RiceMillPro Logo" />
          </div>
          <nav className="new-deliveries-header-nav">
            <button className="new-deliveries-nav-item" onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
            <button className="new-deliveries-nav-item" onClick={() => navigate('/new-orders')}>
              Orders
            </button>
            <button className="new-deliveries-nav-item active">Deliveries</button>
            <button className="new-deliveries-nav-item" onClick={() => navigate('/new-reports')}>
              Reports
            </button>
          </nav>
          <div className="new-deliveries-header-actions">
            <div className="header-top-item">
              <div className="new-deliveries-notification" onClick={handleNotificationClick}>
                <FaBell className="new-deliveries-header-icon" />
                {unreadNotificationsCount > 0 && (
                  <span className="new-deliveries-badge">{unreadNotificationsCount}</span>
                )}
              </div>
              {showNotifications && (
                <div className="new-deliveries-notification-dropdown">
                  <h4>Notifications</h4>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="new-deliveries-notification-item">
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
              <div className="new-deliveries-user-profile">
                <img src="src/assets/ kumariImage.jpg" alt="User" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Deliveries Section */}
      <div className="new-deliveries-section">
        <div className="new-deliveries-section-header">
          <div>
            <h1>Deliveries</h1>
            <p>Manage and track all deliveries in one place</p>
          </div>
          <div className="new-deliveries-section-actions">
            <button className="new-deliveries-new-delivery-btn" onClick={() => setShowAddDeliveryModal(true)}>
              <FaPlus /> New Delivery
            </button>
            <button className="new-deliveries-export-btn" onClick={handleExport}>
              <FaDownload /> Export
            </button>
          </div>
        </div>
        <div className="new-deliveries-table-filters">
          <input
            type="text"
            placeholder="Search deliveries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Dispatched</option>
            <option>Delayed</option>
            <option>Delivered</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.id}</td>
                <td>{delivery.orderId}</td>
                <td>{delivery.customer}</td>
                <td>
                  <span className={`new-deliveries-status ${delivery.status.toLowerCase()}`}>
                    {delivery.status}
                  </span>
                </td>
                <td>{delivery.date}</td>
                <td>
                  <button className="new-deliveries-action-btn edit" onClick={() => handleEditDelivery(index)}>
                    <FaEdit />
                  </button>
                  <button className="new-deliveries-action-btn view" onClick={() => handleViewDelivery(delivery)}>
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Delivery Modal */}
      {showAddDeliveryModal && (
        <div className="new-deliveries-modal-overlay">
          <div className="new-deliveries-modal">
            <h2>Add New Delivery</h2>
            <div className="new-deliveries-form-group">
              <label>Order ID</label>
              <input
                type="text"
                value={newDelivery.orderId}
                onChange={(e) => setNewDelivery({ ...newDelivery, orderId: e.target.value })}
                placeholder="Enter order ID"
              />
            </div>
            <div className="new-deliveries-form-group">
              <label>Customer Name</label>
              <input
                type="text"
                value={newDelivery.customer}
                onChange={(e) => setNewDelivery({ ...newDelivery, customer: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>
            <div className="new-deliveries-form-group">
              <label>Status</label>
              <select
                value={newDelivery.status}
                onChange={(e) => setNewDelivery({ ...newDelivery, status: e.target.value })}
              >
                <option value="Dispatched">Dispatched</option>
                <option value="Delayed">Delayed</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="new-deliveries-modal-actions">
              <button className="new-deliveries-cancel-btn" onClick={() => setShowAddDeliveryModal(false)}>Cancel</button>
              <button className="new-deliveries-save-btn" onClick={handleAddDelivery}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="new-deliveries-system-status" onClick={handleSystemToggle}>
        <span className={`new-deliveries-status-indicator ${systemOnline ? 'online' : 'offline'}`}></span>
        <p>{systemOnline ? 'System Online' : 'System Offline'}</p>
      </div>
    </div>
  );
};

export default NewDeliveriesPage;