import { useState } from 'react';
import './style.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <img src="/images/logo1.png" alt="Udyog Sutra" className="login-logo" />
            <h1 className="login-title">Udyog</h1>
          </div>
          <p className="login-subtitle">Login</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>
        <div className="login-footer">
          <p className="footer-text">© 2025 Udyog. All rights reserved.</p>
          <p className="footer-text">Made with ❤️ for Indian businesses</p>
        </div>
      </div>
    </div>
  );
}