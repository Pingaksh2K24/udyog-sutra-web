import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/table/Table';
import ActionButtons from '../../components/action/ActionButtons';
import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/input/Input';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      console.log('Customers API Response:', response);
      console.log('Customers Data:', response.data);
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Customers API Error:', error);
      console.log('Error Response:', error.response);
      // Fallback to dummy data if API fails
      setCustomers(dummyCustomers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const dummyCustomers = [
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
          <button className="btn-secondary" onClick={fetchCustomers} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
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
          <Dropdown 
            placeholder="All Types"
            options={['Retailer', 'Wholesaler', 'Distributor']}
            className="filter-dropdown"
          />
          <Dropdown 
            placeholder="All Status"
            options={['Active', 'Inactive']}
            className="filter-dropdown"
          />
          <Input 
            type="text" 
            placeholder="Search customers..."
          />
        </div>
      </div>

      <div style={{marginTop: '24px'}}>
        <Table 
          data={customers}
          columns={[
            { key: 'customerId', header: 'Customer ID', render: (row) => `CUST${row.customerId?.toString().padStart(3, '0') || ''}` },
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'phone', header: 'Phone' },
            { key: 'type', header: 'Type' },
            { key: 'orders', header: 'Orders' },
            { key: 'totalAmount', header: 'Total Spent', render: (row) => `₹${row.totalAmount?.toLocaleString() || '0'}` },
            { key: 'status', header: 'Status', render: (row) => <span className={`status ${row.status?.toLowerCase()}`}>{row.status}</span> },
            { 
              key: 'actions', 
              header: 'Actions',
              render: (row) => (
                <ActionButtons 
                  onEdit={() => console.log('Edit customer:', row.customerId || row.id)}
                  onDelete={() => console.log('Delete customer:', row.customerId || row.id)}
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