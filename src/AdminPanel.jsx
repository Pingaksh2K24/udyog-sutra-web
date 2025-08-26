import { useState } from 'react';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/page';
import Login from './pages/login/page';
import Dashboard from './pages/dashboard/page';
import Products from './pages/products/page';
import Inventory from './pages/inventory/page';
import Orders from './pages/orders/page';
import Customers from './pages/customers/page';
import Suppliers from './pages/suppliers/page';
import Reports from './pages/reports/page';
import Settings from './pages/settings/page';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'inventory': return <Inventory />;
      case 'orders': return <Orders />;
      case 'customers': return <Customers />;
      case 'suppliers': return <Suppliers />;
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
          <Header onLogout={() => setIsLoggedIn(false)} />
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