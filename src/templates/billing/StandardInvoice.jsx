export default function StandardInvoice({ invoiceData }) {
  const { customer, items, subtotal, discount, tax, total, invoiceNumber, date } = invoiceData;

  return (
    <div className="invoice-template standard">
      <div className="invoice-header">
        <div className="company-info">
          <h1>Your Company Name</h1>
          <p>123 Business Street, City, State 12345</p>
          <p>Phone: (123) 456-7890 | Email: info@company.com</p>
        </div>
        <div className="invoice-details">
          <h2>INVOICE</h2>
          <p><strong>Invoice #:</strong> {invoiceNumber}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>
      </div>

      <div className="customer-section">
        <h3>Bill To:</h3>
        <p><strong>{customer.name}</strong></p>
        <p>{customer.phone}</p>
        <p>{customer.address}</p>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>₹{item.rate}</td>
              <td>₹{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals-section">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="total-row">
          <span>Discount ({discount}%):</span>
          <span>-₹{(subtotal * discount / 100).toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Tax ({tax}%):</span>
          <span>₹{((subtotal - (subtotal * discount / 100)) * tax / 100).toFixed(2)}</span>
        </div>
        <div className="total-row final">
          <span><strong>Total:</strong></span>
          <span><strong>₹{total}</strong></span>
        </div>
      </div>

      <div className="footer">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}