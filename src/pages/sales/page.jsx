import { useState } from 'react';
import { FaPlus, FaTrash, FaPrint, FaSave, FaTimes, FaDownload, FaEnvelope, FaWhatsapp, FaShare } from 'react-icons/fa';
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
    // Hide modal and other elements for printing
    const modal = document.querySelector('.print-modal-overlay');
    const mainContent = document.querySelector('.new-sale-page');
    
    if (modal) modal.style.display = 'none';
    if (mainContent) {
      mainContent.style.display = 'none';
    }
    
    // Create print content
    const printDiv = document.createElement('div');
    printDiv.id = 'print-content';
    printDiv.innerHTML = document.querySelector('.preview-container').innerHTML;
    document.body.appendChild(printDiv);
    
    // Add print styles
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #print-content, #print-content * { visibility: visible; }
        #print-content { 
          position: absolute; 
          left: 0; 
          top: 0; 
          width: 100%; 
          transform: none !important;
        }
        .invoice-template {
          max-width: none !important;
          box-shadow: none !important;
          transform: none !important;
          width: 100% !important;
        }
      }
    `;
    document.head.appendChild(printStyles);
    
    // Print
    setTimeout(() => {
      window.print();
      
      // Cleanup after print
      setTimeout(() => {
        document.body.removeChild(printDiv);
        document.head.removeChild(printStyles);
        if (modal) modal.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'block';
        setShowPrintModal(false);
      }, 500);
    }, 100);
  };

  const handleDownload = () => {
    const element = document.querySelector('.preview-container');
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${invoiceData.invoiceNumber}</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 20px;
              background: white;
            }
            .invoice-template { 
              max-width: 800px; 
              margin: 0 auto;
              background: white;
              color: #333;
              line-height: 1.4;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0; 
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left; 
            }
            th { 
              background: #f5f5f5; 
              font-weight: bold; 
            }
            .total { 
              font-weight: bold; 
              font-size: 18px; 
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 20px;
            }
            .company-info h1 {
              color: #3b82f6;
              margin: 0 0 10px 0;
              font-size: 24px;
            }
            .invoice-details h2 {
              color: #3b82f6;
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .customer-section {
              margin: 20px 0;
              padding: 15px;
              background: #f8fafc;
              border-radius: 8px;
            }
            @media print {
              body { margin: 0; padding: 10px; }
              .invoice-template { max-width: none; }
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 1000);
              }, 500);
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleGmailShare = () => {
    const subject = `Invoice ${invoiceData.invoiceNumber} - ${invoiceData.customer.name}`;
    const body = `Dear ${invoiceData.customer.name},\n\nPlease find attached your invoice details:\n\nInvoice Number: ${invoiceData.invoiceNumber}\nDate: ${invoiceData.date}\nTotal Amount: ₹${invoiceData.total}\n\nThank you for your business!\n\nBest regards,\nYour Company Name`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${invoiceData.customer.email || ''}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleWhatsAppShare = () => {
    const message = `*Invoice ${invoiceData.invoiceNumber}*\n\nDear ${invoiceData.customer.name},\n\nYour invoice details:\n📄 Invoice: ${invoiceData.invoiceNumber}\n📅 Date: ${invoiceData.date}\n💰 Total: ₹${invoiceData.total}\n\nThank you for your business! 🙏`;
    
    const whatsappUrl = `https://wa.me/${invoiceData.customer.phone?.replace(/[^0-9]/g, '') || ''}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invoice ${invoiceData.invoiceNumber}`,
        text: `Invoice for ${invoiceData.customer.name} - Total: ₹${invoiceData.total}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const shareText = `Invoice ${invoiceData.invoiceNumber} for ${invoiceData.customer.name} - Total: ₹${invoiceData.total}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Invoice details copied to clipboard!');
      });
    }
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
              <div className="action-group">
                <button 
                  className="action-btn download-btn"
                  onClick={handleDownload}
                >
                  <FaDownload size={16} />
                  Download PDF
                </button>
                <button 
                  className="action-btn gmail-btn"
                  onClick={handleGmailShare}
                >
                  <FaEnvelope size={16} />
                  Gmail
                </button>
                <button 
                  className="action-btn whatsapp-btn"
                  onClick={handleWhatsAppShare}
                >
                  <FaWhatsapp size={16} />
                  WhatsApp
                </button>
                <button 
                  className="action-btn share-btn"
                  onClick={handleShare}
                >
                  <FaShare size={16} />
                  Share
                </button>
              </div>
              <div className="primary-actions">
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
                  Print {BillingTemplates[selectedTemplate].name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}