import './style.css';
import { 
  MdInventory, MdWarning, MdTrendingDown, MdAttachMoney, MdAdd, MdFileDownload, 
  MdSearch, MdFilterList, MdLocationOn, MdUpdate, MdVisibility, MdBarChart,
  MdNotifications, MdHistory, MdSettings
} from 'react-icons/md';
import { FaBoxes, FaWarehouse, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';
import { useState } from 'react';

export default function Inventory() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const inventoryData = [
    { 
      id: 1, 
      product: 'Premium Basmati Rice', 
      category: 'Grains & Cereals', 
      currentStock: 150, 
      minStock: 50, 
      maxStock: 500, 
      location: 'Warehouse A - Section 1', 
      status: 'In Stock',
      lastUpdated: '2024-01-15',
      supplier: 'Punjab Grains Ltd.',
      unitPrice: 85,
      totalValue: 12750,
      reorderPoint: 75
    },
    { 
      id: 2, 
      product: 'Organic Wheat Flour', 
      category: 'Flour & Grains', 
      currentStock: 25, 
      minStock: 30, 
      maxStock: 200, 
      location: 'Warehouse B - Section 2', 
      status: 'Low Stock',
      lastUpdated: '2024-01-14',
      supplier: 'Organic Foods Co.',
      unitPrice: 32,
      totalValue: 800,
      reorderPoint: 40
    },
    { 
      id: 3, 
      product: 'Sunflower Cooking Oil', 
      category: 'Oils & Fats', 
      currentStock: 0, 
      minStock: 20, 
      maxStock: 100, 
      location: 'Warehouse A - Section 3', 
      status: 'Out of Stock',
      lastUpdated: '2024-01-12',
      supplier: 'Golden Oil Mills',
      unitPrice: 180,
      totalValue: 0,
      reorderPoint: 25
    },
    { 
      id: 4, 
      product: 'Refined Sugar', 
      category: 'Sweeteners', 
      currentStock: 80, 
      minStock: 25, 
      maxStock: 150, 
      location: 'Warehouse C - Section 1', 
      status: 'In Stock',
      lastUpdated: '2024-01-15',
      supplier: 'Sweet Industries',
      unitPrice: 45,
      totalValue: 3600,
      reorderPoint: 35
    },
    { 
      id: 5, 
      product: 'Toor Dal (Arhar)', 
      category: 'Pulses & Lentils', 
      currentStock: 15, 
      minStock: 20, 
      maxStock: 120, 
      location: 'Warehouse B - Section 1', 
      status: 'Critical',
      lastUpdated: '2024-01-13',
      supplier: 'Dal Traders',
      unitPrice: 120,
      totalValue: 1800,
      reorderPoint: 30
    }
  ];

  const categories = ['all', 'Grains & Cereals', 'Flour & Grains', 'Oils & Fats', 'Sweeteners', 'Pulses & Lentils'];

  const filteredData = inventoryData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { 
      title: 'Total Items', 
      value: inventoryData.length.toString(), 
      color: '#3b82f6',
      icon: FaBoxes,
      change: '+5 this week'
    },
    { 
      title: 'Low Stock Items', 
      value: inventoryData.filter(item => item.status === 'Low Stock' || item.status === 'Critical').length.toString(), 
      color: '#f59e0b',
      icon: MdWarning,
      change: '2 need attention'
    },
    { 
      title: 'Out of Stock', 
      value: inventoryData.filter(item => item.status === 'Out of Stock').length.toString(), 
      color: '#ef4444',
      icon: MdTrendingDown,
      change: 'Immediate action required'
    },
    { 
      title: 'Total Value', 
      value: `₹${inventoryData.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()}`, 
      color: '#10b981',
      icon: MdAttachMoney,
      change: '+12% from last month'
    }
  ];

  const getStockPercentage = (current, max) => {
    return Math.min((current / max) * 100, 100);
  };

  const getStockColor = (status) => {
    switch (status) {
      case 'In Stock': return '#10b981';
      case 'Low Stock': return '#f59e0b';
      case 'Critical': return '#ef4444';
      case 'Out of Stock': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="inventory">
      <div className="inventory-header">
        <div className="header-left">
          <h2 className="inventory-title">Inventory Management</h2>
          <p className="inventory-subtitle">Monitor and manage your stock levels efficiently</p>
        </div>
        <div className="header-actions">
          <button className="action-btn secondary">
            <MdFileDownload size={20} />
            <span>Export Report</span>
          </button>
          <button className="action-btn primary">
            <MdAdd size={20} />
            <span>Add Stock</span>
          </button>
        </div>
      </div>

      <div className="inventory-alerts">
        <div className="alert critical">
          <MdNotifications size={20} />
          <span>1 item is out of stock and needs immediate restocking</span>
        </div>
        <div className="alert warning">
          <MdWarning size={20} />
          <span>2 items are running low on stock</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              padding: '24px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
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
                background: index === 1 || index === 2 ? '#fef3c7' : '#dcfce7',
                border: `1px solid ${index === 1 || index === 2 ? '#fde68a' : '#bbf7d0'}`
              }}>
                <MdBarChart size={14} color={index === 1 || index === 2 ? '#92400e' : '#166534'} />
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
              }}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="inventory-controls">
        <div className="controls-left">
          <div className="search-container">
            <MdSearch className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search products or categories..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <MdFilterList size={20} />
            <select 
              className="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="controls-right">
          <button className="quick-action-btn">
            <MdHistory size={16} />
            <span>Stock History</span>
          </button>
          <button className="quick-action-btn">
            <MdSettings size={16} />
            <span>Settings</span>
          </button>
        </div>
      </div>
      
      <div className="inventory-table-container">
        <div className="table-header-section">
          <h3 className="table-title">Stock Overview</h3>
          <div className="table-info">
            <span>{filteredData.length} items found</span>
          </div>
        </div>
        
        <div className="inventory-table">
          <div className="table-header">
            <span>Product Details</span>
            <span>Category</span>
            <span>Stock Level</span>
            <span>Stock Range</span>
            <span>Location</span>
            <span>Value</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          
          {filteredData.map((item) => (
            <div key={item.id} className="table-row">
              <div className="product-cell">
                <div className="product-image">
                  <FaBoxes size={24} color="#64748b" />
                </div>
                <div className="product-info">
                  <span className="product-name">{item.product}</span>
                  <span className="product-id">ID: INV{item.id.toString().padStart(3, '0')}</span>
                  <span className="supplier-name">{item.supplier}</span>
                </div>
              </div>
              
              <span className="category-cell">{item.category}</span>
              
              <div className="stock-cell">
                <div className="stock-info">
                  <span className="stock-number">{item.currentStock} units</span>
                  <div className="stock-bar">
                    <div 
                      className="stock-fill" 
                      style={{ 
                        width: `${getStockPercentage(item.currentStock, item.maxStock)}%`,
                        backgroundColor: getStockColor(item.status)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="range-cell">
                <span className="min-stock">Min: {item.minStock}</span>
                <span className="max-stock">Max: {item.maxStock}</span>
                <span className="reorder-point">Reorder: {item.reorderPoint}</span>
              </div>
              
              <div className="location-cell">
                <MdLocationOn size={16} color="#64748b" />
                <span>{item.location}</span>
              </div>
              
              <div className="value-cell">
                <span className="unit-price">₹{item.unitPrice}/unit</span>
                <span className="total-value">₹{item.totalValue.toLocaleString()}</span>
              </div>
              
              <span className={`status-cell ${item.status.toLowerCase().replace(' ', '-')}`}>
                {item.status}
              </span>
              
              <div className="actions-cell">
                <button className="table-action-btn update">
                  <MdUpdate size={16} />
                </button>
                <button className="table-action-btn view">
                  <MdVisibility size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="inventory-insights">
        <div className="insight-card">
          <div className="insight-header">
            <FaChartLine size={20} color="#3b82f6" />
            <h4>Stock Insights</h4>
          </div>
          <div className="insight-content">
            <div className="insight-item">
              <span className="insight-label">Most Stocked Category:</span>
              <span className="insight-value">Grains & Cereals</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Fastest Moving Item:</span>
              <span className="insight-value">Premium Basmati Rice</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Avg. Stock Turnover:</span>
              <span className="insight-value">15 days</span>
            </div>
          </div>
        </div>
        
        <div className="insight-card">
          <div className="insight-header">
            <FaWarehouse size={20} color="#10b981" />
            <h4>Warehouse Distribution</h4>
          </div>
          <div className="insight-content">
            <div className="warehouse-item">
              <span className="warehouse-name">Warehouse A</span>
              <div className="warehouse-bar">
                <div className="warehouse-fill" style={{ width: '60%' }}></div>
              </div>
              <span className="warehouse-percentage">60%</span>
            </div>
            <div className="warehouse-item">
              <span className="warehouse-name">Warehouse B</span>
              <div className="warehouse-bar">
                <div className="warehouse-fill" style={{ width: '25%' }}></div>
              </div>
              <span className="warehouse-percentage">25%</span>
            </div>
            <div className="warehouse-item">
              <span className="warehouse-name">Warehouse C</span>
              <div className="warehouse-bar">
                <div className="warehouse-fill" style={{ width: '15%' }}></div>
              </div>
              <span className="warehouse-percentage">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}