import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from '../../../utils/Router';
import './style.css';

export default function EditSupplier({ supplierId }) {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (supplierId) {
      fetchSupplier();
    }
  }, [supplierId]);

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/suppliers/${supplierId}`);
      console.log('Supplier Details:', response.data);
      setSupplier(response.data);
    } catch (error) {
      console.error('Error fetching supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e,id) => {
    e.preventDefault();
    setLoading(true);
    console.log('Selected supplier Id  data:', id);
    try {
      const response = await axios.put(`http://localhost:5000/api/suppliers/${id}`, supplier);
      console.log('Supplier updated:', response.data);
      alert('Supplier updated successfully!');
      Router.navigate('suppliers');
    } catch (error) {
      console.error('Error updating supplier:', error);
      alert(error.response?.data?.message || 'Failed to update supplier');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSupplier(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...supplier.addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value
    };
    setSupplier(prev => ({
      ...prev,
      addresses: updatedAddresses
    }));
  };

  const handleBankDetailsChange = (field, value) => {
    setSupplier(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [field]: value
      }
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!supplier) return <div className="error">Supplier not found</div>;

  return (
    <div className="edit-supplier">
      <div className="edit-container">
        <div className="edit-header">
          <h2>Edit Supplier</h2>
          <button onClick={() => Router.navigate('suppliers')} className="back-btn">
            Back to Suppliers
          </button>
        </div>

      <form onSubmit={(e)=>handleSubmit(e,supplier.supplierId)} className="edit-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Supplier ID</label>
              <input type="text" value={supplier.supplierId} disabled />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={supplier.name} 
                onChange={(e) => handleChange('name', e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Contact Person</label>
              <input 
                type="text" 
                value={supplier.contactPerson} 
                onChange={(e) => handleChange('contactPerson', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={supplier.email} 
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="text" 
                value={supplier.phone?.[0] || ''} 
                onChange={(e) => handleChange('phone', [e.target.value])}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select 
                value={supplier.status} 
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Address Information</h3>
          {supplier.addresses?.map((address, index) => (
            <div key={index} className="address-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>Type</label>
                  <input 
                    type="text" 
                    value={address.type} 
                    onChange={(e) => handleAddressChange(index, 'type', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Street</label>
                  <input 
                    type="text" 
                    value={address.street} 
                    onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={address.city} 
                    onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text" 
                    value={address.state} 
                    onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input 
                    type="text" 
                    value={address.country} 
                    onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input 
                    type="text" 
                    value={address.postalCode} 
                    onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-section">
          <h3>Business Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>GST Number</label>
              <input 
                type="text" 
                value={supplier.gstNumber} 
                onChange={(e) => handleChange('gstNumber', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>PAN Number</label>
              <input 
                type="text" 
                value={supplier.panNumber} 
                onChange={(e) => handleChange('panNumber', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Payment Terms</label>
              <input 
                type="text" 
                value={supplier.paymentTerms} 
                onChange={(e) => handleChange('paymentTerms', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Credit Limit</label>
              <input 
                type="number" 
                value={supplier.creditLimit} 
                onChange={(e) => handleChange('creditLimit', parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input 
                type="number" 
                min="1" 
                max="5" 
                value={supplier.rating} 
                onChange={(e) => handleChange('rating', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Bank Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Bank Name</label>
              <input 
                type="text" 
                value={supplier.bankDetails?.bankName || ''} 
                onChange={(e) => handleBankDetailsChange('bankName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input 
                type="text" 
                value={supplier.bankDetails?.accountNumber || ''} 
                onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>IFSC Code</label>
              <input 
                type="text" 
                value={supplier.bankDetails?.ifscCode || ''} 
                onChange={(e) => handleBankDetailsChange('ifscCode', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Branch</label>
              <input 
                type="text" 
                value={supplier.bankDetails?.branch || ''} 
                onChange={(e) => handleBankDetailsChange('branch', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-group">
            <label>Notes</label>
            <textarea 
              value={supplier.notes} 
              onChange={(e) => handleChange('notes', e.target.value)}
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => Router.navigate('suppliers')} className="cancel-btn" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}