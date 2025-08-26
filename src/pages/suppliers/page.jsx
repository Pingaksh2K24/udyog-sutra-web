import './style.css';

export default function Suppliers() {
  const suppliers = [
    { id: 1, name: 'ABC Grains Ltd.', contact: 'Ramesh Kumar', email: 'ramesh@abcgrains.com', phone: '+91 99887 76655', category: 'Grains', rating: 4.8, orders: 156, totalValue: 2340000, lastDelivery: '2024-01-18', status: 'Active' },
    { id: 2, name: 'Golden Flour Mills', contact: 'Suresh Patel', email: 'suresh@goldenflour.in', phone: '+91 88776 65544', category: 'Flour', rating: 4.5, orders: 89, totalValue: 1560000, lastDelivery: '2024-01-16', status: 'Active' },
    { id: 3, name: 'Premium Oil Co.', contact: 'Mahesh Singh', email: 'mahesh@premiumoil.com', phone: '+91 77665 54433', category: 'Oil', rating: 4.2, orders: 67, totalValue: 890000, lastDelivery: '2024-01-12', status: 'Inactive' },
    { id: 4, name: 'Sweet Sugar Industries', contact: 'Rakesh Sharma', email: 'rakesh@sweetsugar.co.in', phone: '+91 66554 43322', category: 'Sugar', rating: 4.7, orders: 134, totalValue: 1890000, lastDelivery: '2024-01-19', status: 'Active' }
  ];

  const stats = [
    { title: 'Total Suppliers', value: '87', color: '#3b82f6' },
    { title: 'Active Suppliers', value: '73', color: '#10b981' },
    { title: 'Pending Orders', value: '15', color: '#f59e0b' },
    { title: 'Monthly Purchases', value: '₹12.5L', color: '#8b5cf6' }
  ];

  return (
    <div className="suppliers">
      <div className="suppliers-header">
        <h2 className="suppliers-title">Supplier Management</h2>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Add Supplier</button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-icon" style={{ background: stat.color + '20' }}>
                🏭
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="suppliers-filters">
        <div className="filter-group">
          <select className="filter-select">
            <option>All Categories</option>
            <option>Grains</option>
            <option>Flour</option>
            <option>Oil</option>
            <option>Sugar</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="filter-select">
            <option>Rating: All</option>
            <option>4+ Stars</option>
            <option>3+ Stars</option>
          </select>
        </div>
        <input type="text" placeholder="Search suppliers..." className="search-input" />
      </div>

      <div className="suppliers-table-container">
        <div className="suppliers-table">
          <div className="table-header">
            <span>Supplier</span>
            <span>Contact Person</span>
            <span>Category</span>
            <span>Rating</span>
            <span>Orders</span>
            <span>Total Value</span>
            <span>Last Delivery</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="table-row">
              <div className="supplier-info">
                <div className="supplier-avatar">
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <p className="supplier-name">{supplier.name}</p>
                  <p className="supplier-id">ID: SUP{supplier.id.toString().padStart(3, '0')}</p>
                </div>
              </div>
              <div className="contact-info">
                <p className="contact-name">{supplier.contact}</p>
                <p className="contact-details">{supplier.email}</p>
                <p className="contact-details">{supplier.phone}</p>
              </div>
              <span className="category">{supplier.category}</span>
              <div className="rating">
                <span className="rating-stars">⭐</span>
                <span className="rating-value">{supplier.rating}</span>
              </div>
              <span className="orders-count">{supplier.orders}</span>
              <span className="total-value">₹{(supplier.totalValue / 100000).toFixed(1)}L</span>
              <span className="last-delivery">{supplier.lastDelivery}</span>
              <span className={`status ${supplier.status.toLowerCase()}`}>
                {supplier.status}
              </span>
              <div className="action-buttons">
                <button className="btn-view">View</button>
                <button className="btn-edit">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}