import DatabaseService from './DatabaseService';

class SampleDataSeeder {
  async seedSampleData() {
    try {
      // Check if data already exists
      const existingProducts = await DatabaseService.getAllProducts();
      if (existingProducts.length > 0) {
        console.log('Sample data already exists');
        return;
      }

      // Seed Products
      const sampleProducts = [
        { name: 'Wireless Headphones', price: 2999, category: 'Electronics', stock: 50 },
        { name: 'Smartphone Case', price: 599, category: 'Accessories', stock: 100 },
        { name: 'Bluetooth Speaker', price: 1899, category: 'Electronics', stock: 30 },
        { name: 'USB Cable', price: 299, category: 'Accessories', stock: 200 },
        { name: 'Power Bank', price: 1499, category: 'Electronics', stock: 75 }
      ];

      for (const product of sampleProducts) {
        await DatabaseService.createProduct(product);
      }

      // Seed Customers
      const sampleCustomers = [
        { name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '9876543210', city: 'Mumbai' },
        { name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543211', city: 'Delhi' },
        { name: 'Amit Singh', email: 'amit@example.com', phone: '9876543212', city: 'Bangalore' },
        { name: 'Sneha Patel', email: 'sneha@example.com', phone: '9876543213', city: 'Pune' }
      ];

      for (const customer of sampleCustomers) {
        await DatabaseService.createCustomer(customer);
      }

      // Seed Orders
      const sampleOrders = [
        { customerId: 'customer_1', productId: 'product_1', quantity: 2, total: 5998, status: 'delivered' },
        { customerId: 'customer_2', productId: 'product_2', quantity: 1, total: 599, status: 'pending' },
        { customerId: 'customer_3', productId: 'product_3', quantity: 1, total: 1899, status: 'processing' }
      ];

      for (const order of sampleOrders) {
        await DatabaseService.createOrder(order);
      }

      // Seed Suppliers
      const sampleSuppliers = [
        { name: 'Tech Supplies Ltd', contact: 'supplier1@example.com', phone: '9876543220', category: 'Electronics' },
        { name: 'Accessory World', contact: 'supplier2@example.com', phone: '9876543221', category: 'Accessories' }
      ];

      for (const supplier of sampleSuppliers) {
        await DatabaseService.createSupplier(supplier);
      }

      console.log('Sample data seeded successfully');
    } catch (error) {
      console.error('Error seeding sample data:', error);
    }
  }
}

export default new SampleDataSeeder();