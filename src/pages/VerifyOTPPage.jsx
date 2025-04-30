/*import React, { useState } from 'react';
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

export default VerifyOTPPage;*/







/*import React, { useState, useEffect } from 'react';
   import { useLocation, useNavigate } from 'react-router-dom';
   import axios from 'axios';
   import '../styles/VerifyOTPPage.css';

   const VerifyOTPPage = () => {
       const location = useLocation();
       const navigate = useNavigate();
       const { phoneNumber, role, action } = location.state || {};
       const [otp, setOtp] = useState(['', '', '', '']);
       const [displayedOtp, setDisplayedOtp] = useState('');
       const [error, setError] = useState('');

       useEffect(() => {
           if (location.state && location.state.otp) {
               setDisplayedOtp(location.state.otp);
           }
       }, [location.state]);

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

       const handleKeyDown = (index, e) => {
           if (e.key === 'Backspace' && !otp[index] && index > 0) {
               document.getElementById(`otp-${index - 1}`).focus();
           }
       };

       const handleVerify = async (e) => {
           e.preventDefault();
           const enteredOtp = otp.join('');
           try {
               const response = await axios.post('http://localhost:5001/api/auth/verify-otp', {
                   phoneNumber,
                   otp: enteredOtp,
                   role,
                   action
               });

               navigate('/verify-success', { state: { role } });
           } catch (err) {
               setError('Invalid OTP');
           }
       };

       const handleResend = async () => {
           try {
               const response = await axios.post('http://localhost:5001/api/auth/resend-otp', {
                   phoneNumber,
                   role,
                   action
               });
               setDisplayedOtp(response.data.otp);
               setError('');
           } catch (err) {
               setError('Failed to resend OTP');
           }
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
                       {displayedOtp && (
                           <p style={{ color: 'green', fontWeight: 'bold' }}>
                               Your OTP is: {displayedOtp}
                           </p>
                       )}
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
                                       onKeyDown={(e) => handleKeyDown(index, e)}
                                       required
                                   />
                               ))}
                           </div>
                           {error && <p className="error">{error}</p>}
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

   export default VerifyOTPPage;*/







   import React, { useState, useEffect } from 'react';
   import { useLocation, useNavigate } from 'react-router-dom';
   import axios from 'axios';
   import '../styles/VerifyOTPPage.css';
   import { useAuth } from '../context/AuthContext';

   const VerifyOTPPage = () => {
       const { user } = useAuth();
       const location = useLocation();
       const navigate = useNavigate();
       const { phoneNumber, role, action } = location.state || {};
       const [otp, setOtp] = useState(['', '', '', '']);
       const [displayedOtp, setDisplayedOtp] = useState('');
       const [error, setError] = useState('');

       useEffect(() => {
           if (location.state && location.state.otp) {
               setDisplayedOtp(location.state.otp);
           }
       }, [location.state]);

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

       const handleKeyDown = (index, e) => {
           if (e.key === 'Backspace' && !otp[index] && index > 0) {
               document.getElementById(`otp-${index - 1}`).focus();
           }
       };

       const handleVerify = async (e) => {
           e.preventDefault();
           const enteredOtp = otp.join('');
           try {
               const response = await axios.post('http://localhost:5001/api/auth/verify-otp', {
                   phoneNumber,
                   otp: enteredOtp,
                   role,
                   action
               });

               // Pass user state to verify-success page
               navigate('/verify-success', { state: { role, user } });
           } catch (err) {
               setError('Invalid OTP');
           }
       };

       const handleResend = async () => {
           try {
               const response = await axios.post('http://localhost:5001/api/auth/resend-otp', {
                   phoneNumber,
                   role,
                   action
               });
               setDisplayedOtp(response.data.otp);
               setError('');
           } catch (err) {
               setError('Failed to resend OTP');
           }
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
                       {displayedOtp && (
                           <p style={{ color: 'green', fontWeight: 'bold' }}>
                               Your OTP is: {displayedOtp}
                           </p>
                       )}
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
                                       onKeyDown={(e) => handleKeyDown(index, e)}
                                       required
                                   />
                               ))}
                           </div>
                           {error && <p className="error">{error}</p>}
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