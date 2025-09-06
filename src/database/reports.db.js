import axios from 'axios';

class ReportsDB {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async init() {
    console.log('Reports DB initialized');
  }

  async getSalesReport(startDate, endDate) {
    try {
      const response = await axios.get(`${this.baseURL}/reports/sales`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sales report:', error);
      throw error;
    }
  }

  async getInventoryReport() {
    try {
      const response = await axios.get(`${this.baseURL}/reports/inventory`);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory report:', error);
      throw error;
    }
  }

  async getCustomerReport() {
    try {
      const response = await axios.get(`${this.baseURL}/reports/customers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer report:', error);
      throw error;
    }
  }

  async getSupplierReport() {
    try {
      const response = await axios.get(`${this.baseURL}/reports/suppliers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching supplier report:', error);
      throw error;
    }
  }

  async getFinancialReport(startDate, endDate) {
    try {
      const response = await axios.get(`${this.baseURL}/reports/financial`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching financial report:', error);
      throw error;
    }
  }

  async getDashboardStats() {
    try {
      const response = await axios.get(`${this.baseURL}/reports/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
}

export default ReportsDB;