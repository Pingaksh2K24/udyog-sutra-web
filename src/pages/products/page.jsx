import './style.css';
import { MdAdd, MdEdit, MdDelete, MdViewModule, MdViewList, MdMoreVert } from 'react-icons/md';
import { FaBoxes, FaTag, FaRupeeSign, FaWarehouse } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../../components/dropdown/Dropdown';
import Input from '../../components/input/Input';
import Table from '../../components/table/Table';
import ActionButtons from '../../components/action/ActionButtons';

export default function Products() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data || []);
    } catch (error) {
      setProducts(dummyProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const dummyProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice',
      sku: 'PRD001',
      category: 'Grains & Cereals',
      price: 850,
      stock: 45,
      status: 'in-stock',
      images: ['/images/logo1.png', '/images/logo.png'],
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
      images: ['/images/logo1.png', '/images/logo.png'],
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
      images: ['/images/logo1.png', '/images/logo.png'],
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
      images: ['/images/logo1.png', '/images/logo.png'],
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
      images: ['/images/logo1.png', '/images/logo.png'],
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
      images: ['/images/logo1.png', '/images/logo.png'],
      description: 'Natural Himalayan pink salt',
      supplier: 'Mountain Salt Co.'
    }
  ];

  const categories = ['All Categories', 'Grains & Cereals', 'Flour & Grains', 'Oils & Fats', 'Sweeteners', 'Pulses & Lentils', 'Spices & Seasonings'];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrevImage = (productId, e) => {
    e.stopPropagation();
    e.preventDefault();
    const product = filteredProducts.find(p => p.id === productId);
    if (!product?.images?.length) return;

    const currentIndex = currentImageIndex[productId] || 0;
    const newIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
    setCurrentImageIndex(prev => ({ ...prev, [productId]: newIndex }));
  };

  const handleNextImage = (productId, e) => {
    e.stopPropagation();
    e.preventDefault();
    const product = filteredProducts.find(p => p.id === productId);
    if (!product?.images?.length) return;

    const currentIndex = currentImageIndex[productId] || 0;
    const newIndex = (currentIndex + 1) % product.images.length;
    setCurrentImageIndex(prev => ({ ...prev, [productId]: newIndex }));
  };

  return (
    <div className="products">
      <div className="page-header">
        <div className="page-header-content">
          <h2>Product Management</h2>
          <p>Manage your inventory and product catalog</p>
        </div>
        <div className="page-header-actions">
          <button
            className="refresh-btn"
            onClick={fetchProducts}
            disabled={loading}
          >{loading ? 'Loading...' : 'Refresh'}</button>
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
            <span className="stat-value">{products?.length}</span>
            <span className="stat-label">In Stock</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <FaTag size={20} color="#f59e0b" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{products.filter(p => p.stock <= 5).length}</span>
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
          <Input
            type="text"
            placeholder="Search products by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown
            placeholder="All Categories"
            options={categories.slice(1)}
          />
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            style={{
              padding: '12px 16px',
              border: viewMode === 'grid' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
              borderRadius: '12px',
              background: viewMode === 'grid' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'white',
              color: viewMode === 'grid' ? 'white' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: viewMode === 'grid' ? '0 4px 15px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            <MdViewModule size={18} />
            <span>Grid</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            style={{
              padding: '12px 16px',
              border: viewMode === 'list' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
              borderRadius: '12px',
              background: viewMode === 'list' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'white',
              color: viewMode === 'list' ? 'white' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: viewMode === 'list' ? '0 4px 15px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            <MdViewList size={18} />
            <span>List</span>
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <div className={`stock-status ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                  {product.stock === 0 ? 'Out of Stock' : 'In Stock'}
                </div>

                <div className="product-actions">
                  <button className="action-btn edit">
                    <MdEdit size={16} />
                  </button>
                  <button className="action-btn delete">
                    <MdDelete size={16} />
                  </button>
                </div>

                <img
                  src={`http://localhost:5000/${product.images?.[currentImageIndex[product.id] || 0] || product.images?.[0] || '/images/logo1.png'}`}
                  alt={product.name}
                  className="product-image"
                />
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => handlePrevImage(product.id, e)}
                      className="image-nav-btn prev"
                    >‹</button>
                    <button
                      onClick={(e) => handleNextImage(product.id, e)}
                      className="image-nav-btn next"
                    >›</button>
                  </>
                )}
              </div>
              <div className="product-content">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-sku">SKU: {product.sku}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <div className="price-info">
                    <div className="price">₹{product.price}</div>
                    <div className="stock">{product.stock} units</div>
                  </div>
                  <div className="supplier-info">{product.supplier}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-container">
          <Table
            data={filteredProducts}
            columns={[
              {
                key: 'product',
                header: 'Product',
                render: (row) => (
                  <div className="table-product-cell">
                    <img src={`http://localhost:5000/${row.images?.[0] || '/images/logo1.png'}`} alt={row.name} className="table-product-image" />
                    <div className="table-product-info">
                      <div className="name">{row.name}</div>
                      <div className="sku">SKU: {row.sku}</div>
                    </div>
                  </div>
                )
              },
              { key: 'category', header: 'Category' },
              { key: 'price', header: 'Price', render: (row) => `₹${row.price}` },
              { key: 'stock', header: 'Stock', render: (row) => `${row.stock} units` },
              {
                key: 'status',
                header: 'Status',
                render: (row) => (
                  <span className={`status ${row.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                    {row.stock === 0 ? 'Out of Stock' : 'In Stock'}
                  </span>
                )
              },
              {
                key: 'actions',
                header: 'Actions',
                render: (row) => (
                  <ActionButtons
                    onEdit={() => console.log('Edit product:', row.id)}
                    onDelete={() => console.log('Delete product:', row.id)}
                  />
                )
              }
            ]}
            paginationFlag={true}
            recordsPerPage={10}
          />
        </div>
      )}
    </div>
  );
}