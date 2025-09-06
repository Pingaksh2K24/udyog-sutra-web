import axios from 'axios';

class SuppliersDB {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async init() {
    console.log('Suppliers DB initialized');
  }

  async getAll() {
    try {
      const response = await axios.get(`${this.baseURL}/suppliers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/suppliers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching supplier:', error);
      throw error;
    }
  }

  async create(supplierData) {
    try {
      const response = await axios.post(`${this.baseURL}/suppliers`, supplierData);
      return response.data;
    } catch (error) {
      console.error('Error creating supplier:', error);
      throw error;
    }
  }

  async update(id, supplierData) {
    try {
      const response = await axios.put(`${this.baseURL}/suppliers/${id}`, supplierData);
      return response.data;
    } catch (error) {
      console.error('Error updating supplier:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/suppliers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting supplier:', error);
      throw error;
    }
  }
}

export default SuppliersDB;