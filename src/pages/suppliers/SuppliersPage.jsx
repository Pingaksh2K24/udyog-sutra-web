import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiDownload, FiEye, FiEdit3, FiTrash2, 
  FiUserPlus, FiTruck, FiMail, FiPhone, FiMapPin, FiCalendar,
  FiStar, FiPackage, FiDollarSign, FiTrendingUp, FiMoreVertical,
  FiMessageSquare, FiAward, FiRefreshCw, FiClock, FiCheckCircle,
  FiAlertTriangle, FiShield, FiGlobe
} from 'react-icons/fi';
import './style.css';

const SuppliersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const suppliers = [
    {
      id: 'SUP-001',
      name: 'Tech Solutions Pvt Ltd',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      joinDate: '2023-03-15',
      totalOrders: 45,
      totalValue: 875000,
      status: 'verified',
      lastDelivery: '2024-01-10',
      avatar: 'TS',
      rating: 4.8,
      category: 'Electronics',
      paymentTerms: '30 Days',
      reliability: 95
    },
    {
      id: 'SUP-002',
      name: 'Global Supplies Co',
      contactPerson: 'Priya Sharma',
      email: 'priya@globalsupplies.com',
      phone: '+91 87654 32109',
      address: 'Delhi, NCR',
      joinDate: '2023-05-22',
      totalOrders: 32,
      totalValue: 650000,
      status: 'active',
      lastDelivery: '2024-01-08',
      avatar: 'GS',
      rating: 4.6,
      category: 'Office Supplies',
      paymentTerms: '15 Days',
      reliability: 88
    },
    {
      id: 'SUP-003',
      name: 'Industrial Parts Ltd',
      contactPerson: 'Amit Patel',
      email: 'amit@industrialparts.com',
      phone: '+91 76543 21098',
      address: 'Ahmedabad, Gujarat',
      joinDate: '2023-01-10',
      totalOrders: 67,
      totalValue: 1250000,
      status: 'verified',
      lastDelivery: '2024-01-12',
      avatar: 'IP',
      rating: 4.9,
      category: 'Industrial',
      paymentTerms: '45 Days',
      reliability: 97
    },
    {
      id: 'SUP-004',
      name: 'Quick Logistics',
      contactPerson: 'Sneha Reddy',
      email: 'sneha@quicklogistics.com',
      phone: '+91 65432 10987',
      address: 'Bangalore, Karnataka',
      joinDate: '2023-08-05',
      totalOrders: 28,
      totalValue: 420000,
      status: 'pending',
      lastDelivery: '2024-01-05',
      avatar: 'QL',
      rating: 4.4,
      category: 'Logistics',
      paymentTerms: '7 Days',
      reliability: 82
    },
    {
      id: 'SUP-005',
      name: 'Raw Materials Inc',
      contactPerson: 'Vikram Singh',
      email: 'vikram@rawmaterials.com',
      phone: '+91 54321 09876',
      address: 'Jaipur, Rajasthan',
      joinDate: '2023-11-18',
      totalOrders: 15,
      totalValue: 280000,
      status: 'inactive',
      lastDelivery: '2023-12-15',
      avatar: 'RM',
      rating: 4.2,
      category: 'Raw Materials',
      paymentTerms: '60 Days',
      reliability: 75
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'verified';
      case 'active': return 'active';
      case 'pending': return 'pending';
      case 'inactive': return 'inactive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <FiShield />;
      case 'active': return <FiCheckCircle />;
      case 'pending': return <FiClock />;
      case 'inactive': return <FiAlertTriangle />;
      default: return <FiTruck />;
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Suppliers', value: '247', icon: <FiTruck />, color: 'blue', change: '+8%' },
    { label: 'Verified Suppliers', value: '156', icon: <FiShield />, color: 'green', change: '+12%' },
    { label: 'Active Orders', value: '89', icon: <FiPackage />, color: 'purple', change: '+15%' },
    { label: 'Total Value', value: '₹34,56,780', icon: <FiDollarSign />, color: 'orange', change: '+22%' }
  ];

  return (
    <div className="suppliers-page">
      <div className="suppliers-header">
        <div className="header-content">
          <h1 className="page-title">
            <FiTruck className="title-icon" />
            Supplier Management
          </h1>
          <p className="page-subtitle">Manage your supplier network and relationships</p>
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
            Add Supplier
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

      <div className="suppliers-controls">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search suppliers by name, contact or ID..."
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
            <option value="verified">Verified</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
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

      <div className="suppliers-content">
        {viewMode === 'grid' ? (
          <div className="suppliers-grid">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="supplier-card">
                <div className="card-header">
                  <div className="supplier-avatar">
                    {supplier.avatar}
                  </div>
                  <div className={`status-badge ${getStatusColor(supplier.status)}`}>
                    {getStatusIcon(supplier.status)}
                    {supplier.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="card-body">
                  <h3 className="supplier-name">{supplier.name}</h3>
                  <p className="supplier-category">{supplier.category} Supplier</p>
                  
                  <div className="contact-person">
                    <strong>Contact:</strong> {supplier.contactPerson}
                  </div>
                  
                  <div className="supplier-details">
                    <div className="detail-item">
                      <FiMail className="detail-icon" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="detail-item">
                      <FiPhone className="detail-icon" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="detail-item">
                      <FiMapPin className="detail-icon" />
                      <span>{supplier.address}</span>
                    </div>
                  </div>
                  
                  <div className="supplier-stats">
                    <div className="stat-item">
                      <FiPackage className="stat-icon" />
                      <div>
                        <span className="stat-number">{supplier.totalOrders}</span>
                        <span className="stat-text">Orders</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FiDollarSign className="stat-icon" />
                      <div>
                        <span className="stat-number">₹{supplier.totalValue.toLocaleString()}</span>
                        <span className="stat-text">Value</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="supplier-metrics">
                    <div className="metric-item">
                      <div className="metric-label">Rating</div>
                      <div className="rating">
                        <FiStar className="rating-icon" />
                        <span className="rating-value">{supplier.rating}</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-label">Reliability</div>
                      <div className="reliability">
                        <div className="reliability-bar">
                          <div 
                            className="reliability-fill" 
                            style={{width: `${supplier.reliability}%`}}
                          ></div>
                        </div>
                        <span className="reliability-value">{supplier.reliability}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="payment-terms">
                    <FiClock className="terms-icon" />
                    Payment Terms: {supplier.paymentTerms}
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="last-delivery">
                    <FiCalendar className="calendar-icon" />
                    Last delivery: {new Date(supplier.lastDelivery).toLocaleDateString('en-IN')}
                  </div>
                  <div className="card-actions">
                    <button className="action-btn-sm view" title="View Details">
                      <FiEye />
                    </button>
                    <button className="action-btn-sm edit" title="Edit Supplier">
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
          <div className="suppliers-table-container">
            <table className="suppliers-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Orders</th>
                  <th>Total Value</th>
                  <th>Rating</th>
                  <th>Reliability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="supplier-row">
                    <td>
                      <div className="supplier-info">
                        <div className="supplier-avatar-sm">
                          {supplier.avatar}
                        </div>
                        <div>
                          <div className="supplier-name-sm">{supplier.name}</div>
                          <div className="supplier-id">{supplier.id}</div>
                          <div className="supplier-category-sm">{supplier.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-person-sm">{supplier.contactPerson}</div>
                        <div className="contact-item">
                          <FiMail className="contact-icon" />
                          {supplier.email}
                        </div>
                        <div className="contact-item">
                          <FiPhone className="contact-icon" />
                          {supplier.phone}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(supplier.status)}`}>
                        {getStatusIcon(supplier.status)}
                        {supplier.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="orders-count">{supplier.totalOrders}</div>
                    </td>
                    <td>
                      <div className="amount">₹{supplier.totalValue.toLocaleString()}</div>
                    </td>
                    <td>
                      <div className="rating">
                        <FiStar className="rating-icon" />
                        {supplier.rating}
                      </div>
                    </td>
                    <td>
                      <div className="reliability-table">
                        <div className="reliability-bar-sm">
                          <div 
                            className="reliability-fill" 
                            style={{width: `${supplier.reliability}%`}}
                          ></div>
                        </div>
                        <span className="reliability-text">{supplier.reliability}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="action-btn-sm view" title="View Details">
                          <FiEye />
                        </button>
                        <button className="action-btn-sm edit" title="Edit Supplier">
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

      <div className="suppliers-pagination">
        <div className="pagination-info">
          Showing {filteredSuppliers.length} of {suppliers.length} suppliers
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

export default SuppliersPage;