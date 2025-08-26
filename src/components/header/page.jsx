import './style.css';
import { IoNotifications, IoHelpBuoy, IoLogOut } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

export default function Header({ onLogout }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            Welcome, Admin!
          </h1>
          <p className="header-subtitle">
            Manage your retail and wholesale business efficiently
          </p>
        </div>
        
        <div className="header-right">
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