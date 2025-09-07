import { MdWarning, MdClose, MdError, MdInfo } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ConfirmationBox.css';

export default function ConfirmationBox({ 
  isOpen, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  confirmText = "Confirm", 
  cancelText = "Cancel", 
  onConfirm, 
  onCancel,
  type = "warning", // warning, danger, info
  loading = false
}) {
  if (!isOpen) return null;

  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          icon: MdError,
          iconColor: '#ef4444',
          iconBg: '#fee2e2',
          confirmBg: 'linear-gradient(135deg, #ef4444, #dc2626)',
          confirmShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
          confirmHoverShadow: '0 8px 25px rgba(239, 68, 68, 0.4)'
        };
      case 'info':
        return {
          icon: MdInfo,
          iconColor: '#3b82f6',
          iconBg: '#dbeafe',
          confirmBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          confirmShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
          confirmHoverShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
        };
      default:
        return {
          icon: FaExclamationTriangle,
          iconColor: '#f59e0b',
          iconBg: '#fef3c7',
          confirmBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
          confirmShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
          confirmHoverShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  return (
    <div className="confirmation-overlay" onClick={onCancel}>
      <div className="confirmation-box" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-header">
          <div 
            className="confirmation-icon"
            style={{ background: config.iconBg }}
          >
            <IconComponent size={28} color={config.iconColor} />
          </div>
          <button className="confirmation-close" onClick={onCancel}>
            <MdClose size={18} />
          </button>
        </div>
        
        <div className="confirmation-content">
          <h3 className="confirmation-title">{title}</h3>
          <p className="confirmation-message">{message}</p>
        </div>
        
        <div className="confirmation-actions">
          <button 
            className="confirmation-cancel" 
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            className="confirmation-confirm" 
            onClick={onConfirm}
            disabled={loading}
            style={{
              background: config.confirmBg,
              boxShadow: config.confirmShadow
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.boxShadow = config.confirmHoverShadow;
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = config.confirmShadow;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {loading ? (
              <div className="confirmation-spinner"></div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}