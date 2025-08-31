import EditButton from './edit/EditButton';
import DeleteButton from './delete/DeleteButton';
import './ActionButtons.css';

export default function ActionButtons({ 
  onEdit, 
  onDelete, 
  editDisabled = false, 
  deleteDisabled = false 
}) {
  return (
    <div className="action-buttons">
      <EditButton onClick={onEdit} disabled={editDisabled} />
      <DeleteButton onClick={onDelete} disabled={deleteDisabled} />
    </div>
  );
}