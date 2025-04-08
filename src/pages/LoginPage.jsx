import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleLogin = (e) => {
    e.preventDefault();
    // Create user data with role
    const userData = {
      username,
      phoneNumber,
      role: role === 'Admin' ? 'mill_owner' : 'customer', // Map role to mill_owner or customer
      isVerified: false, // Initially not verified
    };
    // Store user data in AuthContext
    login(userData);
    // Simulate sending OTP (In a real app, you'd call an API to send OTP)
    console.log('Sending OTP to:', phoneNumber);
    navigate('/verify-otp', { state: { phoneNumber } });
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1>Login to RiceMill</h1>
          <div className="role-selection">
            <button
              className={role === 'Admin' ? 'active' : ''}
              onClick={() => setRole('Admin')}
            >
              Admin
            </button>
            <button
              className={role === 'Customer' ? 'active' : ''}
              onClick={() => setRole('Customer')}
            >
              Customer
            </button>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-groups">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login as {role}
            </button>
          </form>
          <p>
            Don't have an account?{' '}
            <button className="signup-link" onClick={handleSignUpRedirect}>
              Sign up
            </button>
          </p>
        </div>
      </div>
      <div className="login-image">
        <h2>Welcome Back!</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default LoginPage;