import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from '../../../utils/Router';
import CookiesHandler from '../../../utils/CookiesHandler';
import './style.css';
import toast from 'react-hot-toast';

export default function EditCustomer({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      fetchCustomer();
    } else {
      // Initialize empty customer for add mode
      setCustomer({
        name: '',
        email: '',
        phone: '',
        altPhone: '',
        gender: 'Male',
        dob: '',
        profilePhoto: '',
        loyaltyPoints: 0,
        status: 'Active',
        notes: '',
        outstandingAmount: 0,
        isVerified: false
      });
      setLoading(false);
    }
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
      toast.error('Failed to load customer details', { position: 'top-left' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userId = CookiesHandler.get('userId');
      
      if (customerId) {
        // Update existing customer
        const customerData = {
          ...customer,
          user_id: userId,
          createdBy: userId
        };
        await axios.put(`http://localhost:5000/api/customers/editCustomer/${customerId}`, customerData);
        toast.success('Customer updated successfully!', { position: 'top-left' });
      } else {
        // Create new customer
        const customerData = {
          ...customer,
          user_id: userId,
          createdBy: userId
        };
        await axios.post('http://localhost:5000/api/customers/createNewCustomer', customerData);
        toast.success('Customer created successfully!', { position: 'top-left' });
      }
      
      Router.navigate('customers');
    } catch (error) {
      console.error('Error saving customer:', error);
      toast.error('Failed to save customer', { position: 'top-left' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setCustomer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!customer) return <div className="error">Customer not found</div>;

  return (
    <div className="edit-customer">
      <div className="edit-container">
        <div className="edit-header">
          <h2>{customerId ? 'Edit Customer' : 'Add New Customer'}</h2>
          <button onClick={() => Router.navigate('customers')} className="back-btn">
            Back to Customers
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              {customerId && (
                <div className="form-group">
                  <label>Customer ID</label>
                  <input type="text" value={customer.customerId} disabled />
                </div>
              )}
              <div className="form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  value={customer.name} 
                  onChange={(e) => handleChange('name', e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={customer.email} 
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input 
                  type="text" 
                  value={customer.phone} 
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Alt Phone</label>
                <input 
                  type="text" 
                  value={customer.altPhone} 
                  onChange={(e) => handleChange('altPhone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select 
                  value={customer.gender} 
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Personal Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  value={customer.dob} 
                  onChange={(e) => handleChange('dob', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Profile Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleChange('profilePhoto', e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <label>Loyalty Points</label>
                <input 
                  type="number" 
                  value={customer.loyaltyPoints} 
                  onChange={(e) => handleChange('loyaltyPoints', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={customer.status} 
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Notes</label>
                <textarea 
                  value={customer.notes} 
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows="3"
                  placeholder="Add any notes about the customer..."
                />
              </div>
              <div className="form-group">
                <label>Outstanding Amount</label>
                <input 
                  type="number" 
                  value={customer.outstandingAmount} 
                  onChange={(e) => handleChange('outstandingAmount', parseFloat(e.target.value) || 0)}
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Is Verified</label>
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    checked={customer.isVerified} 
                    onChange={(e) => handleChange('isVerified', e.target.checked)}
                    id="isVerified"
                  />
                  <label htmlFor="isVerified">Customer is verified</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => Router.navigate('customers')} className="cancel-btn" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : (customerId ? 'Save Changes' : 'Add Customer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}