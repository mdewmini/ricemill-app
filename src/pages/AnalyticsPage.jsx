import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaDollarSign, FaWarehouse, FaSmile, FaChartLine, FaFilePdf, FaFileCsv, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import '../styles/AnalyticsPage.css';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, ArcElement);

const AnalyticsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('last-12');
  const [showReportModal, setShowReportModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  if (!user || user.role !== 'mill_owner') {
    navigate('/dashboard');
    return null;
  }

  // Monthly Sales Overview Data (Dynamic based on time filter)
  const getSalesTrendData = () => {
    let labels, data;
    if (timeFilter === 'last-3') {
      labels = ['Oct', 'Nov', 'Dec'];
      data = [2800000, 3000000, 3200000];
    } else if (timeFilter === 'last-6') {
      labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [2400000, 2600000, 2300000, 2800000, 3000000, 3200000];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [1500000, 1200000, 1800000, 2000000, 2200000, 1900000, 2400000, 2600000, 2300000, 2800000, 3000000, 3200000];
    }

    return {
      labels,
      datasets: [
        {
          label: 'Sales (LKR)',
          data,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    };
  };

  // Customer Satisfaction Data
  const customerSatisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'],
    datasets: [
      {
        data: [50, 30, 15, 5],
        backgroundColor: ['#4caf50', '#81c784', '#ffd700', '#ff0000'],
      },
    ],
  };

  // Inventory Turnover Data
  const inventoryTurnoverData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Inventory Turnover (Units)',
        data: [300, 450, 600, 750, 900],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  // Generate New Report
  const handleGenerateReport = () => {
    const report = {
      id: Date.now(),
      title: `Sales Report - ${new Date().toLocaleDateString()}`,
      summary: `Total Sales: LKR ${getSalesTrendData().datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}`,
      details: getSalesTrendData().labels.map((label, index) => ({
        month: label,
        sales: getSalesTrendData().datasets[0].data[index],
      })),
    };
    setGeneratedReport(report);
    setShowReportModal(true);
  };

  // Export as CSV
  const handleExportCSV = () => {
    const csvContent = [
      ['Month', 'Sales (LKR)'],
      ...getSalesTrendData().labels.map((label, index) => [
        label,
        getSalesTrendData().datasets[0].data[index],
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sales_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export as PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Sales Analytics Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.setFontSize(14);
    doc.text('Monthly Sales Overview', 20, 50);

    getSalesTrendData().labels.forEach((label, index) => {
      doc.text(
        `${label}: LKR ${getSalesTrendData().datasets[0].data[index].toLocaleString()}`,
        20,
        60 + index * 10
      );
    });

    doc.save('sales_analytics.pdf');
  };

  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <div className="analytics-logo">LOGO</div>
        <nav className="analytics-nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="analytics-nav-active">Analytics</button>
          <button onClick={() => navigate('/reports')}>Reports</button>
        </nav>
        <button className="analytics-new-report-btn" onClick={handleGenerateReport}>
          New Report
        </button>
      </header>
      <main className="analytics-content">
        <h1>Analytics Dashboard</h1>
        <div className="analytics-cards">
          <div className="analytics-card">
            <div className="analytics-card-icon"><FaDollarSign style={{ color: '#4caf50' }} /></div>
            <div className="analytics-card-content">
              <h3>Today's Sales</h3>
              <p>LKR 24,567</p>
              <span className="analytics-trend analytics-trend-up">↑ 12%</span>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-card-icon"><FaWarehouse style={{ color: '#4caf50' }} /></div>
            <div className="analytics-card-content">
              <h3>Active Inventory</h3>
              <p>1,234 Units</p>
              <span className="analytics-trend analytics-trend-down">↓ 3%</span>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-card-icon"><FaSmile style={{ color: '#4caf50' }} /></div>
            <div className="analytics-card-content">
              <h3>Customer Satisfaction</h3>
              <p>92% Positive</p>
              <span className="analytics-trend analytics-trend-up">↑ 5%</span>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-card-icon"><FaChartLine style={{ color: '#4caf50' }} /></div>
            <div className="analytics-card-content">
              <h3>Growth Index</h3>
              <p>15.7%</p>
              <span className="analytics-trend analytics-trend-up">↑ 2.3%</span>
            </div>
          </div>
        </div>
        <div className="analytics-charts">
          <div className="analytics-chart analytics-sales-trend">
            <h3>Monthly Sales Overview</h3>
            <p>A monthly view of sales performance over the selected period.</p>
            <select
              className="analytics-time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="last-12">Last 12 Months</option>
              <option value="last-6">Last 6 Months</option>
              <option value="last-3">Last 3 Months</option>
            </select>
            <div className="analytics-chart-container">
              <Line
                data={getSalesTrendData()}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Sales: LKR ${context.raw.toLocaleString()}`,
                      },
                    },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: {
                      grid: { color: '#e0e0e0' },
                      ticks: {
                        callback: (value) => `LKR ${value.toLocaleString()}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="analytics-chart analytics-customer-satisfaction">
            <h3>Customer Satisfaction</h3>
            <div className="analytics-pie-chart-container">
              <Pie
                data={customerSatisfactionData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <div className="analytics-satisfaction-labels">
              {customerSatisfactionData.labels.map((label, index) => (
                <div key={index} className="analytics-satisfaction-label">
                  <span
                    className="analytics-satisfaction-color"
                    style={{ backgroundColor: customerSatisfactionData.datasets[0].backgroundColor[index] }}
                  ></span>
                  <span>{label}: {customerSatisfactionData.datasets[0].data[index]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="analytics-bottom-section">
          <div className="analytics-predictive-insights">
            <h3>Predictive Insights</h3>
            <div className="analytics-insight analytics-insight-recommendation">
              <div className="analytics-insight-icon">💡</div>
              <div className="analytics-insight-content">
                <h4>Recommendation</h4>
                <p>Increase production by 15% for next quarter based on current trends.</p>
              </div>
            </div>
            <div className="analytics-insight analytics-insight-growth-opportunity">
              <div className="analytics-insight-icon">📈</div>
              <div className="analytics-insight-content">
                <h4>Growth Opportunity</h4>
                <p>Customer retention rate shows potential for 20% growth in repeat purchases.</p>
              </div>
            </div>
          </div>
          <div className="analytics-export-options">
            <h3>Export Options</h3>
            <button className="analytics-export-btn analytics-export-btn-pdf" onClick={handleExportPDF}>
              <FaFilePdf /> Export as PDF
            </button>
            <button className="analytics-export-btn analytics-export-btn-csv" onClick={handleExportCSV}>
              <FaFileCsv /> Export as CSV
            </button>
          </div>
          <div className="analytics-chart analytics-inventory-turnover">
            <h3>Inventory Turnover</h3>
            <div className="analytics-chart-container">
              <Line
                data={inventoryTurnoverData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: '#e0e0e0' } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {showReportModal && (
        <div className="analytics-report-modal">
          <div className="analytics-report-modal-content">
            <div className="analytics-report-modal-header">
              <h2>Generated Report</h2>
              <button className="analytics-close-btn" onClick={() => setShowReportModal(false)}>
                <FaTimes />
              </button>
            </div>
            {generatedReport ? (
              <div className="analytics-report-details">
                <h3>{generatedReport.title}</h3>
                <p><strong>Summary:</strong> {generatedReport.summary}</p>
                <h4>Details:</h4>
                <ul>
                  {generatedReport.details.map((detail, index) => (
                    <li key={index}>
                      {detail.month}: LKR {detail.sales.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No report generated.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;