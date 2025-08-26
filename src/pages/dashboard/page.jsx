import './style.css';
import { MdTrendingUp, MdShoppingCart, MdPeople, MdAdd, MdAssignment, MdInventory, MdBarChart, MdCurrencyRupee } from 'react-icons/md';
import { FaBoxes, FaChartLine } from 'react-icons/fa';

export default function Dashboard() {
  const stats = [
    { 
      title: 'Total Products', 
      value: '1,234', 
      change: '+12%', 
      color: '#3b82f6',
      icon: FaBoxes,
      trend: 'up'
    },
    { 
      title: 'Total Orders', 
      value: '856', 
      change: '+8%', 
      color: '#10b981',
      icon: MdShoppingCart,
      trend: 'up'
    },
    { 
      title: 'Revenue', 
      value: '₹2,45,000', 
      change: '+15%', 
      color: '#f59e0b',
      icon: MdCurrencyRupee,
      trend: 'up'
    },
    { 
      title: 'Customers', 
      value: '432', 
      change: '+5%', 
      color: '#8b5cf6',
      icon: MdPeople,
      trend: 'up'
    }
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'Rajesh Kumar', amount: 8500, status: 'delivered', date: '2024-01-15' },
    { id: '#ORD002', customer: 'Priya Sharma', amount: 12300, status: 'pending', date: '2024-01-14' },
    { id: '#ORD003', customer: 'Amit Singh', amount: 6750, status: 'processing', date: '2024-01-14' },
    { id: '#ORD004', customer: 'Sneha Patel', amount: 9200, status: 'delivered', date: '2024-01-13' },
    { id: '#ORD005', customer: 'Vikram Gupta', amount: 15600, status: 'pending', date: '2024-01-13' }
  ];

  const quickActions = [
    { title: 'Add Product', icon: MdAdd, color: '#3b82f6' },
    { title: 'New Order', icon: MdShoppingCart, color: '#10b981' },
    { title: 'Generate Report', icon: MdBarChart, color: '#f59e0b' },
    { title: 'Manage Stock', icon: MdInventory, color: '#8b5cf6' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard Overview</h2>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="dashboard-actions">
          <button className="refresh-btn">
            <MdTrendingUp size={20} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-container" style={{ backgroundColor: stat.color + '15' }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <div className="stat-trend">
                <MdTrendingUp size={16} color="#10b981" />
                <span className="stat-change">{stat.change}</span>
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.title}</p>
            </div>
            <div className="stat-footer">
              <span className="stat-period">vs last month</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card recent-orders">
          <div className="card-header">
            <h3 className="card-title">Recent Orders</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="orders-container">
            {recentOrders.map((order, i) => (
              <div key={i} className="order-item">
                <div className="order-info">
                  <div className="order-id">{order.id}</div>
                  <div className="order-customer">{order.customer}</div>
                  <div className="order-date">{order.date}</div>
                </div>
                <div className="order-details">
                  <div className="order-amount">₹{order.amount.toLocaleString()}</div>
                  <span className={`order-status status-${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="actions-grid">
            {quickActions.map((action, i) => (
              <button key={i} className="action-card" style={{ '--accent-color': action.color }}>
                <div className="action-icon">
                  <action.icon size={24} />
                </div>
                <span className="action-title">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-card analytics">
          <div className="card-header">
            <h3 className="card-title">Sales Analytics</h3>
            <FaChartLine size={20} color="#6b7280" />
          </div>
          <div className="analytics-content">
            <div className="analytics-chart">
              <div className="chart-placeholder">
                <FaChartLine size={48} color="#e5e7eb" />
                <p>Chart visualization would go here</p>
              </div>
            </div>
            <div className="analytics-summary">
              <div className="summary-item">
                <span className="summary-label">This Week</span>
                <span className="summary-value">₹45,200</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Last Week</span>
                <span className="summary-value">₹38,900</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}