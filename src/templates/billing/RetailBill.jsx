export default function RetailBill({ invoiceData }) {
  const { customer, items, subtotal, discount, tax, total, invoiceNumber, date } = invoiceData;

  return (
    <div className="invoice-template retail">
      <div className="bill-header">
        <div className="store-info">
          <h2>RETAIL STORE</h2>
          <p>Shop No. 123, Market Street</p>
          <p>City, State - 123456</p>
          <p>GST: 12ABCDE1234F1Z5</p>
        </div>
      </div>

      <div className="bill-info">
        <div className="bill-details">
          <p><strong>Bill No:</strong> {invoiceNumber}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>
        <div className="customer-info">
          <p><strong>Customer:</strong> {customer.name}</p>
          <p><strong>Mobile:</strong> {customer.phone}</p>
        </div>
      </div>

      <table className="bill-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>₹{item.rate}</td>
              <td>₹{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-summary">
        <div className="summary-row">
          <span>Total Items: {items.length}</span>
        </div>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="summary-row">
            <span>Discount:</span>
            <span>-₹{(subtotal * discount / 100).toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row">
          <span>CGST ({tax/2}%):</span>
          <span>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>SGST ({tax/2}%):</span>
          <span>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span><strong>Grand Total:</strong></span>
          <span><strong>₹{total}</strong></span>
        </div>
      </div>

      <div className="bill-footer">
        <p>Thank You! Visit Again</p>
        <p>Exchange/Return within 7 days with bill</p>
      </div>
    </div>
  );
}