import axios from 'axios';

class InventoryDB {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async init() {
    console.log('Inventory DB initialized');
  }

  async getAll() {
    try {
      const response = await axios.get(`${this.baseURL}/inventory`);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory item:', error);
      throw error;
    }
  }

  async updateStock(productId, quantity, type = 'add') {
    try {
      const response = await axios.put(`${this.baseURL}/inventory/${productId}/stock`, {
        quantity,
        type
      });
      return response.data;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }

  async getLowStock(threshold = 10) {
    try {
      const response = await axios.get(`${this.baseURL}/inventory/low-stock?threshold=${threshold}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw error;
    }
  }

  async getStockHistory(productId) {
    try {
      const response = await axios.get(`${this.baseURL}/inventory/${productId}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock history:', error);
      throw error;
    }
  }
}

export default InventoryDB;