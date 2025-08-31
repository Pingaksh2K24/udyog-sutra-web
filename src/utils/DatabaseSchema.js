// Database Schema for Udyog Sutra Application

export const DatabaseSchema = {
  // Products Module
  products: {
    _id: 'products_[timestamp]_[random]',
    type: 'products',
    name: 'string',
    description: 'string',
    category: 'string',
    subcategory: 'string',
    brand: 'string',
    sku: 'string',
    barcode: 'string',
    price: 'number',
    costPrice: 'number',
    sellingPrice: 'number',
    mrp: 'number',
    discount: 'number',
    taxRate: 'number',
    unit: 'string', // kg, piece, liter, etc.
    weight: 'number',
    dimensions: {
      length: 'number',
      width: 'number',
      height: 'number'
    },
    images: ['string'],
    tags: ['string'],
    isActive: 'boolean',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // Inventory Module
  inventory: {
    _id: 'inventory_[timestamp]_[random]',
    type: 'inventory',
    productId: 'string',
    currentStock: 'number',
    minStock: 'number',
    maxStock: 'number',
    reorderLevel: 'number',
    location: 'string',
    warehouse: 'string',
    batch: 'string',
    expiryDate: 'ISO string',
    lastRestocked: 'ISO string',
    stockValue: 'number',
    reservedStock: 'number',
    availableStock: 'number',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // Orders Module
  orders: {
    _id: 'orders_[timestamp]_[random]',
    type: 'orders',
    orderNumber: 'string',
    customerId: 'string',
    customerName: 'string',
    customerEmail: 'string',
    customerPhone: 'string',
    orderDate: 'ISO string',
    deliveryDate: 'ISO string',
    status: 'string', // pending, confirmed, processing, shipped, delivered, cancelled
    priority: 'string', // low, medium, high, urgent
    items: [{
      productId: 'string',
      productName: 'string',
      quantity: 'number',
      price: 'number',
      discount: 'number',
      total: 'number'
    }],
    subtotal: 'number',
    taxAmount: 'number',
    discountAmount: 'number',
    shippingCost: 'number',
    totalAmount: 'number',
    paymentMethod: 'string',
    paymentStatus: 'string', // pending, paid, failed, refunded
    shippingAddress: {
      street: 'string',
      city: 'string',
      state: 'string',
      pincode: 'string',
      country: 'string'
    },
    billingAddress: {
      street: 'string',
      city: 'string',
      state: 'string',
      pincode: 'string',
      country: 'string'
    },
    notes: 'string',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // Customers Module
  customers: {
    _id: 'customers_[timestamp]_[random]',
    type: 'customers',
    customerCode: 'string',
    name: 'string',
    email: 'string',
    phone: 'string',
    alternatePhone: 'string',
    dateOfBirth: 'ISO string',
    gender: 'string',
    company: 'string',
    designation: 'string',
    customerType: 'string', // individual, business, wholesale, retail
    category: 'string', // regular, premium, vip
    address: {
      street: 'string',
      city: 'string',
      state: 'string',
      pincode: 'string',
      country: 'string'
    },
    gstNumber: 'string',
    panNumber: 'string',
    creditLimit: 'number',
    paymentTerms: 'string',
    totalOrders: 'number',
    totalSpent: 'number',
    lastOrderDate: 'ISO string',
    isActive: 'boolean',
    notes: 'string',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // Suppliers Module
  suppliers: {
    _id: 'suppliers_[timestamp]_[random]',
    type: 'suppliers',
    supplierCode: 'string',
    name: 'string',
    companyName: 'string',
    contactPerson: 'string',
    email: 'string',
    phone: 'string',
    alternatePhone: 'string',
    website: 'string',
    category: 'string',
    address: {
      street: 'string',
      city: 'string',
      state: 'string',
      pincode: 'string',
      country: 'string'
    },
    gstNumber: 'string',
    panNumber: 'string',
    bankDetails: {
      accountNumber: 'string',
      ifscCode: 'string',
      bankName: 'string',
      accountHolderName: 'string'
    },
    paymentTerms: 'string',
    creditPeriod: 'number',
    rating: 'number',
    isActive: 'boolean',
    notes: 'string',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // Purchase Orders
  purchaseOrders: {
    _id: 'purchase_orders_[timestamp]_[random]',
    type: 'purchase_orders',
    poNumber: 'string',
    supplierId: 'string',
    supplierName: 'string',
    orderDate: 'ISO string',
    expectedDelivery: 'ISO string',
    status: 'string', // draft, sent, confirmed, received, cancelled
    items: [{
      productId: 'string',
      productName: 'string',
      quantity: 'number',
      unitPrice: 'number',
      total: 'number'
    }],
    subtotal: 'number',
    taxAmount: 'number',
    totalAmount: 'number',
    notes: 'string',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // Stock Movements
  stockMovements: {
    _id: 'stock_movements_[timestamp]_[random]',
    type: 'stock_movements',
    productId: 'string',
    movementType: 'string', // in, out, adjustment, transfer
    quantity: 'number',
    previousStock: 'number',
    newStock: 'number',
    reason: 'string',
    reference: 'string', // order ID, PO ID, etc.
    location: 'string',
    performedBy: 'string',
    createdAt: 'ISO string'
  },

  // Categories
  categories: {
    _id: 'categories_[timestamp]_[random]',
    type: 'categories',
    name: 'string',
    description: 'string',
    parentCategory: 'string',
    level: 'number',
    isActive: 'boolean',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // Reports Data
  reports: {
    _id: 'reports_[timestamp]_[random]',
    type: 'reports',
    reportType: 'string', // sales, inventory, customer, supplier
    reportName: 'string',
    dateRange: {
      startDate: 'ISO string',
      endDate: 'ISO string'
    },
    data: 'object',
    generatedBy: 'string',
    createdAt: 'ISO string'
  },

  // Settings
  settings: {
    _id: 'settings_[timestamp]_[random]',
    type: 'settings',
    category: 'string', // general, tax, payment, notification
    key: 'string',
    value: 'any',
    description: 'string',
    isActive: 'boolean',
    createdAt: 'ISO string',
    updatedAt: 'ISO string'
  },

  // User Activity Logs
  activityLogs: {
    _id: 'activity_logs_[timestamp]_[random]',
    type: 'activity_logs',
    userId: 'string',
    action: 'string',
    module: 'string',
    entityId: 'string',
    entityType: 'string',
    oldData: 'object',
    newData: 'object',
    ipAddress: 'string',
    userAgent: 'string',
    createdAt: 'ISO string'
  },

  // Notifications
  notifications: {
    _id: 'notifications_[timestamp]_[random]',
    type: 'notifications',
    title: 'string',
    message: 'string',
    notificationType: 'string', // info, warning, error, success
    module: 'string',
    isRead: 'boolean',
    userId: 'string',
    createdAt: 'ISO string'
  }
};

export default DatabaseSchema;