import React, { useState } from 'react';
import { 
  FiBarChart3, FiTrendingUp, FiDownload, FiCalendar, FiDollarSign, 
  FiUsers, FiPackage, FiShoppingCart, FiTarget, FiActivity, 
  FiFilter, FiRefreshCw, FiEye, FiArrowUp, FiArrowDown, FiStar,
  FiClock, FiMapPin, FiCreditCard, FiSmartphone, FiMoreVertical,
  FiShare2, FiPrinter, FiMail, FiZap, FiTrendingDown
} from 'react-icons/fi';
import './style.css';

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '₹12,45,670',
      change: '+15.2%',
      trend: 'up',
      icon: <FiDollarSign />,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: '1,847',
      change: '+8.7%',
      trend: 'up',
      icon: <FiShoppingCart />,
      color: 'blue'
    },
    {
      title: 'New Customers',
      value: '234',
      change: '+12.3%',
      trend: 'up',
      icon: <FiUsers />,
      color: 'purple'
    },
    {
      title: 'Avg Order Value',
      value: '₹6,750',
      change: '-2.1%',
      trend: 'down',
      icon: <FiTarget />,
      color: 'orange'
    }
  ];

  const salesData = [
    { month: 'Jan', value: 85000 },
    { month: 'Feb', value: 92000 },
    { month: 'Mar', value: 78000 },
    { month: 'Apr', value: 105000 },
    { month: 'May', value: 118000 },
    { month: 'Jun', value: 124567 }
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, revenue: 367500 },
    { name: 'Smartphone Case', sales: 189, revenue: 283500 },
    { name: 'Bluetooth Speaker', sales: 156, revenue: 234000 },
    { name: 'USB Cable', sales: 134, revenue: 201000 },
    { name: 'Power Bank', sales: 98, revenue: 147000 }
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #1847 received', time: '2 min ago', icon: <FiShoppingCart /> },
    { type: 'customer', message: 'New customer registered', time: '5 min ago', icon: <FiUsers /> },
    { type: 'payment', message: 'Payment of ₹15,750 received', time: '8 min ago', icon: <FiCreditCard /> },
    { type: 'product', message: 'Product stock updated', time: '12 min ago', icon: <FiPackage /> }
  ];

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="header-left">
          <h1 className="page-title">
            <FiBarChart3 className="title-icon" />
            Business Analytics
          </h1>
          <p className="page-subtitle">Track your business performance and insights</p>
        </div>
        <div className="header-actions">
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="quick-stat-value">₹12.4L</span>
              <span className="quick-stat-label">Today</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">+15.2%</span>
              <span className="quick-stat-label">Growth</span>
            </div>
          </div>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last 12 Months</option>
          </select>
          <div className="action-buttons">
            <button className="action-btn secondary">
              <FiShare2 />
              Share
            </button>
            <button className="action-btn">
              <FiDownload />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="kpi-section">
        {kpiCards.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.color}`}>
            <div className="kpi-header">
              <div className="kpi-icon">
                {kpi.icon}
              </div>
              <button className="kpi-menu">
                <FiMoreVertical />
              </button>
            </div>
            <div className="kpi-content">
              <h3 className="kpi-title">{kpi.title}</h3>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change ${kpi.trend}`}>
                {kpi.trend === 'up' ? <FiArrowUp /> : <FiArrowDown />}
                <span>{kpi.change}</span>
                <span className="kpi-period">vs last month</span>
              </div>
            </div>
            <div className="kpi-sparkline">
              <div className="sparkline-bar" style={{height: '60%'}}></div>
              <div className="sparkline-bar" style={{height: '80%'}}></div>
              <div className="sparkline-bar" style={{height: '45%'}}></div>
              <div className="sparkline-bar" style={{height: '90%'}}></div>
              <div className="sparkline-bar" style={{height: '75%'}}></div>
              <div className="sparkline-bar" style={{height: '100%'}}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card main-chart">
          <div className="chart-header">
            <div className="chart-title-section">
              <h3 className="chart-title">Revenue Trend</h3>
              <div className="chart-subtitle">
                <span className="trend-indicator positive">
                  <FiTrendingUp /> +15.2% from last period
                </span>
              </div>
            </div>
            <div className="chart-controls">
              <button className="chart-btn active">Revenue</button>
              <button className="chart-btn">Orders</button>
              <button className="chart-btn">Customers</button>
              <button className="chart-menu-btn">
                <FiMoreVertical />
              </button>
            </div>
          </div>
          <div className="chart-content">
            <div className="chart-area">
              {salesData.map((data, index) => (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar" 
                    style={{ height: `${(data.value / 125000) * 100}%` }}
                  ></div>
                  <span className="bar-label">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="chart-stats">
              <div className="stat-item">
                <span className="stat-label">Peak Month</span>
                <span className="stat-value">June 2024</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Growth Rate</span>
                <span className="stat-value positive">+15.2%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">₹6,02,567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title-section">
              <h3 className="chart-title">Top Products</h3>
              <div className="chart-subtitle">
                <span className="product-count">245 total products</span>
              </div>
            </div>
            <div className="chart-actions">
              <button className="view-all-btn">View All</button>
              <button className="chart-menu-btn">
                <FiMoreVertical />
              </button>
            </div>
          </div>
          <div className="products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-stats">
                    <span>{product.sales} sales</span>
                    <span>₹{product.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="product-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${(product.sales / 245) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="metrics-card">
          <h3 className="card-title">Performance Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-icon">
                <FiTarget />
              </div>
              <div className="metric-info">
                <div className="metric-value">3.2%</div>
                <div className="metric-label">Conversion Rate</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">
                <FiStar />
              </div>
              <div className="metric-info">
                <div className="metric-value">4.6</div>
                <div className="metric-label">Avg Rating</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">
                <FiClock />
              </div>
              <div className="metric-info">
                <div className="metric-value">2.4</div>
                <div className="metric-label">Avg Response Time</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">
                <FiActivity />
              </div>
              <div className="metric-info">
                <div className="metric-value">78%</div>
                <div className="metric-label">Customer Retention</div>
              </div>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h3 className="card-title">Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="insights-section">
        <div className="insights-grid">
          <div className="insight-card success">
            <div className="insight-header">
              <div className="insight-icon-wrapper success">
                <FiTrendingUp className="insight-icon" />
              </div>
              <div className="insight-badge success">Great!</div>
            </div>
            <div className="insight-content">
              <h4 className="insight-title">Revenue Growth</h4>
              <p className="insight-description">
                Your revenue has increased by 15.2% this month. Keep up the great work!
              </p>
              <div className="insight-stats">
                <span className="stat-highlight">+₹1,62,450</span>
                <span className="stat-period">vs last month</span>
              </div>
            </div>
          </div>

          <div className="insight-card warning">
            <div className="insight-header">
              <div className="insight-icon-wrapper warning">
                <FiTarget className="insight-icon" />
              </div>
              <div className="insight-badge warning">Alert</div>
            </div>
            <div className="insight-content">
              <h4 className="insight-title">Order Value Decline</h4>
              <p className="insight-description">
                Average order value decreased by 2.1%. Consider promotional strategies.
              </p>
              <div className="insight-stats">
                <span className="stat-highlight warning">-₹145</span>
                <span className="stat-period">avg per order</span>
              </div>
            </div>
          </div>

          <div className="insight-card info">
            <div className="insight-header">
              <div className="insight-icon-wrapper info">
                <FiUsers className="insight-icon" />
              </div>
              <div className="insight-badge info">Growing</div>
            </div>
            <div className="insight-content">
              <h4 className="insight-title">Customer Growth</h4>
              <p className="insight-description">
                New customer acquisition is up 12.3%. Focus on retention strategies.
              </p>
              <div className="insight-stats">
                <span className="stat-highlight">+234</span>
                <span className="stat-period">new customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-reports-section">
        <div className="section-header">
          <h3 className="section-title">Recent Reports</h3>
          <div className="section-actions">
            <button className="view-all-btn">View All</button>
          </div>
        </div>
        
        <div className="recent-reports-grid">
          <div className="recent-report-card">
            <div className="report-card-header">
              <div className="report-type-badge sales">Sales</div>
              <div className="report-date">Today, 2:30 PM</div>
            </div>
            <div className="report-card-content">
              <h4 className="report-card-title">Daily Sales Summary</h4>
              <p className="report-card-description">Complete overview of today's sales performance and key metrics</p>
              <div className="report-preview-stats">
                <div className="preview-stat">
                  <span className="preview-label">Revenue</span>
                  <span className="preview-value">₹45,670</span>
                </div>
                <div className="preview-stat">
                  <span className="preview-label">Orders</span>
                  <span className="preview-value">127</span>
                </div>
              </div>
            </div>
            <div className="report-card-footer">
              <button className="download-btn">
                <FiDownload /> Download
              </button>
              <button className="view-btn">
                <FiEye /> View
              </button>
            </div>
          </div>

          <div className="recent-report-card">
            <div className="report-card-header">
              <div className="report-type-badge inventory">Inventory</div>
              <div className="report-date">Yesterday, 6:45 PM</div>
            </div>
            <div className="report-card-content">
              <h4 className="report-card-title">Stock Level Report</h4>
              <p className="report-card-description">Current inventory status with low stock alerts and recommendations</p>
              <div className="report-preview-stats">
                <div className="preview-stat">
                  <span className="preview-label">Total Items</span>
                  <span className="preview-value">2,847</span>
                </div>
                <div className="preview-stat warning">
                  <span className="preview-label">Low Stock</span>
                  <span className="preview-value">23</span>
                </div>
              </div>
            </div>
            <div className="report-card-footer">
              <button className="download-btn">
                <FiDownload /> Download
              </button>
              <button className="view-btn">
                <FiEye /> View
              </button>
            </div>
          </div>

          <div className="recent-report-card">
            <div className="report-card-header">
              <div className="report-type-badge customers">Customers</div>
              <div className="report-date">2 days ago, 11:20 AM</div>
            </div>
            <div className="report-card-content">
              <h4 className="report-card-title">Customer Analytics</h4>
              <p className="report-card-description">Detailed customer behavior analysis and engagement metrics</p>
              <div className="report-preview-stats">
                <div className="preview-stat">
                  <span className="preview-label">Active Users</span>
                  <span className="preview-value">1,234</span>
                </div>
                <div className="preview-stat">
                  <span className="preview-label">New Signups</span>
                  <span className="preview-value">89</span>
                </div>
              </div>
            </div>
            <div className="report-card-footer">
              <button className="download-btn">
                <FiDownload /> Download
              </button>
              <button className="view-btn">
                <FiEye /> View
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="detailed-reports-section">
        <div className="section-header">
          <h3 className="section-title">Detailed Reports</h3>
          <div className="section-actions">
            <button className="filter-btn">
              <FiFilter /> Filter
            </button>
            <button className="refresh-btn">
              <FiRefreshCw /> Refresh
            </button>
          </div>
        </div>
        
        <div className="reports-grid">
          <div className="report-card">
            <div className="report-header">
              <div className="report-icon sales">
                <FiDollarSign />
              </div>
              <div className="report-info">
                <h4 className="report-title">Sales Report</h4>
                <p className="report-subtitle">Monthly sales analysis</p>
              </div>
              <button className="report-action">
                <FiEye />
              </button>
            </div>
            <div className="report-stats">
              <div className="stat-row">
                <span className="stat-label">Total Sales</span>
                <span className="stat-value">₹12,45,670</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Growth</span>
                <span className="stat-value positive">+15.2%</span>
              </div>
            </div>
            <div className="report-footer">
              <span className="last-updated">Updated 2 hours ago</span>
            </div>
          </div>

          <div className="report-card">
            <div className="report-header">
              <div className="report-icon inventory">
                <FiPackage />
              </div>
              <div className="report-info">
                <h4 className="report-title">Inventory Report</h4>
                <p className="report-subtitle">Stock levels & movement</p>
              </div>
              <button className="report-action">
                <FiEye />
              </button>
            </div>
            <div className="report-stats">
              <div className="stat-row">
                <span className="stat-label">Total Items</span>
                <span className="stat-value">2,847</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Low Stock</span>
                <span className="stat-value warning">23 items</span>
              </div>
            </div>
            <div className="report-footer">
              <span className="last-updated">Updated 1 hour ago</span>
            </div>
          </div>

          <div className="report-card">
            <div className="report-header">
              <div className="report-icon customers">
                <FiUsers />
              </div>
              <div className="report-info">
                <h4 className="report-title">Customer Report</h4>
                <p className="report-subtitle">Customer analytics</p>
              </div>
              <button className="report-action">
                <FiEye />
              </button>
            </div>
            <div className="report-stats">
              <div className="stat-row">
                <span className="stat-label">Active Customers</span>
                <span className="stat-value">1,234</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">New This Month</span>
                <span className="stat-value positive">+234</span>
              </div>
            </div>
            <div className="report-footer">
              <span className="last-updated">Updated 30 min ago</span>
            </div>
          </div>

          <div className="report-card">
            <div className="report-header">
              <div className="report-icon orders">
                <FiShoppingCart />
              </div>
              <div className="report-info">
                <h4 className="report-title">Orders Report</h4>
                <p className="report-subtitle">Order trends & status</p>
              </div>
              <button className="report-action">
                <FiEye />
              </button>
            </div>
            <div className="report-stats">
              <div className="stat-row">
                <span className="stat-label">Total Orders</span>
                <span className="stat-value">1,847</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Pending</span>
                <span className="stat-value warning">12 orders</span>
              </div>
            </div>
            <div className="report-footer">
              <span className="last-updated">Updated 15 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;