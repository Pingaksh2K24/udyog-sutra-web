import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/page';
import Login from './pages/login/page';
import Dashboard from './pages/dashboard/page';
import Products from './pages/products/page';
import Inventory from './pages/inventory/page';
import Orders from './pages/orders/page';
import Customers from './pages/customers/page';
import Suppliers from './pages/suppliers/page';
import EditSupplier from './pages/suppliers/edit/page';
import Reports from './pages/reports/page';
import Settings from './pages/settings/page';
import CookiesHandler from './utils/CookiesHandler';
import DatabaseService from './utils/DatabaseService';
import ComprehensiveDataSeeder from './utils/ComprehensiveDataSeeder';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [routeParams, setRouteParams] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check session on component mount and set interval for session check
  useEffect(() => {
    checkSession();
    initializeDatabase();
    const interval = setInterval(checkSession, 60000); // Check every minute
    
    // Navigation listener
    const handleNavigation = (event) => {
      const { page, params } = event.detail;
      setActiveTab(page);
      setRouteParams(params || {});
    };
    
    window.addEventListener('navigate', handleNavigation);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('navigate', handleNavigation);
    };
  }, []);

  const initializeDatabase = async () => {
    try {
      await DatabaseService.getDatabaseInfo();
      await ComprehensiveDataSeeder.seedAllData();
      console.log('Database initialized and comprehensive data loaded');
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  };

  const checkSession = () => {
    const authData = CookiesHandler.get('authDetails');
    const loginStatus = CookiesHandler.get('isLoggedIn');
    
    if (authData && loginStatus === 'true') {
      const parsedAuth = JSON.parse(authData);
      const sessionExpiry = new Date(parsedAuth.sessionExpiry);
      const now = new Date();
      
      if (now < sessionExpiry) {
        setIsLoggedIn(true);
      } else {
        // Session expired, logout
        handleLogout();
        alert('Session expired. Please login again.');
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    CookiesHandler.remove('authDetails');
    CookiesHandler.remove('isLoggedIn');
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'inventory': return <Inventory />;
      case 'orders': return <Orders />;
      case 'customers': return <Customers />;
      case 'suppliers': return <Suppliers />;
      case 'suppliers-edit': return <EditSupplier supplierId={routeParams.id} />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        marginLeft: sidebarOpen ? '240px' : '70px',
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <div style={{
          '--sidebar-width': sidebarOpen ? '240px' : '70px'
        }}>
          <Header onLogout={handleLogout} />
        </div>
        <div style={{ padding: '32px', paddingTop: '80px', flex: 1 }}>

          <main>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}