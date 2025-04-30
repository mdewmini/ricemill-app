/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    
    console.log('Sending OTP to:', phoneNumber);
    navigate('/verify-otp', { state: { phoneNumber } });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form">npm run dev
          <h1>Sign Up</h1>
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
          <form onSubmit={handleSignUp}>
            <div className="form-groups">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            <button type="submit" className="signup-btn">
              Sign Up as {role}
            </button>
          </form>
          <p>
            Or <br />
            Already Registered?{' '}
            <button className="login-link" onClick={handleLoginRedirect}>
              Login
            </button>
          </p>
        </div>
      </div>
      <div className="signup-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default SignUpPage;*/





import React, { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import axios from 'axios';
   import '../styles/SignUpPage.css';

   const SignUpPage = () => {
       const [firstName, setFirstName] = useState('');
       const [lastName, setLastName] = useState('');
       const [phoneNumber, setPhoneNumber] = useState('');
       const [role, setRole] = useState('Admin');
       const navigate = useNavigate();

       const handleSignUp = async (e) => {
           e.preventDefault();

           try {
               const response = await axios.post('http://localhost:5001/api/auth/register', {
                   firstName,
                   lastName,
                   phoneNumber,
                   role
               });

               navigate('/verify-otp', { state: { phoneNumber, role, action: 'signup', otp: response.data.otp } });
           } catch (err) {
               console.error(err);
               alert('Sign up failed');
           }
       };

       const handleLoginRedirect = () => {
           navigate('/login');
       };

       return (
           <div className="signup-page">
               <div className="signup-container">
                   <div className="signup-form">
                       <h1>Sign Up</h1>
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
                       <form onSubmit={handleSignUp}>
                           <div className="form-groups">
                               <label htmlFor="firstName">First Name</label>
                               <input
                                   type="text"
                                   id="firstName"
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   required
                               />
                           </div>
                           <div className="form-groups">
                               <label htmlFor="lastName">Last Name</label>
                               <input
                                   type="text"
                                   id="lastName"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
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
                           <button type="submit" className="signup-btn">
                               Sign Up as {role}
                           </button>
                       </form>
                       <p>
                           Or <br />
                           Already Registered?{' '}
                           <button className="login-link" onClick={handleLoginRedirect}>
                               Login
                           </button>
                       </p>
                   </div>
               </div>
               <div className="signup-image">
                   <h2>Welcome Back!</h2>
                   <p>Login to access your account</p>
               </div>
           </div>
       );
   };

   export default SignUpPage;





  