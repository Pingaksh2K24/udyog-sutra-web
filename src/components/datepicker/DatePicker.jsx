import './DatePicker.css';

export default function DatePicker({ 
  value, 
  onChange, 
  label, 
  required = false,
  disabled = false,
  className = '',
  min,
  max,
  ...props 
}) {
  return (
    <div className={`datepicker-group ${className}`}>
      {label && (
        <label className="datepicker-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        className="common-datepicker"
        {...props}
      />
    </div>
  );
}