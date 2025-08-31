import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/table/Table';
import ActionButtons from '../../components/action/ActionButtons';
import Dropdown from '../../components/dropdown/Dropdown';
import DatePicker from '../../components/datepicker/DatePicker';
import Input from '../../components/input/Input';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      console.log('Orders API Response:', response);
      console.log('Orders Data:', response.data);
      setOrders(response.data || []);
    } catch (error) {
      console.error('Orders API Error:', error);
      console.log('Error Response:', error.response);
      // Fallback to dummy data if API fails
      setOrders(dummyOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const dummyOrders = [
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
          <button className="btn-secondary" onClick={fetchOrders} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
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
          <Dropdown 
            placeholder="All Status"
            options={['Pending', 'Processing', 'Shipped', 'Delivered']}
          />
          <Dropdown 
            placeholder="All Priorities"
            options={['High', 'Medium', 'Low']}
          />
          <DatePicker />
          <Input type="text" placeholder="Search orders..." />
        </div>
      </div>

      <div style={{marginTop: '24px'}}>
        <Table 
          data={orders}
          columns={[
            { key: 'orderId', header: 'Order ID', render: (row) => `#${row.orderId || row.id}` },
            { key: 'customerName', header: 'Customer' },
            { key: 'items', header: 'Items', render: (row) => `${row.items?.length || 0} items` },
            { key: 'totalAmount', header: 'Amount', render: (row) => `₹${row.totalAmount?.toLocaleString() || '0'}` },
            { key: 'status', header: 'Status', render: (row) => <span className={`status ${row.status?.toLowerCase()}`}>{row.status}</span> },
            { key: 'priority', header: 'Priority' },
            { key: 'orderDate', header: 'Date' },
            { 
              key: 'actions', 
              header: 'Actions',
              render: (row) => (
                <ActionButtons 
                  onEdit={() => console.log('Edit order:', row.orderId || row.id)}
                  onDelete={() => console.log('Delete order:', row.orderId || row.id)}
                />
              )
            }
          ]}
          paginationFlag={true}
          recordsPerPage={10}
        />
      </div>
    </div>
  );
}