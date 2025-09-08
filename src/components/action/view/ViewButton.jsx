import { MdVisibility } from 'react-icons/md';
import './ViewButton.css';
import '../tooltip.css';

export default function ViewButton({ onClick, disabled = false }) {
  return (
    <button 
      className="view-btn tooltip" 
      onClick={onClick}
      disabled={disabled}
      data-tooltip="View"
    >
      <MdVisibility size={16} />
    </button>
  );
}