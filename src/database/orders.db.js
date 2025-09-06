import axios from 'axios';

class OrdersDB {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async init() {
    console.log('Orders DB initialized');
  }

  async getAll() {
    try {
      const response = await axios.get(`${this.baseURL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  async create(orderData) {
    try {
      const response = await axios.post(`${this.baseURL}/orders`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async update(id, orderData) {
    try {
      const response = await axios.put(`${this.baseURL}/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
}

export default OrdersDB;