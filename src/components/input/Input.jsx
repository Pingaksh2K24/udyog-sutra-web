import './Input.css';

export default function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  label, 
  required = false,
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="common-input"
        {...props}
      />
    </div>
  );
}