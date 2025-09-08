import { MdEdit } from 'react-icons/md';
import './EditButton.css';
import '../tooltip.css';

export default function EditButton({ onClick, disabled = false }) {
  return (
    <button 
      className="edit-btn tooltip" 
      onClick={onClick}
      disabled={disabled}
      data-tooltip="Edit"
    >
      <MdEdit size={16} />
    </button>
  );
}