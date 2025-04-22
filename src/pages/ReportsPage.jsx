import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTimes, FaFilePdf, FaFileCsv, FaTrash, FaSearch, FaEdit, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import jsPDF from 'jspdf';
import '../styles/ReportsPage.css';
import logo from '../assets/logo.png';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const ReportsPage = () => {
  const { user, reports = [], setReports } = useAuth();
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editReport, setEditReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [salesFilter, setSalesFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1); 
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' }); 
  const reportsPerPage = 5; 

  useEffect(() => {
    if (!user || user.role !== 'mill_owner') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleEditReport = (report) => {
    setEditReport({ ...report });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedReports = reports.map((r) =>
      r.id === editReport.id ? editReport : r
    );
    setReports(updatedReports);
    setShowEditModal(false);
    setEditReport(null);
  };

  const handleDeleteReport = (reportId) => {
    const updatedReports = reports.filter((report) => report.id !== reportId);
    setReports(updatedReports);
  };

  const handleExportCSV = (report) => {
    const csvContent = [
      ['Month', 'Sales (LKR)'],
      ...report.details.map((detail) => [detail.month, detail.sales]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${report.title}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(report.title, 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date(report.id).toLocaleDateString()}`, 20, 30);
    doc.setFontSize(14);
    doc.text('Report Details', 20, 50);

    report.details.forEach((detail, index) => {
      doc.text(
        `${detail.month}: ${detail.sales} LKR`,
        20,
        60 + index * 10
      );
    });

    doc.save(`${report.title}.pdf`);
  };

 
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };


  const filteredReports = reports
    .filter((report) => {
      const reportDate = new Date(report.id);
      const now = new Date();
      if (filter === 'last-7') {
        const last7Days = new Date(now.setDate(now.getDate() - 7));
        return reportDate >= last7Days;
      } else if (filter === 'last-30') {
        const last30Days = new Date(now.setDate(now.getDate() - 30));
        return reportDate >= last30Days;
      }
      return true;
    })
    .filter((report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((report) => {
      const totalSales = report.details.reduce((sum, detail) => sum + detail.sales, 0);
      if (salesFilter === 'above-1000') return totalSales > 1000;
      if (salesFilter === 'below-1000') return totalSales <= 1000;
      return true;
    })
    .sort((a, b) => {
      if (sortConfig.key === 'title') {
        return sortConfig.direction === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortConfig.key === 'id') {
        return sortConfig.direction === 'asc'
          ? a.id - b.id
          : b.id - a.id;
      }
      return 0;
    });

  
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

 
  const getReportsBarChartData = () => {
    const labels = filteredReports.map((report) => report.title);
    const data = filteredReports.map((report) =>
      report.details.reduce((sum, detail) => sum + detail.sales, 0)
    );

    return {
      labels,
      datasets: [
        {
          label: 'Total Sales (LKR)',
          data,
          backgroundColor: '#5B6ACD',
          borderColor: '#5B6ACD',
          borderWidth: 1,
        },
      ],
    };
  };

  
  const getReportsPieChartData = () => {
    const labels = filteredReports.map((report) => report.title);
    const data = filteredReports.map((report) =>
      report.details.reduce((sum, detail) => sum + detail.sales, 0)
    );

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#5B6ACD', '#81C784', '#FFD700', '#FF0000', '#00CED1'],
        },
      ],
    };
  };

  
  const totalReports = filteredReports.length;
  const averageSales =
    filteredReports.length > 0
      ? filteredReports
          .map((report) => report.details.reduce((sum, detail) => sum + detail.sales, 0))
          .reduce((sum, sales) => sum + sales, 0) / filteredReports.length
      : 0;
  const highestSalesReport = filteredReports.reduce(
    (max, report) => {
      const totalSales = report.details.reduce((sum, detail) => sum + detail.sales, 0);
      return totalSales > (max.sales || 0) ? { report, sales: totalSales } : max;
    },
    { report: null, sales: 0 }
  );

  if (!user || user.role !== 'mill_owner') {
    return null;
  }

  return (
    <div className="reports-page">
      <header className="reports-header">
        <div className="reports-logo">
        <img src={logo} alt="RiceMillPro Logo" />
        </div>
        <nav className="reports-nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/analytics')}>Analytics</button>
          <button className="reports-nav-active">Reports</button>
        </nav>
      </header>
      <main className="reports-content">
        <h1>Reports</h1>
        <p>View and manage your generated reports below.</p>
        <div className="reports-controls">
          <div className="reports-search">
            <FaSearch className="reports-search-icon" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="reports-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Reports</option>
            <option value="last-7">Last 7 Days</option>
            <option value="last-30">Last 30 Days</option>
          </select>
          <select
            className="reports-filter"
            value={salesFilter}
            onChange={(e) => setSalesFilter(e.target.value)}
          >
            <option value="all">All Sales</option>
            <option value="above-1000">Sales {'>='} 1000 LKR</option>
            <option value="below-1000">Sales ≤ 1000 LKR</option>
          </select>
        </div>

        {filteredReports.length > 0 && (
          <div className="reports-summary-cards">
            <div className="reports-summary-card">
              <h3>Total Reports</h3>
              <p>{totalReports}</p>
            </div>
            <div className="reports-summary-card">
              <h3>Average Sales</h3>
              <p>{averageSales.toFixed(2)} LKR</p>
            </div>
            <div className="reports-summary-card">
              <h3>Highest Sales</h3>
              <p>
                {highestSalesReport.report
                  ? `${highestSalesReport.report.title}: ${highestSalesReport.sales} LKR`
                  : 'N/A'}
              </p>
            </div>
          </div>
        )}

        {filteredReports.length > 0 && (
          <div className="reports-charts">
            <div className="reports-chart">
              <h3>Reports Sales Overview (Bar Chart)</h3>
              <div className="reports-chart-container">
                <Bar
                  data={getReportsBarChartData()}
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
            <div className="reports-chart reports-pie-chart">
              <h3>Sales Distribution (Pie Chart)</h3>
              <div className="reports-chart-container">
                <Pie
                  data={getReportsPieChartData()}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>
              <div className="reports-pie-labels">
                {getReportsPieChartData().labels.map((label, index) => (
                  <div key={index} className="reports-pie-label">
                    <span
                      className="reports-pie-color"
                      style={{ backgroundColor: getReportsPieChartData().datasets[0].backgroundColor[index] }}
                    ></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {filteredReports.length > 0 ? (
          <>
            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('title')}>
                      Title{' '}
                      {sortConfig.key === 'title' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>
                    <th>Summary</th>
                    <th onClick={() => handleSort('id')}>
                      Generated On{' '}
                      {sortConfig.key === 'id' ? (
                        sortConfig.direction === 'asc' ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>{report.summary}</td>
                      <td>{new Date(report.id).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="reports-action-btn reports-action-view"
                          onClick={() => handleViewReport(report)}
                        >
                          View
                        </button>
                        <button
                          className="reports-action-btn reports-action-edit"
                          onClick={() => handleEditReport(report)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="reports-action-btn reports-action-pdf"
                          onClick={() => handleExportPDF(report)}
                        >
                          <FaFilePdf /> PDF
                        </button>
                        <button
                          className="reports-action-btn reports-action-csv"
                          onClick={() => handleExportCSV(report)}
                        >
                          <FaFileCsv /> CSV
                        </button>
                        <button
                          className="reports-action-btn reports-action-delete"
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="reports-pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No reports available. Generate a new report from the Analytics page.</p>
        )}
      </main>

      {showModal && selectedReport && (
        <div className="reports-modal">
          <div className="reports-modal-content">
            <div className="reports-modal-header">
              <h2>{selectedReport.title}</h2>
              <button className="reports-close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="reports-modal-details">
              <p><strong>Summary:</strong> {selectedReport.summary}</p>
              <h4>Details:</h4>
              <ul>
                {selectedReport.details.map((detail, index) => (
                  <li key={index}>
                    {detail.month}: {detail.sales} LKR
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editReport && (
        <div className="reports-modal">
          <div className="reports-modal-content">
            <div className="reports-modal-header">
              <h2>Edit Report</h2>
              <button className="reports-close-btn" onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="reports-modal-details">
              <label>
                Title:
                <input
                  type="text"
                  value={editReport.title}
                  onChange={(e) => setEditReport({ ...editReport, title: e.target.value })}
                />
              </label>
              <label>
                Summary:
                <textarea
                  value={editReport.summary}
                  onChange={(e) => setEditReport({ ...editReport, summary: e.target.value })}
                />
              </label>
              <button className="reports-save-btn" onClick={handleSaveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;