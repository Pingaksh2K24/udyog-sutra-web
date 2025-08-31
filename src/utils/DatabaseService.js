class DatabaseService {
  constructor() {
    this.dbName = 'udyog_sutra_db';
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      // Initialize collections in localStorage if they don't exist
      const collections = [
        'products', 'inventory', 'orders', 'customers', 'suppliers',
        'purchase_orders', 'stock_movements', 'categories', 'reports',
        'settings', 'activity_logs', 'notifications'
      ];
      
      for (const collection of collections) {
        if (!localStorage.getItem(`${this.dbName}_${collection}`)) {
          localStorage.setItem(`${this.dbName}_${collection}`, JSON.stringify([]));
        }
      }
      
      console.log('Database initialized successfully with all collections');
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  // Generic CRUD operations
  async create(type, data) {
    try {
      const doc = {
        _id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: type,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const collection = this.getCollection(type);
      collection.push(doc);
      this.saveCollection(type, collection);
      
      return doc;
    } catch (error) {
      console.error('Create error:', error);
      throw error;
    }
  }

  async getAll(type) {
    try {
      return this.getCollection(type);
    } catch (error) {
      console.error('Get all error:', error);
      return [];
    }
  }

  async getById(id) {
    try {
      const type = id.split('_')[0];
      const collection = this.getCollection(type);
      return collection.find(item => item._id === id) || null;
    } catch (error) {
      console.error('Get by ID error:', error);
      return null;
    }
  }

  async update(id, data) {
    try {
      const type = id.split('_')[0];
      const collection = this.getCollection(type);
      const index = collection.findIndex(item => item._id === id);
      
      if (index !== -1) {
        collection[index] = {
          ...collection[index],
          ...data,
          updatedAt: new Date().toISOString()
        };
        this.saveCollection(type, collection);
        return collection[index];
      }
      throw new Error('Document not found');
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const type = id.split('_')[0];
      const collection = this.getCollection(type);
      const filteredCollection = collection.filter(item => item._id !== id);
      this.saveCollection(type, filteredCollection);
      return { deleted: true };
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }

  // Helper methods
  getCollection(type) {
    const data = localStorage.getItem(`${this.dbName}_${type}`);
    return data ? JSON.parse(data) : [];
  }

  saveCollection(type, data) {
    localStorage.setItem(`${this.dbName}_${type}`, JSON.stringify(data));
  }

  // Products Module
  async createProduct(productData) {
    return await this.create('products', productData);
  }
  async getAllProducts() {
    return await this.getAll('products');
  }

  // Inventory Module
  async createInventoryItem(inventoryData) {
    return await this.create('inventory', inventoryData);
  }
  async getAllInventory() {
    return await this.getAll('inventory');
  }

  // Orders Module
  async createOrder(orderData) {
    return await this.create('orders', {
      ...orderData,
      orderNumber: `ORD-${Date.now()}`,
      status: 'pending'
    });
  }
  async getAllOrders() {
    return await this.getAll('orders');
  }

  // Customers Module
  async createCustomer(customerData) {
    return await this.create('customers', {
      ...customerData,
      customerCode: `CUST-${Date.now()}`,
      isActive: true
    });
  }
  async getAllCustomers() {
    return await this.getAll('customers');
  }

  // Suppliers Module
  async createSupplier(supplierData) {
    return await this.create('suppliers', {
      ...supplierData,
      supplierCode: `SUPP-${Date.now()}`,
      isActive: true
    });
  }
  async getAllSuppliers() {
    return await this.getAll('suppliers');
  }

  // Additional modules
  async createPurchaseOrder(poData) {
    return await this.create('purchase_orders', {
      ...poData,
      poNumber: `PO-${Date.now()}`
    });
  }
  async getAllPurchaseOrders() {
    return await this.getAll('purchase_orders');
  }

  async createCategory(categoryData) {
    return await this.create('categories', categoryData);
  }
  async getAllCategories() {
    return await this.getAll('categories');
  }

  async createNotification(notificationData) {
    return await this.create('notifications', {
      ...notificationData,
      isRead: false
    });
  }
  async getAllNotifications() {
    return await this.getAll('notifications');
  }

  // Search functionality
  async search(type, query) {
    try {
      const allDocs = await this.getAll(type);
      return allDocs.filter(doc => 
        JSON.stringify(doc).toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  // Database info
  async getDatabaseInfo() {
    try {
      const collections = [
        'products', 'inventory', 'orders', 'customers', 'suppliers',
        'purchase_orders', 'stock_movements', 'categories', 'reports',
        'settings', 'activity_logs', 'notifications'
      ];
      
      let totalDocs = 0;
      collections.forEach(collection => {
        totalDocs += this.getCollection(collection).length;
      });
      
      return {
        db_name: this.dbName,
        doc_count: totalDocs,
        update_seq: Date.now()
      };
    } catch (error) {
      console.error('Database info error:', error);
      return null;
    }
  }
}

export default new DatabaseService();