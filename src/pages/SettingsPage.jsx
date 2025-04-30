import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBell, FaUserPlus, FaEdit, FaTrash, FaCheckCircle, FaCamera, FaTimes, FaSort } from 'react-icons/fa';
import '../styles/SettingsPage.css';
import logo from '../assets/logo.png';


const SettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          profilePicture: 'src/assets/p-bg.avif'
}});
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: false,
  });
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', role: 'Admin', status: 'Active', profilePicture: 'src/assets/profile1.png' },
    { id: 2, name: 'Michael Brown', email: 'michael.brown@example.com', role: 'Editor', status: 'Active', profilePicture: 'src/assets/profile2.png' },
  ]);
  const [integrations, setIntegrations] = useState({
    paypal: true,
    twilio: false,
  });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Editor',
    status: 'Active',
    profilePicture: 'src/assets/p-bg.avif',
  });
  const [editUser, setEditUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const usersPerPage = 5;

  useEffect(() => {
    if (!user || user.role !== 'mill_owner') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    setProfile({ ...profile, profilePicture: 'src/assets/p-bg.avif' });
    setSuccessMessage('Profile picture deleted successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveProfile = () => {
    if (!profile.firstName || !profile.lastName || !profile.email || !profile.phone) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setSuccessMessage('Profile updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleNotificationToggle = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
    setSuccessMessage(
      `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${
        !notifications[type] ? 'enabled' : 'disabled'
      }`
    );
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleNewUserProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser({ ...newUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditUserProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser({ ...editUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', email: '', role: 'Editor', status: 'Active', profilePicture: 'src/assets/p-bg.avif' });
    setShowAddUserModal(false);
    setSuccessMessage('User added successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setShowEditUserModal(true);
  };

  const handleSaveEditUser = () => {
    if (!editUser.name || !editUser.email) {
      setSuccessMessage('Please fill in all fields');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setShowEditUserModal(false);
    setEditUser(null);
    setSuccessMessage('User updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    setSuccessMessage('User deleted successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleIntegrationToggle = (type) => {
    setIntegrations({ ...integrations, [type]: !integrations[type] });
    setSuccessMessage(
      integrations[type]
        ? `${type.charAt(0).toUpperCase() + type.slice(1)} disconnected successfully`
        : `${type.charAt(0).toUpperCase() + type.slice(1)} connected successfully`
    );
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSync = () => {
    setSuccessMessage('Data synced successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

 
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (!user || user.role !== 'mill_owner') {
    return null;
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <div className="settings-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <div className="settings-header-right">
          <button className="setting-dashboard-btn" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
          <button className="settings-synced-btn" onClick={handleSync}>
            <FaCheckCircle /> Synced
          </button>
          <div className="settings-user">
            <img src={profile.profilePicture} alt="User" className="settings-user-img" />
          </div>
        </div>
      </header>
      <div className="settings-container">
        <nav className="settings-sidebar">
          <button
            className={`settings-sidebar-btn ${
              activeSection === 'profile' ? 'settings-sidebar-btn-active' : ''
            }`}
            onClick={() => setActiveSection('profile')}
          >
            Profile Settings
          </button>
          <button
            className={`settings-sidebar-btn ${
              activeSection === 'notifications' ? 'settings-sidebar-btn-active' : ''
            }`}
            onClick={() => setActiveSection('notifications')}
          >
            Notifications
          </button>
          <button
            className={`settings-sidebar-btn ${
              activeSection === 'users' ? 'settings-sidebar-btn-active' : ''
            }`}
            onClick={() => setActiveSection('users')}
          >
            User Management
          </button>
          <button
            className={`settings-sidebar-btn ${
              activeSection === 'integrations' ? 'settings-sidebar-btn-active' : ''
            }`}
            onClick={() => setActiveSection('integrations')}
          >
            Integrations
          </button>
        </nav>
        <main className="settings-content">
          <section className="settings-section">
            <h2>Settings</h2>
            <p>Update your personal information and account settings.</p>

            {activeSection === 'profile' && (
              <div className="settings-profile-card">
                <h3>Profile Settings</h3>
                <div className="settings-profile-header">
                  <div className="settings-profile-img-container">
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="settings-profile-img"
                    />
                    <label className="settings-camera-icon">
                      <FaCamera />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button
                      className="settings-delete-img-btn"
                      onClick={handleDeleteProfilePicture}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div>
                    <h4>{`${profile.firstName} ${profile.lastName}`}</h4>
                  </div>
                </div>
                <div className="settings-profile-form">
                  <div className="settings-form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="settings-save-btn-container">
                  <button className="settings-save-btn" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="settings-notifications-card">
                <h3>Notification Preferences</h3>
                <p>Choose how you want to receive notifications.</p>
                <div className="settings-notifications">
                  <div className="settings-notification-item">
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your account activity.</p>
                    </div>
                    <label className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationToggle('email')}
                      />
                      <span className="settings-toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-notification-item">
                    <div>
                      <h4>SMS Notifications</h4>
                      <p>Get important alerts via text message.</p>
                    </div>
                    <label className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => handleNotificationToggle('sms')}
                      />
                      <span className="settings-toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-notification-item">
                    <div>
                      <h4>Push Notifications</h4>
                      <p>Receive push notifications on your device.</p>
                    </div>
                    <label className="settings-toggle">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => handleNotificationToggle('push')}
                      />
                      <span className="settings-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'users' && (
              <div className="settings-users-card">
                <div className="settings-section-header">
                  <div>
                    <h3>User Management</h3>
                    <p>Manage team members and their access levels.</p>
                  </div>
                  <button
                    className="settings-add-user-btn"
                    onClick={() => setShowAddUserModal(true)}
                  >
                    <FaUserPlus /> Add User
                  </button>
                </div>
                <div className="settings-search-bar">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <table className="settings-users-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('name')}>
                        User <FaSort />
                      </th>
                      <th onClick={() => handleSort('role')}>
                        Role <FaSort />
                      </th>
                      <th onClick={() => handleSort('status')}>
                        Status <FaSort />
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className="settings-user-info">
                            <img
                              src={u.profilePicture}
                              alt="User"
                              className="settings-user-img-small"
                            />
                            <div>
                              <p>{u.name}</p>
                              <p>{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`settings-role settings-role-${u.role.toLowerCase()}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span className="settings-status settings-status-active">
                            {u.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="settings-action-btn"
                            onClick={() => handleEditUser(u)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="settings-action-btn settings-action-delete"
                            onClick={() => handleDeleteUser(u.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="settings-pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <div className="settings-integrations-card">
                <h3>Integrations</h3>
                <p>Connect your account with other services.</p>
                <div className="settings-integrations">
                  <div className="settings-integration-item">
                    <div className="settings-integration-info">
                      <img
                        src="src/assets/paypal logo.png"
                        alt="Paypal"
                        className="settings-integration-icon"
                      />
                      <div>
                        <h4>Paypal</h4>
                        <p>Payment processing</p>
                      </div>
                    </div>
                    <button
                      className={`settings-integration-btn ${
                        integrations.paypal ? 'settings-integration-btn-connected' : ''
                      }`}
                      onClick={() => handleIntegrationToggle('paypal')}
                    >
                      {integrations.paypal ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                  <div className="settings-integration-item">
                    <div className="settings-integration-info">
                      <img
                        src="src/assets/Chat.png"
                        alt="Twilio"
                        className="settings-integration-icon"
                      />
                      <div>
                        <h4>Twilio</h4>
                        <p>SMS notifications</p>
                      </div>
                    </div>
                    <button
                      className={`settings-integration-btn ${
                        integrations.twilio ? 'settings-integration-btn-connected' : ''
                      }`}
                      onClick={() => handleIntegrationToggle('twilio')}
                    >
                      {integrations.twilio ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {showAddUserModal && (
        <div className="settings-modal">
          <div className="settings-modal-content">
            <div className="settings-modal-header">
              <h2>Add New User</h2>
              <button
                className="settings-close-btn"
                onClick={() => setShowAddUserModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="settings-modal-form">
              <div className="settings-profile-img-container">
                <img
                  src={newUser.profilePicture}
                  alt="Profile"
                  className="settings-profile-img"
                />
                <label className="settings-camera-icon">
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewUserProfilePictureChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="settings-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="settings-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div className="settings-form-group">
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="settings-form-group">
                <label>Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button className="settings-save-btn" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditUserModal && editUser && (
        <div className="settings-modal">
          <div className="settings-modal-content">
            <div className="settings-modal-header">
              <h2>Edit User</h2>
              <button
                className="settings-close-btn"
                onClick={() => setShowEditUserModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="settings-modal-form">
              <div className="settings-profile-img-container">
                <img
                  src={editUser.profilePicture}
                  alt="Profile"
                  className="settings-profile-img"
                />
                <label className="settings-camera-icon">
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditUserProfilePictureChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="settings-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                />
              </div>
              <div className="settings-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </div>
              <div className="settings-form-group">
                <label>Role</label>
                <select
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="settings-form-group">
                <label>Status</label>
                <select
                  value={editUser.status}
                  onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button className="settings-save-btn" onClick={handleSaveEditUser}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="settings-success-message">
          <FaCheckCircle /> {successMessage}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;







