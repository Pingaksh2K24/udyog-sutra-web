import './Dropdown.css';

export default function Dropdown({ 
  options = [], 
  value, 
  onChange, 
  label, 
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <div className={`dropdown-group ${className}`}>
      {label && (
        <label className="dropdown-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="common-dropdown"
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
}