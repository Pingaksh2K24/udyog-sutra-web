import './style.css';

export default function Orders() {
  const orders = [
    { id: 'ORD001', customer: 'Rajesh Traders', items: 5, amount: 15420, status: 'Delivered', date: '2024-01-15', priority: 'High' },
    { id: 'ORD002', customer: 'Sharma Wholesale', items: 3, amount: 8750, status: 'Processing', date: '2024-01-16', priority: 'Medium' },
    { id: 'ORD003', customer: 'Kumar Stores', items: 8, amount: 22100, status: 'Pending', date: '2024-01-17', priority: 'Low' },
    { id: 'ORD004', customer: 'Patel Enterprises', items: 2, amount: 5600, status: 'Shipped', date: '2024-01-18', priority: 'High' },
    { id: 'ORD005', customer: 'Singh Trading Co.', items: 6, amount: 18900, status: 'Cancelled', date: '2024-01-19', priority: 'Medium' }
  ];

  const stats = [
    { title: 'Total Orders', value: '156', color: '#3b82f6' },
    { title: 'Pending Orders', value: '23', color: '#f59e0b' },
    { title: 'Completed Today', value: '12', color: '#10b981' },
    { title: 'Revenue Today', value: '₹45,670', color: '#8b5cf6' }
  ];

  return (
    <div className="orders">
      <div className="orders-header">
        <h2 className="orders-title">Order Management</h2>
        <div className="header-actions">
          <button className="btn-secondary">Export Orders</button>
          <button className="btn-primary">New Order</button>
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
                🛒
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="orders-filters">
        <div className="filter-group">
          <select className="filter-select">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <select className="filter-select">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <input type="date" className="date-input" />
        </div>
        <input type="text" placeholder="Search orders..." className="search-input" />
      </div>

      <div className="orders-table-container">
        <div className="orders-table">
          <div className="table-header">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Items</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Date</span>
            <span>Actions</span>
          </div>
          
          {orders.map((order) => (
            <div key={order.id} className="table-row">
              <div className="order-id">
                <span className="id-text">#{order.id}</span>
              </div>
              <span className="customer-name">{order.customer}</span>
              <span className="items-count">{order.items} items</span>
              <span className="amount">₹{order.amount.toLocaleString()}</span>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
              <span className={`priority ${order.priority.toLowerCase()}`}>
                {order.priority}
              </span>
              <span className="order-date">{order.date}</span>
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