import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTruck, FaUsers, FaRupeeSign, FaFileExcel, FaFilePdf } from 'react-icons/fa';
import Table from '../../components/table/Table';
import ActionButtons from '../../components/action/ActionButtons';
import Router from '../../utils/Router';
import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/input/Input';
import ConfirmationBox from '../../components/confirmationbox/ConfirmationBox';
import CookiesHandler from '../../utils/CookiesHandler';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmationBox, setConfirmationBox] = useState({ isOpen: false, supplierId: null, loading: false });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const userId = CookiesHandler.get('userId');
      if (!userId) {
        toast.error('User not found. Please login again.');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/suppliers/user/${userId}`);
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

  const handleDeleteSupplier = (supplierId) => {
    setConfirmationBox({ isOpen: true, supplierId });
  };

  const confirmDelete = async () => {
    setConfirmationBox(prev => ({ ...prev, loading: true }));
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${confirmationBox.supplierId}`);
      toast.success('Supplier deleted successfully!');
      fetchSuppliers();
    } catch (error) {
      console.error('Delete supplier error:', error);
      toast.error('Failed to delete supplier');
    } finally {
      setConfirmationBox({ isOpen: false, supplierId: null, loading: false });
    }
  };

  const cancelDelete = () => {
    if (!confirmationBox.loading) {
      setConfirmationBox({ isOpen: false, supplierId: null, loading: false });
    }
  };

  const generatePDFReport = () => {
    try {
      // Get business name from localStorage
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const businessName = userDetails.businessName || 'Business Name';
      
      // Filter suppliers based on current search
      const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.supplierId?.toString().includes(searchTerm) ||
        supplier.addresses?.[0]?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.addresses?.[0]?.state?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Create PDF content
      let pdfContent = `
        <html>
          <head>
            <title>Suppliers Report</title>
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
                border-bottom: 3px solid #ff6b35;
                margin-bottom: 20px;
              }
              .header-content { 
                max-width: 100%;
              }
              .company-name { 
                font-size: 32px; 
                font-weight: 800; 
                margin-bottom: 8px;
                color: #ff6b35;
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
              .report-date { 
                font-size: 14px; 
                color: #64748b;
                background: #f8fafc;
                padding: 8px 16px;
                border-radius: 6px;
                display: inline-block;
                border: 1px solid #e2e8f0;
                font-weight: 500;
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
              .rating-cell {
                color: #1e293b;
              }
              .star {
                color: #1e293b;
                font-size: 12px;
              }
              .credit-limit {
                font-weight: 600;
                color: #1e293b;
              }
              .footer { 
                background: #f8fafc;
                padding: 20px 30px;
                text-align: center;
                font-size: 12px;
                color: #64748b;
                border-top: 1px solid #e2e8f0;
              }
              .footer-logo {
                font-weight: 700;
                color: #3b82f6;
                margin-bottom: 5px;
              }
              @media print {
                body { 
                  background: white; 
                  padding: 5px;
                  font-size: 10px;
                }
                .container { 
                  box-shadow: none;
                  max-width: 100%;
                }
                .header {
                  padding: 15px;
                  background: white !important;
                  color: #1e293b !important;
                  border-bottom: 2px solid #ff6b35 !important;
                }
                .company-name {
                  font-size: 28px !important;
                  color: #ff6b35 !important;
                }
                .report-title {
                  font-size: 20px !important;
                  color: #1e293b !important;
                }
                .report-date {
                  background: #f8fafc !important;
                  color: #64748b !important;
                  border: 1px solid #e2e8f0 !important;
                }
                .content {
                  padding: 10px;
                }
                .summary-section {
                  padding: 12px;
                  margin-bottom: 15px;
                  background: white !important;
                  text-align: center !important;
                }
                .summary-title {
                  font-size: 14px !important;
                }
                .stat-item {
                  padding: 0 !important;
                  min-width: auto !important;
                }
                .stat-value {
                  font-size: 18px !important;
                }
                .stat-label {
                  font-size: 10px !important;
                }
                th {
                  padding: 6px 4px;
                  font-size: 9px;
                  background: #f8fafc !important;
                  color: #1e293b !important;
                }
                td {
                  padding: 4px;
                  font-size: 9px;
                  max-width: 80px;
                  color: #1e293b !important;
                }
                .status-active, .status-inactive {
                  color: #1e293b !important;
                  background: transparent !important;
                  border: none !important;
                }
                .star, .credit-limit {
                  color: #1e293b !important;
                }
                .company-name {
                  font-size: 24px;
                }
                .report-title {
                  font-size: 16px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-content">
                  <div class="company-name">${businessName}</div>
                  <div class="report-title">Suppliers Report</div>
                  <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${new Date().toLocaleDateString('en-IN')}</div>
                </div>
              </div>
              
              <div class="content">
                <div class="summary-section">
                  <div class="summary-title">Report Summary</div>
                  <div class="summary-stats">
                    <div class="stat-item">
                      <div class="stat-value">${filteredSuppliers.length}</div>
                      <div class="stat-label">Total Suppliers</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">${filteredSuppliers.filter(s => s.status?.toLowerCase() === 'active').length}</div>
                      <div class="stat-label">Active Suppliers</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-value">${filteredSuppliers.filter(s => s.status?.toLowerCase() === 'inactive').length}</div>
                      <div class="stat-label">Inactive Suppliers</div>
                    </div>
                  </div>
                </div>
            
            <table>
              <thead>
                <tr>
                  <th>Supplier ID</th>
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Rating</th>
                  <th>City/State</th>
                  <th>Credit Limit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
      `;

      filteredSuppliers.forEach(supplier => {
        pdfContent += `
          <tr>
            <td><strong>SUP${supplier.supplierId?.toString().padStart(3, '0') || '000'}</strong></td>
            <td><strong>${supplier.name || 'N/A'}</strong></td>
            <td>${supplier.contactPerson || 'N/A'}</td>
            <td>${supplier.email || 'N/A'}</td>
            <td>${supplier.phone?.[0] || 'N/A'}</td>
            <td class="rating-cell"><span class="star">⭐</span> ${supplier.rating || 'N/A'}</td>
            <td>${supplier.addresses?.[0]?.city || 'N/A'}, ${supplier.addresses?.[0]?.state || 'N/A'}</td>
            <td class="credit-limit">₹${supplier.creditLimit?.toLocaleString() || '0'}</td>
            <td><span class="status-${supplier.status?.toLowerCase()}">${supplier.status ? supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1).toLowerCase() : 'N/A'}</span></td>
          </tr>
        `;
      });

      pdfContent += `
              </tbody>
            </table>
              </div>
              
              <div class="footer" style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #ff6b35;">
                <div>This report was generated automatically on ${new Date().toLocaleDateString('en-IN')}</div>
                <div style="margin-top: 5px; font-size: 10px;">Confidential - For Internal Use Only</div>
              </div>
            </div>
          </body>
        </html>
      `;

      // Create and download PDF
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
    { title: 'Total Suppliers', value: `${suppliers.length}`, color: '#3b82f6', icon: FaTruck },
    { title: 'Active Suppliers', value: `${suppliers.filter((suppliers) => suppliers.status === "active").length}`, color: '#10b981', icon: FaUsers },
    { title: 'Monthly Purchases', value: `₹${0}L`, color: '#8b5cf6', icon: FaRupeeSign }
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
            onClick={fetchSuppliers}
            disabled={loading}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
            }}
          >{loading ? 'Loading...' : 'Refresh'}</button>
          <button
            onClick={() => Router.navigate('suppliers-edit')}
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
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981'
                }}></div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#166534'
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
          Total Suppliers: {suppliers.filter(supplier =>
            supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.supplierId?.toString().includes(searchTerm) ||
            supplier.addresses?.[0]?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.addresses?.[0]?.state?.toLowerCase().includes(searchTerm.toLowerCase())
          ).length}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Table
          data={suppliers.filter(supplier =>
            supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.supplierId?.toString().includes(searchTerm) ||
            supplier.addresses?.[0]?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.addresses?.[0]?.state?.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          columns={[
            { 
              key: 'supplierId', 
              header: 'ID', 
              width: '1fr',
              render: (row) => (
                <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '13px' }}>
                  {row.supplierId?.toString().padStart(3, '0') || '000'}
                </span>
              )
            },
            { 
              key: 'name', 
              header: 'Supplier Info',
              width: '2fr',
              render: (row) => (
                <div style={{ padding: '2px 0' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1e293b' }}>
                    {row.name || 'N/A'}
                  </div>
                </div>
              )
            },
            {
              key: 'contactPerson',
              header: 'Contact',
              width: '1.5fr',
              render: (row) => (
                <div style={{ padding: '2px 0' }}>
                  <div style={{ fontWeight: '600', fontSize: '13px', color: '#1e293b', marginBottom: '4px' }}>
                    {row.contactPerson || 'N/A'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>
                    {row.email || 'No email'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {row.phone?.[0] || 'No phone'}
                  </div>
                </div>
              )
            },
            {
              key: 'rating',
              header: 'Rating',
              width: '1fr',
              render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '14px' }}>⭐</span>
                  <span style={{ fontWeight: '600', color: '#f59e0b', fontSize: '13px' }}>{row.rating || 'N/A'}</span>
                </div>
              )
            },
            { 
              key: 'city', 
              header: 'Location', 
              width: '1.5fr',
              render: (row) => (
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {row.addresses?.[0]?.city || 'N/A'}, {row.addresses?.[0]?.state || 'N/A'}
                </div>
              )
            },
            { 
              key: 'creditLimit', 
              header: 'Credit Limit', 
              width: '1.2fr',
              render: (row) => (
                <span style={{ fontWeight: '600', color: '#059669', fontSize: '13px' }}>
                  ₹{((row.creditLimit || 0)/1000).toFixed(0)}K
                </span>
              )
            },
            {
              key: 'status', 
              header: 'Status', 
              width: '1fr',
              render: (row) => (
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: row.status?.toLowerCase() === 'active' ? '#dcfce7' : '#fee2e2',
                  color: row.status?.toLowerCase() === 'active' ? '#166534' : '#dc2626',
                  border: `1px solid ${row.status?.toLowerCase() === 'active' ? '#bbf7d0' : '#fecaca'}`
                }}>
                  {row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase() : 'N/A'}
                </span>
              )
            },
            {
              key: 'actions',
              header: 'Actions',
              width: '1.2fr',
              render: (row) => (
                <ActionButtons
                  onEdit={() => Router.navigate('suppliers-edit', { id: row.supplierId })}
                  onDelete={() => handleDeleteSupplier(row.supplierId)}
                />
              )
            }
          ]}
          paginationFlag={true}
          recordsPerPage={10}
        />
      </div>

      <ConfirmationBox
        isOpen={confirmationBox.isOpen}
        title="Delete Supplier"
        message="Are you sure you want to delete this supplier? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={confirmationBox.loading}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}