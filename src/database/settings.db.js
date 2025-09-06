import axios from 'axios';
import CacheManager from '../utils/CacheManager.js';

class SettingsDB {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
    this.settings = this.loadFromStorage();
  }

  async init() {
    console.log('Settings DB initialized');
  }

  loadFromStorage() {
    return CacheManager.get(CacheManager.cacheKeys.settings);
  }

  saveToStorage() {
    if (this.settings) {
      CacheManager.set(CacheManager.cacheKeys.settings, this.settings, { essential: true });
    }
  }

  async getAll(userId) {
    try {
      const response = await axios.get(`${this.baseURL}/settings/${userId}`);
      this.settings = response.data.settings;
      this.saveToStorage();
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }

  async update(userId, settingsData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/${userId}`, settingsData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.settings = response.data.settings;
      this.saveToStorage();
      return response.data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  async updateGeneral(userId, generalData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/${userId}`, {
        general: generalData
      });
      this.settings = response.data.settings;
      return response.data;
    } catch (error) {
      console.error('Error updating general settings:', error);
      throw error;
    }
  }

  async updatePreferences(userId, preferencesData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/${userId}`, {
        preferences: preferencesData
      });
      this.settings = response.data.settings;
      return response.data;
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  }

  async updateNotifications(userId, notificationsData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/${userId}`, {
        notifications: notificationsData
      });
      this.settings = response.data.settings;
      return response.data;
    } catch (error) {
      console.error('Error updating notifications:', error);
      throw error;
    }
  }

  async updatePrivacy(userId, privacyData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/${userId}`, {
        privacy: privacyData
      });
      this.settings = response.data.settings;
      return response.data;
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      throw error;
    }
  }

  async updateUI(userId, uiData) {
    try {
      const response = await axios.put(`${this.baseURL}/settings/${userId}`, {
        ui: uiData
      });
      this.settings = response.data.settings;
      return response.data;
    } catch (error) {
      console.error('Error updating UI settings:', error);
      throw error;
    }
  }

  // Getter methods for cached settings
  getGeneral() {
    return this.settings?.general || {};
  }

  getPreferences() {
    return this.settings?.preferences || {};
  }

  getNotifications() {
    return this.settings?.notifications || {};
  }

  getPrivacy() {
    return this.settings?.privacy || {};
  }

  getUI() {
    return this.settings?.ui || {};
  }

  getUserManagement() {
    return this.settings?.userManagement || {};
  }

  getSystemPreferences() {
    return this.settings?.systemPreferences || {};
  }

  getSystemInformation() {
    return this.settings?.systemInformation || {};
  }

  // Quick access methods
  getTheme() {
    return this.settings?.preferences?.theme || this.settings?.theme || 'light';
  }

  getLanguage() {
    return this.settings?.preferences?.language || this.settings?.language || 'en';
  }

  getCurrency() {
    return this.settings?.general?.currency || { code: 'INR', symbol: '₹' };
  }

  getBusinessName() {
    return this.settings?.general?.businessName || '';
  }

  // Store settings response from login page
  storeSettingsResponse(response) {
    if (response?.data?.settings) {
      this.settings = response.data.settings;
      this.saveToStorage();
      console.log('Settings stored in DB:', this.settings);
    } else if (response?.data) {
      this.settings = response.data;
      this.saveToStorage();
      console.log('Settings stored in DB:', this.settings);
    }
  }

  // Clear settings from storage (useful for logout)
  clearSettings() {
    this.settings = null;
    CacheManager.clear();
  }
}

export default SettingsDB;