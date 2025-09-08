import EditButton from './edit/EditButton';
import DeleteButton from './delete/DeleteButton';
import PaymentButton from './payment/PaymentButton';
import ViewButton from './view/ViewButton';
import './ActionButtons.css';

export default function ActionButtons({ 
  onEdit, 
  onDelete, 
  onPayment,
  onView,
  editDisabled = false, 
  deleteDisabled = false,
  paymentDisabled = false,
  viewDisabled = false,
  showPayment = false,
  showEdit = true,
  showView = false
}) {
  return (
    <div className="action-buttons">
      {showView && <ViewButton onClick={onView} disabled={viewDisabled} />}
      {showEdit && <EditButton onClick={onEdit} disabled={editDisabled} />}
      <DeleteButton onClick={onDelete} disabled={deleteDisabled} />
      {showPayment && <PaymentButton onClick={onPayment} disabled={paymentDisabled} />}
    </div>
  );
}