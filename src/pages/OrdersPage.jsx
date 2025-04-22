import React from 'react';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
  const orders = [
    { id: '#12345', customer: 'Maheesa Thambawita', status: 'Delivered', amount: 'LKR 3200.00' },
    { id: '#12344', customer: 'Maheesa Thambawita', status: 'Processing', amount: 'LKR 1500.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
    { id: '#12341', customer: 'Nimal Perera', status: 'Delivered', amount: 'LKR 5000.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
    { id: '#12341', customer: 'Nimal Perera', status: 'Delivered', amount: 'LKR 5000.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
    { id: '#12342', customer: 'Ranjith Weerasinghe', status: 'Delivered', amount: 'LKR 3000.00' },
    { id: '#12341', customer: 'Nimal Perera', status: 'Delivered', amount: 'LKR 5000.00' },
    { id: '#12343', customer: 'Yasas Dinusha', status: 'Shipped', amount: 'LKR 4500.00' },
  ];

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>All Orders</h1>
      </div>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    <span className="status-bar"></span>
                    <span className="status-text">{order.status}</span>
                  </span>
                </td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;

