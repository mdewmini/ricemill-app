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
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import CustomerHomePage from './pages/CustomerHomePage';
import CustomerProductsPage from './pages/CustomerProductsPage';
import CartPage from './pages/CartPage';
import CartSummaryPage from './pages/CartSummaryPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutConfirmationPage from './pages/CheckoutConfirmationPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import CustomerProfilePage from './pages/CustomerProfilePage';






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
          <Route path="/customers" element={<CustomersPage />} /> 
          <Route path="/new-orders" element={<NewOrdersPage />} />
          <Route path="/new-deliveries" element={<NewDeliveriesPage />} />
          <Route path="/new-reports" element={<NewReportsPage />} /> 
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/customer-home" element={<CustomerHomePage />} />
          <Route path="/products" element={<CustomerProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart-summary" element={<CartSummaryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout-confirmation" element={<CheckoutConfirmationPage />} />
          <Route path="/customer-orders" element={<CustomerOrdersPage/>} />
          <Route path="/profile" element={<CustomerProfilePage />} />

          
          
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;

