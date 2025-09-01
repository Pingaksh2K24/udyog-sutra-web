import StandardInvoice from './StandardInvoice';
import RetailBill from './RetailBill';
import WholesaleBill from './WholesaleBill';
import ServiceBill from './ServiceBill';

export const BillingTemplates = {
  standard: {
    name: 'Standard Invoice',
    component: StandardInvoice,
    description: 'Simple and clean invoice format for general business'
  },
  retail: {
    name: 'Retail Bill',
    component: RetailBill,
    description: 'Compact bill format for retail shops and stores'
  },
  wholesale: {
    name: 'Wholesale Bill',
    component: WholesaleBill,
    description: 'Detailed GST invoice for wholesale and B2B transactions'
  },
  service: {
    name: 'Service Bill',
    component: ServiceBill,
    description: 'Professional invoice for service-based businesses'
  }
};

export { StandardInvoice, RetailBill, WholesaleBill, ServiceBill };