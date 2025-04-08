import React, { useState } from 'react';
import { FaBoxOpen, FaChartLine, FaTrash, FaEdit, FaSyncAlt, FaBell, FaUser, FaWarehouse, FaChartBar, FaClock, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/InventoryPage.css';

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([
    { name: 'Basmati Rice', type: 'Rice', quantity: 2500, unit: 'kg', status: 'Healthy', lastUpdated: '2025-01-20' },
    { name: 'White Rice', type: 'Rice', quantity: 150, unit: 'kg', status: 'Low Stock', lastUpdated: '2025-01-19' },
    { name: 'Brown Rice', type: 'Rice', quantity: 800, unit: 'kg', status: 'Medium', lastUpdated: '2025-01-18' },
  ]);

  const [inventoryHistory, setInventoryHistory] = useState([
    { date: '2025-01-20 14:30', action: 'Added', item: 'Basmati Rice', quantity: '+1,000 kg', user: 'Maheesa Thambawita' },
    { date: '2025-01-19 11:15', action: 'Removed', item: 'White Rice', quantity: '-500 kg', user: 'Yasas Dinusha' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('All Time');

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Low stock alert for White Rice', date: '2025-01-19', read: false },
    { id: 2, message: 'Pending update for Basmati Rice', date: '2025-01-20', read: false },
  ]);

  // Modal State for Add Stock
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [newStock, setNewStock] = useState({
    name: '',
    type: 'Rice',
    quantity: '',
    unit: 'kg',
    status: 'Healthy',
  });

  // Add Stock Functionality with Modal
  const handleAddStock = () => {
    setShowAddStockModal(true); // Open modal instead of adding directly
  };

  const handleSaveStock = () => {
    if (!newStock.name || !newStock.quantity) {
      alert('Please fill in all required fields!');
      return;
    }

    const newItem = {
      name: newStock.name,
      type: newStock.type,
      quantity: parseInt(newStock.quantity),
      unit: newStock.unit,
      status: newStock.status,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setInventoryItems([...inventoryItems, newItem]);

    const newHistory = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      action: 'Added',
      item: newStock.name,
      quantity: `+${newStock.quantity} ${newStock.unit}`,
      user: 'Admin',
    };
    setInventoryHistory([newHistory, ...inventoryHistory]);

    // Add notification
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: `New stock added: ${newStock.name}`,
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);

    // Reset and close modal
    setNewStock({ name: '', type: 'Rice', quantity: '', unit: 'kg', status: 'Healthy' });
    setShowAddStockModal(false);
  };

  // Add New Item via Actions Column (unchanged)
  const handleAddNewItem = () => {
    const newName = prompt('Enter new item name:');
    const newType = prompt('Enter item type (e.g., Rice, Paddy):');
    const newQuantity = prompt('Enter quantity (e.g., 1000):');
    const newUnit = prompt('Enter unit (e.g., kg):');
    const newStatus = prompt('Enter status (Healthy, Low Stock, Medium):');

    if (newName && newType && newQuantity && newUnit && newStatus) {
      const newItem = {
        name: newName,
        type: newType,
        quantity: parseInt(newQuantity),
        unit: newUnit,
        status: newStatus,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setInventoryItems([...inventoryItems, newItem]);

      const newHistory = {
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        action: 'Added',
        item: newName,
        quantity: `+${newQuantity} ${newUnit}`,
        user: 'Admin',
      };
      setInventoryHistory([newHistory, ...inventoryHistory]);

      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          message: `New item added: ${newName}`,
          date: new Date().toISOString().split('T')[0],
          read: false,
        },
      ]);
    }
  };

  // Export Functionality
  const handleExport = () => {
    const csvContent = [
      ['Item Name', 'Type', 'Quantity', 'Unit', 'Status', 'Last Updated'],
      ...inventoryItems.map(item => [
        item.name,
        item.type,
        item.quantity,
        item.unit,
        item.status,
        item.lastUpdated,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'inventory_stock.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Edit Item Functionality
  const handleEdit = (index) => {
    const newName = prompt('Enter new item name:', inventoryItems[index].name);
    if (newName) {
      const updatedItems = [...inventoryItems];
      updatedItems[index].name = newName;
      setInventoryItems(updatedItems);
    }
  };

  // Delete Item Functionality
  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const deletedItem = inventoryItems[index];
      const updatedItems = inventoryItems.filter((_, i) => i !== index);
      setInventoryItems(updatedItems);

      const newHistory = {
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        action: 'Removed',
        item: deletedItem.name,
        quantity: `-${deletedItem.quantity} ${deletedItem.unit}`,
        user: 'Admin',
      };
      setInventoryHistory([newHistory, ...inventoryHistory]);

      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          message: `Item removed: ${deletedItem.name}`,
          date: new Date().toISOString().split('T')[0],
          read: false,
        },
      ]);
    }
  };

  // Pagination Functionality
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(inventoryHistory.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Filter Inventory Items
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All Types' || item.type === selectedType;
    const matchesTimePeriod = () => {
      const itemDate = new Date(item.lastUpdated);
      const today = new Date();
      if (selectedTimePeriod === 'Last 7 days') {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return itemDate >= sevenDaysAgo && itemDate <= today;
      } else if (selectedTimePeriod === 'Last 30 days') {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return itemDate >= thirtyDaysAgo && itemDate <= today;
      }
      return true; // All Time
    };
    return matchesSearch && matchesType && matchesTimePeriod();
  });

  // Paginated History Data
  const paginatedHistory = inventoryHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sync Data Functionality
  const handleSyncData = () => {
    console.log('Syncing data...');
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: 'Inventory data synced successfully',
        date: new Date().toISOString().split('T')[0],
        read: false,
      },
    ]);
    alert('Data synced successfully!');
  };

  // Notification Click Handler
  const handleNotificationClick = () => {
    if (!showNotifications) {
      const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updatedNotifications);
    }
    setShowNotifications(!showNotifications);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const navigate = useNavigate(); 

  return (
    <div className="inventory-page">
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="inventory-header">
          <div className="header-top">
            <div className="header-left">
              <div className="logo">LOGO</div>
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
          <h1>Inventory Overview</h1>
        </header>

        {/* Add Stock Modal */}
        {showAddStockModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Stock</h2>
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={newStock.name}
                  onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newStock.type}
                  onChange={(e) => setNewStock({ ...newStock, type: e.target.value })}
                >
                  <option value="Rice">Rice</option>
                  <option value="Paddy">Paddy</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={newStock.quantity}
                  onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select
                  value={newStock.unit}
                  onChange={(e) => setNewStock({ ...newStock, unit: e.target.value })}
                >
                  <option value="kg">kg</option>
                  <option value="tons">tons</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newStock.status}
                  onChange={(e) => setNewStock({ ...newStock, status: e.target.value })}
                >
                  <option value="Healthy">Healthy</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowAddStockModal(false)}>Cancel</button>
                <button className="save-btn" onClick={handleSaveStock}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Cards */}
        <div className="inventory-cards">
          <div className="card">
            <div className="card-icon">
              <FaWarehouse />
            </div>
            <div className="card-content">
              <h3>Total Paddy Stock</h3>
              <p>24,500 kg</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaBoxOpen />
            </div>
            <div className="card-content">
              <h3>Total Rice Stock</h3>
              <p>18,750 kg</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaChartBar />
            </div>
            <div className="card-content centered">
              <h3>Low Stock Items</h3>
              <p>3</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <FaClock />
            </div>
            <div className="card-content centered">
              <h3>Pending Updates</h3>
              <p>5</p>
            </div>
          </div>
        </div>

        {/* Inventory Stock Table */}
        <div className="inventory-stock">
          <div className="table-header">
            <div>
              <h3>Inventory Stock</h3>
              <p>A list of all inventory items including their current stock levels and status.</p>
            </div>
            <div className="table-actions">
              <button className="add-stock-btn" onClick={handleAddStock}>+ Add Stock</button>
              <button className="export-btn" onClick={handleExport}>Export</button>
            </div>
          </div>
          <div className="table-filters">
            <input
              type="text"
              placeholder="Search items..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-selector"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option>All Types</option>
              <option>Rice</option>
              <option>Paddy</option>
            </select>
            <select
              className="filter-selector"
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
            >
              <option>All Time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.lastUpdated}</td>
                  <td>
                    <button className="action-btn edit" onClick={() => handleEdit(index)}>
                      <FaEdit />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </button>
                    <button className="action-btn add" onClick={handleAddNewItem}>
                      <FaPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inventory History Table */}
        <div className="inventory-history">
          <h3>Inventory History</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Action</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistory.map((history, index) => (
                <tr key={index}>
                  <td>{history.date}</td>
                  <td>
                    <span className={`action ${history.action.toLowerCase()}`}>
                      {history.action}
                    </span>
                  </td>
                  <td>{history.item}</td>
                  <td>{history.quantity}</td>
                  <td>{history.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button className="pagination-btn" onClick={handlePrevious}>Previous</button>
            <button className="pagination-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;