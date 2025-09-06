import axios from 'axios';

class CustomerDB {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async init() {
    console.log('Customer DB initialized');
  }

  async getAll() {
    try {
      const response = await axios.get(`${this.baseURL}/customers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  async create(customerData) {
    try {
      const response = await axios.post(`${this.baseURL}/customers`, customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async update(id, customerData) {
    try {
      const response = await axios.put(`${this.baseURL}/customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
}

export default CustomerDB;