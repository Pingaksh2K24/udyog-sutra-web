import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Input from '../../components/input/Input';
import Dropdown from '../../components/dropdown/Dropdown';
import toast from 'react-hot-toast';
import './CustomerForm.css';

export default function CustomerForm({ customerId, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    creditLimit: '',
    status: 'Active'
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const customerTypes = ['Retailer', 'Wholesaler', 'Distributor'];
  const statusOptions = ['Active', 'Inactive'];

  useEffect(() => {
    if (customerId) {
      // Load customer data for editing
      loadCustomerData(customerId);
    }
  }, [customerId]);

  const loadCustomerData = async (id) => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockData = {
        name: 'Rajesh Traders',
        email: 'rajesh@traders.com',
        phone: '+91 98765 43210',
        type: 'Retailer',
        address: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        gstNumber: '27ABCDE1234F1Z5',
        creditLimit: '50000',
        status: 'Active'
      };
      setFormData(mockData);
    } catch (error) {
      toast.error('Failed to load customer data');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.type) newErrors.type = 'Customer type is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors');
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(customerId ? 'Customer updated successfully!' : 'Customer added successfully!');
      onSave && onSave(formData);
      onClose && onClose();
    } catch (error) {
      toast.error('Failed to save customer');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="customer-form-overlay">
      <div className="customer-form-container">
        <div className="customer-form-header">
          <div className="header-left">
            <button className="back-btn" onClick={onClose}>
              <FaArrowLeft size={16} />
            </button>
            <div>
              <h2>{customerId ? 'Edit Customer' : 'Add New Customer'}</h2>
              <p>Fill in the customer details below</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="customer-form">
          <div className="form-grid">
            <div className="form-section">
              <h3><FaUser /> Basic Information</h3>
              <div className="form-row">
                <div className="form-field">
                  <Input
                    label="Customer Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter customer name"
                    error={errors.name}
                  />
                </div>
                <div className="form-field">
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    error={errors.email}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <Input
                    label="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    error={errors.phone}
                  />
                </div>
                <div className="form-field">
                  <label>Customer Type *</label>
                  <Dropdown
                    placeholder="Select customer type"
                    options={customerTypes}
                    value={formData.type}
                    onChange={(value) => handleInputChange('type', value)}
                    error={errors.type}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3><FaMapMarkerAlt /> Address Information</h3>
              <div className="form-field">
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter full address"
                />
              </div>
              
              <div className="form-row">
                <div className="form-field">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div className="form-field">
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
                <div className="form-field">
                  <Input
                    label="Pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Business Information</h3>
              <div className="form-row">
                <div className="form-field">
                  <Input
                    label="GST Number"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    placeholder="Enter GST number"
                  />
                </div>
                <div className="form-field">
                  <Input
                    label="Credit Limit"
                    type="number"
                    value={formData.creditLimit}
                    onChange={(e) => handleInputChange('creditLimit', e.target.value)}
                    placeholder="Enter credit limit"
                  />
                </div>
                <div className="form-field">
                  <label>Status</label>
                  <Dropdown
                    placeholder="Select status"
                    options={statusOptions}
                    value={formData.status}
                    onChange={(value) => handleInputChange('status', value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              <FaTimes size={16} />
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              <FaSave size={16} />
              {loading ? 'Saving...' : (customerId ? 'Update Customer' : 'Add Customer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}