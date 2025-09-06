import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSearch, FaTimes } from 'react-icons/fa';
import './DropdownWithSearch.css';

export default function DropdownWithSearch({
  options = [],
  value = '',
  onChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  disabled = false,
  clearable = true,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`dropdown-with-search ${className} ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={handleToggle}>
        <span className="selected-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="dropdown-icons">
          {clearable && value && !disabled && (
            <FaTimes className="clear-icon" onClick={handleClear} />
          )}
          <FaChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="options-container">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-option ${option.value === value ? 'selected' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="no-options">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}