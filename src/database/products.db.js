import axios from 'axios';

class ProductsDB {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async init() {
    console.log('Products DB initialized');
  }

  async getAll() {
    try {
      const response = await axios.get(`${this.baseURL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async create(productData) {
    try {
      const response = await axios.post(`${this.baseURL}/products`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async update(id, productData) {
    try {
      const response = await axios.put(`${this.baseURL}/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}

export default ProductsDB;