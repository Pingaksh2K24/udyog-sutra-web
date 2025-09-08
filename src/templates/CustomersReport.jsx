export const generateCustomersReport = (customers, businessName) => {
  return `
    <html>
      <head>
        <title>Customers Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 10px;
            background: white;
            color: #1e293b;
            font-size: 12px;
          }
          .container {
            max-width: 100%;
            margin: 0;
            background: white;
            overflow: hidden;
          }
          .header { 
            background: white;
            color: #1e293b;
            padding: 20px;
            text-align: center;
            border-bottom: 3px solid #3b82f6;
            margin-bottom: 20px;
          }
          .company-name { 
            font-size: 32px; 
            font-weight: 800; 
            margin-bottom: 8px;
            color: #3b82f6;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .report-title { 
            font-size: 24px; 
            font-weight: 600;
            margin-bottom: 12px;
            color: #1e293b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 15px;
          }
          .summary-section {
            background: white;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
          }
          .summary-title {
            font-size: 16px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
            display: inline-block;
          }
          .summary-stats {
            display: flex;
            gap: 30px;
            justify-content: space-around;
            text-align: center;
          }
          .stat-item {
            background: transparent;
            padding: 0;
            min-width: auto;
            flex: 1;
          }
          .stat-value {
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4px;
          }
          .stat-label {
            font-size: 11px;
            color: #64748b;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 15px;
            background: white;
            font-size: 11px;
          }
          th {
            background: #f8fafc;
            color: #1e293b;
            padding: 8px 6px;
            text-align: left;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            border: 1px solid #ddd;
          }
          td { 
            padding: 6px;
            text-align: left;
            font-size: 10px;
            border: 1px solid #ddd;
            vertical-align: top;
            word-wrap: break-word;
            max-width: 100px;
            color: #1e293b;
          }
          tr:nth-child(even) {
            background-color: #f9fafb;
          }
          .status-active, .status-inactive { 
            color: #1e293b;
            background: transparent;
            padding: 2px 4px;
            font-weight: 600;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          .footer { 
            background: #f8fafc;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
            margin-top: 20px;
          }
          @media print {
            body { background: white; padding: 5px; font-size: 10px; }
            .container { box-shadow: none; max-width: 100%; }
            .header { padding: 15px; background: white !important; color: #1e293b !important; border-bottom: 2px solid #3b82f6 !important; }
            .company-name { font-size: 28px !important; color: #3b82f6 !important; }
            .report-title { font-size: 20px !important; color: #1e293b !important; }
            .content { padding: 10px; }
            .summary-section { padding: 12px; margin-bottom: 15px; background: white !important; text-align: center !important; }
            .summary-title { font-size: 14px !important; }
            .stat-item { padding: 0 !important; min-width: auto !important; }
            .stat-value { font-size: 18px !important; }
            .stat-label { font-size: 10px !important; }
            th { padding: 6px 4px; font-size: 9px; background: #f8fafc !important; color: #1e293b !important; }
            td { padding: 4px; font-size: 9px; max-width: 80px; color: #1e293b !important; }
            .status-active, .status-inactive { color: #1e293b !important; background: transparent !important; border: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="company-name">${businessName}</div>
            <div class="report-title">Customers Report</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${new Date().toLocaleDateString('en-IN')}</div>
          </div>
          
          <div class="content">
            <div class="summary-section">
              <div class="summary-title">Report Summary</div>
              <div class="summary-stats">
                <div class="stat-item">
                  <div class="stat-value">${customers.length}</div>
                  <div class="stat-label">Total Customers</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${customers.filter(c => c.status?.toLowerCase() === 'active').length}</div>
                  <div class="stat-label">Active Customers</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${customers.filter(c => c.status?.toLowerCase() === 'inactive').length}</div>
                  <div class="stat-label">Inactive Customers</div>
                </div>
              </div>
            </div>
        
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Orders</th>
              <th>Total Amount</th>
              <th>Outstanding</th>
              <th>Loyalty Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${customers.map(customer => {
              const totalAmount = Array.isArray(customer.orders)
                ? customer.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
                : customer.totalSpent || 0;
              
              return `
                <tr>
                  <td><strong>CUST${customer.customerId?.toString().padStart(3, '0') || customer.id?.toString().padStart(3, '0') || '000'}</strong></td>
                  <td><strong>${customer.name || 'N/A'}</strong></td>
                  <td>${customer.email || 'N/A'}</td>
                  <td>${customer.phone || 'N/A'}</td>
                  <td>${customer.type || 'N/A'}</td>
                  <td>${customer.orders?.length || customer.orders || 0}</td>
                  <td>₹${totalAmount.toLocaleString()}</td>
                  <td>₹${(customer.outstandingAmount || 0).toLocaleString()}</td>
                  <td>${customer.loyaltyPoints || 0}</td>
                  <td><span class="status-${customer.status?.toLowerCase()}">${customer.status ? customer.status.charAt(0).toUpperCase() + customer.status.slice(1).toLowerCase() : 'N/A'}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
          </div>
          
          <div class="footer" style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #3b82f6;">
            <div>This report was generated automatically on ${new Date().toLocaleDateString('en-IN')}</div>
            <div style="margin-top: 5px; font-size: 10px;">Confidential - For Internal Use Only</div>
          </div>
        </div>
      </body>
    </html>
  `;
};