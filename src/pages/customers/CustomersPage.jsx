import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiDownload, FiEye, FiEdit3, FiTrash2, 
  FiUserPlus, FiUsers, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiStar, FiShoppingBag, FiDollarSign, FiTrendingUp, FiMoreVertical,
  FiMessageSquare, FiHeart, FiAward, FiRefreshCw, FiGift, FiTarget,
  FiCreditCard, FiActivity, FiBarChart3, FiZap, FiCrown
} from 'react-icons/fi';
import './style.css';

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const customers = [
    {
      id: 'CUST-001',
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      joinDate: '2023-06-15',
      totalOrders: 24,
      totalSpent: 125750,
      status: 'vip',
      lastOrder: '2024-01-10',
      avatar: 'RK',
      rating: 4.8,
      category: 'Premium',
      loyaltyPoints: 2450,
      avgOrderValue: 5240,
      purchaseFrequency: 'High',
      preferredPayment: 'UPI',
      lifetimeValue: 185000
    },
    {
      id: 'CUST-002',
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '+91 87654 32109',
      address: 'Delhi, NCR',
      joinDate: '2023-08-22',
      totalOrders: 18,
      totalSpent: 89500,
      status: 'active',
      lastOrder: '2024-01-08',
      avatar: 'PS',
      rating: 4.6,
      category: 'Regular',
      loyaltyPoints: 1340,
      avgOrderValue: 4970,
      purchaseFrequency: 'Medium',
      preferredPayment: 'Card',
      lifetimeValue: 125000
    },
    {
      id: 'CUST-003',
      name: 'Amit Patel',
      email: 'amit@email.com',
      phone: '+91 76543 21098',
      address: 'Ahmedabad, Gujarat',
      joinDate: '2023-04-10',
      totalOrders: 32,
      totalSpent: 156200,
      status: 'vip',
      lastOrder: '2024-01-12',
      avatar: 'AP',
      rating: 4.9,
      category: 'Premium',
      loyaltyPoints: 3120,
      avgOrderValue: 4880,
      purchaseFrequency: 'High',
      preferredPayment: 'UPI',
      lifetimeValue: 220000
    },
    {
      id: 'CUST-004',
      name: 'Sneha Reddy',
      email: 'sneha@email.com',
      phone: '+91 65432 10987',
      address: 'Bangalore, Karnataka',
      joinDate: '2023-11-05',
      totalOrders: 8,
      totalSpent: 34500,
      status: 'active',
      lastOrder: '2024-01-05',
      avatar: 'SR',
      rating: 4.4,
      category: 'New',
      loyaltyPoints: 690,
      avgOrderValue: 4310,
      purchaseFrequency: 'Low',
      preferredPayment: 'COD',
      lifetimeValue: 45000
    },
    {
      id: 'CUST-005',
      name: 'Vikram Singh',
      email: 'vikram@email.com',
      phone: '+91 54321 09876',
      address: 'Jaipur, Rajasthan',
      joinDate: '2023-02-18',
      totalOrders: 5,
      totalSpent: 18900,
      status: 'inactive',
      lastOrder: '2023-12-15',
      avatar: 'VS',
      rating: 4.2,
      category: 'Inactive',
      loyaltyPoints: 380,
      avgOrderValue: 3780,
      purchaseFrequency: 'Low',
      preferredPayment: 'Card',
      lifetimeValue: 25000
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'vip': return 'vip';
      case 'active': return 'active';
      case 'inactive': return 'inactive';
      default: return 'default';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Customers', value: '2,847', icon: <FiUsers />, color: 'blue', change: '+18%' },
    { label: 'VIP Customers', value: '156', icon: <FiAward />, color: 'purple', change: '+12%' },
    { label: 'Active This Month', value: '1,234', icon: <FiTrendingUp />, color: 'green', change: '+8%' },
    { label: 'Customer LTV', value: '₹45,670', icon: <FiDollarSign />, color: 'orange', change: '+22%' }
  ];

  return (
    <div className="customers-page">
      <div className="customers-header">
        <div className="header-content">
          <h1 className="page-title">
            <FiUsers className="title-icon" />
            Customer Management
          </h1>
          <p className="page-subtitle">Manage and track your customer relationships</p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <FiDownload />
            Export
          </button>
          <button className="action-btn secondary">
            <FiRefreshCw />
            Refresh
          </button>
          <button className="action-btn primary">
            <FiUserPlus />
            Add Customer
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="customers-controls">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search customers by name, email or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="vip">VIP</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      <div className="customers-content">
        {viewMode === 'grid' ? (
          <div className="customers-grid">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="customer-card">
                <div className="card-header">
                  <div className="customer-avatar">
                    {customer.avatar}
                  </div>
                  <div className={`status-badge ${getStatusColor(customer.status)}`}>
                    {customer.status === 'vip' && <FiAward />}
                    {customer.status === 'active' && <FiHeart />}
                    {customer.status === 'inactive' && <FiUsers />}
                    {customer.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="card-body">
                  <h3 className="customer-name">{customer.name}</h3>
                  <p className="customer-category">{customer.category} Customer</p>
                  
                  <div className="customer-details">
                    <div className="detail-item">
                      <FiMail className="detail-icon" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="detail-item">
                      <FiPhone className="detail-icon" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="detail-item">
                      <FiMapPin className="detail-icon" />
                      <span>{customer.address}</span>
                    </div>
                  </div>
                  
                  <div className="customer-stats">
                    <div className="stat-item">
                      <FiShoppingBag className="stat-icon" />
                      <div>
                        <span className="stat-number">{customer.totalOrders}</span>
                        <span className="stat-text">Orders</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FiDollarSign className="stat-icon" />
                      <div>
                        <span className="stat-number">₹{customer.totalSpent.toLocaleString()}</span>
                        <span className="stat-text">Spent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="customer-metrics">
                    <div className="metric-row">
                      <div className="customer-rating">
                        <FiStar className="rating-icon" />
                        <span className="rating-value">{customer.rating}</span>
                        <span className="rating-text">Rating</span>
                      </div>
                      <div className="loyalty-points">
                        <FiGift className="loyalty-icon" />
                        <span className="loyalty-value">{customer.loyaltyPoints}</span>
                        <span className="loyalty-text">Points</span>
                      </div>
                    </div>
                    
                    <div className="customer-insights">
                      <div className="insight-item">
                        <FiTarget className="insight-icon" />
                        <div className="insight-content">
                          <span className="insight-label">Avg Order</span>
                          <span className="insight-value">₹{customer.avgOrderValue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="insight-item">
                        <FiActivity className="insight-icon" />
                        <div className="insight-content">
                          <span className="insight-label">Frequency</span>
                          <span className={`insight-value frequency-${customer.purchaseFrequency.toLowerCase()}`}>
                            {customer.purchaseFrequency}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="payment-preference">
                      <FiCreditCard className="payment-icon" />
                      <span className="payment-text">Prefers {customer.preferredPayment}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="last-order">
                    <FiCalendar className="calendar-icon" />
                    Last order: {new Date(customer.lastOrder).toLocaleDateString('en-IN')}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn-sm view" title="View Profile">
                      <FiEye />
                    </button>
                    <button className="action-btn-sm edit" title="Edit Customer">
                      <FiEdit3 />
                    </button>
                    <button className="action-btn-sm message" title="Send Message">
                      <FiMessageSquare />
                    </button>
                    <button className="action-btn-sm more" title="More Options">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="customers-table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Rating</th>
                  <th>Last Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="customer-row">
                    <td>
                      <div className="customer-info">
                        <div className="customer-avatar-sm">
                          {customer.avatar}
                        </div>
                        <div>
                          <div className="customer-name-sm">{customer.name}</div>
                          <div className="customer-id">{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-item">
                          <FiMail className="contact-icon" />
                          {customer.email}
                        </div>
                        <div className="contact-item">
                          <FiPhone className="contact-icon" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(customer.status)}`}>
                        {customer.status === 'vip' && <FiAward />}
                        {customer.status === 'active' && <FiHeart />}
                        {customer.status === 'inactive' && <FiUsers />}
                        {customer.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="orders-count">{customer.totalOrders}</div>
                    </td>
                    <td>
                      <div className="amount">₹{customer.totalSpent.toLocaleString()}</div>
                    </td>
                    <td>
                      <div className="table-metrics">
                        <div className="rating">
                          <FiStar className="rating-icon" />
                          {customer.rating}
                        </div>
                        <div className="loyalty-points-sm">
                          <FiGift className="loyalty-icon-sm" />
                          {customer.loyaltyPoints}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        {new Date(customer.lastOrder).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="action-btn-sm view" title="View Profile">
                          <FiEye />
                        </button>
                        <button className="action-btn-sm edit" title="Edit Customer">
                          <FiEdit3 />
                        </button>
                        <button className="action-btn-sm message" title="Send Message">
                          <FiMessageSquare />
                        </button>
                        <button className="action-btn-sm more" title="More Options">
                          <FiMoreVertical />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="customers-pagination">
        <div className="pagination-info">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn">Previous</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;