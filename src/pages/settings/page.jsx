import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/settings');
      console.log('Settings API Response:', response.data);
      const apiData = response.data[0]; // API returns array with single object
      setSettings(apiData);
      setFormData(apiData);
    } catch (error) {
      console.error('Settings API Error:', error);
      // Fallback to default settings
      setSettings(getDefaultSettings());
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const userId = settings.user_id;
      
      // Clean data - remove system fields that shouldn't be updated
      const cleanData = {
        general: formData.general,
        userManagement: formData.userManagement,
        notifications: formData.notifications,
        systemPreferences: formData.systemPreferences,
        preferences: formData.preferences,
        privacy: formData.privacy,
        ui: formData.ui
      };
      
      console.log('Saving settings clean data:', cleanData);
      const response = await axios.put(`http://localhost:5000/api/settings/${userId}`, cleanData);
      console.log('Settings updated:', response.data);
      alert('Settings saved successfully!');
      setSettings(formData);
    } catch (error) {
      console.error('Error saving settings:', error);
      console.error('Error response:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      const defaultData = getDefaultSettings();
      setFormData(defaultData);
      setSettings(defaultData);
    }
  };

  const handleInputChange = (category, label, value) => {
    const updatedData = { ...formData };
    
    if (category === 'General Settings') {
      if (label === 'Business Name') updatedData.general.businessName = value;
      if (label === 'Business Type') updatedData.general.businessType = value;
      if (label === 'Time Zone') updatedData.general.timeZone = value;
    } else if (category === 'User Management') {
      if (label === 'Admin Email') updatedData.userManagement.adminEmail = value;
      if (label === 'Session Timeout') updatedData.userManagement.sessionTimeout = value;
    }
    
    setFormData(updatedData);
  };

  const handleToggleChange = (category, label, value) => {
    const updatedData = { ...formData };
    
    if (category === 'User Management' && label === 'Two-Factor Authentication') {
      updatedData.userManagement.twoFactorAuthentication = value;
    } else if (category === 'Notifications') {
      if (label === 'Email Notifications') updatedData.notifications.email = value;
      if (label === 'SMS Alerts') updatedData.notifications.sms = value;
      if (label === 'Low Stock Alerts') updatedData.notifications.stockNotifications.lowStock = value;
      if (label === 'Order Notifications') updatedData.notifications.orderNotifications.enabled = value;
    } else if (category === 'System Preferences') {
      if (label === 'Auto Backup') updatedData.systemPreferences.autoBackup = value;
      if (label === 'API Access') updatedData.systemPreferences.apiAccess = value;
      if (label === 'Debug Mode') updatedData.systemPreferences.debugMode = value;
    }
    
    setFormData(updatedData);
  };

  const getDefaultSettings = () => ({
    categories: [
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
    ]
  });

  if (loading) return <div className="loading">Loading settings...</div>;
  if (!settings) return <div className="error">Failed to load settings</div>;

  const settingsCategories = [
    {
      title: 'General Settings',
      icon: '⚙️',
      settings: [
        { label: 'Business Name', value: formData.general?.businessName || 'N/A', type: 'text' },
        { label: 'Business Type', value: formData.general?.businessType || 'N/A', type: 'select' },
        { label: 'Currency', value: `${formData.general?.currency?.code || 'INR'} (${formData.general?.currency?.symbol || '₹'})`, type: 'select' },
        { label: 'Time Zone', value: formData.general?.timeZone || 'N/A', type: 'select' }
      ]
    },
    {
      title: 'User Management',
      icon: '👥',
      settings: [
        { label: 'Admin Email', value: formData.userManagement?.adminEmail || 'N/A', type: 'email' },
        { label: 'Two-Factor Authentication', value: formData.userManagement?.twoFactorAuthentication || false, type: 'toggle' },
        { label: 'Session Timeout', value: formData.userManagement?.sessionTimeout || 'N/A', type: 'select' },
        { label: 'Password Policy', value: formData.userManagement?.passwordPolicy?.minLength ? 'Strong' : 'Basic', type: 'select' }
      ]
    },
    {
      title: 'Notifications',
      icon: '🔔',
      settings: [
        { label: 'Email Notifications', value: formData.notifications?.email || false, type: 'toggle' },
        { label: 'SMS Alerts', value: formData.notifications?.sms || false, type: 'toggle' },
        { label: 'Low Stock Alerts', value: formData.notifications?.stockNotifications?.lowStock || false, type: 'toggle' },
        { label: 'Order Notifications', value: formData.notifications?.orderNotifications?.enabled || false, type: 'toggle' }
      ]
    },
    {
      title: 'System Preferences',
      icon: '💻',
      settings: [
        { label: 'Auto Backup', value: formData.systemPreferences?.autoBackup || false, type: 'toggle' },
        { label: 'Data Retention', value: formData.systemPreferences?.dataRetention || 'N/A', type: 'select' },
        { label: 'API Access', value: formData.systemPreferences?.apiAccess || false, type: 'toggle' },
        { label: 'Debug Mode', value: formData.systemPreferences?.debugMode || false, type: 'toggle' }
      ]
    }
  ];

  return (
    <div className="settings">
      <div className="settings-header">
        <h2 className="settings-title">Settings</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={resetToDefault} disabled={saving}>Reset to Default</button>
          <button className="btn-primary" onClick={saveSettings} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
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
                      <div 
                        className={`toggle ${setting.value ? 'active' : ''}`}
                        onClick={() => handleToggleChange(category.title, setting.label, !setting.value)}
                      >
                        <div className="toggle-slider"></div>
                      </div>
                    ) : setting.type === 'select' ? (
                      <select 
                        className="setting-select" 
                        value={setting.value}
                        onChange={(e) => handleInputChange(category.title, setting.label, e.target.value)}
                      >
                        <option value={setting.value}>{setting.value}</option>
                      </select>
                    ) : (
                      <input 
                        type={setting.type} 
                        className="setting-input" 
                        value={setting.value}
                        onChange={(e) => handleInputChange(category.title, setting.label, e.target.value)}
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
              <span className="info-value">{settings.systemInformation?.version || 'v2.1.0'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">{settings.systemInformation?.lastUpdated || 'January 19, 2024'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Database Size:</span>
              <span className="info-value">{settings.systemInformation?.databaseSize || '245 MB'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Active Users:</span>
              <span className="info-value">{settings.systemInformation?.activeUsers || '12'}</span>
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