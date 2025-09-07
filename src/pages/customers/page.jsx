import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaFileExcel, FaFilePdf, FaUsers, FaUserCheck, FaUserPlus, FaCrown } from 'react-icons/fa';
import Table from '../../components/table/Table';
import ActionButtons from '../../components/action/ActionButtons';
import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/input/Input';
import CookiesHandler from '../../utils/CookiesHandler';
export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const userId = CookiesHandler.get('userId');
      if (!userId) {
        toast.error('User not found. Please login again.');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/customers/user/${userId}`);
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

  const generatePDFReport = () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const businessName = userDetails.businessName || 'Business Name';
      
      let pdfContent = `
        <html>
          <head>
            <title>Customers Report</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 10px;
                background: white;
                color: #1e293b;
                font-size: 12px;
              }
              .container {
                max-width: 100%;
                margin: 0;
                background: white;
                overflow: hidden;
              }
              .header { 
                background: white;
                color: #1e293b;
                padding: 20px;
                text-align: center;
                border-bottom: 3px solid #3b82f6;
                margin-bottom: 20px;
              }
              .company-name { 
                font-size: 32px; 
                font-weight: 800; 
                margin-bottom: 8px;
                color: #3b82f6;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .report-title { 
                font-size: 24px; 
                font-weight: 600;
                margin-bottom: 12px;
                color: #1e293b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .content {
                padding: 15px;
              }
              .summary-section {
                background: white;
                padding: 15px;
                margin-bottom: 20px;
                text-align: center;
              }
              .summary-title {
                font-size: 16px;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 8px;
                display: inline-block;
              }
              .summary-stats {
                display: flex;
                gap: 30px;
                justify-content: space-around;
                text-align: center;
              }
              .stat-item {
                background: transparent;
                padding: 0;
                min-width: auto;
                flex: 1;
              }
              .stat-value {
                font-size: 20px;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 4px;
              }
              .stat-label {
                font-size: 11px;
                color: #64748b;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.3px;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 15px;
                background: white;
                font-size: 11px;
              }
              th {
                background: #f8fafc;
                color: #1e293b;
                padding: 8px 6px;
                text-align: left;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                border: 1px solid #ddd;
              }
              td { 
                padding: 6px;
                text-align: left;
                font-size: 10px;
                border: 1px solid #ddd;
                vertical-align: top;
                word-wrap: break-word;
                max-width: 100px;
                color: #1e293b;
              }
              tr:nth-child(even) {
                background-color: #f9fafb;
              }
              .status-active, .status-inactive { 
                color: #1e293b;
                background: transparent;
                padding: 2px 4px;
                font-weight: 600;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
              }
              .footer { 
                background: #f8fafc;
                padding: 20px 30px;
                text-align: center;
                font-size: 12px;
                color: #64748b;
                border-top: 1px solid #e2e8f0;
                margin-top: 20px;
              }
              @media print {
                body { background: white; padding: 5px; font-size: 10px; }
                .container { box-shadow: none; max-width: 100%; }
                .header { padding: 15px; background: white !important; color: #1e293b !important; border-bottom: 2px solid #3b82f6 !important; }
                .company-name { font-size: 28px !important; color: #3b82f6 !important; }
                .report-title { font-size: 20px !important; color: #1e293b !important; }
                .content { padding: 10px; }
                .summary-section { padding: 12px; margin-bottom: 15px; background: white !important; text-align: center !important; }
                .summary-title { font-size: 14px !important; }
                .stat-item { padding: 0 !important; min-width: auto !important; }
                .stat-value { font-size: 18px !important; }
                .stat-label { font-size: 10px !important; }
                th { padding: 6px 4px; font-size: 9px; background: #f8fafc !important; color: #1e293b !important; }
                td { padding: 4px; font-size: 9px; max-width: 80px; color: #1e293b !important; }
                .status-active, .status-inactive { color: #1e293b !important; background: transparent !important; border: none !important; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="company-name">${businessName}</div>
                <div class="report-title">Customers Report</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${new Date().toLocaleDateString('en-IN')}</div>
              </div>
              
              <div class="content">
                <div class="summary-section">
                  <div class="summary-title">Report Summary</div>
                  <div class="summary-stats">
                    <div class="stat-item">
                      <div class="stat-value">${customers.length}</div>
                      <div class="stat-label">Total Customers</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">${customers.filter(c => c.status?.toLowerCase() === 'active').length}</div>
                      <div class="stat-label">Active Customers</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">${customers.filter(c => c.status?.toLowerCase() === 'inactive').length}</div>
                      <div class="stat-label">Inactive Customers</div>
                    </div>
                  </div>
                </div>
            
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Orders</th>
                  <th>Total Amount</th>
                  <th>Outstanding</th>
                  <th>Loyalty Points</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
      `;

      customers.forEach(customer => {
        const totalAmount = Array.isArray(customer.orders)
          ? customer.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
          : customer.totalSpent || 0;
        
        pdfContent += `
          <tr>
            <td><strong>CUST${customer.customerId?.toString().padStart(3, '0') || customer.id?.toString().padStart(3, '0') || '000'}</strong></td>
            <td><strong>${customer.name || 'N/A'}</strong></td>
            <td>${customer.email || 'N/A'}</td>
            <td>${customer.phone || 'N/A'}</td>
            <td>${customer.type || 'N/A'}</td>
            <td>${customer.orders?.length || customer.orders || 0}</td>
            <td>₹${totalAmount.toLocaleString()}</td>
            <td>₹${(customer.outstandingAmount || 0).toLocaleString()}</td>
            <td>${customer.loyaltyPoints || 0}</td>
            <td><span class="status-${customer.status?.toLowerCase()}">${customer.status ? customer.status.charAt(0).toUpperCase() + customer.status.slice(1).toLowerCase() : 'N/A'}</span></td>
          </tr>
        `;
      });

      pdfContent += `
              </tbody>
            </table>
              </div>
              
              <div class="footer" style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #3b82f6;">
                <div>This report was generated automatically on ${new Date().toLocaleDateString('en-IN')}</div>
                <div style="margin-top: 5px; font-size: 10px;">Confidential - For Internal Use Only</div>
              </div>
            </div>
          </body>
        </html>
      `;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
      
      toast.success('PDF report generated successfully!', { position: 'top-left' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF report', { position: 'top-left' });
    }
  };

  const stats = [
    { title: 'Total Customers', value: '432', color: '#3b82f6', icon: FaUsers },
    { title: 'Active Customers', value: '387', color: '#10b981', icon: FaUserCheck },
    { title: 'New This Month', value: '28', color: '#f59e0b', icon: FaUserPlus },
    { title: 'Top Spenders', value: '45', color: '#8b5cf6', icon: FaCrown }
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

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        padding: '16px 0'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b'
        }}>
          Total Customers: {customers.length}
        </div>
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={() => toast.success('Excel report generated!')}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
            }}
          >
            <FaFileExcel size={16} />
            Excel Report
          </button>
          <button
            onClick={generatePDFReport}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
            }}
          >
            <FaFilePdf size={16} />
            PDF Report
          </button>
        </div>
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
            {
              key: 'customerId',
              header: 'ID',
              width: '1.2fr',
              render: (row) => (
                <span style={{ fontWeight: 'bold', color: '#3b82f6', fontSize: '13px' }}>
                  {row.customerId?.toString().padStart(3, '0') || row.id?.toString().padStart(3, '0') || '000'}
                </span>
              )
            },
            {
              key: 'name',
              header: 'Customer',
              width: '3fr',
              render: (row) => (
                <div style={{ padding: '1px 0' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '3px', color: '#1e293b' }}>
                    {row.name || 'N/A'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '1px' }}>
                    {row.email || 'No email'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {row.phone || 'No phone'}
                  </div>
                </div>
              )
            },
            {
              key: 'type',
              header: 'Type',
              width: '1.2fr',
              render: (row) => (
                <span style={{
                  padding: '2px 4px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: row.type === 'Wholesaler' ? '#dbeafe' : row.type === 'Retailer' ? '#dcfce7' : '#fef3c7',
                  color: row.type === 'Wholesaler' ? '#1e40af' : row.type === 'Retailer' ? '#166534' : '#92400e'
                }}>
                  {row.type || 'N/A'}
                </span>
              )
            },
            {
              key: 'orders',
              header: 'Orders',
              width: '0.8fr',
              render: (row) => (
                <span style={{ fontWeight: '600', color: '#059669', fontSize: '14px' }}>
                  {row?.orders?.length || row?.orders || 0}
                </span>
              )
            },
            {
              key: 'loyaltyPoints',
              header: 'Points',
              width: '0.8fr',
              render: (row) => (
                <span style={{ fontWeight: '600', color: '#7c3aed', fontSize: '14px' }}>
                  {row?.loyaltyPoints || 0}
                </span>
              )
            },
            {
              key: 'totalAmount',
              header: 'Total',
              width: '1fr',
              render: (row) => {
                const total = Array.isArray(row.orders)
                  ? row.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
                  : row.totalSpent || 0;
                return (
                  <span style={{ fontWeight: '600', color: '#059669', fontSize: '13px' }}>
                    ₹{(total / 1000).toFixed(0)}K
                  </span>
                );
              }
            },
            {
              key: 'outstandingAmount',
              header: 'Due',
              width: '1fr',
              render: (row) => (
                <span style={{
                  fontWeight: '600',
                  color: (row.outstandingAmount || 0) > 0 ? '#dc2626' : '#059669',
                  fontSize: '13px'
                }}>
                  ₹{((row.outstandingAmount || 0) / 1000).toFixed(0)}K
                </span>
              )
            },
            {
              key: 'status',
              header: 'Status',
              width: '1.2fr',
              render: (row) => (
                <span style={{
                  padding: '2px 6px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: row.status?.toLowerCase() === 'active' ? '#dcfce7' : '#fee2e2',
                  color: row.status?.toLowerCase() === 'active' ? '#166534' : '#dc2626',
                  border: `1px solid ${row.status?.toLowerCase() === 'active' ? '#bbf7d0' : '#fecaca'}`
                }}>
                  {row.status || 'N/A'}
                </span>
              )
            },
            {
              key: 'actions',
              header: 'Actions',
              width: '1.5fr',
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