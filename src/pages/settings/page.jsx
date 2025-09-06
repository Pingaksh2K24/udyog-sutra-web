import './style.css';
import { useState, useEffect } from 'react';
import Database from '../../database/index.js';
import toast from 'react-hot-toast';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [gstSettings, setGstSettings] = useState({
    gstNumber: '',
    businessName: '',
    businessAddress: '',
    stateCode: '',
    panNumber: '',
    defaultTaxRates: {
      cgst: 9,
      sgst: 9,
      igst: 18
    },
    hsnCodes: [
      { code: '1234', description: 'General Goods', rate: 18 },
      { code: '5678', description: 'Electronics', rate: 28 }
    ],
    gstEnabled: true,
    compositeScheme: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Get settings from database (already stored from login)
      const cachedSettings = Database.settings.settings;
      if (cachedSettings) {
        console.log('Using cached settings:', cachedSettings);
        setSettings(cachedSettings);
        setFormData(cachedSettings);
      } else {
        // Fallback: fetch from API if not cached
        const userId = 'USR0001'; // Get from cookies or context
        const response = await Database.settings.getAll(userId);
        console.log('Settings from API:', response);
        setSettings(response.settings);
        setFormData(response.settings);
      }
    } catch (error) {
      console.error('Settings fetch error:', error);
      // Fallback to default settings
      setSettings(getDefaultSettings());
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const userId = settings.user_id || 'USR0001';
      
      // Clean data - remove system fields that shouldn't be updated
      const cleanData = {
        general: formData.general,
        userManagement: formData.userManagement,
        notifications: formData.notifications,
        systemPreferences: formData.systemPreferences,
        preferences: formData.preferences,
        privacy: formData.privacy,
        ui: formData.ui,
        gstSettings: gstSettings
      };
      
      console.log('Saving settings clean data:', cleanData);
      const response = await Database.settings.update(userId, cleanData);
      console.log('Settings updated:', response);
      toast.success('Settings saved successfully!', { position: 'top-left' });
      setSettings(formData);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings', { position: 'top-left' });
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
    } else if (category === 'GST Settings') {
      if (label === 'GST Enabled') setGstSettings({...gstSettings, gstEnabled: value});
      if (label === 'Composite Scheme') setGstSettings({...gstSettings, compositeScheme: value});
    }
    
    setFormData(updatedData);
  };

  const handleGstInputChange = (field, value) => {
    setGstSettings({...gstSettings, [field]: value});
  };

  const handleTaxRateChange = (type, value) => {
    setGstSettings({
      ...gstSettings,
      defaultTaxRates: {
        ...gstSettings.defaultTaxRates,
        [type]: parseFloat(value) || 0
      }
    });
  };

  const addHsnCode = () => {
    setGstSettings({
      ...gstSettings,
      hsnCodes: [...gstSettings.hsnCodes, { code: '', description: '', rate: 18 }]
    });
  };

  const removeHsnCode = (index) => {
    setGstSettings({
      ...gstSettings,
      hsnCodes: gstSettings.hsnCodes.filter((_, i) => i !== index)
    });
  };

  const updateHsnCode = (index, field, value) => {
    const updatedHsnCodes = gstSettings.hsnCodes.map((hsn, i) => 
      i === index ? { ...hsn, [field]: value } : hsn
    );
    setGstSettings({ ...gstSettings, hsnCodes: updatedHsnCodes });
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
    },
    {
      title: 'GST Settings',
      icon: '📋',
      settings: [
        { label: 'GST Enabled', value: gstSettings.gstEnabled, type: 'toggle' },
        { label: 'Composite Scheme', value: gstSettings.compositeScheme, type: 'toggle' },
        { label: 'GST Number', value: gstSettings.gstNumber, type: 'text' },
        { label: 'State Code', value: gstSettings.stateCode, type: 'select' }
      ]
    }
  ];

  return (
    <div className="settings">
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
          }}>Settings</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            margin: 0,
            fontWeight: '500'
          }}>Configure your application preferences and system settings</p>
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
            onClick={resetToDefault} 
            disabled={saving}
            onMouseEnter={(e) => {
              if (!saving) {
                e.target.style.background = '#e2e8f0';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f1f5f9';
              e.target.style.transform = 'translateY(0)';
            }}
          >Reset to Default</button>
          <button 
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '12px',
              background: saving ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              boxShadow: saving ? 'none' : '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
            onClick={saveSettings} 
            disabled={saving}
            onMouseEnter={(e) => {
              if (!saving) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!saving) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
              }
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {settingsCategories.map((category, index) => (
          <div 
            key={index} 
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
              }}>{category.icon}</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e293b',
                margin: 0
              }}>{category.title}</h3>
            </div>
            
            <div style={{
              padding: '24px'
            }}>
              {category.settings.map((setting, settingIndex) => (
                <div 
                  key={settingIndex} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: settingIndex < category.settings.length - 1 ? '1px solid #f1f5f9' : 'none'
                  }}
                >
                  <div>
                    <label style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      display: 'block',
                      marginBottom: '4px'
                    }}>{setting.label}</label>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>Configure {setting.label.toLowerCase()} settings</div>
                  </div>
                  <div>
                    {setting.type === 'toggle' ? (
                      <div 
                        style={{
                          width: '48px',
                          height: '24px',
                          borderRadius: '12px',
                          background: setting.value ? 'linear-gradient(135deg, #10b981, #059669)' : '#e5e7eb',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          boxShadow: setting.value ? '0 2px 8px rgba(16, 185, 129, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => handleToggleChange(category.title, setting.label, !setting.value)}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'white',
                          position: 'absolute',
                          top: '2px',
                          left: setting.value ? '26px' : '2px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}></div>
                      </div>
                    ) : setting.type === 'select' ? (
                      <select 
                        style={{
                          padding: '8px 12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '8px',
                          background: 'white',
                          color: '#374151',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          minWidth: '120px'
                        }}
                        value={setting.value}
                        onChange={(e) => handleInputChange(category.title, setting.label, e.target.value)}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value={setting.value}>{setting.value}</option>
                      </select>
                    ) : (
                      <input 
                        type={setting.type}
                        style={{
                          padding: '8px 12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '8px',
                          background: 'white',
                          color: '#374151',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.3s ease',
                          minWidth: '200px'
                        }}
                        value={setting.value}
                        onChange={(e) => handleInputChange(category.title, setting.label, e.target.value)}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* GST Configuration Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          gridColumn: '1 / -1'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>📋</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              margin: 0
            }}>GST Configuration</h3>
          </div>
          
          <div style={{ padding: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  display: 'block',
                  marginBottom: '8px'
                }}>GST Number</label>
                <input
                  type="text"
                  placeholder="12ABCDE1234F1Z5"
                  value={gstSettings.gstNumber}
                  onChange={(e) => handleGstInputChange('gstNumber', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  display: 'block',
                  marginBottom: '8px'
                }}>Business Name</label>
                <input
                  type="text"
                  placeholder="Your Business Name"
                  value={gstSettings.businessName}
                  onChange={(e) => handleGstInputChange('businessName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  display: 'block',
                  marginBottom: '8px'
                }}>PAN Number</label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={gstSettings.panNumber}
                  onChange={(e) => handleGstInputChange('panNumber', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  display: 'block',
                  marginBottom: '8px'
                }}>State Code</label>
                <select
                  value={gstSettings.stateCode}
                  onChange={(e) => handleGstInputChange('stateCode', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  <option value="">Select State</option>
                  <option value="27">27 - Maharashtra</option>
                  <option value="07">07 - Delhi</option>
                  <option value="24">24 - Gujarat</option>
                  <option value="29">29 - Karnataka</option>
                  <option value="33">33 - Tamil Nadu</option>
                  <option value="32">32 - Kerala</option>
                  <option value="36">36 - Telangana</option>
                  <option value="37">37 - Andhra Pradesh</option>
                  <option value="19">19 - West Bengal</option>
                  <option value="09">09 - Uttar Pradesh</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                display: 'block',
                marginBottom: '8px'
              }}>Business Address</label>
              <textarea
                placeholder="Complete business address"
                value={gstSettings.businessAddress}
                onChange={(e) => handleGstInputChange('businessAddress', e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  display: 'block',
                  marginBottom: '8px'
                }}>CGST Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={gstSettings.defaultTaxRates.cgst}
                  onChange={(e) => handleTaxRateChange('cgst', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  display: 'block',
                  marginBottom: '8px'
                }}>SGST Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={gstSettings.defaultTaxRates.sgst}
                  onChange={(e) => handleTaxRateChange('sgst', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  display: 'block',
                  marginBottom: '8px'
                }}>IGST Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={gstSettings.defaultTaxRates.igst}
                  onChange={(e) => handleTaxRateChange('igst', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: 0
                }}>HSN/SAC Codes</h4>
                <button
                  onClick={addHsnCode}
                  style={{
                    padding: '8px 16px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  + Add HSN Code
                </button>
              </div>
              
              <div style={{
                display: 'grid',
                gap: '12px'
              }}>
                {gstSettings.hsnCodes.map((hsn, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '150px 1fr 100px 60px',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '12px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}>
                    <input
                      type="text"
                      placeholder="HSN Code"
                      value={hsn.code}
                      onChange={(e) => updateHsnCode(index, 'code', e.target.value)}
                      style={{
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={hsn.description}
                      onChange={(e) => updateHsnCode(index, 'description', e.target.value)}
                      style={{
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Rate"
                      value={hsn.rate}
                      onChange={(e) => updateHsnCode(index, 'rate', parseFloat(e.target.value) || 0)}
                      style={{
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <button
                      onClick={() => removeHsnCode(index)}
                      style={{
                        padding: '8px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginTop: '32px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>📊</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1e293b',
              margin: 0
            }}>System Information</h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            <div style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '500',
                marginBottom: '4px'
              }}>Version</div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b'
              }}>{settings.systemInformation?.version || 'v2.1.0'}</div>
            </div>
            <div style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '500',
                marginBottom: '4px'
              }}>Last Updated</div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b'
              }}>{settings.systemInformation?.lastUpdated || 'January 19, 2024'}</div>
            </div>
            <div style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '500',
                marginBottom: '4px'
              }}>Database Size</div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b'
              }}>{settings.systemInformation?.databaseSize || '245 MB'}</div>
            </div>
            <div style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '500',
                marginBottom: '4px'
              }}>Active Users</div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b'
              }}>{settings.systemInformation?.activeUsers || '12'}</div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #fecaca',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.1)',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>⚠️</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#dc2626',
              margin: 0
            }}>Danger Zone</h3>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <button style={{
              padding: '12px 20px',
              border: '2px solid #fecaca',
              borderRadius: '8px',
              background: 'white',
              color: '#dc2626',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#fef2f2';
              e.target.style.borderColor = '#fca5a5';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#fecaca';
            }}>Export All Data</button>
            <button style={{
              padding: '12px 20px',
              border: '2px solid #fecaca',
              borderRadius: '8px',
              background: 'white',
              color: '#dc2626',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#fef2f2';
              e.target.style.borderColor = '#fca5a5';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#fecaca';
            }}>Reset System</button>
            <button style={{
              padding: '12px 20px',
              border: '2px solid #dc2626',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
            }}>Delete All Data</button>
          </div>
        </div>
      </div>
    </div>
  );
}