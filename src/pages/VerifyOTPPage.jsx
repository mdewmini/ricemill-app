import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/VerifyOTPPage.css';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const { state } = useLocation();
  const { phoneNumber } = state || {};
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp === '9876') {
      if (user) {
        login({ ...user, isVerified: true });
        navigate('/verify-success');
      } else {
        alert('User data not found. Please login again.');
        navigate('/login');
      }
    } else {
      alert('Invalid OTP');
    }
  };

  const handleResend = () => {
    console.log('Resending OTP to:', phoneNumber);
  };

  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">
        <div className="verify-otp-form">
          <h1>Verify Your Phone Number</h1>
          <p>
            We have sent you an SMS with a code to number{' '}
            <strong>{phoneNumber || '+94 0123456789'}</strong>.
          </p>
          <div className="phone-number">
            <img src="https://flagcdn.com/w20/lk.png" alt="Sri Lanka Flag" />
            <span>+94 {phoneNumber || '0123456789'}</span>
          </div>
          <form onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            <button type="submit" className="verify-btn">
              Verify
            </button>
          </form>
          <p>
            Didn't receive the OTP?{' '}
            <button className="resend-link" onClick={handleResend}>
              Resend
            </button>
          </p>
        </div>
      </div>
      <div className="verify-otp-image">
        <h2>Welcome Back!</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default VerifyOTPPage;


