import './style.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/images/logo1.png" alt="Udyog Sutra" className="logo-image" />
            <span className="logo-text">Udyog Sutra</span>
          </div>
          <p className="footer-description">
            © 2024 Udyog Sutra. Developed with ❤️ for Indian businesses
          </p>
        </div>
        
        <div className="footer-right">
          <div className="footer-version">
            <span className="version-badge">v2.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}