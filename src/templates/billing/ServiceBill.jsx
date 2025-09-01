export default function ServiceBill({ invoiceData }) {
  const { customer, items, subtotal, discount, tax, total, invoiceNumber, date } = invoiceData;

  return (
    <div className="invoice-template service">
      <div className="service-header">
        <div className="company-details">
          <h1>SERVICE PROVIDER</h1>
          <p>Professional Services & Solutions</p>
          <p>Office: 789 Business Complex, Tech Park</p>
          <p>City, State - 123456</p>
          <p>Email: services@company.com | Phone: +91-9876543210</p>
          <p>GST: 12ABCDE1234F1Z5 | Service Tax: ST123456</p>
        </div>
      </div>

      <div className="service-invoice-title">
        <h2>SERVICE INVOICE</h2>
      </div>

      <div className="service-details">
        <div className="invoice-meta">
          <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> {date}</p>
          <p><strong>Service Period:</strong> {date}</p>
        </div>
        <div className="client-details">
          <h4>Service To:</h4>
          <p><strong>{customer.name}</strong></p>
          <p>{customer.address}</p>
          <p>Contact: {customer.phone}</p>
          <p>Email: {customer.email || 'N/A'}</p>
        </div>
      </div>

      <table className="service-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Service Description</th>
            <th>SAC Code</th>
            <th>Quantity</th>
            <th>Unit Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <strong>{item.product}</strong>
                <br/>
                <small>{item.description || 'Professional service provided'}</small>
              </td>
              <td>{item.sac || '998314'}</td>
              <td>{item.quantity} {item.unit || 'Hrs'}</td>
              <td>₹{item.rate}</td>
              <td>₹{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="service-summary">
        <div className="summary-calculations">
          <div className="calc-row">
            <span>Gross Amount:</span>
            <span>₹{subtotal}</span>
          </div>
          {discount > 0 && (
            <div className="calc-row">
              <span>Less: Discount ({discount}%):</span>
              <span>-₹{(subtotal * discount / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="calc-row">
            <span>Taxable Value:</span>
            <span>₹{(subtotal - (subtotal * discount / 100)).toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <span>CGST ({tax/2}%):</span>
            <span>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</span>
          </div>
          <div className="calc-row">
            <span>SGST ({tax/2}%):</span>
            <span>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</span>
          </div>
          <div className="calc-row total-amount">
            <span><strong>Total Invoice Value:</strong></span>
            <span><strong>₹{total}</strong></span>
          </div>
        </div>
      </div>

      <div className="payment-terms">
        <h4>Payment Terms:</h4>
        <p>• Payment due within 15 days from invoice date</p>
        <p>• Late payment charges: 2% per month</p>
        <p>• All payments to be made in favor of "SERVICE PROVIDER"</p>
      </div>

      <div className="service-footer">
        <div className="bank-details">
          <h4>Bank Details:</h4>
          <p>Bank: ABC Bank Ltd.</p>
          <p>A/c No: 1234567890</p>
          <p>IFSC: ABCD0123456</p>
        </div>
        <div className="service-signature">
          <p>For SERVICE PROVIDER</p>
          <br/>
          <br/>
          <p>Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
}