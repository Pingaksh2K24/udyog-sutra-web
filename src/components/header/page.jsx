import './style.css';
import { IoNotifications, IoHelpBuoy, IoLogOut, IoAdd } from 'react-icons/io5';
import { FaUser, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { useState } from 'react';
import Database from '../../database/index.js';

export default function Header({ onLogout }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNewSale = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'sales' } }));
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            Welcome, {Database.settings.getBusinessName() || 'Admin'}!
          </h1>
          <p className="header-subtitle">
            Manage your retail and wholesale business efficiently
          </p>
        </div>
        
        <div className="header-right">
          <button className="action-btn sale-btn" onClick={handleNewSale}>
            <FaShoppingCart size={16} />
            <span>New Sale</span>
          </button>
          <button className="action-btn purchase-btn">
            <FaShoppingBag size={16} />
            <span>New Purchase</span>
          </button>
          <div className="help-container">
            <button 
              className="help-btn"
              onClick={() => setShowHelp(!showHelp)}
            >
              <IoHelpBuoy size={20} color="#6b7280" />
            </button>
            {showHelp && (
              <div className="help-dropdown">
                <div className="help-title">Helpline Numbers</div>
                <div className="help-number">(+91) 797 239 2628</div>
                <div className="help-number">(+91) 983 482 8054</div>
              </div>
            )}
          </div>
          <button className="notification-btn">
            <IoNotifications size={20} color="#6b7280" />
          </button>
          <div className="user-menu-container">
            <div 
              className="user-avatar"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUser size={16} color="white" />
            </div>
            {showUserMenu && (
              <div className="user-dropdown">
                <button className="logout-btn" onClick={onLogout}>
                  <IoLogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}