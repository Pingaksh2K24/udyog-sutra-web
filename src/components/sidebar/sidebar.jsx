import './style.css';
import { MdDashboard, MdInventory, MdShoppingCart, MdPeople, MdFactory, MdAssessment, MdSettings, MdAdminPanelSettings, MdExpandMore, MdExpandLess, MdPersonAdd, MdList } from 'react-icons/md';
import { FaBoxes } from 'react-icons/fa';
import { useState } from 'react';

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const [adminExpanded, setAdminExpanded] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { 
      id: 'admin', 
      label: 'Admin', 
      icon: MdAdminPanelSettings,
      hasSubmenu: true,
      submenu: [
        { id: 'user-list', label: 'User List', icon: MdList },
        { id: 'create-user', label: 'Create User', icon: MdPersonAdd }
      ]
    },
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
          <img src="/images/logo1.png" alt="Udyog" className="sidebar-logo-image" />
          {sidebarOpen && (
            <div className="sidebar-info">
              <h3 className="sidebar-title">Udyog</h3>
            </div>
          )}
          {sidebarOpen && <span className="version-badge">v2.1.0</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.hasSubmenu) {
                  setAdminExpanded(!adminExpanded);
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`sidebar-menu-item ${activeTab === item.id || (item.hasSubmenu && (activeTab === 'user-list' || activeTab === 'create-user')) ? 'active' : ''}`}
            >
              <item.icon
                size={22}
                color={activeTab === item.id || (item.hasSubmenu && (activeTab === 'user-list' || activeTab === 'create-user')) ? '#60a5fa' : '#cbd5e1'}
                className="sidebar-icon"
              />
              {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
              {item.hasSubmenu && sidebarOpen && (
                adminExpanded ? <MdExpandLess size={18} color="#cbd5e1" /> : <MdExpandMore size={18} color="#cbd5e1" />
              )}
            </button>
            {item.hasSubmenu && adminExpanded && sidebarOpen && (
              <div style={{ paddingLeft: '20px' }}>
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => setActiveTab(subItem.id)}
                    className={`sidebar-menu-item ${activeTab === subItem.id ? 'active' : ''}`}
                    style={{ fontSize: '14px', padding: '12px 20px' }}
                  >
                    <subItem.icon
                      size={18}
                      color={activeTab === subItem.id ? '#60a5fa' : '#cbd5e1'}
                      className="sidebar-icon"
                    />
                    <span className="sidebar-label">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sidebar-toggle"
      >
        {sidebarOpen ? '←' : '→'}
      </button>


    </div>
  );
}