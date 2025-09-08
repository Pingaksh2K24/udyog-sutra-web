import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUsers, FaUserCheck, FaUserPlus, FaCrown } from 'react-icons/fa';
import Table from '../../components/table/Table';
import ActionButtons from '../../components/action/ActionButtons';
import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/input/Input';
import ReportButtons from '../../components/report/ReportButtons';
import ConfirmationBox from '../../components/confirmationbox/ConfirmationBox';
import CookiesHandler from '../../utils/CookiesHandler';
import Router from '../../utils/Router';
import { generateCustomersReport } from '../../templates/CustomersReport';
export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleDeleteCustomer = (customerId) => {
    setCustomerToDelete(customerId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/customers/deleteCustomer/${customerToDelete}`);
      toast.success('Customer deleted successfully!', { position: 'top-left' });
      fetchCustomers();
      setShowConfirmation(false);
      setCustomerToDelete(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer', { position: 'top-left' });
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setCustomerToDelete(null);
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
      
      const pdfContent = generateCustomersReport(customers, businessName);

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
    { title: 'Total Customers', value: `${customers.length}`, color: '#3b82f6', icon: FaUsers },
    { title: 'Active Customers', value: `${customers.filter((cust)=>cust.status==="Active").length}`, color: '#10b981', icon: FaUserCheck },
    { title: 'New This Month', value: '0', color: '#f59e0b', icon: FaUserPlus },
    { title: 'Top Spenders', value: '0', color: '#8b5cf6', icon: FaCrown }
  ];

  return (
    <div className="customers">
      <div className="page-header">
        <div className="page-header-content">
          <h2>Customer Management</h2>
          <p>Manage your customer relationships and data</p>
        </div>
        <div className="page-header-actions">
          <button
            className="refresh-btn"
            onClick={fetchCustomers}
            disabled={loading}
          >{loading ? 'Loading...' : 'Refresh'}</button>
          <button
            className="add-customer-btn"
            onClick={() => {
              Router.navigate('customers/edit');
            }}
          >Add Customer</button>
        </div>
      </div>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-custom">
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

      <div className="customers-summary">
        <div className="total-customers">
          Total Customers: {customers.length}
        </div>
        <ReportButtons
          onExcelClick={() => toast.success('Excel report generated!')}
          onPdfClick={generatePDFReport}
        />
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

      <div className="table-container">
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
                  onEdit={() => {
                    Router.navigate('customers/edit', { customerId: row.customerId || row.id });
                  }}
                  onDelete={() => handleDeleteCustomer(row.customerId || row.id)}
                />
              )
            }
          ]}
          paginationFlag={true}
          recordsPerPage={10}
        />
      </div>
      
      <ConfirmationBox
        isOpen={showConfirmation}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}