import { useState } from 'react';
import { FaPlus, FaTrash, FaPrint, FaSave, FaTimes } from 'react-icons/fa';
import { BillingTemplates } from '../../templates/billing';
import '../../templates/billing/styles.css';
import './style.css';

export default function NewSalePage() {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [items, setItems] = useState([
    { id: 1, product: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(18);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('standard');

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
        if (field === 'quantity' || field === 'rate') {
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
    alert('Sale saved successfully!');
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const handlePrintTemplate = () => {
    setTimeout(() => {
      window.print();
    }, 100);
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
                <input
                  type="text"
                  placeholder="Product name"
                  value={item.product}
                  onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                />
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

      {showPrintModal && (
        <div className="print-modal-overlay">
          <div className="print-modal">
            <div className="modal-header">
              <h3>Select Invoice Template</h3>
              <button 
                className="close-btn"
                onClick={() => setShowPrintModal(false)}
              >
                <FaTimes size={16} />
              </button>
            </div>
            
            <div className="template-selector">
              {Object.entries(BillingTemplates).map(([key, template]) => (
                <div 
                  key={key}
                  className={`template-option ${selectedTemplate === key ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplate(key)}
                >
                  <h4>{template.name}</h4>
                  <p>{template.description}</p>
                </div>
              ))}
            </div>

            <div className="template-preview">
              <h4>Preview:</h4>
              <div className="preview-container">
                {(() => {
                  const TemplateComponent = BillingTemplates[selectedTemplate].component;
                  return <TemplateComponent invoiceData={invoiceData} />;
                })()}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowPrintModal(false)}
              >
                Cancel
              </button>
              <button 
                className="print-template-btn"
                onClick={handlePrintTemplate}
              >
                <FaPrint size={16} />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}