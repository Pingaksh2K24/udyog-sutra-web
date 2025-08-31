import DatabaseService from './DatabaseService';

class ComprehensiveDataSeeder {
  async seedAllData() {
    try {
      // Check if data already exists
      const existingProducts = await DatabaseService.getAllProducts();
      if (existingProducts.length > 0) {
        console.log('Sample data already exists');
        return;
      }

      // Seed Categories
      await this.seedCategories();
      
      // Seed Products
      await this.seedProducts();
      
      // Seed Inventory
      await this.seedInventory();
      
      // Seed Customers
      await this.seedCustomers();
      
      // Seed Suppliers
      await this.seedSuppliers();
      
      // Seed Orders
      await this.seedOrders();
      
      // Seed Settings
      await this.seedSettings();
      
      // Seed Notifications
      await this.seedNotifications();

      console.log('All sample data seeded successfully');
    } catch (error) {
      console.error('Error seeding comprehensive data:', error);
    }
  }

  async seedCategories() {
    const categories = [
      { name: 'Electronics', description: 'Electronic items and gadgets' },
      { name: 'Accessories', description: 'Phone and computer accessories' },
      { name: 'Home & Kitchen', description: 'Home appliances and kitchen items' },
      { name: 'Fashion', description: 'Clothing and fashion accessories' },
      { name: 'Books', description: 'Books and educational materials' }
    ];

    for (const category of categories) {
      await DatabaseService.createCategory(category);
    }
  }

  async seedProducts() {
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'Premium quality wireless headphones with noise cancellation',
        category: 'Electronics',
        brand: 'TechSound',
        sku: 'WH001',
        price: 2999,
        costPrice: 2000,
        sellingPrice: 2999,
        mrp: 3499,
        discount: 500,
        taxRate: 18,
        unit: 'piece',
        weight: 0.3,
        isActive: true
      },
      {
        name: 'Smartphone Case',
        description: 'Protective case for smartphones',
        category: 'Accessories',
        brand: 'SafeGuard',
        sku: 'SC001',
        price: 599,
        costPrice: 300,
        sellingPrice: 599,
        mrp: 799,
        discount: 200,
        taxRate: 18,
        unit: 'piece',
        weight: 0.1,
        isActive: true
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable bluetooth speaker with excellent sound quality',
        category: 'Electronics',
        brand: 'SoundMax',
        sku: 'BS001',
        price: 1899,
        costPrice: 1200,
        sellingPrice: 1899,
        mrp: 2299,
        discount: 400,
        taxRate: 18,
        unit: 'piece',
        weight: 0.5,
        isActive: true
      },
      {
        name: 'USB Cable',
        description: 'High-speed USB charging cable',
        category: 'Accessories',
        brand: 'FastCharge',
        sku: 'UC001',
        price: 299,
        costPrice: 150,
        sellingPrice: 299,
        mrp: 399,
        discount: 100,
        taxRate: 18,
        unit: 'piece',
        weight: 0.05,
        isActive: true
      },
      {
        name: 'Power Bank',
        description: '10000mAh portable power bank',
        category: 'Electronics',
        brand: 'PowerMax',
        sku: 'PB001',
        price: 1499,
        costPrice: 1000,
        sellingPrice: 1499,
        mrp: 1799,
        discount: 300,
        taxRate: 18,
        unit: 'piece',
        weight: 0.4,
        isActive: true
      }
    ];

    for (const product of products) {
      await DatabaseService.createProduct(product);
    }
  }

  async seedInventory() {
    const products = await DatabaseService.getAllProducts();
    const inventoryData = [
      { currentStock: 50, minStock: 10, maxStock: 100, reorderLevel: 15, location: 'Warehouse A' },
      { currentStock: 100, minStock: 20, maxStock: 200, reorderLevel: 30, location: 'Warehouse A' },
      { currentStock: 30, minStock: 5, maxStock: 50, reorderLevel: 10, location: 'Warehouse B' },
      { currentStock: 200, minStock: 50, maxStock: 300, reorderLevel: 75, location: 'Warehouse A' },
      { currentStock: 75, minStock: 15, maxStock: 150, reorderLevel: 25, location: 'Warehouse B' }
    ];

    products.forEach(async (product, index) => {
      if (inventoryData[index]) {
        await DatabaseService.createInventoryItem({
          productId: product._id,
          ...inventoryData[index],
          availableStock: inventoryData[index].currentStock,
          stockValue: inventoryData[index].currentStock * product.costPrice
        });
      }
    });
  }

  async seedCustomers() {
    const customers = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '9876543210',
        company: 'Kumar Enterprises',
        customerType: 'business',
        category: 'regular',
        address: {
          street: '123 MG Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          country: 'India'
        },
        gstNumber: '27ABCDE1234F1Z5'
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '9876543211',
        customerType: 'individual',
        category: 'premium',
        address: {
          street: '456 CP Road',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          country: 'India'
        }
      },
      {
        name: 'Amit Singh',
        email: 'amit.singh@example.com',
        phone: '9876543212',
        company: 'Singh Trading Co.',
        customerType: 'wholesale',
        category: 'vip',
        address: {
          street: '789 Brigade Road',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
          country: 'India'
        },
        gstNumber: '29FGHIJ5678K2L6'
      }
    ];

    for (const customer of customers) {
      await DatabaseService.createCustomer(customer);
    }
  }

  async seedSuppliers() {
    const suppliers = [
      {
        name: 'Tech Supplies Ltd',
        companyName: 'Tech Supplies Private Limited',
        contactPerson: 'Ramesh Gupta',
        email: 'ramesh@techsupplies.com',
        phone: '9876543220',
        category: 'Electronics',
        address: {
          street: '12 Industrial Area',
          city: 'Gurgaon',
          state: 'Haryana',
          pincode: '122001',
          country: 'India'
        },
        gstNumber: '06MNOPQ9012R3S4',
        paymentTerms: '30 days',
        creditPeriod: 30,
        rating: 4.5
      },
      {
        name: 'Accessory World',
        companyName: 'Accessory World Pvt Ltd',
        contactPerson: 'Sunita Patel',
        email: 'sunita@accessoryworld.com',
        phone: '9876543221',
        category: 'Accessories',
        address: {
          street: '45 Market Street',
          city: 'Pune',
          state: 'Maharashtra',
          pincode: '411001',
          country: 'India'
        },
        gstNumber: '27TUVWX3456Y7Z8',
        paymentTerms: '15 days',
        creditPeriod: 15,
        rating: 4.2
      }
    ];

    for (const supplier of suppliers) {
      await DatabaseService.createSupplier(supplier);
    }
  }

  async seedOrders() {
    const customers = await DatabaseService.getAllCustomers();
    const products = await DatabaseService.getAllProducts();

    const orders = [
      {
        customerId: customers[0]?._id,
        customerName: customers[0]?.name,
        customerEmail: customers[0]?.email,
        customerPhone: customers[0]?.phone,
        items: [
          {
            productId: products[0]?._id,
            productName: products[0]?.name,
            quantity: 2,
            price: products[0]?.price,
            total: products[0]?.price * 2
          }
        ],
        subtotal: products[0]?.price * 2,
        taxAmount: (products[0]?.price * 2 * 18) / 100,
        totalAmount: products[0]?.price * 2 + (products[0]?.price * 2 * 18) / 100,
        status: 'delivered',
        paymentStatus: 'paid',
        paymentMethod: 'online'
      },
      {
        customerId: customers[1]?._id,
        customerName: customers[1]?.name,
        customerEmail: customers[1]?.email,
        customerPhone: customers[1]?.phone,
        items: [
          {
            productId: products[1]?._id,
            productName: products[1]?.name,
            quantity: 1,
            price: products[1]?.price,
            total: products[1]?.price
          }
        ],
        subtotal: products[1]?.price,
        taxAmount: (products[1]?.price * 18) / 100,
        totalAmount: products[1]?.price + (products[1]?.price * 18) / 100,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'cod'
      }
    ];

    for (const order of orders) {
      await DatabaseService.createOrder(order);
    }
  }

  async seedSettings() {
    const settings = [
      { category: 'general', key: 'company_name', value: 'Udyog Sutra', description: 'Company name' },
      { category: 'general', key: 'currency', value: 'INR', description: 'Default currency' },
      { category: 'tax', key: 'default_tax_rate', value: 18, description: 'Default GST rate' },
      { category: 'notification', key: 'low_stock_alert', value: true, description: 'Enable low stock alerts' }
    ];

    for (const setting of settings) {
      await DatabaseService.create('settings', setting);
    }
  }

  async seedNotifications() {
    const notifications = [
      {
        title: 'Low Stock Alert',
        message: 'Bluetooth Speaker stock is running low (5 items remaining)',
        notificationType: 'warning',
        module: 'inventory'
      },
      {
        title: 'New Order Received',
        message: 'Order #ORD001 has been placed by Rajesh Kumar',
        notificationType: 'info',
        module: 'orders'
      },
      {
        title: 'Payment Received',
        message: 'Payment of ₹5,998 received for Order #ORD001',
        notificationType: 'success',
        module: 'orders'
      }
    ];

    for (const notification of notifications) {
      await DatabaseService.createNotification(notification);
    }
  }
}

export default new ComprehensiveDataSeeder();