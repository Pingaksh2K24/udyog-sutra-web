import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaPrint, FaSave, FaTimes, FaDownload, FaEnvelope, FaWhatsapp, FaShare } from 'react-icons/fa';
import { BillingTemplates } from '../../templates/billing';
import '../../templates/billing/styles.css';
import './style.css';
import toast from 'react-hot-toast';
import DropdownWithSearch from '../../components/dropdownwithsearch/DropdownWithSearch';
import Database from '../../database/index.js';

export default function NewSalePage() {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [items, setItems] = useState([
    { id: 1, product: '', quantity: 1, rate: 0, amount: 0 }
  ]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(18);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await Database.products.getAll();
      console.log('Products API Response:', response);
      
      if (response && response.length > 0) {
        const productOptions = response.map(product => ({
          value: product._id || product.id,
          label: `${product.name} - ₹${product.price}`,
          price: product.price,
          name: product.name
        }));
        setProducts(productOptions);
        console.log('Product Options:', productOptions);
      } else {
        const dummyProducts = [
          { value: '1', label: 'Rice - ₹50', price: 50, name: 'Rice' },
          { value: '2', label: 'Wheat - ₹40', price: 40, name: 'Wheat' },
          { value: '3', label: 'Sugar - ₹45', price: 45, name: 'Sugar' }
        ];
        setProducts(dummyProducts);
        console.log('Using dummy products:', dummyProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      const dummyProducts = [
        { value: '1', label: 'Rice - ₹50', price: 50, name: 'Rice' },
        { value: '2', label: 'Wheat - ₹40', price: 40, name: 'Wheat' },
        { value: '3', label: 'Sugar - ₹45', price: 45, name: 'Sugar' }
      ];
      setProducts(dummyProducts);
      toast.error('Failed to load products, using sample data', { position: 'top-left' });
    } finally {
      setLoadingProducts(false);
    }
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      product: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'product') {
          const selectedProduct = products.find(p => p.value === value);
          if (selectedProduct) {
            updatedItem.rate = selectedProduct.price;
            updatedItem.product = selectedProduct.name;
          }
        }
        
        if (field === 'quantity' || field === 'rate' || field === 'product') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  const handleSave = () => {
    console.log('Sale saved:', { customer, items, discount, tax, total });
    toast.success('Sale saved successfully!', { position: 'top-left' });
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const invoiceData = {
    customer,
    items,
    subtotal,
    discount,
    tax,
    total,
    invoiceNumber: 'INV-' + Date.now(),
    date: new Date().toLocaleDateString('en-IN')
  };

  return (
    <div className="new-sale-page">
      <div className="page-header">
        <h1>New Sale</h1>
        <p>Create invoice and bill for customer</p>
      </div>

      <div className="sale-form">
        <div className="customer-section">
          <h3>Customer Details</h3>
          <div className="customer-form">
            <input
              type="text"
              placeholder="Customer Name"
              value={customer.name}
              onChange={(e) => setCustomer({...customer, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={(e) => setCustomer({...customer, phone: e.target.value})}
            />
            <textarea
              placeholder="Address"
              value={customer.address}
              onChange={(e) => setCustomer({...customer, address: e.target.value})}
            />
          </div>
        </div>

        <div className="items-section">
          <div className="items-header">
            <h3>Items</h3>
            <button className="add-item-btn" onClick={addItem}>
              <FaPlus size={14} />
              Add Item
            </button>
          </div>

          <div className="items-table">
            <div className="table-header">
              <div>Product</div>
              <div>Qty</div>
              <div>Rate</div>
              <div>Amount</div>
              <div>Action</div>
            </div>
            
            {items.map((item) => (
              <div key={item.id} className="table-row">
                <div className="product-dropdown">
                  <DropdownWithSearch
                    options={products}
                    value={products.find(p => p.name === item.product)?.value || ''}
                    onChange={(value) => {
                      console.log('Product selected:', value);
                      updateItem(item.id, 'product', value);
                    }}
                    placeholder={loadingProducts ? 'Loading products...' : 'Select product...'}
                    searchPlaceholder="Search products..."
                    disabled={loadingProducts}
                  />
                  {products.length === 0 && !loadingProducts && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                      No products available
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                />
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                />
                <div className="amount">₹{item.amount.toFixed(2)}</div>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="calculation-section">
          <div className="calc-row">
            <label>Subtotal:</label>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <label>
              Discount (%):
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </label>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <label>
              Tax (%):
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
              />
            </label>
            <span>+₹{taxAmount.toFixed(2)}</span>
          </div>
          <div className="calc-row total">
            <label>Total:</label>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="save-btn" onClick={handleSave}>
            <FaSave size={16} />
            Save Sale
          </button>
          <button className="print-btn" onClick={handlePrint}>
            <FaPrint size={16} />
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}