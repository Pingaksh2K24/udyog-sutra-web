class CacheManager {
  constructor() {
    this.maxSize = 5 * 1024 * 1024; // 5MB limit
    this.cacheKeys = {
      settings: 'udyog_settings',
      userProfile: 'udyog_user_profile',
      businessInfo: 'udyog_business_info'
    };
  }

  // Check if localStorage is available and has space
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get current storage size
  getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }

  // Cache only essential data
  set(key, data, options = {}) {
    if (!this.isStorageAvailable()) return false;

    const cacheData = {
      data,
      timestamp: Date.now(),
      expires: options.expires || (24 * 60 * 60 * 1000), // 24 hours default
      essential: options.essential || false
    };

    const serialized = JSON.stringify(cacheData);
    
    // Check size limit
    if (this.getStorageSize() + serialized.length > this.maxSize) {
      this.cleanup();
    }

    try {
      localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.warn('Cache storage failed:', e);
      return false;
    }
  }

  get(key) {
    if (!this.isStorageAvailable()) return null;

    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      
      // Check if expired
      if (Date.now() - parsed.timestamp > parsed.expires) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (e) {
      console.warn('Cache retrieval failed:', e);
      return null;
    }
  }

  // Remove expired and non-essential items
  cleanup() {
    const now = Date.now();
    const toRemove = [];

    for (let key in localStorage) {
      if (key.startsWith('udyog_')) {
        try {
          const cached = JSON.parse(localStorage[key]);
          
          // Remove if expired or non-essential
          if (now - cached.timestamp > cached.expires || !cached.essential) {
            toRemove.push(key);
          }
        } catch (e) {
          toRemove.push(key);
        }
      }
    }

    toRemove.forEach(key => localStorage.removeItem(key));
  }

  // Clear all cache
  clear() {
    Object.values(this.cacheKeys).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Cache essential user data only
  cacheEssentials(userData) {
    this.set(this.cacheKeys.settings, userData.settings, { essential: true });
    this.set(this.cacheKeys.userProfile, {
      name: userData.name,
      email: userData.email,
      role: userData.role
    }, { essential: true });
    this.set(this.cacheKeys.businessInfo, {
      businessName: userData.businessName,
      currency: userData.currency,
      theme: userData.theme
    }, { essential: true });
  }
}

export default new CacheManager();