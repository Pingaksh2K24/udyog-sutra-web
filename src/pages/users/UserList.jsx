import { useState, useEffect } from 'react';
import { MdPeople, MdEdit, MdDelete, MdAdd, MdSearch } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import Table from '../../components/table/Table';
import Input from '../../components/input/Input';
import ActionButtons from '../../components/action/ActionButtons';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.users || response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      // Fallback dummy data
      setUsers([
        {
          _id: '1',
          user_id: 'USR0001',
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+91-9876543210',
          role: 'admin',
          businessName: 'Tech Solutions',
          status: 'active',
          createdAt: '2025-01-01T10:00:00Z'
        },
        {
          _id: '2',
          user_id: 'USR0002',
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+91-9876543211',
          role: 'retailer',
          businessName: 'Retail Store',
          status: 'active',
          createdAt: '2025-01-02T10:00:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId) => {
    toast.success(`Edit user: ${userId}`);
  };

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      toast.success(`Delete user: ${userId}`);
    }
  };

  const columns = [
    {
      key: 'user_id',
      header: 'User ID',
      render: (row) => (
        <span style={{ fontWeight: '600', color: '#3b82f6' }}>
          {row.user_id}
        </span>
      )
    },
    {
      key: 'user',
      header: 'User Details',
      render: (row) => (
        <div>
          <div style={{ fontWeight: '600', fontSize: '14px' }}>{row.fullName}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{row.email}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{row.phone}</div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          background: row.role === 'admin' ? '#dbeafe' : row.role === 'retailer' ? '#dcfce7' : '#fef3c7',
          color: row.role === 'admin' ? '#1e40af' : row.role === 'retailer' ? '#166534' : '#92400e'
        }}>
          {row.role}
        </span>
      )
    },
    {
      key: 'businessName',
      header: 'Business',
      render: (row) => row.businessName || '-'
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          background: row.status === 'active' ? '#dcfce7' : '#fee2e2',
          color: row.status === 'active' ? '#166534' : '#dc2626'
        }}>
          {row.status}
        </span>
      )
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (row) => new Date(row.createdAt).toLocaleDateString()
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <ActionButtons
          onEdit={() => handleEdit(row.user_id)}
          onDelete={() => handleDelete(row.user_id)}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #475569, #94a3b8)',
        padding: '24px',
        borderRadius: '16px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MdPeople size={32} color="white" />
          <div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 4px 0'
            }}>User Management</h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              margin: 0
            }}>Manage system users and their permissions</p>
          </div>
        </div>
        <button
          onClick={() => toast.success('Navigate to Create User')}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
          }}
        >
          <MdAdd size={18} />
          Add User
        </button>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            margin: 0
          }}>Users List ({filteredUsers.length})</h3>
          <div style={{ width: '300px' }}>
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            fontSize: '16px',
            color: '#64748b'
          }}>
            Loading users...
          </div>
        ) : (
          <Table
            data={filteredUsers}
            columns={columns}
            paginationFlag={true}
            recordsPerPage={10}
          />
        )}
      </div>
    </div>
  );
}