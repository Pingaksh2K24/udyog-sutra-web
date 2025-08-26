import './style.css';

export default function Reports() {
  const reportTypes = [
    { id: 1, title: 'Sales Report', description: 'Monthly sales performance and trends', icon: '📈', lastGenerated: '2024-01-19', status: 'Ready' },
    { id: 2, title: 'Inventory Report', description: 'Stock levels and inventory analysis', icon: '📦', lastGenerated: '2024-01-18', status: 'Processing' },
    { id: 3, title: 'Customer Report', description: 'Customer behavior and analytics', icon: '👥', lastGenerated: '2024-01-17', status: 'Ready' },
    { id: 4, title: 'Supplier Report', description: 'Supplier performance metrics', icon: '🏭', lastGenerated: '2024-01-16', status: 'Ready' },
    { id: 5, title: 'Financial Report', description: 'Revenue, profit and loss analysis', icon: '💰', lastGenerated: '2024-01-15', status: 'Scheduled' },
    { id: 6, title: 'Order Report', description: 'Order fulfillment and delivery metrics', icon: '🛒', lastGenerated: '2024-01-14', status: 'Ready' }
  ];

  const quickStats = [
    { title: 'Total Revenue', value: '₹12,45,670', change: '+15.2%', period: 'This Month' },
    { title: 'Orders Completed', value: '1,234', change: '+8.7%', period: 'This Month' },
    { title: 'Customer Growth', value: '23%', change: '+5.1%', period: 'This Quarter' },
    { title: 'Profit Margin', value: '18.5%', change: '+2.3%', period: 'This Month' }
  ];

  const recentReports = [
    { name: 'Monthly Sales Summary', type: 'Sales', date: '2024-01-19', size: '2.4 MB', format: 'PDF' },
    { name: 'Inventory Analysis Q1', type: 'Inventory', date: '2024-01-18', size: '1.8 MB', format: 'Excel' },
    { name: 'Customer Insights Report', type: 'Customer', date: '2024-01-17', size: '3.2 MB', format: 'PDF' },
    { name: 'Supplier Performance Review', type: 'Supplier', date: '2024-01-16', size: '1.5 MB', format: 'PDF' }
  ];

  return (
    <div className="reports">
      <div className="reports-header">
        <h2 className="reports-title">Reports & Analytics</h2>
        <div className="header-actions">
          <button className="btn-secondary">Schedule Report</button>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="quick-stats">
        <h3 className="section-title">Quick Analytics</h3>
        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className="analytics-card">
              <div className="analytics-content">
                <p className="analytics-label">{stat.title}</p>
                <p className="analytics-value">{stat.value}</p>
                <div className="analytics-meta">
                  <span className="change positive">{stat.change}</span>
                  <span className="period">{stat.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-types">
          <h3 className="section-title">Available Reports</h3>
          <div className="report-cards">
            {reportTypes.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-icon">{report.icon}</div>
                <div className="report-info">
                  <h4 className="report-title">{report.title}</h4>
                  <p className="report-description">{report.description}</p>
                  <div className="report-meta">
                    <span className="last-generated">Last: {report.lastGenerated}</span>
                    <span className={`report-status ${report.status.toLowerCase()}`}>{report.status}</span>
                  </div>
                </div>
                <div className="report-actions">
                  <button className="btn-generate">Generate</button>
                  <button className="btn-view">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-reports">
          <h3 className="section-title">Recent Reports</h3>
          <div className="reports-list">
            {recentReports.map((report, index) => (
              <div key={index} className="report-item">
                <div className="report-details">
                  <div className="report-name">{report.name}</div>
                  <div className="report-info-small">
                    <span className="report-type">{report.type}</span>
                    <span className="report-date">{report.date}</span>
                    <span className="report-size">{report.size}</span>
                  </div>
                </div>
                <div className="report-format">{report.format}</div>
                <div className="report-item-actions">
                  <button className="btn-download">Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}