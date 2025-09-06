import { useState } from 'react';
import { MdSave, MdCancel, MdPerson, MdEmail, MdPhone, MdBusiness, MdLocationOn, MdCheckCircle, MdError } from 'react-icons/md';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Input from '../../components/input/Input';
import Dropdown from '../../components/dropdown/Dropdown';

export default function CreateUser() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    businessName: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    status: 'active'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const roles = ['admin', 'retailer', 'supplier', 'customer'];
  const states = ['Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Uttar Pradesh'];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        businessName: formData.businessName,
        role: formData.role || 'retailer',
        address: formData.address
      };

      const response = await axios.post('http://localhost:5000/api/create-user', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success('User created successfully!', {
        duration: 2000,
        position: 'top-left'
      });
      
      // Reset form after successful creation
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        businessName: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India'
        },
        status: 'active'
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create user. Please try again.';
      toast.error(errorMessage, {
        duration: 2000,
        position: 'top-left'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #475569, #94a3b8)',
        padding: '24px',
        borderRadius: '16px',
        marginBottom: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <MdPerson size={32} color="white" />
        <div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 4px 0'
          }}>Create New User</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            margin: 0
          }}>Add a new user to the system</p>
        </div>
      </div>





      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0 0 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <MdPerson size={20} color="#3b82f6" />
            Personal Information
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0 0 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <MdBusiness size={20} color="#3b82f6" />
            Business Information
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            <Dropdown
              placeholder="Select Role"
              options={roles}
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
            />
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0 0 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <MdLocationOn size={20} color="#3b82f6" />
            Address Information
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <Input
              type="text"
              placeholder="Street Address"
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <Input
              type="text"
              placeholder="City"
              value={formData.address.city}
              onChange={(e) => handleInputChange('address.city', e.target.value)}
            />
            <Dropdown
              placeholder="Select State"
              options={states}
              value={formData.address.state}
              onChange={(e) => handleInputChange('address.state', e.target.value)}
            />
            <Input
              type="text"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={(e) => handleInputChange('address.pincode', e.target.value)}
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            style={{
              padding: '12px 24px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              background: 'white',
              color: '#6b7280',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <MdCancel size={18} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '12px',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
          >
            <MdSave size={18} />
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
}