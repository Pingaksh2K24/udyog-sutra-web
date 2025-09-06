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
          }}>Customer Management</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            margin: 0,
            fontWeight: '500'
          }}>Manage your customer relationships and data</p>
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
            onClick={fetchCustomers}
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
          >Add Customer</button>
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
              }}>👥</div>
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
                }}>Live</span>
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
              }}>Updated 2 min ago</div>
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

      <div style={{ marginTop: '24px' }}>
        <Table
          data={customers}
          columns={[
            { key: 'customerId', header: 'Customer ID', render: (row) => `CUST${row.customerId?.toString().padStart(3, '0') || ''}` },
            { key: 'name', header: 'Name' },
            { key: 'phone', header: 'Phone' },
            { key: 'orders', header: 'Orders', render: (row) => row?.orders?.length || 0 },
            { key: 'outstandingAmount', header: 'Outstanding' },
            {
              key: 'totalAmount', header: 'Total Spent', render: (row) => {
                const total = Array.isArray(row.orders)
                  ? row.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
                  : 0;
                return `₹${total.toLocaleString()}`;
              }
            },
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