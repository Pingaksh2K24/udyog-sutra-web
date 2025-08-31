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
          }}>Order Management</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            margin: 0,
            fontWeight: '500'
          }}>Track and manage all your orders efficiently</p>
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
            onClick={fetchOrders} 
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
          >New Order</button>
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
              }}>🛒</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                background: index === 1 ? '#fef3c7' : '#dcfce7',
                border: `1px solid ${index === 1 ? '#fde68a' : '#bbf7d0'}`
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: index === 1 ? '#f59e0b' : '#10b981'
                }}></div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: index === 1 ? '#92400e' : '#166534'
                }}>Active</span>
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
              }}>Updated just now</div>
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