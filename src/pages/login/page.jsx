import { useState } from 'react';
import './style.css';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaChartBar, FaBoxes, FaUsers } from 'react-icons/fa';
import { setAuthProps } from '../../utils/AuthenticationLibrary';
import CookiesHandler from '../../utils/CookiesHandler';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Database from '../../database/index.js';

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
      if (response.status===200 && response?.data?.success) {
        // Save actual API response data to cookies
        const authData = {
          ...response.data,
          loginTime: new Date().toISOString(),
          sessionExpiry: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 hours
        };
        
        // Save for 8 hours with advanced settings
        CookiesHandler.set('authDetails', JSON.stringify(authData), 8/24);
        CookiesHandler.set('isLoggedIn', 'true', 8/24);
        CookiesHandler.set('userToken', response.data.token || '', 8/24);
        CookiesHandler.set('userId', response.data.user?.user_id || response.data.user?.id || '', 8/24);
        CookiesHandler.set('userRole', response.data.user?.role || 'user', 8/24);
        
        // Save additional user details to localStorage
        const userDetails = {
          businessName: response.data.user?.businessName || '',
          user_id: response.data.user?.user_id || response.data.user?.id || '',
          status: response.data.user?.status || 'active',
          role: response.data.user?.role || 'user',
          fullName: response.data.user?.fullName || response.data.user?.name || '',
          email: response.data.user?.email || '',
          phone: response.data.user?.phone || '',
          createdAt: response.data.user?.createdAt || '',
          lastLogin: new Date().toISOString()
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('userStatus', userDetails.status);
        localStorage.setItem('userRole', userDetails.role);
        
        // Call settings API after successful login
        try {
          const settingsResponse = await axios.get(`http://localhost:5000/api/settings/${response.data.user?.user_id}`, {
            theme: 'dark',
            language: 'hi'
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Settings API Response:', settingsResponse);
          // Store settings response in database
          Database.settings.storeSettingsResponse(settingsResponse);
        } catch (settingsError) {
          console.error('Settings API Error:', settingsError);
        }
        
        // Fetch products after login
        try {
          const productsResponse = await axios.get('http://localhost:5000/api/products');
          console.log('Products API Response:', productsResponse);
        } catch (productsError) {
          console.error('Products fetch error:', productsError);
        }
        
        // Show personalized welcome message
        const userName = response.data.user?.fullName || response.data.user?.name || 'User';
        toast.success(`Welcome back, ${userName}!`, {
          duration: 3000,
          position: 'top-left'
        });
        onLogin();
      } else {
        toast.error(response.data.message || 'Invalid credentials!', { position: 'top-left' });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        toast.error(error.response.data.message || 'Invalid credentials!', { position: 'top-left' });
      } else if (error.request) {
        toast.error('Server not responding. Please try again later.', { position: 'top-left' });
      } else {
        toast.error('An error occurred. Please try again.', { position: 'top-left' });
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
      <div className="login-background">
        <div className="bg-pattern"></div>
        <div className="bg-gradient"></div>
      </div>
      
      <div className="login-content">
        <div className="login-info">
          <div className="info-content">
            <h3>Simplifying Business, Amplifying Growth</h3>
            <p>Manage inventory, track sales, handle customers, and generate reports all in one place.</p>
            <div className="features-list">
              <div className="feature-item">
                <FaChartBar className="feature-icon" />
                <span>Real-time Analytics</span>
              </div>
              <div className="feature-item">
                <FaBoxes className="feature-icon" />
                <span>Inventory Management</span>
              </div>
              <div className="feature-item">
                <FaUsers className="feature-icon" />
                <span>Customer Relations</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-wrapper">
                <img src="/images/logo1.png" alt="Udyog Sutra" className="login-logo" />
              </div>
              <div className="brand-info">
                <h1 className="login-title">Udyog Sutra</h1>
                <p className="brand-tagline">Business Management System</p>
              </div>
            </div>
            <div className="welcome-text">
              <h2 className="welcome-title">Welcome Back!</h2>
              <p className="welcome-subtitle">Sign in to access your dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-container">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
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
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <span>•</span>
              <a href="#">Terms of Service</a>
              <span>•</span>
              <a href="#">Support</a>
            </div>
            <p className="footer-text">© 2025 Udyog Sutra. Made with ❤️ for Indian businesses</p>
          </div>
        </div>
      </div>
    </div>
  );
}