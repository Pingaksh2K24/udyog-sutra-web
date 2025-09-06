import CustomerDB from './customer.db.js';
import ProductsDB from './products.db.js';
import OrdersDB from './orders.db.js';
import SuppliersDB from './suppliers.db.js';
import SettingsDB from './settings.db.js';
import InventoryDB from './inventory.db.js';
import ReportsDB from './reports.db.js';

class Database {
  constructor() {
    this.customers = new CustomerDB();
    this.products = new ProductsDB();
    this.orders = new OrdersDB();
    this.suppliers = new SuppliersDB();
    this.settings = new SettingsDB();
    this.inventory = new InventoryDB();
    this.reports = new ReportsDB();
  }

  async init() {
    await this.customers.init();
    await this.products.init();
    await this.orders.init();
    await this.suppliers.init();
    await this.settings.init();
    await this.inventory.init();
    await this.reports.init();
  }
}

export default new Database();