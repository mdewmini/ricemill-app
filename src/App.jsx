/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import VerifySuccessPage from './pages/VerifySuccessPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import InventoryPage from './pages/InventoryPage';
import DemandForecastingPage from './pages/DemandForecastingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/verify-success" element={<VerifySuccessPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/forecasting" element={<DemandForecastingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import VerifySuccessPage from './pages/VerifySuccessPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import InventoryPage from './pages/InventoryPage';
import DemandForecastingPage from './pages/DemandForecastingPage';
import CustomersPage from './pages/CustomersPage';
import NewOrdersPage from './pages/NewOrdersPage';
import NewDeliveriesPage from './pages/NewDeliveriesPage'; 
import NewReportsPage from './pages/NewReportsPage';
import AnalyticsPage from './pages/AnalyticsPage';



function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/verify-success" element={<VerifySuccessPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/forecasting" element={<DemandForecastingPage />} />
          <Route path="/customers" element={<CustomersPage />} /> {/* Ensure this route exists */}
          <Route path="/new-orders" element={<NewOrdersPage />} />
          <Route path="/new-deliveries" element={<NewDeliveriesPage />} /> {/* Add this route */}
          <Route path="/new-reports" element={<NewReportsPage />} /> {/* Add this route */}
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;

