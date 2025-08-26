import React, { useState } from 'react';
import { 
  FiBarChart3, FiTrendingUp, FiDownload, FiCalendar, FiDollarSign, 
  FiUsers, FiPackage, FiShoppingCart, FiTarget, FiActivity, 
  FiFilter, FiRefreshCw, FiEye, FiArrowUp, FiArrowDown, FiStar,
  FiClock, FiMapPin, FiCreditCard, FiSmartphone
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
          <button className="action-btn">
            <FiDownload />
            Export
          </button>
        </div>
      </div>

      <div className="kpi-section">
        {kpiCards.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.color}`}>
            <div className="kpi-icon">
              {kpi.icon}
            </div>
            <div className="kpi-content">
              <h3 className="kpi-title">{kpi.title}</h3>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-change ${kpi.trend}`}>
                {kpi.trend === 'up' ? <FiArrowUp /> : <FiArrowDown />}
                <span>{kpi.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card main-chart">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Trend</h3>
            <div className="chart-controls">
              <button className="chart-btn active">Revenue</button>
              <button className="chart-btn">Orders</button>
              <button className="chart-btn">Customers</button>
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
            <h3 className="chart-title">Top Products</h3>
            <button className="view-all-btn">View All</button>
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
        <div className="insights-card">
          <h3 className="card-title">Business Insights</h3>
          <div className="insights-list">
            <div className="insight-item success">
              <div className="insight-icon">
                <FiTrendingUp />
              </div>
              <div className="insight-content">
                <div className="insight-title">Revenue Growth</div>
                <div className="insight-description">
                  Your revenue has increased by 15.2% this month. Keep up the great work!
                </div>
              </div>
            </div>
            <div className="insight-item warning">
              <div className="insight-icon">
                <FiTarget />
              </div>
              <div className="insight-content">
                <div className="insight-title">Order Value Decline</div>
                <div className="insight-description">
                  Average order value decreased by 2.1%. Consider promotional strategies.
                </div>
              </div>
            </div>
            <div className="insight-item info">
              <div className="insight-icon">
                <FiUsers />
              </div>
              <div className="insight-content">
                <div className="insight-title">Customer Growth</div>
                <div className="insight-description">
                  New customer acquisition is up 12.3%. Focus on retention strategies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;