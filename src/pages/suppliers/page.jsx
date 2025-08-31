import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/table/Table';
import ActionButtons from '../../components/action/ActionButtons';
import Router from '../../utils/Router';
import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/input/Input';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/suppliers');
      console.log('Suppliers API Response:', response);
      console.log('Suppliers Data:', response.data);
      setSuppliers(response.data || []);
    } catch (error) {
      console.error('Suppliers API Error:', error);
      console.log('Error Response:', error.response);
      // Fallback to dummy data if API fails
      setSuppliers(dummySuppliers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const dummySuppliers = [
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
          <button className="btn-secondary" onClick={fetchSuppliers} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
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
          <Dropdown 
            placeholder="All Categories"
            options={['Grains', 'Flour', 'Oil', 'Sugar']}
          />
          <Dropdown 
            placeholder="All Status"
            options={['Active', 'Inactive']}
          />
          <Dropdown 
            placeholder="Rating: All"
            options={['4+ Stars', '3+ Stars']}
          />
          <Input 
            type="text" 
            placeholder="Search suppliers..."
          />
        </div>
      </div>

      <div style={{marginTop: '24px'}}>
        <Table 
        data={suppliers}
        columns={[
          { key: 'supplierId', header: 'Supplier ID', render: (row) => `SUP${row.supplierId?.toString().padStart(3, '0') || ''}` },
          { key: 'name', header: 'Name' },
          { key: 'contactPerson', header: 'Contact Person' },
          { key: 'phone', header: 'Phone', render: (row) => row.phone?.[0] || 'N/A' },
          { key: 'city', header: 'City/State', render: (row) => `${row.addresses?.[0]?.city || 'N/A'}, ${row.addresses?.[0]?.state || 'N/A'}` },
            // { key: 'gstNumber', header: 'GST Number' },
          // { key: 'paymentTerms', header: 'Payment Terms' },
          // { key: 'creditLimit', header: 'Credit Limit', render: (row) => `₹${row.creditLimit?.toLocaleString() || '0'}` },
          // { key: 'rating', header: 'Rating', render: (row) => `⭐ ${row.rating || 'N/A'}` },
          { key: 'status', header: 'Status', render: (row) => <span className={`status ${row.status?.toLowerCase()}`}>{row.status}</span> },
          // { key: 'lastUpdated', header: 'Last Updated' },
          { 
            key: 'actions', 
            header: 'Actions',
            render: (row) => (
              <ActionButtons 
                onEdit={() => Router.navigate('suppliers-edit', { id: row._id })}
                onDelete={() => console.log('Delete supplier:', row.supplierId)}
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