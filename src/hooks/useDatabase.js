import { useState, useEffect } from 'react';
import DatabaseService from '../utils/DatabaseService';

export const useDatabase = (type) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await DatabaseService.getAll(type);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const create = async (newData) => {
    try {
      const result = await DatabaseService.create(type, newData);
      setData(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id, updatedData) => {
    try {
      const result = await DatabaseService.update(id, updatedData);
      setData(prev => prev.map(item => item._id === id ? result : item));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await DatabaseService.delete(id);
      setData(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const search = async (query) => {
    try {
      setLoading(true);
      const result = await DatabaseService.search(type, query);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    search,
    refresh: fetchData
  };
};

// Specific hooks for all modules
export const useProducts = () => useDatabase('products');
export const useInventory = () => useDatabase('inventory');
export const useOrders = () => useDatabase('orders');
export const useCustomers = () => useDatabase('customers');
export const useSuppliers = () => useDatabase('suppliers');
export const usePurchaseOrders = () => useDatabase('purchase_orders');
export const useStockMovements = () => useDatabase('stock_movements');
export const useCategories = () => useDatabase('categories');
export const useReports = () => useDatabase('reports');
export const useSettings = () => useDatabase('settings');
export const useActivityLogs = () => useDatabase('activity_logs');
export const useNotifications = () => useDatabase('notifications');