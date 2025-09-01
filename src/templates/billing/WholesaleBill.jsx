export default function WholesaleBill({ invoiceData }) {
  const { customer, items, subtotal, discount, tax, total, invoiceNumber, date } = invoiceData;

  return (
    <div className="invoice-template wholesale">
      <div className="letterhead">
        <div className="company-header">
          <h1>WHOLESALE DISTRIBUTORS</h1>
          <p>Regd. Office: 456 Industrial Area, Sector 12</p>
          <p>City, State - 123456 | Phone: +91-9876543210</p>
          <p>GST No: 12ABCDE1234F1Z5 | PAN: ABCDE1234F</p>
        </div>
      </div>

      <div className="invoice-title">
        <h2>TAX INVOICE</h2>
      </div>

      <div className="party-details">
        <div className="invoice-info">
          <table>
            <tr><td><strong>Invoice No:</strong></td><td>{invoiceNumber}</td></tr>
            <tr><td><strong>Date:</strong></td><td>{date}</td></tr>
            <tr><td><strong>Place of Supply:</strong></td><td>State</td></tr>
          </table>
        </div>
        <div className="buyer-info">
          <h4>Bill To:</h4>
          <p><strong>{customer.name}</strong></p>
          <p>{customer.address}</p>
          <p>Phone: {customer.phone}</p>
          <p>GST: {customer.gst || 'N/A'}</p>
        </div>
      </div>

      <table className="wholesale-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description of Goods</th>
            <th>HSN/SAC</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Per</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product}</td>
              <td>{item.hsn || '1234'}</td>
              <td>{item.quantity}</td>
              <td>PCS</td>
              <td>₹{item.rate}</td>
              <td>PCS</td>
              <td>₹{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="tax-summary">
        <div className="tax-details">
          <table>
            <thead>
              <tr>
                <th>HSN/SAC</th>
                <th>Taxable Value</th>
                <th>CGST Rate</th>
                <th>CGST Amount</th>
                <th>SGST Rate</th>
                <th>SGST Amount</th>
                <th>Total Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1234</td>
                <td>₹{(subtotal - (subtotal * discount / 100)).toFixed(2)}</td>
                <td>{tax/2}%</td>
                <td>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</td>
                <td>{tax/2}%</td>
                <td>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</td>
                <td>₹{((subtotal - (subtotal * discount / 100)) * tax / 100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="amount-summary">
          <div className="amount-row">
            <span>Total before Tax:</span>
            <span>₹{subtotal}</span>
          </div>
          {discount > 0 && (
            <div className="amount-row">
              <span>Less: Discount:</span>
              <span>₹{(subtotal * discount / 100).toFixed(2)}</span>
            </div>
          )}
          <div className="amount-row">
            <span>Add: CGST:</span>
            <span>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</span>
          </div>
          <div className="amount-row">
            <span>Add: SGST:</span>
            <span>₹{((subtotal - (subtotal * discount / 100)) * tax / 200).toFixed(2)}</span>
          </div>
          <div className="amount-row total">
            <span><strong>Total Amount:</strong></span>
            <span><strong>₹{total}</strong></span>
          </div>
        </div>
      </div>

      <div className="terms">
        <h4>Terms & Conditions:</h4>
        <ul>
          <li>Payment due within 30 days</li>
          <li>Interest @ 18% p.a. will be charged on overdue amounts</li>
          <li>All disputes subject to local jurisdiction</li>
        </ul>
      </div>

      <div className="signature">
        <div className="auth-signature">
          <p>For WHOLESALE DISTRIBUTORS</p>
          <br/>
          <p>Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
}