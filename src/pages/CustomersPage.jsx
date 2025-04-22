import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaSyncAlt, FaBell, FaUserPlus, FaFileImport, FaFilter, FaDownload, FaEdit, FaEye, FaUsers, FaDollarSign, FaStar, FaChartLine, FaChartPie, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomersPage.css';
import logo from '../assets/logo.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomersPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    segments: { premium: true, wholesale: true, retail: true },
    orderFrequency: 'All',
    dateRange: { start: '', end: '' },
  });
  const [filteredCustomers, setFilteredCustomers] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New customer added: U. Weerasinghe', date: '2025-01-20', read: false },
    { id: 2, message: 'Customer data synced successfully', date: '2025-01-19', read: false },
  ]);

  const [customers, setCustomers] = useState([
    {
      id: '#12345',
      name: 'M.D. Thambawita',
      contact: 'manee.thambawita@gmail.com, +1 (555) 123-456',
      lastOrder: 'Jan 15, 2025',
      segment: 'Premium',
      status: 'Active',
      amount: 'LKR 23000',
    },
    {
      id: '#12346',
      name: 'M.D. Thambawita',
      contact: 'mahee.thambawita@gmail.com, +1 (555) 234-5678',
      lastOrder: 'Oct 15, 2024',
      segment: 'Wholesale',
      status: 'Active',
      amount: 'LKR 180000',
    },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    contact: '',
    segment: 'Retail',
    status: 'Active',
  });

  const customerSegmentsData = {
    labels: ['Premium', 'Wholesale', 'Retail'],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ['#1E90FF', '#32CD32', '#FFD700'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const handleSyncData = () => {
    console.log('Syncing customer data...');
    alert('Customer data synced successfully!');
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.contact) {
      alert('Please fill in all required fields!');
      return;
    }
    const customer = {
      id: `#${Math.floor(Math.random() * 100000)}`,
      name: newCustomer.name,
      contact: newCustomer.contact,
      lastOrder: new Date().toLocaleDateString(),
      segment: newCustomer.segment,
      status: newCustomer.status,
      amount: '$0',
    };
    const updatedCustomers = [...customers, customer];
    setCustomers(updatedCustomers);
    // Add notification dynamically
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: `New customer added: ${newCustomer.name}`,
        date: new Date().toLocaleDateString(),
        read: false,
      },
    ]);
    setNewCustomer({ name: '', contact: '', segment: 'Retail', status: 'Active' });
    setShowAddModal(false);
    if (filteredCustomers) {
      setFilteredCustomers(applyFilters(updatedCustomers));
    }
    alert('Customer added successfully!');
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      const importedCustomers = rows.slice(1).map(row => ({
        id: row[0],
        name: row[1],
        contact: row[2],
        lastOrder: row[3],
        segment: row[4],
        status: row[5],
        amount: row[6],
      })).filter(c => c.id && c.name);
      const updatedCustomers = [...customers, ...importedCustomers];
      setCustomers(updatedCustomers);
      if (filteredCustomers) {
        setFilteredCustomers(applyFilters(updatedCustomers));
      }
      alert('Customers imported successfully!');
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Contact', 'Last Order', 'Segment', 'Status', 'Amount'],
      ...customers.map(customer => [
        customer.id,
        customer.name,
        customer.contact,
        customer.lastOrder,
        customer.segment,
        customer.status,
        customer.amount,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'customers_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'segments') {
      setFilters({
        ...filters,
        segments: { ...filters.segments, [value]: !filters.segments[value] },
      });
    } else if (filterType === 'orderFrequency') {
      setFilters({ ...filters, orderFrequency: value });
    } else if (filterType === 'dateRange') {
      setFilters({ ...filters, dateRange: value });
    }
  };

  const applyFilters = (customerList = customers) => {
    return customerList.filter(customer => {
      const matchesSegment =
        (filters.segments.premium && customer.segment === 'Premium') ||
        (filters.segments.wholesale && customer.segment === 'Wholesale') ||
        (filters.segments.retail && customer.segment === 'Retail');

      const matchesFrequency =
        filters.orderFrequency === 'All' ||
        (filters.orderFrequency === 'Daily' && new Date(customer.lastOrder).toDateString() === new Date().toDateString()) ||
        (filters.orderFrequency === 'Weekly' && new Date(customer.lastOrder).getWeek() === new Date().getWeek()) ||
        (filters.orderFrequency === 'Monthly' && new Date(customer.lastOrder).getMonth() === new Date().getMonth());

      const matchesDateRange =
        (!filters.dateRange.start || new Date(customer.lastOrder) >= new Date(filters.dateRange.start)) &&
        (!filters.dateRange.end || new Date(customer.lastOrder) <= new Date(filters.dateRange.end));

      return matchesSegment && matchesFrequency && matchesDateRange;
    });
  };

  const handleFilterClick = () => {
    const filtered = applyFilters();
    setFilteredCustomers(filtered);
    alert('Filters applied successfully!');
  };

  const handleNotificationClick = () => {
    if (!showNotifications) {
      const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updatedNotifications);
    }
    setShowNotifications(!showNotifications);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const displayedCustomers = filteredCustomers || customers;

  const handleEditCustomer = (customerId) => {
    const updatedName = prompt('Enter new name for customer:', customers.find(c => c.id === customerId).name);
    if (updatedName) {
      const updatedCustomers = customers.map(c => 
        c.id === customerId ? { ...c, name: updatedName } : c
      );
      setCustomers(updatedCustomers);
      if (filteredCustomers) {
        setFilteredCustomers(applyFilters(updatedCustomers));
      }
      alert('Customer updated successfully!');
    }
  };

  const handleViewCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    alert(`Viewing details for ${customer.name}:\nID: ${customer.id}\nContact: ${customer.contact}\nLast Order: ${customer.lastOrder}\nSegment: ${customer.segment}\nStatus: ${customer.status}\nAmount: ${customer.amount}`);
  };

  Date.prototype.getWeek = function() {
    const date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return Math.round(((date - week1) / 86400000 + 1) / 7);
  };

  const navigate = useNavigate();

  return (
    <div className="customers-page">
      <header className="customer-header">
        <div className="customer-header-top">
          <div className="customer-logo">
          <img src={logo} alt="RiceMillPro Logo" />
          </div>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
          </button>
          <div className="customer-header-actions">
            <div className="customer-header-top-item">
              <button className="customer-sync-btn" onClick={handleSyncData}>
                <FaSyncAlt className="customer-header-icon" /> Sync Data
              </button>
            </div>
            <div className="customer-header-top-item">
              <button className="customer-add-customer-btn" onClick={() => setShowAddModal(true)}>
                <FaUserPlus /> Add Customer
              </button>
            </div>
            <div className="customer-header-top-item">
              <label className="customer-import-btn">
                <FaFileImport /> Import
                <input type="file" accept=".csv" onChange={handleImportCSV} hidden />
              </label>
            </div>
            <div className="customer-header-top-item">
              <div className="customer-notification" onClick={handleNotificationClick}>
                <FaBell className="customer-header-icon black" />
                {unreadNotificationsCount > 0 && (
                  <span className="customer-badge">{unreadNotificationsCount}</span>
                )}
              </div>
              {showNotifications && (
                <div className="customer-notification-dropdown">
                  <h4>Notifications</h4>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="customer-notification-item">
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
          </div>
        </div>
        <h1>Customer Relationship Management</h1>
      </header>

      {showAddModal && (
        <div className="customer-modal-overlay">
          <div className="customer-modal">
            <div className="customer-modal-header">
              <h2>Add New Customer</h2>
              <button className="customer-close-btn" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="customer-modal-body">
              <div className="customer-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Enter customer name"
                />
              </div>
              <div className="customer-form-group">
                <label>Contact</label>
                <input
                  type="text"
                  value={newCustomer.contact}
                  onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
                  placeholder="Enter email or phone"
                />
              </div>
              <div className="customer-form-group">
                <label>Segment</label>
                <select
                  value={newCustomer.segment}
                  onChange={(e) => setNewCustomer({ ...newCustomer, segment: e.target.value })}
                >
                  <option value="Premium">Premium</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
              <div className="customer-form-group">
                <label>Status</label>
                <select
                  value={newCustomer.status}
                  onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="customer-modal-footer">
              <button className="customer-cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="customer-save-btn" onClick={handleAddCustomer}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="customer-cards">
        <div className="customer-card">
          <div className="customer-card-content">
            <FaUsers className="customer-card-icon" />
            <div className="customer-card-text">
              <h3>Total Customers</h3>
              <p>2,651</p>
              <span className="customer-trend up">↑ 12%</span>
            </div>
          </div>
        </div>
        <div className="customer-card">
          <div className="customer-card-content">
            <FaDollarSign className="customer-card-icon" />
            <div className="customer-card-text">
              <h3>Average Order Value</h3>
              <p>LKR 90,000</p>
              <span className="customer-trend up">↑ 8.2%</span>
            </div>
          </div>
        </div>
        <div className="customer-card">
          <div className="customer-card-content">
            <FaStar className="customer-card-icon" />
            <div className="customer-card-text">
              <h3>Premium Customers</h3>
              <p>824</p>
              <span className="customer-trend up">↑ 4.5%</span>
            </div>
          </div>
        </div>
        <div className="customer-card">
          <div className="customer-card-content">
            <FaChartLine className="customer-card-icon" />
            <div className="customer-card-text">
              <h3>Monthly Growth</h3>
              <p>+12.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="customer-content">
        <div className="customer-segments">
          <h3>Customer Segments</h3>
          <div className="customer-pie-chart-container">
            <Pie
              data={customerSegmentsData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
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
        <div className="customer-insights">
          <h3>Insights</h3>
          <div className="customer-insight-item">
            <FaChartPie className="customer-insight-icon" />
            <div className="customer-insight-text">
              <h4>Premium segment</h4>
              <p>Accounts for 30% of total revenue</p>
            </div>
          </div>
          <div className="customer-insight-item">
            <FaChartPie className="customer-insight-icon" />
            <div className="customer-insight-text">
              <h4>Growth trend</h4>
              <p>15% increase in wholesale customers</p>
            </div>
          </div>
          <div className="customer-insight-item">
            <FaChartPie className="customer-insight-icon" />
            <div className="customer-insight-text">
              <h4>Customer retention</h4>
              <p>85% retention rate in Q3 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="customer-list-section">
        <div className="customer-filters">
          <h3>Filters</h3>
          <div className="customer-filter-item">
            <h4>Segments</h4>
            <label>
              <input
                type="checkbox"
                checked={filters.segments.premium}
                onChange={() => handleFilterChange('segments', 'premium')}
              /> Premium
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.segments.wholesale}
                onChange={() => handleFilterChange('segments', 'wholesale')}
              /> Wholesale
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.segments.retail}
                onChange={() => handleFilterChange('segments', 'retail')}
              /> Retail
            </label>
          </div>
          <div className="customer-filter-item">
            <h4>Order Frequency</h4>
            <select
              value={filters.orderFrequency}
              onChange={(e) => handleFilterChange('orderFrequency', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="customer-filter-item">
            <h4>Date Range</h4>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) =>
                handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })
              }
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) =>
                handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })
              }
            />
          </div>
          <div className="customer-filter-actions">
            <button className="customer-filter-btn" onClick={handleFilterClick}>
              <FaFilter /> Filter
            </button>
            <button className="customer-export-btn" onClick={handleExport}>
              <FaDownload /> Export
            </button>
          </div>
        </div>
        <div className="customer-list">
          <h3>Customer List</h3>
          <table className="customer-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Last Order</th>
                <th>Segment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer, index) => (
                <tr key={index}>
                  <td>
                    {customer.name} <br /> ID: {customer.id}
                  </td>
                  <td>{customer.contact}</td>
                  <td>{customer.lastOrder}</td>
                  <td>
                    <span className={`customer-segment ${customer.segment.toLowerCase()}`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td>
                    <span className={`customer-status ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button className="customer-action-btn edit" onClick={() => handleEditCustomer(customer.id)}>
                      <FaEdit />
                    </button>
                    <button className="customer-action-btn view" onClick={() => handleViewCustomer(customer.id)}>
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;