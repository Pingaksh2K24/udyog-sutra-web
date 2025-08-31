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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      console.log('Products API Response:', response);
      console.log('Products Data:', response.data);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Products API Error:', error);
      console.log('Error Response:', error.response);
      // Fallback to dummy data if API fails
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
          }}>Product Management</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            margin: 0,
            fontWeight: '500'
          }}>Manage your inventory and product catalog</p>
        </div>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <button 
            style={{
              padding: '12px 24px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              background: '#f1f5f9',
              color: '#475569',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px'
            }}
            onClick={fetchProducts} 
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = '#e2e8f0';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f1f5f9';
              e.target.style.transform = 'translateY(0)';
            }}
          >{loading ? 'Loading...' : 'Refresh'}</button>
          <button 
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
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}
          >
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
            onMouseEnter={(e) => {
              if (viewMode !== 'grid') {
                e.target.style.background = '#f8fafc';
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'grid') {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.transform = 'translateY(0)';
              }
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
            onMouseEnter={(e) => {
              if (viewMode !== 'list') {
                e.target.style.background = '#f8fafc';
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'list') {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            <MdViewList size={18} />
            <span>List</span>
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          marginTop: '24px'
        }}>
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{
                position: 'relative',
                height: '200px',
                background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '2px solid white',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    <MdEdit size={16} />
                  </button>
                  <button style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#ef4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    <MdDelete size={16} />
                  </button>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: product.stock === 0 ? '#fee2e2' : '#dcfce7',
                  color: product.stock === 0 ? '#dc2626' : '#166534'
                }}>
                  {product.stock === 0 ? 'Out of Stock' : 'In Stock'}
                </div>
              </div>
              <div style={{
                padding: '20px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: '0 0 8px 0'
                }}>{product.name}</h3>
                <p style={{
                  fontSize: '12px',
                  color: '#64748b',
                  margin: '0 0 8px 0'
                }}>SKU: {product.sku}</p>
                <p style={{
                  fontSize: '14px',
                  color: '#3b82f6',
                  margin: '0 0 8px 0',
                  fontWeight: '600'
                }}>{product.category}</p>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: '0 0 16px 0',
                  lineHeight: '1.4'
                }}>{product.description}</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '800',
                      color: '#1e293b'
                    }}>₹{product.price}</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b'
                    }}>{product.stock} units</div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    textAlign: 'right'
                  }}>{product.supplier}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{marginTop: '24px'}}>
          <Table 
            data={filteredProducts}
            columns={[
              { 
                key: 'product', 
                header: 'Product', 
                render: (row) => (
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <img src={row.image} alt={row.name} style={{width: '40px', height: '40px', borderRadius: '8px'}} />
                    <div>
                      <div style={{fontWeight: '600'}}>{row.name}</div>
                      <div style={{fontSize: '12px', color: '#64748b'}}>SKU: {row.sku}</div>
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