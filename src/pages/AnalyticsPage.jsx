/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler } from 'chart.js';
import { FaDollarSign, FaWarehouse, FaSmile, FaChartLine, FaFilePdf, FaFileCsv, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import '../styles/AnalyticsPage.css';
import logo from '../assets/logo.png';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler);

const AnalyticsPage = () => {
  const { user, reports = [], setReports } = useAuth(); 
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('last-12');
  const [showReportModal, setShowReportModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  console.log('User:', user);
  console.log('Reports:', reports); 

  useEffect(() => {
    if (!user || user.role !== 'mill_owner') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const getSalesTrendData = () => {
    let labels, data;
    if (timeFilter === 'last-3') {
      labels = ['Oct', 'Nov', 'Dec'];
      data = [2800, 3000, 3200];
    } else if (timeFilter === 'last-6') {
      labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [2400, 2600, 2300, 2800, 3000, 3200];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [1500, 1200, 1800, 2000, 2200, 1900, 2400, 2600, 2300, 2800, 3000, 3200];
    }

    return {
      labels,
      datasets: [
        {
          label: 'Sales (LKR)',
          data,
          backgroundColor: '#5B6ACD',
          borderColor: '#5B6ACD',
          borderWidth: 1,
        },
      ],
    };
  };

  const customerSatisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'],
    datasets: [
      {
        data: [50, 30, 15, 5],
        backgroundColor: ['#5B6ACD', '#81C784', '#FFD700', '#FF0000'],
      },
    ],
  };

  const inventoryTurnoverData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Inventory Turnover (Units)',
        data: [300, 450, 600, 750, 900],
        borderColor: '#5B6ACD',
        backgroundColor: 'rgba(91, 106, 205, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const handleGenerateReport = () => {
    console.log('Generating report...'); 
    const report = {
      id: Date.now(),
      title: `Sales Report - ${new Date().toLocaleDateString()}`,
      summary: `Total Sales: ${getSalesTrendData().datasets[0].data.reduce((a, b) => a + b, 0)} LKR`,
      details: getSalesTrendData().labels.map((label, index) => ({
        month: label,
        sales: getSalesTrendData().datasets[0].data[index],
      })),
    };
    setGeneratedReport(report);
    console.log('New report:', report); 
    setReports([...reports, report]);
    console.log('Updated reports:', [...reports, report]); 
    setShowReportModal(true);
  };

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
        `${label}: ${getSalesTrendData().datasets[0].data[index]} LKR`,
        20,
        60 + index * 10
      );
    });

    doc.save('sales_analytics.pdf');
  };

  if (!user || user.role !== 'mill_owner') {
    return null;
  }

  return (
    <div className="analytics-figma-page">
      <header className="analytics-figma-header">
        <div className="analytics-figma-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="analytics-figma-nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="analytics-figma-nav-active">Analytics</button>
          <button onClick={() => navigate('/reports')}>Reports</button>
        </nav>
        <button className="analytics-figma-new-report-btn" onClick={handleGenerateReport}>
          New Report
        </button>
      </header>
      <main className="analytics-figma-content">
        <div className="analytics-figma-cards">
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaDollarSign /></div>
            <div className="analytics-figma-card-content">
              <h3>Today's Sales</h3>
              <p>LKR 24,567</p>
              <span className="analytics-figma-trend analytics-figma-trend-up">↑ 12%</span>
            </div>
          </div>
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaWarehouse /></div>
            <div className="analytics-figma-card-content">
              <h3>Active Inventory</h3>
              <p>1,234</p>
              <span className="analytics-figma-trend analytics-figma-trend-down">↓ 3%</span>
            </div>
          </div>
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaSmile /></div>
            <div className="analytics-figma-card-content">
              <h3>Customer Satisfaction</h3>
              <p>4.8/5.0</p>
              <span className="analytics-figma-trend analytics-figma-trend-up">↑ 0.2%</span>
            </div>
          </div>
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaChartLine /></div>
            <div className="analytics-figma-card-content">
              <h3>Growth Index</h3>
              <p>15.7%</p>
              <span className="analytics-figma-trend analytics-figma-trend-up">↑ 2.3%</span>
            </div>
          </div>
        </div>
        <div className="analytics-figma-charts">
          <div className="analytics-figma-chart analytics-figma-sales-trend">
            <h3>Monthly Sales Overview</h3>
            <p>A monthly view of sales performance over the past 12 months.</p>
            <select
              className="analytics-figma-time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="last-12">Last 12 Months</option>
              <option value="last-6">Last 6 Months</option>
              <option value="last-3">Last 3 Months</option>
            </select>
            <div className="analytics-figma-chart-container">
              <Bar
                data={getSalesTrendData()}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Sales: ${context.raw} LKR`,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: '#000' },
                    },
                    y: {
                      grid: { display: false },
                      ticks: {
                        color: '#000',
                        callback: (value) => `${value} LKR`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="analytics-figma-chart analytics-figma-customer-satisfaction">
            <h3>Customer Satisfaction</h3>
            <div className="analytics-figma-pie-chart-container">
              <Pie
                data={customerSatisfactionData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
            <div className="analytics-figma-satisfaction-labels">
              {customerSatisfactionData.labels.map((label, index) => (
                <div key={index} className="analytics-figma-satisfaction-label">
                  <span
                    className="analytics-figma-satisfaction-color"
                    style={{ backgroundColor: customerSatisfactionData.datasets[0].backgroundColor[index] }}
                  ></span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="analytics-figma-bottom-section">
          <div className="analytics-figma-predictive-insights">
            <h3>Predictive Insights</h3>
            <div className="analytics-figma-insight analytics-figma-insight-recommendation">
              <div className="analytics-figma-insight-icon">💡</div>
              <div className="analytics-figma-insight-content">
                <h4>Recommendation</h4>
                <p>Increase production by 15% for next quarter based on current trends.</p>
              </div>
            </div>
            <div className="analytics-figma-insight analytics-figma-insight-growth-opportunity">
              <div className="analytics-figma-insight-icon">📈</div>
              <div className="analytics-figma-insight-content">
                <h4>Growth Opportunity</h4>
                <p>Customer retention rate shows potential for 20% growth in repeat purchases.</p>
              </div>
            </div>
          </div>
          <div className="analytics-figma-export-options">
            <h3>Export Options</h3>
            <button className="analytics-figma-export-btn analytics-figma-export-btn-pdf" onClick={handleExportPDF}>
              <FaFilePdf /> Export as PDF
            </button>
            <button className="analytics-figma-export-btn analytics-figma-export-btn-csv" onClick={handleExportCSV}>
              <FaFileCsv /> Export as CSV
            </button>
          </div>
          <div className="analytics-figma-chart analytics-figma-inventory-turnover">
            <h3>Inventory Turnover</h3>
            <div className="analytics-figma-chart-container">
              <Line
                data={inventoryTurnoverData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: '#000' },
                    },
                    y: {
                      grid: { display: false },
                      ticks: { color: '#000' },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {showReportModal && (
        <div className="analytics-figma-report-modal">
          <div className="analytics-figma-report-modal-content">
            <div className="analytics-figma-report-modal-header">
              <h2>Generated Report</h2>
              <button className="analytics-figma-close-btn" onClick={() => setShowReportModal(false)}>
                <FaTimes />
              </button>
            </div>
            {generatedReport ? (
              <div className="analytics-figma-report-details">
                <h3>{generatedReport.title}</h3>
                <p><strong>Summary:</strong> {generatedReport.summary}</p>
                <h4>Details:</h4>
                <ul>
                  {generatedReport.details.map((detail, index) => (
                    <li key={index}>
                      {detail.month}: {detail.sales} LKR
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

export default AnalyticsPage;*/










import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler } from 'chart.js';
import { FaDollarSign, FaWarehouse, FaSmile, FaChartLine, FaFilePdf, FaFileCsv, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import '../styles/AnalyticsPage.css';
import logo from '../assets/logo.png';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler);

const AnalyticsPage = () => {
  const { user, reports = [], setReports } = useAuth();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('last-12');
  const [showReportModal, setShowReportModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'mill_owner') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const getSalesTrendData = () => {
    let labels, data;
    if (timeFilter === 'last-3') {
      labels = ['Oct', 'Nov', 'Dec'];
      data = [2800, 3000, 3200];
    } else if (timeFilter === 'last-6') {
      labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [2400, 2600, 2300, 2800, 3000, 3200];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [1500, 1200, 1800, 2000, 2200, 1900, 2400, 2600, 2300, 2800, 3000, 3200];
    }

    return {
      labels,
      datasets: [
        {
          label: 'Sales (LKR)',
          data,
          backgroundColor: '#5B6ACD',
          borderColor: '#5B6ACD',
          borderWidth: 1,
        },
      ],
    };
  };

  const customerSatisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'],
    datasets: [
      {
        data: [50, 30, 15, 5],
        backgroundColor: ['#5B6ACD', '#81C784', '#FFD700', '#FF0000'],
      },
    ],
  };

  const inventoryTurnoverData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Inventory Turnover (Units)',
        data: [300, 450, 600, 750, 900],
        borderColor: '#5B6ACD',
        backgroundColor: 'rgba(91, 106, 205, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const handleGenerateReport = () => {
    console.log('Generating report...');
    const report = {
      id: Date.now(),
      title: `Sales Report -741 ${new Date().toLocaleDateString()}`,
      summary: `Total Sales: ${getSalesTrendData().datasets[0].data.reduce((a, b) => a + b, 0)} LKR`,
      details: getSalesTrendData().labels.map((label, index) => ({
        month: label,
        sales: getSalesTrendData().datasets[0].data[index],
      })),
    };
    setGeneratedReport(report);
    console.log('New report:', report);
    setReports([...reports, report]);
    console.log('Updated reports:', [...reports, report]);
    setShowReportModal(true);
  };

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
        `${label}: ${getSalesTrendData().datasets[0].data[index]} LKR`,
        20,
        60 + index * 10
      );
    });

    doc.save('sales_analytics.pdf');
  };

  if (!user || user.role !== 'mill_owner') {
    return null;
  }

  return (
    <div className="analytics-figma-page">
      <header className="analytics-figma-header">
        <div className="analytics-figma-logo">
          <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="analytics-figma-nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="analytics-figma-nav-active">Analytics</button>
          <button onClick={() => navigate('/reports')}>Reports</button>
        </nav>
        <button className="analytics-figma-new-report-btn" onClick={handleGenerateReport}>
          New Report
        </button>
      </header>
      <main className="analytics-figma-content">
        <div className="analytics-figma-cards">
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaDollarSign /></div>
            <div className="analytics-figma-card-content">
              <h3>Today's Sales</h3>
              <p>LKR 24,567</p>
              <span className="analytics-figma-trend analytics-figma-trend-up">↑ 12%</span>
            </div>
          </div>
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaWarehouse /></div>
            <div className="analytics-figma-card-content">
              <h3>Active Inventory</h3>
              <p>1,234</p>
              <span className="analytics-figma-trend analytics-figma-trend-down">↓ 3%</span>
            </div>
          </div>
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaSmile /></div>
            <div className="analytics-figma-card-content">
              <h3>Customer Satisfaction</h3>
              <p>4.8/5.0</p>
              <span className="analytics-figma-trend analytics-figma-trend-up">↑ 0.2%</span>
            </div>
          </div>
          <div className="analytics-figma-card">
            <div className="analytics-figma-card-icon"><FaChartLine /></div>
            <div className="analytics-figma-card-content">
              <h3>Growth Index</h3>
              <p>15.7%</p>
              <span className="analytics-figma-trend analytics-figma-trend-up">↑ 2.3%</span>
            </div>
          </div>
        </div>
        <div className="analytics-figma-charts">
          <div className="analytics-figma-chart analytics-figma-sales-trend">
            <h3>Monthly Sales Overview</h3>
            <p>A monthly view of sales performance over the past 12 months.</p>
            <select
              className="analytics-figma-time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="last-12">Last 12 Months</option>
              <option value="last-6">Last 6 Months</option>
              <option value="last-3">Last 3 Months</option>
            </select>
            <div className="analytics-figma-chart-container">
              <Bar
                data={getSalesTrendData()}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Sales: ${context.raw} LKR`,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: '#000' },
                    },
                    y: {
                      grid: { display: false },
                      ticks: {
                        color: '#000',
                        callback: (value) => `${value} LKR`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="analytics-figma-chart analytics-figma-customer-satisfaction">
            <h3>Customer Satisfaction</h3>
            <div className="analytics-figma-pie-chart-container">
              <Pie
                data={customerSatisfactionData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
            <div className="analytics-figma-satisfaction-labels">
              {customerSatisfactionData.labels.map((label, index) => (
                <div key={index} className="analytics-figma-satisfaction-label">
                  <span
                    className="analytics-figma-satisfaction-color"
                    style={{ backgroundColor: customerSatisfactionData.datasets[0].backgroundColor[index] }}
                  ></span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="analytics-figma-bottom-section">
          <div className="analytics-figma-predictive-insights">
            <h3>Predictive Insights</h3>
            <div className="analytics-figma-insight analytics-figma-insight-recommendation">
              <div className="analytics-figma-insight-icon">💡</div>
              <div className="analytics-figma-insight-content">
                <h4>Recommendation</h4>
                <p>Increase production by 15% for next quarter based on current trends.</p>
              </div>
            </div>
            <div className="analytics-figma-insight analytics-figma-insight-growth-opportunity">
              <div className="analytics-figma-insight-icon">📈</div>
              <div className="analytics-figma-insight-content">
                <h4>Growth Opportunity</h4>
                <p>Customer retention rate shows potential for 20% growth in repeat purchases.</p>
              </div>
            </div>
          </div>
          <div className="analytics-figma-export-options">
            <h3>Export Options</h3>
            <button className="analytics-figma-export-btn analytics-figma-export-btn-pdf" onClick={handleExportPDF}>
              <FaFilePdf /> Export as PDF
            </button>
            <button className="analytics-figma-export-btn analytics-figma-export-btn-csv" onClick={handleExportCSV}>
              <FaFileCsv /> Export as CSV
            </button>
          </div>
          <div className="analytics-figma-chart analytics-figma-inventory-turnover">
            <h3>Inventory Turnover</h3>
            <div className="analytics-figma-chart-container">
              <Line
                data={inventoryTurnoverData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: '#000' },
                    },
                    y: {
                      grid: { display: false },
                      ticks: { color: '#000' },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {showReportModal && (
        <div className="analytics-figma-report-modal">
          <div className="analytics-figma-report-modal-content">
            <div className="analytics-figma-report-modal-header">
              <h2>Generated Report</h2>
              <button className="analytics-figma-close-btn" onClick={() => setShowReportModal(false)}>
                <FaTimes />
              </button>
            </div>
            {generatedReport ? (
              <div className="analytics-figma-report-details">
                <h3>{generatedReport.title}</h3>
                <p><strong>Summary:</strong> {generatedReport.summary}</p>
                <h4>Details:</h4>
                <ul>
                  {generatedReport.details.map((detail, index) => (
                    <li key={index}>
                      {detail.month}: {detail.sales} LKR
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




















   