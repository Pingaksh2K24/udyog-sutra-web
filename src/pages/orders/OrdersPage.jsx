import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiDownload, FiEye, FiEdit3, FiTruck, 
  FiPackage, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle,
  FiCalendar, FiUser, FiMapPin, FiPhone, FiMail, FiDollarSign,
  FiRefreshCw, FiMoreVertical, FiPrinter, FiSend
} from 'react-icons/fi';
import './style.css';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  const orders = [
    {
      id: 'ORD-2024-001',
      customer: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      items: 3,
      amount: 15750,
      status: 'delivered',
      date: '2024-01-15',
      paymentMethod: 'UPI',
      products: ['Laptop Stand', 'Wireless Mouse', 'USB Cable']
    },
    {
      id: 'ORD-2024-002',
      customer: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '+91 87654 32109',
      address: 'Delhi, NCR',
      items: 2,
      amount: 8500,
      status: 'shipped',
      date: '2024-01-14',
      paymentMethod: 'Card',
      products: ['Bluetooth Speaker', 'Phone Case']
    },
    {
      id: 'ORD-2024-003',
      customer: 'Amit Patel',
      email: 'amit@email.com',
      phone: '+91 76543 21098',
      address: 'Ahmedabad, Gujarat',
      items: 1,
      amount: 12000,
      status: 'processing',
      date: '2024-01-13',
      paymentMethod: 'UPI',
      products: ['Tablet']
    },
    {
      id: 'ORD-2024-004',
      customer: 'Sneha Reddy',
      email: 'sneha@email.com',
      phone: '+91 65432 10987',
      address: 'Bangalore, Karnataka',
      items: 4,
      amount: 22300,
      status: 'pending',
      date: '2024-01-12',
      paymentMethod: 'COD',
      products: ['Headphones', 'Keyboard', 'Mouse Pad', 'Cable']
    },
    {
      id: 'ORD-2024-005',
      customer: 'Vikram Singh',
      email: 'vikram@email.com',
      phone: '+91 54321 09876',
      address: 'Jaipur, Rajasthan',
      items: 2,
      amount: 18900,
      status: 'cancelled',
      date: '2024-01-11',
      paymentMethod: 'Card',
      products: ['Smart Watch', 'Charger']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FiCheckCircle />;
      case 'shipped': return <FiTruck />;
      case 'processing': return <FiPackage />;
      case 'pending': return <FiClock />;
      case 'cancelled': return <FiXCircle />;
      default: return <FiAlertCircle />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'pending': return 'pending';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Orders', value: '1,247', icon: <FiPackage />, color: 'blue', change: '+12%' },
    { label: 'Pending Orders', value: '23', icon: <FiClock />, color: 'orange', change: '-5%' },
    { label: 'Shipped Orders', value: '156', icon: <FiTruck />, color: 'purple', change: '+8%' },
    { label: 'Revenue', value: '₹2,45,670', icon: <FiDollarSign />, color: 'green', change: '+15%' }
  ];

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div className="header-content">
          <h1 className="page-title">
            <FiPackage className="title-icon" />
            Orders Management
          </h1>
          <p className="page-subtitle">Track and manage all your orders</p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <FiDownload />
            Export
          </button>
          <button className="action-btn primary">
            <FiRefreshCw />
            Refresh
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

      <div className="orders-controls">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders by ID or customer..."
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="orders-content">
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="order-row">
                  <td>
                    <div className="order-id">
                      <span className="id-text">{order.id}</span>
                      <span className="payment-method">{order.paymentMethod}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{order.customer}</div>
                      <div className="customer-contact">
                        <FiMail className="contact-icon" />
                        {order.email}
                      </div>
                      <div className="customer-contact">
                        <FiMapPin className="contact-icon" />
                        {order.address}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="items-info">
                      <span className="items-count">{order.items} items</span>
                      <div className="items-preview">
                        {order.products.slice(0, 2).map((product, idx) => (
                          <span key={idx} className="product-tag">{product}</span>
                        ))}
                        {order.products.length > 2 && (
                          <span className="more-items">+{order.products.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="amount">₹{order.amount.toLocaleString()}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="date-info">
                      <FiCalendar className="date-icon" />
                      {new Date(order.date).toLocaleDateString('en-IN')}
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="action-btn-sm view" title="View Details">
                        <FiEye />
                      </button>
                      <button className="action-btn-sm edit" title="Edit Order">
                        <FiEdit3 />
                      </button>
                      <button className="action-btn-sm print" title="Print Invoice">
                        <FiPrinter />
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
      </div>

      <div className="orders-pagination">
        <div className="pagination-info">
          Showing {filteredOrders.length} of {orders.length} orders
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

export default OrdersPage;