import './style.css';
import { MdTrendingUp, MdShoppingCart, MdPeople, MdAdd, MdAssignment, MdInventory, MdBarChart, MdCurrencyRupee } from 'react-icons/md';
import { FaBoxes, FaChartLine } from 'react-icons/fa';

export default function Dashboard() {
  const stats = [
    { 
      title: 'Total Products', 
      value: '1,234', 
      change: '+12%', 
      color: '#3b82f6',
      icon: FaBoxes,
      trend: 'up'
    },
    { 
      title: 'Total Orders', 
      value: '856', 
      change: '+8%', 
      color: '#10b981',
      icon: MdShoppingCart,
      trend: 'up'
    },
    { 
      title: 'Revenue', 
      value: '₹2,45,000', 
      change: '+15%', 
      color: '#f59e0b',
      icon: MdCurrencyRupee,
      trend: 'up'
    },
    { 
      title: 'Customers', 
      value: '432', 
      change: '+5%', 
      color: '#8b5cf6',
      icon: MdPeople,
      trend: 'up'
    }
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'Rajesh Kumar', amount: 8500, status: 'delivered', date: '2024-01-15' },
    { id: '#ORD002', customer: 'Priya Sharma', amount: 12300, status: 'pending', date: '2024-01-14' },
    { id: '#ORD003', customer: 'Amit Singh', amount: 6750, status: 'processing', date: '2024-01-14' },
    { id: '#ORD004', customer: 'Sneha Patel', amount: 9200, status: 'delivered', date: '2024-01-13' },
    { id: '#ORD005', customer: 'Vikram Gupta', amount: 15600, status: 'pending', date: '2024-01-13' }
  ];

  const quickActions = [
    { title: 'Add Product', icon: MdAdd, color: '#3b82f6' },
    { title: 'New Order', icon: MdShoppingCart, color: '#10b981' },
    { title: 'Generate Report', icon: MdBarChart, color: '#f59e0b' },
    { title: 'Manage Stock', icon: MdInventory, color: '#8b5cf6' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard Overview</h2>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="dashboard-actions">
          <button className="refresh-btn">
            <MdTrendingUp size={20} />
            <span>Refresh Data</span>
          </button>
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
                boxShadow: `0 8px 25px ${stat.color}30`
              }}>
                <stat.icon size={28} color="white" />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                background: '#dcfce7',
                border: '1px solid #bbf7d0'
              }}>
                <MdTrendingUp size={14} color="#166534" />
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#166534'
                }}>{stat.change}</span>
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
              }}>vs last month</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-grid">
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1e293b',
              margin: 0
            }}>Recent Orders</h3>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#eff6ff';
              e.target.style.color = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#3b82f6';
            }}>View All</button>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {recentOrders.map((order, i) => (
              <div 
                key={i} 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '4px'
                  }}>{order.id}</div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b',
                    marginBottom: '2px'
                  }}>{order.customer}</div>
                  <div style={{
                    fontSize: '12px',
                    color: '#94a3b8'
                  }}>{order.date}</div>
                </div>
                <div style={{
                  textAlign: 'right'
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '4px'
                  }}>₹{order.amount.toLocaleString()}</div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: order.status === 'delivered' ? '#dcfce7' : order.status === 'pending' ? '#fef3c7' : '#ddd6fe',
                    color: order.status === 'delivered' ? '#166534' : order.status === 'pending' ? '#92400e' : '#5b21b6'
                  }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1e293b',
              margin: 0
            }}>Quick Actions</h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            {quickActions.map((action, i) => (
              <button 
                key={i} 
                style={{
                  padding: '20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = action.color;
                  e.target.style.background = `${action.color}08`;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 8px 25px ${action.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.background = 'white';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 15px ${action.color}30`
                }}>
                  <action.icon size={24} color="white" />
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#475569'
                }}>{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1e293b',
              margin: 0
            }}>Sales Analytics</h3>
            <FaChartLine size={20} color="#64748b" />
          </div>
          <div>
            <div style={{
              height: '200px',
              background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              border: '2px dashed #cbd5e1'
            }}>
              <FaChartLine size={48} color="#94a3b8" />
              <p style={{
                color: '#64748b',
                fontSize: '14px',
                margin: '8px 0 0 0',
                fontWeight: '500'
              }}>Chart visualization would go here</p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <div style={{
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: '500',
                  marginBottom: '4px'
                }}>This Week</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1e293b'
                }}>₹45,200</div>
              </div>
              <div style={{
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: '500',
                  marginBottom: '4px'
                }}>Last Week</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1e293b'
                }}>₹38,900</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}