import { MdEdit } from 'react-icons/md';
import './EditButton.css';

export default function EditButton({ onClick, disabled = false }) {
  return (
    <button 
      className="edit-btn" 
      onClick={onClick}
      disabled={disabled}
    >
      <MdEdit size={16} />
    </button>
  );
}