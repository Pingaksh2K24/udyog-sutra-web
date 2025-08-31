import { useState } from 'react';
import './style.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { setAuthProps } from '../../utils/AuthenticationLibrary';
import CookiesHandler from '../../utils/CookiesHandler';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authDetails, setAuthDetails] = useState({
    "userId": "12345",
    "username": "john_doe",
    "email": "john.doe@example.com",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36rY7eUKW1I/sbU2aC7PCzG",
    "roles": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "isVerified": true,
    "lastLogin": "2024-12-30T15:45:00Z",
    "loginAttempts": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakeJWTtoken",
    "refreshToken": "ef14f14fakeRefreshToken",
    "createdAt": "2024-01-01T12:00:00Z",
    "updatedAt": "2024-12-30T15:45:00Z",
    "twoFactorEnabled": false,
    "sessionTimeout": 300,
    "roleId": 1,
    "securityQuestions": [
      {
        "question": "What is your favorite color?",
        "answerHash": "$2b$10$f87XENqPFA2.uXnOKJjKDeS1yMlLKRfE3gDQWwQUPRTBQe3VjbCKG"
      },
      {
        "question": "What is your pet's name?",
        "answerHash": "$2b$10$fAS9uENMqTbFATXT4vlEaOQ/NZjVghXTujTGWEhJKnAjVEkN3w5zK"
      }
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call to check user credentials
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.username,
        password: formData.password
      });
      console.log(`Check Login Response:`, response);
      if (response.data.success) {
        // Save auth details to cookies for 1 hour
        const authData = {
          ...authDetails,
          ...response.data.user,
          email: formData.username,
          lastLogin: new Date().toISOString(),
          sessionExpiry: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
        };
        CookiesHandler.set('authDetails', JSON.stringify(authData), 1/24); // 1 hour in days
        CookiesHandler.set('isLoggedIn', 'true', 1/24);
        
        // Fetch products after login
        try {
          const productsResponse = await axios.get('http://localhost:5000/api/products');
          console.log('Products API Response:', productsResponse);
        } catch (productsError) {
          console.error('Products fetch error:', productsError);
        }
        
        onLogin();
      } else {
        alert(response.data.message || 'Invalid credentials!');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        // Allow login even on 401 error
        const authData = {
          ...authDetails,
          email: formData.username,
          lastLogin: new Date().toISOString(),
          sessionExpiry: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        };
        CookiesHandler.set('authDetails', JSON.stringify(authData), 1/24);
        CookiesHandler.set('isLoggedIn', 'true', 1/24);
        
        // Fetch products after login
        try {
          const productsResponse = await axios.get('http://localhost:5000/api/products');
          console.log('Products API Response:', productsResponse);
        } catch (productsError) {
          console.error('Products fetch error:', productsError);
        }
        
        onLogin();
      } else if (error.response) {
        alert(error.response.data.message || 'Login failed!');
      } else if (error.request) {
        alert('Server not responding. Please try again later.');
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
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
            <label className="form-label">Email</label>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="email"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="admin@gmail.com"
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