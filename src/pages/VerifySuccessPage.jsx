/*import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/VerifySuccessPage.css';

const VerifySuccessPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.isVerified) {
      navigate('/login');
    } else {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <div className="verify-success-page">
      <div className="verify-success-container">
        <div className="verify-success-message">
          <div className="check-icon">✔</div>
          <h1>Verify successful</h1>
        </div>
      </div>
      <div className="verify-success-image">
        <h2>Welcome Back!</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default VerifySuccessPage;*/


/*import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/VerifySuccessPage.css';

const VerifySuccessPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.isVerified) {
      navigate('/login');
    } else {
      const timer = setTimeout(() => {
        if (user.role === 'customer') {
          navigate('/customer-home');
        } else {
          navigate('/dashboard');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <div className="verify-success-page">
      <div className="verify-success-container">
        <div className="verify-success-message">
          <div className="check-icon">✔</div>
          <h1>Verify successful</h1>
        </div>
      </div>
      <div className="verify-success-image">
        <h2>Welcome Back!</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default VerifySuccessPage;*/



/*import React, { useEffect } from 'react';
   import { useLocation, useNavigate } from 'react-router-dom';
   import '../styles/VerifySuccessPage.css';

   const VerifySuccessPage = () => {
       const navigate = useNavigate();
       const location = useLocation();
       const { role } = location.state || {};

       useEffect(() => {
           if (!role) {
               navigate('/login');
           } else {
               const timer = setTimeout(() => {
                   if (role === 'Customer') {
                       navigate('/customer-home');
                   } else {
                       navigate('/dashboard');
                   }
               }, 2000);
               return () => clearTimeout(timer);
           }
       }, [role, navigate]);

       return (
           <div className="verify-success-page">
               <div className="verify-success-container">
                   <div className="verify-success-message">
                       <div className="check-icon">✔</div>
                       <h1>Verify successful</h1>
                   </div>
               </div>
               <div className="verify-success-image">
                   <h2>Welcome Back!</h2>
                   <p>Login to access your account</p>
               </div>
           </div>
       );
   };

   export default VerifySuccessPage;*/




   import React, { useEffect } from 'react';
   import { useLocation, useNavigate } from 'react-router-dom';
   import '../styles/VerifySuccessPage.css';

   const VerifySuccessPage = () => {
       const navigate = useNavigate();
       const location = useLocation();
       const { role } = location.state || {};

       useEffect(() => {
           if (!role) {
               navigate('/login');
           } else {
               const timer = setTimeout(() => {
                   if (role === 'Customer') {
                       navigate('/customer-home');
                   } else {
                       navigate('/dashboard');
                   }
               }, 2000);
               return () => clearTimeout(timer);
           }
       }, [role, navigate]);

       return (
           <div className="verify-success-page">
               <div className="verify-success-container">
                   <div className="verify-success-message">
                       <div className="check-icon">✔</div>
                       <h1>Verify successful</h1>
                   </div>
               </div>
               <div className="verify-success-image">
                   <h2>Welcome Back!</h2>
                   <p>Login to access your account</p>
               </div>
           </div>
       );
   };

   export default VerifySuccessPage;