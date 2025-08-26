import './style.css';
import { MdDashboard, MdInventory, MdShoppingCart, MdPeople, MdFactory, MdAssessment, MdSettings } from 'react-icons/md';
import { FaBoxes } from 'react-icons/fa';

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'products', label: 'Products', icon: FaBoxes },
    { id: 'inventory', label: 'Inventory', icon: MdInventory },
    { id: 'orders', label: 'Orders', icon: MdShoppingCart },
    { id: 'customers', label: 'Customers', icon: MdPeople },
    { id: 'suppliers', label: 'Suppliers', icon: MdFactory },
    { id: 'reports', label: 'Reports', icon: MdAssessment },
    { id: 'settings', label: 'Settings', icon: MdSettings }
  ];

  return (
    <div className="sidebar-container" data-collapsed={!sidebarOpen} style={{ '--sidebar-width': sidebarOpen ? '240px' : '70px' }}>
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo">
            US
          </div>
          {sidebarOpen && (
            <div>
              <h3 className="sidebar-title">Udyog</h3>
            </div>
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`sidebar-menu-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <item.icon
              size={22}
              color={activeTab === item.id ? '#60a5fa' : '#cbd5e1'}
              className="sidebar-icon"
            />
            {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sidebar-toggle"
      >
        {sidebarOpen ? '←' : '→'}
      </button>

      {/* Footer Section */}
      <div className="sidebar-footer">
        {sidebarOpen && (
          <div className="footer-content">
            <div className="footer-single-line">
              <div className="footer-logo">
                <img src="/images/logo1.png" alt="Udyog" className="footer-logo-image" />
                <span className="footer-logo-text">Udyog</span>
              </div>
              <span className="version-badge">v2.1.0</span>
            </div>
          </div>
        )}
        {!sidebarOpen && (
          <div className="footer-collapsed">
            <img src="/images/logo1.png" alt="Udyog Sutra" className="footer-logo-small" />
          </div>
        )}
      </div>
    </div>
  );
}