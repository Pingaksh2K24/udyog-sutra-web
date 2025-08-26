import './style.css';

export default function Settings() {
  const settingsCategories = [
    {
      title: 'General Settings',
      icon: '⚙️',
      settings: [
        { label: 'Business Name', value: 'Udyog Sutra Enterprises', type: 'text' },
        { label: 'Business Type', value: 'Wholesale & Retail', type: 'select' },
        { label: 'Currency', value: 'INR (₹)', type: 'select' },
        { label: 'Time Zone', value: 'Asia/Kolkata', type: 'select' }
      ]
    },
    {
      title: 'User Management',
      icon: '👥',
      settings: [
        { label: 'Admin Email', value: 'admin@udyogsutra.com', type: 'email' },
        { label: 'Two-Factor Authentication', value: true, type: 'toggle' },
        { label: 'Session Timeout', value: '30 minutes', type: 'select' },
        { label: 'Password Policy', value: 'Strong', type: 'select' }
      ]
    },
    {
      title: 'Notifications',
      icon: '🔔',
      settings: [
        { label: 'Email Notifications', value: true, type: 'toggle' },
        { label: 'SMS Alerts', value: false, type: 'toggle' },
        { label: 'Low Stock Alerts', value: true, type: 'toggle' },
        { label: 'Order Notifications', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'System Preferences',
      icon: '💻',
      settings: [
        { label: 'Auto Backup', value: true, type: 'toggle' },
        { label: 'Data Retention', value: '2 years', type: 'select' },
        { label: 'API Access', value: false, type: 'toggle' },
        { label: 'Debug Mode', value: false, type: 'toggle' }
      ]
    }
  ];

  return (
    <div className="settings">
      <div className="settings-header">
        <h2 className="settings-title">Settings</h2>
        <div className="header-actions">
          <button className="btn-secondary">Reset to Default</button>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="settings-grid">
        {settingsCategories.map((category, index) => (
          <div key={index} className="settings-category">
            <div className="category-header">
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-title">{category.title}</h3>
            </div>
            
            <div className="settings-list">
              {category.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">{setting.label}</label>
                  </div>
                  <div className="setting-control">
                    {setting.type === 'toggle' ? (
                      <div className={`toggle ${setting.value ? 'active' : ''}`}>
                        <div className="toggle-slider"></div>
                      </div>
                    ) : setting.type === 'select' ? (
                      <select className="setting-select" defaultValue={setting.value}>
                        <option value={setting.value}>{setting.value}</option>
                      </select>
                    ) : (
                      <input 
                        type={setting.type} 
                        className="setting-input" 
                        defaultValue={setting.value}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="settings-footer">
        <div className="system-info">
          <h3 className="section-title">System Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span className="info-value">v2.1.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">January 19, 2024</span>
            </div>
            <div className="info-item">
              <span className="info-label">Database Size:</span>
              <span className="info-value">245 MB</span>
            </div>
            <div className="info-item">
              <span className="info-label">Active Users:</span>
              <span className="info-value">12</span>
            </div>
          </div>
        </div>

        <div className="danger-zone">
          <h3 className="section-title danger">Danger Zone</h3>
          <div className="danger-actions">
            <button className="btn-danger">Export All Data</button>
            <button className="btn-danger">Reset System</button>
            <button className="btn-danger">Delete All Data</button>
          </div>
        </div>
      </div>
    </div>
  );
}