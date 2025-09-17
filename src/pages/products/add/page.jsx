import { useState } from 'react';
import './style.css';
import Input from '../../../components/input/Input';
import Dropdown from '../../../components/dropdown/Dropdown';
import Router from '../../../utils/Router';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    sellingPrice: '',
    stock: '',
    unit: 'pcs',
    gst: '18',
    hsnCode: '',
    description: '',
    color: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data:', formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="add-product">
      <div className="page-header">
        <div>
          <h2>Add New Product</h2>
          <p>Create a new product in your inventory</p>
        </div>
        <button 
          className="back-btn"
          onClick={() => Router.navigate('products')}
        >
          Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <Input
              label="Product Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
            <Input
              label="Brand"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              required
            />
            <Dropdown
              label="Category"
              placeholder="Select Category"
              options={['Electronics', 'Headphones', 'Clothing', 'Food', 'Books']}
              value={formData.category}
              onChange={(value) => handleChange('category', value)}
            />
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Pricing & Stock</h3>
          <div className="form-grid">
            <Input
              label="Cost Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              required
            />
            <Input
              label="Selling Price (₹)"
              type="number"
              value={formData.sellingPrice}
              onChange={(e) => handleChange('sellingPrice', e.target.value)}
              required
            />
            <Input
              label="Stock Quantity"
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              required
            />
            <Dropdown
              label="Unit"
              options={['pcs', 'kg', 'ltr', 'box', 'pack']}
              value={formData.unit}
              onChange={(value) => handleChange('unit', value)}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Tax Information</h3>
          <div className="form-grid">
            <Dropdown
              label="GST Rate (%)"
              options={['0', '5', '12', '18', '28']}
              value={formData.gst}
              onChange={(value) => handleChange('gst', value)}
            />
            <Input
              label="HSN Code"
              value={formData.hsnCode}
              onChange={(e) => handleChange('hsnCode', e.target.value)}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Product Attributes</h3>
          <div className="form-grid">
            <Input
              label="Color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
            />
            <Input
              label="Type"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => Router.navigate('products')}
          >Cancel</button>
          <button type="submit" className="save-btn">Save Product</button>
        </div>
      </form>
    </div>
  );
}