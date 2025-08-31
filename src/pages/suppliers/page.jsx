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
      <div style={{
        background: 'linear-gradient(135deg, #475569, #94a3b8)',
        marginTop: '24px',
        padding: '24px',
        borderRadius: '16px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #e2e8f0'
      }}>
        <div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'white',
            margin: '0 0 8px 0'
          }}>Supplier Management</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            margin: 0,
            fontWeight: '500'
          }}>Manage your supplier network and partnerships</p>
        </div>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <button 
            style={{
              padding: '12px 24px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              background: '#f1f5f9',
              color: '#475569',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px'
            }}
            onClick={fetchSuppliers} 
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = '#e2e8f0';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f1f5f9';
              e.target.style.transform = 'translateY(0)';
            }}
          >{loading ? 'Loading...' : 'Refresh'}</button>
          <button 
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}
          >Add Supplier</button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              padding: '24px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
              borderRadius: '50%',
              transform: 'translate(30px, -30px)'
            }}></div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 25px ${stat.color}30`,
                fontSize: '28px'
              }}>🏭</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                background: index === 2 ? '#fef3c7' : '#dcfce7',
                border: `1px solid ${index === 2 ? '#fde68a' : '#bbf7d0'}`
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: index === 2 ? '#f59e0b' : '#10b981'
                }}></div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: index === 2 ? '#92400e' : '#166534'
                }}>Online</span>
              </div>
            </div>
            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              <h3 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#1e293b',
                margin: '0 0 8px 0',
                lineHeight: '1.2'
              }}>{stat.value}</h3>
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                margin: '0 0 12px 0',
                fontWeight: '500'
              }}>{stat.title}</p>
              <div style={{
                fontSize: '12px',
                color: '#94a3b8',
                fontWeight: '500'
              }}>Last sync 5 min ago</div>
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