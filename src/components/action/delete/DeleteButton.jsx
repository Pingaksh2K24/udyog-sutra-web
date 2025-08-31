import { MdDelete } from 'react-icons/md';
import './DeleteButton.css';

export default function DeleteButton({ onClick, disabled = false }) {
  return (
    <button 
      className="delete-btn" 
      onClick={onClick}
      disabled={disabled}
    >
      <MdDelete size={16} />
    </button>
  );
}