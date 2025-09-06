import './style.css';
import { useState } from 'react';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('all');

  const reportTypes = [
    { 
      id: 1, 
      title: 'Sales Analytics', 
      description: 'Revenue trends, top products, and sales performance metrics', 
      icon: '📊', 
      color: '#3b82f6',
      metrics: { total: '₹12.5L', growth: '+15.2%', orders: '1,234' }
    },
    { 
      id: 2, 
      title: 'Inventory Overview', 
      description: 'Stock levels, low inventory alerts, and product movement', 
      icon: '📦', 
      color: '#10b981',
      metrics: { items: '2,456', lowStock: '23', value: '₹8.9L' }
    },
    { 
      id: 3, 
      title: 'Customer Insights', 
      description: 'Customer behavior, retention rates, and demographics', 
      icon: '👥', 
      color: '#f59e0b',
      metrics: { total: '856', new: '124', retention: '78%' }
    },
    { 
      id: 4, 
      title: 'Financial Summary', 
      description: 'Profit & loss, expenses, and financial health indicators', 
      icon: '💰', 
      color: '#8b5cf6',
      metrics: { revenue: '₹12.5L', profit: '₹2.3L', margin: '18.5%' }
    }
  ];

  const quickMetrics = [
    { title: 'Total Revenue', value: '₹12,45,670', change: '+15.2%', trend: 'up', icon: '💰' },
    { title: 'Orders Today', value: '47', change: '+8.7%', trend: 'up', icon: '🛒' },
    { title: 'Active Customers', value: '856', change: '+5.1%', trend: 'up', icon: '👥' },
    { title: 'Profit Margin', value: '18.5%', change: '+2.3%', trend: 'up', icon: '📈' }
  ];

  const recentReports = [
    { 
      name: 'Monthly Sales Report', 
      type: 'Sales', 
      date: '2024-01-19', 
      size: '2.4 MB', 
      format: 'PDF',
      status: 'completed'
    },
    { 
      name: 'Inventory Analysis', 
      type: 'Inventory', 
      date: '2024-01-18', 
      size: '1.8 MB', 
      format: 'Excel',
      status: 'completed'
    },
    { 
      name: 'Customer Insights Q1', 
      type: 'Customer', 
      date: '2024-01-17', 
      size: '3.2 MB', 
      format: 'PDF',
      status: 'processing'
    },
    { 
      name: 'Financial Summary', 
      type: 'Financial', 
      date: '2024-01-16', 
      size: '1.5 MB', 
      format: 'PDF',
      status: 'completed'
    }
  ];

  const chartData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 145 },
    { month: 'Mar', sales: 48000, orders: 132 },
    { month: 'Apr', sales: 61000, orders: 168 },
    { month: 'May', sales: 55000, orders: 155 },
    { month: 'Jun', sales: 67000, orders: 189 }
  ];

  return (
    <div className="reports">
      <div className="reports-header">
        <div className="header-content">
          <h2 className="reports-title">Reports & Analytics</h2>
          <p className="reports-subtitle">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="header-actions">
          <select 
            className="period-selector"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn-secondary">Export All</button>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="metrics-overview">
        <div className="metrics-grid">
          {quickMetrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-content">
                <h3 className="metric-value">{metric.value}</h3>
                <p className="metric-title">{metric.title}</p>
                <div className={`metric-change ${metric.trend}`}>
                  <span className="change-icon">{metric.trend === 'up' ? '↗' : '↘'}</span>
                  <span className="change-value">{metric.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-content">
        <div className="reports-main">
          <div className="chart-section">
            <div className="chart-header">
              <h3>Sales Performance</h3>
              <div className="chart-controls">
                <button className="chart-btn active">Revenue</button>
                <button className="chart-btn">Orders</button>
                <button className="chart-btn">Growth</button>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {chartData.map((data, index) => (
                    <div key={index} className="chart-bar">
                      <div 
                        className="bar" 
                        style={{ height: `${(data.sales / 70000) * 100}%` }}
                      ></div>
                      <span className="bar-label">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="report-types-section">
            <h3 className="section-title">Report Categories</h3>
            <div className="report-types-grid">
              {reportTypes.map((report) => (
                <div key={report.id} className="report-type-card">
                  <div className="report-card-header">
                    <div 
                      className="report-icon-large" 
                      style={{ backgroundColor: report.color + '20', color: report.color }}
                    >
                      {report.icon}
                    </div>
                    <h4 className="report-card-title">{report.title}</h4>
                  </div>
                  <p className="report-card-description">{report.description}</p>
                  <div className="report-metrics">
                    {Object.entries(report.metrics).map(([key, value]) => (
                      <div key={key} className="metric-item">
                        <span className="metric-key">{key}:</span>
                        <span className="metric-val">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="report-card-actions">
                    <button className="btn-generate-report">Generate</button>
                    <button className="btn-view-report">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reports-sidebar">
          <div className="recent-reports-section">
            <div className="section-header">
              <h3>Recent Reports</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="recent-reports-list">
              {recentReports.map((report, index) => (
                <div key={index} className="recent-report-item">
                  <div className="report-file-icon">
                    {report.format === 'PDF' ? '📄' : '📊'}
                  </div>
                  <div className="report-item-details">
                    <h4 className="report-item-name">{report.name}</h4>
                    <div className="report-item-meta">
                      <span className="report-item-type">{report.type}</span>
                      <span className="report-item-date">{report.date}</span>
                    </div>
                    <div className="report-item-info">
                      <span className="report-item-size">{report.size}</span>
                      <span className={`report-item-status ${report.status}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <div className="report-item-actions">
                    <button className="download-btn" title="Download">⬇</button>
                    <button className="share-btn" title="Share">📤</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="action-icon">📊</span>
                <span className="action-text">Custom Report</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">📅</span>
                <span className="action-text">Schedule Report</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">📧</span>
                <span className="action-text">Email Reports</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">🏭</span>
                <span className="action-text">Suppliers Reports</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">⚙️</span>
                <span className="action-text">Report Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}