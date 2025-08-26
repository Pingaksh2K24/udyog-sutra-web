import './style.css';

export default function Customers() {
  const customers = [
    { id: 1, name: 'Rajesh Traders', email: 'rajesh@traders.com', phone: '+91 98765 43210', type: 'Retailer', orders: 45, totalSpent: 125000, lastOrder: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Sharma Wholesale', email: 'contact@sharma.com', phone: '+91 87654 32109', type: 'Wholesaler', orders: 78, totalSpent: 340000, lastOrder: '2024-01-18', status: 'Active' },
    { id: 3, name: 'Kumar Stores', email: 'kumar@stores.in', phone: '+91 76543 21098', type: 'Retailer', orders: 23, totalSpent: 67000, lastOrder: '2024-01-10', status: 'Inactive' },
    { id: 4, name: 'Patel Enterprises', email: 'info@patel.co.in', phone: '+91 65432 10987', type: 'Distributor', orders: 156, totalSpent: 890000, lastOrder: '2024-01-19', status: 'Active' }
  ];

  const stats = [
    { title: 'Total Customers', value: '432', color: '#3b82f6' },
    { title: 'Active Customers', value: '387', color: '#10b981' },
    { title: 'New This Month', value: '28', color: '#f59e0b' },
    { title: 'Top Spenders', value: '45', color: '#8b5cf6' }
  ];

  return (
    <div className="customers">
      <div className="customers-header">
        <h2 className="customers-title">Customer Management</h2>
        <div className="header-actions">
          <button className="btn-secondary">Export List</button>
          <button className="btn-primary">Add Customer</button>
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
                👥
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="customers-filters">
        <div className="filter-group">
          <select className="filter-select">
            <option>All Types</option>
            <option>Retailer</option>
            <option>Wholesaler</option>
            <option>Distributor</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <input type="text" placeholder="Search customers..." className="search-input" />
      </div>

      <div className="customers-table-container">
        <div className="customers-table">
          <div className="table-header">
            <span>Customer</span>
            <span>Contact</span>
            <span>Type</span>
            <span>Orders</span>
            <span>Total Spent</span>
            <span>Last Order</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          
          {customers.map((customer) => (
            <div key={customer.id} className="table-row">
              <div className="customer-info">
                <div className="customer-avatar">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <p className="customer-name">{customer.name}</p>
                  <p className="customer-id">ID: CUST{customer.id.toString().padStart(3, '0')}</p>
                </div>
              </div>
              <div className="contact-info">
                <p className="email">{customer.email}</p>
                <p className="phone">{customer.phone}</p>
              </div>
              <span className={`customer-type ${customer.type.toLowerCase()}`}>
                {customer.type}
              </span>
              <span className="orders-count">{customer.orders}</span>
              <span className="total-spent">₹{customer.totalSpent.toLocaleString()}</span>
              <span className="last-order">{customer.lastOrder}</span>
              <span className={`status ${customer.status.toLowerCase()}`}>
                {customer.status}
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