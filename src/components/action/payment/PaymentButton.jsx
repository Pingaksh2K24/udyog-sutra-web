import { MdPayment } from 'react-icons/md';
import './PaymentButton.css';
import '../tooltip.css';

export default function PaymentButton({ onClick, disabled = false }) {
  return (
    <button 
      className="payment-btn tooltip" 
      onClick={onClick}
      disabled={disabled}
      data-tooltip="Payment"
    >
      <MdPayment size={16} />
    </button>
  );
}