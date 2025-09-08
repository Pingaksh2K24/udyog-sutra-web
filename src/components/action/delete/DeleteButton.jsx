import { MdDelete } from 'react-icons/md';
import './DeleteButton.css';
import '../tooltip.css';

export default function DeleteButton({ onClick, disabled = false }) {
  return (
    <button 
      className="delete-btn tooltip" 
      onClick={onClick}
      disabled={disabled}
      data-tooltip="Delete"
    >
      <MdDelete size={16} />
    </button>
  );
}