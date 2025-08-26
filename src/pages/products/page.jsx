import './style.css';
import { MdAdd, MdSearch, MdEdit, MdDelete, MdFilterList, MdViewModule, MdViewList, MdMoreVert } from 'react-icons/md';
import { FaBoxes, FaTag, FaRupeeSign, FaWarehouse } from 'react-icons/fa';
import { useState } from 'react';

export default function Products() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Premium Basmati Rice',
      sku: 'PRD001',
      category: 'Grains & Cereals',
      price: 850,
      stock: 45,
      status: 'in-stock',
      image: '/images/logo1.png',
      description: 'High quality basmati rice from Punjab',
      supplier: 'Punjab Grains Ltd.'
    },
    {
      id: 2,
      name: 'Organic Wheat Flour',
      sku: 'PRD002',
      category: 'Flour & Grains',
      price: 320,
      stock: 12,
      status: 'low-stock',
      image: '/images/logo1.png',
      description: 'Organic whole wheat flour',
      supplier: 'Organic Foods Co.'
    },
    {
      id: 3,
      name: 'Sunflower Cooking Oil',
      sku: 'PRD003',
      category: 'Oils & Fats',
      price: 180,
      stock: 78,
      status: 'in-stock',
      image: '/images/logo1.png',
      description: 'Pure sunflower cooking oil 1L',
      supplier: 'Golden Oil Mills'
    },
    {
      id: 4,
      name: 'Refined Sugar',
      sku: 'PRD004',
      category: 'Sweeteners',
      price: 45,
      stock: 0,
      status: 'out-of-stock',
      image: '/images/logo1.png',
      description: 'Pure refined white sugar 1kg',
      supplier: 'Sweet Industries'
    },
    {
      id: 5,
      name: 'Toor Dal (Arhar)',
      sku: 'PRD005',
      category: 'Pulses & Lentils',
      price: 120,
      stock: 89,
      status: 'in-stock',
      image: '/images/logo1.png',
      description: 'Premium quality toor dal',
      supplier: 'Dal Traders'
    },
    {
      id: 6,
      name: 'Himalayan Pink Salt',
      sku: 'PRD006',
      category: 'Spices & Seasonings',
      price: 95,
      stock: 23,
      status: 'low-stock',
      image: '/images/logo1.png',
      description: 'Natural Himalayan pink salt',
      supplier: 'Mountain Salt Co.'
    }
  ];

  const categories = ['All Categories', 'Grains & Cereals', 'Flour & Grains', 'Oils & Fats', 'Sweeteners', 'Pulses & Lentils', 'Spices & Seasonings'];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products">
      <div className="products-header">
        <div className="header-left">
          <h2 className="products-title">Product Management</h2>
          <p className="products-subtitle">Manage your inventory and product catalog</p>
        </div>
        <div className="header-actions">
          <button className="filter-btn">
            <MdFilterList size={20} />
            <span>Filter</span>
          </button>
          <button className="add-product-btn">
            <MdAdd size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="products-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <FaBoxes size={20} color="#3b82f6" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{products.length}</span>
            <span className="stat-label">Total Products</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <FaWarehouse size={20} color="#10b981" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{products.filter(p => p.status === 'in-stock').length}</span>
            <span className="stat-label">In Stock</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <FaTag size={20} color="#f59e0b" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{products.filter(p => p.status === 'low-stock').length}</span>
            <span className="stat-label">Low Stock</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <FaRupeeSign size={20} color="#8b5cf6" />
          </div>
          <div className="stat-info">
            <span className="stat-value">₹{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}</span>
            <span className="stat-label">Total Value</span>
          </div>
        </div>
      </div>
      
      <div className="products-controls">
        <div className="search-section">
          <div className="search-container">
            <MdSearch className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="category-filter">
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <MdViewModule size={20} />
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <MdViewList size={20} />
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button className="action-btn edit">
                    <MdEdit size={16} />
                  </button>
                  <button className="action-btn delete">
                    <MdDelete size={16} />
                  </button>
                  <button className="action-btn more">
                    <MdMoreVert size={16} />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className={`stock-badge ${product.status}`}>
                    {product.status === 'in-stock' ? 'In Stock' : 
                     product.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>
                <p className="product-sku">SKU: {product.sku}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <div className="price-info">
                    <span className="product-price">₹{product.price}</span>
                    <span className="stock-count">{product.stock} units</span>
                  </div>
                  <span className="supplier-name">{product.supplier}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="products-table">
          <div className="table-header">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          
          {filteredProducts.map((product) => (
            <div key={product.id} className="table-row">
              <div className="product-cell">
                <img src={product.image} alt={product.name} className="product-thumb" />
                <div className="product-details">
                  <span className="product-name">{product.name}</span>
                  <span className="product-sku">SKU: {product.sku}</span>
                </div>
              </div>
              <span className="category-cell">{product.category}</span>
              <span className="price-cell">₹{product.price}</span>
              <span className="stock-cell">{product.stock} units</span>
              <span className={`status-cell ${product.status}`}>
                {product.status === 'in-stock' ? 'In Stock' : 
                 product.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
              </span>
              <div className="actions-cell">
                <button className="table-action-btn edit">
                  <MdEdit size={16} />
                </button>
                <button className="table-action-btn delete">
                  <MdDelete size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}